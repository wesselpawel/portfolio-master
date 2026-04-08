import { JobOffer } from "@/types";
import moment from "moment";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function JobOfferDetails({
  jobOffer,
  setOptionsOpen,
  optionsOpen,
  pay,
  loading,
}: {
  jobOffer: JobOffer;
  setOptionsOpen: (value: boolean) => void;
  loading: boolean;
  optionsOpen: boolean;
  pay: (jobOffer: { title: string; isPaid: boolean; price: number }) => void;
}) {
  return (
    <div className="relative h-full flex flex-row-reverse w-full justify-between mb-4">
      <div className="flex flex-col">
        <div className="flex items-end justify-end">
          <button
            onClick={() => setOptionsOpen(!optionsOpen)}
            className={`sticky top-3 right-3 w-max text-3xl text-white h-full px-2 bg-gradient-to-r from-zinc-700 to-primaryHoverEnd z-10 duration-200 rounded-md`}
          >
            <HiOutlineDotsHorizontal
              className={`${
                optionsOpen ? "scale-125 hover:scale-110" : "hover:scale-90"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className=" text-lg sm:text-xl font-bold mb-2 pr-6">
          {jobOffer.title}
        </h3>
        <div className={`col-span-1`}>
          <div className="font-bold">Koszt</div> 💎
          {jobOffer.price.toFixed(2)}
          <div className="font-bold">Status</div>
          <p
            className={`${
              jobOffer.isPaid ? "text-green-500" : "text-red-500"
            } mb-2`}
          >
            {jobOffer.isPaid ? "Opłacono" : "Nie opłacono"}
          </p>
          {!jobOffer.isPaid && (
            <button
              disabled={loading}
              onClick={() => pay(jobOffer)}
              className="disabled:bg-gray-500 bg-gradient-to-b from-ctaStart to-ctaEnd px-4 py-2 rounded-md text-white font-bold  text-xl"
            >
              Opublikuj
              {loading && (
                <div className="inline-block mr-2">
                  <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          )}
          <div className="font-bold">Dodano</div>
          <p className="mb-2">
            {moment(jobOffer.creationTime).format("DD MMMM YYYY")}
          </p>
          <div className="font-bold">Wygasa</div>
          <p className="mb-2">
            {moment(jobOffer.creationTime)
              .add(jobOffer.days, "days")
              .format("DD MMMM YYYY")}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
