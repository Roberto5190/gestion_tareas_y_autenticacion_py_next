import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";

export default async function TasksPage() {
    // 1. Obtenemos el cookie store y luego leemos la cookie
    const cookiesStore = await cookies()
    console.log(cookiesStore.get("access_token_cookie").value);
    
    const jwt = cookiesStore.get("access_token_cookie").value;
    console.log(jwt)
    
    if (!jwt) {
        // Sin token, volvemos a login
        return redirect("/login");
    }

    // 2. Llamada al backend incluyendo la cookie automáticamente
    const res = await fetch("http://localhost:5000/api/tasks", {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
 
    const tasks = await res.json();

    // 3. Renderizamos con SSR
    return (
        <div className="max-w-lg mx-auto space-y-6">
            <h2 className="text-2xl">Mis Tareas</h2>
            {/* TaskForm es "use client" y también utiliza fetch con cookies */}
            <TaskForm />
            <TaskList tasks={tasks} />
        </div>
    );
}