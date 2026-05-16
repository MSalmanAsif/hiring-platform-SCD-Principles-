export interface User {
  id: string;
  name: string;
  email: string;
  role: "candidate" | "recruiter" | "admin";
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  recruiter_id: string;
  status: string;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: "applied" | "shortlisted" | "rejected" | "interview";
}