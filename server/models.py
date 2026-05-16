from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    name: str
    email: str
    password: str
    role: str  # candidate | recruiter | admin

class Job(BaseModel):
    title: str
    description: str
    company: str
    location: str
    recruiter_id: str

class Application(BaseModel):
    job_id: str
    candidate_id: str
    status: str = "applied"  # applied | shortlisted | rejected | interview