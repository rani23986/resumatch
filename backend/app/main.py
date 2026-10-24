import os

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.matching_engine import analyze_match
from app.resume_parser import extract_text_from_pdf

app = FastAPI(
    title="ResuMatch AI",
    description="AI-powered resume intelligence and job matching API",
    version="0.1.0",
)

cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/api/v1/health")
def health_check():
    return {
        "status": "ok",
        "application": "ResuMatch AI",
        "version": "0.1.0",
    }


@app.get("/api/v1/")
def root():
    return {"message": "Welcome to ResuMatch AI API"}


@app.post("/api/v1/resume/extract")
async def extract_resume(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume.",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    if len(file_bytes) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="The PDF must be smaller than 10 MB.",
        )

    try:
        extracted_text = extract_text_from_pdf(file_bytes)
    except Exception as exc:
        raise HTTPException(
            status_code=422,
            detail=f"Could not extract resume text: {exc}",
        ) from exc

    return {
        "filename": file.filename,
        "character_count": len(extracted_text),
        "extracted_text": extracted_text,
    }


@app.post("/api/v1/resume/match")
async def match_resume(
    resume: UploadFile = File(...),
    job_description: str = File(...),
):
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume.",
        )

    resume_bytes = await resume.read()

    if not resume_bytes:
        raise HTTPException(status_code=400, detail="The PDF is empty.")

    if len(resume_bytes) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="The PDF must be smaller than 10 MB.",
        )

    try:
        resume_text = extract_text_from_pdf(resume_bytes)
    except Exception as exc:
        raise HTTPException(
            status_code=422,
            detail="Could not extract readable text from the PDF.",
        ) from exc

    try:
        result = analyze_match(resume_text, job_description)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Resume matching failed.",
        ) from exc

    return {
        "filename": resume.filename,
        **result,
    }
