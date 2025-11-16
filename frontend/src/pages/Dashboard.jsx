import React from "react";
import SweetsList from "../sweets/SweetsList";

export default function Dashboard() {
  return (
    <>
      <h2 style={{ margin: "1rem 0 .5rem" }}>Your Dashboard</h2>
      <SweetsList />
    </>
  );
}
