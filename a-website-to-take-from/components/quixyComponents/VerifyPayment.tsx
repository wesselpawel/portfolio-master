"use client";
import { updateDocument } from "@/common/firebase/quixy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPayment({
  order,
  user,
  orderToCompare,
}: {
  order: any;
  user: any;
  orderToCompare: any;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const addCoins = async () => {
    try {
      await updateDocument(["realized"], [true], "orders", orderToCompare.id);
      await updateDocument(
        ["tokens"],
        [user?.tokens + orderToCompare.quantity],
        "users",
        user?.uid
      );
      setIsMounted(true);
    } catch (error) {
      if (error) return;
    }
  };

  useEffect(() => {
    if (!isMounted && !orderToCompare.realized) {
      setIsMounted(true);
      addCoins();
    }
  }, [isMounted]);

  return <div></div>;
}
