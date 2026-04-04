"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cityHubPricingData } from "@/data/cityHubPricing";
import type {
  HubPricingTable,
  HubQuoteAddon,
  HubQuoteSpec,
} from "@/data/cityHubPricing";
import { getServiceHref } from "@/data/landingPages";

type CityHubQuoteConfiguratorProps = {
  citySlug: string;
  cityName: string;
};

function formatPln(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
}

function addonAppliesToPackage(
  addon: HubQuoteAddon,
  packageId: string,
): boolean {
  if (!addon.forPackages?.length) return true;
  return addon.forPackages.includes(packageId);
}

export default function CityHubQuoteConfigurator({
  citySlug,
  cityName,
}: CityHubQuoteConfiguratorProps) {
  const tables = useMemo(
    () =>
      cityHubPricingData.tables.filter(
        (t): t is HubPricingTable & { quoteSpec: HubQuoteSpec } =>
          Boolean(t.quoteSpec),
      ),
    [],
  );

  const [tableIndex, setTableIndex] = useState(0);
  const table = tables[tableIndex];
  const spec = table?.quoteSpec;

  const [packageId, setPackageId] = useState(
    () => tables[0]?.packages[0]?.id ?? "",
  );
  const [addonIds, setAddonIds] = useState<Set<string>>(() => new Set());
  const [showEstimate, setShowEstimate] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = tables[tableIndex];
    const first = t?.packages[0]?.id ?? "";
    setPackageId(first);
    setAddonIds(new Set());
    setShowEstimate(false);
  }, [tableIndex, tables]);

  useEffect(() => {
    if (!spec) return;
    setAddonIds((prev) => {
      const next = new Set<string>();
      for (const id of Array.from(prev)) {
        const addon = spec.addons.find((a) => a.id === id);
        if (addon && addonAppliesToPackage(addon, packageId)) {
          next.add(id);
        }
      }
      return next;
    });
  }, [packageId, spec]);

  const visibleAddons = useMemo(() => {
    if (!spec) return [];
    return spec.addons.filter((a) => addonAppliesToPackage(a, packageId));
  }, [spec, packageId]);

  const selectedPkg = table?.packages.find((p) => p.id === packageId);
  const basePln = spec ? (spec.packageBasePln[packageId] ?? null) : null;

  const addonsTotal = useMemo(() => {
    if (!spec) return 0;
    let sum = 0;
    for (const id of Array.from(addonIds)) {
      const a = spec.addons.find((x) => x.id === id);
      if (a) sum += a.pricePln;
    }
    return sum;
  }, [spec, addonIds]);

  const hasNumericBase = basePln !== null && basePln !== undefined;
  const grandTotal =
    hasNumericBase && typeof basePln === "number"
      ? basePln + addonsTotal
      : null;

  const buildSummaryText = useCallback(() => {
    if (!table || !spec || !selectedPkg) return "";
    const lines: string[] = [
      `Konfiguracja wyceny — ${cityName}`,
      `Typ: ${table.title}`,
      `Pakiet: ${selectedPkg.name}`,
    ];
    if (hasNumericBase && typeof basePln === "number") {
      lines.push(`Baza: ${formatPln(basePln)}`);
    } else {
      lines.push("Baza projektu: wycena indywidualna (po briefie)");
    }
    if (addonIds.size) {
      lines.push("Opcje dodatkowe:");
      for (const id of Array.from(addonIds)) {
        const a = spec.addons.find((x) => x.id === id);
        if (a) lines.push(`- ${a.label}: ${formatPln(a.pricePln)}`);
      }
    }
    if (grandTotal !== null) {
      lines.push(`Suma orientacyjna: ${formatPln(grandTotal)}`);
    } else if (addonsTotal > 0) {
      lines.push(`Szacunek opcji: ${formatPln(addonsTotal)} (+ baza po rozmowie)`);
    }
    lines.push(
      "",
      "Uwaga: to szacunek z konfiguratora — ostateczna wycena po rozmowie i briefie.",
    );
    return lines.join("\n");
  }, [
    table,
    spec,
    selectedPkg,
    cityName,
    hasNumericBase,
    basePln,
    addonIds,
    grandTotal,
    addonsTotal,
  ]);

  const toggleAddon = (id: string) => {
    setAddonIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setShowEstimate(false);
    setCopied(false);
  };

  const handleShowEstimate = () => {
    setShowEstimate(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    const text = buildSummaryText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (!tables.length || !table || !spec) {
    return null;
  }

  return (
    <div
      id="konfigurator-wyceny"
      className="scroll-mt-28 rounded-[28px] border border-yellow-300/25 bg-[linear-gradient(180deg,rgba(253,224,71,0.08),rgba(15,23,42,0.5))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/90">
        Konfigurator
      </p>
      <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
        Ułóż zakres i zobacz orientacyjną wycenę
      </h2>
      

      {tables.length > 1 ? (
        <div
          className="mt-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Typ projektu"
        >
          {tables.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === tableIndex}
              onClick={() => {
                setTableIndex(i);
                setShowEstimate(false);
                setCopied(false);
              }}
              className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition ${
                i === tableIndex
                  ? "border-yellow-300/60 bg-yellow-300/15 text-yellow-100"
                  : "border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {t.id === "strony-www" ? "Strony WWW" : t.id === "sklepy" ? "Sklep internetowy" : t.title}
            </button>
          ))}
        </div>
      ) : null}

      <fieldset className="mt-8 border-0 p-0">
        <legend className="text-sm font-semibold text-white/90">
          Pakiet bazowy
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {table.packages.map((pkg) => {
            const base = spec.packageBasePln[pkg.id];
            const selected = pkg.id === packageId;
            return (
              <label
                key={pkg.id}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  selected
                    ? "border-yellow-300/55 bg-yellow-300/10 ring-1 ring-yellow-300/30"
                    : "border-white/10 bg-black/20 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="hub-quote-package"
                  value={pkg.id}
                  checked={selected}
                  onChange={() => {
                    setPackageId(pkg.id);
                    setShowEstimate(false);
                    setCopied(false);
                  }}
                  className="sr-only"
                />
                <p className="font-bold text-white">{pkg.name}</p>
                <p className="mt-1 text-sm font-semibold text-yellow-300">
                  {pkg.priceFrom}
                </p>
                <p className="mt-1 font-dosis text-xs text-white/55">
                  {typeof base === "number"
                    ? `W kalkulatorze: ${formatPln(base)}`
                    : "Baza: po rozmowie"}
                </p>
              </label>
            );
          })}
        </div>
      </fieldset>

      {visibleAddons.length ? (
        <fieldset className="mt-8 border-0 p-0">
          <legend className="text-sm font-semibold text-white/90">
            Opcje dodatkowe
          </legend>
          <ul className="mt-3 space-y-2">
            {visibleAddons.map((addon) => {
              const on = addonIds.has(addon.id);
              return (
                <li key={addon.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-3 transition hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleAddon(addon.id)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-slate-900 text-yellow-400 focus:ring-yellow-400/40"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="font-medium text-white">
                        {addon.label}
                      </span>
                      <span className="ml-2 text-sm font-semibold text-yellow-200/90">
                        + {formatPln(addon.pricePln)}
                      </span>
                      {addon.description ? (
                        <span className="mt-0.5 block font-dosis text-xs text-white/50">
                          {addon.description}
                        </span>
                      ) : null}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ) : (
        <p className="mt-6 font-dosis text-sm text-white/50">
          Brak dodatkowych opcji dla tego pakietu w pliku konfiguracji.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleShowEstimate}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-yellow-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(253,224,71,0.25)] transition hover:brightness-105"
        >
          Zobacz wycenę
        </button>
        {selectedPkg ? (
          <Link
            href={getServiceHref(selectedPkg.serviceKey, citySlug)}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Strona usługi
          </Link>
        ) : null}
      </div>

      {showEstimate ? (
        <div
          className="mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5 sm:p-6"
          role="region"
          aria-live="polite"
          aria-label="Podsumowanie wyceny"
        >
          <h3 className="text-lg font-bold text-white">Twoje podsumowanie</h3>
          <ul className="mt-4 space-y-2 font-dosis text-sm text-white/85">
            <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span>Miasto / hub</span>
              <span className="text-right font-medium text-white">
                {cityName}
              </span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span>Typ</span>
              <span className="text-right text-white">{table.title}</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span>Pakiet</span>
              <span className="text-right text-white">{selectedPkg?.name}</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span>Baza projektu</span>
              <span className="text-right text-white">
                {hasNumericBase && typeof basePln === "number"
                  ? formatPln(basePln)
                  : "Wycena indywidualna"}
              </span>
            </li>
            {[...Array.from(addonIds)].map((id) => {
              const a = spec.addons.find((x) => x.id === id);
              if (!a) return null;
              return (
                <li
                  key={id}
                  className="flex justify-between gap-4 border-b border-white/5 pb-2"
                >
                  <span>{a.label}</span>
                  <span className="text-right text-yellow-100/90">
                    + {formatPln(a.pricePln)}
                  </span>
                </li>
              );
            })}
            <li className="flex justify-between gap-4 pt-2 text-base font-bold text-white">
              <span>
                {grandTotal !== null
                  ? "Razem (orientacyjnie)"
                  : "Opcje + baza po rozmowie"}
              </span>
              <span className="text-right text-yellow-300">
                {grandTotal !== null
                  ? formatPln(grandTotal)
                  : addonsTotal > 0
                    ? `${formatPln(addonsTotal)} + baza`
                    : "—"}
              </span>
            </li>
          </ul>
          <p className="mt-4 font-dosis text-xs leading-relaxed text-white/50">
            To nie jest oferta wiążąca — końcowa cena zależy od briefu, treści i
            integracji. Po przesłaniu tego opisu w formularzu szybciej przygotuję
            dokładną propozycję.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {copied ? "Skopiowano" : "Skopiuj podsumowanie"}
            </button>
            <a
              href="#darmowa-wycena"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-105"
            >
              Przejdź do formularza
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
