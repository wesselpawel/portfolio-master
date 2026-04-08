"use client";
import { auth } from "@/common/firebase";
import { set_modals } from "@/common/redux/slices/modalsopen";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";
import { FaArrowRightLong, FaCircleXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UserStickyTop({ slugData }: { slugData: any }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [user, loading] = useAuthState(auth);
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    const currentScrollPosition = window.scrollY;
    // Compare current position with previous scroll position
    if (currentPosition > scrollPosition && currentScrollPosition > 200) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
    setScrollPosition(currentPosition);
  };

  useEffect(() => {
    const handleThrottledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleThrottledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleThrottledScroll);
    };
  }, [scrollPosition]);

  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();

  return (
    <div
      className={` ${
        modals.isProjectOpen || modals.currentChat || !isScrollingDown
          ? "translate-y-[30vh] opacity-0 duration-500 "
          : "opacity-100 translate-y-0 duration-500 "
      } w-full flex justify-center z-[999999999] gap-3`}
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-8">
        {slugData?.hourRate && (
          <div className="block w-max max-w-full  font-extrabold text-white bg-gradient-to-r from-zinc-700 to-primaryHoverEnd rounded-t-md px-3 py-1 text-center">
            {slugData?.hourRate} zł/h
          </div>
        )}
      </div>
      <div className="w-full">
        <div
          style={{ boxShadow: "0px 0px 5px black" }}
          className={`bg-slate-700 h-max duration-500 w-full relative`}
        >
          <div className="flex w-full justify-between h-full relative">
            <div className="w-full flex items-center py-3 pl-3 sm:pl-4 lg:pl-12">
              {slugData?.photoURL && (
                <div className="aspect-square min-w-12 sm:min-w-24 relative overflow-hidden">
                  <Image
                    src={slugData?.photoURL}
                    width={256}
                    height={256}
                    alt={`Zdjęcie profilowe ${slugData.pseudo}`}
                    className="bg-white rounded-full absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500 mb-0"
                  />
                </div>
              )}

              {!slugData?.photoURL && (
                <div className="rounded-full flex items-center bg-gradient-to-b from-zinc-700 to-primaryHoverEnd aspect-square min-w-12 sm:min-w-24 text-white justify-center">
                  <FaUser className="text-3xl lg:text-4xl" />
                </div>
              )}
              <div className="flex flex-col pl-3 sm:pl-4 lg:pl-6 text-white">
                <span className="flex flex-wrap items-center font-bold text-sm sm:text-base lg:text-xl">
                  Zatrudnij {slugData?.name}!
                </span>
                <div className="flex flex-col">
                  <p className="mb-1 text-sm sm:text-base text-gray-300">
                    {slugData?.title && slugData?.title}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (slugData?.uid === user?.uid) {
                  return toast.error("Nie możesz aplikować do samego siebie", {
                    position: "bottom-right",
                    autoClose: 5000,
                  });
                } else {
                  dispatch(set_modals({ ...modals, currentChat: slugData }));
                }
              }}
              className={`font-lato mr-3 sm:mr-4 lg:mr-12 my-auto h-max flex text-white rounded-md py-[0.5rem] px-[1rem] min-h-full max-w-[150px] text-sm sm:text-base bg-gradient-to-b from-ctaStart to-ctaEnd items-center text-center`}
            >
              Kontakt
              <FaArrowRightLong className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
