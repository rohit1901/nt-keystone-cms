import NextAuth from "next-auth";
import { randomBytes } from "node:crypto";
import * as Prisma from "../../../../generated/prisma/client";
import { getContext } from "@keystone-6/core/context";
import keystoneConfig from "../../../../keystone";
import type { Context } from "../../../../generated/keystone/types";
import {
  cmsAuthGroup,
  getCognitoGroups,
  nextAuthOptions,
} from "../../../../session";
import dotenv from "dotenv";

dotenv.config();
let _keystoneContext: Context = (globalThis as any)._keystoneContext;

async function getKeystoneContext() {
  if (_keystoneContext) return _keystoneContext;

  _keystoneContext = getContext(
    keystoneConfig as any,
    Prisma,
  ) as unknown as Context;
  if (process.env.NODE_ENV !== "production") {
    (globalThis as any)._keystoneContext = _keystoneContext;
  }
  return _keystoneContext;
}

export default NextAuth({
  ...nextAuthOptions,
  callbacks: {
    ...nextAuthOptions.callbacks,
    async signIn({ user, account, profile }) {
      const sudoContext = (await getKeystoneContext()).sudo();
      const isCognitoAccount = account?.provider === "cognito";
      const authId = isCognitoAccount ? account.providerAccountId : null;
      const groups = isCognitoAccount
        ? getCognitoGroups(account.access_token)
        : null;
      const isAuthorized = groups?.includes(cmsAuthGroup) === true;

      if (!isAuthorized || !authId) {
        if (authId) {
          const [author] = await sudoContext.query.User.findMany({
            where: { authId: { equals: authId } } as any,
            take: 1,
            query: "id userGroup",
          });

          if (author?.userGroup) {
            await sudoContext.query.User.updateOne({
              where: { id: author.id },
              data: { userGroup: null } as any,
            });
          }
        }
        return false;
      }

      const cognitoEmail = user.email ?? null;
      const emailVerified =
        (profile as { email_verified?: unknown } | undefined)?.email_verified ===
        true;
      const email = cognitoEmail ?? `${authId}@cognito.local`;
      const name = user.name ?? email;

      const [authorByAuthId] = await sudoContext.query.User.findMany({
        where: { authId: { equals: authId } } as any,
        take: 1,
        query: "id name email authId userGroup",
      });
      let author = authorByAuthId;

      if (!author && cognitoEmail && emailVerified) {
        const [authorByEmail] = await sudoContext.query.User.findMany({
          where: { email: { equals: cognitoEmail } },
          take: 1,
          query: "id name email authId userGroup",
        });

        if (authorByEmail?.authId && authorByEmail.authId !== authId) {
          return false;
        }
        author = authorByEmail;
      }

      if (!author) {
        await sudoContext.query.User.createOne({
          data: {
            authId,
            name,
            email,
            userGroup: cmsAuthGroup,
            password: randomBytes(32).toString("hex"),
          } as any,
        });
      } else {
        const updateData = {
          ...(name !== author.name ? { name } : {}),
          ...(email !== author.email ? { email } : {}),
          ...(!author.authId ? { authId } : {}),
          ...(author.userGroup !== cmsAuthGroup
            ? { userGroup: cmsAuthGroup }
            : {}),
        };

        if (Object.keys(updateData).length > 0) {
          await sudoContext.query.User.updateOne({
            where: { id: author.id },
            data: updateData as any,
          });
        }
      }

      return true;
    },
  },
});
