// frontend/src/sweets/SweetsList.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SweetCard from "../components/SweetCard";
import { api } from "../api/client";
import useAuth from "../auth/useAuth";
import { FlashContext } from "../context/FlashContext";

export default function SweetsList() {
  const { token } = useAuth();
  const { show } = useContext(FlashContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await api.listSweets(q);
        if (!cancelled) setItems(data.items || data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [q]);

  async function onBuy(sweet, qty) {
    if (!token) {
      show("Please log in to purchase", "error");
      return;
    }

    const id = sweet._id;
    const snapshot = items;

    // optimistic update
    setItems(curr =>
      curr.map(s => (s._id === id ? { ...s, quantity: Math.max(0, s.quantity - qty) } : s))
    );

    try {
      const { item } = await api.purchase(id, qty, token);
      // sync with server
      setItems(curr => curr.map(s => (s._id === id ? item : s)));
      show(`Purchase successful — ${qty} × ${sweet.name}`);
    } catch (e) {
      // rollback
      setItems(snapshot);
      show(e.message || "Purchase failed", "error");
    }
  }

  const grid = useMemo(
    () => items.map(s => <SweetCard key={s._id} sweet={s} onBuy={onBuy} />),
    [items]
  );

  if (loading) {
    return (
      <section className="grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card" style={{ height: 250 }} />
        ))}
      </section>
    );
  }

  if (!items.length) return <div className="badge gray">No sweets found.</div>;

  return <section className="grid">{grid}</section>;
}
