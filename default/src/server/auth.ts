// Env
import { env } from "@/env.mjs";

// Next-Auth
import { getServerSession, type User, type NextAuthOptions } from "next-auth";
import { type JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize(credentials) {
        if (!credentials) return null;
        if (
          credentials.username === env.ADMIN_USERNAME &&
          credentials.password === env.ADMIN_PASSWORD
        ) {
          const user: User = {
            id: "1",
            name: "Admin",
            email: "admin@temp.com",
          };
          return user;
        }
        return null;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 14 * 24 * 60 * 60,
  },
  callbacks: {
    session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        const data: JWT = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        return Promise.resolve(data);
      } else {
        const data = {
          id: token.id,
          name: token.name,
          email: token.email,
        };
        return Promise.resolve(data);
      }
    },
  },
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
