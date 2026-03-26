"use client";

import Link from "next/link";
import { FaEnvelope, FaPaperPlane, FaPhone } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import donutImage from "@/public/assets/donuts.png";
import type { LandingPageContactContent } from "@/data/landingPages";

type ContactSectionProps = {
  content: LandingPageContactContent;
};

export default function ContactSection({ content }: ContactSectionProps) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const t = {
    namePlaceholder: "Imię",
    phoneNumberPlaceholder: "Numer telefonu",
    messagePlaceholder: "Wiadomość",
    send: "Wyślij wiadomość",
    sending: "Wysyłanie…",
    success: "Dzięki! Wiadomość została wysłana.",
    errorGeneric: "Coś poszło nie tak. Spróbuj ponownie.",
    errorMissing: "Uzupełnij wszystkie pola.",
    errorInvalidPhoneNumber:
      "Podaj poprawny 9-cyfrowy numer telefonu (np. 721 417 154).",
  };

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

  const phoneDigitCount = normalizePhoneNumber(phoneValue).length;
  const phoneValid = isValidPhoneNumber(phoneValue);
  const phoneTouched = phoneValue.length > 0;

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

    const response = await saveToFirestore(name, phoneNumber, message, website);
    if (response.success) {
      setStatus("success");
      setStatusMessage(t.success);
      form.reset();
      setPhoneValue("");
    } else {
      setStatus("error");
      setStatusMessage(response.message || t.errorGeneric);
    }
  };

  const saveToFirestore = async (
    name: string,
    phoneNumber: string,
    message: string,
    website: string,
  ) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNumber, message, website }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) return { success: true, message: "" };
      return {
        success: false,
        message: data?.message || t.errorGeneric,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: t.errorGeneric };
    }
  };
  return (
    <div id="contact" className="w-full flex items-center justify-center">
      <div className="rounded-t-2xl font-dosis lg:mx-12 w-full lg:max-w-[1024px] bg-black/75 pt-0 border-t-2 border-yellow-300 pb-36 lg:pb-12 text-xl flex flex-col items-center justify-center z-[600] relative">
        <div className="font-cocosharp rounded-t-2xl bg-slate-800 w-full p-4 lg:p-6">
          <h2 className="text-2xl font-bold text-yellow-300">
            {content.title}
          </h2>
          <p className="text-sm text-white">
            {content.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-stretch">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white" htmlFor="contact-name">
                    {t.namePlaceholder}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder={t.namePlaceholder}
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-base text-black outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white" htmlFor="contact-phone">
                    {t.phoneNumberPlaceholder}
                  </label>
                  <input
                    id="contact-phone"
                    name="phoneNumber"
                    type="tel"
                    value={phoneValue}
                    onChange={(e) => setPhoneValue(e.target.value)}
                    placeholder={t.phoneNumberPlaceholder}
                    autoComplete="tel"
                    required
                    inputMode="numeric"
                    aria-invalid={phoneTouched && !phoneValid}
                    aria-describedby={
                      phoneTouched ? "contact-phone-hint" : undefined
                    }
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-base text-black outline-none focus:ring-2 ${
                      !phoneTouched
                        ? "border-black/15 focus:border-black/40 focus:ring-black/10"
                        : phoneValid
                          ? "border-green-500/60 focus:border-green-500 focus:ring-green-500/20"
                          : "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                    }`}
                  />
                </div>
              </div>

              <div className="flex h-full flex-col gap-2">
                <label className="text-sm text-white" htmlFor="contact-message">
                  {t.messagePlaceholder}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder={t.messagePlaceholder}
                  required
                  rows={6}
                  className="w-full flex-1 resize-y rounded-lg border border-black/15 bg-white px-3 py-2 text-base text-black outline-none focus:border-black/40 focus:ring-2 focus:ring-black/10 md:min-h-[8.5rem]"
                />
              </div>
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-base font-medium text-white shadow-[0_0_12px_rgba(253,224,71,0.35)] transition-all duration-200 hover:shadow-[0_0_20px_rgba(253,224,71,0.5)] hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100 disabled:hover:shadow-[0_0_12px_rgba(253,224,71,0.35)] md:w-max"
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
        <div className="mt-12 flex items-center justify-center rounded-b-xl">
          <Image
            src={donutImage}
            alt={content.imageAlt}
            width={1024}
            height={1024}
            className="px-4 lg:px-0 sm:max-w-[500px] max-w-[90%]"
          />
        </div>
        <div className="h-max px-4 mt-12 flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="font-light text-white/60">wesselpawel.com </span>
            <span className="font-light text-white/60">2026</span>
          </div>
          <div className="mt-4 flex flex-col w-full items-end justify-end text-white/60">
            <Link title="Call me" href="tel:+48721417154">
              +48 721 417 154
            </Link>
            <Link title="Send me an email" href="mailto:wesiudev@gmail.com">
              <FaEnvelope className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
