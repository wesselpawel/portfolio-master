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
                    <ProjectImages
                      images={item.images}
                      imageAlts={item.imageAlts}
                      title={item.name}
                    />

                    {item.caseStudy ? (
                      <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
                        {item.link ? (
                          <div className="mb-4">
                            <Link
                              href={item.link}
                              target="_blank"
                              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 transition-all"
                            >
                              <div className="animate-bounce block w-2.5 h-2.5 rounded-full bg-green-500" />
                              <span className="text-white text-sm sm:text-base font-dosis break-all">
                                {item.linkText}
                              </span>
                            </Link>
                          </div>
                        ) : null}
                        <div className="space-y-4 font-dosis text-white/90">
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                              Wdrozenie
                            </p>
                            <p className="mt-2 text-sm sm:text-base leading-relaxed">
                              {item.caseStudy.implementationSummary}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                              Zakres
                            </p>
                            <p className="mt-2 text-sm sm:text-base leading-relaxed">
                              {item.caseStudy.serviceScope}
                            </p>
                          </div>
                          {item.caseStudy.applied.length ? (
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                Zastosowano
                              </p>
                              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm sm:text-base">
                                {item.caseStudy.applied.map((point) => (
                                  <li key={point} className="leading-relaxed">
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                              Efekt
                            </p>
                            <p className="mt-2 text-sm sm:text-base leading-relaxed">
                              {item.caseStudy.result}
                            </p>
                          </div>
                        </div>

                        {item.portfolioSections ? (
                          <div className="mt-6 space-y-6">
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                Pricing
                              </p>
                              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                                {item.portfolioSections.pricing.map((plan) => (
                                  <div
                                    key={`${item.name}-${plan.name}`}
                                    className={`rounded-xl border p-4 ${
                                      plan.highlighted
                                        ? "border-yellow-300/70 bg-yellow-300/10"
                                        : "border-white/10 bg-white/5"
                                    }`}
                                  >
                                    <p className="text-sm text-white/70">{plan.name}</p>
                                    <p className="mt-1 text-lg font-semibold text-white">
                                      {plan.price}
                                    </p>
                                    <p className="mt-2 text-sm text-white/80 leading-relaxed">
                                      {plan.description}
                                    </p>
                                    <ul className="mt-3 space-y-1 text-sm text-white/85">
                                      {plan.features.map((feature) => (
                                        <li key={feature}>- {feature}</li>
                                      ))}
                                    </ul>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        document
                                          .getElementById("contact")
                                          ?.scrollIntoView({ behavior: "smooth" })
                                      }
                                      className="mt-4 inline-flex items-center justify-center rounded-lg border border-yellow-300/60 bg-yellow-300/10 px-3 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-yellow-300/20 hover:text-yellow-100"
                                    >
                                      Kontakt
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                  Jak dzialam
                                </p>
                                <ul className="mt-3 space-y-2 text-sm sm:text-base text-white/90">
                                  {item.portfolioSections.howIWork.map((step) => (
                                    <li key={step} className="leading-relaxed">
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                  Co kupujesz
                                </p>
                                <ul className="mt-3 space-y-2 text-sm sm:text-base text-white/90">
                                  {item.portfolioSections.whatYouBuy.map((benefit) => (
                                    <li key={benefit} className="leading-relaxed">
                                      - {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                              <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                FAQ
                              </p>
                              <div className="mt-3 space-y-2">
                                {item.portfolioSections.faq.map((qa) => (
                                  <details
                                    key={qa.question}
                                    className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
                                  >
                                    <summary className="cursor-pointer list-none text-sm sm:text-base font-medium text-white">
                                      {qa.question}
                                    </summary>
                                    <p className="mt-2 text-sm text-white/80 leading-relaxed">
                                      {qa.answer}
                                    </p>
                                  </details>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : null}
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
