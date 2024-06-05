"use client";
import { FormEvent, useEffect, useState } from "react";
import type { Task } from "@prisma/client";
import { validateTask } from "../model/validateTask";

import {
  deleteTask,
  findTasks,
  insertTask,
  updateTask,
} from "../model/task-service";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    findTasks({
      orderBy: {
        createdAt: "asc",
      },
      where: showCompleted
        ? {}
        : {
            completed: false,
          },
    }).then(setTasks);
  }, [showCompleted]);

  async function addTask(e: FormEvent) {
    e.preventDefault();
    try {
      const newTask = await insertTask(
        validateTask({ title: newTaskTitle }, true)
      );
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function setCompleted(task: Task, completed: boolean) {
    const updatedTask = await updateTask(task.id, {
      completed,
    });
    console.log(updatedTask);
    setTasks((tasks) => tasks.map((t) => (t === task ? updatedTask : t)));
  }

  async function handleDeleteTask(task: Task) {
    try {
      await deleteTask(task.id);
      setTasks(tasks.filter((t) => t !== task));
    } catch (error: any) {
      alert(error.message);
    }
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
          <button onClick={() => handleDeleteTask(task)}>x</button>
        </div>
      ))}
      <footer>
        <button onClick={() => setShowCompleted((x) => !x)}>
          {showCompleted ? "Show Uncompleted" : "Show Completed"}
        </button>
      </footer>
    </main>
  );
}
