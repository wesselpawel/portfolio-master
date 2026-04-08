"use client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/common/firebase/quixy";
import { useRouter } from "next/navigation";
import ChatRoom from "./ChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/common/redux/slices/modalsopen";
export default function Chat() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { source } = useSelector((state: any) => state.user);
  return (
    <>
      {modals.currentChat !== "" && modals.currentChat !== null && (
        <div>
          <button
            onClick={() => dispatch(set_modals({ ...modals, currentChat: "" }))}
            className={`z-[10001] fixed left-0 top-0 h-full w-full ${
              modals.currentChat !== "" && modals.currentChat !== null
                ? "scale-y-100 bg-black/70 duration-500 hover:bg-black/50"
                : "scale-y-0"
            }`}
          ></button>
          <div
            className={`${
              modals.currentChat !== "" && modals.currentChat !== null
                ? "translate-y-[0vh] duration-700"
                : "translate-y-[100vh]"
            } lg:w-[50vw] z-[10002] fixed left-1/2 -translate-x-1/2 w-[90%] bottom-0`}
          >
            {modals.currentChat !== "" && modals.currentChat !== null && (
              <ChatRoom clickedUserData={modals.currentChat} source={source} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
