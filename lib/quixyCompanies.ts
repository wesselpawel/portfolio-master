import "server-only";

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";
import type { CompanyProfile } from "@/data/companyProfiles";
import {
  getLandingPageBySlug,
  type LandingPageServiceKey,
} from "@/data/landingPages";
import { polishToEnglish } from "@/utils/polishToEnglish";

type QuixyTag = {
  title?: string;
  url?: string;
  categoryTitle?: string;
  categoryUrl?: string;
  slugTitle?: string;
  slugUrl?: string;
};

type QuixyUser = {
  uid?: string;
  pseudo?: string;
  seek?: boolean | "ask";
  emailVerified?: boolean;
  configured?: boolean;
  access?: boolean;
  name?: string;
  title?: string;
  city?: string;
  photoURL?: string;
  website?: string;
  description?: string;
  tags?: QuixyTag[];
  preferences?: string[];
  technologies?: string[];
};

const SECONDARY_FIREBASE_APP_NAME = "quixy-portfolio";

function getSecondaryFirebaseConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY2,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN2,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID2,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET2,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID2,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID2,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID2,
  };

  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    return null;
  }

  return config;
}

function getSecondaryFirestore() {
  const config = getSecondaryFirebaseConfig();

  if (!config) {
    return null;
  }

  const existingApp = getApps().find(
    (firebaseApp) => firebaseApp.name === SECONDARY_FIREBASE_APP_NAME,
  );
  const app = existingApp
    ? getApp(SECONDARY_FIREBASE_APP_NAME)
    : initializeApp(config, SECONDARY_FIREBASE_APP_NAME);

  return getFirestore(app);
}

function normalizeWebsite(website?: string): string | undefined {
  if (!website) {
    return undefined;
  }

  if (website.startsWith("http://") || website.startsWith("https://")) {
    return website;
  }

  return `https://${website}`;
}

function stripHtml(input?: string): string {
  if (!input) {
    return "";
  }

  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTagLabels(tags?: QuixyTag[]): string[] {
  return (tags ?? [])
    .map((tag) => tag.slugTitle ?? tag.title ?? tag.categoryTitle ?? "")
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index);
}

function inferServiceKeys(user: QuixyUser): LandingPageServiceKey[] {
  const searchableText = [
    user.title ?? "",
    stripHtml(user.description),
    ...getTagLabels(user.tags),
    ...(user.preferences ?? []),
    ...(user.technologies ?? []),
  ]
    .join(" ")
    .toLowerCase();

  const serviceKeys: LandingPageServiceKey[] = [];

  if (searchableText.includes("sklep") || searchableText.includes("shopify")) {
    serviceKeys.push("store");
  }

  if (searchableText.includes("landing")) {
    serviceKeys.push("landing");
  }

  if (
    searchableText.includes("projekt") ||
    searchableText.includes("ux") ||
    searchableText.includes("ui") ||
    searchableText.includes("design")
  ) {
    serviceKeys.push("design");
  }

  if (
    searchableText.includes("pozycjon") ||
    searchableText.includes("seo") ||
    searchableText.includes("google")
  ) {
    serviceKeys.push("seo");
  }

  if (searchableText.includes("sprzedaz") || searchableText.includes("lead")) {
    serviceKeys.push("sale");
  }

  serviceKeys.push("website");

  return serviceKeys.filter(
    (serviceKey, index, array) => array.indexOf(serviceKey) === index,
  );
}

function createShortDescription(user: QuixyUser, tags: string[]): string {
  const cleanDescription = stripHtml(user.description);

  if (cleanDescription) {
    return cleanDescription.slice(0, 220).trim();
  }

  if (tags.length) {
    return `Profil firmy aktywnej w Quixy w obszarach: ${tags
      .slice(0, 4)
      .join(", ")}.`;
  }

  return "Publiczny profil firmy pobrany z kolekcji users w podpiętej aplikacji Quixy.";
}

function createHeadline(user: QuixyUser): string {
  if (user.title?.trim()) {
    return user.title.trim();
  }

  return "Publiczny profil firmy z podpiętej bazy Quixy.";
}

function normalizeCompanyUser(user: QuixyUser): CompanyProfile | null {
  if (
    user.seek !== false ||
    user.seek === "ask" ||
    !user.emailVerified ||
    !user.configured ||
    !user.access ||
    !user.pseudo ||
    !user.name
  ) {
    return null;
  }

  const tags = getTagLabels(user.tags).slice(0, 4);
  const cityName = user.city?.trim() || "Polska";

  return {
    slug: user.pseudo,
    name: user.name.trim(),
    title: user.title?.trim() || "Profil firmy",
    headline: createHeadline(user),
    shortDescription: createShortDescription(user, tags),
    citySlug: polishToEnglish(cityName),
    cityName,
    services: inferServiceKeys(user),
    tags,
    website: normalizeWebsite(user.website),
    photoURL: user.photoURL,
  };
}

function getProfileScore(profile: CompanyProfile, currentSlug?: string): number {
  const currentPage = currentSlug ? getLandingPageBySlug(currentSlug) : null;
  let score = 0;

  if (currentPage?.citySlug && profile.citySlug === currentPage.citySlug) {
    score += 4;
  }

  if (
    currentPage?.serviceKey &&
    profile.services.includes(currentPage.serviceKey)
  ) {
    score += 2;
  }

  return score;
}

export async function getQuixyCompanyProfiles(
  currentSlug?: string,
  limit = 3,
): Promise<CompanyProfile[]> {
  const db = getSecondaryFirestore();

  if (!db) {
    return [];
  }

  const snapshot = await getDocs(collection(db, "users"));
  const companies = snapshot.docs
    .map((docSnapshot) => normalizeCompanyUser(docSnapshot.data() as QuixyUser))
    .filter((company): company is CompanyProfile => Boolean(company))
    .sort((left, right) => {
      const scoreDifference =
        getProfileScore(right, currentSlug) - getProfileScore(left, currentSlug);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return left.name.localeCompare(right.name, "pl");
    });

  return companies.slice(0, limit);
}

export async function getQuixyCompanyProfileBySlug(
  slug: string,
): Promise<CompanyProfile | null> {
  const db = getSecondaryFirestore();

  if (!db) {
    return null;
  }

  const companyQuery = query(collection(db, "users"), where("pseudo", "==", slug));
  const snapshot = await getDocs(companyQuery);
  const company = snapshot.docs
    .map((docSnapshot) => normalizeCompanyUser(docSnapshot.data() as QuixyUser))
    .find(Boolean);

  return company ?? null;
}
