import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientTasks from "./client-tasks";


export default async function TasksPage() {
    // 1. Obtenemos el cookie store y luego leemos la cookie
    const cookiesStore = await cookies()


    const jwt = cookiesStore.get("access_token_cookie").value;


    if (!jwt) {
        // Sin token, volvemos a login
        return redirect("/login");
    }

    // 2. Llamada al backend incluyendo la cookie automáticamente
    const res = await fetch("http://127.0.0.1:5000/api/tasks", {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
    // DEBUG: si no es JSON, vuelca el texto
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Respuesta inesperada de /api/tasks:", text);
        return redirect("/login");
    }
    const tasks = await res.json();

    return <ClientTasks initialTasks={tasks} jwt={jwt} />;

}
