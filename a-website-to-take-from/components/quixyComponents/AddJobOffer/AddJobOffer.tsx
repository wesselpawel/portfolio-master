"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import jobs from "../../../public/14.09.2024.json";
import StepThree from "./Step3";
import StepTwo from "./Step2";
import StepOne from "./Step";
import { JobOffer } from "@/types";
import ReactConfetti from "react-confetti";
import { useSelector } from "react-redux";
import MultiStepFormIndicator from "./MultiStepFormIndicator";
import StepFour from "./Step4";
export default function AddJobOffer() {
  const InitialData: JobOffer = {
    city: "",
    days: 1,
    description: "",
    email: "",
    isPaid: false,
    location: "",
    name: "",
    phone: "",
    places: [],
    preferences: [],
    price: 24.41,
    region: "",
    requirements: "",
    salary: "",
    salaryValue: "",
    salaryValueBruttoFrom: "",
    salaryValueBruttoTo: "",
    salaryValueNettoFrom: "",
    salaryValueNettoTo: "",
    specializations: [],
    tags: [],
    technologies: [],
    title: "",
    website: "",
    logo: "",
    niceToHave: "",
    responsibilities: "",
    weOffer: "",
    slug: "",
    category: "",
    job: "",
    creationTime: "",
    uid: "",
    level: "",
  };
  const { user } = useSelector((state: any) => state.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobOffer>(InitialData);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [job, setJob] = useState("");
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const { light } = useSelector((state: any) => state.light);
  return (
    <>
      {isAnimating && (
        <div className="z-50 fixed left-0 top-0 w-screen h-screen">
          <ReactConfetti />
        </div>
      )}
      <div className="font-sans relative overflow-hidden min-h-screen flex flex-col items-center mx-3 lg:mx-6  py-6">
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <Link href="/user" className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </Link>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Nowe ogłoszenie</h2>
            <p className="text-xs ">Skonfiguruj ofertę pracy i opublikuj</p>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row-reverse w-full max-w-full mt-3">
          <MultiStepFormIndicator
            steps={[
              { step: 1, title: "Treść" },
              { step: 2, title: "Szczegóły" },
              { step: 3, title: "Dodatki" },
              { step: 4, title: "Finalizacja" },
            ]}
            currentStep={currentStep}
          />
          <div className="flex flex-col w-full">
            <div
              className={`${
                light ? "bg-white text-black" : "bg-[#222430] text-white"
              } flex items-center w-full rounded-lg mt-3 xl:mt-0`}
            >
              <div className="rounded-md z-50 relative p-3 xl:p-6 overflow-hidden">
                <h1 className="absolute left-0 top-0 px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
                  NOWA OFERTA PRACY
                </h1>
                <p className="mt-12 text-sm ">
                  Podaj najważniejsze informacje dotyczące rekrutacji.
                </p>
                <div className="flex flex-col w-full ">
                  <StepOne
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    currentStep={currentStep}
                    tagsOpenLevel={tagsOpenLevel}
                    setTagsOpenLevel={setTagsOpenLevel}
                    setTagDeletion={setTagDeletion}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    tagDeletion={tagDeletion}
                    configurationOpen={configurationOpen}
                    setConfigurationOpen={setConfigurationOpen}
                    setSlug={setSlug}
                    slug={slug}
                    category={category}
                    job={job}
                    setCategory={setCategory}
                    jobs={jobs}
                    user={user}
                    setFormData={setFormData}
                    setJob={setJob}
                    light={light}
                  />
                  <StepTwo
                    setFormData={setFormData}
                    prevStep={prevStep}
                    nextStep={nextStep}
                    formData={formData}
                    handleChange={handleChange}
                    currentStep={currentStep}
                    light={light}
                  />
                  <StepThree
                    setFormData={setFormData}
                    prevStep={prevStep}
                    nextStep={nextStep}
                    formData={formData}
                    handleChange={handleChange}
                    currentStep={currentStep}
                    light={light}
                  />
                  <StepFour
                    prevStep={prevStep}
                    nextStep={nextStep}
                    formData={formData}
                    handleChange={handleChange}
                    currentStep={currentStep}
                    setFormData={setFormData}
                    user={user}
                    InitialData={InitialData}
                    setIsAnimating={setIsAnimating}
                    isAnimating={isAnimating}
                    isSent={isSent}
                    setIsSent={setIsSent}
                    slug={slug}
                    category={category}
                    job={job}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
