import { getServerSession } from "next-auth/next";
import type { DefaultJWT } from "next-auth/jwt";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import type { Context } from "./generated/keystone/types";
import dotenv from "dotenv";

dotenv.config();

const isBuildTime =
  process.env.npm_lifecycle_event === "postinstall" ||
  process.env.npm_lifecycle_event === "build";

export const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    if (isBuildTime) {
      return "build-time-placeholder";
    }
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const sessionSecret = requireEnv("NEXTAUTH_SECRET");
export const cmsAuthGroup = requireEnv("CMS_AUTH_GROUP");
const cognitoClientId = requireEnv("COGNITO_CLIENT_ID");
const cognitoClientSecret = requireEnv("COGNITO_CLIENT_SECRET");
const cognitoIssuer = requireEnv("COGNITO_ISSUER");

type JwtPayload = Record<string, unknown>;

function decodeJwtJsonSegment(segment: string): JwtPayload | null {
  try {
    const decoded = JSON.parse(
      Buffer.from(segment, "base64url").toString("utf8"),
    );
    if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) {
      return null;
    }
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

export function decodeJwtPayload(token: unknown): JwtPayload | null {
  if (typeof token !== "string") return null;

  const parts = token.split(".");
  if (
    parts.length !== 3 ||
    parts.some(
      (part) =>
        !part || !/^[A-Za-z0-9_-]+$/.test(part) || part.length % 4 === 1,
    )
  ) {
    return null;
  }

  const [header, payload] = parts;
  if (!decodeJwtJsonSegment(header)) return null;

  // OAuth/OIDC validation belongs to NextAuth's Cognito provider. This only
  // reads structurally valid JWT claims; it does not attempt signature checks.
  return decodeJwtJsonSegment(payload);
}

export function getCognitoGroups(accessToken: unknown): string[] | null {
  const payload = decodeJwtPayload(accessToken);
  if (!payload) return null;

  const groups = payload["cognito:groups"];
  if (groups === undefined) return [];
  if (
    !Array.isArray(groups) ||
    !groups.every((group) => typeof group === "string")
  ) {
    return null;
  }

  return groups;
}

type KeystoneAuthSession = DefaultSession & {
  keystone: {
    authId: string | null;
    userGroup: string | null;
  };
};

export const nextAuthOptions: NextAuthOptions = {
  secret: sessionSecret,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  jwt: {
    maxAge: 60 * 60,
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
      if (account) {
        const groups = getCognitoGroups(account.access_token);
        token.userGroup = groups?.includes(cmsAuthGroup) ? cmsAuthGroup : null;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: DefaultJWT & { userGroup?: string | null };
    }): Promise<KeystoneAuthSession> {
      return {
        ...session,
        keystone: {
          authId: token.sub ?? null,
          userGroup:
            token.userGroup === cmsAuthGroup ? cmsAuthGroup : null,
        },
      };
    },
  },
};

export type Session = {
  id: string;
  userGroup: string;
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
    if (!authId || nextAuthSession.keystone.userGroup !== cmsAuthGroup) {
      return;
    }

    const author = await context.sudo().query.User.findOne({
      where: { authId } as any,
      query: "id userGroup",
    });
    if (!author || author.userGroup !== cmsAuthGroup) return;

    return { id: author.id, userGroup: cmsAuthGroup };
  },

  // we don't need these as next-auth handle start and end for us
  async start() {},
  async end() {},
};
