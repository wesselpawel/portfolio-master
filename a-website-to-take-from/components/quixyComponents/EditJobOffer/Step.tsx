"use client";
import { toast } from "react-toastify";
import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import JobPreferencesHandler from "../JobOfferPreferencesHandler";
import JobSpecializations from "../JobSpecializations";
import EditorWeOffer from "./EditorWeOffer";
import EditorRequirements from "./Requirements";
export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: any;
  setSource?: any;
  source?: any;
  setChangesWereMade?: any;
}

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];

export default function StepOne({
  formData,
  handleChange,
  nextStep,
  currentStep,
  tagsOpenLevel,
  setTagDeletion,
  selectedTag,
  setSelectedTag,
  tagDeletion,
  configurationOpen,
  setConfigurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
  jobs,
  user,
  setFormData,
  setTagsOpenLevel,
  job,
  setJob,
  light,
}: {
  formData: any;
  handleChange: any;
  nextStep: any;
  currentStep: number;
  tagsOpenLevel: any;
  setTagDeletion: any;
  selectedTag: any;
  setSelectedTag: any;
  tagDeletion: any;
  configurationOpen: any;
  setConfigurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  jobs: any;
  user: any;
  setFormData: any;
  setTagsOpenLevel: any;
  job: any;
  setJob: any;
  light: any;
}) {
  function addPreference(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      preferences: [...(prevFormData?.preferences || []), preference],
    }));
  }
  function removePreference(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      preferences:
        prevFormData?.preferences?.filter((p: any) => p !== preference) || [],
    }));
  }
  function addJobPreference(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      specializations: [...(prevFormData?.specializations || []), preference],
    }));
  }
  function removeJobPreference(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      specializations:
        prevFormData?.specializations?.filter((p: any) => p !== preference) ||
        [],
    }));
  }
  return (
    <div
      className={`${
        currentStep === 1
          ? "-translate-y-[0]"
          : "translate-y-[-500vh] h-px overflow-hidden"
      }`}
    >
      <div className="-mt-3"></div>
      <InputField
        light={light}
        id="title"
        label="Tytuł"
        value={formData.title}
        onChange={handleChange}
        placeholder="Wpisz tytuł ogłoszenia o pracę..."
      />
      <div>
        {!formData?.job && (
          <CategorySelector
            setConfigurationOpen={setConfigurationOpen}
            slug={slug}
            setSlug={setSlug}
            category={category}
            setCategory={setCategory}
            jobs={jobs}
            job={job}
            setJob={setJob}
          />
        )}
        {formData?.job && (
          <div>
            <p className={`font-extrabold text-lg mb-2`}>Kategoria</p>
            <div className="text-white bg-gradient-to-r from-ctaStart to-primaryEnd rounded-md w-max max-w-full py-2 px-[0.7rem]">
              {formData.job}
            </div>
          </div>
        )}
        <div className="mt-2"></div>
        <p className="font-extrabold text-lg">Treść oferty</p>
        <div className="rounded-md">
          <ReactQuill
            theme="snow"
            placeholder={!formData?.description ? "Wpisz tekst" : ""}
            className={`border rounded-md border-primaryStart/70 text-black bg-white w-full max-w-[500px] sm:max-w-[600px] md:max-w-[750px] xl:max-w-[600px] 2xl:max-w-[850px]`}
            modules={{
              toolbar: {
                container: TOOLBAR_OPTIONS,
              },
            }}
            value={formData?.description}
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e,
              });
            }}
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="font-extrabold text-lg">Wymagania</div>
          <p className="text-xs mt-px">(opcjonalnie)</p>
        </div>
        <EditorRequirements formData={formData} setFormData={setFormData} />
        <JobPreferencesHandler
          addPreference={addPreference}
          removePreference={removePreference}
          formData={formData}
          light={light}
        />
        <JobSpecializations
          addPreference={addJobPreference}
          removePreference={removeJobPreference}
          formData={formData}
          light={light}
        />
        <button
          type="button"
          onClick={() => {
            if (
              (formData?.category || category) &&
              (formData?.slug || slug) &&
              (formData?.job || job) &&
              formData?.description &&
              formData?.title &&
              formData?.preferences?.length
            ) {
              nextStep();
            } else {
              return toast.error("Uzupełnij dane!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          }}
          className="rounded-md px-4 py-2 bg-gradient-to-b from-ctaStart to-ctaEnd hover:scale-105 duration-100 text-white "
        >
          Następny krok
        </button>
      </div>
    </div>
  );
}
