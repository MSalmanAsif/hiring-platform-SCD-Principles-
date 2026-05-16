import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs, createJob, deleteJob } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Job {
  id: string; title: string; description: string;
  company: string; location: string; recruiter_id: string; status: string;
}

const Navbar = ({ user, onLogout, onDashboard }: any) => {
  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase();
  return (
    <div className="navbar-anim" style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 700, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>HireHub</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button className="btn-hover" onClick={onDashboard} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Dashboard</button>
        <button className="btn-hover" onClick={onLogout} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Logout</button>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
          {initials}
        </div>
      </div>
    </div>
  );
};

export default function Jobs() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", company: "", location: "" });

  useEffect(() => {
    getJobs().then(res => { setJobs(res.data); setLoading(false); });
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createJob({ ...form, recruiter_id: user!.id });
    setJobs([...jobs, res.data]);
    setForm({ title: "", description: "", company: "", location: "" });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteJob(id);
    setJobs(jobs.filter(j => j.id !== id));
  };

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) &&
    j.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  const locations = [...new Set(jobs.map(j => j.location))];

  const inputStyle: React.CSSProperties = {
    padding: "0.65rem 1rem", borderRadius: "8px", border: "1.5px solid #e5e7eb",
    fontSize: "0.9rem", outline: "none", fontFamily: "Inter, sans-serif", width: "100%",
    transition: "border 0.2s"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Navbar user={user} onLogout={logoutUser} onDashboard={() => navigate("/dashboard")} />

      {/* Hero Banner */}
      <div className="hero-banner" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "2rem 3rem", color: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ opacity: 0.8, fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: 500 }}>💼 Job Board</p>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Open Positions</h2>
            <p style={{ opacity: 0.75, fontSize: "0.875rem", margin: "0.25rem 0 0" }}>{filtered.length} jobs available right now</p>
          </div>
          {user?.role === "recruiter" && (
            <button className="btn-hover" onClick={() => setShowForm(!showForm)} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>
              {showForm ? "✕ Cancel" : "+ Post Job"}
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>

        {/* Search & Filter */}
        <div className="animate-fadeInUp" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ flex: 2, position: "relative" }}>
            <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
            <input
              placeholder="Search by job title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: "2.25rem" }}
              onFocus={e => e.target.style.border = "1.5px solid #4f46e5"}
              onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
            />
          </div>
          <div style={{ flex: 1 }}>
            <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} style={{ ...inputStyle, background: "#fff", cursor: "pointer" }}>
              <option value="">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Post Job Form */}
        {showForm && (
          <form onSubmit={handleCreate} className="animate-fadeInUp" style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Post a New Job</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <input style={inputStyle} placeholder="Job Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required onFocus={e => e.target.style.border = "1.5px solid #4f46e5"} onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"} />
              <input style={inputStyle} placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required onFocus={e => e.target.style.border = "1.5px solid #4f46e5"} onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"} />
              <input style={inputStyle} placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required onFocus={e => e.target.style.border = "1.5px solid #4f46e5"} onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"} />
            </div>
            <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="Job Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            <button className="btn-hover" type="submit" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>
              Post Job
            </button>
          </form>
        )}

        {/* Jobs Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#9ca3af" }}>
            <p style={{ fontSize: "2rem" }}>⏳</p>
            <p style={{ marginTop: "0.5rem" }}>Loading jobs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="animate-fadeIn" style={{ textAlign: "center", padding: "4rem", color: "#9ca3af" }}>
            <p style={{ fontSize: "3rem" }}>🔎</p>
            <p style={{ fontWeight: 600, marginTop: "1rem", color: "#374151" }}>No jobs found</p>
            <p style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {filtered.map(job => (
              <div className="job-card card-hover" key={job.id} style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "10px", background: "linear-gradient(135deg, #ede9fe, #c7d2fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>💼</div>
                  <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>● Open</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{job.title}</h3>
                <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{job.company}</p>
                <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginBottom: "0.75rem" }}>📍 {job.location}</p>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {job.description.length > 100 ? job.description.slice(0, 100) + "..." : job.description}
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="btn-hover" onClick={() => navigate(`/jobs/${job.id}`)} style={{ flex: 1, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.6rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                    View Job
                  </button>
                  {user?.role === "recruiter" && user.id === job.recruiter_id && (
                    <button className="btn-hover" onClick={() => handleDelete(job.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "0.6rem 1rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}