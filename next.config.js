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
      {
        source: "/strony-internetowe",
        destination: "/tworzenie-stron-internetowych-grudziadz",
        permanent: true,
      },
      {
        source: "/strony-internetowe-:city",
        destination: "/tworzenie-stron-internetowych-:city",
        permanent: true,
      },
      {
        source: "/projektowanie-stron-www",
        destination: "/tworzenie-stron-internetowych-grudziadz",
        permanent: true,
      },
      {
        source: "/projektowanie-stron-www-:city",
        destination: "/tworzenie-stron-internetowych-:city",
        permanent: true,
      },
      {
        source: "/landing-page",
        destination: "/tworzenie-landing-page-grudziadz",
        permanent: true,
      },
      {
        source: "/landing-page-:city",
        destination: "/tworzenie-landing-page-:city",
        permanent: true,
      },
      {
        source: "/sklepy-internetowe",
        destination: "/tworzenie-sklepow-internetowych-grudziadz",
        permanent: true,
      },
      {
        source: "/sklepy-internetowe-:city",
        destination: "/tworzenie-sklepow-internetowych-:city",
        permanent: true,
      },
      {
        source: "/strony-internetowe-na-sprzedaz",
        destination: "/tworzenie-stron-internetowych-grudziadz",
        permanent: true,
      },
      {
        source: "/strony-internetowe-na-sprzedaz-:city",
        destination: "/tworzenie-stron-internetowych-:city",
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych",
        destination: "/seo-grudziadz",
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych-:city",
        destination: "/seo-:city",
        permanent: true,
      },
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
