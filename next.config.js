/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/scales/c",
        permanent: false,
      },
      {
        source: "/scales",
        destination: "/scales/c",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
