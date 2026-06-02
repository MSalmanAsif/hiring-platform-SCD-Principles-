import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      loginUser(res.data);
      navigate("/jobs");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Left Panel */}
      <div style={{ flex: 1, background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem", color: "#fff" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>HireHub</h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.85, lineHeight: 1.7 }}>
          The smart hiring platform connecting top talent with great companies.
        </p>
        <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {["Post jobs in minutes", "Track applications easily", "Find the right fit faster"].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>✓</span>
              <span style={{ opacity: 0.9 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Welcome back</h2>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Sign in to your account</p>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem", color: "#374151" }}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.95rem", outline: "none", transition: "border 0.2s" }}
                onFocus={e => e.target.style.border = "1.5px solid #4f46e5"}
                onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem", color: "#374151" }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.95rem", outline: "none" }}
                onFocus={e => e.target.style.border = "1.5px solid #4f46e5"}
                onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "0.85rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 600, cursor: "pointer", marginTop: "0.5rem" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#6b7280", fontSize: "0.9rem" }}>
            Don't have an account? <Link to="/register" style={{ color: "#4f46e5", fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}