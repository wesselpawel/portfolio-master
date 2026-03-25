// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async redirects() {
    return [
      { source: "/pl", destination: "/", permanent: true },
      { source: "/pl/:path*", destination: "/:path*", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "**upload.wikimedia.org" },
      { protocol: "https", hostname: "**raw.githubusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
