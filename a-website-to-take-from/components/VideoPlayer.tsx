"use client";
import { useEffect, useRef } from "react";

export default function VideoPlayer({ pathToVideo }: { pathToVideo: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3; // Slow down to 50% speed
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-auto rounded-lg max-w-[300px] lg:max-w-[400px]"
      autoPlay
      loop
      muted
      playsInline
      src={pathToVideo} // Replace with your video path
    >
      Your browser does not support the video tag.
    </video>
  );
}
