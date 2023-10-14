import { publicProcedure, router } from "@/server/api/trpc";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello World";
  }),
});

export type AppRouter = typeof appRouter;
