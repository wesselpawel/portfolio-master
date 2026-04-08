"use client";
import { getDocument } from "@/common/firebase";
import { set_modals } from "@/common/redux/slices/modalsopen";
import { setUser } from "@/common/redux/slices/user";
import { useDispatch, useSelector } from "react-redux";

export default function Unsaved({
  light,
  changesWereMade,
  error,
  setChangesWereMade,
  updateUser,
}: {
  light: any;
  changesWereMade: boolean;
  error: boolean;
  setChangesWereMade: (value: boolean) => void;
  updateUser: (uid: string, data: any) => Promise<void>;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { user } = useSelector((state: any) => state.user);
  return (
    <div
      className={`${
        changesWereMade
          ? "left-0 bottom-0 sticky z-[6000] scale-x-100"
          : "left-0 bottom-0 fixed z-[-70] scale-x-0"
      } flex items-center justify-center`}
    >
      <div
        className={`flex space-x-3 lg:space-x-6 p-3 px-5 items-center justify-center w-full ${
          error
            ? "bg-red-500"
            : "bg-gradient-to-b from-primaryStart to-primaryEnd"
        } ${
          changesWereMade
            ? "duration-300 translate-y-0"
            : "translate-y-[200px] duration-300"
        } `}
      >
        <div className="text-white font-extralight pr-3 ">
          <b>Uwaga!</b> - Masz niezapisane zmiany{" "}
          <button
            onClick={() => {
              getDocument("users", user?.uid).then((snapshot) => {
                dispatch(setUser(snapshot));
              });
              setChangesWereMade(false);
              dispatch(set_modals({ ...modals, config: false }));
            }}
            className="font-bold text-white text-xs underline hover:no-underline"
          >
            Cofnij
          </button>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center w-max">
          <button
            onClick={() => {
              const history = user?.history ? [...user?.history] : [];
              updateUser(user?.uid, {
                ...user,
                configured: true,
                history: [
                  ...history,
                  {
                    creationTime: Date.now(),
                    action: "Aktualizacja profilu",
                  },
                ],
              });
              dispatch(
                setUser({
                  ...user,
                  configured: true,
                  history: [
                    ...history,
                    {
                      creationTime: Date.now(),
                      action: "Aktualizacja profilu",
                    },
                  ],
                })
              );
              setChangesWereMade(false);
            }}
            className="text-white text-sm bg-gradient-to-b rounded-md from-ctaStart to-ctaEnd font-gotham px-6 py-2"
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}
