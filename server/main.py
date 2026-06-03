from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import UserController, JobController, ApplicationController

app = FastAPI(title="Hiring Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserController.router, prefix="/api/auth", tags=["Auth"])
app.include_router(JobController.router, prefix="/api/jobs", tags=["Jobs"])
app.include_router(ApplicationController.router, prefix="/api/applications", tags=["Applications"])

@app.get("/")
def root():
    return {"message": "Hiring Platform API is running"}