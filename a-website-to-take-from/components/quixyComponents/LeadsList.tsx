"use client";
import { updateApplication } from "@/common/firebase";
import moment from "moment";
import { useState } from "react";
import "moment/locale/pl";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import LeadApplication from "./LeadApplication";
export default function LeadsList() {
  const { user } = useSelector((state: any) => state.user);
  const [filter, setFilter] = useState("new");
  moment.locale("pl");
  const { light } = useSelector((state: any) => state.light);
  return (
    <>
      <div className="font-sans py-3 mx-3 lg:py-6 lg:mx-6 ">
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <Link href="/user" className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </Link>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Twoje zapytania</h2>
            <p className="text-xs ">
              Znajdziesz tutaj wszystkie swoje zlecenia oraz kandydatów.
            </p>
          </div>
        </div>
        <div
          className={` ${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } mt-6 rounded-lg min-h-screen text-white`}
        >
          <div className="font-gotham font-light grid grid-cols-2 gap-3 lg:gap-6 p-6 !text-white">
            <button
              onClick={() => setFilter("new")}
              className={`rounded-md p-1 border-2 border-dashed ${
                filter === "new"
                  ? `bg-gradient-to-b text-white ${
                      light
                        ? "border-black from-zinc-700 to-primaryHoverEnd"
                        : "border-white from-primaryStart to-primaryEnd"
                    }`
                  : `border-transparent bg-gradient-to-b text-white ${
                      light
                        ? " from-zinc-700/70 to-primaryHoverEnd/70"
                        : " from-primaryStart/70 to-primaryEnd/70"
                    }`
              }`}
            >
              NOWE
            </button>
            <button
              onClick={() => setFilter("old")}
              className={`rounded-md text-white p-1 border-2 border-dashed ${
                filter === "old"
                  ? `bg-gradient-to-b text-white ${
                      light
                        ? "border-black from-zinc-700 to-primaryHoverEnd"
                        : "border-white from-primaryStart to-primaryEnd"
                    }`
                  : `border-transparent bg-gradient-to-b text-white ${
                      light
                        ? "from-zinc-700/70 to-primaryHoverEnd/70"
                        : "from-primaryStart/70 to-primaryEnd/70"
                    }`
              }`}
            >
              SPRAWDZONE
            </button>{" "}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 font-sans gap-6 px-3 lg:px-6 pb-6">
            {user?.leads?.map((lead: any, i: any) => (
              <div key={i}>
                <LeadApplication light={light} lead={lead} filter={filter} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
