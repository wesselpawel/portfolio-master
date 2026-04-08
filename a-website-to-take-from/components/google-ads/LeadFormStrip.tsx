import Cta from "@/components/cta/Cta";

export default function LeadFormStrip() {
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-2xl p-6 lg:p-8 shadow-lg text-center">
        <h3 className="text-xl lg:text-2xl font-bold text-zinc-800">
          Zostaw swoje dane – oddzwonię z wyceną w 24h
        </h3>
        <p className="text-gray-600 mt-1 text-sm">
          Krótka rozmowa pozwoli dobrać najlepszą strategię i budżet.
        </p>
        <div className="mt-4 inline-block">
          <Cta label="Porozmawiajmy" />
        </div>
      </div>
    </div>
  );
}
