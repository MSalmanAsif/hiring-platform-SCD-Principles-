from fastapi import APIRouter, HTTPException
from database import read_data, write_data
from models import User, UserProfile
import uuid

router = APIRouter()

@router.post("/register")
def register(user: User):
    users = read_data("users.json")
    if any(u["email"] == user.email for u in users):
        raise HTTPException(status_code=400, detail="Email already exists")
    new_user = user.dict()
    new_user["id"] = str(uuid.uuid4())
    new_user["bio"] = ""
    new_user["skills"] = ""
    new_user["phone"] = ""
    new_user["saved_jobs"] = []
    users.append(new_user)
    write_data("users.json", users)
    return {"id": new_user["id"], "name": new_user["name"], "role": new_user["role"], "email": new_user["email"]}

@router.post("/login")
def login(credentials: dict):
    users = read_data("users.json")
    user = next((u for u in users if u["email"] == credentials["email"] and u["password"] == credentials["password"]), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"id": user["id"], "name": user["name"], "role": user["role"], "email": user["email"]}

@router.get("/users")
def get_all_users():
    users = read_data("users.json")
    return [{"id": u["id"], "name": u["name"], "email": u["email"], "role": u["role"]} for u in users]

@router.get("/users/{user_id}")
def get_user(user_id: str):
    users = read_data("users.json")
    user = next((u for u in users if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user["id"], "name": user["name"], "email": user["email"], "role": user["role"], "bio": user.get("bio", ""), "skills": user.get("skills", ""), "phone": user.get("phone", ""), "saved_jobs": user.get("saved_jobs", [])}

@router.put("/users/{user_id}/profile")
def update_profile(user_id: str, profile: UserProfile):
    users = read_data("users.json")
    for i, u in enumerate(users):
        if u["id"] == user_id:
            users[i]["bio"] = profile.bio
            users[i]["skills"] = profile.skills
            users[i]["phone"] = profile.phone
            write_data("users.json", users)
            return {"message": "Profile updated"}
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}/save-job/{job_id}")
def toggle_save_job(user_id: str, job_id: str):
    users = read_data("users.json")
    for i, u in enumerate(users):
        if u["id"] == user_id:
            saved = u.get("saved_jobs", [])
            if job_id in saved:
                saved.remove(job_id)
            else:
                saved.append(job_id)
            users[i]["saved_jobs"] = saved
            write_data("users.json", users)
            return {"saved_jobs": saved}
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}")
def delete_user(user_id: str):
    users = read_data("users.json")
    users = [u for u in users if u["id"] != user_id]
    write_data("users.json", users)
    return {"message": "User deleted"}