// export async function api(path, opts = {}) {
//     const res = await fetch(`/api${path}`, {
//         credentials: 'include',    // PARA enviar la cookie httpOnly
//         ...opts,
//         headers: {
//             'Content-Type': 'application/json',
//             ...opts.headers,
//         },
//     })
//     if (!res.ok) throw new Error(`HTTP ${res.status}`)
//     return res.json()
// }


export async function api(path, opts = {}) {


    
    const res = await fetch(`/api${path}`, {
        credentials: "include", // si usas cookies
        ...opts,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${jwt}` }),
            ...opts.headers,
        },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}
