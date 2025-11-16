import React, { useState } from "react";

export default function SweetCard({ sweet, onBuy }) {
  const [qty, setQty] = useState(1);
  const out = sweet.quantity <= 0;

  return (
    <article className="card pro">
      <div className="media">
        <img
          src={sweet.imageUrl || "https://via.placeholder.com/640x480?text=Sweet"}
          alt={sweet.name}
          loading="lazy"
        />
        {sweet.tag ? <span className="chip">{sweet.tag}</span> : null}
      </div>

      <div className="body">
        <div className="title-row">
          <h3 className="title">{sweet.name}</h3>
          <span className="price">₹{(sweet.priceCents / 100).toFixed(0)}</span>
        </div>

        {sweet.subtitle ? <p className="subtitle clamp-2">{sweet.subtitle}</p> : null}

        <div className="meta">
          {out ? (
            <span className="pill danger">Out of stock</span>
          ) : (
            <span className="pill success">{sweet.quantity} in stock</span>
          )}

          <div className="stepper">
            <button aria-label="decrease" onClick={() => setQty(n => Math.max(1, n - 1))}>−</button>
            <span>{qty}</span>
            <button aria-label="increase" onClick={() => setQty(n => Math.min(10, n + 1))}>+</button>
          </div>
        </div>

        <button
          className="btn primary block"
          disabled={out}
          onClick={() => onBuy(sweet, qty)}
        >
          Buy
        </button>
      </div>
    </article>
  );
}
