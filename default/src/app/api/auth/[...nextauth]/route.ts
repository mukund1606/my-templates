import NextAuth from "next-auth";
import { authOptions } from "@/server/auth";

type NextAuthHandler = typeof NextAuth;

const handler = NextAuth(authOptions) as NextAuthHandler;

export { handler as GET, handler as POST };
