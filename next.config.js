// @ts-check

const CITY_HUB_BASE_PATH = "/projektowanie-stron";
const DEFAULT_CITY_HUB_PATH = `${CITY_HUB_BASE_PATH}/grudziadz`;

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
        source: "/projektowanie-internetowe/:city/:service",
        destination: `${CITY_HUB_BASE_PATH}/:city/:service`,
        permanent: true,
      },
      {
        source: "/projektowanie-internetowe/:city",
        destination: `${CITY_HUB_BASE_PATH}/:city`,
        permanent: true,
      },
      {
        source: "/projektowanie-internetowe",
        destination: DEFAULT_CITY_HUB_PATH,
        permanent: true,
      },
      {
        source: "/projektowanie-stron",
        destination: DEFAULT_CITY_HUB_PATH,
        permanent: true,
      },
      {
        source: "/strony-internetowe",
        destination: DEFAULT_CITY_HUB_PATH,
        permanent: true,
      },
      {
        source: "/strony-internetowe-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/tworzenie-stron-internetowych`,
        permanent: true,
      },
      {
        source: "/projektowanie-stron-www",
        destination: `${DEFAULT_CITY_HUB_PATH}/projektowanie-stron-www`,
        permanent: true,
      },
      {
        source: "/projektowanie-stron-www-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/projektowanie-stron-www`,
        permanent: true,
      },
      {
        source: "/tworzenie-landing-page-grudziadz",
        destination: `${DEFAULT_CITY_HUB_PATH}/tworzenie-landing-page`,
        permanent: true,
      },
      {
        source: "/landing-page-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/tworzenie-landing-page`,
        permanent: true,
      },
      {
        source: "/landing-page",
        destination: `${DEFAULT_CITY_HUB_PATH}/tworzenie-landing-page`,
        permanent: true,
      },
      {
        source: "/tworzenie-sklepow-internetowych-grudziadz",
        destination: `${DEFAULT_CITY_HUB_PATH}/tworzenie-sklepow-internetowych`,
        permanent: true,
      },
      {
        source: "/sklepy-internetowe-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/tworzenie-sklepow-internetowych`,
        permanent: true,
      },
      {
        source: "/sklepy-internetowe",
        destination: `${DEFAULT_CITY_HUB_PATH}/tworzenie-sklepow-internetowych`,
        permanent: true,
      },
      {
        source: "/strony-internetowe-na-sprzedaz",
        destination: `${DEFAULT_CITY_HUB_PATH}/strony-internetowe-na-sprzedaz`,
        permanent: true,
      },
      {
        source: "/strony-internetowe-na-sprzedaz-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/strony-internetowe-na-sprzedaz`,
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych",
        destination: `${DEFAULT_CITY_HUB_PATH}/seo`,
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych-grudziadz",
        destination: `${DEFAULT_CITY_HUB_PATH}/seo`,
        permanent: true,
      },
      {
        source: "/seo-grudziadz",
        destination: `${DEFAULT_CITY_HUB_PATH}/seo`,
        permanent: true,
      },
      {
        source: "/pozycjonowanie-stron-internetowych-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/seo`,
        permanent: true,
      },
      {
        source: "/seo-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/seo`,
        permanent: true,
      },
      {
        source: "/seo",
        destination: `${DEFAULT_CITY_HUB_PATH}/seo`,
        permanent: true,
      },
      {
        source: "/tworzenie-stron-internetowych-grudziadz",
        destination: `${DEFAULT_CITY_HUB_PATH}/tworzenie-stron-internetowych`,
        permanent: true,
      },
      {
        source: "/tworzenie-stron-internetowych-:city",
        destination: `${CITY_HUB_BASE_PATH}/:city/tworzenie-stron-internetowych`,
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
