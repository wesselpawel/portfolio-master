import React, { useRef } from "react";
import { useScroll, useTransform, motion as motionDiv } from "framer-motion";
import Link from "next/link";
import ProjectImages from "./ProjectImages";
import { ProjectGalleryProvider } from "./ProjectGalleryContext";
import ContactSection from "../ContactSection";
import { PORTFOLIO_PROJECTS } from "@/data/portfolioProjects";

export default function ProjectShowcase() {
  const mainWrapper = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: mainWrapper,
    offset: ["start end", "end end"],
  });
  const h1TextOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["0", "1", "1", "0"],
  );
  const h1TextTranslateY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["-200px", "0px", "0px", "-200px"],
  );

  return (
    <ProjectGalleryProvider>
      <div
        ref={mainWrapper}
        id="projects"
        className="flex-col flex w-screen relative mt-[470vh]"
      >
        <motionDiv.div
          style={{
            opacity: h1TextOpacity,
            translateY: h1TextTranslateY,
            translateX: "50%",
            left: "-50%",
          }}
          className="h-[20vh] lg:h-[50vh] relative w-screen flex justify-center"
        >
          <motionDiv.h2 className="h-max font-bold font-sans rounded-3xl bg-yellow-300 select-none p-6 text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl w-[90%] md:w-[70%] lg:w-[50%] z-[550] sticky top-44 lg:top-32 text-black text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-black/10">
            Moje realizacje stron internetowych
          </motionDiv.h2>
        </motionDiv.div>
        <div className="z-auto top-0 w-screen flex flex-col items-center">
          {PORTFOLIO_PROJECTS.map((item, i) => (
            <div
              key={i}
              className="w-full max-w-[1100px] relative h-max py-3 lg:py-24 my-12 lg:my-0 flex items-center duration-75 px-6 lg:px-12"
            >
              <div className="w-full grid grid-cols-1 gap-6 h-max">
                <div
                  className="z-[504] text-white bg-slate-800/50 backdrop-blur-sm overflow-hidden rounded-2xl min-h-full border border-white/10"
                  style={{
                    boxShadow: `0px 0px 18px rgba(0,0,0,0.35), 0px 0px 60px rgba(0,0,0,0.25)`,
                  }}
                >
                  <div
                    className="p-4 sm:p-6 border-b border-white/10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(253,224,71,0.25), rgba(0,0,0,0))",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="bg-yellow-300 w-max px-6 py-3 shadow-sm shadow-black rounded-xl font-anta text-center text-black font-bold text-lg lg:text-xl">
                        {item.name}
                      </h2>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm text-white/70 font-dosis">
                          Projekt
                        </p>
                        <p className="text-sm sm:text-base text-white font-semibold font-dosis">
                          #{i + 1}
                        </p>
                      </div>
                    </div>
                    <ProjectImages images={item.images} title={item.name} />
                    <p className="mt-3 text-center text-lg font-dosis text-white/90">
                      {item.shortDescription}
                    </p>

                    {item.type ? (
                      <div className="mt-4 flex items-center justify-center">
                        <span
                          className="px-3 py-1 rounded-full text-xs sm:text-sm font-dosis border border-white/10 bg-black/20"
                          style={{
                            boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset`,
                          }}
                        >
                          {item.type}
                        </span>
                      </div>
                    ) : null}

                    {item.link ? (
                      <div className="mt-4 flex justify-center">
                        <Link
                          href={item.link}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 transition-all"
                        >
                          <div
                            className="block w-2.5 h-2.5 rounded-full"
                            style={{
                              background: item.colors?.[0] ?? "#22c55e",
                              boxShadow: `0 0 20px ${item.colors?.[0] ?? "#22c55e"}55`,
                            }}
                          />
                          <span className="text-white text-sm sm:text-base font-dosis break-all">
                            {item.link}
                          </span>
                        </Link>
                      </div>
                    ) : null}
                  </div>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        <ContactSection />
      </div>
    </ProjectGalleryProvider>
  );
}
