import { TRPCError, initTRPC } from "@trpc/server";
import { getServerAuthSession } from "@/server/auth";

const t = initTRPC.create();

const isAuth = t.middleware(async (opts) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized. Please log in.",
    });
  }
  return opts.next();
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const authProcedure = t.procedure.use(isAuth);
