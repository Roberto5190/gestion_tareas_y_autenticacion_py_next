// Este puede ser componente de servidor, solo renderiza la lista pasada como prop.
export default function TaskList({ tasks }) {
    if (!tasks || tasks.length === 0) {
        return <p className="text-center">No tienes tareas.</p>;
    }
    return (
        <ul className="space-y-2">
            {tasks.map(task => (
                <li
                    key={task.id}
                    className="border p-4 rounded hover:shadow-sm transition-shadow"
                >
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                </li>
            ))}
        </ul>
    );
}
