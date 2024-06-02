import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";

const db = new PrismaClient();

const t = initTRPC.create();

export const taskRouter = t.router({
  findMany: t.procedure.query(async () => await db.task.findMany()),
});

export type TaskRouter = typeof taskRouter;

export const {
  findMany,
  create,
  update,
  deleteMany /* couldn't export 'delete' */,
  updateMany,
} = db.task;
