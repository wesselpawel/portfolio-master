"use client";
import { auth } from "@/common/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import InitializeUser from "@/components/quixyComponents/InitializeUser";
import Settings from "@/components/quixyComponents/Dashboard/Settings/Settings";
import QuixiesModule from "@/components/quixyComponents/Dashboard/QuixiesModule";

export default function UserLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const light = useSelector((state: any) => state.light.light);

  return (
    <div className="z-[9999999999999999999999999999999]">
      <Settings isNavOpen={isNavOpen} />
      <QuixiesModule />
      <div className="w-full relative">
        <InitializeUser />
        <div className="relative h-full w-full flex flex-col lg:flex-row">
          <Nav setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
          <div className={`duration-300 w-full`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
