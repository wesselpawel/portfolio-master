"use client";
import Link from "next/link";
import Image from "next/image";
import { polishToEnglish } from "../../utils/polishToEnglish";
import { usePathname } from "next/navigation";
export default function MainFooter({ jobsList }: { jobsList: any }) {
  const pathname = usePathname();
  return (
    <div
      className={`${
        pathname.includes("user") && "hidden"
      } flex flex-col px-6 lg:px-12 p-6 py-12 bg-gradient-to-r from-zinc-700 to-primaryHoverEnd relative z-50 overflow-hidden`}
    >
      <div className="flex flex-col relative z-50">
        <div className="mb-12 p-3 lg:p-6 bg-black/50 rounded-lg">
          <h2 className="text-xl lg:text-2xl text-white font-extrabold">
            Świat pracy zdalnej – freelancerzy i firmy, które zmieniają
            przyszłość!
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 md:gap-3 lg:grid-cols-3 2xl:grid-cols-4 w-full">
            {jobsList.map((item: any, i: any) => (
              <div key={i} className="flex flex-col w-full">
                <Link
                  href={`${
                    process.env.NEXT_PUBLIC_URL
                  }/oferta/dla-firm/${polishToEnglish(item.title)}`}
                  title={`Praca Zdalna ${item.title}`}
                >
                  <h2 className="hover:scale-105 duration-100 text-center text-white 2xl:text-xl font-extrabold w-full px-4 py-2 bg-gradient-to-b from-primaryStart to-primaryEnd border-2 border-white rounded-md">
                    {item.title}
                  </h2>
                </Link>
                <div className="flex flex-row flex-wrap w-full justify-start mt-4 mb-6">
                  {item.data.map((cat: any, i: any) => (
                    <h3 key={i} className="w-full lg:w-max max-w-full">
                      <Link
                        href={`${
                          process.env.NEXT_PUBLIC_URL
                        }/oferta/dla-firm/${polishToEnglish(
                          item.title
                        )}/${polishToEnglish(cat.title)}`}
                        className="hover:underline w-full lg:w-max max-w-full text-white p-2  font-extralight text-lg"
                      >
                        {cat.title}
                      </Link>
                    </h3>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 lg:p-6 bg-black/50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-white drop-shadow-lg shadow-black font-extralight mb-3 ">
                Powered by
              </div>
              <div className="justify-evenly w-full flex gap-4 items-center h-max bg-white p-4 rounded-xl">
                <Link
                  href="https://openai.com/"
                  target="_blank"
                  title="openai"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/openai2.png"
                    width={100}
                    height={100}
                    alt=""
                    className="group-hover:scale-105 duration-200"
                  />
                </Link>

                <Link
                  href="https://react.dev/"
                  target="_blank"
                  title="react"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/react.png"
                    width={100}
                    height={100}
                    alt=""
                    className="group-hover:scale-105 duration-200"
                  />
                </Link>
                <Link
                  href="https://nextjs.org/"
                  target="_blank"
                  title="nextjs"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/nextjs.png"
                    width={100}
                    height={100}
                    alt=""
                    className="group-hover:scale-105 duration-200"
                  />
                </Link>
              </div>
            </div>
            <div>
              <div className="text-white drop-shadow-lg shadow-black font-extralight mb-3 ">
                Developer
              </div>
              <div className="w-full flex justify-center items-center h-max bg-white p-4 rounded-xl">
                <Link
                  href="https://quixy.pl/"
                  target="_blank"
                  title="quixy"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/wesiudev3.png"
                    width={300}
                    height={300}
                    alt="autor"
                    className="group-hover:scale-105 duration-200 w-48 h-auto mx-auto"
                  />
                </Link>
              </div>
            </div>
            <div>
              <div className="text-white drop-shadow-lg shadow-black font-extralight mb-3 ">
                Marketing
              </div>
              <div className="w-full justify-cente items-center h-max bg-white p-4 rounded-xl">
                <Link
                  href="https://google.com"
                  target="_blank"
                  title="google"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/google.png"
                    width={100}
                    height={100}
                    alt="google"
                    className="group-hover:scale-105 duration-200 w-32 h-auto mx-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
