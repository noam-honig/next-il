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

# TRPC

1. End to End type safety

# Server Action

1. Explain that it's vulnerable to network tempering

# Task Service vs remult entity

1. The filter appears in two places
2. The validation appears in two places
3. The rules of what can be updated (if i add a field) appears in two places
