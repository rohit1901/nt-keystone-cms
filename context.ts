// context.ts
import { getContext } from '@keystone-6/core/context';
import config from './keystone';
import * as Prisma from "@prisma/client";
// Note: If you have type errors with .prisma/client, ensure 'keystone postinstall' has run.

export const keystoneContext = getContext(config, Prisma);
