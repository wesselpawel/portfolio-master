import Pawełek from "../../public/Pawełek/2.png";
import Image from "next/image";
import Cta from "@/components/cta/Cta";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

export default function HeroIntro({ city }: { city?: string }) {
  return (
    <>
      <div className="mx-auto justify-evenly min-h-screen lg:mt-0 w-full flex flex-col px-3 lg:px-12 max-w-[90vw] relative pt-36 pb-12">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 h-max">
          <div className="z-50 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 rounded-3xl shadow-2xl p-6 lg:p-14 flex flex-col justify-center h-max my-auto border border-zinc-700/40 relative overflow-hidden">
            {/* Decorative background accents */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-row items-center gap-6">
              <div className="relative">
                <div className="absolute bottom-3 right-3 bg-green-400 animate-ping w-5 h-5 rounded-full z-10" />
                <div className="absolute bottom-[13px] right-[13px] bg-green-500 w-4 h-4 rounded-full z-10" />
                <Image
                  src={Pawełek}
                  width={120}
                  height={120}
                  className="rounded-full min-w-24 min-h-24 aspect-square border-4 border-green-400/40 shadow-lg"
                  alt="Zleć wykonanie strony internetowej np. Pawełkowi"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-gotham font-semibold text-white drop-shadow-lg">
                  Strony www, sklepy i aplikacje webowe {city}
                </h1>
                <p className="text-sm font-gotham font-light text-zinc-200">
                  <Link
                    href="/freelancer/strony-internetowe-marketing-seo"
                    className="underline underline-offset-2 decoration-green-400 hover:text-green-300 transition"
                  >
                    Paweł Wessel – Specjalista ds. Stron, SEO i Marketingu
                  </Link>
                </p>
                <Link
                  href="tel:+48721417154"
                  title="Skontaktuj się z Paweł Wessel"
                  className="mt-1 flex items-center gap-2 hover:underline text-green-300"
                >
                  <FaPhoneAlt />
                  <span className="text-lg font-light font-gotham">
                    +48 721 417 154
                  </span>
                </Link>
              </div>
            </div>
            <div className="font-light mt-8 text-base lg:text-lg xl:text-xl text-zinc-100 text-center lg:text-left z-30 w-full flex flex-col justify-center">
              <h2 className="text-white drop-shadow-md shadow-black italic sm:max-w-[30rem] lg:max-w-[40rem] max-w-[30rem] mx-auto lg:mx-0">
                Agencja Kreatywna {city} – od branży IT po marketing. Zyskaj
                nowoczesną stronę internetową, która wyróżni Twój biznes.
              </h2>
              <p className="font-gotham text-xs my-4 text-zinc-300">
                Chcesz wycenę? Kliknij &quot;Dodaj zlecenie&quot; i opisz swój
                pomysł na stronę, kampanię lub biznes.
              </p>
            </div>
            <div className="w-max mx-auto lg:mx-0 mt-6 !text-base">
              <Cta label="Dodaj zlecenie" />
            </div>
          </div>

          <div className="flex items-center justify-center flex-col w-full lg:pl-12 mt-8 lg:mt-0">
            <div className="max-w-[90vw] lg:max-w-[550px] flex items-center justify-center">
              <Image
                src={`/assets/mockup.png`}
                width={1024}
                height={1024}
                alt={`Aplikacja dla freelancerów i firm IT`}
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                placeholder="blur"
                className="z-50 animate-left-to-right my-12 sm:my-0 w-full scale-125 sm:scale-100 h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
