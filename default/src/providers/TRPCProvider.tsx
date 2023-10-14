"use client";
import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { httpBatchLink } from "@trpc/client";

import { trpc } from "./client";

import { env } from "@/env.mjs";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/trpc",
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
