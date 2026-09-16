/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: "/elearning-payments",
  trailingSlash: true,
  images: { unoptimized: true },
};

if (isProduction) {
  // Static export only happens at `next build`. Scoping `output: 'export'` to the
  // production build keeps it out of `next dev`, which is what triggers the
  // "redirects will not work with output: export" warning.
  nextConfig.output = "export";
} else {
  // In dev the app is served under the basePath; redirect the bare root to it.
  // `basePath: false` stops the destination being double-prefixed.
  nextConfig.redirects = async () => [
    {
      source: "/",
      destination: "/elearning-payments",
      basePath: false,
      permanent: false,
    },
  ];
}

export default nextConfig;
