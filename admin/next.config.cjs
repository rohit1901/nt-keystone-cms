/** @type {import('next').NextConfig} */
module.exports = {
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["graphql"],

  transpilePackages: ["../../admin"],
  experimental: {
    cpus: 1,
  },
};
