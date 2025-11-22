import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const intro =
  "Welcome to Overseas Housing. Find a place you feel good about; trusted people confirm listings, speak your language, show live tours, and help with paperwork.";

export default function LandingPage() {
  const { user } = useAuth();
  const isAuthed = Boolean(user);
  // Redirect signed-in users to their role dashboard
  const dashboardRoute = user
    ? user.role === "consultant"
      ? "/consultant"
      : user.role === "representative"
        ? "/representative"
        : user.role === "owner"
          ? "/owner"
          : "/student"
    : null;
  const primaryCta = isAuthed ? dashboardRoute : "/register";
  const secondaryCta = isAuthed ? dashboardRoute : "/login";

  return (
    <div className="main-content compact">
      <section className="hero hero-main animate-fade">
        <div className="hero-left">
          <div className="eyebrow">Your trusted path to housing abroad</div>
          <h1>Welcome to Overseas Housing</h1>
          <p>{intro}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to={primaryCta}>
              {isAuthed ? "Go to dashboard" : "Start now"}
            </Link>
          </div>
        </div>
        <div className="hero-pills">
          {[
            { icon: "🏠", text: "Verified homes" },
            { icon: "🎥", text: "Live tours" },
            { icon: "🧑‍💼", text: "Human support" },
            { icon: "🌍", text: "Multi-language" },
            { icon: "💸", text: "Transparent pricing" },
            { icon: "⏱️", text: "Fast onboarding" },
          ].map((item) => (
            <div key={item.text} className="hero-pill">
              <span aria-hidden="true">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      <div className="hero-grid" style={{ marginTop: 14 }}>
        <div className="card animate-fade delay-1">
          <div className="eyebrow">
            <span className="mini-icon" aria-hidden="true" />
            🧭 Self-serve
          </div>
          <p>Set city, budget, and lifestyle; browse verified homes; request a live walkthrough with a student rep.</p>
        </div>
        <div className="card animate-fade delay-2">
          <div className="eyebrow">
            <span className="mini-icon" aria-hidden="true" />
            🤝 Advisor-led
          </div>
          <p>A consultant curates a shortlist, negotiates with owners, checks documents, and keeps you on track without the stress.</p>
        </div>
        <div className="card animate-fade delay-3">
          <div className="eyebrow">
            <span className="mini-icon" aria-hidden="true" />
            🎥 Live tours
          </div>
          <p>Local reps open a Jitsi room, walk the home and neighborhood live, and answer in your language.</p>
        </div>
      </div>
    </div>
  );
}

