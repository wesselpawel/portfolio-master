"use client";
import { JobOffer } from "@/types";
import React, { useEffect, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Viewer from "./AddJobOffer/Viewer";
import Image from "next/image";
import moment from "moment";
import "moment/locale/pl";
import { BsClipboardCheck } from "react-icons/bs";
import { MdOutlineChecklist } from "react-icons/md";
import { AiOutlineCode } from "react-icons/ai";
import { FaRegSmileBeam } from "react-icons/fa";
import { GiGiftOfKnowledge } from "react-icons/gi";
import Link from "next/link";
import { useSelector } from "react-redux";
import RecruitmentForm from "./RecruitmentForm";
const JobOfferCard = ({ job }: { job: JobOffer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    file: "",
  });
  const userData = useSelector((state: any) => state.user.user);
  useEffect(() => {
    userData &&
      setFormState({
        ...formState,
        name: userData.name,
        email: userData.email,
      });
  }, []);

  const nettoPreferences = [
    "Umowa zlecenie",
    "Umowa o dzieło",
    "Kontrakt B2B",
    "Praca dodatkowa",
    "Jednorazowe zlecenie",
    "Freelance",
  ];

  const hasNetto = job.preferences.some((p) => nettoPreferences.includes(p));
  const hasBrutto = job.preferences.some((p) => !nettoPreferences.includes(p));
  return (
    <div className="w-full border border-gray-300 rounded-md shadow-sm font-sans">
      {/* Collapsed Header */}
      <div
        className="flex-col relative p-4 flex justify-between cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-t-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col 2xl:flex-row-reverse w-full lg:justify-between">
          <div className="text-gray-500 text-xs font-extralight 2xl:mt-2">
            Opublikowana: {moment(job.creationTime).format("DD MMMM YYYY")}
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg lg:text-xl font-extrabold text-gray-800">
              {job.title}
            </h2>
            <span className="text-sm font-medium text-gray-800">
              {job.level}
            </span>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <div className="w-16 h-auto relative">
            {job.logo ? (
              <div className="relative overflow-hidden w-16 h-16">
                <Image
                  src={job.logo}
                  width={133}
                  height={133}
                  alt={`Logo firmy ${job.name}`}
                  className="absolute inset-0 object-cover w-full h-auto top-1/2 -translate-y-1/2 rounded-md"
                />
              </div>
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

      {/* Expanded Content */}
      {isExpanded && (
        <div className="overflow-y-scroll h-[60vh] scrollbar bg-white w-full">
          <div>
            {/* Specializations */}
            <div className="p-4">
              {job.specializations.length > 0 && (
                <div className="w-full relative border border-gray-300 rounded-md">
                  <div className="rounded-tl-md rounded-br-xl w-max bg-gradient-to-b px-3 py-1.5 from-ctaStart to-ctaEnd text-white text-sm">
                    SPECJALIZACJE
                  </div>

                  <div className="flex flex-wrap p-[1rem]">
                    {job.specializations.map((spec: string, idx: number) => (
                      <div
                        className="text-sm lg:text-base rounded-md text-black flex items-center"
                        key={idx}
                      >
                        {spec}{" "}
                        {job.specializations.length !== idx + 1 && (
                          <div className="w-2 h-2 bg-ctaStart rounded-full mx-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Salary Section */}
              {/* Salary Section */}
              <div className="mt-4 w-full relative border border-gray-300 rounded-md">
                <div className="rounded-tl-md rounded-br-xl w-max bg-gradient-to-b px-3 py-1.5 from-ctaStart to-ctaEnd text-white text-sm">
                  WYNAGRODZENIE
                </div>
                <div className="flex flex-col gap-4 p-4">
                  {hasNetto && (
                    <div>
                      <h4 className="text-black text-xs mb-1">
                        {job.preferences
                          .filter((p) => nettoPreferences.includes(p))
                          .join(", ")}
                      </h4>
                      <p className="text-gray-800 font-medium">
                        {job.salaryValueNettoFrom} zł - {job.salaryValueNettoTo}{" "}
                        zł
                        <span className="text-gray-500 text-sm">
                          {" "}
                          +VAT (NETTO)
                        </span>
                      </p>
                    </div>
                  )}

                  {hasBrutto && (
                    <div>
                      <h4 className="text-black text-xs mb-1">
                        {job.preferences
                          .filter((p) => !nettoPreferences.includes(p))
                          .join(", ")}
                      </h4>
                      <p className="text-gray-800 font-medium">
                        {job.salaryValueBruttoFrom} zł -{" "}
                        {job.salaryValueBruttoTo} zł
                        <span className="text-gray-500 text-sm"> (BRUTTO)</span>
                      </p>
                    </div>
                  )}

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

            {/* Description */}
            <div className="text-sm sm:text-base md:text-lg px-[1rem] py-[0.5rem]">
              <Viewer value={job.description} displayBlack lg />
            </div>

            {/* Requirements and Responsibilities */}
            <div className="grid grid-cols-1 w-full gap-6 p-[1rem]">
              {/* Requirements */}
              {job.requirements.length > 0 && (
                <div className="border border-gray-300 rounded-md">
                  <h3 className="flex justify-center items-center font-sans font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-primaryHoverEnd">
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
                  <h3 className="flex justify-center items-center font-sans font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-primaryHoverEnd">
                    <BsClipboardCheck className="text-2xl mr-2" />
                    Obowiązki
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                    className="px-4"
                  ></div>
                </div>
              )}

              {/* Technologies */}
              {job.technologies.length > 0 && (
                <div>
                  <div className="border border-gray-300 rounded-md">
                    <h3 className="flex justify-center items-center font-sans font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-primaryHoverEnd">
                      <AiOutlineCode className="text-3xl mr-2" />
                      Technologie
                    </h3>
                    <div className="p-3 flex flex-wrap gap-1">
                      {job.technologies.map((tech: string, idx: number) => (
                        <div
                          className="text-sm lg:text-base px-3 py-1 rounded-md text-white bg-gradient-to-b from-zinc-700 to-primaryHoverEnd"
                          key={idx}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Responsibilities */}
              {job.niceToHave.length > 0 && (
                <div>
                  <div className="border border-gray-300 rounded-md">
                    <h3 className="flex justify-center items-center font-sans font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-primaryHoverEnd">
                      <FaRegSmileBeam className="text-2xl mr-2" />
                      Mile widziane
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: job.niceToHave }}
                      className="px-4"
                    ></div>
                  </div>
                </div>
              )}
              {/* Responsibilities */}
              {job.weOffer.length > 0 && (
                <div>
                  <div className="border border-gray-300 rounded-md">
                    <h3 className="flex justify-center items-center font-sans font-light rounded-t-md px-4 py-2 sm:text-xl md:text-2xl text-white bg-gradient-to-r from-ctaStart to-primaryHoverEnd">
                      <GiGiftOfKnowledge className="text-2xl mr-2" />
                      Oferujemy
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: job.weOffer }}
                      className="px-4"
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Call-to-Action Button */}
          <div className="mt-4 bg-gradient-to-r from-primaryStart/20 to-ctaEnd/20 border-t border-gray-300 sticky bottom-0 left-0 w-full flex justify-center backdrop-blur-md">
            {userData && !applyOpen && (
              <div className="p-4">
                <button
                  onClick={() => setApplyOpen(true)}
                  className="text-white px-6 py-2 rounded-md bg-gradient-to-r from-ctaStart to-ctaEnd hover:from-ctaStart/80 hover:to-ctaEnd/80 transition duration-300"
                >
                  Aplikuj
                </button>
              </div>
            )}
            {!userData && (
              <div className="p-4">
                <Link
                  href="/register"
                  target="_blank"
                  className="text-white px-6 py-2 rounded-md bg-gradient-to-r from-ctaStart to-ctaEnd hover:from-ctaStart/80 hover:to-ctaEnd/80 transition duration-300"
                >
                  Stwórz konto i aplikuj
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {applyOpen && (
        <div>
          <div className="p-[2rem] bg-[#222430] rounded-t-lg fixed bottom-0 left-1/2 -translate-x-1/2 max-h-[80vh] overflow-y-auto scrollbar w-full lg:max-w-lg z-[50]">
            <RecruitmentForm
              formState={formState}
              setFormState={setFormState}
              uid={job.uid}
              companyName={job.name}
              setApplyOpen={setApplyOpen}
              user={userData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobOfferCard;
