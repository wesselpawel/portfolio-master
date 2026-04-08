"use client";

import Image from "next/image";
import { useParallax } from "@/lib/useParallax";
import { HTMLAttributes } from "react";

interface ParallaxImageProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  speed?: number;
  direction?: "up" | "down";
  scale?: number;
  disabled?: boolean;
  containerClassName?: string;
  imageClassName?: string;
  overlay?: boolean;
  overlayClassName?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = true,
  priority = false,
  speed = 0.3,
  direction = "up",
  scale = 1.15,
  disabled = false,
  containerClassName = "",
  imageClassName = "",
  overlay = false,
  overlayClassName = "",
  className,
  children,
  ...props
}) => {
  const { ref, style, isVisible } = useParallax({
    speed,
    direction,
    scale,
    disabled,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${containerClassName} ${
        className || ""
      }`}
      {...props}
    >
      <div className={`relative w-full h-full ${imageClassName}`} style={style}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {overlay && <div className={`absolute inset-0 ${overlayClassName}`} />}

      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ParallaxImage;
