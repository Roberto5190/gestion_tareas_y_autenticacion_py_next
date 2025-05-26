"use client";

import { useState } from "react";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";

export default function ClientTasks({ initialTasks, jwt }) {
  const [tasks, setTasks] = useState(initialTasks);

  function onAdd(newTask) {
    setTasks(prev => [newTask, ...prev]);
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl">Mis Tareas</h2>
      <TaskForm jwt={jwt} onAdd={onAdd} />
      <TaskList tasks={tasks} />
    </div>
  );
}
