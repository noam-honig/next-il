import { PrismaClient } from "@prisma/client";
const db = new PrismaClient({ log: ["query"] });

const tasks = [
  { title: "Setup", completed: true, owner: "1" },
  { title: "Entities", completed: false, owner: "1" },
  { title: "Paging, Sorting and Filtering", completed: false, owner: "2" },
  { title: "CRUD Operations", completed: false, owner: "2" },
  { title: "Live Query", completed: false, owner: "2" },
  { title: "Validation", completed: false, owner: "2" },
  { title: "Updating multiple tasks", completed: false, owner: "1" },
  { title: "Database", completed: false, owner: "1" },
  { title: "Authentication and Authorization", completed: false, owner: "1" },
  { title: "Deployment", completed: false, owner: "2" },
  { title: "Example apps", completed: false, owner: "2" },
];

db.task.deleteMany().then(async () => {
  for (const task of tasks) {
    await db.task.create({ data: task });
  }
});
