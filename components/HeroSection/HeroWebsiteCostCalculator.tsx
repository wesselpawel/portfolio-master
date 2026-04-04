"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cityHubPricingData } from "@/data/cityHubPricing";

const WWW_TABLE = cityHubPricingData.tables.find((t) => t.id === "strony-www");
const SHOP_TABLE = cityHubPricingData.tables.find((t) => t.id === "sklepy");

const wwwQuote = WWW_TABLE?.quoteSpec;
const shopQuote = SHOP_TABLE?.quoteSpec;

const STEP_LABELS = ["Typ", "Wariant", "Dodatki i suma"] as const;

function formatPln(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
}

function packageOrder(
  spec: NonNullable<typeof wwwQuote>,
  tablePackages: { id: string; name: string }[],
): { id: string; name: string }[] {
  const ids = new Set(Object.keys(spec.packageBasePln));
  return tablePackages.filter((p) => ids.has(p.id));
}

function addonsForPackage(
  spec: NonNullable<typeof wwwQuote>,
  packageId: string,
) {
  return spec.addons.filter(
    (a) => !a.forPackages?.length || a.forPackages.includes(packageId),
  );
}

export default function HeroWebsiteCostCalculator() {
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<"www" | "sklep">("www");
  const spec = kind === "www" ? wwwQuote : shopQuote;
  const table = kind === "www" ? WWW_TABLE : SHOP_TABLE;

  const packages = useMemo(() => {
    if (!spec || !table) return [];
    return packageOrder(spec, table.packages);
  }, [spec, table]);

  const [packageId, setPackageId] = useState<string>(() => {
    if (wwwQuote && WWW_TABLE) {
      const ordered = packageOrder(wwwQuote, WWW_TABLE.packages);
      const withPrice = ordered.find(
        (p) => wwwQuote.packageBasePln[p.id] != null,
      );
      return withPrice?.id ?? ordered[0]?.id ?? "wizytowka";
    }
    return "wizytowka";
  });

  const [addonIds, setAddonIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!spec || !table) return;
    const ordered = packageOrder(spec, table.packages);
    const first = ordered[0]?.id;
    if (!first) return;
    setPackageId((current) =>
      ordered.some((p) => p.id === current) ? current : first,
    );
  }, [kind, spec, table]);

  useEffect(() => {
    if (!spec) return;
    setAddonIds((prev) => {
      const allowed = new Set(
        addonsForPackage(spec, packageId).map((a) => a.id),
      );
      const next = new Set<string>();
      prev.forEach((id) => {
        if (allowed.has(id)) next.add(id);
      });
      return next;
    });
  }, [kind, packageId, spec]);

  const basePln = spec ? spec.packageBasePln[packageId] : null;
  const addonList = spec ? addonsForPackage(spec, packageId) : [];

  const addonSum = useMemo(() => {
    if (!spec) return 0;
    return addonsForPackage(spec, packageId)
      .filter((a) => addonIds.has(a.id))
      .reduce((s, a) => s + a.pricePln, 0);
  }, [spec, packageId, addonIds]);

  const totalPln = basePln != null ? basePln + addonSum : null;

  function toggleAddon(id: string) {
    setAddonIds((prev) => {
      const next = new Set<string>();
      prev.forEach((x) => next.add(x));
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  if (!spec || !table || packages.length === 0) {
    return (
      <div className="mt-8 w-full max-w-md rounded-3xl border border-white/15 bg-black/30 p-4 text-center text-sm text-white/70 backdrop-blur-md">
        Brak danych cennika.{" "}
        <Link href="#darmowa-wycena" className="text-yellow-200 underline">
          Napisz — wycena
        </Link>
        .
      </div>
    );
  }

  return (
    <div
      className="mt-8 w-full max-w-[min(100%,26rem)] rounded-[24px] border border-white/15 bg-[linear-gradient(165deg,rgba(15,23,42,0.78),rgba(15,23,42,0.52))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:max-w-[min(100%,28rem)] lg:mt-0 lg:max-w-[min(100%,32rem)] 4xl:max-w-[min(100%,36rem)]"
      aria-labelledby="hero-kalkulator-naglowek"
    >
      <div className="flex items-center justify-between gap-2">
        <p
          id="hero-kalkulator-naglowek"
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-200/90"
        >
          Szacunkowy koszt
        </p>
        <span className="shrink-0 font-dosis text-[11px] text-white/45">
          {step + 1}/{STEP_LABELS.length} · {STEP_LABELS[step]}
        </span>
      </div>

      <div
        className="mt-2 flex gap-1"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={STEP_LABELS.length}
        aria-label="Postęp kalkulatora"
      >
        {STEP_LABELS.map((_, i) => (
          <div
            key={STEP_LABELS[i]}
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-yellow-300" : "bg-white/12"
            }`}
          />
        ))}
      </div>

      <div className="mt-3" aria-live="polite">
        {step === 0 ? (
          <>
            <p className="font-dosis text-xs leading-snug text-white/70">
              Kwoty jak w cenniku — w kilku krokach zobaczysz orientacyjną sumę.
            </p>
            <div
              className="mt-3 flex rounded-xl border border-white/10 bg-black/25 p-0.5"
              role="group"
              aria-label="Typ projektu"
            >
              <button
                type="button"
                onClick={() => setKind("www")}
                className={`flex-1 rounded-[10px] px-2 py-2 text-xs font-semibold transition sm:text-sm ${
                  kind === "www"
                    ? "bg-yellow-300 text-slate-950 shadow-sm"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                Strona WWW
              </button>
              <button
                type="button"
                onClick={() => setKind("sklep")}
                className={`flex-1 rounded-[10px] px-2 py-2 text-xs font-semibold transition sm:text-sm ${
                  kind === "sklep"
                    ? "bg-yellow-300 text-slate-950 shadow-sm"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                Sklep
              </button>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <fieldset className="m-0 border-0 p-0">
            <legend className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Wariant
            </legend>
            <div className="mt-1.5 flex max-h-[11rem] flex-col gap-1 overflow-y-auto overscroll-contain pr-0.5 sm:max-h-[12.5rem]">
              {packages.map((p) => {
                const base = spec.packageBasePln[p.id];
                const hint =
                  base == null
                    ? "Brief"
                    : formatPln(base).replace(/\s/g, "\u00a0");
                return (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-2.5 py-2 transition ${
                      packageId === p.id
                        ? "border-yellow-300/45 bg-yellow-300/[0.08]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/18"
                    }`}
                  >
                    <input
                      type="radio"
                      name="hero-pakiet"
                      value={p.id}
                      checked={packageId === p.id}
                      onChange={() => setPackageId(p.id)}
                      className="h-3.5 w-3.5 shrink-0 border-white/30 text-yellow-400 focus:ring-yellow-300/40"
                    />
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block font-sans text-xs font-semibold text-white sm:text-sm">
                        {p.name}
                      </span>
                      <span className="block font-dosis text-[10px] text-white/55 sm:text-xs">
                        {base == null ? "Wycena po briefie" : `Baza ${hint}`}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className="space-y-2">
            {addonList.length ? (
              <fieldset className="m-0 border-0 p-0">
                <legend className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Dodatki
                </legend>
                <div className="mt-1 max-h-[6.5rem] space-y-1 overflow-y-auto overscroll-contain pr-0.5 sm:max-h-[7.5rem]">
                  {addonList.map((a) => (
                    <label
                      key={a.id}
                      className={`flex cursor-pointer items-start gap-2 rounded-xl border px-2 py-1.5 transition ${
                        addonIds.has(a.id)
                          ? "border-yellow-300/35 bg-yellow-300/[0.06]"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={addonIds.has(a.id)}
                        onChange={() => toggleAddon(a.id)}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-white/30 text-yellow-400 focus:ring-yellow-300/40"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className="font-sans text-[11px] font-medium leading-tight text-white sm:text-xs">
                            {a.label}
                          </span>
                          <span className="shrink-0 font-dosis text-[11px] text-yellow-200/95 sm:text-xs">
                            +
                            {formatPln(a.pricePln).replace(/\s/g, "\u00a0")}
                          </span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            <div className="rounded-xl border border-yellow-300/22 bg-black/35 px-2.5 py-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Razem (orientacyjnie)
              </p>
              {totalPln != null ? (
                <p className="mt-0.5 font-sans text-xl font-extrabold leading-none text-yellow-300 sm:text-2xl">
                  {formatPln(totalPln)}
                </p>
              ) : (
                <div className="mt-0.5 space-y-0.5">
                  <p className="font-sans text-sm font-bold leading-tight text-white">
                    Wycena indywidualna
                  </p>
                  {addonSum > 0 ? (
                    <p className="font-dosis text-[10px] text-white/65 sm:text-xs">
                      Dodatki:{" "}
                      <span className="font-semibold text-yellow-200/90">
                        {formatPln(addonSum)}
                      </span>
                    </p>
                  ) : null}
                </div>
              )}
              <p className="mt-1.5 font-dosis text-[9px] leading-snug text-white/50 sm:text-[10px]">
                Nieoferta — zakres dopasowujemy po rozmowie.
              </p>
            </div>

            <Link
              href="#darmowa-wycena"
              className="flex w-full items-center justify-center rounded-xl bg-yellow-300 px-3 py-2.5 text-center text-xs font-bold text-slate-950 transition hover:brightness-105 sm:text-sm"
            >
              Wyślij brief — potwierdzę zakres
            </Link>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex gap-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className={`min-h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-white/90 transition hover:bg-white/[0.08] sm:text-sm ${
              step === STEP_LABELS.length - 1 ? "w-full" : "flex-1"
            }`}
          >
            Wstecz
          </button>
        ) : null}
        {step < STEP_LABELS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="min-h-10 flex-1 rounded-xl bg-yellow-300 px-3 text-xs font-bold text-slate-950 transition hover:brightness-105 sm:text-sm"
          >
            Dalej
          </button>
        ) : null}
      </div>
    </div>
  );
}
