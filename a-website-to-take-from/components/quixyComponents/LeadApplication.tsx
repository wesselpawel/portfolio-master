import { updateDocument, updateUser } from "@/common/firebase/quixy";
import { set_modals } from "@/common/redux/slices/modalsopen";
import { setUser } from "@/common/redux/slices/user";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const updateUserLead = async (id: string, data: any) => {
  await updateDocument(["realized"], data, "users", id);
  await updateUser(id, {
    leads: data.leads.map((lead: any) =>
      lead.id === data.id ? { ...lead, status: data.status } : lead
    ),
  });
};

export default function LeadApplication({
  light,
  lead,
  filter,
}: {
  light: any;
  lead: any;
  filter: any;
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleUpdate = (status: string, id: string) => {
    setOptionsOpen(false);
    const updatedLeads = user.leads.map((l: any) =>
      l.id === id ? { ...l, status: status } : l
    );
    dispatch(setUser({ ...user, leads: updatedLeads }));
    updateUserLead(user?.id, { ...lead, status: status });
  };
  const downloadFile = async (urldata: string, name: string) => {
    const response = await fetch(urldata);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div
      className={`${
        light ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
      } relative p-3 h-max overflow-hidden rounded-md`}
    >
      {optionsOpen && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50" />
      )}
      <div className="flex w-full justify-between items-center">
        <div className="flex space-x-2">
          <p>{moment(lead?.creationTime).format("DD-MM-YYYY")}</p>
        </div>
      </div>

      {lead.type === "application" && (
        <table className={`w-full mt-3`}>
          <tbody>
            <tr className={`${light ? "bg-gray-300" : "bg-gray-700"}`}>
              <td>Rodzaj:</td>
              <td>Aplikacja</td>
            </tr>
            <tr className={`${light ? "bg-gray-200" : "bg-gray-600"}`}>
              <td>Imię i nazwisko:</td>
              <td>{lead.name}</td>
            </tr>
            <tr className={`${light ? "bg-gray-300" : "bg-gray-700"}`}>
              <td>Numer Telefonu:</td>
              <td>{lead.phoneNumber}</td>
            </tr>
            <tr className={`${light ? "bg-gray-200" : "bg-gray-600"}`}>
              <td>E-mail:</td>
              <td>{lead.email}</td>
            </tr>
            <tr className={`${light ? "bg-gray-300" : "bg-gray-700"}`}>
              <button
                className="block mt-2 w-max rounded bg-blue-500 text-white px-3 py-1"
                onClick={() =>
                  downloadFile(lead.document.url, lead.document.userFileName)
                }
              >
                Pobierz CV
              </button>
            </tr>
          </tbody>
        </table>
      )}
      {lead.type === "order" && (
        <table className="w-full mt-3">
          <tbody>
            <tr className={`${light ? "bg-gray-200" : "bg-gray-600"}`}>
              <td>Rodzaj:</td>
              <td>Zapytanie o usługę</td>
            </tr>
            <tr className={`${light ? "bg-gray-300" : "bg-gray-700"}`}>
              <td>Numer Telefonu:</td>
              <td>{lead.phoneNumber}</td>
            </tr>
            <tr className={`${light ? "bg-gray-200" : "bg-gray-600"}`}>
              <td>E-mail:</td>
              <td>{lead.email}</td>
            </tr>
            <tr className={`${light ? "bg-gray-300" : "bg-gray-700"}`}>
              <td>Wiadomość:</td>
              <td>{lead.message}</td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="flex flex-col w-full mt-3">
        <button
          disabled
          className="disabled:cursor-not-allowed w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
        >
          Oznacz jako sprawdzone
        </button>
      </div>
    </div>
  );
}
