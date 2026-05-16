from fastapi import APIRouter, HTTPException
from database import read_data, write_data
from models import Job
import uuid

router = APIRouter()

@router.get("/")
def get_jobs():
    return read_data("jobs.json")

@router.get("/{job_id}")
def get_job(job_id: str):
    jobs = read_data("jobs.json")
    job = next((j for j in jobs if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/")
def create_job(job: Job):
    jobs = read_data("jobs.json")
    new_job = job.dict()
    new_job["id"] = str(uuid.uuid4())
    new_job["status"] = "open"
    jobs.append(new_job)
    write_data("jobs.json", jobs)
    return new_job

@router.put("/{job_id}")
def update_job(job_id: str, updated: Job):
    jobs = read_data("jobs.json")
    for i, j in enumerate(jobs):
        if j["id"] == job_id:
            jobs[i] = {**updated.dict(), "id": job_id, "status": j["status"]}
            write_data("jobs.json", jobs)
            return jobs[i]
    raise HTTPException(status_code=404, detail="Job not found")

@router.delete("/{job_id}")
def delete_job(job_id: str):
    jobs = read_data("jobs.json")
    jobs = [j for j in jobs if j["id"] != job_id]
    write_data("jobs.json", jobs)
    return {"message": "Job deleted"}