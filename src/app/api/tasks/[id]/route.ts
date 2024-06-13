import { deleteTask, updateTask } from "../../../../model/task-service"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    return Response.json(await updateTask(params.id, body))
  } catch (err) {
    return new Response(null, {
      status: 500,
      statusText: (err as { message: string }).message,
    })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteTask(params.id)
    return new Response(null, { status: 204 })
  } catch (err) {
    console.log(err)
    return new Response(null, {
      status: 500,
      statusText: (err as { message: string }).message,
    })
  }
}
