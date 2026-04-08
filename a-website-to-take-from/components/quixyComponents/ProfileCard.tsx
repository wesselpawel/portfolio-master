import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaDollarSign, FaMapMarkerAlt, FaClock, FaTools } from "react-icons/fa";

interface Tag {
  title: string;
  slugUrl?: string;
  categoryUrl?: string;
  url?: string;
}

interface ProfileCardProps {
  profile: {
    pseudo: string;
    name?: string;
    title?: string;
    city?: string;
    hourRate?: number | null;
    photoURL?: string | null;
    tags?: Tag[];
    preferences?: string[];
    services?: any[];
    projects?: any[];
  };
  type: "freelancer" | "firma";
  loading?: boolean; // <- opcjonalny skeleton
}

export default function ProfileCard({
  profile,
  type,
  loading,
}: ProfileCardProps) {
  const [showMoreSpecializations, setShowMoreSpecializations] = useState(false);

  const linkHref =
    type === "freelancer"
      ? `/freelancer/${profile.pseudo}`
      : `/firma/${profile.pseudo}`;

  const tags = Array.isArray(profile?.tags) ? profile.tags : [];
  const prefs = Array.isArray(profile?.preferences) ? profile.preferences : [];
  const servicesCount =
    (profile?.services?.length || 0) + (profile?.projects?.length || 0);

  const visibleTags = showMoreSpecializations ? tags : tags.slice(0, 3);
  const remainingTags = Math.max(tags.length - 3, 0);

  const initials = useMemo(() => {
    const src = profile?.name || profile?.pseudo || "";
    return src.trim().slice(0, 1).toUpperCase();
  }, [profile?.name, profile?.pseudo]);

  if (loading) {
    return (
      <div className="relative isolate overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-start gap-4 animate-pulse">
          <div className="h-16 w-16 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-slate-200" />
            <div className="h-3 w-1/2 rounded bg-slate-200" />
            <div className="mt-3 flex gap-2">
              <div className="h-6 w-20 rounded-full bg-slate-200" />
              <div className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="h-6 w-16 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
        <div className="mt-4 h-9 w-28 rounded-md bg-slate-200" />
      </div>
    );
  }

  return (
    <Link
      href={linkHref}
      className="group relative block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-transparent transition
                 hover:shadow-md hover:ring-primaryStart/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryStart"
      aria-label={`Zobacz profil: ${profile?.name || profile?.pseudo}`}
    >
      {/* top row */}
      <div className="grid grid-cols-[auto,1fr] items-start gap-3 sm:gap-4">
        {/* Avatar */}
        {profile?.photoURL ? (
          <span className="relative inline-flex h-16 w-16 overflow-hidden rounded-full ring-1 ring-slate-200">
            <Image
              src={profile.photoURL}
              alt={`Zdjęcie ${
                type === "freelancer" ? "freelancera" : "firmy"
              } ${profile?.name || profile?.pseudo}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </span>
        ) : (
          <span
            aria-hidden
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-primaryStart to-primaryEnd text-xl font-extrabold text-white ring-1 ring-slate-200"
          >
            {initials}
          </span>
        )}

        {/* Name + Title + Chips */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
              {profile?.name || profile?.pseudo}
            </h3>
            {servicesCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
                <FaTools className="shrink-0" />
                {servicesCount} usług
              </span>
            )}
          </div>

          {profile?.title && (
            <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">
              {profile.title}
            </p>
          )}

          {/* tags */}
          {tags.length > 0 && (
            <div className="h-max mt-3 flex flex-wrap items-center gap-1.5">
              {visibleTags.map((t, i) => (
                <span
                  key={`${t.title}-${i}`}
                  title={t.title}
                  className="h-max inline-flex max-w-full items-center truncate rounded-full bg-gradient-to-b
                             from-primaryStart to-primaryEnd px-2 py-1 text-[11px] font-medium text-white shadow-sm
                             transition group-hover:brightness-105"
                >
                  {t.title}
                </span>
              ))}

              {remainingTags > 0 && !showMoreSpecializations && (
                <div
                  className="inline-flex items-center rounded-full bg-gradient-to-b from-accentStart to-accentEnd px-2 py-1 text-[11px] font-medium text-white shadow-sm hover:brightness-105"
                  aria-label={`Pokaż więcej specjalizacji (${remainingTags})`}
                >
                  +{remainingTags}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {profile?.city && (
          <span className="inline-flex items-center gap-1 text-slate-700">
            <FaMapMarkerAlt className="text-primaryStart" aria-hidden />
            <span className="truncate">{profile.city}</span>
          </span>
        )}

        {prefs.length > 0 && (
          <span className="inline-flex items-center gap-1 text-slate-700">
            <FaClock className="text-primaryStart" aria-hidden />
            <span className="flex flex-wrap items-center gap-1">
              {prefs.slice(0, 2).map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="rounded-md bg-primaryStart/10 px-2 py-0.5 text-xs text-primaryStart"
                >
                  {p}
                </span>
              ))}
              {prefs.length > 2 && (
                <span className="text-xs text-slate-500">
                  +{prefs.length - 2} więcej
                </span>
              )}
            </span>
          </span>
        )}

        <span className="inline-flex items-center gap-1 text-slate-700">
          <FaDollarSign className="text-primaryStart" aria-hidden />
          {profile?.hourRate ? (
            <span className="font-medium">{profile.hourRate} PLN/h</span>
          ) : (
            <span className="text-slate-500">Zapytaj o wycenę</span>
          )}
        </span>
      </div>

      {/* CTA */}
      <span
        className="pointer-events-none absolute right-4 top-4 inline-flex items-center rounded-md bg-gradient-to-r
                   from-primaryStart to-primaryEnd px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm
                   transition group-hover:opacity-100"
        aria-hidden
      >
        Zobacz profil
      </span>
    </Link>
  );
}
