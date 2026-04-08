"use client";
import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { pushLead } from "@/common/firebase";
import { usePhoneModal } from "@/common/context/PhoneModalContext";

// Define up to 6 categories
const CATEGORIES = [
  { value: "rozwój oprogramowania", label: "Rozwój oprogramowania" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "SEO" },
  { value: "design", label: "Design" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "wsparcie_it", label: "Wsparcie IT" },
];

// New selector for type of inquiry
const INQUIRY_TYPES = [
  { value: "wycena", label: "Wycena" },
  { value: "zlecenie", label: "Zlecenie" },
  { value: "oferta", label: "Oferta" },
];

// Optional: poziom zaawansowania
const LEVELS = [
  { value: "", label: "Wybierz poziom" },
  { value: "podstawowy", label: "Początkujący" },
  { value: "średni", label: "Średniozaawansowany" },
  { value: "zaawansowany", label: "Zaawansowany" },
];
function countDigits(s: string) {
  const m = s.match(/\d/g);
  return m ? m.length : 0;
}

function validateEmail(email: string) {
  const e = email.trim();

  // podstawowa struktura
  const parts = e.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain) return false;

  // długości wg praktyki
  if (local.length > 64 || e.length > 254) return false;

  // local-part: bez wiodącej/końcowej kropki i bez ".."
  if (local.startsWith(".") || local.endsWith(".") || local.includes(".."))
    return false;

  // domena: co najmniej 2 etykiety, bez pustych, bez wiodącego/końcowego "-"
  const labels = domain.split(".");
  if (labels.length < 2) return false;
  if (labels.some((l) => l.length === 0)) return false;
  if (labels.some((l) => !/^[A-Za-z0-9-]+$/.test(l))) return false;
  if (labels.some((l) => l.startsWith("-") || l.endsWith("-"))) return false;

  // TLD: tylko litery, min. 2, max. 63
  const tld = labels[labels.length - 1];
  if (!/^[A-Za-z]{2,63}$/.test(tld)) return false;

  return true;
}

function validatePhone(phone: string) {
  const p = phone.trim();
  if (!p) return true; // pole opcjonalne

  // dozwolone znaki
  if (!/^\+?[0-9\s\-().]+$/.test(p)) return false;

  const digits = countDigits(p);

  if (p.startsWith("+")) {
    // E.164: 9–15 cyfr (np. +48XXXXXXXXX)
    return digits >= 9 && digits <= 15;
  }

  // Bez prefixu kraju: wymagaj dokładnie 9 cyfr (typowe dla PL)
  return digits === 9;
}

