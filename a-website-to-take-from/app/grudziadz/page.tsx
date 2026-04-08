import Link from "next/link";
import type { Metadata } from "next";
import { getAllGrudziadzServiceLeaves } from "@/lib/grudziadz/serviceIndex";

export const metadata: Metadata = {
  title: "Usługi w Grudziądzu | Quixy",
  description:
    "Skrócone adresy usług lokalizowanych pod Grudziądz — wybierz kategorię i zobacz oferty.",
};

export default function GrudziadzHubPage() {
  const leaves = getAllGrudziadzServiceLeaves();

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-sm uppercase tracking-widest text-emerald-400 mb-2">
          Lokalnie
        </p>
        <h1 className="text-3xl font-bold mb-4">Usługi — Grudziądz</h1>
        <p className="text-zinc-400 mb-8">
          Krótsze adresy niż pełna ścieżka{" "}
          <code className="text-zinc-300">/oferta/dla-firm/…/…/…</code>. Każda
          pozycja prowadzi do tej samej treści i API co wcześniej.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {leaves.map((leaf) => (
            <li key={leaf.publicSlug}>
              <Link
                href={`/grudziadz/${leaf.publicSlug}`}
                className="block rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-3 hover:border-emerald-500/50 transition"
              >
                <span className="font-medium text-white">{leaf.title}</span>
                <span className="block text-xs text-zinc-500 mt-1">
                  {leaf.serviceTitle} → {leaf.categoryTitle}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
