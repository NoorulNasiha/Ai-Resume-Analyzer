"""API routes for the Resume Analyzer service."""

from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional

from app.ml.analysis import analyze_resume

router = APIRouter()


class AnalysisRequest(BaseModel):
    job_description: str
    resume_text: Optional[str] = None


@router.post("/analyze")
async def analyze(request: AnalysisRequest):
    """Analyze a resume against a job description."""
    result = analyze_resume(
        resume_text=request.resume_text or "",
        job_description=request.job_description,
    )
    return result


@router.post("/analyze/file")
async def analyze_file(job_description: str = Form(...), resume_file: UploadFile = File(...)):
    """Analyze a resume uploaded as a file."""
    raw = await resume_file.read()
    text = raw.decode(errors="ignore")
    result = analyze_resume(resume_text=text, job_description=job_description)
    return result
