import { Metadata } from "next";
import Link from "next/link";

import dynamic from "next/dynamic";
import { getServices } from "@/lib/getServices";
import { getPosts } from "@/lib/getPosts";
import Hero from "@/components/hero/Hero";
const BlogPostList = dynamic(
  () => import("@/components/quixyComponents/BlogPostList")
);

export default async function Page() {
  const services = await getServices();
  const posts = await getPosts();
  return (
    <>
      <div className="bg-black/90 w-full h-full fixed left-0 top-0">
        <Hero />
      </div>
      <div className="overflow-hidden pt-24">
        <div className="container p-6 lg:p-12 relative z-50 mx-auto">
          <div className=" text-white flex flex-col breadcrumbs">
            <ul className="flex items-center flex-wrap">
              <li className="!text-white">
                <Link href={`/`} title="praca zdalna">
                  hello!
                </Link>
              </li>
              <li className="!text-white">
                <Link href="/news" title="aktualności">
                  news
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-h-[20vh]">
            <BlogPostList posts={posts} />
          </div>
        </div>{" "}
      </div>
    </>
  );
}
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#fff",
  publisher: "wesiudev.com",
  authors: [
    {
      name: "quixy",
      url: "https://quixy.pl",
    },
    {
      name: "quixy",
      url: "https://quixy.pl",
    },
  ],

  manifest: "/manifest.json",
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  title: "Aktualności Quixy Studio Grudziądz",

  description:
    "Tworzenie stron internetowych, sklepów, aplikacji webowych i mobilnych. Prowadzenie kampanii Google Ads i social media. Pozycjonowanie stron www. Quixy Studio Grudziądz.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl/news",
    title: "Aktualności Quixy Studio Grudziądz",
    description:
      "Tworzenie stron internetowych, sklepów, aplikacji webowych i mobilnych. Prowadzenie kampanii Google Ads i social media. Pozycjonowanie stron www. Quixy Studio Grudziądz.",
    siteName: "Quixy",
  },
};
