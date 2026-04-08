"use client";
import { auth } from "@/common/firebase/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
async function getStripeCheckoutByQuixyPacket(uid: any, packet: string) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/stripe/getStripeCheckoutByQuixyPacket?uid=${uid}&packet=${packet}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const data = req.json();
  return data;
}
function StripeButton({ item }: { item: any }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [success, setSuccess] = useState(false);
  const sendCheckoutRequest = async () => {
    setLoading(true);
    if (!loading && !user) {
      router.push("/login");
      setLoading(false);
    }
    await getStripeCheckoutByQuixyPacket(user?.uid!, item.plainName).then(
      (data: any) => {
        setLoading(false);
        setSuccess(true);
        if (data) {
          setLoading(false);
          router.replace(`${data?.url}`);
        }
      }
    );
  };
  return (
    <button
      className={`w-full disabled:cursor-not-allowed `}
      disabled={isLoading || success}
      onClick={sendCheckoutRequest}
    >
      <div
        className={`w-full font-bold relative flex items-center justify-center text-center text-white bg-gradient-to-b from-ctaStart to-ctaEnd px-6 py-1 mt-2 text-base `}
      >
        {isLoading && (
          <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
        )}
        {!isLoading && (
          <>
            <div className="w-max text-sm sm:text-base group-hover:scale-y-100 duration-100 group-hover:delay-150 scale-y-0 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
              Kup za {item.price},99 PLN
            </div>
            <div
              className={`w-max text-sm sm:text-lg group-hover:scale-y-0 duration-150 ease-in-out ${
                item.discount > 0 && "line-through text-gray-400"
              }`}
            >
              <span className="mr-1">💎</span>
              {item.quantity}{" "}
            </div>{" "}
            <div
              className={`${
                item.discount === 0 && "hidden"
              } w-max text-sm sm:text-lg group-hover:scale-y-0 duration-150 ease-in-out`}
            >
              {" "}
              <span className="mr-1">💎</span>
              {item.quantity + item.quantity * item.discount}
            </div>
          </>
        )}
      </div>
    </button>
  );
}

export default StripeButton;
