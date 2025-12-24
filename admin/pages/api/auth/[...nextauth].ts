import NextAuth, { Account, DefaultUser } from "next-auth";
import { randomBytes } from "node:crypto";
import { nextAuthOptions } from "../../../../session";
import * as Prisma from "@prisma/client";
import { getContext } from "@keystone-6/core/context";
import keystoneConfig from "../../../../keystone";
import type { Context } from ".keystone/types";

let _keystoneContext: Context = (globalThis as any)._keystoneContext;

async function getKeystoneContext() {
  if (_keystoneContext) return _keystoneContext;

  _keystoneContext = getContext(keystoneConfig, Prisma);
  if (process.env.NODE_ENV !== "production") {
    (globalThis as any)._keystoneContext = _keystoneContext;
  }
  return _keystoneContext;
}

export default NextAuth({
  ...nextAuthOptions,
  callbacks: {
    ...nextAuthOptions.callbacks,
    async signIn({
      user,
      account,
    }: {
      user: DefaultUser;
      account: Account | null;
    }) {
      // console.error('next-auth signIn', { user, account, profile });
      const sudoContext = (await getKeystoneContext()).sudo();

      const providerAccountId = account?.providerAccountId ?? user?.id ?? null;
      const cognitoEmail = user?.email ?? null;
      const email =
        cognitoEmail ??
        (providerAccountId
          ? `${providerAccountId}@cognito.local`
          : `${randomBytes(8).toString("hex")}@cognito.local`);
      const authId = providerAccountId ?? email;
      const name = user?.name ?? email;

      const [authorByAuthId] = await sudoContext.query.User.findMany({
        where: { authId: { equals: authId } } as any,
        take: 1,
        query: "id name email authId",
      });
      let author = authorByAuthId;

      if (!author && cognitoEmail) {
        const [authorByEmail] = await sudoContext.query.User.findMany({
          where: { email: { equals: cognitoEmail } },
          take: 1,
          query: "id name email authId",
        });
        author = authorByEmail;
        if (author && !author.authId) {
          author = await sudoContext.query.User.updateOne({
            where: { id: author.id },
            data: { authId } as any,
            query: "id name email authId",
          });
        }
      }

      if (!author) {
        author = await sudoContext.query.User.createOne({
          data: {
            authId,
            name,
            email,
            password: randomBytes(32).toString("hex"),
          } as any,
          query: "id name email authId",
        });
      } else {
        const updateData = {
          ...(name && name !== author.name ? { name } : {}),
          ...(email && email !== author.email ? { email } : {}),
          ...(!author.authId ? { authId } : {}),
        } as {
          name?: string;
          email?: string;
          authId?: string;
        };
        if (Object.keys(updateData).length > 0) {
          author = await sudoContext.query.User.updateOne({
            where: { id: author.id },
            data: updateData as any,
            query: "id name email authId",
          });
        }
      }

      return true; // accept the signin
    },
  },
});
