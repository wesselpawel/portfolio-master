// components/dashboard/chat/ChatHeader.tsx
import { set_modals } from "@/common/redux/slices/modalsopen";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaArrowRight,
  FaCog,
  FaList,
  FaListAlt,
  FaTrophy,
} from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface ChatHeaderProps {
  chattingWith: string;
  clickedUserData: any;
  source: any;
  chatListOpen: any;
  setChatListOpen: any;
}
export default function ChatHeader({
  chattingWith,
  clickedUserData,
  source,
  chatListOpen,
  setChatListOpen,
}: ChatHeaderProps) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <>
      <div className="text-[#fff] bg-gradient-to-r from-primary to-cta text-xl p-3 lg:p-6 flex items-center justify-between w-full 2xl:px-10 sticky left-0 top-0 ">
        Nowa wiadomość
        {/* <div className=" w-full flex items-center justify-between text-black font-bold text-2xl">
          <button
            onClick={() => {
              dispatch(set_modals({ ...modals, currentChat: "" }));
            }}
            className="text-black"
          >
            <IoClose className="w-7" />
          </button>
        </div> */}
      </div>
      {/* <div className="font-bold flex items-center bg-white text-black p-6">
        {clickedUserData?.photoURL && (
          <div className="rounded-full w-16 h-16 relative overflow-hidden mr-3">
            <Image
              src={clickedUserData?.photoURL}
              width={124}
              height={124}
              style={{ boxShadow: "0px 0px 5px #000000" }}
              alt={`Zdjęcie główne użytkownika ${
                clickedUserData?.name || clickedUserData?.login
              }`}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
        )}
        {!clickedUserData?.photoURL && (
          <div
            style={{ boxShadow: "0px 0px 5px #000000" }}
            className="flex items-center justify-center text-2xl p-3 w-16 h-16 text-white rounded-full bg-[#fff] mr-4"
          >
            {clickedUserData?.login[0].toUpperCase()}
          </div>
        )}
        Czatujesz z
        <div className="flex items-center ml-1 text-center">
          {clickedUserData?.name || clickedUserData?.pseudo}{" "}
        </div>
      </div> */}
    </>
  );
}
