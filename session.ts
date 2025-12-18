import { getServerSession } from "next-auth/next";
import type { DefaultJWT } from "next-auth/jwt";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import type { Context } from ".keystone/types";
import dotenv from "dotenv";

dotenv.config();

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const sessionSecret =
  process.env.NEXTAUTH_SECRET ??
  process.env.SESSION_SECRET ??
  "-- DEV COOKIE SECRET; CHANGE ME --";
const cognitoClientId = requireEnv("COGNITO_CLIENT_ID");
const cognitoClientSecret = requireEnv("COGNITO_CLIENT_SECRET");
const cognitoIssuer = requireEnv("COGNITO_ISSUER");

type KeystoneAuthSession = DefaultSession & {
  keystone: {
    authId: string | null;
  };
};

export const nextAuthOptions: NextAuthOptions = {
  secret: sessionSecret,
  session: {
    strategy: "jwt",
  },
  providers: [
    CognitoProvider({
      clientId: cognitoClientId,
      clientSecret: cognitoClientSecret,
      issuer: cognitoIssuer,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: DefaultJWT;
    }): Promise<KeystoneAuthSession> {
      return {
        ...session,
        keystone: {
          authId: token.sub ?? null,
        },
      };
    },
  },
};

export type Session = {
  id: string;
};

export const nextAuthSessionStrategy = {
  async get({ context }: { context: Context }) {
    const { req, res } = context;
    const { headers } = req ?? {};
    if (!headers?.cookie || !res) return;

    // next-auth needs a different cookies structure
    const cookies: Record<string, string> = {};
    for (const part of headers.cookie.split(";")) {
      const [rawKey, ...rest] = part.trim().split("=");
      if (!rawKey) continue;
      const rawValue = rest.join("=");
      try {
        cookies[rawKey] = decodeURIComponent(rawValue);
      } catch {
        cookies[rawKey] = rawValue;
      }
    }

    const nextAuthSession = (await getServerSession(
      { headers, cookies } as any,
      res,
      nextAuthOptions,
    )) as KeystoneAuthSession | null;
    if (!nextAuthSession) return;

    const authId = nextAuthSession.keystone?.authId;
    if (!authId) return;

    const author = await context.sudo().query.User.findOne({
      where: { authId } as any,
      query: "id",
    });
    if (!author) return;

    return { id: author.id };
  },

  // we don't need these as next-auth handle start and end for us
  async start() {},
  async end() {},
};
