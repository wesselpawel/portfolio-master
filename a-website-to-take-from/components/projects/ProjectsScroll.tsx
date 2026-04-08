"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useWindowDimensions } from "@/lib/useWindowDimensions";

export default function ProjectsScroll() {
  const { width } = useWindowDimensions();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start center", "end start"],
  });
  const duration = useTransform(scrollYProgress, (pos) =>
    pos >= 0.1 ? 300 : 0
  );
  const xTranslate = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ["0vw", width && width > 1366 ? "-280vw" : "-600vw"]
  );

  return (
    <div
      ref={wrapperRef}
      className="flex p-6 pt-24 lg:p-12 2xl:pt-36 relative h-[400vh] xl:h-[300vh]"
      id="projects"
    >
      <div className="sticky top-0 lg:top-36 h-screen lg:h-max flex items-center overflow-x-hidden">
        <motion.div
          style={{
            translateX: xTranslate,
            transitionDuration: `${duration}ms`,
          }}
          className="sticky flex items-end z-0 h-[50vh] w-max duration-75 py-3 px-3"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`w-[88vw] lg:w-[70vw] xl:w-[40vw] rounded-xl ${
                index !== 0 && "ml-12"
              }`}
            >
              <Image
                src={project.images[0]}
                width={1024}
                height={768}
                alt={project.name}
                className="w-full h-auto rounded-xl shadow-md shadow-zinc-700"
                priority={index < 2}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

type Project = {
  name: string;
  images: string[];
};

const projects: Project[] = [
  {
    name: "Quixy",
    images: [
      "/images/projects/quixy/hero.png",
      "/images/projects/quixy/dashboard.png",
      "/images/projects/quixy/quixies.png",
      "/images/projects/quixy/image-generator.png",
    ],
  },
  {
    name: "Hexon",
    images: [
      "/images/projects/hexon/hero.png",
      "/images/projects/hexon/invites.png",
      "/images/projects/hexon/leady.png",
      "/images/projects/hexon/dofinansowanie.png",
      "/images/projects/hexon/prad.png",
      "/images/projects/hexon/aiassistant.png",
    ],
  },
  {
    name: "Blackbell Art",
    images: [
      "/images/projects/blackbellart/hero.webp",
      "/images/projects/blackbellart/shop.webp",
      "/images/projects/blackbellart/shopItem.webp",
      "/images/projects/blackbellart/tattooBlog.webp",
      "/images/projects/blackbellart/tattoos.webp",
      "/images/projects/blackbellart/contact.webp",
    ],
  },
  {
    name: "Zaklejki",
    images: [
      "/images/projects/zaklejki/hero.webp",
      "/images/projects/zaklejki/lottery.webp",
      "/images/projects/zaklejki/shop.webp",
      "/images/projects/zaklejki/product.webp",
    ],
  },
  {
    name: "Manicure Grudziądz",
    images: [
      "/images/projects/manicuregrudziadz/hero.webp",
      "/images/projects/manicuregrudziadz/dashboard.webp",
      "/images/projects/manicuregrudziadz/rezerwacje.webp",
    ],
  },
  {
    name: "Fryzury Kamińska",
    images: [
      "/images/projects/fryzurykaminska/hero.webp",
      "/images/projects/fryzurykaminska/offer.webp",
    ],
  },
  {
    name: "Kancelaria Deluga",
    images: [
      "/images/projects/kancelariadeluga/hero.webp",
      "/images/projects/kancelariadeluga/offer.webp",
    ],
  },
];
