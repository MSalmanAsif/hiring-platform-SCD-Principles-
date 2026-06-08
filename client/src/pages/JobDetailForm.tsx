import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, applyForJob, getJobApplications, updateAppStatus, getMyApplications } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Job {
  id: string; title: string; description: string;
  company: string; location: string; recruiterId: string; status: string;
}
interface Application {
  id: string; jobId: string; candidateId: string;
  status: "applied" | "shortlisted" | "rejected" | "interview";
}

const statusColors: Record<string, string> = {
  applied: "#6366f1", shortlisted: "#22c55e", interview: "#f59e0b", rejected: "#ef4444",
};

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
    if (user?.role === "candidate") {
      getMyApplications(user.id).then(res => {
        const alreadyApplied = res.data.some((a: Application) => a.jobId === id);
        setApplied(alreadyApplied);
      });
    }
  }, [id]);

  const handleApply = async () => {
    try {
      await applyForJob({ jobId: id, candidateId: user!.id });
      setApplied(true);
      setMessage("Application submitted successfully!");
    } catch {
      setMessage("You have already applied for this job.");
    }
  };

  const handleStatus = async (appId: string, status: string) => {
    await updateAppStatus(appId, status);
    setApplications(applications.map(a =>
      a.id === appId ? { ...a, status: status as Application["status"] } : a
    ));
  };

  if (!job) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "sans-serif" }}>
      <div style={{ background: "#4f46e5", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#fff", margin: 0, fontSize: "1.5rem" }}>HireHub</h1>
        <button onClick={() => navigate("/jobs")} style={{ background: "transparent", border: "1px solid #c7d2fe", color: "#fff", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer" }}>← Back</button>
      </div>

      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h2 style={{ margin: "0 0 0.25rem", fontSize: "1.5rem", fontWeight: 700 }}>{job.title}</h2>
          <p style={{ color: "#4f46e5", fontWeight: 600, margin: "0 0 0.25rem" }}>{job.company}</p>
          <p style={{ color: "#888", margin: "0 0 1rem" }}>📍 {job.location}</p>
          <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>{job.description}</p>
          {user?.role === "candidate" && (
            <div>
              <button onClick={handleApply} disabled={applied} style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "1rem" }}>
                {applied ? "Applied ✓" : "Apply Now"}
              </button>
              {message && <p style={{ marginTop: "0.75rem", color: "#22c55e", fontWeight: 600 }}>{message}</p>}
            </div>
          )}
        </div>

        {user?.role === "recruiter" && (
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            <h3>Applications ({applications.length})</h3>
            {applications.length === 0 && <p style={{ color: "#888" }}>No applications yet.</p>}
            {applications.map(app => (
              <div key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #f0f0f0", gap: "1rem" }}>
                <span>Candidate: {app.candidateId}</span>
                <span style={{ background: statusColors[app.status], color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>{app.status}</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => handleStatus(app.id, "shortlisted")} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer" }}>Shortlist</button>
                  <button onClick={() => handleStatus(app.id, "interview")} style={{ background: "#f59e0b", color: "#fff", border: "none", padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer" }}>Interview</button>
                  <button onClick={() => handleStatus(app.id, "rejected")} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer" }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}