# SnapVote

A real-time voting application built with React, FastAPI, and Redis.

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

### Database
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### Authentication
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## App Walkthrough

### 1. Landing Page
![Landing Page](assets/IMG1.png)

*User can either create a new session or join an existing session.*

---

### 2. Admin Setup
![Admin Setup](assets/IMG2.png)

*Admin sets the voting options.*

---

### 3. Join Session
![Join Session](assets/IMG3.png)

*User enters session code and password.*

---

### 4. Voting
![Voting](assets/IMG4.png)

*User votes for their desired option.*

---

### 5. Results
![Results](assets/IMG5.png)

*Session ended. Final results displayed.*

---

### Backend Setup

1. **Create and activate a virtual environment**

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**

```bash
pip install -r requirements.txt
```
---
### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
JWT_SECRET = your-secret-key
```

---

### FastAPI Setup

```bash
cd backend
uvicorn main:app --reload
```
> The backend will run at `http://localhost:8000`

---

### Redis Setup

Start Redis in a **separate terminal**:

```bash
redis-server
```
> Redis will run on `localhost:6379`

---

### Frontend Setup

Open a **new terminal** and run:

```bash
cd ballot-frontend
npm install    # Only needed once
npm run dev
```
> The frontend will run at `http://localhost:5173`

---

### Access the App

Open your browser and navigate to:

```
http://localhost:5173
```

---
