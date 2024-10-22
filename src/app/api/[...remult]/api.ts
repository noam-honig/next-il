import { remultNextApp } from "remult/remult-next"
import { createPostgresDataProvider } from "remult/postgres"
import { Task } from "../../../model/task"
import { getNextAuthUser } from "../../../auth"
import { SqlDatabase } from "remult"

export const api = remultNextApp({
  entities: [Task],
  dataProvider: createPostgresDataProvider(),
  admin: true,
  getUser: getNextAuthUser,
})
