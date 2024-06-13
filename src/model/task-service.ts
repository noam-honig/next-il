import { getAuthenticatedUser } from "../auth"
import { PrismaClient, type Task, type Prisma } from "@prisma/client"
import { validateTask } from "./validateTask"

const db = new PrismaClient()

export async function findTasks(args: Prisma.TaskFindManyArgs) {
  const user = await getAuthenticatedUser()
  return db.task.findMany({
    ...args,
    where: {
      AND: [
        args.where ?? {},
        user.roles?.includes("admin") ? {} : { owner: user.id! },
      ],
    },
  })
}

export async function insertTask(data: Partial<Task>) {
  const user = await getAuthenticatedUser()
  validateTask(data)

  return db.task.create({
    data: {
      title: data.title!,
      completed: data.completed ?? false,
      owner: user.id,
    },
  })
}

export async function updateTask(id: Task["id"], data: Partial<Task>) {
  const user = await getAuthenticatedUser()
  validateTask(data, true)
  return db.task.update({
    where: {
      id,
      ...(user.roles?.includes("admin") ? {} : { owner: user.id! }),
    },
    data: {
      title: data.title,
      completed: data.completed,
    },
  })
}

export async function deleteTask(id: Task["id"]) {
  const user = await getAuthenticatedUser()
  if (!user.roles?.includes("admin")) throw new Error("Not Authorized")
  return db.task.delete({ where: { id } })
}
