import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { BiSelectMultiple } from "react-icons/bi";
import Link from "next/link";
import { FaUpload } from "react-icons/fa6";
export default function Products({
  array,
  deleteRows,
  place,
}: {
  array: any;
  deleteRows: Function;
  place: string;
}) {
  const router = useRouter();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [chosenRows, setChosenRows] = useState<any[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  return (
    <div>
      {array.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                setChosenRows([]);
              }}
              className={`flex items-center justify-center p-2  text-zinc-800 drop-shadow-xl shadow-black ${
                isSelectMode
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-white hover:bg-gray-300"
              } duration-300`}
            >
              <BiSelectMultiple className="mr-2 h-6 w-6" />{" "}
              {isSelectMode ? <>Zaznaczanie (aktywne)</> : <>Zaznaczanie</>}
            </button>
            <button
              onClick={() => deleteRows(chosenRows)}
              className="p-2  text-zinc-800 drop-shadow-xl shadow-black bg-red-500 hover:bg-red-600 ml-2"
            >
              Usuń
            </button>
          </div>
          {isSelectMode && (
            <button
              onClick={() => {
                !selectedAll &&
                  setChosenRows(array.map((item: any) => item.id));
                setSelectedAll(!selectedAll);
                selectedAll && setChosenRows([]);
              }}
              className="p-2  text-zinc-800 drop-shadow-xl shadow-black bg-blue-500 hover:bg-blue-600"
            >
              {selectedAll ? <>Odznacz wszystkie</> : <>Zaznacz wszystkie</>}
            </button>
          )}
        </div>
      )}

      <Link
        href="/admin/products/new"
        title="Panel nowego produktu"
        className="text-lg font-bold flex flex-row items-center text-white mt-4 p-3 bg-green-500 w-max"
      >
        <FaUpload className="mr-2" />
        Utwórz nowy wpis
      </Link>

      <div className="flex flex-col mx-auto space-y-3 mt-4">
        {array
          ?.sort((a: any, b: any) => b.createdAt - a.createdAt)
          .map((item: any, i: any) => (
            <button
              onClick={() => {
                !isSelectMode &&
                  place !== "drafts" &&
                  router.push(`/admin/products/${item.id}`);
                !isSelectMode &&
                  place === "drafts" &&
                  router.push(`/admin/products/drafts/${item.id}`);
                isSelectMode && !chosenRows.includes(item.id)
                  ? setChosenRows([...chosenRows, item.id])
                  : setChosenRows(chosenRows.filter((id) => id !== item.id));
              }}
              key={i}
              className={`border-2 border-transparent flex flex-row p-0.5 text-zinc-800 relative h-12 w-full group border-dashed ${
                isSelectMode ? "hover:border-white" : ""
              } ${
                chosenRows.includes(item.id) && isSelectMode
                  ? "!border-green-500"
                  : ""
              }`}
            >
              {item.primaryImage && (
                <div className="h-full aspect-square flex items-start justify-center overflow-hidden">
                  <Image
                    src={item.primaryImage}
                    width={600}
                    height={600}
                    alt=""
                    className="w-auto object-cover h-full"
                  />
                </div>
              )}
              {!item.primaryImage && (
                <div className="h-full aspect-square bg-zinc-600 text-zinc-500 flex items-center justify-center">
                  <FaImage className="text-white" />
                </div>
              )}
              <div className="text-sm h-full w-full items-center bg-zinc-400 group-hover:bg-zinc-300 duration-300 flex flex-row justify-between p-3">
                {item.title && item.title} {!item.title && "Bez tytułu"}
                <div className="text-sm">
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
