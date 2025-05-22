export async function api(path, opts = {}) {
    const res = await fetch(`/api${path}`, {
      credentials: 'include',    // PARA enviar la cookie httpOnly
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...opts.headers,
      },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }
  