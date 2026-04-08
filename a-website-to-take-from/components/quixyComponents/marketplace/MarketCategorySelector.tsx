import Link from "next/link";
import jobs from "../../../public/14.09.2024.json";
import { FaChevronLeft } from "react-icons/fa";
import {
  FaArrowLeft,
  FaArrowLeftLong,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { AiFillThunderbolt } from "react-icons/ai";
export default function MarketCategorySelector({
  setConfigurationOpen,
  configurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
  setJob,
  job,
  setShowResults,
  services,
  showResults,
}: {
  setConfigurationOpen: any;
  configurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  setJob: any;
  job: any;
  setShowResults: any;
  services: any;
  showResults: any;
}) {
  return (
    <div className="bg-white w-full">
      <h3 className="text-xl lg:text-3xl font-extrabold text-black">
        Wyszukiwarka usług
      </h3>

      <div className="my-1.5 font-bold text-black">Kategoria</div>
      {slug !== "" && category === "" && (
        <div className="text-black flex flex-col mt-1 w-full">
          <div className="font-bold mb-1 bg-gradient-to-b rounded-md from-zinc-700 to-zinc-800 flex items-center justify-center px-2 text-white w-max max-w-[100%] p-1 sm:px-[0.7rem] h-[32px] sm:h-[50px]">
            {slug}
          </div>
          <div className="font-bold">Wybierz podkategorię</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="text-black flex flex-col mt-1 w-full">
          <div className="font-bold mb-1 bg-gradient-to-b rounded-md from-zinc-700 to-zinc-800 flex items-center justify-center px-2 text-white w-max max-w-[100%] p-1 sm:px-[0.7rem] h-[32px] sm:h-[50px]">
            {slug}
          </div>
          <div className="font-bold">Podkategoria</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="flex flex-col mt-1 w-full">
          <div className="font-bold mb-1 bg-gradient-to-b rounded-md from-zinc-700 to-zinc-800 flex items-center justify-center px-2 text-white w-max max-w-[100%] p-1 sm:px-[0.7rem] h-[32px] sm:h-[50px]">
            {category}
          </div>
          <div className="font-bold text-black">Wybierz kategorię</div>
        </div>
      )}

      <div className="flex flex-row items-start w-full gap-1">
        {slug !== "" && category !== "" && job === "" && (
          <button
            onClick={() => {
              setCategory("");
              setShowResults(false);
            }}
            className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] sm:h-[50px] aspect-square"
          >
            <FaArrowLeft className="hover:scale-110" />
          </button>
        )}
        {slug !== "" && category !== "" && job !== "" && (
          <button
            onClick={() => {
              setJob("");
              setCategory("");
              setShowResults(false);
            }}
            className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] sm:h-[50px] aspect-square"
          >
            <FaArrowLeftLong className="hover:scale-110" />
          </button>
        )}
        {slug !== "" && category === "" && (
          <button
            onClick={() => {
              setSlug(""), setConfigurationOpen(false);
              setShowResults(false);
            }}
            className="rounded-md  text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] sm:h-[50px] aspect-square"
          >
            <FaChevronLeft className="hover:scale-110" />
          </button>
        )}
        {slug === "" && (
          <div className="gap-1 flex flex-wrap">
            {jobs.map((item: any, k: any) => (
              <button
                onClick={() => setSlug(item.title)}
                className=" rounded-md bg-gradient-to-b from-zinc-700 to-zinc-800 hover:from-zinc-700/80 hover:to-zinc-800/80 duration-100  text-white font-extralight p-1 sm:px-[0.7rem] h-[32px] sm:h-[50px]"
                key={uuidv4()}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
        {category === "" && (
          <div>
            {jobs.map((item: any, i: any) => (
              <div key={uuidv4()}>
                {item.title === slug && (
                  <div className="gap-1 flex flex-wrap">
                    {item.data.map((cat: any, j: any) => (
                      <button
                        onClick={() => setCategory(cat.title)}
                        className="rounded-md bg-gradient-to-b from-zinc-700 to-zinc-800 hover:from-zinc-700/80 hover:to-zinc-800/80 duration-100  text-white font-extralight p-1 sm:px-[0.7rem] h-[32px] sm:h-[50px]"
                        key={uuidv4()}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {category !== "" && (
          <div>
            {jobs.map((item: any, i: any) => (
              <div key={uuidv4()}>
                {item.title === slug && (
                  <div>
                    {item.data.map((cat: any, i: any) => (
                      <div key={uuidv4()}>
                        {cat.title === category && (
                          <div className="gap-1 flex flex-wrap">
                            {cat.data.map((j: any, i: any) => (
                              <button
                                onClick={() => {
                                  setJob(j.title);
                                }}
                                className={`${
                                  slug !== "" &&
                                  category !== "" &&
                                  job === j.title
                                    ? "from-ctaStart to-ctaEnd"
                                    : "from-zinc-700 to-zinc-800 hover:from-zinc-700/80 hover:to-zinc-800/80 "
                                } rounded-md duration-100 bg-gradient-to-b text-white font-extralight p-1 sm:px-[0.7rem] h-[32px] sm:h-[50px]`}
                                key={uuidv4()}
                              >
                                {j.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {slug !== "" && (
        <button
          onClick={() => {
            if (slug !== "" && services && !showResults) {
              setShowResults(true);
            } else {
              setShowResults(false);
              setSlug("");
              setCategory("");
              setJob("");
            }
          }}
          className={`${
            !showResults && services
              ? "from-ctaStart to-ctaEnd"
              : "from-red-400 to-red-500"
          } rounded-md px-4 py-2 mt-3 bg-gradient-to-b  to-cta text-white font-extralight  text-xl flex items-center gap-2 hover:scale-105 duration-100`}
        >
          {!showResults && services ? (
            <>
              {" "}
              <FaMagnifyingGlass /> Znalezione usługi: <b>{services}</b>
            </>
          ) : (
            <>
              {" "}
              <IoCloseCircle /> Zakończ wyszukiwanie
            </>
          )}
        </button>
      )}
      {slug && !services && (
        <div className="flex-col  text-center py-12 mt-3 bg-gradient-to-r from-zinc-700/30 to-zinc-800/30 rounded-lg text-black flex items-center justify-center">
          <div
            style={{ boxShadow: "0px 1px 10px rgba(0,0,0,0.8)" }}
            className="rounded-full h-24 w-24 from-primaryStart to-primaryEnd bg-gradient-to-b flex items-center justify-center"
          >
            <AiFillThunderbolt className="text-4xl text-white" />
          </div>
          <p className="mt-4 max-w-xs text-gray-700">
            Brak aktywnych usług w przeglądanej kategorii
          </p>
          <Link
            href="/register"
            className="mt-2 text-sm bg-gradient-to-b from-ctaStart to-ctaEnd font-bold text-white px-4 py-2 rounded-md shadow-md hover:scale-105 duration-200"
          >
            Zarządzaj rynkiem
          </Link>
        </div>
      )}
    </div>
  );
}
