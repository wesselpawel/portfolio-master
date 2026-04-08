"use client";
import { pushEmail } from "@/utils/pushEmail";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function HomePageLead() {
  const [isChecked, setIsChecked] = React.useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleAcceptanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(event.target.checked);
  };
  const validateEmail = (email: string) => {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email);
  };
  return (
    <div className="flex items-center flex-col">
      <h2 className="font-bold text-3xl not-italic mt-12">
        Chcesz otrzymać aktualizacje na temat dostępności strony?
      </h2>
      <b className="text-3xl italic my-6 font-bold text-purple-500">
        Wystarczy, że podasz swój email poniżej
      </b>
      <input
        className={`${
          validateEmail(email) === false
            ? "border-red-500 text-red-500"
            : "border-primary text-green-500"
        } placeholder:text-green-500 font-bold text-lg border-2  p-3 my-3`}
        type="text"
        placeholder="Wpisz email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <input
        type="checkbox"
        className={`${
          !isChecked
            ? "border-red-500 bg-white"
            : "border-green-500 bg-green-400"
        } border-2 mr-2`}
        checked={isChecked}
        onChange={handleAcceptanceChange}
      />
      <span>
        Akceptuję warunki korzystania z serwisu Quixy.{" "}
        <Link href="/terms-of-use" target="_blank">
          Czytaj więcej
        </Link>
      </span>
      <button
        onClick={() => {
          if (isChecked) {
            if (validateEmail(email)) {
              setLoading(true);
              pushEmail(email, isChecked).then((res: any) => {
                if (!res.error) {
                  toast.success("Udało się! Jesteś na bieżąco!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                  setIsSent(true);
                  setLoading(false);
                } else {
                  toast.error("${błąd}: res.code", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                  setLoading(false);
                }
              });
            } else {
              toast.error("Wpisz poprawny email", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          } else {
            toast.error("Musisz zaakceptować warunki korzystania z serwisu", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        }}
        disabled={!isChecked || loading || isSent}
        title={
          isChecked
            ? "Dołącz do nas!"
            : "Musisz zaakceptować warunki korzystania z serwisu"
        }
        className={`${
          !isChecked ? "cursor-not-allowed" : ""
        } disabled:cursor-not-allowed bg-green-500 text-white font-bold text-xl mt-3 p-3 `}
      >
        {!isSent
          ? "Dołącz do Centrum Biznesu w internecie!"
          : "Dziękujemy za zgłoszenie do newslettera!"}
      </button>
    </div>
  );
}
