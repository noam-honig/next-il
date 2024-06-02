"use server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export const {
  findMany,
  create,
  update,
  deleteMany /* couldn't export 'delete' */,
  updateMany,
} = db.task;
