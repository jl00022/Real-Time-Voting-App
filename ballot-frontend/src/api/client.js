const DEFAULT_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function apiCall(path, { method = "GET", body, token, params, base = DEFAULT_BASE } = {}) {
  let url = base.replace(/\/$/, "") + path;
  if (params) {
    const qs = new URLSearchParams(params).toString();
    url += `?${qs}`;
  }
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const detail = (data && data.detail) || `Request failed (${res.status})`;
    const error = new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
    error.status = res.status;
    throw error;
  }
  return data;
}
