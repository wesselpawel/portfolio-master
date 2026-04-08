import Image from "next/image";
import google from "../../public/assets/google.png";
import deviant from "../../public/assets/deviant.png";
import pinterest from "../../public/assets/pinterest.png";
import react from "../../public/assets/react.png";
import openai from "../../public/assets/openai.png";
export default function Regions() {
  return (
    <div className="w-[365px] flex items-center overflow-x-hidden">
      <div className="flex flex-row move-from-right-to-left ml-[100%]">
        {items.map((item: any, i: any) => (
          <div
            key={i}
            className={`flex text-zinc-800 w-max items-center px-4 py-3`}
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
              className="w-[80px] h-auto mr-3"
            />
          </div>
        ))}
        {items.map((item: any, i: any) => (
          <div
            key={i}
            className={`flex text-zinc-800 w-max items-center px-4 py-3`}
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
              className="w-[80px] h-auto mr-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const items = [
  { name: "google", image: google },
  { name: "deviant", image: deviant },
  { name: "pinterest", image: pinterest },
  { name: "react", image: react },
  { name: "openai", image: openai },
];
