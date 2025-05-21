
import { api } from "../../utils/api";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";
import { redirect } from 'next/navigation'

export default async function TasksPage() {
    let tasks = [];
    try {
        tasks = await api("/tasks");
    } catch {
        // redirigir a login si no autenticado
        return redirect("/tasks")
    }

    return (
        <div className="max-w-lg mx-auto space-y-6">
            <h2 className="text-2xl">Mis Tareas</h2>
            <TaskForm />
            <TaskList tasks={tasks} />
        </div>
    );
}
