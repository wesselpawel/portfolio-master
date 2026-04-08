"use client";
import { useState } from "react";

export default function JobPreferencesHandler({
  addPreference,
  removePreference,
  formData,
  light,
}: {
  addPreference: any;
  removePreference: any;
  formData: any;
  light: boolean;
}) {
  const [expand, setExpand] = useState(false);

  const itemsForTalent = [
    "Umowa zlecenie", // Kwota netto
    "Umowa o dzieło", // Kwota netto
    "Kontrakt B2B", // Kwota netto
    "Praca dodatkowa", // Kwota netto
    "Jednorazowe zlecenie", // Kwota netto
    "Freelance", // Kwota netto
    "Staż", // Kwota brutto
    "Praktyki", // Kwota brutto
    "Pełny etat", // Kwota brutto
    "Część etatu", // Kwota brutto
    "Umowa o pracę", // Kwota brutto
  ];

  // Render preference buttons
  const renderPreferences = (items: string[], limit: number, light: boolean) =>
    items.slice(0, expand ? items.length : limit).map((item) => (
      <button
        key={item}
        className={`rounded-md  duration-300 text-white px-2 py-1 text-sm  ${
          formData?.preferences?.includes(item)
            ? "bg-gradient-to-b from-accentStart to-accentEnd"
            : `${
                light
                  ? "bg-gradient-to-b from-gray-500 to-gray-500 hover:bg-gray-400"
                  : "bg-gradient-to-b from-gray-600 to-gray-600 hover:bg-gray-500"
              }`
        }`}
        onClick={() => {
          formData?.preferences?.includes(item)
            ? removePreference(item)
            : addPreference(item);
        }}
      >
        {item}
      </button>
    ));
  return (
    <div className="flex flex-col w-full my-3">
      <div className="flex items-center gap-2">
        <div className="text-lg font-extrabold">Rodzaj współpracy</div>
        <p className="text-xs mt-px">(Wybierz ile chcesz)</p>
      </div>

      <div className="flex flex-wrap gap-1 items-center w-full">
        {renderPreferences(itemsForTalent, 6, light)}
        {itemsForTalent.length > 6 && (
          <button
            className="bg-[#126b91] text-white  text-sm rounded-md py-1 px-2"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        )}
      </div>
    </div>
  );
}
