"use client";
import { auth } from "@/common/firebase";
import { getDocument } from "@/common/firebase/quixy";

import { setUser } from "@/common/redux/slices/user";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

export default function InitializeUser() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.user);
  useEffect(() => {
    if (!userData && user) {
      getDocument("users", user?.uid).then((data) => {
        dispatch(setUser(data));
      });
    }
  }, [user]);
  return <div></div>;
}
