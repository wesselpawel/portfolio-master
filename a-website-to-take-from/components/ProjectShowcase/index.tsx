"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion as motionDiv } from "framer-motion";
import Link from "next/link";
import ProjectImages from "./ProjectImages";

export default function ProjectShowcase({ dictionary }: { dictionary: any }) {
  const mainWrapper = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: mainWrapper,
    offset: ["start end", "end end"],
  });
  const h1TextOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["0", "1", "1", "0"]
  );
  const h1TextTranslateY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["-200px", "0px", "0px", "-200px"]
  );

  return (
    <div
      ref={mainWrapper}
      id="projects"
      className="flex-col flex w-full relative"
    >
      <div className="mt-12 z-auto top-0 w-full flex flex-col">
        <motionDiv.div
          style={{
            opacity: h1TextOpacity,
            translateY: h1TextTranslateY,
            translateX: "50%",
            left: "-50%",
          }}
          className="relative w-full flex justify-center"
        >
          <motionDiv.a
            href="/register"
            className="bg-blue-600 rounded-xl p-6 z-[550] sticky font-sans w-max h-max top-36 lg:top-24 text-xl font-bold text-white select-none text-center"
          >
            Zarejestruj się
          </motionDiv.a>
        </motionDiv.div>
        <motionDiv.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full flex justify-center mb-6 mt-24"
        >
          <p className="p-6 rounded-xl border-zinc-800 border bg-black/50 text-center text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200">
            Poniżej znajdziesz portfolio{" "}
            <span className="text-blue-600 font-bold">Quixy</span>. <br />
            Zobacz, co możemy dla Ciebie stworzyć!
          </p>
        </motionDiv.div>
        {dictionary.HomePage.projects.map((item: any, i: any) => {
          // Alternate layout for mobile: image on top, card below, with subtle animation
          // Animate on scroll in
          return (
            <motionDiv.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
              className="relative h-max py-6 lg:py-24 my-8 lg:my-0 flex flex-col lg:flex-row items-center duration-75 px-2 sm:px-4 md:px-8 lg:px-12 group"
            >
              {/* Mobile: image on top, card below. Desktop: side by side */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 h-max">
                <motionDiv.div
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="rounded-xl overflow-hidden"
                >
                  <ProjectImages images={item.images} />
                </motionDiv.div>
                <motionDiv.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 8px 32px #00000044",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="z-[504] mt-4 lg:mt-0 text-white bg-slate-800 overflow-hidden rounded-xl min-h-full flex flex-col justify-between shadow-md"
                  style={{
                    boxShadow: "0px 0px 6px black",
                  }}
                >
                  <div className="p-4 sm:p-6 flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-gray-400 italic font-dosis text-sm sm:text-base">
                        {item.type}
                      </p>
                    </div>
                    <p className="text-base sm:text-lg font-dosis mt-1 mb-2">
                      {item.shortDescription}
                    </p>

                    <span className="shadow-sm shadow-black -ml-2 px-2 bg-yellow-300 rounded-br-2xl w-max text-zinc-800 font-anta text-base sm:text-lg mt-3">
                      {dictionary.HomePage.colors}
                    </span>
                    <div className="flex flex-row flex-wrap gap-2 mt-2">
                      {item.colors.map((color: any, j: number) => (
                        <motionDiv.div
                          key={j}
                          whileHover={{ scale: 1.15, rotate: 3 }}
                          className="flex flex-row items-center"
                        >
                          <div
                            style={{ background: `${color}` }}
                            className="h-6 w-6 sm:h-7 sm:w-7 mr-1 rounded shadow"
                          ></div>
                          <span className="text-white text-xs sm:text-sm">
                            {color}
                          </span>
                        </motionDiv.div>
                      ))}
                    </div>
                    <span className="shadow-sm shadow-black -ml-2 px-2 bg-yellow-300 rounded-br-2xl w-max text-zinc-800 font-anta text-base sm:text-lg mt-3">
                      {dictionary.HomePage.stack}
                    </span>
                    <div className="flex flex-row flex-wrap gap-2 mt-2">
                      {item.technologies.map((technology: any, k: any) => (
                        <motionDiv.div
                          key={k}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#334155",
                          }}
                          className="bg-slate-700 px-2 py-1 rounded text-xs sm:text-sm font-dosis text-white shadow"
                        >
                          {technology}
                        </motionDiv.div>
                      ))}
                    </div>
                    <span className="shadow-sm shadow-black -ml-2 px-2 bg-yellow-300 rounded-br-2xl w-max text-zinc-800 font-anta text-base sm:text-lg mt-3">
                      {dictionary.HomePage.fonts}
                    </span>
                    <div className="flex flex-col gap-1 mt-2">
                      {item.fonts.map((font: any, l: any) => (
                        <div
                          key={l}
                          className="flex flex-row items-center flex-wrap gap-2"
                        >
                          <span className="text-xs sm:text-sm font-dosis font-semibold">
                            {font.fontName}
                          </span>
                          {font.variants.map((variant: any, m: any) => (
                            <span
                              className="text-xs text-gray-400 font-dosis bg-slate-700 px-1.5 py-0.5 rounded"
                              key={m}
                            >
                              {variant}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </motionDiv.div>
              </div>
            </motionDiv.div>
          );
        })}
      </div>
    </div>
  );
}
