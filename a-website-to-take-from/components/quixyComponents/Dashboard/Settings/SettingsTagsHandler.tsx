"use client";
import jobs from "../../../../public/14.09.2024.json";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaMinus,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { FaArrowLeftLong, FaCircleXmark, FaPlus } from "react-icons/fa6";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import { useState } from "react";
import { updateUser } from "@/common/firebase/quixy";
import { toast } from "react-toastify";
import { setUser } from "@/common/redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

export default function TagsHandler({ light }: { light: any }) {
  // Handle changes to the tag input field
  const dispatch = useDispatch();
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});

  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState({ title: "", url: "" });
  const [category, setCategory] = useState({ title: "", url: "" });
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="flex flex-col w-full px-4 sm:px-6 mt-2 font-sans">
      <>
        {" "}
        <h1 className="font-bold mt-2 font-sans">Twoje specjalizacje</h1>
        <p className="text-sm">
          Twoje portfolio trafi do wybranych widoków w naszej platformie
        </p>
        <div className="mt-2">
          {configurationOpen && !slug?.title && (
            <div className=" font-bold">Wybierz kategorię</div>
          )}
          {slug?.title !== "" && category?.title === "" && (
            <div className=" font-bold">Wybierz podkategorię</div>
          )}
          {slug?.title !== "" && category?.title !== "" && (
            <div className=" font-bold">Dodaj specjalizację</div>
          )}
        </div>
        <div className="font-extrabold mb-1">
          {user?.tags?.length === 0 &&
            !configurationOpen &&
            "Czym się zajmujesz?"}{" "}
        </div>
        <div
          className={`${
            configurationOpen
              ? `${light ? "bg-gray-300" : "bg-gray-700"} p-1 sm:p-3 `
              : ""
          } rounded-md gap-1 flex flex-col items-start w-full`}
        >
          {!configurationOpen && slug.title === "" && (
            <button
              onClick={() => setConfigurationOpen(true)}
              className="text-lg w-max bg-gradient-to-b rounded-md from-ctaStart to-ctaEnd duration-100 text-white flex flex-row items-center justify-center outline-none px-4 py-2 gap-3"
            >
              <FaPlusCircle /> Dodaj kategorię
            </button>
          )}
          {configurationOpen && slug.title === "" && (
            <button
              onClick={() => {
                setConfigurationOpen(false);
              }}
              className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] px-4 py-2"
            >
              <FaChevronLeft className="mr-2" /> Wyjście
            </button>
          )}
          {configurationOpen && slug.title !== "" && category.title === "" && (
            <button
              onClick={() => setSlug({ title: "", url: "" })}
              className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] px-4 py-2"
            >
              <FaArrowLeft className="mr-2" />
              Powrót
            </button>
          )}
          {configurationOpen && slug.title !== "" && category.title !== "" && (
            <button
              onClick={() => {
                setCategory({ title: "", url: "" });
              }}
              className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] px-4 py-2"
            >
              <FaArrowLeftLong className="mr-2" />
              Powrót
            </button>
          )}
          {configurationOpen && slug.title === "" && (
            <div className="gap-1 flex flex-wrap">
              {jobs.map((item: any, i: any) => (
                <button
                  onClick={() =>
                    setSlug({
                      title: item.title,
                      url: polishToEnglish(item.title),
                    })
                  }
                  className="h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-zinc-800 hover:from-zinc-700/80 hover:to-zinc-800/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base hover:bg-opacity-80"
                  key={i}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
          {configurationOpen && category.title === "" && (
            <div>
              {jobs.map((item: any, i: any) => (
                <>
                  {item.title === slug.title && (
                    <div className="gap-1 flex flex-wrap">
                      {item.data.map((cat: any, i: any) => (
                        <button
                          onClick={() =>
                            setCategory({
                              title: cat.title,
                              url: polishToEnglish(cat.title),
                            })
                          }
                          className="h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-zinc-800 hover:from-zinc-700/80 hover:to-zinc-800/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base hover:bg-opacity-80"
                          key={i}
                        >
                          {cat.title}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          {configurationOpen && category.title !== "" && (
            <div>
              {jobs.map((item: any, i: any) => (
                <div key={i}>
                  {item.title === slug.title && (
                    <div key={i}>
                      {item.data.map((cat: any, i: any) => (
                        <div key={i}>
                          {cat.title === category.title && (
                            <div className="gap-1 flex flex-wrap" key={i}>
                              {cat.data.map((job: any, i: any) => (
                                <button
                                  onClick={() => {
                                    if (
                                      user?.tags?.find(
                                        (tag: any) =>
                                          tag.url === polishToEnglish(job.title)
                                      )
                                    ) {
                                      return (
                                        toast.error(
                                          `Kategoria ${category.title} i stanowisko ${job.title} są już dodane.`,
                                          {
                                            position: "bottom-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                          }
                                        ),
                                        setConfigurationOpen(false),
                                        setCategory({ title: "", url: "" }),
                                        setSlug({ title: "", url: "" })
                                      );
                                    } else {
                                      const history = user?.history
                                        ? [...user?.history]
                                        : [];
                                      toast.success(
                                        `Pomyślnie dodano kategorię ${category.title} i stanowisko ${job.title}.`,
                                        {
                                          position: "bottom-right",
                                          autoClose: 5000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                        }
                                      );
                                      updateUser(user?.uid, {
                                        tags: [
                                          ...(user?.tags || []),
                                          {
                                            url: polishToEnglish(job.title),
                                            categoryUrl: polishToEnglish(
                                              category.title
                                            ),
                                            categoryTitle: category.title,
                                            slugUrl: polishToEnglish(
                                              slug.title
                                            ),
                                            slugTitle: slug.title,
                                            title: job.title,
                                          },
                                        ],
                                        history: [
                                          ...history,
                                          {
                                            action: `Dodano nową specjalizację ${job.title} w podkategorii ${category.title}`,
                                            creationTime: Date.now(),
                                          },
                                        ],
                                      });
                                      dispatch(
                                        setUser({
                                          ...user,
                                          tags: [
                                            ...(user?.tags || []),
                                            {
                                              url: polishToEnglish(job.title),
                                              categoryUrl: polishToEnglish(
                                                category.title
                                              ),
                                              categoryTitle: category.title,
                                              slugUrl: polishToEnglish(
                                                slug.title
                                              ),
                                              slugTitle: slug.title,
                                              title: job.title,
                                            },
                                          ],
                                          history: [
                                            ...history,
                                            {
                                              action: `Dodano nową specjalizację ${job.title} w podkategorii ${category.title}`,
                                              creationTime: Date.now(),
                                            },
                                          ],
                                        })
                                      );
                                      setConfigurationOpen(false);
                                      setCategory({ title: "", url: "" });
                                      setSlug({ title: "", url: "" });
                                    }
                                  }}
                                  className="h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-zinc-800 hover:from-zinc-700/80 hover:to-zinc-800/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base"
                                  key={i}
                                >
                                  {job.title}
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
        <div className="mt-2">
          <div
            className={`${
              tagsOpenLevel === 0 ? "flex flex-row flex-wrap gap-2" : ""
            }`}
          >
            {user?.tags && tagsOpenLevel === 1
              ? user?.tags?.map((item: any, i: any) => (
                  <div className="text-sm bg-slate-300 p-1" key={i}>
                    <div className="-mt-2 w-full flex flex-wrap items-center font-gotham font-light">
                      <div className="bg-[#126b91]  p-1 text-white">
                        {item.slugTitle}
                      </div>
                      <div className="flex items-center">
                        <FaChevronRight className="mx-1" />
                        <div className="bg-[#126b91]  p-1 text-white mt-2">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : tagsOpenLevel === 2
              ? user?.tags?.map((item: any, i: any) => (
                  <div className="text-sm mt-2 bg-slate-300  p-1" key={i}>
                    <div className="-mt-2 w-full flex flex-wrap items-center font-gotham font-light">
                      <div className="flex items-center">
                        <div className="bg-[#126b91]  p-1 text-white mt-2">
                          {item.slugTitle}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaChevronRight className="mx-1 mt-2" />
                        <div className="bg-[#126b91]  p-1 text-white mt-2">
                          {item.categoryTitle}
                        </div>
                      </div>
                      <div className="flex items-center font-bold">
                        <FaChevronRight className="mx-1 mt-2" />
                        <div className="bg-[#126b91]  p-1 text-white mt-2">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : user?.tags?.map((item: any, i: any) => (
                  <div
                    key={i}
                    className="w-max max-w-[100%] flex flex-wrap items-center font-gotham font-light text-white"
                  >
                    <div
                      className={`${
                        selectedTag.title === item.title ? "flex-col" : ""
                      } h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md flex items-center px-[0.5rem] text-sm sm:text-base sm:px-[1rem]`}
                    >
                      <div className="flex flex-row items-center">
                        {item.title}
                        <button
                          onClick={() => {
                            setTagDeletion(true);
                            setSelectedTag(item);
                          }}
                        >
                          <FaMinusCircle className="ml-2 text-white" />
                        </button>
                      </div>
                      {tagDeletion && selectedTag.title === item.title && (
                        <div className="flex flex-col w-[90%] my-2 sticky left-0 top-0 bg-black bg-opacity-90 border-t-[6px] rounded-b-lg border-accentStart p-3 ">
                          <h2>Usunąć {selectedTag?.title}?</h2>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <button
                              onClick={() => {
                                const newTags = user?.tags?.filter(
                                  (tag: any) => tag.title !== selectedTag.title
                                );
                                const history = user?.history;
                                updateUser(user?.uid, {
                                  tags: newTags,
                                  history: [
                                    ...history,
                                    {
                                      action: `Usunięto specjalizację "${selectedTag.title}"`,
                                      creationTime: Date.now(),
                                    },
                                  ],
                                });
                                dispatch(
                                  setUser({
                                    ...user,
                                    tags: newTags,
                                    history: [
                                      ...history,
                                      {
                                        action: `Usunięto specjalizację "${selectedTag.title}"`,
                                        creationTime: Date.now(),
                                      },
                                    ],
                                  })
                                );
                                setTagDeletion(false);
                                setSelectedTag({});
                                toast.success(`Pomyślnie usunięto kategorię.`, {
                                  position: "bottom-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                });
                              }}
                              className="rounded-md bg-red-500 hover:bg-opacity-90 text-white px-3 py-1 "
                            >
                              Usuń
                            </button>
                            <button
                              onClick={() => {
                                setTagDeletion(false);
                                setSelectedTag({});
                              }}
                              className="rounded-md bg-green-500 hover:bg-opacity-90 text-white px-3 py-1 "
                            >
                              Nie
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </>
    </div>
  );
}
