import type { Metadata } from "next";
import ZaprojektowaniLandingPage from "@/components/zaprojektowani/ZaprojektowaniLandingPage";
import { getDocuments } from "@/common/firebase";
import type { Post } from "@/types";

async function getHomeBlogPosts(): Promise<Post[]> {
  const collectionDocs: unknown[] = await getDocuments("blog");
  const unique = new Map<string, Post>();
  for (const p of collectionDocs || []) {
    const post = p as Post;
    if (post?.postId) unique.set(post.postId, post);
  }
  return Array.from(unique.values()).filter(
    (p) => p?.manual === true && (p.slug || p.url || p.postId)
  );
}

const city = "Grudziądz";
const ownerName = "Paweł Wessel";

const siteTitle = `Tworzenie stron internetowych ${city} | ${ownerName}`;
const siteDescription =
  `Projektuję strony WWW w ${city}: UX, SEO techniczne i szybkie wdrożenie. Darmowa wycena i jasny proces współpracy.`;
const siteUrl = "https://quixy.pl";
const siteName = "Quixy Studio";

const mainImage = {
  url: "/main.png",
  width: 1200,
  height: 630,
  alt: "Tworzenie stron internetowych",
};

const keywords =
  `tworzenie stron internetowych ${city}, strony www ${city}, UX ${city}, SEO techniczne ${city}, projektowanie stron, wdrożenie stron, Grudziądz`;

const icons = [
  {
    url: "/favicons/apple-touch-icon.png",
    sizes: "180x180",
    type: "image/png",
  },
  {
    url: "/favicons/favicon-16x16.png",
    sizes: "16x16",
    type: "image/png",
  },
  {
    url: "/favicons/android-chrome-512x512.png",
    sizes: "512x512",
    type: "image/png",
  },
  {
    url: "/favicons/android-chrome-192x192.png",
    sizes: "192x192",
    type: "image/png",
  },
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
];

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName,
    images: [mainImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [mainImage.url],
  },
  authors: [{ name: siteName, url: siteUrl }],
  publisher: siteName,
  keywords,
  icons,
};

export default async function Page() {
  const blogPosts = await getHomeBlogPosts();
  return (
    <ZaprojektowaniLandingPage
      city={city}
      ownerName={ownerName}
      phone="+48 721 417 154"
      email="kontakt@quixy.pl"
      blogPosts={blogPosts}
      logos={[
        "Manicuregrudziadz.pl",
        "Zaklejki.pl",
        "Quixy Studio",
        "Krawiec z dojazdem",
        "Bransoletka24",
      ]}
      cases={[
        {
          title: "Manicure Grudziądz",
          subtitle: "Strona WWW • UX • SEO",
          imageSrc: "/images/projects/manicuregrudziadz/hero.webp",
          href: "/oferta/tworzenie-stron-w-internecie-grudziadz",
        },
        {
          title: "Zaklejki.pl",
          subtitle: "E-commerce • UX • SEO",
          imageSrc: "/images/projects/zaklejki/hero.webp",
          href: "/oferta/nextjs-sklep-internetowy-grudziadz",
        },
      ]}
      otherProjects={[
        "Apartament Piękna",
        "Druga Szansa",
        "Inusti",
        "Piekarnia Marysia",
        "RUTPOŻ",
        "Klinika Nova",
        "Salon Fryzur",
        "Hotel Premium",
        "Kancelaria Deluga",
        "EduPortal",
      ]}
    />
  );
}

