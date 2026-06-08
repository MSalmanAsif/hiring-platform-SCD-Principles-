# HireHub — Smart Hiring Platform
### Software Construction & Development Project | KIET NN Campus

A full-stack hiring platform built with **ASP.NET Core Web API (C#)** and **React + TypeScript**, demonstrating core Software Construction & Development principles.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript (Vite) |
| Backend | ASP.NET Core Web API (C#) |
| Database | JSON Files |
| API Docs | Swagger |

---

## SCD Principles Applied

- **Single Responsibility Principle (SRP)** — Controllers handle HTTP only, Services handle business logic, Repositories handle data access
- **Dependency Inversion Principle (DIP)** — Controllers and Services depend on interfaces (IUserRepository, IJobRepository, IApplicationRepository), not concrete classes
- **Open/Closed Principle (OCP)** — New features added via new classes, existing code untouched
- **Repository Pattern** — Data access fully abstracted behind interfaces
- **Dependency Injection** — Built-in ASP.NET Core DI container, all dependencies injected via constructors
- **Configuration Management** — All configurable values (file paths, CORS origin) stored in appsettings.json
- **Refactoring** — Extract Method, Replace Magic String, Introduce Parameter Object, Simplify Conditional, Remove Duplicated Code

---

## Project Structure
hiring-platform/
├── client/                        # React + TypeScript Frontend
│   └── src/
│       ├── pages/                 # LoginForm, RegistrationForm, JobListForm, etc.
│       ├── context/               # AuthContext (global auth state)
│       └── services/              # api.ts (all Axios calls)
│
└── server/                        # ASP.NET Core C# Backend
├── Configuration/             # AppSettings.cs (config binding)
├── Controllers/               # UserController, JobController, ApplicationController
├── Interfaces/                # IUserRepository, IJobRepository, IApplicationRepository
├── Models/                    # User, Job, Application
├── Repositories/              # Concrete implementations of interfaces
├── Services/                  # Business logic layer
├── Data/                      # users.json, jobs.json, applications.json
└── appsettings.json           # Configuration file

---

## How to Run

### Backend
```bash
cd server
dotnet restore
dotnet run
```
Backend runs at: `http://localhost:5000`
Swagger docs at: `http://localhost:5000/swagger`

### Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## Default Admin Login

| Field | Value |
|---|---|
| Email | admin@hirehub.com |
| Password | admin123 |

---

## Roles

| Role | Permissions |
|---|---|
| Candidate | Register, browse jobs, apply, track status, save jobs, edit profile |
| Recruiter | Post jobs, manage applicants, update status, toggle job open/close |
| Admin | View all data, delete any user or job |

---

## Submitted By
**M Salman**
Software Construction & Development — KIET NN Campus
Submitted to: Sir Danish
