import React from "react";
import SweetsList from "../sweets/SweetsList";

export default function Home() {
  return (
    <>
      <h2 style={{ margin: "1rem 0 .5rem" }}>Available Sweets</h2>
      <SweetsList />
      <footer className="note">Tip: Use the search box in the top bar to filter.</footer>
    </>
  );
}
