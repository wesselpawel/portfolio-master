"use client";
import authorImage from "@/public/assets/author.png";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useScroll, useTransform, motion as motionDiv } from "framer-motion";
import { motion } from "framer-motion-3d";
import ProjectShowcase from "../ProjectShowcase";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import type { HeroSceneProps } from "./hero-scene";
import WebsiteOrderForm from "./WebsiteOrderForm";
import {
  getBreadcrumbLinks,
  getContextualLandingPageLinks,
  getHomepageSectionLinks,
  type LandingPageContent,
} from "@/data/landingPages";
const BOT_USER_AGENT_REGEX =
  /bot|crawler|spider|crawling|googlebot|google-inspectiontool|inspectiontool|bingbot|yandex|duckduckbot|baiduspider|slurp|lighthouse|pagespeed/i;

const HeroScene = dynamic<HeroSceneProps>(() => import("./hero-scene"), {
  ssr: false,
  loading: () => null,
});

type HeroSectionProps = {
  pageContent: LandingPageContent;
};

export default function HeroSection({ pageContent }: HeroSectionProps) {
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
  const breadcrumbLinks = getBreadcrumbLinks(pageContent.slug);
  const sectionLinks = getHomepageSectionLinks(!pageContent.slug);
  const contextualLandingLinks = getContextualLandingPageLinks(
    pageContent.slug,
  );
  const primaryQuickLinkClass =
    "inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-yellow-200/40 bg-yellow-300 px-5 py-3 text-center text-sm font-semibold leading-tight text-slate-950 shadow-[0_10px_30px_rgba(253,224,71,0.22)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105";
  const secondaryQuickLinkClass =
    "inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-white/20 bg-slate-950/50 px-5 py-3 text-center text-sm font-medium leading-tight text-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-slate-950/35 hover:text-white";

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
        className="absolute left-0 top-0 z-[501] flex h-[100svh] min-h-[100svh] w-full justify-center rounded-3xl pt-28 sm:pt-32 lg:items-center lg:pt-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 w-[90vw]  h-[60vh]">
          <div className="rounded-3xl relative">
            {breadcrumbLinks.length ? (
              <nav
                aria-label="Breadcrumb"
                className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60"
              >
                {breadcrumbLinks.map((link, index) => (
                  <React.Fragment key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-yellow-200"
                    >
                      {link.label}
                    </Link>
                    {index < breadcrumbLinks.length - 1 ? (
                      <span className="text-white/30">/</span>
                    ) : null}
                  </React.Fragment>
                ))}
              </nav>
            ) : null}
            <div className="flex flex-row gap-3 mb-4">
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
              <FaStar className="w-5 h-5 lg:w-8 2xl:w-10 2xl:h-10 text-yellow-300" />
            </div>
            <h1 className="lg:overflow-hidden text-2xl lg:text-3xl 2xl:text-4xl font-extrabold lg:max-w-[35vw]">
              <span className="text-white font-sans">
                {pageContent.hero.headingPrefix}
                <span className="text-yellow-300">
                  {pageContent.hero.headingHighlight}
                </span>
                {pageContent.hero.headingSuffix}
              </span>
            </h1>
            <p className="mt-4 text-base lg:text-lg 2xl:text-2xl font-dosis text-white">
              {pageContent.hero.description}
            </p>
            <div className="mt-6 flex max-w-3xl flex-wrap items-stretch gap-3">
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={primaryQuickLinkClass}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center mt-8">
            <WebsiteOrderForm content={pageContent.form} />
          </div>
        </div>
      </motion.div>
      <ProjectShowcase pageContent={pageContent} />
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
          <div className="rounded-3xl bg-yellow-300 select-none p-6 text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            {pageContent.hero.floatingPromptPrimary}
          </div>
        </motionDiv.div>
        <motionDiv.div
          style={{
            opacity: h2TextOpacity,
            translateX: "-50%",
            translateY: h2TextTranslateY,
          }}
          className="font-bold bottom-36 text-center w-[90%] md:w-[70%] lg:w-[60%] left-1/2 fixed z-[500] font-sans"
        >
          <div className="rounded-3xl bg-yellow-300 select-none p-6 text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            {pageContent.hero.floatingPromptSecondary}
          </div>
        </motionDiv.div>
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
