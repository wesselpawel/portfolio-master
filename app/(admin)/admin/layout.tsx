"use client";
import { auth, getDocument } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Nav from "./Nav";
import Loading from "./loading";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { Providers } from "@/redux/Provider";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<any>();

  const [isNavOpen, setNavOpen] = useState(true);
  useEffect(() => {
    if (user) {
      getDocument("users", user?.uid).then((res) => setUserData(res));
    }
  }, [loading, user]);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="-mt-[75px] w-full font-sans relative z-[15000] bg-white">
        {userData && userData?.isAdmin ? (
          <>
            <Providers>
              <Nav isNavOpen={isNavOpen} setNavOpen={setNavOpen} />
              <div
                className={`${
                  isNavOpen ? "pl-[300px]" : "pl-[0px]"
                } duration-500 min-w-full min-h-screen bg-[#222430]`}
              >
                {children}
              </div>
            </Providers>
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    );
}
