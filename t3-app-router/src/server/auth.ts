import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import { type DefaultJWT } from "next-auth/jwt";

import { env } from "@/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Module augmentation for `next-auth/jtw` types. Allows us to add custom properties to the `jwt`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
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
          const user = {
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
          id: token.id,
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        const data = {
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

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
