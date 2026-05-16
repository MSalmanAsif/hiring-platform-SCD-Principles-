from fastapi import APIRouter, HTTPException
from database import read_data, write_data
from models import User
import uuid

router = APIRouter()

@router.post("/register")
def register(user: User):
    users = read_data("users.json")
    if any(u["email"] == user.email for u in users):
        raise HTTPException(status_code=400, detail="Email already exists")
    new_user = user.dict()
    new_user["id"] = str(uuid.uuid4())
    users.append(new_user)
    write_data("users.json", users)
    return {"id": new_user["id"], "name": new_user["name"], "role": new_user["role"]}

@router.post("/login")
def login(credentials: dict):
    users = read_data("users.json")
    user = next((u for u in users if u["email"] == credentials["email"] and u["password"] == credentials["password"]), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"id": user["id"], "name": user["name"], "role": user["role"]}