import "@/styles/globals.css";
// Next
import type { Metadata } from "next";

// Providers
import { TRPCProvider } from "@/providers/TRPCProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description:
    "My Template for NextJS with TailwindCSS, TypeScript, TRPC, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="min-h-screen w-full">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
