import { useState } from "react";
import { InputField } from "./InputField";
import ReactConfetti from "react-confetti";
import { addJobOffer, updateUser } from "@/common/firebase/quixy";
import { storage } from "@/common/firebase/firebase";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { JobOffer } from "@/types";
import { setUser } from "@/common/redux/slices/user";
import { set_modals } from "@/common/redux/slices/modalsopen";
import Link from "next/link";
import { FaChevronRight, FaCirclePlus, FaImage } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
export default function StepFour({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  setFormData,
  user,
  InitialData,
  isAnimating,
  setIsAnimating,
  isSent,
  setIsSent,
  slug,
  category,
  job,
}: {
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
  setFormData: any;
  user: any;
  InitialData: any;
  isAnimating: any;
  setIsAnimating: any;
  isSent: any;
  setIsSent: any;
  slug: any;
  category: any;
  job: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const addOffer = async () => {
    try {
      setIsLoading(true);

      const jobOfferId = uuid();
      const newJobOffer: JobOffer = {
        ...formData,
        id: jobOfferId,
        creationTime: Date.now(),
        isPaid: user?.tokens >= formData?.price,
        slug: slug,
        category: category,
        job: job,
        uid: user.uid,
      };
      if (user?.tokens >= formData?.price) {
        await addJobOffer(newJobOffer);
      }
      const updatedJobOffers = user.job_offers
        ? [...user.job_offers, newJobOffer]
        : [newJobOffer];

      // Update the user in the database
      await updateUser(user.uid, {
        job_offers: updatedJobOffers,
        tokens: user?.tokens - formData?.price,
      });

      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
          tokens: user?.tokens - formData?.price,
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
          <div className="mt-3 flex flex-col rounded-md">
            <div
              className={`${
                light
                  ? "bg-gradient-to-b from-zinc-700/30 to-zinc-800/30 text-black"
                  : "bg-gradient-to-b from-primaryStart/30 to-primaryEnd/30 text-white"
              } rounded-lg p-3 lg:p-4`}
            >
              <label htmlFor="days-range" className="font-bold">
                Przez jaki okres czasu oferta ma być wyświetlana? (
                {formData.days} dni)
              </label>

              <input
                id="days-range"
                type="range"
                min="1"
                max="90"
                value={formData?.days || 1}
                onChange={(e: any) => {
                  const days = e.target.value;
                  const basePrice = 15.99 + 8.42; // Cena za 1 dzień
                  const priceForSelectedDays = 15.99 + days * 8.42; // Cena za wybraną liczbę dni
                  const discount =
                    100 - (priceForSelectedDays / (basePrice * days)) * 100;
                  setFormData({
                    ...formData,
                    days,
                    price: priceForSelectedDays,
                    discount: discount.toFixed(2),
                  });
                }}
                className="w-full"
              />

              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, quixies: true }))
                }
                className="text-white text-lg font-bold mt-2 px-2 py-1 rounded-md bg-gradient-to-b from-accentStart to-accentEnd w-max"
              >
                💎{formData.price?.toFixed(2)}
              </button>
              {formData.days > 1 && (
                <div
                  className={`${
                    light ? "text-gray-700" : "text-gray-300"
                  } text-sm mt-2`}
                >
                  Oszczędzasz {formData.discount}% w porównaniu z ceną za jeden
                  dzień!
                </div>
              )}
            </div>
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
              <Link
                className="px-4 py-2 rounded-md hover:scale-105 duration-100 bg-gradient-to-b from-ctaStart to-ctaEnd text-white flex items-center"
                href="/user/job_offers"
              >
                Moje oferty <FaChevronRight />
              </Link>
            )}
            {user?.tokens < formData.price && (
              <div>
                <div>
                  {!isSent && (
                    <button
                      disabled={isSent}
                      onClick={async () => {
                        // setIsAnimating(true);
                        // setIsSent(true);
                        // await handleRecruitmentStart();
                      }}
                      className="font-bold  animate-pulse flex items-center px-4 py-2 rounded-md bg-gradient-to-b from-ctaStart to-ctaEnd text-white"
                    >
                      <FaSave className="mr-2" />{" "}
                      {isLoading ? "Wczytywanie..." : "Zapisz zmiany"}
                    </button>
                  )}
                </div>
              </div>
            )}
            {user?.tokens >= formData.price && (
              <div>
                <div>
                  {!isSent && (
                    <button
                      disabled={isSent}
                      onClick={async () => {
                        setIsAnimating(true);
                        setIsSent(true);
                        await addOffer();
                      }}
                      className="font-bold  animate-pulse flex items-center px-4 py-2 rounded-md bg-gradient-to-b from-ctaStart to-ctaEnd text-white"
                    >
                      <FaCirclePlus className="mr-2" />{" "}
                      {isLoading ? "Wczytywanie..." : "Dodaj ofertę"}
                    </button>
                  )}
                </div>
              </div>
            )}
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
