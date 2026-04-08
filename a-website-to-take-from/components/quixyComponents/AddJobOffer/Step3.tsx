"use client";
import { toast } from "react-toastify";
import TechnologySelector from "./TechnologySelector";
import JobPreferencesPlace from "../JobOfferPreferencesPlace";
import JobOfferCitiesPicker from "./JobOfferCitiesPicker";
import EditorNiceToHave from "./EditorNiceToHave";
import EditorResponsibilities from "./EditorResponsibilities";
import EditorWeOffer from "./EditorWeOffer";

export default function StepThree({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  setFormData,
  light,
}: {
  setFormData: any;
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
  light: boolean;
}) {
  return (
    <div className="w-full">
      {currentStep === 3 && (
        <>
          <div className="flex items-center gap-2 mt-3">
            <div className="font-extrabold">Oferujemy</div>
            <p className="text-xs mt-px">(opcjonalnie)</p>
          </div>
          <EditorWeOffer formData={formData} setFormData={setFormData} />
          <div className="flex items-center gap-2 mt-3">
            <div className="font-extrabold">Wymagania mile widziane</div>
            <p className="text-xs mt-px">(opcjonalnie)</p>
          </div>
          <EditorNiceToHave formData={formData} setFormData={setFormData} />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-md bg-black text-white hover:scale-105 duration-100"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={() => {
                nextStep();
              }}
              className="hover:scale-105 duration-100 p-2 bg-gradient-to-b from-ctaStart to-ctaEnd px-4 py-2 rounded-md text-white"
            >
              Następny krok
            </button>
          </div>
        </>
      )}
    </div>
  );
}
