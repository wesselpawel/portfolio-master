"use client";
import { usePhoneModal } from "@/common/context/PhoneModalContext";

export default function SecondCta({ style }: { style?: string }) {
  const { open } = usePhoneModal();
  return (
    <>
      {!style && (
        <button
          onClick={() => open()}
          className="w-[300px] h-[150px] relative z-[15000]"
        >
          <span className="z-10 border-2 border-green-500 text-xl font-bold absolute top-0 left-0 w-full h-full bg-black rounded-2xl bg-opacity-50 flex items-center justify-center">
            Dodaj zlecenie
          </span>
        </button>
      )}
      {style === "home" && (
        <button onClick={() => open()} className="relative z-[15000] mt-6">
          <span className="py-3 px-5 w-max text-base bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] hover:scale-110 duration-200 ease-in-out text-zinc-800 rounded-lg cursor-pointer font-bold">
            Dodaj zlecenie
          </span>
        </button>
      )}
    </>
  );
}
