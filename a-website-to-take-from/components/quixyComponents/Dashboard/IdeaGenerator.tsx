import GenerateIdea from "@/components/quixyComponents/Dashboard/GenerateIdea";
import moment from "moment";
import Image from "next/image";
import { FaDivide } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function IdeaGenerator({ setIdeaOpen }: { setIdeaOpen: any }) {
  const userData = useSelector((state: any) => state.user?.user);
  return (
    <>
      <div className="mt-2  flex flex-col bg-white w-full">
        <GenerateIdea userTokens={userData?.tokens} setIdeaOpen={setIdeaOpen} />
      </div>
      <div className="mt-2  p-12 flex justify-center flex-col bg-gradient-to-r from-purple-400 via-orange-400 to-rose-400">
        <div className=" flex justify-center items-center text-center">
          <span
            style={{ boxDecorationBreak: "slice", lineHeight: 1.19 }}
            className="relative text-2xl font-bold  drop-shadow-sm shadow-black text-white"
          >
            Twoje pomysły na biznes ({userData?.ideas?.length})
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 2xl:grid-cols-3 2xl:gap-6 w-full">
          {userData?.ideas?.map((idea: any, i: any) => (
            <div
              key={i}
              className="p-3 group bg-white  hover:bg-orange-200 duration-75 mt-4"
            >
              <div
                className=" group-hover:scale-105 duration-100 bg-white relative"
                style={{ boxShadow: "0 0 16px 0 purple" }}
              >
                <FaDivide
                  onClick={() => setIdeaOpen(idea)}
                  className="flex text-left items-start justify-start font-bold  p-2 bg-white w-full h-full"
                >
                  {idea?.image && (
                    <Image
                      src={idea?.image}
                      width={69}
                      height={69}
                      alt=""
                      className="mx-auto mt-12 rounded-full w-12 h-12"
                    />
                  )}
                  <div className="flex flex-col justify-start">
                    <div className="text-left">{idea?.name}</div>
                    <div className="italic text-green-500">
                      {moment(idea.createdAt).format("DD-MM-YYYY HH:mm")}
                    </div>
                  </div>
                </FaDivide>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
