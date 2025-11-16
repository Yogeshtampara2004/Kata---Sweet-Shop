import React, { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

function decodeRole(token) {
  try {
    const [, payloadB64] = token.split(".");
    const json = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
    return json.role || "USER";
  } catch {
    return "USER";
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role") || "USER");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const r = decodeRole(token);
      setRole(r);
      localStorage.setItem("role", r);
    } else {
      localStorage.removeItem("token");
      setRole("USER");
      localStorage.setItem("role", "USER");
    }
  }, [token]);

  const value = useMemo(() => ({ token, setToken, role, setRole }), [token, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
