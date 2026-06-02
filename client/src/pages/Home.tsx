import { useNavigate } from "react-router-dom";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const BoltIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BellIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const BriefcaseIcon = ({ color = "#4f46e5", size = 26 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const UserIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: <SearchIcon />,   title: "Smart Search",         desc: "Filter jobs by title, location, and more to find the perfect match." },
    { icon: <ChartIcon />,    title: "Application Tracking", desc: "Real-time status updates from applied to interview — always in the loop." },
    { icon: <BoltIcon />,     title: "Instant Apply",        desc: "Candidates apply with one click. No lengthy forms or uploads." },
    { icon: <UsersIcon />,    title: "Recruiter Dashboard",  desc: "See all applicants per job, shortlist, schedule interviews." },
    { icon: <BellIcon />,     title: "Status Updates",       desc: "Candidates always know where they stand in the hiring process." },
    { icon: <ShieldIcon />,   title: "Role Based Access",    desc: "Separate dashboards and permissions for candidates, recruiters, and admins." },
  ];

  const steps = [
    { icon: <UserIcon />,       step: "01", title: "Register",      desc: "Create your account as a candidate or recruiter in seconds.", delay: "0.1s" },
    { icon: <BriefcaseIcon />,  step: "02", title: "Post or Apply", desc: "Recruiters post jobs, candidates browse and apply with one click.", delay: "0.2s" },
    { icon: <TargetIcon />,     step: "03", title: "Track & Hire",  desc: "Track applications in real-time, shortlist, and hire the best.", delay: "0.3s" },
  ];

  const sampleJobs = [
    { title: "Frontend Developer",    company: "TechCorp",    location: "Remote",    type: "Full-time" },
    { title: "Product Manager",       company: "StartupXYZ",  location: "Karachi",   type: "Full-time" },
    { title: "Backend Engineer",      company: "DevHouse",    location: "Lahore",    type: "Contract" },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#111827", background: "#fff" }}>

      {/* Navbar */}
      <nav className="navbar-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 4rem", borderBottom: "1px solid #f3f4f6", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>HireHub</h1>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Why Us", "Process", "Features"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
              style={{ color: "#6b7280", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
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
        <div className="animate-fadeInUp" style={{ animationDelay: "0.1s", opacity: 0, display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ede9fe", color: "#4f46e5", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.5rem" }}>
          <BoltIcon /> Smart Hiring Platform
        </div>
        <h1 className="animate-fadeInUp" style={{ animationDelay: "0.2s", opacity: 0, fontSize: "3.5rem", fontWeight: 800, lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          Hire the right people,{" "}
          <span style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>faster</span>
        </h1>
        <p className="animate-fadeInUp" style={{ animationDelay: "0.3s", opacity: 0, fontSize: "1.15rem", color: "#6b7280", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          HireHub connects top talent with great companies. Post jobs, track applications, and make smarter hiring decisions — all in one place.
        </p>
        <div className="animate-fadeInUp" style={{ animationDelay: "0.4s", opacity: 0, display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button className="btn-hover" onClick={() => navigate("/register")} style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Get Started Free <ArrowRight />
          </button>
          <button className="btn-hover" onClick={() => navigate("/login")} style={{ background: "#f9fafb", color: "#374151", border: "1.5px solid #e5e7eb", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>
            Sign In
          </button>
        </div>
      </section>

      {/* Sample Jobs Preview */}
      <section style={{ maxWidth: "900px", margin: "0 auto 4rem", padding: "0 2rem" }}>
        <div className="animate-fadeInUp" style={{ background: "#f9fafb", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Latest Openings</span>
            <button onClick={() => navigate("/register")} style={{ background: "none", border: "none", color: "#4f46e5", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>View all <ArrowRight /></button>
          </div>
          {sampleJobs.map((job, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: i < sampleJobs.length - 1 ? "1px solid #f3f4f6" : "none", background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "10px", background: "linear-gradient(135deg, #ede9fe, #c7d2fe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BriefcaseIcon color="#4f46e5" size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: "0.95rem" }}>{job.title}</p>
                  <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: 0, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    {job.company} · <MapPinIcon /> {job.location}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "0.2rem 0.65rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>{job.type}</span>
                <button onClick={() => navigate("/register")} className="btn-hover" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", padding: "0.4rem 1rem", borderRadius: "6px", fontWeight: 600, cursor: "pointer", fontSize: "0.8rem" }}>Apply</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="animate-fadeIn" style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", padding: "2.5rem 4rem", display: "flex", justifyContent: "center", gap: "6rem" }}>
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
          <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Why Us</p>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>A better way to hire top talent</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div className="card-hover animate-fadeInUp" style={{ animationDelay: "0.1s", opacity: 0, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "16px", padding: "2rem" }}>
            <p style={{ color: "#dc2626", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Others</p>
            <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "1.25rem" }}>Delays & bottlenecks</h3>
            {["Lengthy, unpredictable hiring cycles", "Limited candidate quality", "Manual and error-prone screening"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "center" }}>
                <span style={{ color: "#dc2626", display: "flex" }}><XIcon /></span>
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="card-hover animate-fadeInUp" style={{ animationDelay: "0.2s", opacity: 0, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "2rem" }}>
            <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>With HireHub</p>
            <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "1.25rem" }}>Speed & efficiency</h3>
            {["Streamlined hiring with pre-vetted candidates", "Access to top-quality talent", "Structured, reliable screening process"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "center" }}>
                <span style={{ color: "#16a34a", display: "flex" }}><CheckIcon /></span>
                <span style={{ color: "#374151", fontSize: "0.9rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" style={{ background: "#f9fafb", padding: "5rem 4rem", borderTop: "1px solid #f3f4f6" }}>
        <div className="animate-fadeInUp" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Process</p>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>How it works</h2>
        </div>
        <div style={{ display: "flex", gap: "2rem", maxWidth: "900px", margin: "0 auto", justifyContent: "center" }}>
          {steps.map(item => (
            <div key={item.step} className="card-hover animate-fadeInUp" style={{ animationDelay: item.delay, opacity: 0, flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "14px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                {item.icon}
              </div>
              <p style={{ color: "#4f46e5", fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Step {item.step}</p>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>{item.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="animate-fadeInUp" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Features</p>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Everything you need to hire smarter</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {features.map((f, i) => (
            <div key={f.title} className="card-hover animate-fadeInUp" style={{ animationDelay: `${0.1 * (i % 3 + 1)}s`, opacity: 0, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "1.75rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: "12px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                {f.icon}
              </div>
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
        <button className="btn-hover" onClick={() => navigate("/register")} style={{ background: "#fff", color: "#4f46e5", border: "none", padding: "0.9rem 2.5rem", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          Get Started Free <ArrowRight />
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827", color: "#9ca3af", padding: "2rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ color: "#fff", fontWeight: 700, margin: 0 }}>HireHub</h3>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>© 2026 HireHub. All rights reserved.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: "#9ca3af", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}