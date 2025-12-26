import { createYoga } from 'graphql-yoga';
import { keystoneContext } from '../../context';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: '/api/graphql',
  schema: keystoneContext.graphql.schema,
  // Cast the args to what Keystone expects
  context: ({ req, res }) => keystoneContext.withRequest(req, res),
  landingPage: process.env.NODE_ENV !== 'production',
});
