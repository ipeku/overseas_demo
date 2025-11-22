import { useState } from "react";

export default function PaymentModal({ open, onClose, item, onConfirm }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    exp: "",
    cvc: ""
  });
  const [status, setStatus] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Processing...");
    setTimeout(() => {
      setStatus("Payment confirmed. Reservation created.");
      if (onConfirm) onConfirm();
      setTimeout(() => {
        setStatus("");
        onClose && onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 16
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 14,
        maxWidth: 520,
        width: "100%",
        padding: 20,
        boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
        border: "1px solid var(--border)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Checkout</h3>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <p style={{ color: "var(--muted)" }}>
          {item?.title || "Reservation"} — {item?.amount ? `EUR ${item.amount}` : "no charge (demo)"}
        </p>
        <form onSubmit={handleSubmit} className="form-grid" style={{ display: "grid", gap: 10 }}>
          <label>
            Full name
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
          <label>
            Card number
            <input name="card" value={form.card} onChange={handleChange} placeholder="4242 4242 4242 4242" />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <label>
              Exp
              <input name="exp" value={form.exp} onChange={handleChange} placeholder="12/30" />
            </label>
            <label>
              CVC
              <input name="cvc" value={form.cvc} onChange={handleChange} placeholder="123" />
            </label>
          </div>
          <button className="btn btn-primary" type="submit">Pay & confirm</button>
          {status && <div style={{ color: "var(--muted)" }}>{status}</div>}
        </form>
      </div>
    </div>
  );
}