export default function PhoneModal() {
  const { isOpen, close } = usePhoneModal();

  // Step state
  const [step, setStep] = useState(1);

  // Step 1
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0].value);
  const [category, setCategory] = useState(CATEGORIES[0].value);

  // Step 2
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");
  const [messageTouched, setMessageTouched] = useState(false);

  // Step 3
  const [accept, setAccept] = useState(false);
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [loading, setLoading] = useState(false);

  // Real-time validation state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  // Real-time validation effects
  useEffect(() => {
    if (emailTouched) {
      if (!email.trim()) {
        setEmailError("Email jest wymagany.");
      } else if (!validateEmail(email)) {
        setEmailError("Podaj poprawny adres email.");
      } else {
        setEmailError(null);
      }
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (phoneTouched) {
      if (phone.trim() && !validatePhone(phone)) {
        setPhoneError("Podaj poprawny numer telefonu.");
      } else {
        setPhoneError(null);
      }
    }
  }, [phone, phoneTouched]);

  useEffect(() => {
    if (nameTouched) {
      if (!name.trim()) {
        setNameError("Imię jest wymagane.");
      } else {
        setNameError(null);
      }
    }
  }, [name, nameTouched]);

  useEffect(() => {
    if (messageTouched) {
      if (!message.trim()) {
        setMessageError("Wiadomość jest wymagana.");
      } else {
        setMessageError(null);
      }
    }
  }, [message, messageTouched]);

  // Validation helpers
  function validateStep1() {
    return inquiryType && category;
  }
  function validateStep2() {
    return message.trim().length > 0;
  }
  function validateStep3() {
    let valid = true;
    if (!accept) {
      toast.error("Musisz zaakceptować warunki/regulamin.", {
        position: "bottom-right",
      });
      valid = false;
    }
    if (!name.trim()) {
      setNameTouched(true);
      setNameError("Imię jest wymagane.");
      toast.error("Imię jest wymagane.", { position: "bottom-right" });
      valid = false;
    }
    if (!email.trim()) {
      setEmailTouched(true);
      setEmailError("Email jest wymagany.");
      toast.error("Email jest wymagany.", { position: "bottom-right" });
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailTouched(true);
      setEmailError("Podaj poprawny adres email.");
      toast.error("Podaj poprawny adres email.", { position: "bottom-right" });
      valid = false;
    }
    if (phone.trim() && !validatePhone(phone)) {
      setPhoneTouched(true);
      setPhoneError("Podaj poprawny numer telefonu.");
      toast.error("Podaj poprawny numer telefonu.", {
        position: "bottom-right",
      });
      valid = false;
    }
    return valid;
  }

  async function submit() {
    // Validate email and phone before sending, show error and toast if invalid
    let hasError = false;

    // Email validation
    if (!email.trim()) {
      setEmailTouched(true);
      setEmailError("Email jest wymagany.");
      toast.error("Email jest wymagany.", { position: "bottom-right" });
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailTouched(true);
      setEmailError("Podaj poprawny adres email.");
      toast.error("Podaj poprawny adres email.", { position: "bottom-right" });
      hasError = true;
    }

    // Phone validation
    if (phone.trim() && !validatePhone(phone)) {
      setPhoneTouched(true);
      setPhoneError("Podaj poprawny numer telefonu.");
      toast.error("Podaj poprawny numer telefonu.", {
        position: "bottom-right",
      });
      hasError = true;
    }

    // Other validations
    if (!validateStep3()) {
      return;
    }

    // If email or phone error, do not proceed
    if (hasError) {
      return;
    }

    // Validate again before sending to database
    if (!validateEmail(email)) {
      setEmailTouched(true);
      setEmailError("Podaj poprawny adres email.");
      toast.error("Podaj poprawny adres email.", { position: "bottom-right" });
      return;
    }
    if (phone.trim() && !validatePhone(phone)) {
      setPhoneTouched(true);
      setPhoneError("Podaj poprawny numer telefonu.");
      toast.error("Podaj poprawny numer telefonu.", {
        position: "bottom-right",
      });
      return;
    }

    let toastId: React.ReactText | undefined;
    try {
      setLoading(true);
      toastId = toast.loading("Wysyłanie zlecenia...", {
        position: "bottom-right",
      });
      await pushLead({
        id: uuidv4(),
        inquiryType,
        category,
        level,
        message,
        name,
        email,
        phone,
        createdAt: Date.now(),
        type: "phone-multistep",
        accept,
      });
      toast.update(toastId, {
        render: "Zlecenie dodano pomyślnie.",
        type: "success",
        isLoading: false,
        autoClose: 4000,
        position: "bottom-right",
      });
      // Reset all fields
      setStep(1);
      setInquiryType(INQUIRY_TYPES[0].value);
      setCategory(CATEGORIES[0].value);
      setLevel("");
      setMessage("");
      setAccept(false);
      setName("");
      setEmail("");
      setPhone("");
      setMessageTouched(false);
      setNameTouched(false);
      setEmailTouched(false);
      setPhoneTouched(false);
      setEmailError(null);
      setPhoneError(null);
      close();
    } catch (e) {
      if (toastId) {
        toast.update(toastId, {
          render: "Błąd. Spróbuj ponownie.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          position: "bottom-right",
        });
      } else {
        toast.error("Błąd. Spróbuj ponownie.", { position: "bottom-right" });
      }
    } finally {
      setLoading(false);
    }
  }

  // Step navigation
  function handleNext() {
    if (step === 1 && !validateStep1()) {
      toast.error("Wypełnij wszystkie wymagane pola.", {
        position: "bottom-right",
      });
      return;
    }
    if (step === 2 && !validateStep2()) {
      setMessageTouched(true);
      toast.error("Wiadomość jest wymagana.", { position: "bottom-right" });
      return;
    }
    setStep((s) => s + 1);
  }
  function handleBack() {
    setStep((s) => s - 1);
  }

  // Stepper UI
  function renderStep() {
    if (step === 1) {
      return (
        <div className="w-full grid gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-blue-700">Rodzaj oferty</span>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="font-gotham font-light border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm"
            >
              {INQUIRY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-blue-700">Kategoria</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="font-gotham font-light border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-end mt-2">
            <button
              onClick={handleNext}
              className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold shadow-md transition-all duration-200 text-lg"
            >
              Dalej
            </button>
          </div>
        </div>
      );
    }
    if (step === 2) {
      const isMessageValid = message.trim().length > 0;
      return (
        <div className="w-full grid gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-blue-700">
              Poziom doświadczenia (opcjonalnie)
            </span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="font-gotham font-light border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-blue-700">
              Wiadomość <span className="text-red-500">*</span>
            </span>
            <textarea
              placeholder="Opisz swoje potrzeby..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageTouched(true);
              }}
              onBlur={() => setMessageTouched(true)}
              rows={4}
              className={`border ${
                messageTouched && !isMessageValid
                  ? "border-red-400"
                  : "border-blue-200"
              } focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm resize-none font-gotham placeholder:font-light`}
            />
            {messageTouched && !isMessageValid && (
              <span className="text-red-500 text-sm mt-1">
                Wiadomość jest wymagana.
              </span>
            )}
          </label>
          <div className="flex justify-between mt-2">
            <button
              onClick={handleBack}
              className="py-2 px-6 bg-gray-200 hover:bg-gray-300 text-blue-700 rounded-lg font-bold shadow-md transition-all duration-200 text-lg"
            >
              Wstecz
            </button>
            <button
              onClick={isMessageValid ? handleNext : undefined}
              disabled={!isMessageValid}
              className={`py-2 px-6 rounded-lg font-bold shadow-md transition-all duration-200 text-lg ${
                isMessageValid
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-500 text-white cursor-not-allowed"
              }`}
            >
              Dalej
            </button>
          </div>
        </div>
      );
    }
    if (step === 3) {
      const isNameValid = name.trim().length > 0;
      const isEmailValid = email.trim().length > 0 && validateEmail(email);
      const isPhoneValid = phone.trim().length === 0 || validatePhone(phone);
      const canSubmit =
        isNameValid && isEmailValid && isPhoneValid && accept && !loading;

      return (
        <div className="w-full grid gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
              className="accent-blue-500 w-5 h-5"
            />
            <span className="text-sm text-zinc-700">
              Akceptuję warunki zawarte w{" "}
              <a
                href="/regulamin"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                regulaminie
              </a>
              .
            </span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              placeholder="Imię (wymagane)"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameTouched(true);
              }}
              onBlur={() => setNameTouched(true)}
              className={`border ${
                nameTouched && !isNameValid
                  ? "border-red-400"
                  : "border-blue-200"
              } focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm placeholder:text-blue-400`}
            />
            {nameTouched && !isNameValid && (
              <span className="text-red-500 text-sm mt-1">
                Imię jest wymagane.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              placeholder="Email (wymagany)"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true);
              }}
              onBlur={() => setEmailTouched(true)}
              type="email"
              className={`border ${
                emailTouched && !isEmailValid
                  ? "border-red-400"
                  : "border-blue-200"
              } focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm placeholder:text-blue-400`}
            />
            {emailTouched && !isEmailValid && (
              <span className="text-red-500 text-sm mt-1">
                {emailError ? emailError : "Podaj poprawny adres email."}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              placeholder="Numer telefonu (opcjonalnie)"
              value={phone}
              maxLength={20}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneTouched(true);
              }}
              onBlur={() => setPhoneTouched(true)}
              type="tel"
              className={`border ${
                phoneTouched && !isPhoneValid
                  ? "border-red-400"
                  : "border-blue-200"
              } focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 text-zinc-800 bg-white/80 transition-all duration-200 shadow-sm placeholder:text-blue-400`}
            />
            {phoneTouched && !isPhoneValid && (
              <span className="text-red-500 text-sm mt-1">
                {phoneError ? phoneError : "Podaj poprawny numer telefonu."}
              </span>
            )}
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={handleBack}
              className="font-gotham font-light py-2 px-6 bg-gray-200 hover:bg-gray-300 text-blue-700 rounded-lg shadow-md transition-all duration-200 text-lg"
            >
              Wstecz
            </button>
            <button
              disabled={!canSubmit}
              onClick={canSubmit ? submit : undefined}
              className={`py-2 px-6 rounded-lg font-bold shadow-md transition-all duration-200 text-lg ${
                canSubmit
                  ? "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
                  : "bg-gray-500 text-white cursor-not-allowed opacity-60"
              }`}
            >
              {loading ? "Wysyłanie..." : "Wyślij"}
            </button>
          </div>
          {!accept && (
            <span className="text-red-500 text-sm mt-1">
              Musisz zaakceptować regulamin.
            </span>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <div
      className={`fixed left-0 top-0 w-full h-full z-[99999999999999] font-gotham ${
        isOpen ? "translate-x-0" : "-translate-x-[400vw]"
      }`}
    >
      <button
        onClick={close}
        style={{
          boxShadow: "0 2px 12px 0 rgba(30, 64, 175, 0.15)",
          border: "1.5px solid #3b82f6",
        }}
        className={`fixed z-[9999] bg-white bg-opacity-90 text-white text-4xl top-5 right-5 p-2 rounded-xl w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-blue-100 hover:scale-110 border border-blue-300 shadow-lg ${
          isOpen ? "translate-x-0 duration-[1000ms]" : "translate-x-[100vw]"
        }`}
      >
        <IoIosClose className="w-10 h-10 text-blue-500" />
      </button>
      <div
        onClick={close}
        className={`w-full h-full bg-black duration-500 ${
          isOpen ? "bg-opacity-80" : "bg-opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            isOpen ? "fixed -translate-y-0" : "-translate-y-[100vh]"
          } duration-500 delay-500 left-1/2 -translate-x-1/2 top-0 w-[90vw] max-w-[420px] h-auto bg-gradient-to-br from-blue-100 via-white to-blue-200 overflow-y-auto max-h-[90vh] rounded-3xl overflow-x-hidden p-0 shadow-[0_8px_40px_0_rgba(59,130,246,0.18),0_1.5px_8px_0_rgba(30,64,175,0.10)] border border-blue-200`}
          style={{
            boxShadow:
              "0 8px 40px 0 rgba(59,130,246,0.18), 0 1.5px 8px 0 rgba(30,64,175,0.10)",
            background:
              "linear-gradient(135deg, #bfdbfe 0%, #fff 60%, #dbeafe 100%)",
          }}
        >
          <div className="p-8 pb-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mb-4 shadow-[0_2px_12px_0_rgba(59,130,246,0.10)]">
              <svg
                width="36"
                height="36"
                fill="none"
                viewBox="0 0 24 24"
                className="text-blue-500"
              >
                <path
                  d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h2.086a2.25 2.25 0 0 1 2.12 1.553l.724 2.172a2.25 2.25 0 0 1-.516 2.32l-.98.98a12.042 12.042 0 0 0 5.657 5.657l.98-.98a2.25 2.25 0 0 1 2.32-.516l2.172.724A2.25 2.25 0 0 1 19.5 17.414V19.5a2.25 2.25 0 0 1-2.25 2.25h-.75C7.022 21.75 2.25 16.978 2.25 10.5v-.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl xl:text-3xl font-extrabold text-blue-600 text-center">
              {step === 1 && "Podaj szczegóły oferty"}
              {step === 2 && "Opisz swoje potrzeby"}
              {step === 3 && "Dane kontaktowe"}
            </h2>
            <p className="text-black mt-2 text-center text-base font-gotham font-light">
              {step === 1 && "Wybierz rodzaj oferty i kategorię."}
              {step === 2 &&
                "Podaj poziom zaawansowania (opcjonalnie) i wiadomość."}
              {step === 3 && "Podaj dane kontaktowe i zaakceptuj regulamin."}
            </p>
            <div className="mt-6 w-full">{renderStep()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
