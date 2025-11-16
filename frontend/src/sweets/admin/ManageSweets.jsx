import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import useAuth from "../../auth/useAuth";

export default function ManageSweets() {
  const { token } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",          // <-- rupees shown in UI
    quantity: "",
    imageUrl: "",
    tag: "",
    subtitle: ""
  });

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function load() {
    setLoading(true);
    try {
      const data = await api.listSweets();
      setItems(data.items || data);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name,
      priceCents: Math.round(Number(form.price) * 100),  // convert rupees → cents
      quantity: Number(form.quantity),
      imageUrl: form.imageUrl,
      tag: form.tag,
      subtitle: form.subtitle
    };

    try {
      if (editing) {
        await api.updateSweet(editing, payload, token);
      } else {
        await api.createSweet(payload, token);
      }

      setForm({
        name: "",
        price: "",
        quantity: "",
        imageUrl: "",
        tag: "",
        subtitle: ""
      });

      setEditing(null);
      await load();
    } catch (e) {
      alert(e.message);
    }
  }

  async function onEdit(id) {
    const sweet = items.find((i) => i._id === id);
    if (!sweet) return;

    setForm({
      name: sweet.name,
      price: (sweet.priceCents ?? 0) / 100,  // convert cents → rupees
      quantity: sweet.quantity,
      imageUrl: sweet.imageUrl || "",
      tag: sweet.tag || "",
      subtitle: sweet.subtitle || ""
    });

    setEditing(id);
  }

  async function onDelete(id) {
    if (!confirm("Delete this sweet?")) return;
    try {
      await api.deleteSweet(id, token);
      await load();
    } catch (e) {
      alert(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 700 }}>
      <h3>Add / Edit Sweet</h3>

      <form
        className="card"
        style={{ padding: "1rem", marginBottom: "1rem" }}
        onSubmit={handleSubmit}
      >
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <input
          className="input"
          type="number"
          step="0.01"
          placeholder="Price (₹)"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
        />

        <input
          className="input"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => updateField("quantity", e.target.value)}
        />

        <input
          className="input"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => updateField("imageUrl", e.target.value)}
        />

        <input
          className="input"
          placeholder="Tag"
          value={form.tag}
          onChange={(e) => updateField("tag", e.target.value)}
        />

        <input
          className="input"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => updateField("subtitle", e.target.value)}
        />

        <button className="btn primary" type="submit" style={{ marginTop: ".75rem" }}>
          {editing ? "Update Sweet" : "Add Sweet"}
        </button>
      </form>

      <h3>Existing Sweets</h3>

      {loading ? (
        <div className="badge gray">Loading…</div>
      ) : items.length === 0 ? (
        <div className="badge gray">No sweets found.</div>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "1rem",
            color: "var(--text)"
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--card-border)" }}>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Tag</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>

                {/* ⬇ PRICE IN RUPEES */}
                <td>₹{(s.priceCents / 100).toLocaleString("en-IN")}</td>

                <td>{s.quantity}</td>
                <td>{s.tag || "-"}</td>

                <td>
                  <button className="btn" onClick={() => onEdit(s._id)}>
                    Edit
                  </button>
                  <button
                    className="btn danger"
                    style={{ marginLeft: 8 }}
                    onClick={() => onDelete(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
