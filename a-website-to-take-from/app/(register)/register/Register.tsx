"use client";
import Toast from "@/components/Toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { addDocument, getDocument } from "@/common/firebase/quixy";
import { auth } from "@/common/firebase/firebase";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { errorCatcher } from "@/utils/errorCatcher";
import CreateAccountForm from "./CreateAccountForm";
import FirstStep from "./FirstStep";
import FirstStepButtons from "./FirstStepButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUser } from "@/common/redux/slices/user";
import { useDispatch } from "react-redux";
export default function Register() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    email: "",
    type: "",
  });
  const [configured, setConfigured] = useState(false);
  const [seek, setSeek] = useState<any>(false);
  const [isLoading, setLoading] = useState(false);
  function createAccount() {
    setLoading(true);
    const id = toast.loading(<span>Sekunda...</span>, {
      position: "bottom-right",
      isLoading: true,
    });

    if (userData.password !== userData.repeatPassword) {
      setLoading(false);
      toast.update(id, {
        render: "Hasła nie są takie same",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    if (userData.password?.length < 6) {
      setLoading(false);
      toast.update(id, {
        render: "Hasło powinno składać się z minimum 6 znaków",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    if (!userData.email) {
      setLoading(false);
      toast.update(id, {
        render: "Prosimy wpisać email",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    (async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((userCredential) => {
          addDocument("users", userCredential.user?.uid, {
            leads: [],
            city: "",
            description: "",
            title: "",
            pseudo: "",
            uid: userCredential.user?.uid,
            hourRate: "",
            name: "",
            email: userData.email,
            photoURL: "",
            totalSpent: 0,
            totalReceived: 0,
            tokens: 20,
            isPremium: false,
            emailVerified: false,
            ideas: [],
            jobOffers: [],
            groups: [],
            profileComments: [],
            generatedImages: [],
            projects: [],
            history: [
              {
                action: `Dołączył/a do Quixy! Witamy na pokładzie i zapraszamy do konfiguracji profilu.`,
                creationTime: Date.now(),
              },
            ],
            seek: seek === true || seek === false ? seek : "ask",
            configured: configured,
          });

          toast.update(id, {
            render: "Konto utworzone pomyślnie!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          router.push("/user");
          setLoading(false);
        });
      } catch (err: any) {
        const errorMsg = errorCatcher(err);
        toast.update(id, {
          render: errorMsg,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setLoading(false);
      }
    })();
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && !loading) {
      getDocument("users", user?.uid)
        .then((data) => {
          dispatch(setUser(data));
        })
        .then(() => {
          router.push("/user");
        });
    }
  }, [loading, user]);
  return (
    <div className="font-sans w-full min-h-screen bg-center mx-auto relative flex flex-col-reverse md:flex-row bg-white">
      <Toast />
      <div
        style={{ boxShadow: "inset 0 0 3px black" }}
        className="md:w-[33vw] lg:w-[50vw] xl:w-[50vw] h-screen bg-login sm:bg-register md:bg-login xl:bg-register bg-cover bg-bottom"
      ></div>
      <div className="px-6 w-full md:w-[67vw] lg:!w-[50vw] py-12 lg:px-6  border-gray-300 bg-white h-max md:my-auto mx-auto md:mx-6 lg:mx-12 flex items-center justify-center flex-col">
        {step < 2 && (
          <>
            <h2
              className={`text-black py-3 pr-3 font-sans text-2xl lg:text-3xl drop-shadow-xl shadow-black mb-6 flex flex-row items-center`}
            >
              Quixy Partner Program
            </h2>
            <FirstStep
              userData={userData}
              setUserData={setUserData}
              setStep={setStep}
              step={step}
              seek={seek}
              setSeek={setSeek}
              setConfigured={setConfigured}
            />
            {/* <button
              onClick={() => {
                setStep(1);
                setSeek("ask");
              }}
              className={`text-zinc-800 px-2 py-1  mt-4 text-xl max-w-sm font-gotham ${
                seek === "ask" && "underline"
              }`}
            >
              Chcę skorzystać z usług AI
            </button> */}
          </>
        )}
        {step === 2 && (
          <>
            <CreateAccountForm
              userData={userData}
              step={step}
              setStep={setStep}
              setUserData={setUserData}
              createAccount={createAccount}
              loading={isLoading}
              setLoading={setLoading}
              seek={seek}
            />
          </>
        )}
        <div className="w-full flex flex-col justify-center items-center mt-12">
          {step === 0 && (
            <button
              disabled
              className="rounded-md cursor-not-allowed !bg-[#E3ECF0] !text-zinc-400 !font-normal py-2 px-4"
            >
              Zarejestruj się
            </button>
          )}
          <FirstStepButtons
            userData={userData}
            setStep={setStep}
            step={step}
            seek={seek}
          />
          <div className="flex flex-row items-center flex-wrap mt-8 font-gotham text-black  font-light text-lg">
            Posiadasz już konto?{" "}
            <Link
              className="ml-2 text-[#126b91] underline hover:no-underline"
              href="/login"
            >
              Zaloguj się
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
