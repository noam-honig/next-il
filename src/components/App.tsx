"use client";
import { FormEvent, useEffect, useState } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { Task } from "@prisma/client";
import { type TaskRouter } from "./taskRepo";
import { inferProcedureOutput } from "@trpc/server";

const taskRepo = createTRPCProxyClient<TaskRouter>({
  links: [httpBatchLink({ url: "/api/trpc" })],
});

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    taskRepo.findMany.query().then(setTasks);
  }, []);

  async function addTask(e: FormEvent) {
    e.preventDefault();
    try {
      const newTask = await taskRepo.create({
        data: {
          title: newTaskTitle,
          completed: false,
        },
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function setCompleted(task: Task, completed: boolean) {
    const updatedTask = await taskRepo.update({
      data: { completed },
      where: { id: task.id },
    });
    setTasks((tasks) => tasks.map((t) => (t === task ? updatedTask : t)));
  }

  async function deleteTask(task: Task) {
    try {
      await taskRepo.deleteMany({ where: { id: task.id } });
      setTasks(tasks.filter((t) => t !== task));
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function setAllCompleted(completed: boolean) {
    await taskRepo.updateMany({ data: { completed } });
    setTasks(tasks.map((task) => ({ ...task, completed })));
  }

  return (
    <main>
      <form onSubmit={addTask}>
        <input
          value={newTaskTitle}
          placeholder="What needs to be done?"
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button>Add</button>
      </form>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => setCompleted(task, e.target.checked)}
          />
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task)}>x</button>
        </div>
      ))}
      <footer>
        <button onClick={() => setAllCompleted(true)}>Set all completed</button>
        <button onClick={() => setAllCompleted(false)}>
          Set all uncompleted
        </button>
      </footer>
    </main>
  );
}
