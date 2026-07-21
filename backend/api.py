from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import random
import string
import uuid
import jwt
import datetime
from dotenv import load_dotenv
import os


router = APIRouter()
security = HTTPBearer()
load_dotenv()

# will be set by main.py on startup
r = None

# configs for JWT token
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXP_MINUTES = 5  # token valid for 5 minutes


# request/response models
class SessionResponse(BaseModel):
    session_id: str
    session_password: str
    token: str


class ConfirmOptionsRequest(BaseModel):
    session_id: str
    options: list[str]


class CheckPasswordRequest(BaseModel):
    session_id: str
    session_password: str


class VoteRequest(BaseModel):
    session_id: str
    option: str


class EndSessionRequest(BaseModel):
    session_id: str


# JWT verification dependency
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Decodes and validates the JWT sent in the Authorization header.
    Returns the token's payload (contains session_id and user_id) on success.
    Raises 401 if the token is missing, expired, or invalid.
    """
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return payload


# Routes
@router.post("/newsession/")
def create_session():
    """Creates a new session with a 6-digit numeric id and a 6-char password,
    and registers the creator as the first participant with a UUID4 user_id."""
    
    # generate session_id that has not been used
    while True:
        session_id = str(random.randint(100000, 999999))
        if r.sadd("session_ids_taken", session_id):
            break

    session_password = create_password()

    # session:{session_id} -> hash {"password": "...", "admin_user_id": "..."}
    r.hset(f"session:{session_id}", "password", session_password)

    participants_key = f"session:{session_id}:participants"
    user_uuid_obj = uuid.uuid4()
    user_id = str(user_uuid_obj)

    # register the creator as a participant, not voted yet, and remember
    # that this user_id is the admin, needed so end_session can check
    # that only the admin is allowed to end the session.
    r.hset(participants_key, user_id, "0")
    r.hset(f"session:{session_id}", "admin_user_id", user_id)
 
    session_token = jwt.encode(
        {
            "session_id": session_id,
            "user_id": user_id,
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=JWT_EXP_MINUTES),
        },
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )
 
    return SessionResponse(
        session_id=session_id,
        session_password=session_password,
        token=session_token
    )


@router.post("/confirmoptions")
def confirm_options(payload: ConfirmOptionsRequest):
    """Stores the voting options for a session, each starting at count 0."""
    if not r.exists(f"session:{payload.session_id}"):
        raise HTTPException(status_code=404, detail="Session not found")

    # session:{session_id}:votes -> hash {option: count}
    votes_key = f"session:{payload.session_id}:votes"
    for option in payload.options:
        r.hsetnx(votes_key, option, 0)  # sets option to have vote count of 0

    return {"session_id": payload.session_id, "options": payload.options}


@router.post("/checkpassword")
def check_password(payload: CheckPasswordRequest):
    """
    Checks if the session password is correct for a user.
    If correct: registers the user as a participant (voted=False) and
    returns a JWT token for subsequent requests.
    """
    stored_password = r.hget(f"session:{payload.session_id}", "password")

    if stored_password is None:
        raise HTTPException(status_code=404, detail="Session not found")

    if stored_password != payload.session_password:
        raise HTTPException(status_code=401, detail="Incorrect session password")

    # session:{session_id}:participants -> hash {user_id: "0"/"1"}
    participants_key = f"session:{payload.session_id}:participants"
    user_uuid_obj = uuid.uuid4()
    user_id = str(user_uuid_obj)

    # register the participant as not voted yet
    r.hsetnx(participants_key, user_id, "0")

    token = jwt.encode(
        {
            "session_id": payload.session_id,
            "user_id": user_id,
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=JWT_EXP_MINUTES),
        },
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )

    return {"token": token, "user_id": user_id}


@router.post("/vote")
def vote(payload: VoteRequest, token_data: dict = Depends(verify_token)):
    """
    Registers a vote for an option, after checking the user hasn't voted yet.
    user_id and session_id come from the verified JWT, NOT from the request
    body — this stops a client from voting as someone else by just typing
    in a different user_id.
    """
    user_id = token_data["user_id"]
    token_session_id = token_data["session_id"]

    # make sure the token was issued for the session this vote is for
    if token_session_id != payload.session_id:
        raise HTTPException(status_code=403, detail="Token does not match this session")

    participants_key = f"session:{payload.session_id}:participants"
    votes_key = f"session:{payload.session_id}:votes"

    voted_status = r.hget(participants_key, user_id)

    if voted_status is None:
        raise HTTPException(status_code=403, detail="User is not part of this session")

    if voted_status == "1":
        raise HTTPException(status_code=400, detail="User has already voted")

    if not r.hexists(votes_key, payload.option):
        raise HTTPException(status_code=404, detail="Option does not exist for this session")

    r.hincrby(votes_key, payload.option, 1)
    r.hset(participants_key, user_id, "1")

    return {"session_id": payload.session_id, "option": payload.option, "status": "vote recorded"}


@router.get("/updatecount")
def update_count(session_id: str):
    """Returns the current vote counts for every option in a session."""
    votes_key = f"session:{session_id}:votes"

    if not r.exists(votes_key):
        raise HTTPException(status_code=404, detail="Session or options not found")

    raw_counts = r.hgetall(votes_key)
    counts = {option: int(count) for option, count in raw_counts.items()}

    return {"session_id": session_id, "counts": counts}


@router.delete("/endsession")
def end_session(payload: EndSessionRequest, token_data: dict = Depends(verify_token)):
    """
    Ends a session and deletes all its data from Redis. Only the admin
    (the user_id that created the session) is allowed to do this — any
    other voter's valid token gets rejected with 403.
    """
    session_id = payload.session_id
    session_key = f"session:{session_id}"

    admin_user_id = r.hget(session_key, "admin_user_id")
    if admin_user_id is None:
        raise HTTPException(status_code=404, detail="Session not found")

    if token_data.get("session_id") != session_id:
        raise HTTPException(status_code=403, detail="Token does not match this session")

    if token_data.get("user_id") != admin_user_id:
        raise HTTPException(status_code=403, detail="Only the session admin can end this session")

    # delete every Redis key belonging to this session_id, and free up the
    # 6-digit session_id so it can be reused in future sessions
    r.delete(
        session_key,
        f"{session_key}:participants",
        f"{session_key}:votes",
    )
    r.srem("session_ids_taken", session_id)

    return {"session_id": session_id, "status": "session ended"}


def create_password():
    password = ""

    for i in range(6):
        a = random.randint(0, 1)

        if a == 0:
            alpha = random.choice(string.ascii_uppercase)  # A-Z only
            password += alpha
        elif a == 1:
            num = random.randint(0, 9)
            password += str(num)

    return password
