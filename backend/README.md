# Resume Analyzer Backend

This service provides REST APIs for resume/job description analysis.

## Setup

1. Create a Python virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

2. Run the API locally:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

3. The API will be available at `http://localhost:8000`.

## API Endpoints

- `GET /healthz` - health check
- `POST /api/analyze` - analyze resume text against a job description
- `POST /api/analyze/file` - analyze resume file upload

## Next steps

- Add authentication (JWT, OAuth).
- Replace placeholder `analyze_resume` with real embedding + similarity scoring.
- Add database persistence for user reports.
