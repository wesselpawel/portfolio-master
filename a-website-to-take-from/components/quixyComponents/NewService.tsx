"use client";
import PortfolioItems from "@/components/quixyComponents/Dashboard/Settings/SettingsInputs/PortfolioItems";
import Link from "next/link";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function NewService() {
  const [project, setProject] = useState<any>("");
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const { user } = useSelector((state: any) => state.user);
  const { light } = useSelector((state: any) => state.light);
  return (
    <div className="mx-3 lg:mx-6  py-6">
      {isUploading && (
        <div className="fixed left-0 top-0 z-[99999999999999999999999] h-screen w-screen flex justify-center items-center bg-[#202020]/50 text-xl text-white">
          <div className="flex flex-col items-center justify-center">
            Dodawanie plików... ({uploadCount})
          </div>
        </div>
      )}
      <div
        className={`${
          light ? "bg-white text-black" : "bg-[#222430] text-white"
        } rounded-lg justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center max-w-full`}
      >
        <Link href="/user" className="flex items-center">
          <FaChevronLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="flex flex-col pl-12">
          <h2 className="font-extrabold">Nowa usługa</h2>
          <p className="text-xs ">Skonfiguruj usługę i opublikuj na rynku</p>
        </div>
      </div>
      <div
        className={`${
          light ? "bg-white text-black" : "bg-[#222430] text-white"
        } relative rounded-lg flex items-center justify-center pb-12 mt-6`}
      >
        {!user?.access && (
          <div
            className={`${
              light ? "bg-black/50" : "bg-black/70"
            } z-50 rounded-md absolute left-0 top-0 w-full h-full`}
          >
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-white text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaInfoCircle className="mr-2 text-3xl" />
                  <h1 className="text-3xl font-bold">Brak dostępu</h1>
                </div>

                <p className="font-light  max-w-lg">
                  Twoje usługi będą mogły wyświetlać się po weryfikacji konta
                  oraz opłaceniu wpisowego w wysokości{" "}
                  <b className="px-1.5 py-1 rounded-md bg-ctaStart text-white">
                    💎20
                  </b>{" "}
                </p>
              </div>
            </div>
          </div>
        )}
        <h1 className="absolute left-0 top-0 px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd flex items-center justify-center gap-2">
          DODAJ USŁUGĘ
        </h1>
        <div className="p-3 lg:p-6 w-full mt-12">
          <PortfolioItems
            user={user}
            setProject={setProject}
            project={project}
            setUploading={setUploading}
            setUploadCount={setUploadCount}
          />
        </div>
      </div>
    </div>
  );
}
