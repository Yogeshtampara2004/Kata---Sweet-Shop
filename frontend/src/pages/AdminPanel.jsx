import React from "react";
import ManageSweets from "../sweets/admin/ManageSweets";

export default function AdminPanel() {
  return (
    <>
      <h2 style={{ margin: "1rem 0 .5rem" }}>Admin Panel</h2>
      <ManageSweets />
    </>
  );
}
