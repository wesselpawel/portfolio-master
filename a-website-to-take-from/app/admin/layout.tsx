"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Loading from "./loading";
import { app, auth } from "@/common/firebase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import Toast from "@/components/Toast";
import Assistant from "@/components/assistant/Assistant";
import Nav from "@/components/Nav";

function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#404149] text-white font-sans">
      <h1 className="text-3xl font-bold mb-4">Brak dostępu</h1>
      <p className="mb-6">Nie masz uprawnień do przeglądania tej strony.</p>
      <Link
        href="/"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryHoverStart transition"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  const isAdmin = user && user.email === "admin456@admin.pl";

  return (
    <>
      <Toast />
      {!loading && (
        <div className="relative w-full overflow-x-hidden font-coco bg-[#404149] font-sans pb-48">
          {user ? (
            isAdmin ? (
              <>
                <Nav isNavOpen={isNavOpen} setNavOpen={setNavOpen} />
                <div className={` duration-500 w-full pt-24 scrollbar`}>
                  <Link href="/" className="absolute left-20 top-6 z-50">
                    <Image
                      src="/assets/quixy-logo.png"
                      width={200}
                      height={200}
                      alt=""
                      className="w-[150px]"
                    />
                  </Link>
                  {children}
                </div>
              </>
            ) : (
              <Forbidden />
            )
          ) : (
            <LoginPage />
          )}
        </div>
      )}
      {loading && <Loading />}
    </>
  );
}
