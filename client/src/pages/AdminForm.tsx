import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getJobs, deleteUser, deleteJob, getAllApplications } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface User { id: string; name: string; email: string; role: string; }
interface Job { id: string; title: string; company: string; location: string; recruiter_id: string; status: string; }
interface Application { id: string; job_id: string; candidate_id: string; status: string; }

export default function Admin() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [tab, setTab] = useState<"users" | "jobs" | "apps">("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") { navigate("/jobs"); return; }
    Promise.all([getAllUsers(), getJobs(), getAllApplications()]).then(([u, j, a]) => {
      setUsers(u.data); setJobs(j.data); setApplications(a.data); setLoading(false);
    });
  }, []);

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  const handleDeleteJob = async (id: string) => {
    await deleteJob(id);
    setJobs(jobs.filter(j => j.id !== id));
  };

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase();
  const roleColors: Record<string, { bg: string; color: string }> = {
    candidate: { bg: "#ede9fe", color: "#4f46e5" },
    recruiter: { bg: "#dbeafe", color: "#1d4ed8" },
    admin: { bg: "#fef9c3", color: "#854d0e" },
  };

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <div className="navbar-anim" style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>HireHub</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-hover" onClick={() => navigate("/jobs")} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Jobs</button>
          <button className="btn-hover" onClick={logoutUser} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Logout</button>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{initials}</div>
        </div>
      </div>

      {/* Hero */}
      <div className="hero-banner" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "2.5rem 3rem", color: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ opacity: 0.8, fontSize: "0.9rem", marginBottom: "0.4rem", fontWeight: 500 }}>🛡️ Admin Panel</p>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.25rem", letterSpacing: "-0.02em" }}>Platform Overview</h2>
            <p style={{ opacity: 0.75, fontSize: "0.9rem", margin: 0 }}>Manage all users, jobs, and applications.</p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Users", value: users.length },
              { label: "Jobs", value: jobs.length },
              { label: "Applications", value: applications.length },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center", background: "rgba(255,255,255,0.15)", padding: "0.75rem 1.5rem", borderRadius: "12px" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: "0.8rem", opacity: 0.8, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 2rem" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "#fff", padding: "0.4rem", borderRadius: "10px", border: "1px solid #e5e7eb", width: "fit-content" }}>
          {(["users", "jobs", "apps"] as const).map(t => (
            <button key={t} className="btn-hover" onClick={() => setTab(t)} style={{ padding: "0.5rem 1.25rem", borderRadius: "8px", border: "none", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem", background: tab === t ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "transparent", color: tab === t ? "#fff" : "#6b7280", textTransform: "capitalize" }}>
              {t === "apps" ? "Applications" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="animate-fadeIn" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, margin: 0 }}>All Users</h3>
              <span style={{ background: "#ede9fe", color: "#4f46e5", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>{users.length} total</span>
            </div>
            {users.map(u => (
              <div key={u.id} className="app-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #ede9fe, #c7d2fe)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#4f46e5", fontSize: "0.9rem" }}>
                    {u.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0 }}>{u.name}</p>
                    <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: 0 }}>{u.email}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ background: roleColors[u.role]?.bg, color: roleColors[u.role]?.color, padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, textTransform: "capitalize" }}>{u.role}</span>
                  {u.id !== user?.id && (
                    <button className="btn-hover" onClick={() => handleDeleteUser(u.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Jobs Tab */}
        {tab === "jobs" && (
          <div className="animate-fadeIn" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, margin: 0 }}>All Jobs</h3>
              <span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>{jobs.length} total</span>
            </div>
            {jobs.map(j => (
              <div key={j.id} className="app-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "10px", background: "linear-gradient(135deg, #ede9fe, #c7d2fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>💼</div>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0 }}>{j.title}</p>
                    <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: 0 }}>{j.company} · 📍 {j.location}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ background: j.status === "open" ? "#f0fdf4" : "#f3f4f6", color: j.status === "open" ? "#16a34a" : "#6b7280", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                    {j.status === "open" ? "● Open" : "● Closed"}
                  </span>
                  <span style={{ background: "#f3f4f6", color: "#6b7280", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                    {applications.filter(a => a.job_id === j.id).length} applicants
                  </span>
                  <button className="btn-hover" onClick={() => handleDeleteJob(j.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Applications Tab */}
        {tab === "apps" && (
          <div className="animate-fadeIn" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, margin: 0 }}>All Applications</h3>
              <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>{applications.length} total</span>
            </div>
            {applications.map(a => {
              const job = jobs.find(j => j.id === a.job_id);
              const candidate = users.find(u => u.id === a.candidate_id);
              const statusColors: Record<string, { bg: string; color: string }> = {
                applied:     { bg: "#ede9fe", color: "#4f46e5" },
                shortlisted: { bg: "#f0fdf4", color: "#16a34a" },
                interview:   { bg: "#fffbeb", color: "#d97706" },
                rejected:    { bg: "#fef2f2", color: "#dc2626" },
              };
              return (
                <div key={a.id} className="app-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0 }}>{candidate?.name || "Unknown"} → {job?.title || "Unknown Job"}</p>
                    <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: 0 }}>{job?.company} · {candidate?.email}</p>
                  </div>
                  <span style={{ background: statusColors[a.status]?.bg, color: statusColors[a.status]?.color, padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, textTransform: "capitalize" }}>{a.status}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}