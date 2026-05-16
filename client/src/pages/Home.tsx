import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#111827", background: "#fff" }}>

      {/* Navbar */}
      <nav className="navbar-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 4rem", borderBottom: "1px solid #f3f4f6", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>HireHub</h1>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Why Us", "Process", "Features"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} style={{ color: "#6b7280", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#4f46e5")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
            >{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn-hover" onClick={() => navigate("/login")} style={{ background: "transparent", border: "1.5px solid #e5e7eb", color: "#374151", padding: "0.55rem 1.25rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>Sign In</button>
          <button className="btn-hover" onClick={() => navigate("/register")} style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.55rem 1.25rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "6rem 2rem 4rem", maxWidth: "800px", margin: "0 auto" }}>
        <div className="animate-fadeInUp" style={{ animationDelay: "0.1s", opacity: 0, display: "inline-block", background: "#ede9fe", color: "#4f46e5", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.5rem" }}>
          🚀 Smart Hiring Platform
        </div>
        <h1 className="animate-fadeInUp" style={{ animationDelay: "0.2s", opacity: 0, fontSize: "3.5rem", fontWeight: 800, lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          Hire the right people,{" "}
          <span style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>faster</span>
        </h1>
        <p className="animate-fadeInUp" style={{ animationDelay: "0.3s", opacity: 0, fontSize: "1.15rem", color: "#6b7280", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          HireHub connects top talent with great companies. Post jobs, track applications, and make smarter hiring decisions — all in one place.
        </p>
        <div className="animate-fadeInUp" style={{ animationDelay: "0.4s", opacity: 0, display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button className="btn-hover" onClick={() => navigate("/register")} style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>
            Get Started Free
          </button>
          <button className="btn-hover" onClick={() => navigate("/login")} style={{ background: "#f9fafb", color: "#374151", border: "1.5px solid #e5e7eb", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>
            Sign In →
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="animate-fadeIn" style={{ animationDelay: "0.5s", opacity: 0, background: "#f9fafb", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", padding: "2.5rem 4rem", display: "flex", justifyContent: "center", gap: "6rem" }}>
        {[
          { value: "10,000+", label: "Jobs Posted" },
          { value: "50,000+", label: "Candidates" },
          { value: "98%",     label: "Satisfaction Rate" },
          { value: "40%",     label: "Faster Hiring" },
        ].map((stat, i) => (
          <div key={stat.label} className="stat-card" style={{ animationDelay: `${0.1 * i}s`, textAlign: "center" }}>
            <p style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{stat.value}</p>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0.25rem 0 0", fontWeight: 500 }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Why Us */}
      <section id="why-us" style={{ padding: "5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="animate-fadeInUp" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>WHY US</p>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>A better way to hire top talent</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div className="card-hover animate-fadeInUp" style={{ animationDelay: "0.1s", opacity: 0, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "16px", padding: "2rem" }}>
            <p style={{ color: "#dc2626", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>❌ OTHERS</p>
            <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "1.25rem" }}>Delays & bottlenecks</h3>
            {["Lengthy, unpredictable hiring cycles", "Limited candidate quality", "Manual and error-prone screening"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "center" }}>
                <span style={{ color: "#dc2626" }}>✕</span>
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="card-hover animate-fadeInUp" style={{ animationDelay: "0.2s", opacity: 0, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "2rem" }}>
            <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>✓ WITH HIREHUB</p>
            <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "1.25rem" }}>Speed & efficiency</h3>
            {["Streamlined hiring with pre-vetted candidates", "Access to top-quality talent", "Structured, reliable screening process"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "center" }}>
                <span style={{ color: "#16a34a" }}>✓</span>
                <span style={{ color: "#374151", fontSize: "0.9rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" style={{ background: "#f9fafb", padding: "5rem 4rem", borderTop: "1px solid #f3f4f6" }}>
        <div className="animate-fadeInUp" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>PROCESS</p>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>How it works</h2>
        </div>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "900px", margin: "0 auto", justifyContent: "center" }}>
          {[
            { step: "01", title: "Register",      desc: "Create your account as a candidate or recruiter in seconds.", icon: "👤", delay: "0.1s" },
            { step: "02", title: "Post or Apply", desc: "Recruiters post jobs, candidates browse and apply with one click.", icon: "💼", delay: "0.2s" },
            { step: "03", title: "Track & Hire",  desc: "Track applications in real-time, shortlist, schedule interviews, and hire.", icon: "🎯", delay: "0.3s" },
          ].map(item => (
            <div key={item.step} className="card-hover animate-fadeInUp" style={{ animationDelay: item.delay, opacity: 0, flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{item.icon}</div>
              <p style={{ color: "#4f46e5", fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.5rem" }}>STEP {item.step}</p>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>{item.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="animate-fadeInUp" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>FEATURES</p>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Everything you need to hire smarter</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {[
            { icon: "🔍", title: "Smart Search",        desc: "Filter jobs by title, location, and more to find the perfect match.", delay: "0.1s" },
            { icon: "📊", title: "Application Tracking", desc: "Real-time status updates from applied to interview.", delay: "0.2s" },
            { icon: "⚡", title: "Instant Apply",        desc: "Candidates apply with one click. No lengthy forms.", delay: "0.3s" },
            { icon: "👥", title: "Recruiter Dashboard",  desc: "See all applicants, shortlist, schedule interviews.", delay: "0.1s" },
            { icon: "🔔", title: "Status Updates",       desc: "Candidates always know where they stand.", delay: "0.2s" },
            { icon: "🛡️", title: "Role Based Access",   desc: "Separate dashboards for candidates, recruiters, admins.", delay: "0.3s" },
          ].map(f => (
            <div key={f.title} className="card-hover animate-fadeInUp" style={{ animationDelay: f.delay, opacity: 0, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "1.75rem" }}>
              <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{f.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-banner" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 className="animate-fadeInUp" style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          Ready to hire the right people, faster?
        </h2>
        <p className="animate-fadeIn" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: "2rem" }}>
          Join thousands of companies and candidates already using HireHub.
        </p>
        <button className="btn-hover" onClick={() => navigate("/register")} style={{ background: "#fff", color: "#4f46e5", border: "none", padding: "0.9rem 2.5rem", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>
          Get Started Free →
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827", color: "#9ca3af", padding: "2rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ color: "#fff", fontWeight: 700, margin: 0 }}>HireHub</h3>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>© 2026 HireHub. Built with ❤️</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: "#9ca3af", fontSize: "0.875rem", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}