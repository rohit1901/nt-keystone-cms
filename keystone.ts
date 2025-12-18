// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import dotenv from "dotenv";
import { config } from "@keystone-6/core";

// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data

import { type Session, nextAuthSessionStrategy } from "./session";
import type { TypeInfo } from ".keystone/types";

dotenv.config();

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const keystoneConfig = config<TypeInfo<Session>>({
  db: {
    // we're using sqlite for the fastest startup experience
    //   for more information on what database might be appropriate for you
    //   see https://keystonejs.com/docs/guides/choosing-a-database#title
    provider: "postgresql",
    url: requireEnv("DATABASE_URL"),
    enableLogging: process.env.NODE_ENV === "development",
    idField: { kind: "autoincrement" },
  },
  server: {
    port: 3000,
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.CORS_ORIGIN
          : ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    },
  },
  ui: {
    // the following api routes are required for nextauth.js
    publicPages: [
      "/api/auth/csrf",
      "/api/auth/signin",
      "/api/auth/callback",
      "/api/auth/session",
      "/api/auth/providers",
      "/api/auth/signout",
      "/api/auth/error",

      // Amazon Cognito provider routes for NextAuth
      "/api/auth/signin/cognito",
      "/api/auth/callback/cognito",
    ],

    // adding page middleware ensures that users are redirected to the signin page if they are not signed in.
    pageMiddleware: async ({ wasAccessAllowed }) => {
      if (wasAccessAllowed) return;
      return {
        kind: "redirect",
        to: "/api/auth/signin",
      };
    },
    isAccessAllowed: async (context) => Boolean(context.session?.id),
  },
  lists,
  session: nextAuthSessionStrategy,
});
export default keystoneConfig;
