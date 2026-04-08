import { cutSentence } from "@/lib/cutSentence";
import { IoIosClose } from "react-icons/io";

export default function GeneratedIdeaHeroPopup({
  setRegisterPopupOpen,
  setGeneratorPopup,
  registerPopupOpen,
  generatorPopup,
  generatedIdea,
}: {
  setRegisterPopupOpen: any;
  setGeneratorPopup: any;
  registerPopupOpen: any;
  generatorPopup: any;
  generatedIdea: any;
}) {
  return (
    <>
      <button
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        style={{ boxShadow: "0 0 16px 0 white" }}
        className={`fixed z-[9999] border border-black bg-white bg-opacity-5 text-white text-4xl top-5 right-5 p-2  w-10 h-10 flex items-center justify-center ${
          registerPopupOpen || generatorPopup
            ? "translate-x-0 duration-[1000ms]"
            : "translate-x-[100vw]"
        }`}
      >
        <IoIosClose className="w-8 h-8 text-gray-400" />{" "}
      </button>
      <button
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        className={`bg-[#202020] ${
          registerPopupOpen || generatorPopup
            ? "z-[30] w-full h-full fixed left-0 top-0 duration-500 delay-500 bg-opacity-80"
            : "fixed -z-[25] bg-opacity-0"
        }`}
      ></button>
      <div
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        className={`fixed left-0 top-0 w-full h-full flex justify-center items-center z-40 ${
          generatorPopup ? "translate-y-0" : "-translate-y-[100vh]"
        } ease-in-out duration-500`}
      >
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="bg-white  flex flex-col w-[90%] sm:max-w-[40rem] h-[50vh] relative bg-opacity-90 z-[999999999999]"
        >
          <h2 className="bg-[#126b91]  p-6 font-gotham text-2xl text-white font-bold drop-shadow-xl shadow-black sticky top-0">
            Twój nowy pomysł jest gotowy!
          </h2>
          <div className="w-full p-4 md:p-6 flex flex-col h-full overflow-y-scroll">
            <div className="text-black text-xl font-bold">
              Wygenerowany pomysł:
            </div>
            <p className="text-gray-800 text-justify mt-3">
              {cutSentence(generatedIdea?.content)}
            </p>
            <p className="mt-3 text-sm text-gray-500 ">
              Zaloguj się by odebrać{" "}
              <b className="text-primary">nowy pomysł na biznes</b> oraz 💎3 na
              start
            </p>
          </div>
          <button
            onClick={(e: any) => {
              setRegisterPopupOpen(true);
              setGeneratorPopup(false);
              e.stopPropagation();
            }}
            className="py-3 mx-auto  bg-green-500 font-bold text-white w-full sticky bottom-0 left-0"
          >
            Dołącz teraz
          </button>
        </div>
      </div>
    </>
  );
}
