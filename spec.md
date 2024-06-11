# Task Management Application Spec

1 Each task will have: Id, title, completed, owner, createdAt
2 Users will see only uncompleted tasks, and can choose to see all
3 A valid task must have at least 2 characters
4 Users can only see the tasks they own
5 `admin` users can see any task
6 Only `admin` users can delete tasks

# Review App:

1. Show schema.prisma
2. show Task Service
   1. Explain admin filter
   2. Explain that its used twice
   3. Explain validateTask used both for update and insert

# Working with routes

1. Review Routes `app/api/tasks`
   1. Cover all the boilerplate code that
      1. Translates to and from json
      2. Handling Errors
2. Review `todo.tsx`
   1. Explain how we share the `Task` type
   2. Explain how easy it is to make a spelling mistake with showCompleted
   3. Lot's of boilerplate code around json, and error handling
   4. Emphasize that we are using the same `validateTask` method
   5. Also explain that non json types (such as date) require transformation
