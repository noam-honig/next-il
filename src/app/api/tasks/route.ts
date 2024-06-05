import { findTasks, insertTask } from "../../../model/task-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return Response.json(
    await findTasks({
      orderBy: {
        createdAt: "asc",
      },
      where:
        searchParams.get("showCompleted") === "true"
          ? {}
          : {
              completed: false,
            },
    })
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json(await insertTask(body));
  } catch (err) {
    return new Response(null, {
      status: 500,
      statusText: (err as { message: string }).message,
    });
  }
}
