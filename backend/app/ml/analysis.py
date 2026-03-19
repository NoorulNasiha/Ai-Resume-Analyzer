"""Core NLP/ML logic for resume vs job description analysis."""

from typing import Dict

# NOTE: Replace this with a proper NLP pipeline (embeddings, keyword extraction, etc.)

def analyze_resume(resume_text: str, job_description: str) -> Dict:
    """Return a placeholder analysis result.

    This function is a starting point. Add real NLP model inference here:
    - preprocess text (cleaning, tokenization)
    - generate embeddings (e.g., sentence-transformers)
    - compute similarity and scoring
    - extract keywords and gaps
    """

    # Basic keyword overlap (placeholder)
    resume_tokens = set(resume_text.lower().split())
    job_tokens = set(job_description.lower().split())
    common = resume_tokens.intersection(job_tokens)

    return {
        "score": round(len(common) / (len(job_tokens) or 1), 3),
        "common_keywords": sorted(list(common))[:30],
        "resume_length": len(resume_text),
        "job_description_length": len(job_description),
    }
