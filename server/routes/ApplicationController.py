from fastapi import APIRouter, HTTPException
from database import read_data, write_data
from models import Application
import uuid

router = APIRouter()

@router.get("/")
def get_applications():
    return read_data("applications.json")

@router.get("/job/{job_id}")
def get_applications_by_job(job_id: str):
    applications = read_data("applications.json")
    return [a for a in applications if a["job_id"] == job_id]

@router.get("/candidate/{candidate_id}")
def get_applications_by_candidate(candidate_id: str):
    applications = read_data("applications.json")
    return [a for a in applications if a["candidate_id"] == candidate_id]

@router.post("/")
def apply_for_job(application: Application):
    applications = read_data("applications.json")
    # check duplicate
    exists = any(
        a["job_id"] == application.job_id and a["candidate_id"] == application.candidate_id
        for a in applications
    )
    if exists:
        raise HTTPException(status_code=400, detail="Already applied")
    new_app = application.dict()
    new_app["id"] = str(uuid.uuid4())
    applications.append(new_app)
    write_data("applications.json", applications)
    return new_app

@router.put("/{app_id}/status")
def update_status(app_id: str, status: dict):
    applications = read_data("applications.json")
    for i, a in enumerate(applications):
        if a["id"] == app_id:
            applications[i]["status"] = status["status"]
            write_data("applications.json", applications)
            return applications[i]
    raise HTTPException(status_code=404, detail="Application not found")