"""Basic unit tests for the NLP analysis logic."""

from app.ml.analysis import analyze_resume


def test_analyze_resume_returns_score():
    result = analyze_resume(
        resume_text="Experienced Python developer with NLP experience.",
        job_description="Looking for a Python developer with experience in NLP.",
    )
    assert "score" in result
    assert 0.0 <= result["score"] <= 1.0
