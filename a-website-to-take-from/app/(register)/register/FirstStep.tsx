"use client";
import Image from "next/image";
import Link from "next/link";

export default function FirstStep({
  userData,
  setUserData,
  setStep,
  step,
  setSeek,
  seek,
  setConfigured,
}: {
  userData: any;
  setUserData: any;
  setStep: any;
  step: any;
  setSeek: Function;
  seek?: any;
  setConfigured: Function;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-7 mt-12">
      <button
        onClick={() => {
          setStep(1);
          setSeek(false);
          setConfigured(true);
        }}
        className={`hover:bg-[#46829c27] hover:shadow-sm hover:shadow-[#46829cc5] duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-[#126b91] ${
          !seek &&
          seek !== "ask" &&
          step === 1 &&
          "bg-[#46829c27] shadow-[#46829cc5] shadow-sm border-[#126b91]"
        }`}
      >
        <div className="flex flex-row justify-between items-start w-full">
          <Image
            src="/assets/artist.png"
            width={100}
            height={100}
            alt=""
            className="w-12 h-12"
          />
          <div
            className={`relative flex items-center justify-center border-gray-300 rounded-full h-5 w-5 border-[2px]`}
          >
            <div
              className={`${
                !seek &&
                step === 1 &&
                "border-[10px] duration-75 border-[#126b91]"
              } w-0 h-0 bg-[#126b91] rounded-full`}
            ></div>
            <div
              className={`${
                !seek && step === 1 && "border duration-75 border-white"
              } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
            ></div>
          </div>
        </div>
        <span className="text-left font-gotham font-light text-black  mt-4">
          Dołączam jako firma.
        </span>
      </button>
      <button
        onClick={() => {
          setStep(1);
          setSeek(true);
          setConfigured(true);
        }}
        className={`hover:bg-[#46829c27] hover:shadow-sm hover:shadow-[#46829cc5] duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-[#126b91] ${
          seek &&
          seek !== "ask" &&
          step === 1 &&
          "bg-[#46829c27] shadow-[#46829cc5] shadow-sm border-[#126b91]"
        }`}
      >
        <div className="flex flex-row justify-between items-start w-full">
          <Image
            src="/assets/client.png"
            width={100}
            height={100}
            alt=""
            className="w-12 h-12"
          />
          <div
            className={`relative flex items-center justify-center border-gray-300 rounded-full h-5 w-5 border-[2px]`}
          >
            <div
              className={`${
                seek &&
                seek !== "ask" &&
                step === 1 &&
                "border-[10px] duration-75 border-[#126b91]"
              } w-0 h-0 bg-[#126b91] rounded-full`}
            ></div>
            <div
              className={`${
                seek && step === 1 && "border duration-75 border-white"
              } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
            ></div>
          </div>
        </div>

        <span className="text-left font-gotham font-light text-black  mt-4">
          Dołączam jako osoba prywatna.
        </span>
      </button>
    </div>
  );
}
