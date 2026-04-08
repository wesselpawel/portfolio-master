"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

/**
 * Fixed popup do zbierania kryteriów wyszukiwania projektów (inspirowane freelancer.com)
 * - Styl i animacje zgodne z wcześniejszym PhoneModalFixed
 * - Walidacja na żywo
 * - Zwraca dane przez onApply (lub możesz podmienić na router push)
 */

// Typy i opcje
export type ProjectType = "fixed" | "hourly" | "contest" | "any";
export type Period = "24h" | "7d" | "30d" | "all";
export type SortBy = "newest" | "oldest" | "budget_desc" | "budget_asc";

export interface Filters {
  query: string;
  type: ProjectType;
  budgetMin?: number | null;
  budgetMax?: number | null;
  period: Period;
  sortBy: SortBy;
  similarQueries?: string[]; // NEW: for similar queries
}

const DEFAULTS: Filters = {
  query: "",
  type: "any",
  budgetMin: null,
  budgetMax: null,
  period: "all",
  sortBy: "newest",
};

function toNumberOrNull(v: string) {
  if (v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// --- Similar Query Logic ---

// Simple mapping for Polish IT jobs, can be extended
const SIMILAR_QUERIES_MAP: Record<string, string[]> = {
  programowanie: [
    "programista",
    "programistka",
    "programistów",
    "programistę",
    "programistom",
    "programistami",
  ],
  programista: [
    "programowanie",
    "programistka",
    "programistów",
    "programistę",
    "programistom",
    "programistami",
  ],
  programistka: [
    "programista",
    "programowanie",
    "programistów",
    "programistę",
    "programistom",
    "programistami",
  ],
  grafik: ["grafika", "graficzka", "grafików"],
  grafika: ["grafik", "graficzka", "grafików"],
  marketing: ["marketingowiec", "marketingu"],
  // ...add more as needed
};

// Helper: split query by "+" and trim, filter out empty
function splitQueryPlus(query: string): string[] {
  return query
    .split("+")
    .map((q) => q.trim())
    .filter((q) => q.length > 0);
}

function getSimilarQueries(query: string): string[] {
  // If query contains "+", treat as OR: split and collect all similar queries for each part
  if (query.includes("+")) {
    const parts = splitQueryPlus(query);
    // For each part, get its similar queries, flatten, and dedupe
    const all = parts.flatMap((part) => {
      // Lowercase and remove accents for matching
      const norm = (s: string) =>
        s
          .toLocaleLowerCase("pl")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      const q = norm(part);
      if (SIMILAR_QUERIES_MAP[q]) {
        return [part, ...SIMILAR_QUERIES_MAP[q]];
      }
      for (const key in SIMILAR_QUERIES_MAP) {
        if (q.startsWith(key) || key.startsWith(q)) {
          return [part, ...SIMILAR_QUERIES_MAP[key]];
        }
      }
      return [part];
    });
    // Dedupe, preserve order
    return Array.from(new Set(all));
  }

  // Lowercase and remove accents for matching
  const norm = (s: string) =>
    s
      .toLocaleLowerCase("pl")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const q = norm(query.trim());
  // Try to find direct mapping
  if (SIMILAR_QUERIES_MAP[q]) {
    return [query, ...SIMILAR_QUERIES_MAP[q]];
  }
  // Try to find mapping by partial match (e.g. "programow" matches "programowanie")
  for (const key in SIMILAR_QUERIES_MAP) {
    if (q.startsWith(key) || key.startsWith(q)) {
      return [query, ...SIMILAR_QUERIES_MAP[key]];
    }
  }
  // Fallback: just the query itself
  return [query];
}

// Portal wrapper
const ClientPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  initial?: Partial<Filters>;
}

const JobsForm: React.FC<Props> = ({ isOpen, onClose, onApply, initial }) => {
  const [query, setQuery] = useState(initial?.query ?? DEFAULTS.query);
  const [type, setType] = useState<ProjectType>(initial?.type ?? DEFAULTS.type);
  const [budgetMin, setBudgetMin] = useState<string>(
    initial?.budgetMin != null ? String(initial.budgetMin) : ""
  );
  const [budgetMax, setBudgetMax] = useState<string>(
    initial?.budgetMax != null ? String(initial.budgetMax) : ""
  );
  const [period, setPeriod] = useState<Period>(
    initial?.period ?? DEFAULTS.period
  );
  const [sortBy, setSortBy] = useState<SortBy>(
    initial?.sortBy ?? DEFAULTS.sortBy
  );

  // live errors
  const [budgetError, setBudgetError] = useState<string | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);

  // Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Validate numbers and ranges
  useEffect(() => {
    const min = toNumberOrNull(budgetMin);
    const max = toNumberOrNull(budgetMax);

    if (min != null && min < 0) {
      setBudgetError("Budżet minimalny nie może być ujemny.");
      return;
    }
    if (max != null && max < 0) {
      setBudgetError("Budżet maksymalny nie może być ujemny.");
      return;
    }
    if (min != null && max != null && min > max) {
      setBudgetError("Budżet min nie może być większy od max.");
      return;
    }
    setBudgetError(null);
  }, [budgetMin, budgetMax]);

  useEffect(() => {
    if (query.length > 120)
      setQueryError("Fraza jest za długa (max 120 znaków).");
    else setQueryError(null);
  }, [query]);

  function reset() {
    setQuery(DEFAULTS.query);
    setType(DEFAULTS.type);
    setBudgetMin("");
    setBudgetMax("");
    setPeriod(DEFAULTS.period);
    setSortBy(DEFAULTS.sortBy);
    setBudgetError(null);
    setQueryError(null);
  }

  function handleApply() {
    if (budgetError || queryError) return;
    // Compute similar queries for the filter
    // If query contains "+", treat as OR: split and collect all similar queries for each part
    let similarQueries: string[];
    let queryToSend: string;
    if (query.includes("+")) {
      const parts = splitQueryPlus(query.trim());
      similarQueries = getSimilarQueries(query.trim());
      // For display, join with " + "
      queryToSend = parts.join(" + ");
    } else {
      similarQueries = getSimilarQueries(query.trim());
      queryToSend = query.trim();
    }
    onApply({
      query: queryToSend,
      type,
      budgetMin: toNumberOrNull(budgetMin),
      budgetMax: toNumberOrNull(budgetMax),
      period,
      sortBy,
      similarQueries, // pass similar queries for backend/frontend filtering
    });
    onClose();
  }

  return (
    <ClientPortal>
      <div
        ref={rootRef}
        className={`fixed inset-0 z-[9999999998] font-gotham transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-[400vw]"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className={`w-full h-full bg-black transition-[background] duration-500 ${
            isOpen ? "bg-opacity-80" : "bg-opacity-0"
          }`}
        >
          {/* Sheet */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              isOpen ? "fixed -translate-y-0" : "-translate-y-[100vh]"
            } duration-500 delay-500 left-1/2 -translate-x-1/2 top-0 w-[92vw] max-w-[540px] max-h-[90vh] overflow-y-auto rounded-3xl p-0 border border-blue-200`}
            style={{
              boxShadow:
                "0 8px 40px 0 rgba(59,130,246,0.18), 0 1.5px 8px 0 rgba(30,64,175,0.10)",
              background:
                "linear-gradient(135deg, #bfdbfe 0%, #fff 60%, #dbeafe 100%)",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Zamknij"
              className="absolute top-4 right-4 bg-white/90 rounded-xl w-10 h-10 flex items-center justify-center border border-blue-300 shadow-lg hover:bg-blue-100 transition"
              style={{ boxShadow: "0 2px 12px 0 rgba(30,64,175,0.15)" }}
            >
              <IoIosClose className="w-8 h-8 text-blue-500" />
            </button>

            {/* Header */}
            <div className="p-8 pb-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mb-4 shadow-[0_2px_12px_0_rgba(59,130,246,0.10)]">
                <FaMagnifyingGlass className="text-2xl text-blue-500" />
              </div>
              <h2
                id="filter-title"
                className="text-2xl xl:text-3xl font-extrabold text-blue-600 text-center"
              >
                Filtry wyszukiwania projektów
              </h2>
              <p className="text-black mt-2 text-center text-base font-gotham font-light">
                Ustaw kryteria, a potem kliknij „Zastosuj”.
              </p>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <div className="grid gap-4">
                {/* Query */}
                <label className="flex flex-col gap-1">
                  <span className="font-semibold text-blue-700">Fraza</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="np. Marketing, Grafika... lub web+developer"
                    className={`border ${
                      queryError ? "border-red-400" : "border-blue-200"
                    } focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 bg-white transition-all duration-200 shadow-sm text-black font-gotham placeholder:font-light placeholder:italic`}
                  />
                  {queryError && (
                    <span className="text-red-500 text-sm mt-1">
                      {queryError}
                    </span>
                  )}
                  {/* Show info about similar queries if any */}
                  {(() => {
                    // If query contains "+", show all similar queries for each part, joined with " + "
                    if (query.trim().includes("+")) {
                      const parts = splitQueryPlus(query.trim());
                      const allSimilars = parts.map((part) => ({
                        part,
                        similars: getSimilarQueries(part).filter(
                          (q) =>
                            q.toLocaleLowerCase("pl") !==
                            part.toLocaleLowerCase("pl")
                        ),
                      }));
                      // Only show if at least one part has similars
                      if (
                        allSimilars.some(
                          (s) => s.similars && s.similars.length > 0
                        ) &&
                        !queryError
                      ) {
                        return (
                          <span className="text-blue-500 text-xs mt-1">
                            Uwzględnione także:{" "}
                            {allSimilars
                              .map((s) =>
                                s.similars.length > 0
                                  ? `${s.part} (${s.similars.join(", ")})`
                                  : s.part
                              )
                              .join(" + ")}
                          </span>
                        );
                      }
                      // If no similars, but multiple parts, show the split
                      if (parts.length > 1 && !queryError) {
                        return (
                          <span className="text-blue-500 text-xs mt-1">
                            Wyszukiwanie obejmuje dowolne z: {parts.join(", ")}
                          </span>
                        );
                      }
                      return null;
                    } else {
                      const similar = getSimilarQueries(query.trim());
                      if (
                        similar.length > 1 &&
                        query.trim().length > 0 &&
                        !queryError
                      ) {
                        return (
                          <span className="text-blue-500 text-xs mt-1">
                            Uwzględnione także:{" "}
                            {similar
                              .filter(
                                (q) =>
                                  q.toLocaleLowerCase("pl") !==
                                  query.trim().toLocaleLowerCase("pl")
                              )
                              .join(", ")}
                          </span>
                        );
                      }
                      return null;
                    }
                  })()}
                  {/* Show info if query contains "+" */}
                  {query.trim().includes("+") && !queryError && (
                    <span className="text-blue-600 text-xs mt-1">
                      <b>Uwaga:</b> Wpisanie np. <code>web+developer</code>{" "}
                      spowoduje wyszukiwanie projektów zawierających <b>web</b>{" "}
                      <i>lub</i> <b>developer</b>.
                    </span>
                  )}
                </label>

                {/* Type */}
                <label className="flex flex-col gap-1">
                  <span className="font-semibold text-blue-700">
                    Typ projektu
                  </span>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ProjectType)}
                    className="font-gotham font-light border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm"
                  >
                    <option value="any">Dowolny</option>
                    <option value="fixed">Projekt z ustaloną stawką</option>
                    <option value="hourly">Projekt godzinowy</option>
                  </select>
                </label>

                {/* Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-blue-700">
                      Budżet min
                    </span>
                    <input
                      value={budgetMin}
                      onChange={(e) =>
                        setBudgetMin(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      placeholder="np. 50"
                      inputMode="numeric"
                      className={`border ${
                        budgetError ? "border-red-400" : "border-blue-200"
                      } focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm`}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-blue-700">
                      Budżet max
                    </span>
                    <input
                      value={budgetMax}
                      onChange={(e) =>
                        setBudgetMax(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      placeholder="np. 500"
                      inputMode="numeric"
                      className={`border ${
                        budgetError ? "border-red-400" : "border-blue-200"
                      } focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm`}
                    />
                  </label>
                </div>
                {budgetError && (
                  <span className="text-red-500 text-sm -mt-2">
                    {budgetError}
                  </span>
                )}

                {/* Period */}
                <label className="flex flex-col gap-1">
                  <span className="font-semibold text-blue-700">Okres</span>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as Period)}
                    className="font-gotham font-light border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm"
                  >
                    <option value="24h">Ostatnie 24h</option>
                    <option value="7d">Ostatni tydzień</option>
                    <option value="30d">Ostatnie 30 dni</option>
                    <option value="all">Wszystkie</option>
                  </select>
                </label>

                {/* Sort */}
                <label className="flex flex-col gap-1">
                  <span className="font-semibold text-blue-700">
                    Sortowanie
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="font-gotham font-light border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm"
                  >
                    <option value="newest">Najnowsze</option>
                    <option value="oldest">Najstarsze</option>
                    <option value="budget_desc">Najwyższy budżet</option>
                    <option value="budget_asc">Najniższy budżet</option>
                  </select>
                </label>

                {/* Actions */}
                <div className="flex justify-between mt-2">
                  <button
                    onClick={reset}
                    className="py-2 px-6 bg-gray-200 hover:bg-gray-300 text-blue-700 rounded-lg font-bold shadow-md transition-all duration-200 text-lg"
                  >
                    Wyczyść
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="py-2 px-6 bg-white hover:bg-gray-100 text-blue-700 rounded-lg font-bold shadow-md transition-all duration-200 text-lg border border-blue-200"
                    >
                      Anuluj
                    </button>
                    <button
                      onClick={handleApply}
                      disabled={!!budgetError || !!queryError}
                      className={`py-2 px-6 rounded-lg font-bold shadow-md transition-all duration-200 text-lg ${
                        budgetError || queryError
                          ? "bg-gray-500 text-white cursor-not-allowed opacity-60"
                          : "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
                      }`}
                    >
                      Zastosuj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
};

export default JobsForm;
