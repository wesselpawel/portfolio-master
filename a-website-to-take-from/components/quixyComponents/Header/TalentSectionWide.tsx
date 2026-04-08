"use client";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { FaFacebook, FaTiktok } from "react-icons/fa";

export default function ProductsWide({
  width,
  setHovered,
  hovered,
  handleMouseEnter,
  handleMouseLeave,
  jobs,
  secondMenuItems,
}: {
  width: number;
  setHovered: any;
  hovered: string;
  handleMouseEnter: any;
  handleMouseLeave: any;
  jobs: any;
  secondMenuItems: any;
}) {
  return (
    <div
      onMouseEnter={() => {
        width >= 1024 && handleMouseEnter("talent");
      }}
      onMouseLeave={() => {
        width >= 1024 && handleMouseLeave();
      }}
      className={`z-[210] fixed grid-cols-2 w-full max-h-[80vh] overflow-y-scroll top-0 left-0 bg-white xl:space-x-3 font-semibold shadow-black ${
        hovered === "talent"
          ? "translate-y-[116px] lg:translate-y-[84px]"
          : "-translate-y-[100vh] opacity-0"
      } hidden lg:grid pl-4 md:pl-8 lg:pl-12 xl:pl-20 2xl:pl-32 border-y border-gray-300 shadow-sm`}
    >
      <div className="flex flex-col relative z-[500]">
        <h2 className="text-black drop-shadow-xl shadow-black font-bold text-xl xl:text-2xl text-left pt-8">
          z Quixy znajdziesz pracę
        </h2>
        <div className="-ml-3 flex flex-wrap pb-8 pt-4">
          {jobs.map((job: any, i: any) => (
            <div className="mt-3 ml-3 w-[300px] flex flex-col" key={i}>
              <Link
                href={`/oferta/dla-firm/${polishToEnglish(job.title)}`}
                title={`Quixy Studio Grudziądz ${job.title}`}
                style={{ boxShadow: "0px 0px 4px black" }}
                className={`text-lg mt-3 font-bold p-1 px-3  text-white bg-[#126b91] w-max`}
                key={i}
                onClick={() => setHovered(false)}
              >
                <span>{job.title}</span>
              </Link>
              <div className="flex flex-col mt-3">
                {job.data.map((item: any, i: any) => (
                  <div key={i} className="relative group">
                    <span
                      title={`Quixy Studio Grudziądz ${item.title}`}
                      className="p-0.5 font-light group-hover:text-white group-hover:bg-[#126b91] w-max text-gray-800 text-sm"
                    >
                      {item.title}
                    </span>

                    {/* Hover dropdown */}
                    <div className="flex flex-col absolute max-w-[300px] left-0 top-0 group-hover:z-10 z-[-10] opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                      <Link
                        title={`Oferta ${item.title}`}
                        className="p-0.5  group-hover:text-white font-bold group-hover:bg-[#126b91] w-max text-gray-800 text-sm"
                        href={`/oferta/dla-firm/${polishToEnglish(
                          job.title
                        )}/${polishToEnglish(item.title)}`}
                      >
                        {item.title}
                      </Link>
                      {item.data.map((subcategory: any, i: any) => (
                        <Link
                          title={`Quixy Studio Grudziądz ${subcategory.title}`}
                          key={i}
                          style={{ boxShadow: "1px 0px 4px black" }}
                          className="max-w-[300px] bg-[#126b91] hover:bg-orange-300 duration-75 font-light text-white text-sm p-2"
                          href={`/oferta/dla-firm/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}/${polishToEnglish(
                            subcategory.title
                          )}`}
                        >
                          {subcategory.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
