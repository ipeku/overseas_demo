import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // If already signed in, send to home/dashboard
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login({ user: res.data.user, token: res.data.token });

      navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="layout">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="section-title">
          <div>
            <div className="eyebrow">Welcome back</div>
            <h2 style={{ margin: 0 }}>Log in</h2>
          </div>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 0 }}>
          Demo user: student <code>ipekmelis@student.com</code> (pass: <strong>123</strong>).
        </p>
        <form onSubmit={handleSubmit} className="form-grid" style={{ display: "grid", gap: 14 }}>
          <label>
            Email
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
            />
          </label>
          {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}
          <button className="btn btn-primary" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
