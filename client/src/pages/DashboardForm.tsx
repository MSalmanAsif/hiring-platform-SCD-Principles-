import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs, getMyApplications, getJobApplications } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Job {
  id: string; title: string; description: string;
  company: string; location: string; recruiterId: string; status: string;
}
interface Application {
  id: string; jobId: string; candidateId: string;
  status: "applied" | "shortlisted" | "rejected" | "interview";
}

const statusConfig: Record<string, { color: string; bg: string; icon: string; label: string; step: number }> = {
  applied:     { color: "#4f46e5", bg: "#ede9fe", icon: "📨", label: "Applied",     step: 1 },
  shortlisted: { color: "#16a34a", bg: "#f0fdf4", icon: "⭐", label: "Shortlisted", step: 2 },
  interview:   { color: "#d97706", bg: "#fffbeb", icon: "🗓️", label: "Interview",   step: 3 },
  rejected:    { color: "#dc2626", bg: "#fef2f2", icon: "✕",  label: "Rejected",    step: 0 },
};

const Navbar = ({ user, onLogout, onJobs }: any) => {
  const navigate = useNavigate();
  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase();
  return (
    <div className="navbar-anim" style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 700, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>HireHub</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button className="btn-hover" onClick={onJobs} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Browse Jobs</button>
        {user?.role === "admin" && <button className="btn-hover" onClick={() => navigate("/admin")} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Admin</button>}
        <button className="btn-hover" onClick={() => navigate("/profile")} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Profile</button>
        <button className="btn-hover" onClick={onLogout} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Logout</button>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{initials}</div>
      </div>
    </div>
  );
};

