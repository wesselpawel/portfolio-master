"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { pushLead } from "@/common/firebase";
import { randId } from "@/common/utils/getRandomId";
import Toast from "@/components/quixyComponents/Toast";

export default function ZaprojektowaniContactForm({
  ownerName,
  city,
}: {
  ownerName: string;
  city: string;
}) {
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Ensure toasts are visible on this page */}
      <Toast />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const id = toast.loading(<span>Sekunda...</span>);

          if (data.name && data.email && data.message) {
            pushLead({
              id: randId(),
              name: `Imię: ${data.name} ${data.message} (dotyczy: ${city}, ${ownerName})`,
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
                  setSent(false);
                  setData({ email: "", name: "", message: "" });
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
        className="bg-surface-container p-10 rounded-lg space-y-6"
      >
        <div>
          <label
            className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block"
            htmlFor="name"
          >
            Imię i nazwisko
          </label>
          <input
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-3 text-on-surface transition"
            type="text"
            autoComplete="name"
          />
        </div>

        <div>
          <label
            className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-3 text-on-surface transition"
            type="email"
            autoComplete="email"
          />
        </div>

        <div>
          <label
            className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block"
            htmlFor="message"
          >
            Wiadomość
          </label>
          <textarea
            id="message"
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-3 text-on-surface transition resize-none"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={sent}
          className={`w-full py-5 bg-primary text-on-primary font-headline font-extrabold text-lg uppercase tracking-widest hover:bg-primary-container transition-all mt-4 rounded-sm ${
            sent ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {sent ? "Wysyłanie..." : "Wyślij Zapytanie"}
        </button>
      </form>
    </>
  );
}

