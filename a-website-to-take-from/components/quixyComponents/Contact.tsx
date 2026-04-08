"use client";
import Link from "next/link";
import Image from "next/image";
import { pushLead } from "@/common/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa6";
import { randId } from "@/common/utils/getRandomId";

export default function Contact({
  isLandingPage,
}: {
  isLandingPage?: boolean;
}) {
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  return (
    <div
      className={`flex flex-col  ${
        !isLandingPage &&
        "pt-[65px] lg:pt-[94px] min-h-screen bg-gradient-to-br from-bgStart to-bgEnd"
      }`}
    >
      <div className="flex-grow">
        {/* Breadcrumbs and Title */}
        <div
          className={`w-full ${
            !isLandingPage && "bg-white shadow-sm border-b border-zinc-200"
          } `}
        >
          <div className={`${!isLandingPage && "container"} mx-auto px-4 py-6`}>
            {!isLandingPage && (
              <nav className="flex items-center text-sm breadcrumbs !text-zinc-700">
                <ul className="pt-8 flex items-center flex-wrap gap-2">
                  <li>
                    <Link
                      href="/"
                      title="Strony Internetowe WWW z Cennikiem"
                      className="hover:underline font-semibold"
                    >
                      Strona główna
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/contact"
                      title="kontakt"
                      className="hover:underline font-semibold"
                    >
                      Kontakt
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
            <span
              className={`mt-4 text-3xl md:text-4xl font-extrabold tracking-tight ${
                isLandingPage ? "text-white" : "text-zinc-800"
              }`}
            >
              Skontaktuj się z nami!
            </span>
            <p
              className={`mt-2 max-w-2xl ${
                isLandingPage ? "text-white" : "text-zinc-600"
              }`}
            >
              Masz pytania lub chcesz omówić swój projekt? Wypełnij formularz
              lub skorzystaj z danych kontaktowych poniżej.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className={`${!isLandingPage && "py-12 container"} mx-auto`}>
          <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-center">
            {/* Contact Info */}
            <div className="w-full flex flex-col items-center lg:items-start bg-white rounded-2xl shadow-lg p-8 border border-zinc-100">
              <h3 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
                <span className="inline-block bg-gradient-to-r from-primaryStart to-primaryEnd text-white px-3 py-1 rounded-lg">
                  Informacje kontaktowe
                </span>
              </h3>
              <p className="text-zinc-700 mb-4 text-center lg:text-left">
                Możesz również skontaktować się z nami bezpośrednio:
              </p>
              <div className="flex flex-col gap-2 mb-6 w-full">
                <Link
                  href="mailto:kontakt@quixy.pl"
                  className="text-primaryStart hover:underline font-medium transition"
                >
                  kontakt@quixy.pl
                </Link>
                <Link
                  href="tel:+48721417154"
                  className="text-primaryStart hover:underline font-medium transition"
                >
                  +48 721 417 154
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/quixy-logo.png"
                  width={244}
                  height={244}
                  alt="Logo quixy"
                  className="w-32 h-auto"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-1/2 max-w-xl bg-white rounded-2xl shadow-lg border border-zinc-100 p-8">
              <span className="flex items-center gap-2 text-2xl font-bold text-primaryStart mb-4">
                <FaEnvelope className="text-primaryEnd" /> Wypełnij formularz
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const id = toast.loading(<span>Sekunda...</span>);
                  if (data.name && data.email && data.message) {
                    pushLead({
                      id: randId(),
                      name: `Imię: ${data.name} Wiadomość: ${data.message}`,
                      phone: data.email,
                      type: "email",
                    }).then(() => {
                      setSent(true);
                      toast.update(id, {
                        render: "Wiadomość została wysłana",
                        type: "success",
                        isLoading: false,
                        autoClose: 2000,
                        onClose: () => {
                          setData({
                            email: "",
                            name: "",
                            message: "",
                          });
                        },
                      });
                    });
                  } else {
                    toast.update(id, {
                      render: "Wypełnij wszystkie pola",
                      type: "error",
                      isLoading: false,
                      autoClose: 2000,
                    });
                  }
                }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block text-zinc-700 font-medium mb-1"
                    >
                      Imię
                    </label>
                    <input
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      value={data.name}
                      type="text"
                      id="name"
                      className="w-full rounded-lg border border-zinc-300 focus:border-primaryStart focus:ring-2 focus:ring-primaryStart/20 p-3 text-zinc-900 bg-zinc-50 transition"
                      placeholder="Wpisz swoje imię"
                      autoComplete="name"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block text-zinc-700 font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      type="email"
                      id="email"
                      className="w-full rounded-lg border border-zinc-300 focus:border-primaryStart focus:ring-2 focus:ring-primaryStart/20 p-3 text-zinc-900 bg-zinc-50 transition"
                      placeholder="Wpisz swój email"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-zinc-700 font-medium mb-1"
                  >
                    Wiadomość
                  </label>
                  <textarea
                    onChange={(e) =>
                      setData({ ...data, message: e.target.value })
                    }
                    value={data.message}
                    id="message"
                    className="w-full rounded-lg border border-zinc-300 focus:border-primaryStart focus:ring-2 focus:ring-primaryStart/20 p-3 text-zinc-900 bg-zinc-50 min-h-[120px] transition"
                    placeholder="Wpisz swoją wiadomość"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={sent}
                  className={`mt-2 w-full py-3 rounded-lg font-semibold text-lg transition
                    ${
                      sent
                        ? "bg-zinc-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-ctaStart to-primaryEnd hover:from-primaryHoverStart hover:to-primaryHoverEnd text-white shadow-md"
                    }
                  `}
                >
                  {!sent ? "Wyślij wiadomość" : "Wiadomość została wysłana"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
