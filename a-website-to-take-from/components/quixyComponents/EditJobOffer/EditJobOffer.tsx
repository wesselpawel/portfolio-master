"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import jobs from "../../../public/14.09.2024.json";
import StepThree from "./Step3";
import StepTwo from "./Step2";
import StepOne from "./Step";
import { JobOffer } from "@/types";
import { useSelector } from "react-redux";
import MultiStepFormIndicator from "./MultiStepFormIndicator";
import StepFour from "./Step4";
export default function EditJobOffer({
  jobOffer,
  closeEdit,
}: {
  jobOffer: JobOffer;
  closeEdit: any;
}) {
  const { user } = useSelector((state: any) => state.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobOffer>(jobOffer);
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
  const [isSent, setIsSent] = useState(false);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const { light } = useSelector((state: any) => state.light);
  return (
    <>
      <div className="font-sans relative overflow-hidden min-h-screen flex flex-col items-center mx-3 lg:mx-6  py-6">
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <button onClick={closeEdit} className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </button>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Edytuj ogłoszenie</h2>
            <p className="text-xs font-sans">Zmień ofertę pracy i opublikuj</p>
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
                <h1 className="absolute left-0 top-0 rounded-tl-md rounded-br-3xl px-4 py-2 text-white bg-gradient-to-b from-primaryStart to-primaryEnd text-xl md:text-2xl font-gotham font-bold">
                  Edytujesz ofertę pracy
                </h1>
                <div className="flex flex-col w-full font-sans mt-10">
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
                    handleChange={handleChange}
                    currentStep={currentStep}
                    setFormData={setFormData}
                    user={user}
                    formData={formData}
                    isSent={isSent}
                    setIsSent={setIsSent}
                    slug={slug}
                    category={category}
                    job={job}
                    closeEdit={closeEdit}
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
