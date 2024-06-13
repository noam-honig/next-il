import { Entity, Fields, remult } from "remult"

@Entity<Task>("Task", {
  allowApiCrud: remult.authenticated,
  allowApiDelete: "admin",
  apiPrefilter: () => {
    if (remult.isAllowed("admin")) return {}
    return { owner: remult.user!.id! }
  },
})
export class Task {
  @Fields.cuid()
  id = ""

  @Fields.string<Task>({
    validate: (task) =>
      task.title.length > 2 || "Title must be at least 3 characters long",
  })
  title = ""

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt = new Date()

  @Fields.string({ allowApiUpdate: false })
  owner = remult.user?.id!
}
