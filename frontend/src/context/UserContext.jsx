import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {}
})

export function UserProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(
            "http://localhost:5000/api/user",
            {credentials: "include"}
        )
        .then((res) => {
            if (!res.ok) throw new Error("No autorizado")
            return res.json()
        })
        .then((data) => setUser(data.user))
        .catch(() => {setUser(null)})
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}