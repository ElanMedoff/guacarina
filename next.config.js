/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/scales/c-major",
        permanent: false,
      },
      {
        source: "/scales",
        destination: "/scales/c-major",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
