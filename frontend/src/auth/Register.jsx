import React, { useState, useContext } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { FlashContext } from "../context/FlashContext";

export default function Register() {
  const navigate = useNavigate();
  const { show } = useContext(FlashContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await api.register(email, password);
      show("Registration successful — please log in");
      navigate("/login", { replace: true });
    } catch (e) {
      setErr(e.message || "Register failed");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2>Create account</h2>
      <form onSubmit={onSubmit} className="card" style={{ padding: "1rem" }}>
        <label>Email</label>
        <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
        {err && <div className="badge danger" style={{ marginTop: 8 }}>{err}</div>}
        <div style={{ marginTop: 12 }}>
          <button className="btn primary" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
