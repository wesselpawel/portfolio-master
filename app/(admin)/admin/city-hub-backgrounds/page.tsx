"use client";

import {
  getAllCityHubSlugs,
  getCityHubHref,
  getLandingPageCityBySlug,
} from "@/data/landingPages";
import {
  clearCityHubBackground,
  getCityHubBackground,
  setCityHubBackground,
  storage,
} from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const SLUG_PREVIEW_LIMIT = 60;

export default function CityHubBackgroundsAdminPage() {
  const allSlugs = useMemo(() => getAllCityHubSlugs().sort(), []);
  const [slugQuery, setSlugQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredSlugs = useMemo(() => {
    const q = slugQuery.trim().toLowerCase();
    if (!q) return allSlugs.slice(0, SLUG_PREVIEW_LIMIT);
    return allSlugs.filter((s) => s.includes(q)).slice(0, SLUG_PREVIEW_LIMIT);
  }, [allSlugs, slugQuery]);

  const selectedCity = selectedSlug
    ? getLandingPageCityBySlug(selectedSlug)
    : null;

  const loadBackground = useCallback(async (slug: string) => {
    if (!slug) {
      setCurrentUrl(null);
      return;
    }
    setLoadingDoc(true);
    setError(null);
    try {
      const data = await getCityHubBackground(slug);
      setCurrentUrl(
        data?.backgroundImageUrl && typeof data.backgroundImageUrl === "string"
          ? data.backgroundImageUrl
          : null,
      );
    } catch {
      setCurrentUrl(null);
      setError("Nie udało się odczytać ustawień z Firestore (reguły / sieć).");
    } finally {
      setLoadingDoc(false);
    }
  }, []);

  useEffect(() => {
    loadBackground(selectedSlug);
  }, [selectedSlug, loadBackground]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !selectedSlug) return;
    if (!file.type.startsWith("image/")) {
      setError("Wybierz plik graficzny (JPG, PNG, WebP itd.).");
      return;
    }
    setUploading(true);
    setMessage(null);
    setError(null);
    try {
      const id = uuidv4();
      const path = `city-hub-hero/${selectedSlug}/${id}-${file.name.replace(/\s+/g, "-")}`;
      const imageRef = ref(storage, path);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      await setCityHubBackground(selectedSlug, { backgroundImageUrl: url });
      setCurrentUrl(url);
      setMessage("Zapisano tło dla tego miasta.");
    } catch {
      setError("Błąd uploadu lub zapisu. Sprawdź reguły Storage / Firestore.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleClear() {
    if (!selectedSlug) return;
    setMessage(null);
    setError(null);
    try {
      await clearCityHubBackground(selectedSlug);
      setCurrentUrl(null);
      setMessage("Usunięto tło (strona użyje domyślnego gradientu).");
    } catch {
      setError("Nie udało się usunąć dokumentu.");
    }
  }

  const hubPath = selectedSlug ? getCityHubHref(selectedSlug) : "";

  return (
    <div className="max-w-3xl p-6 text-white sm:p-10">
      <h1 className="text-2xl font-bold">Tła hubów miast</h1>
      <p className="mt-2 text-sm text-white/70">
        Unikalne zdjęcie w tle pierwszej sekcji strony{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
          /projektowanie-stron/&#123;miasto&#125;
        </code>
        . Dane: kolekcja Firestore{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
          cityHubBackgrounds
        </code>{" "}
        (ID dokumentu = slug miasta, pole{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
          backgroundImageUrl
        </code>
        ). W Storage ścieżka{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
          city-hub-hero/&#123;slug&#125;/…
        </code>
        .
      </p>
      <p className="mt-3 text-xs text-amber-200/90">
        Ustaw w Firebase: odczyt{" "}
        <code className="rounded bg-white/10 px-1">cityHubBackgrounds</code> dla
        wszystkich (lub tylko zalogowanych), zapis tylko dla admina; zapis do
        folderu <code className="rounded bg-white/10 px-1">city-hub-hero</code>{" "}
        w Storage.
      </p>

      <div className="mt-8 space-y-4">
        <label className="block text-sm font-semibold text-white/90">
          Szukaj slug (np. grudziadz, warszawa)
          <input
            type="search"
            value={slugQuery}
            onChange={(e) => setSlugQuery(e.target.value)}
            placeholder="Fragment slug…"
            className="mt-2 w-full rounded-lg border border-white/15 bg-[#2F313C] px-3 py-2.5 text-white outline-none focus:border-green-400/60"
          />
        </label>

        <label className="block text-sm font-semibold text-white/90">
          Wybierz miasto
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-[#2F313C] px-3 py-2.5 text-white outline-none focus:border-green-400/60"
          >
            <option value="">— wybierz —</option>
            {filteredSlugs.map((slug) => {
              const city = getLandingPageCityBySlug(slug);
              return (
                <option key={slug} value={slug}>
                  {city?.name ?? slug} ({slug})
                </option>
              );
            })}
          </select>
        </label>
        {slugQuery.trim() && filteredSlugs.length >= SLUG_PREVIEW_LIMIT ? (
          <p className="text-xs text-white/50">
            Pokazano pierwsze {SLUG_PREVIEW_LIMIT} dopasowania — zawęż wyszukiwanie.
          </p>
        ) : null}
      </div>

      {selectedSlug ? (
        <div className="mt-8 rounded-xl border border-white/10 bg-[#2a2c38] p-5">
          <p className="text-sm text-white/80">
            <span className="font-semibold text-white">
              {selectedCity?.name ?? selectedSlug}
            </span>
            {hubPath ? (
              <>
                {" · "}
                <Link
                  href={hubPath}
                  className="text-green-300 underline underline-offset-2 hover:text-green-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  Otwórz hub
                </Link>
              </>
            ) : null}
          </p>

          <div className="relative mt-4 aspect-[21/9] w-full overflow-hidden rounded-lg border border-white/10 bg-black/40">
            {loadingDoc ? (
              <div className="flex h-full items-center justify-center text-sm text-white/50">
                Wczytywanie…
              </div>
            ) : currentUrl ? (
              <Image
                src={currentUrl}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-sm text-white/45">
                Brak własnego tła — na stronie jest domyślny gradient
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500 disabled:opacity-50">
              <FaUpload />
              {uploading ? "Wysyłanie…" : "Wgraj nowe tło"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={handleFileChange}
              />
            </label>
            <button
              type="button"
              onClick={handleClear}
              disabled={!currentUrl || uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/40 bg-red-500/15 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500/25 disabled:opacity-40"
            >
              <FaTrash />
              Usuń tło
            </button>
          </div>
        </div>
      ) : null}

      {message ? (
        <p className="mt-4 text-sm text-green-300">{message}</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
