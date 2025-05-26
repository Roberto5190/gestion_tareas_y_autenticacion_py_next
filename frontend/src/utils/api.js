

export async function api(path, opts = {}) {


  // 2️⃣ Construye las cabeceras, incluyendo Authorization si existe token
  const headers = {
    "Content-Type": "application/json",
    ...opts.headers,
  };

  // 3️⃣ Lanza la petición al proxy de Next.js (rutas relativas)
  const res = await fetch(`/api${path}`, {
    credentials: "include",   /// envía siempre access_token_cookie
    ...opts,
    headers,
  });

  if (!res.ok) {
    // Opcional: lee el body de error para ver detalle
    const errText = await res.text();
    console.error(`Error en api(${path}):`, res.status, errText);
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}
