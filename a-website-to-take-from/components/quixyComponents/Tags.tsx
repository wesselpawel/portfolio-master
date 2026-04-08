"use client";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Tags({ talent }: { talent: any }) {
  const [showAll, setShowAll] = useState(false);
  const tags = Array.isArray(talent?.tags) ? talent.tags : [];
  if (!tags.length) return null;

  const MAX_VISIBLE = 25;

  return (
    <div className="mt-2 flex flex-wrap items-start gap-2">
      {tags
        .slice(0, showAll ? tags.length : MAX_VISIBLE)
        .map((item: any, i: number) => (
          <div
            key={i}
            className="
            inline-flex items-center gap-1 rounded-full bg-primaryStart/10
            px-3 py-1 text-xs sm:text-sm font-medium text-primaryStart
            shadow-sm hover:bg-primaryStart/20 transition
            max-w-full min-w-0
          "
            title={`${item?.slugUrl} / ${item?.categoryUrl} / ${item?.url}`} // pełna ścieżka w tooltipie
          >
            {/* ważne: min-w-0 + truncate na każdym segmencie */}
            <div className="inline-flex items-center gap-1 whitespace-nowrap min-w-0">
              <Link
                href={`/oferta/dla-firm/${item?.slugUrl}/${item?.categoryUrl}`}
                className="truncate max-w-[14ch] sm:max-w-[16ch] md:max-w-[20ch] text-primaryStart hover:underline min-w-0"
              >
                {item?.categoryTitle}
              </Link>

              <span className="text-primaryStart">
                <FaArrowRightLong />
              </span>

              <Link
                href={`/oferta/dla-firm/${item?.slugUrl}/${item?.categoryUrl}/${item?.url}`}
                className="max-w-[24ch] truncate text-primaryStart hover:underline min-w-0"
              >
                {item?.title}
              </Link>
            </div>
          </div>
        ))}

      {tags.length > MAX_VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAll((p) => !p)}
          className="ml-2 inline-flex items-center rounded-full bg-gradient-to-b from-accentStart to-accentEnd px-3 py-1 text-xs sm:text-sm font-medium text-white shadow transition hover:brightness-105"
        >
          {showAll ? "Pokaż mniej" : `+${tags.length - MAX_VISIBLE} więcej`}
        </button>
      )}
    </div>
  );
}
