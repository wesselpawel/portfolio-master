import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ServiceOptionsOpened({
  optionsOpen,
  setEditOpen,
  setOptionsOpen,
  handleDeleteService,
  service,
  deleteMenu,
  setDeleteMenu,
  setOpenedService,
}: {
  optionsOpen: any;
  setEditOpen: (value: boolean) => void;
  setOptionsOpen: (value: boolean) => void;
  handleDeleteService: (id: string) => Promise<void>;
  service: any;
  deleteMenu: any;
  setDeleteMenu: any;
  setOpenedService: any;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`rounded-md px-2 z-10 absolute top-7 right-12 w-max h-max py-6 bg-gray-700 flex flex-col items-start space-y-1 duration-200 ease-in-out ${
        !optionsOpen ? "-translate-y-[80px] scale-y-0" : "-translate-y-0"
      }`}
    >
      <button
        onClick={() => {
          setEditOpen(true);
          setOpenedService(service);
          setOptionsOpen(false);
        }}
        className="w-full px-4 py-1 text-white bg-white bg-opacity-10 duration-150 hover:bg-opacity-20"
      >
        Edytuj
      </button>
      <button
        onClick={() => {
          setDeleteMenu(!deleteMenu);
        }}
        disabled={loading}
        className="w-full px-4 py-1 text-red-500 bg-white disabled:bg-red-400 bg-opacity-10 duration-150 hover:bg-opacity-20"
      >
        {loading && (
          <div className="h-4 w-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
        )}

        {deleteMenu ? "Anuluj" : "Usuń"}
      </button>
      {deleteMenu && (
        <button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            handleDeleteService(service.id).then(() => setLoading(false));
          }}
          className="disabled:bg-red-400 w-full px-4 py-1 text-white bg-red-500 bg-opacity-100 duration-150 hover:bg-opacity-90"
        >
          {loading && (
            <div className="h-4 w-4 border-b-2 border-white border-solid rounded-full animate-spin"></div>
          )}{" "}
          Usuń
        </button>
      )}
    </div>
  );
}
