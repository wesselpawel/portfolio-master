"use client";
import { IProject } from "@/types";
import dynamic from "next/dynamic";
const MarketCategorySelector = dynamic(
  () => import("./MarketCategorySelector"),
  {
    ssr: false,
  }
);
const MarketResults = dynamic(() => import("./MarketResults"), {
  ssr: false,
});
import { useState } from "react";
import { BiCategory } from "react-icons/bi";
export default function Market({ services }: { services: any }) {
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [job, setJob] = useState<any>("");
  const [showResults, setShowResults] = useState(false);
  return (
    <div className="pb-12">
      <div>
        <div>
          <MarketCategorySelector
            slug={slug}
            setSlug={setSlug}
            setConfigurationOpen={setConfigurationOpen}
            setCategory={setCategory}
            category={category}
            setJob={setJob}
            job={job}
            services={
              slug &&
              services?.filter((service: IProject) =>
                service?.tags?.some(
                  (tag: any) =>
                    tag.slugTitle === slug &&
                    (!category || tag.categoryTitle === category) &&
                    (!job || tag.title === job)
                )
              )?.length
            }
            setShowResults={setShowResults}
            showResults={showResults}
            configurationOpen={configurationOpen}
          />
          {showResults && (
            <MarketResults
              services={
                slug
                  ? services?.filter((service: IProject) =>
                      service?.tags?.some(
                        (tag: any) =>
                          tag.slugTitle === slug &&
                          (!category || tag.categoryTitle === category) &&
                          (!job || tag.title === job)
                      )
                    )
                  : services
              }
              slug={slug}
              category={category}
              job={job}
            />
          )}
          {slug === "" && (
            <div className="rounded-lg mt-3 py-12 bg-gradient-to-r from-zinc-700/30 to-zinc-800/30 px-6 text-black text-center items-center justify-center w-full">
              {" "}
              <div
                style={{ boxShadow: "0px 1px 10px rgba(0,0,0,0.8)" }}
                className="bg-gradient-to-b from-primaryStart to-primaryEnd rounded-full aspect-square mx-auto w-24 flex items-center justify-center"
              >
                <BiCategory className="text-white text-4xl" />
              </div>
              <div className="text-center max-w-sm mx-auto mt-4 rounded-md">
                {/* Reduced padding */}
                <p className=" font-light max-w-sm mx-auto text-gray-700">
                  Wybierz kategorię i przeglądaj usługi naszych użytkowników.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
