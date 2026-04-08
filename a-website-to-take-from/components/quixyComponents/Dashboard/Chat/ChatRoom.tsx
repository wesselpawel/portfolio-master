"use client";
import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
interface ChatRoomProps {
  clickedUserData: any;
  source: any;
}

export default function ChatRoom({ clickedUserData }: ChatRoomProps) {
  const scrollToBottom = () => {
    const element = document.getElementById("chat");
    setTimeout(() => {
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 200);
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <div className="bg-white overflow-hidden rounded-t-lg max-w-[40rem] mx-auto">
      {clickedUserData && (
        <div className="h-full">
          <div className="w-full">
            <h2 className="bg-gradient-to-r from-ctaStart to-primaryStart p-3 lg:p-6 lg:text-xl font-extrabold text-white">
              Wyślij zapytanie do {clickedUserData?.name}
            </h2>{" "}
            <div className="p-3">
              <MessageInput value={clickedUserData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
