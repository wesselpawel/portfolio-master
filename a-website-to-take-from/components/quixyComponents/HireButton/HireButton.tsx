"use client";
import { auth } from "@/common/firebase/quixy";
import { set_modals } from "@/common/redux/slices/modalsopen";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCircleXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function HireButton({
  talentSlugData,
}: {
  talentSlugData: any;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const [user, loading] = useAuthState(auth);
  return (
    <div>
      <button
        className={`bg-gradient-to-b from-ctaStart to-ctaEnd px-4 py-2  text-white font-lato rounded-md`}
        onClick={() => {
          if (talentSlugData.uid === user?.uid) {
            return toast.error("Nie możesz aplikować do samego siebie", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            dispatch(set_modals({ ...modals, currentChat: talentSlugData }));
          }
        }}
      >
        Wyślij zapytanie
      </button>
    </div>
  );
}