const StatusTimeline = ({ status }: { status: string }) => {
  const stages = ["applied", "shortlisted", "interview"];
  const currentStep = statusConfig[status]?.step || 0;
  const isRejected = status === "rejected";
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "0.75rem" }}>
      {stages.map((stage, i) => {
        const active = !isRejected && currentStep > i;
        const current = !isRejected && currentStep === i + 1;
        return (
          <div key={stage} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: isRejected ? "#fee2e2" : active || current ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: active || current ? "#fff" : "#9ca3af", border: current ? "2px solid #4f46e5" : "none", fontWeight: 700, transition: "all 0.3s ease" }}>
                {isRejected ? "✕" : active || current ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: "0.65rem", color: active || current ? "#4f46e5" : "#9ca3af", fontWeight: 500, textTransform: "capitalize" }}>{stage}</span>
            </div>
            {i < stages.length - 1 && (
              <div className="progress-fill" style={{ flex: 1, height: 2, background: !isRejected && currentStep > i + 1 ? "#4f46e5" : "#e5e7eb", margin: "0 0.25rem", marginBottom: "1rem" }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobMap, setJobMap] = useState<Record<string, Job>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (user?.role === "candidate") {
        const [appsRes, jobsRes] = await Promise.all([getMyApplications(user.id), getJobs()]);
        setApplications(appsRes.data);
        const map: Record<string, Job> = {};
        jobsRes.data.forEach((j: Job) => { map[j.id] = j; });
        setJobMap(map);
      } else if (user?.role === "recruiter") {
        const jobsRes = await getJobs();
        const myJobs = jobsRes.data.filter((j: Job) => j.recruiterId === user.id);
        setJobs(myJobs);
        const allApps: Application[] = [];
        for (const job of myJobs) {
          const appRes = await getJobApplications(job.id);
          allApps.push(...appRes.data);
        }
        setApplications(allApps);
      }
      setLoading(false);
    };

    load();
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
        <p>Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Navbar user={user} onLogout={logoutUser} onJobs={() => navigate("/jobs")} />

      {/* Hero Banner */}
      <div className="hero-banner" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "2.5rem 3rem", color: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ opacity: 0.8, fontSize: "0.9rem", marginBottom: "0.4rem", fontWeight: 500 }}>
              {user?.role === "candidate" ? "👤 Candidate Dashboard" : "🏢 Recruiter Dashboard"}
            </p>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.4rem", letterSpacing: "-0.02em" }}>
              Welcome back, {user?.name} 👋
            </h2>
            <p style={{ opacity: 0.75, fontSize: "0.9rem", margin: 0 }}>
              {user?.role === "candidate" ? "Track your applications and stay on top of your job search." : "Manage your postings, review applicants, and make great hires."}
            </p>
          </div>
          <button className="btn-hover" onClick={() => navigate("/jobs")} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>
            {user?.role === "candidate" ? "Browse Jobs →" : "+ Post a Job"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {user?.role === "recruiter" && (
            <div className="stat-card" style={{ background: "#fff", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <p style={{ color: "#6b7280", fontSize: "0.8rem", fontWeight: 600, margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Jobs Posted</p>
              <p style={{ fontSize: "2rem", fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{jobs.length}</p>
            </div>
          )}
          <div className="stat-card" style={{ background: "#fff", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", fontWeight: 600, margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{user?.role === "candidate" ? "Applied" : "Applicants"}</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, margin: 0, color: "#4f46e5" }}>{applications.length}</p>
          </div>
          <div className="stat-card" style={{ background: "#fff", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", fontWeight: 600, margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Shortlisted</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, margin: 0, color: "#16a34a" }}>{applications.filter(a => a.status === "shortlisted").length}</p>
          </div>
          <div className="stat-card" style={{ background: "#fff", padding: "1.25rem 1.5rem", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", fontWeight: 600, margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Interviews</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, margin: 0, color: "#d97706" }}>{applications.filter(a => a.status === "interview").length}</p>
          </div>
        </div>

        {/* CANDIDATE VIEW */}
        {user?.role === "candidate" && (
          <div className="animate-fadeIn" style={{ background: "#fff", padding: "1.75rem", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>My Applications</h3>
              <span style={{ background: "#ede9fe", color: "#4f46e5", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>{applications.length} total</span>
            </div>
            {applications.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>
                <p style={{ fontSize: "3rem" }}>📭</p>
                <p style={{ fontWeight: 600, marginTop: "0.75rem", color: "#374151" }}>No applications yet</p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>Start applying to jobs and track your progress here.</p>
                <button className="btn-hover" onClick={() => navigate("/jobs")} style={{ marginTop: "1.25rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {applications.map(app => {
                  const job = jobMap[app.jobId];
                  const cfg = statusConfig[app.status];
                  return (
                    <div className="app-card card-hover" key={app.id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem 1.5rem", background: "#fafafa" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                          <div style={{ width: 44, height: 44, borderRadius: "10px", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>{cfg.icon}</div>
                          <div>
                            <p style={{ fontWeight: 700, margin: 0, fontSize: "1rem" }}>{job?.title || "Job"}</p>
                            <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: "0.15rem 0 0" }}>{job?.company} · 📍 {job?.location}</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span style={{ background: cfg.bg, color: cfg.color, padding: "0.3rem 0.9rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700 }}>{cfg.label}</span>
                          <button className="btn-hover" onClick={() => navigate(`/jobs/${app.jobId}`)} style={{ background: "#fff", border: "1.5px solid #e5e7eb", color: "#4f46e5", padding: "0.35rem 0.9rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>View →</button>
                        </div>
                      </div>
                      {app.status !== "rejected" && <StatusTimeline status={app.status} />}
                      {app.status === "rejected" && (
                        <div style={{ marginTop: "0.75rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "0.5rem 0.75rem", fontSize: "0.8rem", color: "#dc2626", fontWeight: 500 }}>
                          ✕ This application was not selected. Keep applying!
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* RECRUITER VIEW */}
        {user?.role === "recruiter" && (
          <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>My Job Postings</h3>
              <button className="btn-hover" onClick={() => navigate("/jobs")} style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.55rem 1.25rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>+ Post New Job</button>
            </div>
            {jobs.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "3rem", textAlign: "center", color: "#9ca3af" }}>
                <p style={{ fontSize: "3rem" }}>📋</p>
                <p style={{ fontWeight: 600, marginTop: "0.75rem", color: "#374151" }}>No jobs posted yet</p>
                <button className="btn-hover" onClick={() => navigate("/jobs")} style={{ marginTop: "1.25rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>Post a Job</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
                {jobs.map(job => {
                  const jobApps = applications.filter(a => a.jobId === job.id);
                  const shortlisted = jobApps.filter(a => a.status === "shortlisted").length;
                  const interview = jobApps.filter(a => a.status === "interview").length;
                  const rejected = jobApps.filter(a => a.status === "rejected").length;
                  return (
                    <div className="job-card card-hover" key={job.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "10px", background: "linear-gradient(135deg, #ede9fe, #c7d2fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>💼</div>
                        <span style={{ background: job.status === "open" ? "#f0fdf4" : "#f3f4f6", color: job.status === "open" ? "#16a34a" : "#6b7280", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>
                          {job.status === "open" ? "● Open" : "● Closed"}
                        </span>
                      </div>
                      <h3 style={{ fontWeight: 700, fontSize: "1rem", margin: "0 0 0.25rem" }}>{job.title}</h3>
                      <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.875rem", margin: "0 0 0.15rem" }}>{job.company}</p>
                      <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: "0 0 1rem" }}>📍 {job.location}</p>
                      <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem" }}>
                        <p style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600, margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Applicants</p>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ background: "#ede9fe", color: "#4f46e5", padding: "0.2rem 0.65rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>{jobApps.length} total</span>
                          {shortlisted > 0 && <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "0.2rem 0.65rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>⭐ {shortlisted} shortlisted</span>}
                          {interview > 0 && <span style={{ background: "#fffbeb", color: "#d97706", padding: "0.2rem 0.65rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>🗓️ {interview} interview</span>}
                          {rejected > 0 && <span style={{ background: "#fef2f2", color: "#dc2626", padding: "0.2rem 0.65rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>✕ {rejected} rejected</span>}
                          {jobApps.length === 0 && <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>No applications yet</span>}
                        </div>
                      </div>
                      <button className="btn-hover" onClick={() => navigate(`/jobs/${job.id}`)} style={{ width: "100%", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.65rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                        Manage Applicants →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}