import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import {
  deleteTask,
  findTasks,
  insertTask,
  updateTask,
} from "../../../../model/task-service";
import { title } from "process";

const t = initTRPC.create({ transformer: superjson });

export const taskRouter = t.router({
  findTasks: t.procedure
    .input(
      z.object({
        showCompleted: z.boolean(),
      })
    )
    .query(
      async ({ input }) =>
        await findTasks({
          orderBy: {
            createdAt: "asc",
          },
          where: input.showCompleted
            ? {}
            : {
                completed: false,
              },
        })
    ),
  insertTask: t.procedure
    .input(
      z.object({
        title: z.string(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await insertTask(input);
    }),
  updateTask: t.procedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().optional(),
          completed: z.boolean().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return await updateTask(input.id, input.data);
    }),
  deleteTask: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteTask(input);
  }),
});

export type TaskRouter = typeof taskRouter;
