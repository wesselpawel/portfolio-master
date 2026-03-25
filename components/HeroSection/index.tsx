"use client";
import authorImage from "@/public/assets/author.png";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useTransform, motion as motionDiv } from "framer-motion";
import { motion } from "framer-motion-3d";
import ProjectShowcase from "../ProjectShowcase";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import type { HeroSceneProps } from "./hero-scene";
import WebsiteOrderForm from "./WebsiteOrderForm";
const BOT_USER_AGENT_REGEX =
  /bot|crawler|spider|crawling|googlebot|google-inspectiontool|inspectiontool|bingbot|yandex|duckduckbot|baiduspider|slurp|lighthouse|pagespeed/i;

const HeroScene = dynamic<HeroSceneProps>(() => import("./hero-scene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  //todo typescript
  const gltfPath = "/assets/untitled5.glb";
  const gltfPath2 = "/assets/untitled.glb";
  const mainWrapper = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: mainWrapper,
    offset: ["start end", "end end"],
  });
  // const { width } = useWindowDimensions();
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 1], [1, 1.5, 0.5]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5, 1], [1, 7, 14]);
  const donutPosX = useTransform(scrollYProgress, [0.1, 1], [-5, 5]);
  const donutPosY = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.5, 0.8, 1],
    [-2, -0, 1, 3, 7],
  );
  const donutPosZ = useTransform(scrollYProgress, [0.1, 0.5], [0.1, 0.5]);

  const donut2Scale = useTransform(scrollYProgress, [0.1, 1], [1, 1]);
  const donut2PosX = useTransform(scrollYProgress, [0.1, 0.5, 1], [7, 0, -7]);
  const donut2PosY = useTransform(scrollYProgress, [0.1, 1], [-6, 7]);
  const donut2PosZ = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [0, 1, 2]);
  const donut2RotationX = useTransform(
    scrollYProgress,
    [0.1, 0.5, 1],
    [0, 8, 16],
  );

  const h1TextTranslateY = useTransform(
    scrollYProgress,
    [0.22, 0.3, 0.4, 0.6],
    ["-45vw", "-15vw", "-10vw", "-5vw"],
  );
  const h1TextOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.22, 0.35, 0.55],
    [0, 0.5, 1, 0],
  );

  const h2TextTranslateY = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.85, 0.9],
    ["-16vw", "-12vw", "-6vw", "0vw"],
  );
  const h2TextOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.6, 0.7, 0.85],
    [0, 1, 1, 0],
  );

  //children values
  const menuOpacity = useTransform(scrollYProgress, (pos) =>
    pos <= 0.9 ? 1 : 0,
  );

  //welcome box values
  const welcomeBoxOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3],
    [1, 0.5, 0],
  );
  const welcomeBoxTranslateX = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3],
    ["-50%", "0%", "50%"],
  );
  const welcomeBoxTranslateY = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3],
    ["-50%", "0%", "100%"],
  );
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || "";
    const isBot = BOT_USER_AGENT_REGEX.test(userAgent);
    const canvas = document.createElement("canvas");
    const hasWebGLSupport =
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));

    setCanRender3D(!isBot && hasWebGLSupport);
  }, []);

  return (
    <div>
      <motion.div
        style={{
          opacity: welcomeBoxOpacity,
          translateX: welcomeBoxTranslateX,
          translateY: welcomeBoxTranslateY,
        }}
        className="flex mt-12 lg:mt-0 lg:items-center justify-center absolute left-0 top-0 w-full h-[100svh] min-h-[100svh] z-[501] rounded-3xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 w-[90vw] lg:w-[77vw] h-[60vh]">
          <div className="rounded-3xl relative">
            <div className="flex flex-row gap-3 mb-4">
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
            </div>
            <h1 className="lg:overflow-hidden text-2xl lg:text-4xl 2xl:text-6xl font-extrabold lg:max-w-[35vw]">
              <span className="text-white font-sans">
                <b className="text-yellow-300">NAJLEPSZE</b> STRONY INTERNETOWE
                W GRUDZIĄDZU
              </span>
            </h1>
            <p className="mt-4 text-base lg:text-lg 2xl:text-2xl font-dosis text-white">
              <b>Strona dla glazurnika z Grudziądza</b>,{" "}
              <b>stylistek paznokci</b> z całej Polski, czy{" "}
              <b>generator diety AI</b> - zrobiłem to.{" "}
              <b className="text-yellow-300">Z pączkiem w ręku</b>.
            </p>
          </div>
          <div className="flex items-center justify-center mt-8">
            <WebsiteOrderForm />
          </div>
        </div>
      </motion.div>
      <ProjectShowcase />
      <motionDiv.div
        className="absolute left-0 top-0 h-[700vh] w-screen"
        ref={mainWrapper}
      >
        <motionDiv.div
          style={{
            opacity: h1TextOpacity,
            translateX: "-50%",
            translateY: h1TextTranslateY,
          }}
          className="font-bold bottom-36 text-center w-[90%] md:w-[70%] lg:w-[60%] left-1/2 fixed z-[500] font-sans"
        >
          <h2 className="rounded-3xl bg-yellow-300 select-none p-6 text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Masz pomysł na stronę internetową?
          </h2>
        </motionDiv.div>
        <motionDiv.h2
          style={{
            opacity: h2TextOpacity,
            translateX: "-50%",
            translateY: h2TextTranslateY,
          }}
          className="font-bold bottom-36 text-center w-[90%] md:w-[70%] lg:w-[60%] left-1/2 fixed z-[500] font-sans"
        >
          <div className="rounded-3xl bg-yellow-300 select-none p-6 text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Porozmawiajmy o Twoim projekcie
          </div>
        </motionDiv.h2>
        <motionDiv.div
          className="duration-500"
          style={{ opacity: menuOpacity }}
        >
          {canRender3D ? (
            <HeroScene
              gltfPath={gltfPath}
              gltfPath2={gltfPath2}
              scale={scale}
              donutPosX={donutPosX}
              donutPosY={donutPosY}
              donutPosZ={donutPosZ}
              rotateX={rotateX}
              donut2PosX={donut2PosX}
              donut2PosY={donut2PosY}
              donut2PosZ={donut2PosZ}
              donut2Scale={donut2Scale}
              donut2RotationX={donut2RotationX}
            />
          ) : null}
        </motionDiv.div>
      </motionDiv.div>
    </div>
  );
}
