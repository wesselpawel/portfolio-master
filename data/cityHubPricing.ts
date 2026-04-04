import type { LandingPageServiceKey } from "@/data/landingPages";
import raw from "./cityHubPricing.json";

export type HubPricingFeatureRow = {
  key: string;
  label: string;
  hint?: string;
};

export type HubPricingPackage = {
  id: string;
  name: string;
  priceFrom: string;
  priceNote?: string;
  highlight?: boolean;
  serviceKey: LandingPageServiceKey;
};

/** Opcja dopłaty w konfiguratorze „Zobacz wycenę”. Brak forPackages = wszystkie pakiety w tabeli. */
export type HubQuoteAddon = {
  id: string;
  label: string;
  description?: string;
  pricePln: number;
  forPackages?: string[];
};

/** Konfigurator wyceny — kwoty w PLN (liczby całkowite). null = baza ustalana indywidualnie. */
export type HubQuoteSpec = {
  packageBasePln: Record<string, number | null>;
  addons: HubQuoteAddon[];
};

export type HubPricingTable = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  featureRows: HubPricingFeatureRow[];
  packages: HubPricingPackage[];
  /** [packageId][featureKey] = tekst komórki */
  values: Record<string, Record<string, string>>;
  /** Opcjonalnie: konfigurator i kalkulacja przybliżonej ceny */
  quoteSpec?: HubQuoteSpec;
};

export type CityHubPricingDocument = {
  meta?: { version?: number; description?: string };
  tables: HubPricingTable[];
};

export const cityHubPricingData = raw as unknown as CityHubPricingDocument;
