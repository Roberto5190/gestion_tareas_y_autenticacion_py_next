const baseUrl = process.env.API_BASE_URL || 'http://localhost:5000';

export async function api(path, opts = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...opts.headers,
  };

  const res = await fetch(`${baseUrl}/api${path}`, {
    credentials: "include",
    ...opts,
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Error en api(${path}):`, res.status, errText);
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}
