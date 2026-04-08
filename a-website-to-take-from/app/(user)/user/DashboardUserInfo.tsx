"use client";
import Viewer from "@/components/quixyComponents/AddJobOffer/Viewer";
import { set_modals } from "@/common/redux/slices/modalsopen";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
async function sendVerificationEmail(email: string, verificationCode: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/sendVerificationEmail?email=${email}&verificationCode=${verificationCode}`
  );
  return data;
}
export default function DashboardUserInfo() {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  function copyToClipboard(text: string) {
    navigator?.clipboard?.writeText(text);
  }
  const [sent, setSent] = useState(false);
  function sendEmail(email: string, uid: string) {
    sendVerificationEmail(email, uid);
    setSent(true);
    toast.success(
      "Wiadomość aktywacyjna została wysłana na podany adres e-mail.",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
    );
  }
  const { light } = useSelector((state: any) => state.light);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  } else {
    return (
      <div>
        <div
          className={`${
            light ? "bg-white" : "bg-[#222430]"
          } duration-300  flex flex-row items-start mt-3 mx-3 lg:mt-6 lg:mx-6  p-3 rounded-lg`}
        >
          <button
            onClick={() =>
              dispatch(set_modals({ ...modals, config: true, quixies: false }))
            }
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
              <div
                style={{ boxShadow: "inset 0px 0px 8px black" }}
                className="rounded-full bg-gradient-to-b from-primaryStart to-primaryEnd w-24 aspect-square text-white flex items-center justify-center"
              >
                <FaUser className="text-2xl lg:text-5xl" />
              </div>
            )}
          </button>
          {!user?.configured && (
            <div className="pl-4">
              <h2 className="text-black w-max font-extrabold">
                Nie skonfigurowano profilu
              </h2>
              <p className="text-black mt-1 text-sm">
                Określ typ profilu w zakładce{" "}
                <b className="italic">Ustawienia</b>, by rozpocząć swoją
                przygodę w Quixy
              </p>
            </div>
          )}
          {user?.configured && (
            <div
              className={`flex flex-col h-max px-3 ${
                light ? "text-black" : "text-white"
              } duration-300`}
            >
              {!user?.name && (
                <h2 className="text-sm drop-shadow-lg font-bold  italic">
                  {user?.seek && "Imię (lub imię i nazwisko)"}
                  {(!user?.seek || user?.seek === "ask") &&
                    "Nazwa firmy/dane rekrutera"}
                </h2>
              )}
              <h3 className={`text-lg sm:text-2xl font-extrabold`}>
                {user?.name ? user?.name : "Nie podano"}
              </h3>
              <h3 className="text-base sm:text-xl">
                {user?.title && user?.title}
              </h3>
              {user?.pseudo && (
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      copyToClipboard(
                        `https://quixy.pl/${
                          user?.seek && user?.seek !== "ask"
                            ? "talent"
                            : "company"
                        }/${user?.pseudo}`
                      );
                      toast.success("Skopiowano pomyślnie!", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }}
                    className="relative flex items-center"
                    title="Skopiuj"
                  >
                    <div className="text-left text-xs sm:text-sm font-bold text-blue-500 hover:underline">
                      {user?.pseudo &&
                        `https://quixy.pl/${
                          user?.seek && user?.seek !== "ask"
                            ? "talent"
                            : "company"
                        }/${user?.pseudo}`}
                    </div>
                  </button>
                </div>
              )}
              {!user?.title && (
                <div
                  className={`${
                    light ? "text-black" : "text-white"
                  } duration-300`}
                >
                  {(user?.seek || !user?.seek) && user?.seek !== "ask" && (
                    <h2 className={` font-extrabold text-lg`}>Tytuł</h2>
                  )}
                  <h3 className={``}>
                    {user?.title ? user?.title : "Nie podano..."}
                  </h3>
                </div>
              )}
              {!user?.pseudo && (
                <div className="mt-1">
                  <h2 className="font-extrabold text-lg">Unikalny link</h2>
                  <h3 className={`mt-1`}>Nie skonfigurowano...</h3>
                </div>
              )}
            </div>
          )}{" "}
        </div>
        <div>
          {!user?.emailVerified && (
            <div
              className={`rounded-lg border-l-4 border-primaryStart p-3 mt-3 mx-3 lg:mx-6  px-3 max-w-full ${
                light ? "bg-white text-black" : "bg-[#222430] text-white"
              } duration-300`}
            >
              Wysłaliśmy wiadomość aktywującą konto na podany adres e-mail -{" "}
              <button
                disabled={sent}
                className="font-extrabold disabled:cursor-not-allowed"
                onClick={() => sendEmail(user?.email, user?.uid)}
              >
                {!sent && "Wyślij ponownie"}
                {sent && "Wysłano"}
              </button>
            </div>
          )}
          <div>
            {(user?.seek || !user?.seek) && (
              <div className={`mt-3`}>
                <div className="grid xl:grid-cols-2 mx-3 lg:mx-6  gap-3">
                  <div
                    className={`rounded-lg duration-300 relative ${
                      light ? "bg-white" : "bg-[#222430]"
                    } `}
                  >
                    <h2 className="px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
                      SPECJALIZACJE
                    </h2>
                    <div className="w-full flex flex-wrap items-center gap-2 p-[0.7rem]">
                      {user?.tags?.map((item: any, i: any) => (
                        <div
                          key={i}
                          className="font-sans text-sm lg:text-base bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md text-white duration-100 flex items-center px-[0.5rem] sm:px-[1.5rem] py-[0.5rem]"
                        >
                          {item.title}
                        </div>
                      ))}
                      {!user?.tags?.length && (
                        <h3
                          className={`${
                            light ? "text-black" : "text-white"
                          } duration-300 ml-1 p-[0.7rem]`}
                        >
                          Brak podanych specjalizacji...
                        </h3>
                      )}
                    </div>
                  </div>
                  <div
                    className={`rounded-lg duration-300 relative ${
                      light ? "bg-white" : "bg-[#222430]"
                    } `}
                  >
                    <h2 className="px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
                      DOSTĘPNOŚĆ
                    </h2>
                    <div />
                    {user?.seek && (
                      <div className="w-full flex flex-wrap items-center gap-2 p-[0.7rem]">
                        {user?.preferences ? (
                          user?.preferences?.map((item: any, i: any) => (
                            <h3
                              key={i}
                              className={`font-sans text-sm lg:text-base bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md text-white duration-100 flex items-center px-[0.5rem] sm:px-[1.5rem] py-[0.5rem]`}
                            >
                              {item}
                            </h3>
                          ))
                        ) : (
                          <h3
                            className={`${
                              light ? "text-black" : "text-white"
                            } duration-300 ml-1 p-[0.7rem]`}
                          >
                            Brak danych o dostępności...
                          </h3>
                        )}
                      </div>
                    )}
                    {!user?.seek && (
                      <div className="w-full flex flex-wrap items-center gap-2 p-[0.7rem]">
                        {user?.preferences ? (
                          user?.preferences?.map((item: any, i: any) => (
                            <h3
                              key={i}
                              className={`font-sans text-sm lg:text-base bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-md text-white duration-100 flex items-center px-[0.5rem] sm:px-[1.5rem] py-[0.5rem]`}
                            >
                              {item}
                            </h3>
                          ))
                        ) : (
                          <h3
                            className={`${
                              light ? "text-black" : "text-white"
                            } duration-300 ml-1 p-[0.7rem]`}
                          >
                            Uzupełnij dane...
                          </h3>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`mt-3 mx-3 lg:mx-6  ${
                    light ? "bg-white" : "bg-[#222430]"
                  } duration-300 rounded-lg relative`}
                >
                  <h2 className="px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
                    OPIS
                  </h2>
                  <div className="p-[1.5rem]">
                    <div
                      className={`${
                        light ? "text-black" : "text-white"
                      } duration-300`}
                    >
                      {user?.description ? (
                        <div className="font-sans">
                          <Viewer value={user?.description} light={light} />
                        </div>
                      ) : (
                        <div className="font-sans">Brak opisu...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
