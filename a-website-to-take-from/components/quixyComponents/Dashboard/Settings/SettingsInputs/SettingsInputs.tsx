"use client";
import TagsHandler from "../SettingsTagsHandler";
import PreferencesHandler from "../SettingsPreferencesHandler";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/common/redux/slices/user";
import EssentialUserInfo from "./EssentialUserInfo";
import SettingsHeader from "./SettingsHeader";
import GoogleView from "./GoogleView";
import ChooseAccountType from "./ChooseAccountType";

export default function SettingsInputs({
  changesWereMade,
  setChangesWereMade,
  light,
  setError,
}: {
  changesWereMade: any;
  setChangesWereMade: any;
  light: any;
  setError: any;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const addPreference = (preference: any) => {
    const newPreferences = user?.preferences
      ? [...user?.preferences, preference]
      : [preference];
    dispatch(setUser({ ...user, preferences: newPreferences }));
    setChangesWereMade(true);
  };

  const removePreference = (preference: any) => {
    const newPreferences = user?.preferences.filter(
      (item: string) => item !== preference
    );
    dispatch(setUser({ ...user, preferences: newPreferences }));
    setChangesWereMade(true);
  };

  return (
    <div>
      <div
        className={`${
          light ? "bg-white text-black" : "bg-[#222430] text-white"
        } duration-300 pb-24 rounded-lg relative`}
      >
        <SettingsHeader setError={setError} changesWereMade={changesWereMade} />
        {user?.seek === "ask" && (
          <ChooseAccountType setChangesWereMade={setChangesWereMade} />
        )}
        {user?.seek !== "ask" && (
          <>
            <EssentialUserInfo
              light={light}
              setChangesWereMade={setChangesWereMade}
            />
            <TagsHandler light={light} />
            <PreferencesHandler
              light={light}
              addPreference={addPreference}
              removePreference={removePreference}
            />
            <GoogleView setChangesWereMade={setChangesWereMade} />
          </>
        )}
      </div>
    </div>
  );
}
