"use client";
import { useState } from "react";

export default function JobOfferLevel({
  setFormData,
  formData,
  light,
}: {
  setFormData: any;
  formData: any;
  light: boolean;
}) {
  const [expand, setExpand] = useState(false);
  const itemsForTalent = [
    "praktykant / stażysta",
    "asystent",
    "młodszy specjalista (Junior)",
    "specjalista (Mid / Regular)",
    "starszy specjalista (Senior)",
    "ekspert",
    "kierownik / koordynator",
    "menedżer",
    "dyrektor",
    "prezes",
  ];

  // Render preference buttons
  const renderPreferences = (items: string[], limit: number, light: boolean) =>
    items.slice(0, expand ? items.length : limit).map((item) => (
      <button
        key={item}
        className={`rounded-md  duration-300 text-white px-2 py-1 text-sm  ${
          formData?.level === item
            ? "bg-gradient-to-b from-accentStart to-accentEnd"
            : `${
                light
                  ? "bg-gradient-to-b from-gray-500 to-gray-500 hover:bg-gray-400"
                  : "bg-gradient-to-b from-gray-600 to-gray-600 hover:bg-gray-500"
              }`
        }`}
        onClick={() => setFormData({ ...formData, level: item })}
      >
        {item}
      </button>
    ));

  return (
    <div className="flex flex-col w-full my-3">
      <div className="flex items-center gap-2">
        <div className=" font-extrabold">Poziom stanowiska</div>
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
