const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

async function http(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: opts.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {})
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

export const api = {
  listSweets(search) {
    const q = search ? `?search=${encodeURIComponent(search)}` : "";
    return http(`/api/sweets${q}`);
  },
  purchase(id, qty, token) {
    return http(`/api/sweets/${id}/purchase`, {
      method: "POST",
      body: { qty },
      token
    });
  },
  login(email, password) {
    return http("/api/auth/login", {
      method: "POST",
      body: { email, password }
    });
  },
  register(email, password) {
    return http("/api/auth/register", {
      method: "POST",
      body: { email, password }
    });
  },
  createSweet(data, token) {
    return http("/api/sweets", {
      method: "POST",
      body: data,
      token
    });
  },
  updateSweet(id, data, token) {
    return http(`/api/sweets/${id}`, {
      method: "PUT",
      body: data,
      token
    });
  },
  deleteSweet(id, token) {
    return http(`/api/sweets/${id}`, {
      method: "DELETE",
      token
    });
  }
};
