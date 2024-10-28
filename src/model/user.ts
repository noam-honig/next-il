import { Entity, Fields, Relations } from "remult"
import { Task } from "./task"
@Entity("users", {
  allowApiRead: true,
  allowApiInsert: true,
})
export class User {
  @Fields.string()
  id = ""
  @Fields.string()
  name = ""
  @Relations.toMany<User, Task>(() => Task, "owner")
  tasks?: Task[]
}

/* Thoughts
v Add live query
v deploy for user engagement
v Add user table and show one to many relation in admin

# To mention:
v - learn
v - npm init
v - stacks

*/
