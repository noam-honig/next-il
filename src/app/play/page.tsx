"use client"
import usePromise from "react-use-promise"
import { repo } from "remult"
import { Task } from "../../model/task"

export default function Page() {
  const [data] = usePromise(
    () =>
      repo(Task).groupBy({
        group: ["owner", "completed"],
      }),
    []
  )
  return (
    <div>
      <h1>play</h1>
      <main>
        {data?.map((task) => (
          <div key={task.owner}>
            {task.owner} {task.completed.toString()} {task.$count}
          </div>
        ))}
      </main>
    </div>
  )
}
