"use client";

import React, { useMemo, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import donutImage from "@/public/ponczek.png";
import Image from "next/image";
import type { LandingPageFormContent } from "@/data/landingPages";
type FormStatus = "idle" | "sending" | "success" | "error";

type WebsiteOrderFormProps = {
  content: LandingPageFormContent;
};

export default function WebsiteOrderForm({ content }: WebsiteOrderFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const t = useMemo(
    () => ({
      title: content.title,
      subtitle: content.subtitle,
      namePlaceholder: "Imię i nazwisko",
      phoneNumberPlaceholder: "Numer telefonu",
      requirementsPlaceholder: content.requirementsPlaceholder,
      send: content.sendLabel,
      sending: "Wysyłanie…",
      success: content.successMessage,
      errorGeneric: "Coś poszło nie tak. Spróbuj ponownie.",
      errorMissing: "Uzupełnij wszystkie pola.",
      errorInvalidPhoneNumber:
        "Podaj poprawny 9-cyfrowy numer telefonu (np. 721 417 154).",
      phoneHint: "Może być wpisany z przerwami/spacjami.",
    }),
    [content],
  );

  /** Normalize to 9 digits: strip non-digits, optionally remove leading 48 (Polish country code). */
  const normalizePhoneNumber = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("48")) return digits.slice(2);
    return digits;
  };

  const isValidPhoneNumber = (raw: string): boolean => {
    const normalized = normalizePhoneNumber(raw);
    return /^[0-9]{9}$/.test(normalized);
  };

  const phoneTouched = phoneValue.length > 0;
  const phoneValid = isValidPhoneNumber(phoneValue);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setStatusMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const rawPhone = String(formData.get("phoneNumber") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim(); // honeypot

    if (!name || !rawPhone || !message) {
      setStatus("error");
      setStatusMessage(t.errorMissing);
      return;
    }
    if (!isValidPhoneNumber(rawPhone)) {
      setStatus("error");
      setStatusMessage(t.errorInvalidPhoneNumber);
      return;
    }

    const phoneNumber = normalizePhoneNumber(rawPhone);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber, message, website }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus("success");
        setStatusMessage(t.success);
        form.reset();
        setPhoneValue("");
        return;
      }

      setStatus("error");
      setStatusMessage(data?.message || t.errorGeneric);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMessage(t.errorGeneric);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[520px] border-t-2 border-yellow-300 rounded-3xl relative">
        <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-4 lg:p-5">
          <h2 className="text-nowrap w-max text-xl lg:text-2xl font-bold text-white">
            {t.title}
          </h2>
          <p className="mt-3 text-sm text-white/80">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white" htmlFor="order-name">
                {t.namePlaceholder}
              </label>
              <input
                id="order-name"
                name="name"
                type="text"
                placeholder={t.namePlaceholder}
                autoComplete="name"
                required
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-base text-black outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white" htmlFor="order-phone">
                {t.phoneNumberPlaceholder}
              </label>
              <input
                id="order-phone"
                name="phoneNumber"
                type="tel"
                value={phoneValue}
                onChange={(e) => setPhoneValue(e.target.value)}
                placeholder={t.phoneNumberPlaceholder}
                autoComplete="tel"
                required
                inputMode="numeric"
                aria-invalid={phoneTouched && !phoneValid}
                aria-describedby={phoneTouched ? "order-phone-hint" : undefined}
                className={`w-full rounded-lg border bg-white px-3 py-2 text-base text-black outline-none focus:ring-2 ${
                  !phoneTouched
                    ? "border-black/15 focus:border-black/40 focus:ring-black/10"
                    : phoneValid
                      ? "border-green-500/60 focus:border-green-500 focus:ring-green-500/20"
                      : "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                }`}
              />
              <span
                id="order-phone-hint"
                className={phoneTouched ? "text-xs text-white/60" : "hidden"}
              >
                {t.phoneHint}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white" htmlFor="order-message">
                Wymagania / projekt
              </label>
              <textarea
                id="order-message"
                name="message"
                placeholder={t.requirementsPlaceholder}
                required
                rows={5}
                className="w-full resize-y rounded-lg border border-black/15 bg-white px-3 py-2 text-base text-black outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10 md:min-h-[8.5rem]"
              />
            </div>

            {/* Honeypot (bots tend to fill this). */}
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-base font-medium text-white shadow-[0_0_12px_rgba(253,224,71,0.35)] transition-all duration-200 hover:shadow-[0_0_20px_rgba(253,224,71,0.5)] hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100 disabled:hover:shadow-[0_0_12px_rgba(253,224,71,0.35)]"
            >
              <FaPaperPlane className="h-5 w-5" />
              <span>{status === "sending" ? t.sending : t.send}</span>
            </button>

            {statusMessage ? (
              <p
                className={
                  status === "success"
                    ? "text-sm text-green-700"
                    : "text-sm text-red-600"
                }
                role={status === "error" ? "alert" : "status"}
              >
                {statusMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
