"use client";

import { updateLead } from "@/common/firebase";
import { renderMarkdown } from "@/lib/parseMarkdown";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";
/**
 * Komponent Lead
 * @param {object} lead - obiekt leada
 * @param {string} filter - filtr do wyświetlania leadów
 * @param {function} setIsAnimating - funkcja do zmiany wartości isAnimating
 * @param {boolean} isAnimating - wartość, która określa, czy animacja jest włączona
 * @param {function} setIsSigning - funkcja do zmiany wartości isSigning
 * @param {object} signingLead - obiekt leada, który jest aktualnie podpisywany
 * @param {function} setNoteOpen - funkcja do otwarcia okienka z notatką
 * @param {boolean} optionsOpen - wartość, która określa, czy okienko z opcjami jest otwarte
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOptionsOpen - funkcja do zmiany wartości optionsOpen
 * @param {React.Dispatch<React.SetStateAction<any>>} setEditorState - funkcja do zmiany wartości editorState
 */
export default function Lead({
  lead,
  filter,
  setIsAnimating,
  isAnimating,
  setIsSigning,
  setSigningLead,
  setNoteOpen,
  signingLead,
}: {
  lead: any;
  filter: string;
  setIsAnimating: any;
  isAnimating: boolean;
  setIsSigning: any;
  setSigningLead: any;
  setNoteOpen: any;
  signingLead: any;
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const [editorState, setEditorState] = useState<any>();

  return (
    <div
      key={lead.id}
      className={`relative bg-black p-3 h-max border-[3px] overflow-hidden ${
        lead.status === "trash" && "border-orange-700"
      } ${lead.status === "reseted" && "border-white"} ${
        lead.status === "accepted" && "border-green-500"
      } ${lead.status === undefined && "border-black"} ${
        lead.status === "rejected" && "border-red-500"
      } ${lead?.status === "accepted" && "border-yellow-400"}`}
    >
      {optionsOpen && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50" />
      )}
      {lead.signed && (
        <div
          onClick={() => {
            setIsAnimating(true);
            setTimeout(() => {
              setIsAnimating(false);
            }, 7750);
          }}
          className="cursor-pointer absolute w-full h-full z-50 bg-black left-0 top-0 bg-opacity-80 flex items-center justify-center"
        >
          <Image
            src="/dolar.gif"
            width={200}
            height={200}
            alt=""
            className={`w-1/2 ${isAnimating && "animate-bounce"}`}
          />
        </div>
      )}
      {isAnimating && signingLead.id === lead.id && (
        <div
          onClick={() => {
            setIsAnimating(true);
            setTimeout(() => {
              setIsAnimating(false);
            }, 7750);
          }}
          className="cursor-pointer absolute w-full h-full z-50 bg-black left-0 top-0 bg-opacity-80 flex items-center justify-center"
        >
          <Image
            src="/dolar.gif"
            width={200}
            height={200}
            alt=""
            className={`w-1/2 ${isAnimating && "animate-bounce"}`}
          />
        </div>
      )}
      <div className="flex w-full justify-between items-center">
        <div className="flex space-x-2">
          <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
          <p className="text-blue-500 font-light font-gotham italic">
            {moment(lead.createdAt).fromNow()}
          </p>
        </div>
        <button
          onClick={() => setOptionsOpen(!optionsOpen)}
          className="text-3xl text-white h-full px-2 hover:bg-white hover:bg-opacity-20 relative z-50"
        >
          <HiOutlineDotsHorizontal />
        </button>
        <div
          className={`z-50 absolute top-14 right-14 w-max h-max py-6 bg-black flex flex-col items-start space-y-1 duration-200 ease-in-out ${
            !optionsOpen ? "-translate-y-[300px]" : "-translate-y-0"
          }`}
        >
          <button
            onClick={() =>
              updateLead(lead.id, {
                ...lead,
                isFinished: false,
                isTrash: false,
                signed: false,
                status: "reseted",
              }).then(() => setOptionsOpen(false))
            }
            className="w-full px-4 py-1 text-white bg-white bg-opacity-0 duration-150 hover:bg-opacity-20"
          >
            Resetuj
          </button>
        </div>
      </div>
      <table className="w-full mt-3">
        <tbody>
          <tr className="bg-gray-700">
            <td>Komornik:</td>
            <td>{lead.debtStatus}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Źródło ciepła:</td>
            <td>{lead.heatingSource}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Hektary:</td>
            <td>{lead.hectareCount}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Więcej niż 10 lat:</td>
            <td>{lead.houseAge}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Rodzaj budynku:</td>
            <td>{lead.houseType}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Dochody:</td>
            <td>{lead.incomeLevel}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Właściciel KW:</td>
            <td>{lead.ownership === true ? "Tak" : "Nie"}</td>
          </tr>
          <tr className="bg-gray-600">
            <td>Numer KW:</td>
            <td>
              {lead?.ownerNumber1 &&
              lead?.ownerNumber2 &&
              lead?.ownerNumber3 ? (
                <div>
                  {lead?.ownerNumber1} / {lead?.ownerNumber2} /{" "}
                  {lead?.ownerNumber3}
                </div>
              ) : (
                "Nie podano"
              )}{" "}
            </td>
          </tr>
          <tr className="bg-gray-700">
            <td>Numer Telefonu:</td>
            <td>
              {lead.phone} {lead.name}
            </td>
          </tr>
          <tr className="bg-gray-600">
            <td>Uczestnicy gospodarstwa:</td>
            <td>{lead.visitors}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Region:</td>
            <td>{lead?.region ? lead.region : "Nie podano"}</td>
          </tr>
        </tbody>
      </table>
      <div className="pt-3 w-full flex flex-row justify-between">
        <div>Notatka:</div>
        <button
          onClick={() => {
            setNoteOpen(lead);
          }}
          className="text-blue-500 font-light p-0.5 px-2 hover:bg-white hover:bg-opacity-20"
        >
          Edytuj
        </button>
      </div>
      {lead?.note !== undefined && (
        <div dangerouslySetInnerHTML={renderMarkdown(lead.note)} />
      )}

      <div className="flex flex-col w-full mt-3">
        {!lead.isFinished && (
          <button
            onClick={() =>
              updateLead(lead.id, {
                ...lead,
                isFinished: true,
              })
            }
            className="w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
          >
            Oznacz jako sprawdzone
          </button>
        )}
        {lead.isFinished && (!lead?.status || lead.status === "reseted") && (
          <div className="grid grid-cols-2 mt-2 gap-2">
            <button
              onClick={() =>
                updateLead(lead.id, {
                  ...lead,
                  status: "rejected",
                })
              }
              className="bg-gray-500 hover:bg-gray-400 p-3 rounded"
            >
              Odrzuć
            </button>
            <button
              onClick={() =>
                updateLead(lead.id, {
                  ...lead,
                  status: "accepted",
                })
              }
              className="bg-green-500 hover:bg-green-400 p-3 rounded"
            >
              Akceptuj
            </button>
          </div>
        )}
        {lead?.status === "accepted" && !lead.signed && (
          <button
            onClick={() => {
              setIsSigning(true);
              setSigningLead(lead);
            }}
            className="w-full text-center bg-gradient-to-br from-yellow-800 via-yellow-400 to-yellow-800 hover:from-yellow-600 hover:via-yellow-400 hover:to-yellow-600 font-bold text-white py-2 text-base mt-2 relative group"
          >
            <span className="drop-shadow-xl shadow-black">Podpisz</span>{" "}
            <IoDiamondOutline className="group-hover:scale-150 duration-500 absolute right-3 top-1/2 -translate-y-1/2 text-white ml-2 text-2xl" />
          </button>
        )}
        {lead.isFinished && !lead?.status && (
          <Link
            className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2 rounded"
            href={`tel:${lead.phone}`}
          >
            Zadzwoń
          </Link>
        )}
      </div>
    </div>
  );
}
