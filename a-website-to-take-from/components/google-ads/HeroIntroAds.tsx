import Image from "next/image";
import Cta from "@/components/cta/Cta";
import Link from "next/link";

// Simple SVG data-URI placeholders (no external assets)
const placeholder = (w: number, h: number, label: string, rx: number = 16) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
    <rect width='100%' height='100%' rx='${rx}' fill='rgb(244,244,245)' stroke='rgb(212,212,216)'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='rgb(113,113,122)' font-family='Arial, Helvetica, sans-serif' font-size='${Math.floor(
      Math.min(w, h) / 10
    )}'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function HeroIntroAds() {
  return (
    <>
      <div className="z-[1500] absolute w-[130px] sm:w-[300px] h-[50px] left-0 top-24 lg:top-36 overflow-hidden rounded-r-xl">
        <div className="w-full flex items-start relative">
          <div className="w-max absolute left-[300px] top-0">
            <Image
              src={placeholder(3600, 200, "Logos")}
              width={3600}
              height={200}
              alt="Placeholder logos"
              className="w-auto h-[50px]"
              priority
            />
          </div>
        </div>
      </div>

      <div className="justify-evenly min-h-screen lg:mt-0 w-full mx-0 sm:mx-auto flex flex-col sm:w-4/5 lg:w-3/4 relative pt-36 pb-12 lg:py-0 overflow-x-hidden">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 h-max">
          <h1 className="z-50 bg-zinc-800 bg-opacity-80 rounded-xl p-6 lg:p-12 flex flex-col justify-center h-max my-auto">
            <Image
              src={placeholder(400, 400, "Logo")}
              width={400}
              height={400}
              alt="Placeholder logo"
              className="mx-auto lg:mx-0 w-1/2 sm:w-[200px] lg:w-[300px]"
              priority
            />
            <div className="font-light mt-6 text-base lg:text-lg xl:text-xl text-gray-50 text-center lg:text-left z-30 w-full flex justify-center">
              <span className="text-white drop-shadow-md shadow-black italic sm:max-w-[30rem] lg:max-w-[50rem] max-w-[40rem]">
                Tworzymy skuteczne strony WWW, marketing w social media i
                kampanie Google Ads.
              </span>
            </div>
            <div className="gap-6 flex flex-col-reverse xl:flex-row z-30 w-full justify-center lg:justify-start items-center lg:items-start sm:w-max mt-6 mx-auto lg:mx-0">
              <Cta label="Skontaktuj się" />
              {/* <Link
                href="/oferta"
                className="py-3 px-5 text-sm lg:text-base mt-4 hover:scale-110 duration-200 in-out text-white rounded-lg cursor-pointer bg-blue-500 w-max max-w-full"
              >
                Dla branży IT
              </Link> */}
            </div>
          </h1>
          <div className="flex items-center xl:justify-center flex-col w-full lg:pl-12 mt-20 lg:mt-0">
            <Image
              src={placeholder(900, 650, "Podgląd / Placeholder")}
              width={900}
              height={650}
              alt="Placeholder podgląd"
              className="w-full h-auto rounded-xl border border-zinc-200 shadow"
              priority
            />
            <span className="text-2xl lg:text-3xl font-italic text-white font-sans italic text-center mt-12">
              Rozwiązania cyfrowe, które robią różnicę
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
