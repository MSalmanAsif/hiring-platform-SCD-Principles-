import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateProfile } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ bio: "", skills: "", phone: "" });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(user!.id).then(res => {
      setForm({ bio: res.data.bio || "", skills: res.data.skills || "", phone: res.data.phone || "" });
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(user!.id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase();

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <div className="navbar-anim" style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>HireHub</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-hover" onClick={() => navigate("/jobs")} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Browse Jobs</button>
          <button className="btn-hover" onClick={() => navigate("/dashboard")} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Dashboard</button>
          <button className="btn-hover" onClick={logoutUser} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem" }}>Logout</button>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{initials}</div>
        </div>
      </div>

      {/* Hero */}
      <div className="hero-banner" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "2.5rem 3rem", color: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", fontWeight: 800, color: "#fff", border: "3px solid rgba(255,255,255,0.4)" }}>{initials}</div>
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.25rem", letterSpacing: "-0.02em" }}>{user?.name}</h2>
            <p style={{ opacity: 0.8, margin: 0, fontSize: "0.9rem" }}>{user?.email} · <span style={{ textTransform: "capitalize", background: "rgba(255,255,255,0.15)", padding: "0.15rem 0.5rem", borderRadius: "10px" }}>{user?.role}</span></p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Profile Form */}
        <div className="animate-fadeInUp card-hover" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem" }}>Edit Profile</h3>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>Phone Number</label>
              <input
                type="text" placeholder="+92 300 0000000" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.95rem", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" }}
                onFocus={e => e.target.style.border = "1.5px solid #4f46e5"}
                onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>Skills <span style={{ color: "#9ca3af", fontWeight: 400 }}>(comma separated)</span></label>
              <input
                type="text" placeholder="React, TypeScript, Python..." value={form.skills}
                onChange={e => setForm({ ...form, skills: e.target.value })}
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.95rem", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" }}
                onFocus={e => e.target.style.border = "1.5px solid #4f46e5"}
                onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>Bio</label>
              <textarea
                placeholder="Tell recruiters about yourself..." value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                rows={4}
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.95rem", outline: "none", fontFamily: "Inter, sans-serif", resize: "vertical", boxSizing: "border-box" }}
                onFocus={e => e.target.style.border = "1.5px solid #4f46e5"}
                onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button className="btn-hover" type="submit" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" }}>
                Save Changes
              </button>
              {saved && <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.9rem" }}>✓ Saved successfully!</span>}
            </div>
          </form>
        </div>

        {/* Skills Preview */}
        {form.skills && (
          <div className="animate-fadeInUp" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem" }}>Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {form.skills.split(",").map(s => s.trim()).filter(Boolean).map(skill => (
                <span key={skill} style={{ background: "#ede9fe", color: "#4f46e5", padding: "0.35rem 0.85rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600 }}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Bio Preview */}
        {form.bio && (
          <div className="animate-fadeInUp" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>About Me</h3>
            <p style={{ color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{form.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}