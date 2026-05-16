import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, applyForJob, getJobApplications, updateAppStatus } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Job, Application } from "../types";

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getJob(id!).then(res => setJob(res.data));
    if (user?.role === "recruiter") {
      getJobApplications(id!).then(res => setApplications(res.data));
    }
  }, [id]);

  const handleApply = async () => {
    try {
      await applyForJob({ job_id: id, candidate_id: user!.id, status: "applied" });
      setApplied(true);
      setMessage("Application submitted successfully!");
    } catch {
      setMessage("You have already applied for this job.");
    }
  };

  const handleStatus = async (appId: string, status: string) => {
    await updateAppStatus(appId, status);
    setApplications(applications.map(a => a.id === appId ? { ...a, status: status as Application["status"] } : a));
  };

  if (!job) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>HireHub</h1>
        <button style={styles.navBtn} onClick={() => navigate("/jobs")}>← Back to Jobs</button>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>{job.title}</h2>
          <p style={styles.company}>{job.company}</p>
          <p style={styles.location}>📍 {job.location}</p>
          <p style={styles.desc}>{job.description}</p>

          {user?.role === "candidate" && (
            <div>
              <button style={styles.primaryBtn} onClick={handleApply} disabled={applied}>
                {applied ? "Applied ✓" : "Apply Now"}
              </button>
              {message && <p style={styles.message}>{message}</p>}
            </div>
          )}
        </div>

        {user?.role === "recruiter" && (
          <div style={styles.card}>
            <h3>Applications ({applications.length})</h3>
            {applications.length === 0 && <p style={{ color: "#888" }}>No applications yet.</p>}
            {applications.map(app => (
              <div key={app.id} style={styles.appRow}>
                <span>Candidate ID: {app.candidate_id}</span>
                <span style={styles.status(app.status)}>{app.status}</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={styles.smallBtn("#22c55e")} onClick={() => handleStatus(app.id, "shortlisted")}>Shortlist</button>
                  <button style={styles.smallBtn("#f59e0b")} onClick={() => handleStatus(app.id, "interview")}>Interview</button>
                  <button style={styles.smallBtn("#ef4444")} onClick={() => handleStatus(app.id, "rejected")}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );