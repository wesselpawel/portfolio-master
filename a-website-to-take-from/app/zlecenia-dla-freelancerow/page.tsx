"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobsForm, { Filters } from "@/components/jobs/JobsForm"; // <- poprzedni komponent (popup)

// ------------------------------
// MOCK: typy i przykładowe dane
// W prawdziwej wersji podmień na fetch do /api/projects
// ------------------------------
export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  budgetMin?: number | null;
  budgetMax?: number | null;
  averageOffer?: number | null;
  offersCount?: number | null;
  status: "open" | "closed" | "finished";
  createdAt: string; // ISO
};

const MOCK: Project[] = [
  {
    id: "1",
    title: "Artulias Metin2",
    description:
      "Poszukuję osoby kompetentnej która wykona dla mnie samego klienta do gry Metin2 oraz forum. Płatność po ukończeniu.",
    tags: ["HTML", "MySQL", "PHP", "Metin2"],
    budgetMin: 50,
    budgetMax: 200,
    averageOffer: 118,
    offersCount: 9,
    status: "finished",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    title: "Programista Metin2 (Python/Lua)",
    description:
      "Szukam developera z doświadczeniem w Python/Lua do modyfikacji serwera i skryptów gry Metin2.",
    tags: ["Python", "Lua", "Metin2"],
    budgetMin: 300,
    budgetMax: 1000,
    averageOffer: 650,
    offersCount: 5,
    status: "open",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
  {
    id: "3",
    title: "Skórka forum dla Metin2",
    description: "Potrzebna responsywna skórka forum + integracja z Discord.",
    tags: ["Design", "CSS", "HTML"],
    budgetMin: 150,
    budgetMax: 400,
    averageOffer: 260,
    offersCount: 3,
    status: "open",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

// Prosta funkcja filtrująca po stronie klienta (zastąpić backendem)
function filterProjects(list: Project[], q: string, f: Filters) {
  const query = (q || f.query || "").trim().toLowerCase();
  let res = list.filter((p) => {
    const hay = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
    return query ? hay.includes(query) : true;
  });

  // budget
  res = res.filter((p) => {
    const minOK = f.budgetMin == null || (p.budgetMin ?? 0) >= f.budgetMin!;
    const maxOK =
      f.budgetMax == null || (p.budgetMax ?? Infinity) <= f.budgetMax!;
    return minOK && maxOK;
  });

  // period
  const now = Date.now();
  const thresholds: Record<Filters["period"], number> = {
    "24h": now - 24 * 3600 * 1000,
    "7d": now - 7 * 24 * 3600 * 1000,
    "30d": now - 30 * 24 * 3600 * 1000,
    all: 0,
  };
  const t = thresholds[f.period];
  if (t > 0) res = res.filter((p) => new Date(p.createdAt).getTime() >= t);

  // type (mockowo: mapujemy)
  // fixed -> mają budgetMin/budgetMax
  // hourly -> brak budżetu, ale w mocku nie mamy, więc pomijamy
  // contest -> brak w mocku
  if (f.type === "fixed")
    res = res.filter((p) => p.budgetMin != null || p.budgetMax != null);

  // sort
  res = [...res].sort((a, b) => {
    switch (f.sortBy) {
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "budget_desc":
        return (b.budgetMax ?? 0) - (a.budgetMax ?? 0);
      case "budget_asc":
        return (a.budgetMax ?? 0) - (b.budgetMax ?? 0);
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  return res;
}

// ------------------------------
// UI helpers
// ------------------------------
function classNames(...s: (string | false | undefined)[]) {
  return s.filter(Boolean).join(" ");
}

function toQueryString(filters: Partial<Filters> & { q?: string }) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.type && filters.type !== "any") params.set("type", filters.type);
  if (filters.budgetMin != null) params.set("min", String(filters.budgetMin));
  if (filters.budgetMax != null) params.set("max", String(filters.budgetMax));
  if (filters.period && filters.period !== "all")
    params.set("period", filters.period);
  if (filters.sortBy && filters.sortBy !== "newest")
    params.set("sort", filters.sortBy);
  return params.toString();
}

function readInitialQuery(searchParams: URLSearchParams) {
  // wspieramy /zlecenia-dla-freelancerow?python (bez klucza)
  let q = searchParams.get("q") || "";
  if (!q && Array.from(searchParams.keys()).length === 1) {
    const key = Array.from(searchParams.keys())[0];
    if (searchParams.get(key) === null || searchParams.get(key) === "") {
      q = key; // traktuj nazwę parametru jako frazę
    }
  }
  return q;
}

// ------------------------------
// KARTA WYNIKU
// ------------------------------
const ResultCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="rounded-2xl border border-blue-200 p-5 bg-white/70 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-700">{project.title}</h3>
          <p className="text-sm text-zinc-700 mt-1 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm text-zinc-600">
            Ofert: {project.offersCount ?? 0}
          </div>
          <div className="text-sm text-zinc-600">
            Średnia: {project.averageOffer ? `$${project.averageOffer}` : "—"}
          </div>
          <div className="text-sm text-zinc-600 mt-1">
            {project.budgetMin != null || project.budgetMax != null
              ? `${project.budgetMin ?? "?"}zł – ${project.budgetMax ?? "?"}zł`
              : "—"}
          </div>
          <div className="text-xs mt-2 text-zinc-500">
            {new Date(project.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------
// NAGŁÓWEK + WYSZUKIWANIE + FILTRY
// ------------------------------
const Toolbar: React.FC<{
  q: string;
  onSearch: (q: string) => void;
  onOpenFilters: () => void;
  total: number;
}> = ({ q, onSearch, onOpenFilters, total }) => {
  const [value, setValue] = useState(q);
  useEffect(() => setValue(q), [q]);
  return (
    <div className="rounded-2xl border border-blue-200 p-4 bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 w-full md:max-w-xl">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(value);
          }}
          placeholder="np. Grafik, Python..."
          className="text-black font-gotham placeholder:font-light placeholder:italic flex-1 border border-blue-200 rounded-xl px-4 py-3 bg-white/80 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        />
        <button
          onClick={() => onSearch(value)}
          className="px-4 py-3 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 text-white shadow"
        >
          Szukaj
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenFilters}
          className="px-4 py-3 rounded-xl bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 shadow"
        >
          Filtry
        </button>
        <span className="text-sm text-zinc-600">{total} wyników</span>
      </div>
    </div>
  );
};

// ------------------------------
// STRONA /zlecenia-dla-freelancerow
// ------------------------------
export default function FreelancerJobsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Inicjalne Q z URL (obsługa ?python)
  const qFromUrl = useMemo(
    () => readInitialQuery(searchParams),
    [searchParams]
  );

  // Inicjalne filtry z URL
  const initialFilters: Filters = useMemo(
    () => ({
      query: qFromUrl,
      type: (searchParams.get("type") as Filters["type"]) || "any",
      budgetMin: searchParams.get("min")
        ? Number(searchParams.get("min"))
        : null,
      budgetMax: searchParams.get("max")
        ? Number(searchParams.get("max"))
        : null,
      period: (searchParams.get("period") as Filters["period"]) || "all",
      sortBy: (searchParams.get("sort") as Filters["sortBy"]) || "newest",
    }),
    [qFromUrl, searchParams]
  );

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  // Reaguj na zmianę URL (np. wstecz/przód w historii) – aktualizuj stan
  useEffect(() => setFilters(initialFilters), [initialFilters]);

  // Dane (mock): filtruj lokalnie
  const results = useMemo(
    () => filterProjects(MOCK, qFromUrl, filters),
    [filters, qFromUrl]
  );

  function pushUrl(next: Partial<Filters> & { q?: string }) {
    const qs = toQueryString(next);
    const base = "/zlecenia-dla-freelancerow";
    router.push(qs ? `${base}?${qs}` : base);
  }

  function handleSearch(q: string) {
    const next = { ...filters, query: q };
    setFilters(next);
    pushUrl({ ...next, q });
  }

  function handleApply(f: Filters) {
    setFilters(f);
    pushUrl({
      q: f.query,
      type: f.type,
      budgetMin: f.budgetMin ?? undefined,
      budgetMax: f.budgetMax ?? undefined,
      period: f.period,
      sortBy: f.sortBy,
    });
  }

  return (
    <main className="py-[20vh] lg:py-[25vh] bg-zinc-800">
      <div className="max-w-5xl mx-auto bg-white p-4 lg:p-8 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-800 drop-shadow-xl shadow-black mb-4">
          Zlecenia dla freelancerów
        </h1>

        <Toolbar
          q={filters.query}
          onSearch={handleSearch}
          onOpenFilters={() => setFiltersOpen(true)}
          total={results.length}
        />

        <section className="mt-6 grid gap-4">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-blue-200 p-8 text-center bg-white/70">
              Brak wyników dla podanych kryteriów.
            </div>
          ) : (
            results.map((p) => <ResultCard key={p.id} project={p} />)
          )}
        </section>

        {/* Popup z filtrami */}
        <JobsForm
          isOpen={isFiltersOpen}
          onClose={() => setFiltersOpen(false)}
          onApply={handleApply}
          initial={filters}
        />
      </div>
    </main>
  );
}
