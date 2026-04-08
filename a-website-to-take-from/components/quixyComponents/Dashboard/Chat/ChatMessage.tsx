// components/dashboard/chat/ChatMessage.tsx
import Image from "next/image";
import React from "react";

// message
// id: string;
// content: string;
// sender: string;
// timestamp: string;

export default function ChatMessage({
  message,
  clickedUserData,
  source,
}: {
  message: any;
  clickedUserData: any;
  source: any;
}) {
  return (
    <div className={`w-full text-black text-light text-base lg:text-xl`}>
      <div
        className={`${
          clickedUserData?.uid === message?.sender
            ? "animate-message-to-right"
            : "animate-message-to-left"
        } my-3 p-2  text-white flex items-start ${
          clickedUserData?.uid === message?.sender
            ? "flex-row"
            : "flex-row-reverse"
        } w-full`}
      >
        {clickedUserData?.photoURL &&
          clickedUserData?.uid === message?.sender && (
            <Image
              src={clickedUserData?.photoURL}
              width={40}
              height={40}
              alt="User Avatar"
              className="rounded-full w-12 h-12 aspect-square"
            />
          )}
        {!clickedUserData?.photoURL &&
          clickedUserData?.uid === message?.sender && (
            <div className="w-max">
              <div
                style={{ boxShadow: "0px 0px 5px #000000" }}
                className="flex items-center justify-center xl:text-2xl p-3 w-12 h-12 aspect-square text-white rounded-full bg-[#fff]"
              >
                {clickedUserData?.pseudo[0].toUpperCase()}
              </div>
            </div>
          )}
        {source?.photoURL && source?.uid === message?.sender && (
          <Image
            src={source?.photoURL}
            width={40}
            height={40}
            alt="User Avatar"
            className="rounded-full w-12 h-12 aspect-square"
          />
        )}
        {!source?.photoURL && source?.uid === message?.sender && (
          <div className="w-max">
            <div
              style={{ boxShadow: "0px 0px 5px #000000" }}
              className="flex items-center justify-center xl:text-2xl p-3 w-12 h-12 aspect-square text-white rounded-full bg-[#fff]"
            >
              {source?.pseudo[0].toUpperCase()}
            </div>
          </div>
        )}
        <div
          className={`text-xs ${
            clickedUserData?.uid === message?.sender
              ? "text-left bg-[#fff] ml-3 p-3 "
              : "text-right bg-green-700 mr-3 p-3 "
          } w-auto`}
        >
          {message?.content}
        </div>
      </div>
    </div>
  );
}
