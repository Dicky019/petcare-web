import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type User,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { type UserRole } from "@prisma/client";
import "next-auth/jwt";
import { signInCheck, signInGoogle } from "~/service/signIn";

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
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface Profile {
    email_verified: boolean;
    picture: string;
  }

  interface User {
    id: string;
    // ...other properties
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string;
    user: User;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: true,
  callbacks: {
    signIn: async ({ profile, account, user }) => {
      console.log({ user, profile });

      if (account?.provider === "google") {
        if (!profile) {
          throw Error("Ada Yang Salah");
        }

        console.log({ account });

        return await signInGoogle({
          profile,
          account,
        });
      }

      const checkUser = await signInCheck({ user });

      if (!checkUser) {
        throw Error("Akun Kamu Tidak Terdaftar");
      }

      return checkUser != null;
    },

    jwt: ({ token, user }) => {
      user && (token.user = user as User);

      return token;
    },
    session: ({ session, token }) => {
      const user = token.user;
      return { ...session, user };
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      authorize: async (credentials) => {
        if (
          credentials?.email === env.NEXTAUTH_EMAIL_ADMIN &&
          credentials?.password === env.NEXTAUTH_PASSWORD_ADMIN
        ) {
          const user = await prisma.user.findFirstOrThrow({
            where: {
              email: credentials?.email,
            },
          });

          return user;
        }

        // Add logic here to look up the user from the credentials supplied
        throw Error("Ada yang Salah")
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],

  // pages: {
  //   signIn: "/login",
  // },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
