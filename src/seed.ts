import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const tasks = [
  { title: "Do Laundry", completed: true, owner: "steve" },
  { title: "Buy Groceries", completed: false, owner: "steve" },
  { title: "Clean Kitchen", completed: false, owner: "jane" },
  { title: "Organize Photos", completed: false, owner: "jane" },
  { title: "Pay Bills", completed: false, owner: "jane" },
  { title: "Exercise", completed: false, owner: "jane" },
  { title: "Cook Dinner", completed: false, owner: "steve" },
  { title: "Water Plants", completed: false, owner: "steve" },
  { title: "Vacuum House", completed: false, owner: "steve" },
];

db.task.deleteMany().then(async () => {
  for (const task of tasks) {
    await db.task.create({ data: task });
  }
});
