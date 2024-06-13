import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { z } from "zod"
import {
  deleteTask,
  findTasks,
  insertTask,
  updateTask,
} from "../../../../model/task-service"

const t = initTRPC.create({ transformer: superjson })

export const taskRouter = t.router({
  find: t.procedure
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
  insert: t.procedure
    .input(
      z.object({
        title: z.string(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await insertTask(input)
    }),
  update: t.procedure
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
      return await updateTask(input.id, input.data)
    }),
  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteTask(input)
  }),
})

export type TaskRouter = typeof taskRouter
