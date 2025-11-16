import React, { useState, useContext } from "react";
import useAuth from "./useAuth";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { FlashContext } from "../context/FlashContext";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { show } = useContext(FlashContext);

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("secret123");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const { token } = await api.login(email, password);
      setToken(token);
      show("Login successful — redirecting to Home");
      navigate("/", { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="card" style={{ padding: "1rem" }}>
        <label>Email</label>
        <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="demo@example.com" />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
        {err && <div className="badge danger" style={{ marginTop: 8 }}>{err}</div>}
        <div style={{ marginTop: 12 }}>
          <button className="btn primary" type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}
