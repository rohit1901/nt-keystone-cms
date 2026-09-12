// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import dotenv from "dotenv";
import { resolve } from "node:path";
import { config } from "@keystone-6/core";
import { PrismaPg } from "@prisma/adapter-pg";

// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data

import {
  cmsAuthGroup,
  type Session,
  nextAuthSessionStrategy,
  requireEnv,
} from "./session";
import type { TypeInfo } from "./generated/keystone/types";

dotenv.config();

export const keystoneConfig = config<TypeInfo<Session>>({
  db: {
    // we're using sqlite for the fastest startup experience
    //   for more information on what database might be appropriate for you
    //   see https://keystonejs.com/docs/guides/choosing-a-database#title
    provider: "postgresql",
    prismaClientOptions: () => ({
      adapter: new PrismaPg({ connectionString: requireEnv("DATABASE_URL") }),
    }),
    idField: { kind: "autoincrement" },
  },
  server: {
    port: 3000,
    cors: {
      origin:
        process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || [],
      credentials: true,
    },
  },
  ui: {
    // Keystone generates its own _app; override it so global Admin UI styles are
    // imported directly from Next's custom App, as required by Next.js 16.
    getAdditionalFiles: () => [
      {
        mode: "copy",
        inputPath: resolve("admin/app.js"),
        outputPath: "pages/_app.js",
      },
      {
        mode: "copy",
        inputPath: resolve("admin/next.config.cjs"),
        outputPath: "next.config.js",
      },
      {
        mode: "copy",
        inputPath: resolve("tailwind.config.cjs"),
        outputPath: "tailwind.config.cjs",
      },
      {
        mode: "copy",
        inputPath: resolve("postcss.config.cjs"),
        outputPath: "postcss.config.cjs",
      },
    ],

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

      // Custom page routes
      "/auth/signin",
    ],

    // adding page middleware ensures that users are redirected to the signin page if they are not signed in.
    pageMiddleware: async ({ wasAccessAllowed }) => {
      if (wasAccessAllowed) return;
      return {
        kind: "redirect",
        to: "/auth/signin",
      };
    },
    isAccessAllowed: async (context) =>
      context.session?.userGroup === cmsAuthGroup,
  },
  lists,
  session: nextAuthSessionStrategy,
});
export default keystoneConfig;
