import React, { useContext } from "react";
import { FlashContext } from "../context/FlashContext";

export default function Flash() {
  const { msg, clear } = useContext(FlashContext);
  if (!msg) return null;
  return (
    <div
      role="status"
      onClick={clear}
      style={{
        position: "fixed",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: msg.type === "success" ? "var(--brand)" : "var(--danger)",
        color: "white",
        padding: ".6rem .9rem",
        borderRadius: ".6rem",
        boxShadow: "0 6px 20px rgba(0,0,0,.25)",
        cursor: "pointer"
      }}
    >
      {msg.text}
    </div>
  );
}
