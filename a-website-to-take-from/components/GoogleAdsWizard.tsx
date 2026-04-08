"use client";
import { useEffect, useState } from "react";
import {
  FaUserPlus,
  FaShoppingCart,
  FaChartLine,
  FaGoogle,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

type WizardProps = {
  onClose: () => void;
};

type Channel = "google" | "facebook" | "instagram";

export default function GoogleAdsWizard({ onClose }: WizardProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const stepCount = 4;
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [entering, setEntering] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const TRANSITION_MS = 300;
  const [showErrors, setShowErrors] = useState(false);
  const [form, setForm] = useState({
    channel: "google" as Channel,
    websiteUrl: "",
    businessName: "",
    goal: "leads",
    monthlyBudget: "1500",
    email: "",
    phone: "",
    // channel-specific
    facebookPageUrl: "",
    instagramHandle: "",
  });
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    setEntering(false);
    const id = requestAnimationFrame(() => setEntering(true));
    return () => cancelAnimationFrame(id);
  }, [step, direction]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const minBudget = form.channel === "google" ? 1500 : 800;
  const isValidURL = (value: string) => {
    if (!value) return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };
  const isValidEmail = (value: string) =>
    /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value || "");
  const isValidInstaHandle = (value: string) =>
    /^@?[A-Za-z0-9_.]{2,}$/.test(value || "");

  const isCurrentStepValid = () => {
    if (step === 1) {
      if (!isValidURL(form.websiteUrl)) return false;
      if (!form.businessName || form.businessName.trim().length < 2)
        return false;
      if (form.channel === "facebook" && !isValidURL(form.facebookPageUrl))
        return false;
      if (
        form.channel === "instagram" &&
        !isValidInstaHandle(form.instagramHandle)
      )
        return false;
      return true;
    }
    if (step === 2) {
      const budget = Number(form.monthlyBudget || 0);
      if (!form.goal) return false;
      if (!isFinite(budget) || budget < minBudget) return false;
      return true;
    }
    if (step === 3) {
      return isValidEmail(form.email);
    }
    return true;
  };

  const next = () => {
    setDirection("forward");
    setPreviousStep(step);
    if (!isCurrentStepValid()) {
      setShowErrors(true);
      setIsTransitioning(false);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(s + 1, stepCount - 1));
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
  };
  const back = () => {
    setDirection("backward");
    setPreviousStep(step);
    setStep((s) => Math.max(s - 1, 0));
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
  };

  async function startStripeCheckout() {
    try {
      setSubmitting(true);
      const budgetNumber = Number(form.monthlyBudget || 0);
      const res = await fetch("/stripe/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          // Use budget as price input for demo purposes (PLN)
          totalPricePLN: isFinite(budgetNumber) ? Math.max(0, budgetNumber) : 0,
          successRedirect: `${process.env.NEXT_PUBLIC_URL ?? ""}/success`,
          meta: {
            channel: form.channel,
            websiteUrl: form.websiteUrl,
            businessName: form.businessName,
            goal: form.goal,
            phone: form.phone,
            facebookPageUrl: form.facebookPageUrl,
            instagramHandle: form.instagramHandle,
          },
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setSubmitting(false);
      }
    } catch (e) {
      setSubmitting(false);
    }
  }

  const renderStep = (active: number) => (
    <>
      {active === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-800 mb-3">
              Wybierz kanał promocji
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setForm({ ...form, channel: "google" })}
                className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border ${
                  form.channel === "google"
                    ? "border-blue-500 bg-blue-50"
                    : "border-zinc-200 hover:border-blue-500 hover:bg-blue-50"
                } transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <FaGoogle className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Google Ads</span>
              </button>
              <button
                onClick={() => setForm({ ...form, channel: "facebook" })}
                className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border ${
                  form.channel === "facebook"
                    ? "border-blue-500 bg-blue-50"
                    : "border-zinc-200 hover:border-blue-500 hover:bg-blue-50"
                } transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <FaFacebook className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Facebook Ads</span>
              </button>
              <button
                onClick={() => setForm({ ...form, channel: "instagram" })}
                className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border ${
                  form.channel === "instagram"
                    ? "border-blue-500 bg-blue-50"
                    : "border-zinc-200 hover:border-blue-500 hover:bg-blue-50"
                } transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <FaInstagram className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Instagram Ads</span>
              </button>
            </div>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
              {form.channel === "facebook" && (
                <div>
                  Facebook Ads: od 800zł/pierwszy miesiąc i kampanie testowe
                </div>
              )}
              {form.channel === "instagram" && (
                <div>
                  Instagram Ads: od 800zł/pierwszy miesiąc i kampanie testowe
                </div>
              )}
              {form.channel === "google" && (
                <div>Google Ads: pełna kampania od 1500zł</div>
              )}
            </div>
          </div>
        </div>
      )}

      {active === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-800 mb-1">
              Adres strony WWW (https://)
            </label>
            <input
              type="url"
              value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              placeholder="https://twoja-domena.pl"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-800 mb-1">
              Nazwa firmy / marki
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) =>
                setForm({ ...form, businessName: e.target.value })
              }
              placeholder="Nazwa firmy"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          {form.channel === "facebook" && (
            <div>
              <label className="block text-sm font-medium text-zinc-800 mb-1">
                Adres strony na Facebooku (https://)
              </label>
              <input
                type="url"
                value={form.facebookPageUrl}
                onChange={(e) =>
                  setForm({ ...form, facebookPageUrl: e.target.value })
                }
                placeholder="https://facebook.com/twoja-strona"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          )}
          {form.channel === "instagram" && (
            <div>
              <label className="block text-sm font-medium text-zinc-800 mb-1">
                Nazwa profilu na Instagramie
              </label>
              <input
                type="text"
                value={form.instagramHandle}
                onChange={(e) =>
                  setForm({ ...form, instagramHandle: e.target.value })
                }
                placeholder="@twojprofil"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          )}
        </div>
      )}

      {active === 2 && (
        <>
          <div>
            <label className="block text-sm font-medium text-zinc-800 mb-3">
              Cel kampanii
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setForm({ ...form, goal: "leads" })}
                className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  form.goal === "leads"
                    ? "border-blue-500 bg-blue-50"
                    : "border-zinc-200 hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                <FaUserPlus className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Pozyskiwanie leadów</span>
              </button>
              <button
                onClick={() => setForm({ ...form, goal: "sales" })}
                className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  form.goal === "sales"
                    ? "border-blue-500 bg-blue-50"
                    : "border-zinc-200 hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                <FaShoppingCart className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Sprzedaż</span>
              </button>
              <button
                onClick={() => setForm({ ...form, goal: "traffic" })}
                className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  form.goal === "traffic"
                    ? "border-blue-500 bg-blue-50"
                    : "border-zinc-200 hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                <FaChartLine className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Ruch na stronę</span>
              </button>
            </div>
          </div>
          <div>
            <label className="mt-6 block text-sm font-medium text-zinc-800 mb-1">
              Miesięczny budżet (PLN)
            </label>
            <input
              type="number"
              min="800"
              step="50"
              value={form.monthlyBudget}
              onChange={(e) =>
                setForm({ ...form, monthlyBudget: e.target.value })
              }
              placeholder="1500zł"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </>
      )}

      {active === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-800 mb-1">
              Email kontaktowy
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="twoj@email.com"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-800 mb-1">
              Telefon (opcjonalnie)
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+48 123 456 789"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-zinc-800">
            <div className="font-semibold mb-2 text-blue-900">Podsumowanie</div>
            <div className="mb-2">
              {form.channel === "facebook" && (
                <div className="text-zinc-800">
                  Facebook Ads: od 800zł/pierwszy miesiąc i kampanie testowe
                </div>
              )}
              {form.channel === "instagram" && (
                <div className="text-zinc-800">
                  Instagram Ads: od 800zł/pierwszy miesiąc i kampanie testowe
                </div>
              )}
              {form.channel === "google" && (
                <div className="text-zinc-800">
                  Google Ads: pełna kampania od 1500zł
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              <div>
                <span className="font-medium">Kanał:</span> {form.channel}
              </div>
              <div>
                <span className="font-medium">Cel:</span>{" "}
                <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium">
                  {form.goal}
                </span>
              </div>
              <div>
                <span className="font-medium">Strona:</span>{" "}
                {form.websiteUrl || "—"}
              </div>
              <div>
                <span className="font-medium">Firma:</span>{" "}
                {form.businessName || "—"}
              </div>
              <div>
                <span className="font-medium">Budżet:</span>{" "}
                {form.monthlyBudget || 0} PLN/mies.
              </div>
              {form.channel === "facebook" && (
                <div>
                  <span className="font-medium">Facebook:</span>{" "}
                  {form.facebookPageUrl || "—"}
                </div>
              )}
              {form.channel === "instagram" && (
                <div>
                  <span className="font-medium">Instagram:</span>{" "}
                  {form.instagramHandle || "—"}
                </div>
              )}
              <div>
                <span className="font-medium">Email:</span> {form.email || "—"}
              </div>
              <div>
                <span className="font-medium">Telefon:</span>{" "}
                {form.phone || "—"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div
      onClick={onClose}
      className="font-sans fixed inset-0 z-[2100] bg-black/60 flex items-center justify-center p-4 transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden transform transition-all duration-300 ease-out ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        <div className="relative">
          <div className="absolute -inset-x-1 -top-1 h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 animate-pulse" />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-zinc-900 text-xl sm:text-2xl font-bold">
              Konfiguracja kampanii reklamowej
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-700 rounded-lg px-3 py-1 transition-transform duration-200 hover:-rotate-3"
              aria-label="Zamknij"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    step >= i ? "bg-blue-500" : "bg-zinc-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="relative min-h-[260px]">
            <div
              key={`current-${step}`}
              className="transition-all duration-300 opacity-100 translate-x-0"
            >
              {renderStep(step)}
            </div>
            {isTransitioning && (
              <div
                key={`prev-${previousStep}`}
                className={`absolute inset-0 transition-all duration-300 pointer-events-none ${
                  direction === "forward"
                    ? "opacity-0 -translate-x-4"
                    : "opacity-0 translate-x-4"
                }`}
              >
                {renderStep(previousStep)}
              </div>
            )}
          </div>
          {/* Inline validation errors */}
          {showErrors && (
            <div className="mt-3 text-xs text-red-600">
              {step === 1 && (
                <>
                  {!isValidURL(form.websiteUrl) && (
                    <div>
                      Podaj prawidłowy adres strony WWW (powinien zaczynać się
                      od https://).
                    </div>
                  )}
                  {(!form.businessName ||
                    form.businessName.trim().length < 2) && (
                    <div>Podaj nazwę firmy.</div>
                  )}
                  {form.channel === "facebook" &&
                    !isValidURL(form.facebookPageUrl) && (
                      <div>
                        Podaj prawidłowy adres strony na Facebooku (powinien
                        zaczynać się od https://).
                      </div>
                    )}
                  {form.channel === "instagram" &&
                    !isValidInstaHandle(form.instagramHandle) && (
                      <div>Podaj prawidłową nazwę profilu na Instagramie.</div>
                    )}
                </>
              )}
              {step === 2 && (
                <>
                  {!form.goal && <div>Wybierz cel kampanii.</div>}
                  {Number(form.monthlyBudget || 0) < minBudget && (
                    <div>
                      Minimalny budżet dla wybranego kanału to {minBudget} PLN.
                    </div>
                  )}
                </>
              )}
              {step === 3 && !isValidEmail(form.email) && (
                <div>Podaj prawidłowy adres e-mail.</div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
            <div className="flex gap-3">
              <button
                onClick={back}
                disabled={step === 0}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Wstecz
              </button>
              {step < stepCount - 1 && (
                <button
                  onClick={next}
                  className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Dalej
                </button>
              )}
            </div>
            {step === stepCount - 1 && (
              <button
                onClick={startStripeCheckout}
                disabled={submitting || !form.email}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Przekierowuję do Stripe…"
                  : "Przejdź do płatności"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
