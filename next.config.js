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
        destination: "/projektowanie-internetowe/grudziadz",
        permanent: true,
      },
      {
        source: "/strony-internetowe-:city",
        destination: "/projektowanie-internetowe/:city/tworzenie-stron-internetowych",
        permanent: true,
      },
      {
        source: "/projektowanie-stron-www",
        destination: "/projektowanie-internetowe/grudziadz/projektowanie-stron-www",
        permanent: true,
      },
      {
        source: "/projektowanie-stron-www-:city",
        destination: "/projektowanie-internetowe/:city/projektowanie-stron-www",
        permanent: true,
      },
      {
        source: "/tworzenie-landing-page-grudziadz",
        destination: "/projektowanie-internetowe/grudziadz/tworzenie-landing-page",
        permanent: true,
      },
      {
        source: "/landing-page-:city",
        destination: "/projektowanie-internetowe/:city/tworzenie-landing-page",
        permanent: true,
      },
      {
        source: "/landing-page",
        destination: "/projektowanie-internetowe/grudziadz/tworzenie-landing-page",
        permanent: true,
      },
      {
        source: "/tworzenie-sklepow-internetowych-grudziadz",
        destination: "/projektowanie-internetowe/grudziadz/tworzenie-sklepow-internetowych",
        permanent: true,
      },
      {
        source: "/sklepy-internetowe-:city",
        destination: "/projektowanie-internetowe/:city/tworzenie-sklepow-internetowych",
        permanent: true,
      },
      {
        source: "/sklepy-internetowe",
        destination: "/projektowanie-internetowe/grudziadz/tworzenie-sklepow-internetowych",
        permanent: true,
      },
      {
        source: "/strony-internetowe-na-sprzedaz",
        destination: "/projektowanie-internetowe/grudziadz/strony-internetowe-na-sprzedaz",
        permanent: true,
      },
      {
        source: "/strony-internetowe-na-sprzedaz-:city",
        destination: "/projektowanie-internetowe/:city/strony-internetowe-na-sprzedaz",
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych",
        destination: "/projektowanie-internetowe/grudziadz/seo",
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych-grudziadz",
        destination: "/projektowanie-internetowe/grudziadz/seo",
        permanent: true,
      },
      {
        source: "/seo-grudziadz",
        destination: "/projektowanie-internetowe/grudziadz/seo",
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych-:city",
        destination: "/projektowanie-internetowe/:city/seo",
        permanent: true,
      },
      {
        source: "/seo-:city",
        destination: "/projektowanie-internetowe/:city/seo",
        permanent: true,
      },
      {
        source: "/seo",
        destination: "/projektowanie-internetowe/grudziadz/seo",
        permanent: true,
      },
      {
        source: "/tworzenie-stron-internetowych-grudziadz",
        destination: "/projektowanie-internetowe/grudziadz/tworzenie-stron-internetowych",
        permanent: true,
      },
      {
        source: "/tworzenie-stron-internetowych-:city",
        destination: "/projektowanie-internetowe/:city/tworzenie-stron-internetowych",
        permanent: true,
      },
      {
        source: "/projektowanie-internetowe",
        destination: "/projektowanie-internetowe/grudziadz",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "**upload.wikimedia.org" },
      { protocol: "https", hostname: "**raw.githubusercontent.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

module.exports = nextConfig;
