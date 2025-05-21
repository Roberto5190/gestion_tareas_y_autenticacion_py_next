
export async function api(path, opts = {}) {
    const res = await fetch(`http://localhost:5000/api${path}`, {
        credentials: "include",
        ...opts,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}
