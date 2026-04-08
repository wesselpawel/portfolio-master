"use client";
import { setUser } from "@/common/redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CitiesPicker from "./CitiesPicker";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/common/firebase";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { TOOLBAR_OPTIONS } from "@/components/quixyComponents/AddJobOffer/Step";
async function isPseudoAvailable(localPseudo: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/checkPseudo?pseudo=${localPseudo}`
  );
  const data = response.json();
  return data;
}
export default function EssentialUserInfo({
  setChangesWereMade,
  light,
}: {
  setChangesWereMade: any;
  light: any;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  function handleReduxUserState(value: any, key: string) {
    dispatch(setUser({ ...user, [key]: value }));
    setChangesWereMade(true);
  }
  const [isLoading, setIsLoading] = useState<any>(false);
  const [triesCount, setTriesCount] = useState(0);
  const [localPseudo, setLocalPseudo] = useState("");
  const [pseudoWasChanged, setPseudoWasChanged] = useState<any>(false);
  const [pseudoIsAvailable, setPseudoIsAvailable] = useState<any>(false);
  const [hasAnswer, setHasAnswer] = useState<any>(false);
  async function check(pseudo: string) {
    setIsLoading(true);
    const { available } = await isPseudoAvailable(pseudo);
    setTriesCount(triesCount + 1);
    setPseudoIsAvailable(available);
    setIsLoading(false);
    setHasAnswer(true);
    setPseudoWasChanged(true);
  }
  async function upload(file: any) {
    const randId = uuid();
    const imageRef = ref(storage, randId);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    dispatch(
      setUser({
        ...user,
        photoURL: url,
      })
    );
    setChangesWereMade(true);
  }
  useEffect(() => {
    if (user) {
      setLocalPseudo(user.pseudo);
    }
  }, []);
  return (
    <>
      <div
        className={`${light ? "text-black" : "text-white"} relative font-sans`}
      >
        <div className="flex flex-col lg:flex-row pt-4 sm:pt-6">
          <label
            htmlFor="uploader2"
            className="cursor-pointer pl-4 sm:pl-6 relative h-max group w-max mb-3 lg:mb-0"
          >
            {user?.photoURL && (
              <div className="rounded-full w-24 aspect-square overflow-hidden relative">
                <Image
                  style={{ boxShadow: "inset 0px 0px 8px black" }}
                  src={user?.photoURL}
                  width={256}
                  height={256}
                  alt=""
                  className="shadow-sm shadow-black rounded-full bg-white absolute inset-0 object-cover w-full h-full"
                />
              </div>
            )}
            {!user?.photoURL && (
              <div className="shadow-sm shadow-black bg-gradient-to-b from-primaryStart to-primaryEnd h-full rounded-full aspect-square text-white flex items-center justify-center w-24 relative duration-150 flex-col group">
                <FaUser className="text-5xl" />
              </div>
            )}
          </label>
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
            id="uploader2"
            className="text-white hidden"
          />
          <div className="px-4 sm:px-6 grid lg:grid-cols-2 sm:gap-x-3">
            <div className="flex flex-col lg:pt-0">
              <div className="text-white py-1 px-2 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md w-max">
                Email
              </div>{" "}
              <span className=" my-2 text-sm sm:text-base">{user?.email}</span>
            </div>
            {user?.pseudo && (
              <div className="flex flex-col lg:pt-0">
                <div className="text-white py-1 px-2  bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md w-max mt-2 lg:mt-0">
                  Unikalny link
                </div>{" "}
                <span className=" my-2 text-sm sm:text-base">
                  {user?.pseudo}
                </span>
              </div>
            )}
            {user?.region && (
              <div className="flex flex-col lg:pt-0">
                <div className="text-white py-1 px-2  bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md w-max mt-2 lg:mt-0">
                  Województwo
                </div>{" "}
                <span className=" my-2 text-sm sm:text-base">
                  {user?.region}
                </span>
              </div>
            )}
            {user?.city && (
              <div className="flex flex-col lg:pt-0">
                <div className="text-white py-1 px-2  bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md w-max mt-2 lg:mt-0">
                  Miasto
                </div>{" "}
                <span className=" my-2 text-sm sm:text-base">{user?.city}</span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`${
            light ? "bg-white" : "bg-[#222430]"
          } duration-300 relative w-full px-4 sm:px-6`}
        >
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="font-bold">Nazwa</label>
                <input
                  type="text"
                  value={user?.name}
                  onChange={(e) => {
                    handleReduxUserState(e.target.value, "name");
                    setChangesWereMade(true);
                  }}
                  className={`${
                    light ? "bg-white text-black" : "bg-gray-700 text-white"
                  } duration-300 border border-primaryStart/70 rounded-md p-2`}
                  placeholder="imię/nazwa firmy"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Tytuł</label>
                <input
                  type="text"
                  value={user?.title}
                  onChange={(e) => {
                    handleReduxUserState(e.target.value, "title");
                    setChangesWereMade(true);
                  }}
                  className={`${
                    light ? "bg-white text-black" : "bg-gray-700 text-white"
                  } duration-300 border border-primaryStart/70 rounded-md p-2`}
                  placeholder={`np. ${user?.seek ? "Młodszy Księgowy" : ""}${
                    !user?.seek ? "Project Manager" : ""
                  }`}
                />
              </div>
            </div>
            <CitiesPicker
              light={light}
              user={user}
              setChangesWereMade={setChangesWereMade}
              handleReduxUserState={handleReduxUserState}
            />
          </div>
          {/* <UserSocialLinksAdder
            user={user}
            setChangesWereMade={setChangesWereMade}
            handleReduxUserState={handleReduxUserState}
          /> */}
          {!user?.pseudo && (
            <>
              <div className="flex flex-col mt-2">
                <label className="font-bold">Unikalny link</label>
                <div>
                  {!localPseudo &&
                    "Wartość ta pozwala na wyświetlanie profilu w zakładce pracy zdalnej."}
                  {localPseudo && pseudoWasChanged && pseudoIsAvailable && (
                    <div>To będzie Twój Unikalny Link w Quixy.pl</div>
                  )}
                </div>
                {hasAnswer && !pseudoIsAvailable && (
                  <div className="mb-2 text-red-500 font-light font-gotham">
                    Nazwa {localPseudo} jest zajęta...
                  </div>
                )}
                <input
                  type="text"
                  value={localPseudo}
                  onChange={(e) => {
                    setLocalPseudo(polishToEnglish(e.target.value));
                    setPseudoWasChanged(true);
                    setHasAnswer(false);
                    setPseudoIsAvailable(false);
                  }}
                  className={`${
                    light ? "bg-white text-black" : "bg-gray-700 text-white"
                  } duration-300 border ${
                    hasAnswer &&
                    !pseudoIsAvailable &&
                    "bg-red-500 text-white !font-bold"
                  } border-primaryStart/70 rounded-md p-2 font-light`}
                  placeholder="np. jan345"
                />
                <span className="text-primary">
                  quixy.pl/{user?.seek ? "talent" : "company"}/{localPseudo}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {pseudoWasChanged &&
                    !pseudoIsAvailable &&
                    localPseudo?.length > 0 && (
                      <button
                        onClick={() => check(localPseudo)}
                        disabled={isLoading}
                        className="animate-pulse bg-gradient-to-b from-accentStart to-accentEnd disabled:cursor-not-allowed w-max  disabled:bg-[#126b91] disabled:duration-500 duration-100 px-4 py-2 text-white font-gotham mt-2 rounded-md"
                      >
                        {!isLoading && "Sprawdź dostępność"}
                        {isLoading && "Sprawdzam..."}
                      </button>
                    )}
                  {pseudoWasChanged && pseudoIsAvailable && (
                    <div className="flex flex-col">
                      <div className="font-gotham font-bold text-green-500">
                        Nazwa jest dostępna.
                      </div>
                      <button
                        disabled={
                          isLoading ||
                          !pseudoIsAvailable ||
                          localPseudo === "" ||
                          !pseudoWasChanged
                        }
                        onClick={() => {
                          setChangesWereMade(true);
                          handleReduxUserState(localPseudo, "pseudo");
                          setPseudoIsAvailable(false);
                          setLocalPseudo("");
                          setHasAnswer(false);
                          setPseudoWasChanged(false);
                        }}
                        className="animate-pulse bg-gradient-to-b from-primaryStart to-primaryEnd disabled:cursor-not-allowed w-max  disabled:bg-[#126b91] disabled:duration-500 duration-100 px-4 py-2 text-white  rounded-md mt-2"
                      >
                        Zarezerwuj nazwę
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="w-full mt-3">
            <div className="flex flex-col">
              <label htmlFor="hourRate" className="font-bold">
                Stawka godzinowa{" "}
                <span className="text-gray-600 text-sm font-normal">
                  (opcjonalnie)
                </span>
              </label>
              <div className="grid grid-cols-2">
                <div className="relative w-full">
                  <input
                    id="hourRate"
                    className={`${
                      light ? "bg-white text-black" : "bg-gray-700 text-white"
                    } duration-300 w-full border border-primaryStart/70 p-2 rounded-md`}
                    placeholder={`Wpisz stawkę`}
                    type="text"
                    value={user?.hourRate}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers
                      if (/^\d*$/.test(value)) {
                        setChangesWereMade(true);
                        handleReduxUserState(e.target.value, "hourRate");
                      }
                    }}
                  />
                  <div className="rounded-r-md flex items-center justify-center absolute right-0 top-0 h-full bg-gradient-to-b from-accentStart to-accentEnd text-white  px-3 ">
                    zł/h
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          <div className="relative w-full mt-3">
            <label className="font-bold">Twój opis</label>

            <div className="rounded-md">
              <ReactQuill
                placeholder={!user?.description ? "Wpisz tekst" : ""}
                className={`border rounded-md border-primaryStart/70 text-black bg-white`}
                modules={{
                  toolbar: {
                    container: TOOLBAR_OPTIONS,
                  },
                }}
                value={user?.description}
                onChange={(e) => {
                  handleReduxUserState(e, "description");
                  setChangesWereMade(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
