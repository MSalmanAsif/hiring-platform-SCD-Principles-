from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserProfile(BaseModel):
    bio: Optional[str] = ""
    skills: Optional[str] = ""
    phone: Optional[str] = ""

class Job(BaseModel):
    title: str
    description: str
    company: str
    location: str
    recruiter_id: str

class JobUpdate(BaseModel):
    title: str
    description: str
    company: str
    location: str

class Application(BaseModel):
    job_id: str
    candidate_id: str
    status: str = "applied"