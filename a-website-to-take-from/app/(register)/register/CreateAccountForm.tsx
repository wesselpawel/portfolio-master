"use client";
import GoogleAuthButton from "@/components/quixyComponents/Auth/GoogleButton";
export default function CreateAccountForm({
  userData,
  step,
  setStep,
  setUserData,
  createAccount,
  loading,
  setLoading,
  seek,
}: {
  userData: any;
  step: number;
  setStep: any;
  setUserData: any;
  createAccount: any;
  loading: any;
  setLoading: any;
  seek?: any;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center font-gotham">
      <div className="w-full p-6 sm:px-12 bg-white ">
        <h2
          className={`text-black py-3 font-bold text-2xl lg:text-3xl drop-shadow-xl shadow-black mb-6 flex flex-row items-center font-gotham`}
        >
          <div>
            {seek === true && seek !== "ask" && "Utwórz konto"}
            {seek === false && seek !== "ask" && "Utwórz konto"}
          </div>
        </h2>
        <div className="grid grid-cols-1 gap-3 h-max">
          <div className="flex flex-col">
            {" "}
            <label htmlFor="email" className="font-light text-lg text-black ">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="Wpisz email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="  bg-white p-3 font-light text-lg text-black  border border-zinc-600/75"
            />
          </div>
          <div className="flex flex-col space-y-3 w-full">
            <div className="flex flex-col w-full">
              {" "}
              <label
                htmlFor="password"
                className="font-light text-lg text-black "
              >
                Hasło
              </label>
              <input
                required
                type="password"
                placeholder="Wpisz hasło"
                id="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="  bg-white text-black  p-3 text-xl font-light border border-zinc-600/75"
              />
            </div>
            <div className="flex flex-col w-full">
              {" "}
              <label
                htmlFor="password"
                className="font-light text-lg text-black "
              >
                Powtórz hasło
              </label>
              <input
                required
                type="password"
                placeholder="Powtórz hasło"
                id="repeatPassword"
                value={userData.repeatPassword}
                onChange={(e) =>
                  setUserData({ ...userData, repeatPassword: e.target.value })
                }
                className="  bg-white text-black  p-3 text-xl font-light border border-zinc-600/75"
              />
            </div>
          </div>
        </div>{" "}
        <button
          disabled={loading}
          onClick={() => {
            createAccount();
          }}
          className="w-full mt-3 py-3.5 bg-green-600 hover:bg-opacity-80 duration-150 text-white"
        >
          {!loading &&
            (!userData.email ||
              !userData.password ||
              !userData.repeatPassword) && (
              <div className="flex flex-row items-center justify-center">
                Utwórz konto
              </div>
            )}
          {!loading &&
            userData.email &&
            userData.password &&
            userData.repeatPassword && (
              <div className="flex flex-row items-center justify-center">
                Do panelu!
              </div>
            )}
          {loading && "Sekunda..."}
        </button>
        <div className="my-6 flex flex-row items-center justify-center">
          <div className="h-px w-full bg-[#126b91]"></div>
          <div className="px-12 font-gotham text-gray-600">lub</div>
          <div className="h-px w-full bg-[#126b91]"></div>
        </div>
        <GoogleAuthButton seek={seek} />
      </div>
    </div>
  );
}
