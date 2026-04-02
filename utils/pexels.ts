import type { LandingPageCity } from "@/data/polishCities";

export type PexelsCityPhoto = {
  id: number;
  src: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  pexelsUrl: string;
};

type PexelsSearchResponse = {
  photos?: Array<{
    id: number;
    alt?: string;
    url: string;
    photographer: string;
    photographer_url: string;
    src: {
      medium?: string;
      large?: string;
      large2x?: string;
      landscape?: string;
    };
  }>;
};

const PEXELS_API_URL = "https://api.pexels.com/v1/search";
const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

function getPexelsHeaders() {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    return null;
  }

  return {
    Authorization: apiKey,
  };
}

function getCityPhotoQueries(city: LandingPageCity): string[] {
  return [
    `${city.name} Poland city`,
    `${city.name} old town Poland`,
    `${city.name} architecture Poland`,
    `${city.name} ${city.province} Poland`,
  ];
}

function toCityPhoto(
  photo: NonNullable<PexelsSearchResponse["photos"]>[number],
  city: LandingPageCity,
): PexelsCityPhoto | null {
  const src =
    photo.src.landscape ??
    photo.src.large2x ??
    photo.src.large ??
    photo.src.medium;

  if (!src) {
    return null;
  }

  return {
    id: photo.id,
    src,
    alt: photo.alt?.trim() || `${city.name} - fotografia miasta z Pexels`,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    pexelsUrl: photo.url,
  };
}

async function searchPexelsPhotos(
  query: string,
  city: LandingPageCity,
): Promise<PexelsCityPhoto[]> {
  const headers = getPexelsHeaders();

  if (!headers) {
    return [];
  }

  const response = await fetch(
    `${PEXELS_API_URL}?query=${encodeURIComponent(query)}&per_page=6&orientation=landscape`,
    {
      headers,
      next: {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      },
    },
  );

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as PexelsSearchResponse;

  return (data.photos ?? [])
    .map((photo) => toCityPhoto(photo, city))
    .filter((photo): photo is PexelsCityPhoto => Boolean(photo));
}

export async function getCityPexelsPhotos(
  city: LandingPageCity,
  limit = 3,
): Promise<PexelsCityPhoto[]> {
  const collected = new Map<number, PexelsCityPhoto>();

  for (const query of getCityPhotoQueries(city)) {
    const photos = await searchPexelsPhotos(query, city);

    for (const photo of photos) {
      if (!collected.has(photo.id)) {
        collected.set(photo.id, photo);
      }

      if (collected.size >= limit) {
        return Array.from(collected.values()).slice(0, limit);
      }
    }
  }

  return Array.from(collected.values()).slice(0, limit);
}
