import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const { token, role, setToken } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => setQ(searchParams.get("q") || ""), [searchParams]);

  function onSearchSubmit(e) {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (q) next.set("q", q);
    else next.delete("q");
    setSearchParams(next);
    if (location.pathname !== "/") navigate("/");
  }

  function logout() {
    setToken(null);
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
    
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Kata - Your Sweet Shop
          </Link>
        </div>

        <form className="search" onSubmit={onSearchSubmit}>
          <input
            placeholder="Search sweets…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn-ghost" type="submit">🔍</button>
        </form>

        <div className="actions">
          <button className="btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {token ? (
            <>
              {role === "ADMIN" && <Link className="btn" to="/admin">Admin</Link>}
              <button className="btn danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn primary" to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
