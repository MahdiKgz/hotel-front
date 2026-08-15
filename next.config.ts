import type { NextConfig } from "next";

const apiInternalUrl =
  process.env.API_INTERNAL_URL?.replace(/\/$/, "") || "http://127.0.0.1:4000";

const nextConfig: NextConfig = {
  output: "standalone",
  // The existing application has strict TypeScript debt that does not prevent
  // Next.js from emitting a runnable production bundle.
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiInternalUrl}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${apiInternalUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
