import {
  FaChevronLeft,
  FaMinusCircle,
  FaPlusCircle,
  FaTimes,
} from "react-icons/fa";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import jobs from "../../../../../public/14.09.2024.json";
import { toast } from "react-toastify";
import Image from "next/image";
import { setUser } from "@/common/redux/slices/user";
import ImagePicker from "./ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/common/redux/slices/modalsopen";
import { IProject } from "@/types";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { addDocument, updateUser } from "@/common/firebase/quixy";
import { storage } from "@/common/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { InputField } from "@/components/quixyComponents/AddJobOffer/InputField";

export default function PortfolioItems({
  user,
  project,
  setProject,
  setUploading,
  setUploadCount,
}: {
  user: any;
  project: any;
  setProject: any;
  setUploading: any;
  setUploadCount: any;
}) {
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState({ title: "", url: "" });
  const [category, setCategory] = useState({ title: "", url: "" });
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [isImageDescriptionOpen, setImageDescriptionOpen] = useState(-1);
  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { light } = useSelector((state: any) => state.light);
  const proceedWithProjectUpdate = async (isPaid: boolean) => {
    const uniqId = uuid();
    const updatedProjects = updateProjectsList(user?.projects, project, {
      ...project,
      creationTime: Date.now(),
      pseudo: user?.pseudo,
      userType: user?.seek,
      id: uniqId,
    });
    const updatedTokens = isPaid ? user.tokens - 10 : user.tokens;
    await addDocument("services", uniqId, {
      ...project,
      creationTime: Date.now(),
      pseudo: user?.pseudo,
      userType: user?.seek === true ? "talent" : "company",
      id: uniqId,
    });

    await updateUser(user.uid, {
      tokens: updatedTokens,
      projects: updatedProjects,
    });
    dispatch(
      setUser({ ...user, tokens: updatedTokens, projects: updatedProjects })
    );
    setLoading(false);
    setSent(true);
    showToastSuccess("Pomyślnie dodano usługę!");
    setProject("");
  };
  const updateProjectsList = (
    existingProjects: any,
    project: IProject,
    additionalProps: any
  ) => {
    const newProject = {
      ...project,
      creationTime: Date.now(),
      ...additionalProps,
    };

    return existingProjects ? [...existingProjects, newProject] : [newProject];
  };
  const showToastSuccess = (message: string) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const showToastError = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const handleRecruitmentStart = async () => {
    setLoading(true);
    const hasEnoughTokens = user?.tokens >= 10;
    const isProjectValid = isProjectDataValid(project);

    if (!isProjectValid) {
      return showToastError("Uzupełnij dane!");
    }
    await proceedWithProjectUpdate(hasEnoughTokens);

    if (!hasEnoughTokens) {
      showToastError("Nie posiadasz wystarczającej ilości Quixies!");
      openTokenModal();
    }
  };
  const isProjectDataValid = (project: IProject) => {
    return project?.name && project?.tags.length > 0 && project?.desc;
  };
  const openTokenModal = () => {
    dispatch(set_modals({ ...modals, quixies: true }));
  };
  async function uploadImages(files: any) {
    if (files.length > 4) {
      showToastError("Możesz dodać maksymalnie 4 zdjęcia!");
      return;
    }
    setUploadCount(files.length);
    setUploading(true);
    const localImagesArray: any = [];
    const uploadFile = async (file: any) => {
      const randId = uuid();
      const imageRef = ref(storage, randId);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const data = {
          src: url,
        };
        localImagesArray.push(data);
      } catch (error) {
        return;
      }
    };
    const uploadPromises = files.map(uploadFile);
    try {
      await Promise.all(uploadPromises);
      const updatedImages = project?.images
        ? [...project?.images, ...localImagesArray]
        : localImagesArray;
      setProject({ ...project, images: updatedImages });
      setUploading(false);
    } catch (error) {
      setUploading(false);
      return;
    }
  }
  return (
    <div className="w-full">
      <h1 className="font-extrabold text-lg">Kategorie</h1>
      <p className="text-sm">
        Twoja usługa trafi do odpowiednich widoków naszej aplikacji
      </p>

      <div className="mt-2 font-bold text-sm ">
        {project?.tags?.length === 0 && "Wybierz kategorie"}{" "}
        {project?.tags?.length > 0 && "Wybrane kategorie"}
        <div
          className={`${
            tagsOpenLevel === 0 ? "flex flex-row flex-wrap -ml-2" : ""
          }`}
        >
          {project?.tags?.map((item: any, i: any) => (
            <div
              key={i}
              className="ml-2 mt-2 flex flex-wrap items-center  font-light text-white"
            >
              <div
                className={`${
                  selectedTag.title === item.title ? "flex-col" : ""
                } w-max flex items-center justify-center min-h-[40px] sm:min-h-[50px] bg-gradient-to-b from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base`}
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
                          const newTags = project?.tags?.filter(
                            (tag: any) => tag.title !== selectedTag.title
                          );
                          setProject({
                            ...project,
                            tags: newTags,
                          });
                          toast.success(
                            `Usunięto widok oferty w "${selectedTag.title}"`,
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
                          setTagDeletion(false);
                          setSelectedTag({});
                        }}
                        className="bg-red-500 text-white p-2"
                      >
                        Usuń
                      </button>
                      <button
                        onClick={() => {
                          setTagDeletion(false);
                          setSelectedTag({});
                        }}
                        className="bg-green-500 text-white p-2"
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

      <div className="gap-3">
        <p className="text-sm text-[green] mb-2"></p>

        {configurationOpen && !slug?.title && (
          <div className=" font-bold ">Wybierz kategorię</div>
        )}
        {slug?.title !== "" && category?.title === "" && (
          <div className=" flex flex-col">
            <div className="w-max flex items-center justify-center h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base">
              {slug.title}
            </div>
            <div className="font-bold">Wybierz podkategorię</div>
          </div>
        )}
        {slug?.title !== "" && category?.title !== "" && (
          <div className=" flex flex-col">
            <div className="w-max flex items-center justify-center h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base">
              {category.title}
            </div>
            <div className="font-bold">Dodaj usługę do</div>
          </div>
        )}
        <div className="flex flex-row items-start w-full">
          {!configurationOpen && slug.title === "" && (
            <button
              onClick={() => setConfigurationOpen(true)}
              className="px-[0.7rem] py-1 text-lg w-max bg-gradient-to-r from-ctaStart to-primaryStart hover:bg-opacity-80  duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] sm:h-[50px] rounded-md"
            >
              <FaPlusCircle className="mr-1" /> Dodaj kategorię
            </button>
          )}
          {configurationOpen && slug.title !== "" && category.title !== "" && (
            <button
              onClick={() => setCategory({ title: "", url: "" })}
              className="text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-80  duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] sm:h-[50px] aspect-square rounded-md mr-1"
            >
              <FaChevronLeft />
            </button>
          )}
          {configurationOpen && slug.title !== "" && category.title === "" && (
            <button
              onClick={() => {
                setSlug({ title: "", url: "" }), setConfigurationOpen(false);
              }}
              className="text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-80  duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] sm:h-[50px] aspect-square rounded-md mr-1"
            >
              <FaChevronLeft />
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
                  className="h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base"
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
                <div key={item.title} className="gap-1 flex flex-wrap">
                  {item.title === slug.title && (
                    <>
                      {item.data.map((cat: any, i: any) => (
                        <button
                          onClick={() =>
                            setCategory({
                              title: cat.title,
                              url: polishToEnglish(cat.title),
                            })
                          }
                          className="h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base"
                          key={i}
                        >
                          {cat.title}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          {configurationOpen && category.title !== "" && (
            <div>
              {jobs.map((item: any, i: any) => (
                <div key={`${item.title}-${i}`}>
                  {item.title === slug.title && (
                    <>
                      {item.data.map((cat: any, i: any) => (
                        <div key={cat.title}>
                          {cat.title === category.title && (
                            <div className="gap-1 flex flex-wrap">
                              {cat.data.map((job: any, i: any) => (
                                <button
                                  onClick={() => {
                                    if (
                                      project?.tags?.find(
                                        (tag: any) =>
                                          tag.url === polishToEnglish(job.title)
                                      )
                                    ) {
                                      return (
                                        toast.error(
                                          `Oferta w ${category.title} i ${job.title} już się wyświetla.`,
                                          {
                                            style: {
                                              background: "red",
                                              color: "white",
                                            },

                                            position: "bottom-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                          }
                                        ),
                                        setConfigurationOpen(false),
                                        setCategory({
                                          title: "",
                                          url: "",
                                        }),
                                        setSlug({
                                          title: "",
                                          url: "",
                                        })
                                      );
                                    } else {
                                      setProject({
                                        ...project,
                                        tags: [
                                          ...(project?.tags || []),
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
                                      });
                                      toast.success(
                                        `Oferta wyświetli się w ${category.title} oraz ${job.title}.`,
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

                                      setConfigurationOpen(false);
                                      setCategory({
                                        title: "",
                                        url: "",
                                      });
                                      setSlug({
                                        title: "",
                                        url: "",
                                      });
                                    }
                                  }}
                                  className="h-[40px] sm:h-[50px] bg-gradient-to-b from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 rounded-md text-white font-light px-[0.5rem] sm:px-[1rem] text-xs sm:text-sm md:text-base"
                                  key={i}
                                >
                                  {job.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="my-3">
          <h3 className="font-extrabold text-lg">Nazwa usługi</h3>
          <div className="relative w-full">
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {project?.name?.length}/50
            </div>
            <input
              type="text"
              value={project?.name || ""}
              maxLength={50}
              onChange={(e) =>
                setProject({
                  ...project,
                  name: e.target.value,
                })
              }
              placeholder="Wpisz nazwę..."
              className={`${
                light ? "bg-white text-black" : "bg-gray-700 text-white"
              } duration-300 border border-primaryStart/70 rounded-md p-2 w-full`}
            />
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute right-2 bottom-2">
            {project?.desc?.length}/300
          </div>
          <h3 className="font-extrabold text-lg">Opis usługi</h3>
          <textarea
            value={project?.desc || ""}
            maxLength={300}
            onChange={(e) =>
              setProject({
                ...project,
                desc: e.target.value,
              })
            }
            placeholder="Wpisz opis..."
            className={`${
              light ? "bg-white text-black" : "bg-gray-700 text-white"
            } h-[150px] duration-300 border border-primaryStart/70 rounded-md p-2 w-full resize-none`}
          ></textarea>
        </div>

        <div className="w-full sm:w-[300px] mt-3">
          <div>
            <h3 className="font-extrabold text-lg">Płatność</h3>
            <select
              value={project?.time}
              onChange={(e) =>
                setProject({
                  ...project,
                  time: e.target.value,
                })
              }
              className={`${
                light ? "bg-white text-black" : "bg-gray-700 text-white"
              }  duration-300 border border-primaryStart/70 rounded-md p-2 w-full`}
            >
              <option value="Nie podano">Nie wybrano...</option>
              <option value="Stawka godzinowa">Stawka godzinowa</option>
              <option value="Stawka miesięczna">Stawka miesięczna</option>
              <option value="Per Milestone">Per Milestone</option>
              <option value="Płatność z góry">Płatność z góry</option>
              <option value="Płatność przed i po">Płatność przed i po</option>
              <option value="Do ustalenia">Do ustalenia</option>
            </select>
          </div>
          <InputField
            light={light}
            id="salaryValue"
            label="Cena"
            value={project?.salaryValue || ""}
            onChange={(e) =>
              setProject({
                ...project,
                salaryValue: e.target.value,
              })
            }
            placeholder="Wpisz wynagrodzenie..."
          />
        </div>
      </div>

      <div>
        <InputField
          light={light}
          id="duration"
          label="Czas wykonania"
          value={project?.duration || ""}
          onChange={(e) =>
            setProject({
              ...project,
              duration: e.target.value,
            })
          }
          placeholder="Czas wykonania"
        />
      </div>

      {project?.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3">
          {project?.images?.map((item: any, i: any) => (
            <div key={i}>
              <div className="relative flex flex-col">
                <Image
                  src={item?.src}
                  width={1920}
                  height={1920}
                  alt="image"
                  className=" w-full h-auto border-[2px] border-zinc-700 rounded-t-lg"
                />
                {isImageDescriptionOpen === i && (
                  <div>
                    <div className="relative">
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {project?.name?.length}/30
                      </div>
                      <input
                        type="text"
                        maxLength={25}
                        value={project?.images[i]?.desc || ""}
                        placeholder="Co przedstawia obraz?"
                        onChange={(e) => {
                          setProject({
                            ...project,
                            images: project?.images.map(
                              (item: any, index: any) =>
                                index === i
                                  ? {
                                      ...item,
                                      desc: e.target.value,
                                    }
                                  : item
                            ),
                          });
                        }}
                        className={`${
                          light
                            ? "bg-white text-black"
                            : "bg-gray-700 text-white"
                        } duration-300 border border-primaryStart/70 p-2 w-full`}
                      />
                    </div>
                    <button
                      className="w-full py-2 rounded-b-lg bg-gradient-to-r from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 text-white"
                      onClick={() => {
                        setImageDescriptionOpen(-1);
                        toast.success("Pomyślnie dodano opis!", {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                        });
                      }}
                    >
                      Ok
                    </button>
                  </div>
                )}
                <button
                  className="absolute top-2 right-2 bg-gradient-to-r from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 rounded-full p-2 text-white"
                  onClick={() => {
                    setProject({
                      ...project,
                      images: project?.images.filter(
                        (item: any, index: any) => index !== i
                      ),
                    });
                    toast.success("Pomyślnie usunięto obraz!", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                    });
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              {isImageDescriptionOpen !== i && (
                <button
                  onClick={() => setImageDescriptionOpen(i)}
                  className="w-full bg-gradient-to-b p-3 rounded-b-md from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 text-white"
                >
                  Opisz obraz
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        disabled={user?.tokens < 10 || loading || sent}
        onClick={() => {
          if (!user?.access) {
            return toast.error("Brak dostępu", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
          if (project?.name && project?.desc && project?.tags?.length > 0) {
            handleRecruitmentStart();
          } else {
            toast.error("Uzupełnij wszystkie pola!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        }}
        className={`${
          !sent
            ? "disabled:from-gray-500 disabled:to-gray-500"
            : "disabled:from-ctaStart disabled:to-ctaEnd"
        } rounded-md bg-gradient-to-r from-ctaStart to-primaryStart disabled:cursor-not-allowed w-max left-0 bg-cta text-white py-[0.4rem] px-[0.8rem] mt-3`}
      >
        {sent && <div>Dodano pomyślnie!</div>}
        {!loading && !sent && <div>Dodaj usługę (💎10,00)</div>}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="loading loading-spinner w-7 h-7"></div>
            Dodawanie...
          </div>
        )}
      </button>
      {user?.tokens > 10 && (
        <div className="text-cta text-sm mt-2 font-extrabold">
          Twoje saldo wynosi 💎{user?.tokens?.toFixed(2)}
        </div>
      )}
      {user?.tokens < 10 && (
        <div className="flex flex-col gap-2">
          <div className="text-red-500 text-sm mt-2">
            Niewystarczająca ilość Quixies
          </div>
        </div>
      )}
      <ImagePicker handler={uploadImages} />
    </div>
  );
}
