import { useSelector } from "react-redux";

interface Step {
  step: number;
  title: string;
}

export default function MultiStepFormIndicator({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  const { light } = useSelector((state: any) => state.light);
  return (
    <div
      className={`flex xl:flex-col gap-1.5 sm:gap-3 w-full xl:w-2/5 rounded-lg xl:ml-3 p-1.5 sm:p-3 xl:p-6 ${
        light ? "bg-white text-black" : "bg-[#222430] text-white"
      }`}
    >
      {steps.map((stepObj, index) => (
        <div
          key={index}
          className={`w-full flex flex-col xl:flex-row justify-center xl:justify-start items-center ${
            index + 1 === currentStep
              ? " bg-green-500/20 border-green-500"
              : `${light ? "border-gray-500/50" : "border-gray-300/50"}`
          } p-2 rounded-md border-2`}
        >
          <span
            className={`${
              index + 1 === currentStep ? "bg-ctaStart" : "bg-gray-500"
            } text-white rounded-full h-10 w-10 flex items-center justify-center`}
          >
            {stepObj.step}
          </span>
          <span className="xl:ml-2 mt-1 xl:mt-0 text-xs xl:text-base text-center">
            {stepObj.title}
          </span>
        </div>
      ))}
    </div>
  );
}
