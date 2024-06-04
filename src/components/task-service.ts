"use server";
import { PrismaClient, type Task } from "@prisma/client";
import { getNextAuthUser } from "../auth";
const db = new PrismaClient({ log: ["query"] });

export async function findTasks(showCompleted: boolean) {
  const user = await getNextAuthUser();
  if (!user) throw new Error("Not Authenticated");
  return db.task.findMany({
    orderBy: { createdAt: "asc" },
    where: {
      AND: [
        showCompleted ? {} : { completed: false },
        user.roles?.includes("admin") ? {} : { owner: user.id! },
      ],
    },
  });
}

export async function insertTask(data: Partial<Task>) {
  const user = await getNextAuthUser();
  if (!user) throw new Error("Not Authenticated");

  if (!data.title || data.title.length < 3)
    throw new Error("Title must be at least 3 characters");
  // remove columns that are not allowed to be updated from the frontend
  delete data.id;
  delete data.createdAt;
  delete data.owner;
  return db.task.create({
    data: {
      ...data,
      title: data.title!,
      completed: data.completed ?? false,
      owner: user.id,
    },
  });
}

export async function updateTask(id: Task["id"], data: Partial<Task>) {
  const user = await getNextAuthUser();
  if (!user) throw new Error("Not Authenticated");
  const task = await db.task.findUnique({ where: { id } });
  if (!task) throw new Error("Task not found");
  if (task.owner !== user.id && !user.roles?.includes("admin"))
    throw new Error("Not Authorized");

  if (task.title !== undefined) {
    if (task.title.length < 3)
      throw new Error("Title must be at least 3 characters");
  }
  // remove columns that are not allowed to be updated from the frontend
  delete data.id;
  delete data.createdAt;
  delete data.owner;
  return db.task.update({ where: { id }, data });
}

export async function deleteTask(id: Task["id"]) {
  const user = await getNextAuthUser();
  if (!user) throw new Error("Not Authenticated");
  const task = await db.task.findUnique({ where: { id } });
  if (!task) throw new Error("Task not found");
  if (task.owner !== user.id && !user.roles?.includes("admin"))
    throw new Error("Not Authorized");
  return db.task.delete({ where: { id } });
}
