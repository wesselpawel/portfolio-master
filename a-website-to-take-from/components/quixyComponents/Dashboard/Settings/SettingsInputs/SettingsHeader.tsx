"use client";
import { set_modals } from "@/common/redux/slices/modalsopen";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsHeader({
  changesWereMade,
  setError,
}: {
  changesWereMade: any;
  setError: any;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div className="sticky top-0 left-0 text-base text-white font-bold z-[5000] flex items-center justify-between w-full">
      <div className="px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
        PORTFOLIO
      </div>
      <div className="flex">
        <button
          onClick={() => {
            if (!changesWereMade) {
              dispatch(set_modals({ ...modals, config: false }));
            } else {
              setError(true);
            }

            setTimeout(() => {
              setError(false);
            }, 1200);
          }}
        >
          <div className="text-2xl aspect-square w-11 h-11 group-hover:rounded-l-none  bg-red-600 hover:bg-red-700 duration-100 text-white items-center justify-center flex">
            <IoClose />
          </div>
        </button>
      </div>
    </div>
  );
}
