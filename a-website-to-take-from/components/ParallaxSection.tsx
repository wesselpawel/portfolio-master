"use client";

import { useParallax } from "@/lib/useParallax";
import { ReactNode, HTMLAttributes } from "react";

interface ParallaxSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  scale?: number;
  disabled?: boolean;
  offset?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.2,
  direction = "up",
  scale = 1,
  disabled = false,
  offset = 0,
  className = "",
  ...props
}) => {
  const { ref, style } = useParallax<HTMLDivElement>({
    speed,
    direction,
    scale,
    disabled,
  });

  const combinedStyle = {
    ...style,
    transform: `${style.transform || ""} translateY(${offset}px)`.trim(),
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
