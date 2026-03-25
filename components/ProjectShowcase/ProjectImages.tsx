"use client";

import Image from "next/image";
import { useProjectGallery } from "./ProjectGalleryContext";

type ProjectImagesProps = {
  images: readonly string[];
  title?: string;
};

export default function ProjectImages({ images, title }: ProjectImagesProps) {
  const { openGallery } = useProjectGallery();
  const first = images[0];
  if (!first) return null;

  return (
    <button
      type="button"
      onClick={() => openGallery(images, 0, title)}
      className="group relative mt-4 w-full overflow-hidden rounded-xl border border-white/10 bg-black/25 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-white/20 hover:bg-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={first}
          alt={title ? `Podgląd projektu: ${title}` : "Podgląd projektu"}
          fill
          className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 1100px) 100vw, 1100px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-2 p-3 sm:p-4">
          <p className="max-w-[min(100%,28rem)] font-dosis text-sm leading-snug text-white/95 sm:text-base">
            {images.length > 1
              ? `${images.length} zdjęć — kliknij, aby otworzyć pełną galerię`
              : "Kliknij, aby powiększyć"}
          </p>
          <span className="shrink-0 rounded-lg bg-yellow-300 px-3 py-1.5 text-xs font-semibold text-black shadow-sm sm:text-sm">
            Galeria
          </span>
        </div>
      </div>
    </button>
  );
}
