import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";

export default function OpenableOpportunity({
  opportunity,
  i,
}: {
  opportunity: any;
  i: number;
}) {
  return (
    <section
      aria-label={opportunity?.title}
      className="bg-white/95 border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-zinc-900">
          {opportunity?.title}
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg bg-zinc-50 p-3 ring-1 ring-zinc-100">
        {opportunity?.data?.map((subcategory: any, idx: number) => {
          const href = `/oferta/dla-firm/${polishToEnglish(
            opportunity?.title
          )}/${polishToEnglish(subcategory?.title)}`;

          return (
            <Link
              key={idx}
              href={href}
              className="group block rounded-md px-3 py-2 text-sm font-medium text-zinc-800 ring-1 ring-transparent hover:bg-white hover:ring-zinc-200 transition"
              aria-label={`Zobacz szczegóły: ${subcategory?.title}`}
            >
              <span className="inline-block align-middle">
                {subcategory?.title}
              </span>
              <span
                aria-hidden="true"
                className="ml-2 inline-block translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
