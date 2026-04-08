import { setUser } from "@/common/redux/slices/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GoogleView({
  setChangesWereMade,
}: {
  setChangesWereMade: Function;
}) {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [activeProperty, setActiveProperty] = useState("");
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        event.key === "Enter" &&
        event.target instanceof HTMLTextAreaElement
      ) {
        setActiveProperty("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const { light } = useSelector((state: any) => state.light);
  return (
    <div className="h-max px-4 sm:px-6 font-sans">
      <h2 className="font-bold">Wygląd w Google</h2>
      <div
        className={`flex flex-col justify-start w-full p-3 rounded-lg mt-3 ${
          light ? "bg-gray-300" : "bg-gray-700"
        }`}
      >
        <div className="flex items-center w-full">
          <div className="w-12 h-12 aspect-square p-1.5 rounded-full bg-white">
            <Image
              src="/favicons/android-chrome-192x192.png"
              width={256}
              height={256}
              alt=""
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-col ml-3 cursor-default">
            <h2
              className={`text-sm text-black ${
                light ? "text-black" : "text-white"
              }`}
            >
              quixy.pl
            </h2>
            <h2
              className={`text-sm mt-1 ${
                light ? "text-blue-600" : "text-blue-300"
              }`}
            >
              https://quixy.pl/{user?.seek ? "talent/" : "company/"}
              {user?.pseudo && user?.pseudo}
            </h2>
          </div>
        </div>
        <div className="mt-1">
          <button
            onClick={() => setActiveProperty("googleTitle")}
            title="kliknij by edytować"
            className={`sm:text-lg font-bold !text-left ${
              light ? "text-blue-600" : "text-blue-300"
            }`}
          >
            {user?.googleTitle || "Tytuł wyświetlany w Google (max. 80 znaków)"}
          </button>
          {activeProperty === "googleTitle" && (
            <div className="relative w-full h-max">
              <textarea
                autoFocus
                rows={4}
                placeholder="Wpisz tytuł"
                onBlur={(e: any) => {
                  if (e.target.value === "") {
                    setActiveProperty("");
                  } else {
                    setActiveProperty(""), setChangesWereMade(true);
                  }
                }}
                value={user?.googleTitle || ""}
                name="googleTitle"
                onChange={(e: any) =>
                  dispatch(setUser({ ...user, googleTitle: e.target.value }))
                }
                className={`${
                  light ? "bg-white text-black" : "bg-gray-600 text-white"
                } w-full outline-none focus:outline-none rounded-md p-2 border border-primaryStart`}
              />
              <button
                onClick={() => {
                  setActiveProperty(""), setChangesWereMade(true);
                }}
                className="bg-gradient-to-b from-ctaStart to-ctaEnd text-white font-normal py-2 px-4 rounded-br-md rounded-tl-md duration-300 absolute right-0 bottom-[6px]"
              >
                Zatwierdź
              </button>
            </div>
          )}
        </div>
        <div className="mt-1">
          <button
            onClick={() => setActiveProperty("googleDescription")}
            title="kliknij by edytować"
            className={`${
              light ? "text-gray-700" : "text-gray-300"
            } text-sm sm:text-base !text-left`}
          >
            {user?.googleDescription ||
              "Opis wyświetlany w Google (max. 180-230 znaków) (Co klient znajdzie na tej stronie?/Czym się zajmujesz?/Dodatkowe informacje)"}
          </button>
          {activeProperty === "googleDescription" && (
            <div className="relative w-full h-max">
              <textarea
                autoFocus
                rows={5}
                placeholder="Wpisz opis"
                onBlur={(e: any) => {
                  if (e.target.value === "") {
                    setActiveProperty("");
                  } else {
                    setActiveProperty(""), setChangesWereMade(true);
                  }
                }}
                value={user?.googleDescription || ""}
                name="googleDescription"
                onChange={(e: any) =>
                  dispatch(
                    setUser({ ...user, googleDescription: e.target.value })
                  )
                }
                className={`${
                  light ? "bg-white text-black" : "bg-gray-600 text-white"
                } w-full outline-none focus:outline-none rounded-md p-2 border border-primaryStart`}
              />
              <button
                onClick={() => {
                  setActiveProperty(""), setChangesWereMade(true);
                }}
                className="bg-gradient-to-b from-ctaStart to-ctaEnd text-white font-normal py-2 px-4 rounded-br-md rounded-tl-md duration-300 absolute right-0 bottom-[6px]"
              >
                Zatwierdź
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
