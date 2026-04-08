import Link from "next/link";

export default function SearchJobs() {
  return (
    <header className="flex flex-col gap-2">
      <h2 className="text-zinc-900 w-max max-w-full text-2xl xl:text-3xl font-extrabold tracking-tight">
        Tylko konkretne zlecenia w branży
      </h2>

      <p className="max-w-2xl text-zinc-600 font-gotham font-light">
        Skup się na klientach, nie na szukaniu. Wejdź do ofert i zacznij budować
        pipeline dzisiaj — bez zbędnych kroków po drodze.
      </p>

      <div className="mt-2">
        <Link
          href="/zlecenia-dla-freelancerow"
          className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/70 transition"
          aria-label="Przejdź do listy ofert"
        >
          Przejdź do ofert
        </Link>
      </div>
    </header>
  );
}
