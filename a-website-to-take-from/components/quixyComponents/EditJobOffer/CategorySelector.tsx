import { FaChevronLeft } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { FaArrowLeft, FaArrowLeftLong } from "react-icons/fa6";
export default function CategorySelector({
  slug,
  setSlug,
  category,
  setCategory,
  jobs,
  job,
  setJob,
  setConfigurationOpen,
}: {
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  jobs?: any;
  job: any;
  setJob: any;
  setConfigurationOpen: any;
}) {
  return (
    <>
      <div className="mt-1.5 font-bold text-lg">Kategoria</div>
      {slug !== "" && category === "" && (
        <div className="flex flex-col mt-1">
          <div className="mb-1 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md px-2 py-1 text-white w-max max-w-[100%] h-[32px]">
            {slug}
          </div>
          <div className="font-bold text-lg">Wybierz podkategorię</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="flex flex-col mt-1">
          <div className="mb-1 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md px-2 py-1 text-white w-max max-w-[100%] h-[32px]">
            {slug}
          </div>
          <div className="font-bold text-lg">Podkategoria</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="flex flex-col mt-1">
          <div className="mb-1 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md px-2 py-1 text-white w-max max-w-[100%] h-[32px]">
            {category}
          </div>
          <div className="font-bold text-lg">Stanowisko</div>
        </div>
      )}

      <div className="flex flex-row items-start w-full gap-1">
        {slug !== "" && category !== "" && job === "" && (
          <button
            onClick={() => {
              setCategory("");
            }}
            className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] aspect-square"
          >
            <FaArrowLeft className="hover:scale-110" />
          </button>
        )}
        {slug !== "" && category !== "" && job !== "" && (
          <button
            onClick={() => {
              setJob("");
            }}
            className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] aspect-square"
          >
            <FaArrowLeftLong className="hover:scale-110" />
          </button>
        )}
        {slug !== "" && category === "" && (
          <button
            onClick={() => {
              setSlug(""), setConfigurationOpen(false);
            }}
            className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] aspect-square"
          >
            <FaChevronLeft className="hover:scale-110" />
          </button>
        )}
        {slug === "" && (
          <div className="gap-1 flex flex-wrap">
            {jobs.map((item: any, k: any) => (
              <button
                onClick={() => setSlug(item.title)}
                className="font-light bg-gradient-to-b from-zinc-700 to-zinc-800 text-white px-2 py-1 h-[32px] rounded-md hover:from-zinc-800 hover:to-zinc-700 duration-200"
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
                        className="font-light bg-gradient-to-b from-zinc-700 to-zinc-800 text-white px-2 py-1 h-[32px] rounded-md hover:from-zinc-800 hover:to-zinc-700 duration-200"
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
                                    ? " from-ctaStart to-ctaEnd"
                                    : "from-zinc-700 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700"
                                } bg-gradient-to-b text-white px-2 py-1 h-[32px] rounded-md font-light`}
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
    </>
  );
}
