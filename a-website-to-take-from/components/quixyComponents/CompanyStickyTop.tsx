"use client";
import { set_modals } from "@/common/redux/slices/modalsopen";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

export default function CompanyStickyTop({ slugData }: { slugData: any }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolled = scrollPosition > 300;
  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        (modals.isProjectOpen || modals.currentChat) && "hidden"
      } px-4 w-full flex justify-center fixed top-0 left-0 z-[99999999999999999999999999]  ${
        isScrolled
          ? "opacity-100 translate-y-0 duration-500"
          : "translate-y-[30vh] opacity-0 duration-500"
      }`}
    >
      <div className={`container  bg-white h-max text-black duration-500`}>
        <div className="flex w-full justify-between h-full relative">
          <div className="flex">
            {slugData?.photoURL && (
              <Image
                src={slugData?.photoURL}
                width={256}
                height={256}
                alt={`Zdjęcie profilowe ${slugData.pseudo}`}
                className=" w-24 mb-0 hidden sm:block"
              />
            )}

            {!slugData?.photoURL && (
              <div className="hidden sm:flex bg-[#126b91]  aspect-square w-24 text-white items-center justify-center">
                <FaUser className="text-3xl lg:text-4xl" />
              </div>
            )}
            <div className="px-4 ">
              <div className="flex flex-col py-2">
                <h1 className="flex items-center  text-xl">
                  Skontaktuj się z {slugData?.name}!
                </h1>
                <p className="font-bold mb-1">
                  {slugData?.title && slugData?.title}
                </p>
                {slugData?.hourRate && (
                  <div className="w-max relative text-white px-1.5 py-0.5  bg-gradient-to-r from-primary to-cta">
                    {slugData?.hourRate} zł/h
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              dispatch(set_modals({ ...modals, currentChat: slugData }))
            }
            className={`flex text-white font-bold  px-3 py-2 min-h-full max-w-[150px] text-sm sm:text-base  bg-gradient-to-r from-primary to-cta items-center text-center`}
          >
            Kontakt
            <FaArrowRightLong className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
