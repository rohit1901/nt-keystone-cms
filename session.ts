import { getServerSession } from "next-auth/next";
import type { DefaultJWT } from "next-auth/jwt";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import type { Context } from ".keystone/types";
import dotenv from "dotenv";

dotenv.config();

// Check if we're in build/postinstall phase - don't require env vars during build
const isBuildTime = process.env.npm_lifecycle_event === 'postinstall' ||
  process.env.npm_lifecycle_event === 'build';

export const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    if (isBuildTime) {
      // During build, return placeholder instead of throwing
      return "build-time-placeholder";
    }
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const sessionSecret =
  process.env.NEXTAUTH_SECRET ??
  process.env.SESSION_SECRET ??
  "-- DEV COOKIE SECRET; CHANGE ME --";

// Use placeholder values during build, real values at runtime
const cognitoClientId = isBuildTime ? "build-placeholder" : requireEnv("COGNITO_CLIENT_ID");
const cognitoClientSecret = isBuildTime ? "build-placeholder" : requireEnv("COGNITO_CLIENT_SECRET");
const cognitoIssuer = isBuildTime ? "build-placeholder" : requireEnv("COGNITO_ISSUER");

type KeystoneAuthSession = DefaultSession & {
  keystone: {
    authId: string | null;
    userGroup?: string;
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
    async jwt({ token, account }) {
      // Extract the user group from the Cognito token
      if (account?.access_token) {
        // Decode the JWT token to extract the user group
        const decodedToken = JSON.parse(
          Buffer.from(account.access_token.split(".")[1], "base64").toString()
        );
        token.userGroup = decodedToken["cognito:groups"]?.find((group: string) => group === process.env.CMS_AUTH_GROUP);
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: DefaultJWT & { userGroup?: string };
    }): Promise<KeystoneAuthSession> {
      return {
        ...session,
        keystone: {
          authId: token.sub ?? null,
          userGroup: token.userGroup,
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
      query: "id userGroup",
    });
    if (!author) return;

    return { id: author.id, userGroup: author.userGroup };
  },

  // we don't need these as next-auth handle start and end for us
  async start() { },
  async end() { },
};
