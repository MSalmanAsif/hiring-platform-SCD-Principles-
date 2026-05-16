import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs, createJob, deleteJob } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Job {
  id: string; title: string; description: string;
  company: string; location: string; recruiter_id: string; status: string;
}


export default function Jobs() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", company: "", location: "" });

  useEffect(() => {
    getJobs().then(res => setJobs(res.data));
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

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>HireHub</h1>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Hey, {user?.name} ({user?.role})</span>
          <button style={styles.navBtn} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button style={styles.navBtn} onClick={logoutUser}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h2>Open Positions</h2>
          {user?.role === "recruiter" && (
            <button style={styles.primaryBtn} onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ Post Job"}
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleCreate} style={styles.form}>
            <input style={styles.input} placeholder="Job Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input style={styles.input} placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
            <input style={styles.input} placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
            <textarea style={styles.textarea} placeholder="Job Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            <button style={styles.primaryBtn} type="submit">Post Job</button>
          </form>
        )}

        <div style={styles.grid}>
          {jobs.map(job => (
            <div key={job.id} style={styles.card}>
              <h3 style={styles.jobTitle}>{job.title}</h3>
              <p style={styles.company}>{job.company}</p>
              <p style={styles.location}>📍 {job.location}</p>
              <p style={styles.desc}>{job.description.slice(0, 100)}...</p>
              <div style={styles.cardFooter}>
                <button style={styles.primaryBtn} onClick={() => navigate(`/jobs/${job.id}`)}>View</button>
                {user?.role === "recruiter" && user.id === job.recruiter_id && (
                  <button style={styles.dangerBtn} onClick={() => handleDelete(job.id)}>Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: "100vh", background: "#f5f7fa", fontFamily: "sans-serif" },
  navbar: { background: "#4f46e5", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { color: "#fff", margin: 0, fontSize: "1.5rem" },
  navRight: { display: "flex", alignItems: "center", gap: "1rem" },
  welcome: { color: "#c7d2fe", fontSize: "0.9rem" },
  navBtn: { background: "transparent", border: "1px solid #c7d2fe", color: "#fff", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer" },
  content: { padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
  form: { background: "#fff", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  input: { padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" },
  textarea: { padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem", minHeight: "100px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" },
  card: { background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  jobTitle: { margin: "0 0 0.25rem", fontSize: "1.1rem", fontWeight: 700 },
  company: { margin: "0 0 0.25rem", color: "#4f46e5", fontWeight: 600 },
  location: { margin: "0 0 0.75rem", color: "#888", fontSize: "0.9rem" },
  desc: { color: "#555", fontSize: "0.9rem", marginBottom: "1rem" },
  cardFooter: { display: "flex", gap: "0.5rem" },
  primaryBtn: { background: "#4f46e5", color: "#fff", border: "none", padding: "0.5rem 1.25rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600 },
  dangerBtn: { background: "#ef4444", color: "#fff", border: "none", padding: "0.5rem 1.25rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600 },
};