import { type Task } from "@prisma/client";

export function validateTask<dataType extends Partial<Task>>(
  data: dataType,
  isUpdate = false
) {
  if (!isUpdate || data.title !== undefined) {
    //An update could be partial so we don't need to check the title in that case
    if ((data.title ?? "").length < 3)
      throw new Error("Title must be at least 3 characters");
  }
  return data;
}
