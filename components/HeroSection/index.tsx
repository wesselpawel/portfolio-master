"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useScroll, useTransform, motion as motionDiv } from "framer-motion";
import ProjectShowcase from "../ProjectShowcase";
import { FaStar } from "react-icons/fa";
import type { HeroSceneProps } from "./hero-scene";
import HeroWebsiteCostCalculator from "./HeroWebsiteCostCalculator";
import {
  getBreadcrumbLinks,
  getContextualLandingPageLinks,
  type LandingPageContent,
} from "@/data/landingPages";
import { highlightLandingKeywords } from "@/utils/highlightLandingKeywords";
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
    [-4, -0, 1, 3, 7],
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


  const [canRender3D, setCanRender3D] = useState(false);
  const breadcrumbLinks = getBreadcrumbLinks(pageContent.slug);
  const contextualLandingLinks = getContextualLandingPageLinks(
    pageContent.slug,
  );

  function renderInlineLinks() {
    return contextualLandingLinks.map((link, index) => {
      const isLast = index === contextualLandingLinks.length - 1;
      const isSecondToLast = index === contextualLandingLinks.length - 2;

      return (
        <span key={link.href}>
          <Link
            href={link.href}
            className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
          >
            {link.label}
          </Link>
          {!isLast ? (isSecondToLast ? " oraz " : ", ") : null}
        </span>
      );
    });
  }
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
      <motionDiv.div
        className="absolute left-0 top-0 z-[501] flex min-h-[100svh] w-full justify-center rounded-3xl"
      >
        <div className="layout-container mt-12 w-full flex flex-col lg:flex-row items-center justify-center gap-[clamp(1.75rem,3.5vw,3.5rem)]  lg:max-h-none lg:min-h-0">
          <div className="relative max-w-[min(100%,36rem)] shrink-0 rounded-3xl lg:max-w-[min(100%,60rem)] 4xl:max-w-[min(100%,44rem)]">
            {breadcrumbLinks.length ? (
              <nav
                aria-label="Breadcrumb"
                className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60 4xl:text-sm"
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
            <div className="mx-auto mb-2 flex flex-row gap-2">
              <FaStar className="h-5 w-5 text-yellow-300 4xl:h-6 4xl:w-6" />
              <FaStar className="h-5 w-5 text-yellow-300 4xl:h-6 4xl:w-6" />
              <FaStar className="h-5 w-5 text-yellow-300 4xl:h-6 4xl:w-6" />
              <FaStar className="h-5 w-5 text-yellow-300 4xl:h-6 4xl:w-6" />
              <FaStar className="h-5 w-5 text-yellow-300 4xl:h-6 4xl:w-6" />
            </div>
            <h1 className="text-fluid-hero-display font-extrabold lg:overflow-hidden">
              <span className="font-sans text-white">
                {pageContent.hero.headingPrefix}
                {pageContent.hero.headingHighlight}
                {pageContent.hero.headingSuffix}
              </span>
            </h1>
            <p className="text-fluid-hero-lead mt-4 max-w-[62ch] font-dosis text-white">
              {highlightLandingKeywords(pageContent.hero.description, pageContent)}
            </p>
            <Link href="#darmowa-wycena">
            <button
              type="button"
              className="mt-4 inline-flex items-center rounded-lg bg-yellow-400 px-[clamp(1rem,0.85rem+0.5vw,1.5rem)] py-[clamp(0.5rem,0.4rem+0.35vw,0.85rem)] text-[clamp(0.9375rem,0.88rem+0.25vw,1.125rem)] font-semibold text-black"
            >
              Darmowa wycena
            </button>
            </Link>
            
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center lg:justify-end">
            <HeroWebsiteCostCalculator />
          </div>
        </div>
      </motionDiv.div>
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
          className="font-bold bottom-36 left-1/2 w-[min(90%,36rem)] max-w-[min(90vw,52rem)] text-center md:w-[min(80%,40rem)] lg:w-[min(75%,44rem)] 4xl:w-[min(70%,48rem)] 4xl:max-w-4xl fixed z-[500] font-sans"
        >
          <div className="text-fluid-floating-prompt rounded-3xl bg-yellow-300 p-[clamp(1rem,2vw,2rem)] font-bold select-none">
            {pageContent.hero.floatingPromptPrimary}
          </div>
        </motionDiv.div>
        <motionDiv.div
          style={{
            opacity: h2TextOpacity,
            translateX: "-50%",
            translateY: h2TextTranslateY,
          }}
          className="font-bold bottom-36 left-1/2 w-[min(90%,36rem)] max-w-[min(90vw,52rem)] text-center md:w-[min(80%,40rem)] lg:w-[min(75%,44rem)] 4xl:w-[min(70%,48rem)] 4xl:max-w-4xl fixed z-[500] font-sans"
        >
          <div className="text-fluid-floating-prompt rounded-3xl bg-yellow-300 p-[clamp(1rem,2vw,2rem)] font-bold select-none">
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
