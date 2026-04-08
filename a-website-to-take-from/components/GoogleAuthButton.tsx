"use client";
import { provider, app } from "@/common/firebase/index";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const router = useRouter();
  async function onGoogle() {
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, provider);
      router.push("/user");
    } catch (e) {}
  }
  return (
    <button onClick={onGoogle} className="w-full border py-2 mt-2 text-black">
      Zaloguj z Google
    </button>
  );
}
