# Resume Analyzer App

A full-stack application that analyzes resumes against job descriptions using NLP and machine learning.

## Goals
- **Accuracy:** Reliable resume-job match scoring (target ≥85% precision).
- **Speed:** Process resumes in under 2 seconds.
- **Scalability:** Support 1,000+ concurrent users.
- **Usability:** Clear, actionable feedback with an intuitive UI.
- **Security:** Encrypt user data and use secure authentication.

## Stack
- **Backend:** Python + FastAPI
- **NLP / ML:** Tokenization, embeddings, similarity scoring
- **Frontend:** React + Next.js
- **Storage:** PostgreSQL / MongoDB (configurable)
- **Deployment:** Docker, Kubernetes / Cloud auto-scaling

## Architecture Overview

This repository is structured as a modular full-stack application:

- `backend/`: FastAPI service for resume analysis, including NLP/ML logic.
- `frontend/`: Next.js application for uploading resumes, viewing match scores, and reviewing suggested improvements.
- `docker-compose.yml`: Local development stack with backend, frontend, and PostgreSQL.

### Core Components

- **NLP Engine**: In `backend/app/ml`, replace the placeholder analysis logic with an embedding-based similarity pipeline (e.g., sentence-transformers + cosine similarity).
- **API Layer**: `backend/app/api/routes.py` exposes endpoints for text-based and file-based resume analysis.
- **Frontend UI**: `frontend/pages/index.tsx` is a minimal starting point; expand it with dashboards, keyword highlighting, and user suggestions.

## Getting Started

### Backend (Python)

1. Create a virtual environment and install dependencies:

```bash
cd backend
python -m venv .venv
# Windows
.venv\\Scripts\\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

2. Run the API:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

3. Open `http://localhost:8000/healthz` to verify the service is running.

### Frontend (Next.js)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

### Local Development with Docker

```bash
docker-compose up --build
```

## Next Steps

To move toward the stated goals (accuracy, speed, scalability, usability, security):

- Replace placeholder keyword overlap logic with an embedding-based scorer (e.g., `sentence-transformers`).
- Add caching for repeated analysis requests (Redis, in-memory cache).
- Add authentication and encrypted storage (JWT + PostgreSQL encryption).
- Add logging/metrics with Prometheus + Grafana.
- Add unit/integration tests for the API and UI.
