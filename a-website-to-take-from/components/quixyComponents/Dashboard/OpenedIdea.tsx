import moment from "moment";
import "moment/locale/pl";

export default function OpenedIdea({
  ideaOpen,
  setIdeaOpen,
  setJobRequest,
  jobRequest,
}: {
  ideaOpen: any;
  setIdeaOpen: Function;
  setJobRequest: Function;
  jobRequest: boolean;
}) {
  return (
    <div
      onClick={() => {
        setIdeaOpen({ name: "" });
      }}
      className={`pt-[87px] lg:pt-0 flex items-center justify-center fixed left-0 lg:left-[30rem] top-0 w-full lg:w-[calc(100vw-30rem)] h-screen z-[999] bg-white ${
        ideaOpen?.name ? "translate-y-0" : "translate-y-[-100vh]"
      } overflow-y-scroll`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-6 2xl:p-24 md:p-12 lg:p-10 xl:p-12 h-full w-full bg-white font-gotham relative"
      >
        <h1 className="text-3xl xl:text-5xl text-primary text-left font-bold drop-shadow-xl shadow-black">
          {ideaOpen?.name}
        </h1>
        <div className="my-2 font-light text-black">
          {moment(ideaOpen.creationTime).fromNow()}
        </div>

        <div className="top-0 py-2 right-0 sticky flex flex-row bg-white">
          <button
            onClick={() => setIdeaOpen({ name: "" })}
            className="bg-black text-white font-bold  px-1.5 py-1"
          >
            Wróć do panelu
          </button>
          <button
            onClick={() => setJobRequest(ideaOpen)}
            className="bg-green-500 ml-2 text-white font-bold  px-1 py-0.5"
          >
            Szukaj współpracy
          </button>
        </div>
        {jobRequest && (
          <div className="flex flex-col text-black">
            <h2>Pozwolić ekspertom na kontakt w sprawie projektu?</h2>
            <div className="flex">
              <button
                onClick={() => {
                  setJobRequest(false);
                }}
                className="bg-gradient-to-r from-primary to-cta py-0.5 px-2 text-white mr-2 "
              >
                TAK
              </button>
              <button
                onClick={() => {
                  setJobRequest(false);
                }}
                className="text-white py-0.5 px-2  bg-red-500 hover:bg-red-400"
              >
                NIE
              </button>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-5xl text-black pt-6">Pomysł</h2>
          <div className="text-xl text-black w-[100%] max-w-[50rem] font-light">
            {ideaOpen?.content}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl lg:text-5xl text-black pt-6">
            Strategia Marketingowa
          </h2>
          <div className="text-xl text-black font-light w-[100%] max-w-[50rem]">
            {ideaOpen?.marketing}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl lg:text-5xl text-black pt-6">Biznesplan</h2>
          <div className="text-xl text-black font-light w-[100%] max-w-[50rem]">
            {ideaOpen?.businessplan}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl lg:text-5xl text-black pt-6">
            Staff Projektu
          </h2>
          <div className="text-xl text-black font-light w-[100%] max-w-[50rem]">
            {ideaOpen?.staff}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl lg:text-5xl text-black pt-6">
            Szacowany czas wykonania
          </h2>
          <div className="text-xl text-black font-light w-[100%] max-w-[50rem] sm:pb-12">
            {ideaOpen?.estimatedRealizationTime}
          </div>
          <div className="py-2 flex flex-row bg-white sm:hidden">
            <button
              onClick={() => setIdeaOpen({ name: "" })}
              className="bg-black text-white font-bold  px-1.5 py-1"
            >
              Wróć do panelu
            </button>
            <button
              onClick={() => setJobRequest(ideaOpen)}
              className="bg-green-500 ml-2 text-white font-bold  px-1 py-0.5"
            >
              Szukaj ekspertów
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
