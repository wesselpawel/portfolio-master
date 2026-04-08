"use client";
import ServiceCard from "@/components/quixyComponents/Dashboard/ServiceCard";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import EditService from "./EditService";
import { FaInfoCircle } from "react-icons/fa";

export default function Services() {
  const { light } = useSelector((state: any) => state.light);
  const { user } = useSelector((state: any) => state.user);
  const [openedService, setOpenedService] = useState<any>();
  const [editOpen, setEditOpen] = useState(false);
  function closeEdit() {
    setEditOpen(false);
    setOpenedService(null);
  }
  return (
    <>
      <div
        className={`${
          editOpen && "hidden"
        }  font-sans py-3 mx-3 lg:py-6 lg:mx-6 `}
      >
        <div
          className={`${editOpen && "hidden"} ${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <Link href="/user" className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </Link>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Usługi</h2>
            <p className="text-xs ">Znajdziesz tutaj wszystkie swoje usługi.</p>
          </div>
        </div>
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } relative mt-6 rounded-lg min-h-[70vh] text-white`}
        >
          {" "}
          <h1 className="px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
            TWOJE USŁUGI
          </h1>
          {!user?.projects || user?.projects?.length === 0 ? (
            <div
              className={`mt-6 min-h-[70vh] flex items-center justify-center flex-col ${
                light ? "bg-white text-black" : "bg-[#222430] text-white"
              } duration-300 rounded-lg`}
            >
              <div
                className={`${
                  light ? "bg-gray-200 text-black" : "bg-gray-700 text-white"
                } duration-300 flex justify-center items-center rounded-md flex-col p-3 lg:p-6 border border-gray-300`}
              >
                <div className="w-24 h-24 flex mb-3 items-center justify-center bg-gradient-to-br from-ctaStart via-ctaEnd to-primaryEnd rounded-full">
                  <IoClose className="text-5xl text-white" />
                </div>
                <p
                  className={`${
                    light ? "text-black" : "text-white"
                  } duration-300 text-lg font-light text-black  px-4 text-center`}
                >
                  Nie znaleziono aktywnych usług. Dodaj nową usługę,
                  <br /> aby rozpocząć!
                </p>
                <Link href="/user/new_service" className="mt-2">
                  <div className="flex items-center justify-center bg-gradient-to-r from-ctaStart to-primaryStart text-white font-bold py-2 px-4 rounded">
                    <FaPlus className="mr-2" />
                    Dodaj usługę
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className={`${editOpen && "hidden"}`}>
                <div className="mt-6 px-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {user?.projects?.map((project: any, i: any) => (
                    <ServiceCard
                      setEditOpen={setEditOpen}
                      setOpenedService={setOpenedService}
                      key={i}
                      service={project}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {editOpen && (
        <EditService
          light={light}
          closeEdit={closeEdit}
          openedService={openedService}
          user={user}
          setOpenedService={setOpenedService}
        />
      )}
    </>
  );
}
