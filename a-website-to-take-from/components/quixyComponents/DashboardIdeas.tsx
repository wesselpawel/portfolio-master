"use client";
import GenerateIdea from "@/components/quixyComponents/Dashboard/GenerateIdea";
import OpenedIdea from "@/components/quixyComponents/Dashboard/OpenedIdea";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardIdeas() {
  const [ideaOpen, setIdeaOpen] = useState<any>({});
  const [jobRequestOpen, setJobRequestOpen] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.user);
  return (
    <>
      <div className="flex flex-col bg-white w-full">
        <GenerateIdea userTokens={user?.tokens} setIdeaOpen={setIdeaOpen} />
      </div>

      {user?.ideas?.length > 0 && (
        <div className="p-8 md:p-12 lg:p-12 flex justify-center flex-col bg-gray-200">
          <div className="flex">
            <span
              style={{ boxDecorationBreak: "slice", lineHeight: 1.19 }}
              className="relative text-2xl lg:text-3xl 2xl:text-4xl font-gotham drop-shadow-sm shadow-black text-black"
            >
              Twoje pomysły na biznes ({user?.ideas?.length})
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex flex-row flex-wrap -ml-3 w-full">
            {user?.ideas
              ?.slice()
              .reverse()
              .map((idea: any, i: any) => (
                <div
                  key={i}
                  style={{ boxShadow: "inset 0px 0px 5px black" }}
                  className="ml-3 mt-3 p-3 group bg-[#126b91] lg:w-max lg:max-w-[100%]  hover:bg-[#468CA9] duration-75"
                >
                  <div
                    className=" duration-100 h-full relative"
                    style={{ boxShadow: "0px 0px 10px black" }}
                  >
                    <button
                      onClick={() => {
                        setIdeaOpen(idea);
                        setJobRequestOpen(idea);
                      }}
                      className="flex-col flex text-left items-start justify-start font-bold  p-2 bg-white w-full h-full"
                    >
                      <div className="flex flex-col justify-start">
                        <div className="text-left text-black font-gotham">
                          {idea?.name}
                        </div>
                        <div className="font-gotham text-green-500">
                          {moment(idea.creationTime).fromNow()}
                        </div>
                      </div>

                      <div
                        key={i}
                        className="text-black font-light font-gotham"
                      >
                        {idea.tags.join(", ")}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <OpenedIdea
            jobRequest={jobRequestOpen}
            ideaOpen={ideaOpen}
            setIdeaOpen={setIdeaOpen}
            setJobRequest={setJobRequestOpen}
          />
        </div>
      )}
    </>
  );
}
