import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const db = new PrismaClient();

const t = initTRPC.create({ transformer: superjson });

export const taskRouter = t.router({
  findMany: t.procedure.input().query(async () => await db.task.findMany()),
});

export type TaskRouter = typeof taskRouter;

export const {
  findMany,
  create,
  update,
  deleteMany /* couldn't export 'delete' */,
  updateMany,
} = db.task;
