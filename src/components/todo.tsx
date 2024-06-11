"use client";
import { FormEvent, useEffect, useState } from "react";

import type { Task } from "@prisma/client";
import { validateTask } from "../model/validateTask";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetch("/api/tasks/?showCompleted=" + showCompleted)
      .then((x) => x.json())
      .then(setTasks);
  }, [showCompleted]);

  async function addTask(e: FormEvent) {
    e.preventDefault();
    try {
      const newTask = await fetch("/api/tasks/", {
        method: "POST",
        body: JSON.stringify(validateTask({ title: newTaskTitle })),
      }).then((x) => {
        if (x.ok) return x.json();
        else throw new Error(x.statusText);
      });

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function setCompleted(task: Task, completed: boolean) {
    const updatedTask = await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({ completed }),
    }).then((x) => {
      if (x.ok) return x.json();
      else throw new Error(x.statusText);
    });

    setTasks((tasks) => tasks.map((t) => (t === task ? updatedTask : t)));
  }

  async function handleDeleteTask(task: Task) {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      }).then(async (x) => {
        if (!x.ok) {
          throw new Error(x.statusText);
        }
      });
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
          <span>
            {task.title}
            <br />
            <small>
              (
              {`owner: ${task.owner}, ${(
                (new Date().valueOf() - new Date(task.createdAt).valueOf()) /
                60000
              ).toFixed()} minutes ago`}
              )
            </small>
          </span>

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
