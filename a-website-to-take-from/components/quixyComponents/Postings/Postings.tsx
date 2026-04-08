"use client";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaChevronLeft, FaPlus } from "react-icons/fa6";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { JobPosting } from "@/types";
import { updateJobOffer, updateUser } from "@/common/firebase/quixy";
import { useState } from "react";
import { setUser } from "@/common/redux/slices/user";
import "quill/dist/quill.snow.css";
import "moment/locale/pl";
import { toast } from "react-toastify";
import Posting from "./Posting";
import { set_modals } from "@/common/redux/slices/modalsopen";
import EditJobOffer from "../EditJobOffer/EditJobOffer";
interface IProjectImage {
  src: string;
  desc: string;
}

export interface IProject {
  name: string;
  desc: string;
  images: IProjectImage[];
  url: string;
  time: string;
  isRecruitment: boolean;
  price: any;
  isPaid: boolean;
  days: number;
  type: "quick" | "normal";
  id: string;
  expirationTime: number;
  companySize: string;
  creationTime: number;
  extraDays: number;
  link: string;
}

const JobOfferList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const { modals } = useSelector((state: any) => state.modals);
  const [editOpen, setEditOpen] = useState(false);
  const [openedJobOffer, setOpenedJobOffer] = useState<any>({});
  const pay = (jobOffer: JobPosting) => {
    setLoading(true);
    if (user?.tokens < jobOffer.price) {
      return (
        dispatch(set_modals({ ...modals, quixies: true })),
        setLoading(false),
        toast.error("Niewystarczająca ilość Quixies", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
      );
    }
    updateJobOffer(jobOffer.id, { isPaid: true });
    updateUser(user.uid, {
      tokens: user.tokens - jobOffer.price,
      job_offers: user.job_offers.map((offer: any) =>
        offer.id === jobOffer.id ? { ...offer, isPaid: true } : offer
      ),
    });
    dispatch(
      setUser({
        ...user,
        tokens: user.tokens - jobOffer.price,
        job_offers: user.job_offers.map((offer: any) =>
          offer.id === jobOffer.id ? { ...offer, isPaid: true } : offer
        ),
      })
    );
  };
  function closeEdit() {
    setEditOpen(false);
    setOpenedJobOffer({});
  }
  const { light } = useSelector((state: any) => state.light);
  if (!user?.job_offers || user?.job_offers?.length === 0) {
    return (
      <div className="font-sans py-3 mx-3 lg:py-6 lg:mx-6 ">
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } duration-300  rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <Link href="/user" className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </Link>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Oferty pracy</h2>
            <p className="text-xs ">
              Tutaj znajdziesz wszystkie swoje oferty pracy
            </p>
          </div>
        </div>
        <div
          className={`mt-6 h-screen flex items-center justify-center flex-col ${
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
              Nie znaleziono aktywnych ofert pracy. Dodaj nową ofertę,
              <br /> aby rozpocząć!
            </p>
            <Link href="/user/add_job_offer" className="mt-2">
              <div className="flex items-center justify-center bg-gradient-to-r from-ctaStart to-primaryStart text-white font-bold py-2 px-4 rounded">
                <FaPlus className="mr-2" />
                Dodaj ofertę pracy
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex flex-col w-full font-sans`}>
      {editOpen && (
        <EditJobOffer jobOffer={openedJobOffer} closeEdit={closeEdit} />
      )}
      <div className={`${editOpen && "hidden"} py-3 mx-3 lg:py-6 lg:mx-6 `}>
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } duration-300 rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <Link href="/user" className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </Link>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Oferty pracy</h2>
            <p className="text-xs ">
              Tutaj znajdziesz wszystkie swoje oferty pracy
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${
          editOpen && "hidden"
        } min-h-screen grid grid-cols-1 2xl:grid-cols-2 gap-3 mx-3 lg:mx-6  rounded-lg`}
      >
        {user?.job_offers?.map((jobOffer: JobPosting, i: number) => (
          <Posting
            setEditOpen={setEditOpen}
            setOpenedJobOffer={setOpenedJobOffer}
            key={i}
            job={jobOffer}
            pay={pay}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default JobOfferList;
