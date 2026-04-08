import Image from "next/image";

export default function Loadinger() {
  return (
    <div className="font-sans font-light min-h-screen w-screen flex justify-center items-center bg-[#202020] text-xl text-white">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/assets/quixy-logo.png"
          width={224}
          height={224}
          alt="Logo serwisu quixy.pl"
          className="mb-6 w-24 h-auto animate-pulse"
          priority
        />
        <div className="text-center flex items-center">
          <div className="loading loading-spinner scale-150 mr-3"></div>
          Wczytywanie danych...
        </div>
      </div>
    </div>
  );
}
