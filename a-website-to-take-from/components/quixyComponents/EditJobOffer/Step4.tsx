import { useState } from "react";
import { InputField } from "./InputField";
import ReactConfetti from "react-confetti";
import { addJobOffer, updateUser } from "@/common/firebase/quixy";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { JobOffer } from "@/types";
import { setUser } from "@/common/redux/slices/user";
import { set_modals } from "@/common/redux/slices/modalsopen";
import Link from "next/link";
import {
  FaChevronRight,
  FaCircleCheck,
  FaCirclePlus,
  FaImage,
} from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { storage } from "@/common/firebase/firebase";
export default function StepFour({
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  setFormData,
  user,
  isSent,
  setIsSent,
  slug,
  category,
  job,
  formData,
  closeEdit,
}: {
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
  setFormData: any;
  user: any;
  isSent: any;
  setIsSent: any;
  slug: any;
  category: any;
  job: any;
  formData: any;
  closeEdit: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const editOffer = async () => {
    try {
      setIsLoading(true);
      const updatedJobOffers = user.job_offers?.map((jobOffer: any) =>
        jobOffer.id === formData.id ? formData : jobOffer
      ) || [formData];
      await updateUser(user.uid, {
        job_offers: updatedJobOffers,
      });
      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { modals } = useSelector((state: any) => state.modals);
  // Open token modal for insufficient tokens

  const openTokenModal = () => {
    dispatch(set_modals({ ...modals, quixies: true }));
  };

  // Helper functions to show toast notifications
  const showToastSuccess = (message: string) => {
    toast.success(message);
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
  const [loading, setLoading] = useState<any>(false);
  async function upload(file: any) {
    setLoading(true);
    const randId = uuid();
    const imageRef = ref(storage, randId);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    setFormData({
      ...formData,
      logo: url,
    });

    setLoading(false);
  }
  const { light } = useSelector((state: any) => state.light);
  return (
    <div>
      {currentStep === 4 && (
        <div>
          <InputField
            id="website"
            label="Formularz zewnętrzny"
            text="*Kandydaci zostaną przekierowani do formularza po naciśnięciu `aplikuj` (opcjonalnie)"
            value={formData.website}
            onChange={handleChange}
            placeholder="Podaj link"
            light={light}
          />

          <div className="mt-3">
            <h2 className="font-bold">Logo firmy</h2>
            <label htmlFor="uploader3" className="relative group">
              {!formData.logo && !loading ? (
                <div className="cursor-pointer max-w-24 max-h-24 aspect-square  rounded-md border border-zinc-700/30 p-3 flex items-center justify-center">
                  <FaImage />
                </div>
              ) : (
                <div className="relative cursor-pointer max-w-24 max-h-24 aspect-square  rounded-md border border-zinc-700/30 p-3 flex items-center justify-center">
                  {!loading && formData?.logo && (
                    <Image
                      src={formData.logo}
                      width={124}
                      height={124}
                      alt="logo"
                      className="absolute inset-0 object-cover w-auto max-h-[90%] mx-auto my-auto"
                    />
                  )}
                  {loading && (
                    <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full border-b-2 border-gray-900 h-12 w-12"></div>
                    </div>
                  )}
                </div>
              )}
            </label>
          </div>
          <div className="flex mt-4 gap-3">
            <button
              disabled={isSent}
              onClick={prevStep}
              className="disabled:bg-gray-500 px-4 rounded-md hover:scale-105 duration-100 py-2 bg-black text-white"
            >
              Wstecz
            </button>

            {isSent && (
              <button
                className="px-4 py-2 rounded-md hover:scale-105 duration-100 bg-gradient-to-b from-ctaStart to-ctaEnd text-white flex items-center"
                onClick={closeEdit}
              >
                Moje oferty <FaChevronRight />
              </button>
            )}
            <div>
              <div>
                {!isSent && (
                  <button
                    disabled={isSent}
                    onClick={async () => {
                      setIsSent(true);
                      await editOffer();
                    }}
                    className="font-bold  animate-pulse flex items-center px-4 py-2 rounded-md bg-gradient-to-b from-ctaStart to-ctaEnd text-white"
                  >
                    <FaCircleCheck className="mr-2" />{" "}
                    {isLoading ? "Wczytywanie..." : "Zapisz zmiany"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e: any) => {
          const file = e.target.files[0];
          if (!file) return;
          const validType = file.type.startsWith("image/");
          const validSize = file.size <= 5 * 1024 * 1024;

          if (!validType || !validSize) {
            toast.error(
              "Tylko zdjęcia o rozmiarze do 5MB są dozwolone (kwadratowe lub 16:9)",
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
            return;
          }
          upload(file);
        }}
        id="uploader3"
        className="text-white hidden"
      />
    </div>
  );
}
