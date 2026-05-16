import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs, getMyApplications, getJobApplications } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Job {
  id: string; title: string; description: string;
  company: string; location: string; recruiter_id: string; status: string;
}
interface Application {
  id: string; job_id: string; candidate_id: string;
  status: "applied" | "shortlisted" | "rejected" | "interview";
}

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (user?.role === "candidate") {
      getMyApplications(user.id).then(res => setApplications(res.data));
    } else if (user?.role === "recruiter") {
      getJobs().then(async res => {
        const myJobs = res.data.filter((j: Job) => j.recruiter_id === user.id);
        setJobs(myJobs);
        const allApps: Application[] = [];
        for (const job of myJobs) {
          const appRes = await getJobApplications(job.id);
          allApps.push(...appRes.data);
        }
        setApplications(allApps);
      });
    }
  }, []);

  const statusColors: Record<string, string> = {
    applied: "#6366f1",
    shortlisted: "#22c55e",
    interview: "#f59e0b",
    rejected: "#ef4444",
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>HireHub</h1>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Hey, {user?.name}</span>
          <button style={styles.navBtn} onClick={() => navigate("/jobs")}>Jobs</button>
          <button style={styles.navBtn} onClick={logoutUser}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <h2>Dashboard</h2>

        {/* Stats */}
        <div style={styles.statsRow}>
          {user?.role === "recruiter" && (
            <div style={styles.statCard}>
              <h3 style={styles.statNum}>{jobs.length}</h3>
              <p style={styles.statLabel}>Jobs Posted</p>
            </div>
          )}
          <div style={styles.statCard}>
            <h3 style={styles.statNum}>{applications.length}</h3>
            <p style={styles.statLabel}>{user?.role === "candidate" ? "Jobs Applied" : "Total Applications"}</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNum}>
              {applications.filter(a => a.status === "shortlisted").length}
            </h3>
            <p style={styles.statLabel}>Shortlisted</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNum}>
              {applications.filter(a => a.status === "interview").length}
            </h3>
            <p style={styles.statLabel}>Interviews</p>
          </div>
        </div>

        {/* Candidate view */}
        {user?.role === "candidate" && (
          <div style={styles.section}>
            <h3>My Applications</h3>
            {applications.length === 0 && <p style={styles.empty}>You haven't applied to any jobs yet.</p>}
            {applications.map(app => (
              <div key={app.id} style={styles.row}>
                <span style={styles.rowLabel}>Job ID: {app.job_id}</span>
                <span style={{ ...styles.badge, background: statusColors[app.status] }}>
                  {app.status}
                </span>
                <button style={styles.viewBtn} onClick={() => navigate(`/jobs/${app.job_id}`)}>View Job</button>
              </div>
            ))}
          </div>
        )}

        {/* Recruiter view */}
        {user?.role === "recruiter" && (
          <div style={styles.section}>
            <h3>My Job Postings</h3>
            {jobs.length === 0 && <p style={styles.empty}>You haven't posted any jobs yet.</p>}
            {jobs.map(job => (
              <div key={job.id} style={styles.row}>
                <div>
                  <p style={styles.rowLabel}>{job.title}</p>
                  <p style={styles.rowSub}>{job.company} · {job.location}</p>
                </div>
                <span style={styles.appCount}>
                  {applications.filter(a => a.job_id === job.id).length} applicants
                </span>
                <button style={styles.viewBtn} onClick={() => navigate(`/jobs/${job.id}`)}>Manage</button>
              </div>
            ))}
          </div>
        )}
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
  content: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  statsRow: { display: "flex", gap: "1rem", margin: "1.5rem 0" },
  statCard: { background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", flex: 1, textAlign: "center" },
  statNum: { fontSize: "2rem", fontWeight: 700, color: "#4f46e5", margin: 0 },
  statLabel: { color: "#888", margin: "0.25rem 0 0", fontSize: "0.9rem" },
  section: { background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #f0f0f0" },
  rowLabel: { fontWeight: 600, margin: 0 },
  rowSub: { color: "#888", fontSize: "0.85rem", margin: "0.25rem 0 0" },
  badge: { color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 },
  appCount: { color: "#4f46e5", fontWeight: 600 },
  viewBtn: { background: "#f0f0ff", color: "#4f46e5", border: "none", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer", fontWeight: 600 },
  empty: { color: "#aaa", textAlign: "center", padding: "2rem 0" },
};