"use client";
import { FaCheckCircle } from "react-icons/fa";
import { updateDocument } from "@/common/firebase/quixy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail({ userId }: { userId: any }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const sendMail = async () => {
    try {
      await updateDocument(["emailVerified"], [true], "users", userId)
        .then(() => {
          setIsMounted(true);
        })
        .then(() => {
          router.push("/login");
        });
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      sendMail().catch((error) => {
        return;
      });
    }
  }, [isMounted]);

  return (
    <div
      className="text-center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isMounted && (
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="text-5xl text-green-500">
            <FaCheckCircle />
          </div>
          <div>Zweryfikowano pomyślnie!</div>
        </div>
      )}
    </div>
  );
}
