"use client";
import { setUser } from "@/common/redux/slices/user";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PreferencesHandler({
  addPreference,
  removePreference,
  light,
}: {
  addPreference: (item: string) => void;
  removePreference: (item: string) => void;
  light: any;
}) {
  const [expand, setExpand] = useState(false);

  const itemsForTalent = [
    "1-9 Godzin tygodniowo",
    "20-29 Godzin tygodniowo",
    "30-39 Godzin tygodniowo",
    "powyżej 40 godzin tygodniowo",
    "Jednorazowe zlecenie",
    "Kontrakt",
    "UoP",
    "B2B",
    "Hybrydowo",
    "Zdalnie",
    "Na pełen etat",
    "Na pół etatu",
    "Umowa zlecenie",
    "Umowa o dzieło",
    "Staż",
    "Praktyki",
    "Praca tymczasowa",
    "Praca na zmianę",
    "Praca dorywcza",
    "Freelance",
    "Praca w weekendy",
    "Elastyczne godziny pracy",
    "Praca na wezwanie",
    "Praca sezonowa",
  ];

  const companySize = [
    "1-10 pracowników",
    "11-50 pracowników",
    "51-200 pracowników",
    "201-500 pracowników",
    "501-1000 pracowników",
    "1001-5000 pracowników",
    "5001-10,000 pracowników",
    "10,001+ pracowników",
  ];

  // Render preference buttons
  const renderPreferences = (items: string[], limit: number, type: string) =>
    items.slice(0, expand ? items.length : limit).map((item) => (
      <button
        key={item}
        className={`rounded-md  duration-300 text-white px-2 py-1 text-sm  ${
          user?.preferences?.includes(item)
            ? "bg-gradient-to-b from-accentStart to-accentEnd"
            : `${
                light
                  ? "bg-gray-500 hover:bg-gray-400"
                  : "bg-gray-600 hover:bg-gray-500"
              }`
        }`}
        onClick={() => {
          handlePreferenceToggle(item);
        }}
      >
        {item}
      </button>
    ));

  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  // Toggle preferences depending on seek status
  const handlePreferenceToggle = (item: string) => {
    // If user already has the item selected, remove it
    if (user?.preferences?.includes(item)) {
      dispatch(
        setUser({
          ...user,
          preferences: user?.preferences.filter((i: string) => i !== item),
        })
      );
      removePreference(item);
      return;
    }

    // Check if seek is not set and restrict to one preference
    if (!user?.seek && user?.seek !== "ask") {
      if (user?.preferences?.length > 0) {
        toast.warning("Możesz wybrać tylko jedną preferencję.");
        return;
      }
      addPreference(item);
      dispatch(
        setUser({
          ...user,
          preferences: [...(user?.preferences || []), item],
        })
      );
    }

    // If seek is set, allow unlimited preferences
    if (user?.seek && user?.seek !== "ask") {
      addPreference(item);
      dispatch(
        setUser({
          ...user,
          preferences: [...(user?.preferences || []), item],
        })
      );
    }
  };

  const getTitleAndDescription = () => {
    if (user?.seek && user?.seek !== "ask") {
      return {
        title: "Czas pracy",
        type: "time",
        description: "Ile czasu możesz poświęcić na pracę?",
      };
    } else {
      return {
        title: "Dostępność",
        type: "companySize",
        description: "Podaj przybliżoną ilość pracowników.",
      };
    }
  };

  const { title, description, type } = getTitleAndDescription();

  return (
    <div className="font-sans flex flex-col w-full px-4 sm:px-6 mb-6">
      <div className="mt-3 font-bold">{title}</div>
      <p className="text-sm mb-2">{description}</p>
      <div className="gap-1 flex flex-wrap items-center w-full">
        {user?.seek && user?.seek !== "ask"
          ? renderPreferences(itemsForTalent, 6, type)
          : renderPreferences(companySize, 6, type)}

        {/* Show expand/collapse button if more than 6 options */}
        {(user?.seek && itemsForTalent.length > 6) ||
        (!user?.seek && companySize.length > 6) ? (
          <button
            className="bg-[#126b91] text-white  text-sm rounded-md py-1 px-2"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
