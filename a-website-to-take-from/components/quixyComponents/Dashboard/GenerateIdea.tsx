"use client";
import { useState } from "react";
import { auth, updateUser } from "@/common/firebase/quixy";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Image from "next/image";
import GenerateIdeaInputs from "../GenerateIdeaInputs";
import { sendGenerateIdeaRequest } from "../../../utils/sendGenerateIdeaRequest";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/common/redux/slices/user";
import { FaCircleXmark } from "react-icons/fa6";

const initialState = {
  place: "",
  product: "",
  target: "",
  additional: "",
  terms: "",
  investment: "",
};

export default function GenerateIdea({
  userTokens,
  setIdeaOpen,
}: {
  userTokens: number;
  setIdeaOpen: Function;
}) {
  const [config, setConfig] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);
  const userData = useSelector((state: any) => state.user?.user);
  const dispatch = useDispatch();
  const showError = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const validateInputs = () => {
    if (userTokens < 0.68) {
      showError("Niewystarczająca ilość Quixies.");
      return false;
    }

    if (!config.place || !config.product || !config.investment) {
      showError("Uzupełnij dane...");
      return false;
    }

    return true;
  };

  // Update user data in both Firebase and Redux
  const updateUserData = async (id: string, data: any, cost: number) => {
    const newIdea = { id, ...data.idea };
    const newHistoryEntry = {
      action: `Wygenerowano pomysł "${
        data.idea.name
      }", Koszt: 💎${cost?.toFixed(2)}`,
      creationTime: Date.now(),
    };

    const updatedUser = {
      ideas: userData?.ideas
        ? userData.ideas.concat({
            ...newIdea,
            creationTime: Date.now(),
            participants: [
              {
                name: userData?.name || userData?.email || userData?.pseudo,
                uid: user?.uid,
                role: "admin",
              },
            ],
          })
        : [
            {
              ...newIdea,
              creationTime: Date.now(),
              participants: [
                {
                  name: userData?.name || userData?.email || userData?.pseudo,
                  uid: user?.uid,
                  role: "admin",
                },
              ],
            },
          ],
      history: userData?.history
        ? userData.history.concat(newHistoryEntry)
        : [newHistoryEntry],
      tokens: userData?.tokens - cost,
    };

    await updateUser(user?.uid, updatedUser);
    dispatch(setUser({ ...userData, ...updatedUser }));
  };

  // Generate a new idea and handle the result
  const generate = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const cost = Math.random() * (0.68 - 0.28) + 0.28;
      const id = uuidv4();

      const data = await sendGenerateIdeaRequest(
        config.additional,
        config.place,
        config.product,
        config.investment
      ).then((response) => ({
        idea: JSON.parse(response.choices[0].text),
      }));

      await updateUserData(id, data, cost);
      setIdeaOpen(data.idea);
    } catch (err: any) {
      showError(`Ups... Wystąpił błąd - ${err.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white  w-full flex flex-col lg:flex-row p-3 sm:p-6 lg:p-12 2xl:p-24">
      <div className="text-black h-full w-full">
        <div className="flex flex-row w-full">
          <div className="w-full">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <Image
                  src="/assets/lightbulbshadow.png"
                  width={224}
                  height={224}
                  alt="Logo serwisu quixy.pl"
                  className="w-[100px] h-auto"
                />
                <h2 className="pl-6 sm:pl-0  text-3xl xl:text-4xl text-black  font-bold drop-shadow-xl shadow-black">
                  Generator Pomysłów
                </h2>
              </div>
              <GenerateIdeaInputs config={config} setConfig={setConfig} />
              <div>
                <button
                  onClick={generate}
                  disabled={isLoading}
                  className={`p-3 w-full h-max text-white font-bold mb-6 ${
                    isLoading
                      ? "cursor-not-allowed bg-gradient-to-r from-primary to-cta "
                      : "bg-gradient-to-r from-primary to-cta "
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center w-full justify-center">
                      Generowanie pomysłu{" "}
                      <Image
                        width={25}
                        height={25}
                        className="ml-2 h-full w-auto"
                        src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/blocks-shuffle-2.svg"
                        alt="Loading"
                      />
                    </div>
                  ) : (
                    "Generuj pomysł"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
