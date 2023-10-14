import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server/api";

import { env } from "@/env.mjs";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: env.NEXTAUTH_URL + "/api/trpc",
    }),
  ],
});
