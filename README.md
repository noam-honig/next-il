# Spec:

## Task

- id
- title
- completed
- owner - updated only on creation
- createdAt - updated only on creation

## Feature - show uncompleted

## Validations

- custom validation, title must have 3 chars

## Roles:

- user can only see they're own tasks
- admin users can see all tasks
- Only admin can delete

## Remove

- set all completed

## Show - this can be called from api and not from your code

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

+-----+
topic | api routes | trpc | server action | remult
+------+
Normal Rest | V | X | X |V
Share Task Type | V | V | V | V
Typed api calls | X | V | V | V
Requires DTO Types | X | V | X | X
Validates api argument types | X | V | X | V
Propagate exceptions to front end | X | V | V | V
Handles dates gracefully | X | V | V | V
Inferred routes

const taskRouter = createTRPCProxyClient<TaskRouter>({
links: [httpLink({ url: "/api/trpc" })],
transformer: superjson,
});
