import { apiCall } from "./client";

export function createSession() {
  return apiCall("/newsession/", { method: "POST" });
}

export function confirmOptions(sessionId, options) {
  return apiCall("/confirmoptions", {
    method: "POST",
    body: { session_id: sessionId, options },
  });
}

export function checkPassword(sessionId, sessionPassword) {
  return apiCall("/checkpassword", {
    method: "POST",
    body: { session_id: sessionId, session_password: sessionPassword },
  });
}

export function vote(token, sessionId, option) {
  return apiCall("/vote", {
    method: "POST",
    token,
    body: { session_id: sessionId, option },
  });
}

export function updateCount(sessionId) {
  return apiCall("/updatecount", { params: { session_id: sessionId } });
}

export function endSession(token, sessionId) {
  return apiCall("/endsession", {
    method: "DELETE",
    token,
    body: { session_id: sessionId },
  });
}
