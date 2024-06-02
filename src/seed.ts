import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const tasks = [
  { title: "Setup", completed: true },
  { title: "Entities", completed: false },
  { title: "Paging, Sorting and Filtering", completed: false },
  { title: "CRUD Operations", completed: false },
  { title: "Live Query", completed: false },
  { title: "Validation", completed: false },
  { title: "Updating multiple tasks", completed: false },
  { title: "Database", completed: false },
  { title: "Authentication and Authorization", completed: false },
  { title: "Deployment", completed: false },
  { title: "Example apps", completed: false },
];

db.task.deleteMany().then(() => db.task.createMany({ data: tasks }));
