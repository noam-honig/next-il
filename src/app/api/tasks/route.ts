import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function GET(req: Request) {
  return Response.json(await db.task.findMany());
}
