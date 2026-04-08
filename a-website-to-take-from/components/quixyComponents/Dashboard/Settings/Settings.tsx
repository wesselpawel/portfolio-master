"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { updateUser } from "@/common/firebase/quixy";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/common/redux/slices/modalsopen";

const SettingsInputs = dynamic(
  () => import("./SettingsInputs/SettingsInputs"),
  {
    ssr: false,
  }
);
const Unsaved = dynamic(() => import("./SettingsInputs/Unsaved"), {
  ssr: false,
});

export default function Settings({ isNavOpen }: { isNavOpen: boolean }) {
  const [error, setError] = useState<any>("");
  const [changesWereMade, setChangesWereMade] = useState<any>(false);
  const { modals } = useSelector((state: any) => state.modals);
  const { light } = useSelector((state: any) => state.light);
  const dispatch = useDispatch();
  return (
    <>
      <button
        disabled={error}
        onClick={() => {
          changesWereMade
            ? setError(true)
            : dispatch(set_modals({ ...modals, config: !modals.config }));
          setTimeout(() => {
            setError(false);
          }, 1200);
        }}
        className={`disabled:cursor-not-allowed fixed z-[500] left-0 top-0 w-screen h-screen ${
          modals.config ? "block" : "hidden"
        } bg-black/80 hover:bg-black/70 duration-300`}
      />
      <div
        className={`fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 max-h-[80vh] z-[800] w-[95vw] lg:w-[50rem] rounded-lg overflow-y-scroll scrollbar ${
          modals?.config ? "block" : "hidden"
        } mb-12`}
      >
        <div className={`${error && "vibrate-screen"}`}>
          <SettingsInputs
            light={light}
            changesWereMade={changesWereMade}
            setChangesWereMade={setChangesWereMade}
            setError={setError}
          />
          <Unsaved
            light={light}
            changesWereMade={changesWereMade}
            error={error}
            updateUser={updateUser}
            setChangesWereMade={setChangesWereMade}
          />
        </div>
      </div>
    </>
  );
}
