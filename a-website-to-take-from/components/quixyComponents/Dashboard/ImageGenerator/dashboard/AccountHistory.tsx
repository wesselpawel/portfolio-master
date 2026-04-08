import moment from "moment";
import "moment/locale/pl";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AccountHistory() {
  moment.locale("pl");

  const { user } = useSelector((state: any) => state.user);
  const { light } = useSelector((state: any) => state.light);

  return (
    <div
      className={`${
        light ? "bg-white" : "bg-[#222430]"
      } duration-300 flex flex-col relative mx-3 lg:mx-6  mt-3 mb-6 rounded-lg`}
    >
      <h2 className="px-[2.5rem]  py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
        HISTORIA
      </h2>
      <div className="h-full w-full">
        {user?.history?.length && (
          <div className="p-[1.5rem] max-h-[30vh] overflow-y-scroll scrollbar">
            {user?.history
              ?.slice()
              .reverse()
              .map((item: any, idx: number) => (
                <div className="flex flex-col py-2" key={idx}>
                  <div className="flex">
                    <FaClock className="w-6 h-6 mt-px mr-1 text-primaryStart" />
                    <div className="flex items-center">
                      <span
                        className={`${
                          light ? "text-gray-800" : "text-white"
                        } duration-300 text-base font-light `}
                      >
                        {moment(item.creationTime).format("DD-MM-yyyy hh:mm")}{" "}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`${
                      light ? "text-black" : "text-white"
                    } duration-300 flex drop-shadow-sm font-sans`}
                  >
                    <BsArrowReturnRight className="mt-0.5 min-w-5 min-h-5 mr-1 ml-[9px]" />
                    {item.action}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
