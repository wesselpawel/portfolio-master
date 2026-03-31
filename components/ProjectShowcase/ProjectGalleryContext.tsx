"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { SlClose } from "react-icons/sl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type GalleryOpenState = {
  open: true;
  images: readonly string[];
  imageAlts?: readonly string[];
  index: number;
  title?: string;
};

type GalleryState = { open: false } | GalleryOpenState;

type ProjectGalleryContextValue = {
  openGallery: (
    images: readonly string[],
    startIndex?: number,
    title?: string,
    imageAlts?: readonly string[],
  ) => void;
  closeGallery: () => void;
};

const ProjectGalleryContext = createContext<ProjectGalleryContextValue | null>(
  null,
);

export function useProjectGallery() {
  const ctx = useContext(ProjectGalleryContext);
  if (!ctx) {
    throw new Error("useProjectGallery must be used within ProjectGalleryProvider");
  }
  return ctx;
}

function ProjectGalleryModal({
  state,
  onClose,
  onPrev,
  onNext,
  onDotClick,
}: {
  state: GalleryOpenState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  const { images, index, title } = state;
  const src = images[index];
  const prevIndex = index > 0 ? index - 1 : images.length - 1;
  const nextIndex = index < images.length - 1 ? index + 1 : 0;
  const fallbackLabel = title
    ? `${title} — ${index + 1} / ${images.length}`
    : `${index + 1} / ${images.length}`;
  const label = state.imageAlts?.[index] || fallbackLabel;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Galeria projektu"
    >
      <button
        type="button"
        aria-label="Zamknij galerię"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className="relative z-[1] flex w-full max-w-6xl max-h-[min(92vh,900px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-zinc-900/90 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            
            <p className="text-xs text-white/60 sm:text-sm font-dosis">
              {index + 1} / {images.length}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Zamknij"
          >
            <SlClose className="h-5 w-5" />
          </button>
        </div>

        <div className="relative isolate flex min-h-0 flex-1 items-center justify-center bg-black">
          {/* Image first in paint order; nav sits above via z-index so clicks never hit the image */}
          <div className="relative z-0 h-[min(72vh,640px)] w-full sm:h-[min(75vh,680px)]">
            <Image
              key={src}
              src={src}
              alt={label}
              fill
              className="object-contain p-4 sm:p-6"
              sizes="(max-width: 768px) 100vw, 1152px"
              priority
            />
          </div>

          {/* Preload adjacent gallery images to make modal navigation faster. */}
          {images.length > 1 ? (
            <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
              <Image
                src={images[prevIndex]}
                alt={state.imageAlts?.[prevIndex] || `${fallbackLabel} - poprzednie`}
                width={32}
                height={32}
                loading="eager"
              />
              <Image
                src={images[nextIndex]}
                alt={state.imageAlts?.[nextIndex] || `${fallbackLabel} - następne`}
                width={32}
                height={32}
                loading="eager"
              />
            </div>
          ) : null}

          <div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-1 sm:px-2"
            aria-hidden
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="pointer-events-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-yellow-300/70 bg-zinc-950/95 text-yellow-300 shadow-[0_4px_24px_rgba(0,0,0,0.85)] backdrop-blur-sm transition hover:border-yellow-300 hover:bg-zinc-900 hover:brightness-110 sm:h-14 sm:w-14"
              aria-label="Poprzednie zdjęcie"
            >
              <FaChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="pointer-events-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-yellow-300/70 bg-zinc-950/95 text-yellow-300 shadow-[0_4px_24px_rgba(0,0,0,0.85)] backdrop-blur-sm transition hover:border-yellow-300 hover:bg-zinc-900 hover:brightness-110 sm:h-14 sm:w-14"
              aria-label="Następne zdjęcie"
            >
              <FaChevronRight className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex shrink-0 justify-center gap-1.5 border-t border-white/10 bg-zinc-900/80 px-4 py-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onDotClick(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-yellow-300" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
              aria-label={`Zdjęcie ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProjectGalleryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<GalleryState>({ open: false });

  const openGallery = useCallback(
    (
      images: readonly string[],
      startIndex = 0,
      title?: string,
      imageAlts?: readonly string[],
    ) => {
      if (!images.length) return;
      const idx = Math.max(0, Math.min(startIndex, images.length - 1));
      setState({ open: true, images, imageAlts, index: idx, title });
    },
    [],
  );

  const closeGallery = useCallback(() => setState({ open: false }), []);

  const goPrev = useCallback(() => {
    setState((s) => {
      if (!s.open) return s;
      const next = s.index > 0 ? s.index - 1 : s.images.length - 1;
      return { ...s, index: next };
    });
  }, []);

  const goNext = useCallback(() => {
    setState((s) => {
      if (!s.open) return s;
      const next = s.index < s.images.length - 1 ? s.index + 1 : 0;
      return { ...s, index: next };
    });
  }, []);

  const setIndex = useCallback((i: number) => {
    setState((s) => {
      if (!s.open) return s;
      const idx = Math.max(0, Math.min(i, s.images.length - 1));
      return { ...s, index: idx };
    });
  }, []);

  const value = useMemo(
    () => ({ openGallery, closeGallery }),
    [openGallery, closeGallery],
  );

  return (
    <ProjectGalleryContext.Provider value={value}>
      {children}
      {state.open ? (
        <ProjectGalleryModal
          state={state}
          onClose={closeGallery}
          onPrev={goPrev}
          onNext={goNext}
          onDotClick={setIndex}
        />
      ) : null}
    </ProjectGalleryContext.Provider>
  );
}
