"use client";
import { setUser } from "@/common/redux/slices/user";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChooseAccountType({
  setChangesWereMade,
}: {
  setChangesWereMade: any;
}) {
  const [seek, setSeek] = useState<any>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-7 mt-12 p-[1rem]">
        <button
          onClick={() => {
            setSeek(false);
          }}
          className={`hover:bg-[#46829c27] hover:shadow-sm hover:shadow-[#46829cc5] duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-[#126b91] ${
            !seek &&
            seek !== "ask" &&
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
                  !seek && "border-[10px] duration-75 border-[#126b91]"
                } w-0 h-0 bg-[#126b91] rounded-full`}
              ></div>
              <div
                className={`${
                  !seek && "border duration-75 border-white"
                } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
              ></div>
            </div>
          </div>
          <span className="text-left font-gotham font-light text-black  mt-4">
            Dołączam jako firma, chcę dodać ofertę pracy lub znaleźć klientów
          </span>
        </button>
        <button
          onClick={() => {
            setSeek(true);
          }}
          className={`hover:bg-[#46829c27] hover:shadow-sm hover:shadow-[#46829cc5] duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-[#126b91] ${
            seek &&
            seek !== "ask" &&
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
                  "border-[10px] duration-75 border-[#126b91]"
                } w-0 h-0 bg-[#126b91] rounded-full`}
              ></div>
              <div
                className={`${
                  seek && "border duration-75 border-white"
                } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
              ></div>
            </div>
          </div>

          <span className="text-left font-gotham font-light text-black  mt-4">
            Nie posiadam firmy, chcę zdobyć zlecenia lub znaleźć pracę
          </span>
        </button>
      </div>
      <button
        onClick={() => {
          dispatch(setUser({ ...user, seek: seek }));
          setChangesWereMade(true);
        }}
        className="px-[1.5rem] py-[0.6rem] bg-green-500 text-white rounded-md"
      >
        Zatwierdź
      </button>
    </div>
  );
}
