"use client";
import { useState, useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { updateUser } from "@/common/firebase/quixy"; // Assuming updateUser is imported from "@/common/firebase"
import Confetti from "react-confetti"; // Assuming react-confetti is installed
import { setUser } from "@/common/redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/common/redux/slices/modalsopen";
import { toast } from "react-toastify";

// MultiStepVerification Component
export default function MultiStepVerification({
  name,
  title,
  seek,
  configured,
  pseudo,
  user,
  isAnimating,
  setIsAnimating,
}: {
  name: any;
  title: any;
  seek: any;
  configured: any;
  pseudo: any;
  user: any;
  isAnimating: any;
  setIsAnimating: any;
}) {
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    let completion = 0;
    if (name) completion += 20;
    if (title) completion += 20;
    if (pseudo) completion += 20;
    if (seek === true || seek === false) completion += 20;
    if (configured) completion += 20;
    return completion;
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [name, title, seek, configured, pseudo]);
  const dispatch = useDispatch();
  function handleAccessClick() {
    if (user?.tokens >= 20) {
      updateUser(user?.uid, { access: true, tokens: user?.tokens - 20 }); // Call the updateUser function
      setIsAnimating(true); // Show confetti
      toast.success("Zweryfikowano pomyślnie!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setTimeout(() => {
        setIsAnimating(false);
        dispatch(setUser({ ...user, access: true, tokens: user?.tokens - 20 }));
      }, 5000); // Hide confetti after 5 seconds
    } else {
      toast.error("Nie posiadasz wystarczającej ilości Quixies", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }
  const { modals } = useSelector((state: any) => state.modals);
  const { light } = useSelector((state: any) => state.light);
  return (
    <div>
      {isAnimating && (
        <div className="z-50 w-full h-screen fixed left-0 top-0">
          <Confetti />
        </div>
      )}
      <div
        className={`${user?.access && "hidden"} ${
          light ? "bg-white text-black" : "bg-[#222430] text-white"
        } duration-300 transition-all mt-3 mx-3 lg:mx-6  rounded-lg relative max-w-full`}
      >
        <h2 className="px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
          WERYFIKACJA
        </h2>
        <div className="p-[1.5rem]">
          <p className="font-sans">
            Po pomyślnej weryfikacji Twój profil wyświetli się w odpowiednich
            kategoriach i zacznie docierać do potencjalnych klientów.
          </p>
          <div
            className={`${
              light ? "bg-gray-200" : "bg-gray-700"
            } space-y-3 p-3 lg:p-6 rounded-lg mt-3`}
          >
            <StepItem
              step={2}
              title="Rodzaj profilu"
              isCompleted={(seek === true || seek === false) && seek !== "ask"}
              completedText={seek ? "Talent" : "Firma"}
              incompleteText="Wybierz typ profilu"
              light={light}
            />
            <StepItem
              step={1}
              title="Konfiguracja"
              isCompleted={configured && seek !== "ask"}
              completedText="Proces rozpoczęty"
              incompleteText="Rozpocznij konfigurację"
              light={light}
            />
            <StepItem
              step={4}
              title="Tytuł profilu"
              isCompleted={title}
              completedText="Pomyślnie ukończono"
              incompleteText="Wpisz tytuł"
              light={light}
            />
            <StepItem
              step={5}
              title="Nazwa profilu"
              isCompleted={pseudo}
              completedText={pseudo}
              incompleteText="Ustaw unikalną nazwę"
              light={light}
            />
            <StepItem
              step={3}
              title="Przedstaw się"
              isCompleted={name}
              completedText="Pomyślnie ukończono"
              incompleteText={`Imię i nazwisko lub nazwa firmy`}
              light={light}
            />
          </div>
          <div className="w-full flex justify-center">
            {progress !== 100 && (
              <button
                onClick={() =>
                  dispatch(
                    set_modals({ ...modals, config: true, quixies: false })
                  )
                }
                className="mx-auto w-max py-[0.5rem] px-[1rem] max-w-full text-center text-white bg-gradient-to-b from-ctaStart to-ctaEnd mt-3 rounded-lg font-sans"
              >
                Uruchom ustawienia
              </button>
            )}{" "}
            {progress === 100 && (
              <button
                onClick={handleAccessClick}
                className="mt-6 bg-gradient-to-r from-ctaStart to-primaryStart text-xl animate-pulse rounded-md text-white py-2 px-4 font-sans font-bold"
              >
                Wpisz się! (20.00💎)
              </button>
            )}
          </div>
          <div className="p-3 bg-gradient-to-r from-primaryStart/70 to-primaryEnd/70 rounded-xl mt-3">
            <p className="text-white text-sm text-center mb-3 p-1.5 ">
              Uzupełnij swój profil, aby rozpocząć pozyskiwanie klientów lub
              poszukiwanie pracy.
            </p>
            <div className="relative w-full h-6 bg-gray-300 rounded-full mb-3">
              <div
                className="h-full bg-gradient-to-r from-accentStart to-accentEnd rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-white rounded-xl px-2 mx-auto w-max bg-gradient-to-b from-primaryStart to-primaryEnd">
              {progress}% ukończono
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Item Component for reusability and cleaner code
function StepItem({
  step,
  title,
  isCompleted,
  completedText,
  incompleteText,
  light,
}: {
  step: number;
  title: string;
  isCompleted: boolean;
  completedText: string;
  incompleteText: string;
  light: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {isCompleted ? (
          <IoCheckmarkCircle className="text-3xl aspect-square text-green-500 mr-2" />
        ) : (
          <IoCloseCircle className="text-3xl aspect-square text-red-500 mr-2" />
        )}
        <p
          className={`${
            light ? "text-black" : "text-white"
          } duration-300 text-sm sm:text-base font-lato`}
        >
          {title}
        </p>
      </div>
      <p
        className={`font-lato text-sm ${
          light ? "text-gray-600" : "text-gray-300"
        } duration-300 text-right`}
      >
        {isCompleted ? completedText : incompleteText}
      </p>
    </div>
  );
}
