"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/1.png", "/2.png", "/3.png", "/4.png"];

export default function ImageSlider({
  className = "w-4/5 lg:w-full xl:w-[90%] relative z-50 h-auto animate-left-to-right",
  width = 500,
  height = 500,
  alt = "",
}) {
  const [index, setIndex] = useState(0);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const blurTimeout = setTimeout(() => setBlur(true), 3500);
    const switchTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setBlur(false);
    }, 4000);
    return () => {
      clearTimeout(blurTimeout);
      clearTimeout(switchTimeout);
    };
  }, [index]);

  return (
    <Image
      src={images[index]}
      width={width}
      height={height}
      alt={alt}
      className={`${className} rounded-xl transition-all duration-500 ${
        blur ? "blur-md" : "blur-0"
      }`}
      priority
    />
  );
}
