"use client";
import React, { useState } from "react";
import { addOpinion } from "@/common/firebase/quixy";
import { toast } from "react-toastify";
import { FaCircleXmark } from "react-icons/fa6";

interface Opinion {
  name: string;
  feedback: string;
}

function OpinionsForm({ opinions }: { opinions: Opinion[] }) {
  const [name, setName] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !feedback) {
      return toast.error("Uzupełnij wszystkie pola!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    addOpinion({ name, feedback });
    setSent(true);
    toast.success("Dziękujemy za Twoją opinię!", {
      style: { background: "green" },
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <div className="bg-gradient-to-r from-primaryStart to-primaryEnd py-6">
      <form
        onSubmit={handleSubmit}
        className="container mx-auto flex flex-col md:flex-row justify-start items-start space-y-12"
      >
        <div className="px-4 lg:px-12 h-full w-full">
          <h2 className="w-full text-3xl text-white drop-shadow-md shadow-black text-left mb-2 font-extrabold">
            Podziel się przemyśleniami
          </h2>
          <div className="flex flex-col justify-between w-full h-full">
            <div>
              <div>
                <label htmlFor="name" className="text-white font-light">
                  Przedstaw się
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Imię lub nazwa firmy"
                  value={name}
                  maxLength={30}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 placeholder:text-white w-full py-3 px-4 shadow-sm mb-2 text-white border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="opinion" className="text-white font-light">
                  Twoja opinia
                </label>
                <textarea
                  maxLength={200}
                  cols={6}
                  rows={6}
                  id="opinion"
                  placeholder="Wpisz opinię"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="bg-gray-700 h-full placeholder:text-white w-full py-3 px-4 shadow-sm mb-2 text-white border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className={`rounded-md shadow-sm shadow-black/50 w-full sm:w-full mx-auto py-3 px-6 text-white transition-colors duration-300 ${
                sent
                  ? "bg-green-500 cursor-not-allowed"
                  : "hover:underline bg-gradient-to-b from-accentStart to-accentEnd"
              }`}
            >
              {sent ? "Dziękujemy!!" : "Wyślij opinię"}
            </button>
            <p className="text-white text-xs sm:text-sm  text-justify py-3">
              Przesyłając opinię, wyrażasz zgodę na upublicznienie wprowadzonych
              danych na naszej stronie internetowej oraz potwierdzasz akceptację
              Regulaminu serwisu Quixy.pl. Przed opublikowaniem Twojej opinii,
              prosimy o zapoznanie się z treścią Regulaminu.
            </p>
          </div>
        </div>

        <div className="md:ml-3 overflow-hidden w-full">
          <h3 className="text-2xl font-extrabold py-4 text-white px-3">
            Ostatnie opinie
          </h3>
          <ul className="space-y-6 h-[50vh] overflow-y-scroll p-3">
            {opinions?.map((opinion, index) => (
              <li
                key={index}
                className="flex flex-col items-start text-lg border-b border-white pb-2 font-light"
              >
                <span className="flex items-center font-bold text-white">
                  {opinion.name}
                </span>
                <p className="text-white">{opinion.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default OpinionsForm;
