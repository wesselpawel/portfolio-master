import Link from "next/link";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#020617_0%,#0f172a_48%,#111827_100%)] px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
            <Link href="/" className="transition hover:text-yellow-200">
              Start
            </Link>
            <span>/</span>
            <span className="text-white/75">{title}</span>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/80">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg">
            {intro}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/80">
                Właściciel serwisu
              </p>
              <p className="mt-3 text-lg font-semibold text-white">PAWEŁ WESSEL</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                NIP: 8762494772
                <br />
                REGON: 387851407
                <br />
                tel. 721 417 154
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/80">
                Kontakt
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                W sprawach związanych z prywatnością, cookies lub danymi
                osobowymi możesz skontaktować się mailowo pod adresem
                {" "}
                <a
                  href="mailto:hello@wesselpawel.com"
                  className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
                >
                  hello@wesselpawel.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8"
            >
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-white/75 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
