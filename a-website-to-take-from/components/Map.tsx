"use client";
import Image from "next/image";
import AOS from "aos";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MapMarker } from "@/types";

export default function Map({ markers }: { markers: MapMarker[] }) {
  useEffect(() => {
    AOS.init({
      offset: 0,
    });
  }, []);

  // Track which marker is hovered
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="move-from-left-to-right relative max-w-[400px] mx-auto h-auto">
      {/* Markers */}
      {markers.map((marker, idx) => (
        <div
          key={idx}
          className={`group${marker.aos ? "" : ""}`}
          {...(marker.aos ? { "data-aos": marker.aos } : {})}
        >
          <div
            className={`${marker.style} flex items-center justify-center cursor-pointer`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(idx)}
            onBlur={() => setHoveredIdx(null)}
            tabIndex={0}
          >
            <FaMapMarkerAlt
              size={40}
              className="text-red-600 group-hover:scale-125 transition-transform duration-200"
            />
            <span
              className={`${
                hoveredIdx === idx
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10`}
            >
              {marker.label}
            </span>
          </div>
        </div>
      ))}
      {/* Map image at the bottom so markers are above */}
      <div className="w-full h-auto">
        <Image
          src="/map/map6.png"
          height={1024}
          width={1024}
          alt=""
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
