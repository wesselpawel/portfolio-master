"use client";
import { Suspense, useEffect, useRef } from "react";
import AOS from "aos";
import HeroSection from "@/components/HeroSection";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import type { LandingPageContent } from "@/data/landingPages";

const StarsBg = dynamic(() => import("@/components/StarsBg"), {
  ssr: false,
});

type IndexPageProps = {
  pageContent: LandingPageContent;
};

export default function IndexPage({ pageContent }: IndexPageProps) {
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);
  const mainWrapper = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: mainWrapper,
    offset: ["start end", "end end"],
  });
  const background = useTransform(scrollYProgress, (pos) =>
    pos >= 0.35 ? "rgb(48, 43, 43)" : "",
  );
  const opacity = useTransform(scrollYProgress, (pos) =>
    pos >= 0.35 ? "0" : "1",
  );
  return (
    <div>
      <motion.div
        ref={mainWrapper}
        style={{ background }}
        className="relative duration-500"
      >
        <div className="relative h-[120svh] w-full min-h-[120svh]">
          <div className="fixed top-0 left-0 w-full h-[120svh] min-h-[120svh] bg-slate-800/30 scale-150"></div>
          <StarsBg />
          <motion.div
            style={{ opacity }}
            className="z-[0] duration-500 fixed left-0 top-0 bg-gradient-to-br from-blue-500 via-green-300 to-blue-500 background-animate h-[100svh] min-h-[120svh] w-full"
          ></motion.div>
        </div>
        <Suspense>
          <HeroSection pageContent={pageContent} />
        </Suspense>
      </motion.div>
    </div>
  );
}
