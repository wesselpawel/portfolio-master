"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
async function addOrder(data: any) {
  const isSuccess = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/addOrder/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    }
  ).then((res: any) => res.json());
  return isSuccess;
}

interface MessageInputProps {
  value: any;
}

const MessageInput: React.FC<MessageInputProps> = ({ value }) => {
  const [sent, setSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return (
      regex.test(phoneNumber) &&
      (phoneNumber.length === 9 ||
        phoneNumber.length === 11 ||
        phoneNumber.length === 12)
    );
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendMessage = async (value: any) => {
    if (message.trim() === "") {
      toast.error("Treść zapytania jest wymagana", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Numer telefonu jest nieprawidłowy", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Adres email jest nieprawidłowy", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    const id = uuidv4();
    await addOrder({
      message,
      phoneNumber,
      creationTime: Date.now(),
      email,
      id,
      uid: value.uid,
    });
    setSent(true);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-semibold text-gray-700 mb-1"
        >
          Numer telefonu
        </label>
        <input
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e: any) => setPhoneNumber(e.target.value)}
          type="text"
          placeholder="Wpisz numer telefonu"
          className={`p-2 rounded-md text-black border-2 focus:ring-2 focus:ring-accent ${
            sent ? "border-green-500 bg-gray-300" : "border-gray-500"
          }`}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          type="text"
          placeholder="Wpisz email"
          className={`p-2 rounded-md text-black border-2 focus:ring-2 focus:ring-accent ${
            sent ? "border-green-500 bg-gray-300" : "border-gray-500"
          }`}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-gray-700 mb-1"
        >
          Treść zapytania
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Wpisz treść zapytania"
          autoFocus
          className={`p-3 h-24 w-full resize-none rounded-md border-2 text-black outline-none focus:ring-2 focus:ring-accent ${
            sent ? "border-green-500 bg-gray-300" : "border-gray-500"
          }`}
          disabled={!value?.access || sent}
        />
      </div>

      {sent && (
        <div className="text-green-500 font-bold">
          Zapytanie zostało wysłane!
        </div>
      )}

      <button
        onClick={() => handleSendMessage(value)}
        className={`py-2 w-full bg-gradient-to-r from-accentStart to-accentEnd text-white font-bold rounded-md flex items-center justify-center hover:opacity-90 transition-opacity ${
          !sent
            ? " from-accentStart to-accentEnd "
            : "from-green-500 to-green-600"
        }`}
      >
        {!sent ? "Wyślij zapytanie" : "Dziękujemy!"}

        {!sent && <IoSend className="ml-2" />}
      </button>
    </div>
  );
};

export default MessageInput;
