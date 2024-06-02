import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { taskRouter } from "@/components/taskRepo";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: taskRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
