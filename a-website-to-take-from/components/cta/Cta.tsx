"use client";
import { usePhoneModal } from "@/common/context/PhoneModalContext";
export default function Cta({ label }: { label: string }) {
  const { open } = usePhoneModal();
  return (
    <>
      <button
        onClick={() => open()}
        className={`text-nowrap py-3 px-5 text-white rounded-lg cursor-pointer bg-gradient-to-br from-green-600 to-green-700 w-max max-w-full`}
      >
        {label || "Zostaw brief – odezwiemy się do Ciebie"}
      </button>
    </>
  );
}
