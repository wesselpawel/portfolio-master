import { deleteJobOffer, updateUser } from "@/common/firebase/quixy";
import Viewer from "../AddJobOffer/Viewer";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/common/redux/slices/user";
import OfferOptionsOpened from "./OfferOptionsOpened";
import JobOfferDetails from "./JobOfferDetails";
import Image from "next/image";
import { BsBuildings, BsClipboardCheck } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import moment from "moment";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { FaRegSmileBeam } from "react-icons/fa";
import { AiOutlineCode } from "react-icons/ai";
import { MdOutlineChecklist } from "react-icons/md";
export default function Posting({
  job,
  loading,
  pay,
  setEditOpen,
  setOpenedJobOffer,
}: {
  job: any;
  loading: any;
  pay: any;
  setEditOpen: any;
  setOpenedJobOffer: any;
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleDeleteJobOffer = async (jobOfferId: string) => {
    try {
      // Delete job offer from the collection
      await deleteJobOffer(jobOfferId);

      // Update the user's job offers by removing the deleted one
      const updatedJobOffers = user.job_offers.filter(
        (offer: any) => offer.id !== jobOfferId
      );

      // Update user in the database
      await updateUser(user.uid, { job_offers: updatedJobOffers });

      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
        })
      );

      toast.success("Pomyślnie usunięto ofertę.");
      setOptionsOpen(false);
      setDeleteMenu(false);
    } catch (error) {
      toast.error("Przepraszamy! Wystąpił błąd.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const { light } = useSelector((state: any) => state.light);
  return (
    <div>
      <div
        className={`font-sans h-[50vh] overflow-y-scroll scrollbar rounded-lg shadow-md ${
          light ? "bg-white text-black" : "bg-[#222430] text-white"
        }`}
      >
        <div className="p-4 relative">
          <OfferOptionsOpened
            setDeleteMenu={setDeleteMenu}
            deleteMenu={deleteMenu}
            optionsOpen={optionsOpen}
            setEditOpen={setEditOpen}
            setOptionsOpen={setOptionsOpen}
            handleDeleteJobOffer={handleDeleteJobOffer}
            jobOffer={job}
            setOpenedJobOffer={setOpenedJobOffer}
          />
          <JobOfferDetails
            setOptionsOpen={setOptionsOpen}
            pay={pay}
            optionsOpen={optionsOpen}
            loading={loading}
            jobOffer={job}
          />
          <h2 className="text-lg mb-3 font-extrabold">
            Wygląd oferty na liście
          </h2>
          <div className="flex-col relative p-4 flex justify-between bg-gray-100 rounded-md">
            <div className="flex flex-col lg:flex-row-reverse w-full lg:justify-between">
              <div className="text-gray-500 text-xs font-light">
                Opublikowana: {moment(job.creationTime).format("DD MMMM YYYY")}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-800">
                {job.title}
              </h2>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-16 h-auto relative">
                {job.logo ? (
                  <Image
                    src={job.logo}
                    width={133}
                    height={133}
                    alt={`Logo firmy ${job.name}`}
                    className="w-[90%] h-auto group-hover:scale-110 duration-500"
                  />
                ) : (
                  <div className="border-2 border-gray-300 rounded-md p-2 flex justify-center text-4xl text-gray-400/60">
                    <BsBuildings />
                  </div>
                )}
              </div>
              <div className="flex flex-col pl-3">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
                  {job.name}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  <IoLocationOutline className="inline-block mr-1 text-gray-500" />
                  {job.city}, {job.region}
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-lg my-3 font-extrabold">
            Wygląd oferty po otwarciu
          </h2>
          <div className="relative w-full">
            <div className="bg-white rounded-md w-full p-[1rem]">
              <div>
                {/* Specializations */}
                <div>
                  {job.specializations.length > 0 && (
                    <div className="rounded-md w-full relative border border-gray-300">
                      <div className="rounded-tl-md rounded-br-xl w-max bg-gradient-to-b px-3 py-1.5 from-ctaStart to-ctaEnd text-white text-sm">
                        SPECJALIZACJE
                      </div>
                      <div className="flex flex-wrap p-[1rem]">
                        {job.specializations.map(
                          (spec: string, idx: number) => (
                            <div
                              className="text-sm lg:text-base rounded-md text-black flex items-center"
                              key={idx}
                            >
                              {spec}{" "}
                              {job.specializations.length !== idx + 1 && (
                                <div className="w-2 h-2 bg-ctaStart rounded-full mx-2" />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {/* Salary Section */}
                  <div className="mt-4 w-full relative border border-gray-300 rounded-md">
                    <div className="rounded-tl-md rounded-br-xl w-max bg-gradient-to-b px-3 py-1.5 from-ctaStart to-ctaEnd text-white text-sm">
                      WYNAGRODZENIE
                    </div>
                    <div className="flex flex-col gap-[1rem] p-[1rem]">
                      <div>
                        {job.preferences.filter((p: string) =>
                          [
                            "Umowa zlecenie",
                            "Umowa o dzieło",
                            "Kontrakt B2B",
                            "Praca dodatkowa",
                            "Jednorazowe zlecenie",
                            "Freelance",
                          ].includes(p)
                        )?.length > 0 && (
                          <div>
                            <h4 className="text-black text-xs font-semibold mb-1">
                              {job.preferences
                                .filter(
                                  (preference: string) =>
                                    ![
                                      "Staż",
                                      "Praktyki",
                                      "Pełny etat",
                                      "Część etatu",
                                      "Umowa o pracę",
                                    ].includes(preference)
                                )
                                .map((item: string) => item)
                                .join(", ")}{" "}
                            </h4>
                            <p className="text-gray-800 font-medium">
                              {job.salaryValueNettoFrom} zł -{" "}
                              {job.salaryValueNettoTo} zł{" "}
                              <span className="text-gray-500 text-sm">
                                (+VAT)
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        {job.preferences.filter(
                          (item: string) =>
                            ![
                              "Umowa zlecenie",
                              "Umowa o dzieło",
                              "Kontrakt B2B",
                              "Praca dodatkowa",
                              "Jednorazowe zlecenie",
                              "Freelance",
                            ].includes(item)
                        ).length > 0 && (
                          <div>
                            <h4 className="text-black text-xs font-semibold mb-1">
                              {job.preferences
                                .filter(
                                  (item: string) =>
                                    ![
                                      "Umowa zlecenie",
                                      "Umowa o dzieło",
                                      "Kontrakt B2B",
                                      "Praca dodatkowa",
                                      "Jednorazowe zlecenie",
                                      "Freelance",
                                    ].includes(item)
                                )
                                .join(", ")}{" "}
                              Brutto
                            </h4>
                            <p className="text-gray-800 font-medium">
                              {job.salaryValueBruttoFrom} zł -{" "}
                              {job.salaryValueBruttoTo} zł
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        {job.salary && (
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-black">
                              Rodzaj wynagrodzenia
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {job.salary}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div className="text-sm sm:text-base md:text-lg mt-6">
                  <Viewer value={job.description} displayBlack lg />
                </div>

                {/* Requirements and Responsibilities */}
                <div className="grid grid-cols-1 w-full gap-4 mt-6">
                  {/* Requirements */}
                  {job.requirements.length > 0 && (
                    <div className="border border-gray-300 rounded-md">
                      <h3 className="flex justify-center items-center  font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-zinc-800">
                        <MdOutlineChecklist className="text-2xl mr-2" />
                        Wymagania
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: job.requirements }}
                        className="px-4"
                      ></div>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {job.responsibilities.length > 0 && (
                    <div className="border border-gray-300 rounded-md">
                      <h3 className="flex justify-center items-center  font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-zinc-800">
                        <BsClipboardCheck className="text-2xl mr-2" />
                        Obowiązki
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: job.responsibilities,
                        }}
                        className="px-4"
                      ></div>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {job.technologies.length > 0 && (
                  <div className="mt-4 border border-gray-300 rounded-md">
                    <h3 className="flex justify-center items-center  font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-zinc-800">
                      <AiOutlineCode className="text-3xl mr-2" />
                      Technologie
                    </h3>
                    <div className="p-3 flex flex-wrap gap-1">
                      {job.technologies.map((tech: string, idx: number) => (
                        <div
                          className="text-sm lg:text-base px-3 py-1 rounded-md text-white bg-gradient-to-b from-zinc-700 to-zinc-800"
                          key={idx}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Responsibilities */}
                {job.niceToHave.length > 0 && (
                  <div className="border border-gray-300 rounded-md mt-4">
                    <h3 className="flex justify-center items-center  font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-zinc-800">
                      <FaRegSmileBeam className="text-2xl mr-2" />
                      Mile widziane
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: job.niceToHave }}
                      className="px-4"
                    ></div>
                  </div>
                )}
                {/* Responsibilities */}
                {job.weOffer.length > 0 && (
                  <div className="border border-gray-300 rounded-md mt-4">
                    <h3 className="flex justify-center items-center  font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-zinc-800">
                      <GiGiftOfKnowledge className="text-2xl mr-2" />
                      Oferujemy
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: job.weOffer }}
                      className="px-4"
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
