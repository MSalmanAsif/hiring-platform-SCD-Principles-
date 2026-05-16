import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Auth
export const register = (data: object) => api.post("/auth/register", data);
export const login = (data: object) => api.post("/auth/login", data);

// Jobs
export const getJobs = () => api.get("/jobs");
export const getJob = (id: string) => api.get(`/jobs/${id}`);
export const createJob = (data: object) => api.post("/jobs", data);
export const updateJob = (id: string, data: object) => api.put(`/jobs/${id}`, data);
export const deleteJob = (id: string) => api.delete(`/jobs/${id}`);

// Applications
export const applyForJob = (data: object) => api.post("/applications", data);
export const getMyApplications = (candidateId: string) => api.get(`/applications/candidate/${candidateId}`);
export const getJobApplications = (jobId: string) => api.get(`/applications/job/${jobId}`);
export const updateAppStatus = (id: string, status: string) => api.put(`/applications/${id}/status`, { status });