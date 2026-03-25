"use client";
import * as Scroll from "react-scroll";
import { FaGithub, FaLinkedin, FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AOS from "aos";
import Image from "next/image";
import ponczek from "@/public/ponczek.png";
import authorImage from "@/public/assets/author.png";
export function NavRight() {
  const ScrollTo = Scroll.Link;
  const pathname = usePathname();
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);
  return (
    <div className="text-white sticky top-6 mx-auto p-3 rounded-full w-[90vw] lg:w-[77vw] justify-between flex flex-row space-x-3 z-[1000] font-regular text-xl font-anta bg-slate-800/50 backdrop-blur-sm">
      <Link href="/" className="flex flex-row gap-2">
        <Image
          src={authorImage}
          alt="Logo Paweł Wessel"
          width={100}
          height={100}
          className="w-14 rotate-12 h-14 rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <h2 className="italic font-bold text-2xl text-white drop-shadow-md">
            Paweł Wessel
          </h2>
          <div className="flex flex-row items-center text-sm font-dosis text-white">
            <b>Programista</b> <FaLongArrowAltRight className="ml-2" />
          </div>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-center space-x-3 rounded-xl">
        <Link
          target="_blank"
          title="Przejdź do Github.com"
          href="https://github.com/wesiudev"
          className="duration-200 text-white"
        >
          <FaGithub className="h-8 w-8" />
        </Link>
        <Link
          target="_blank"
          title="Przejdź do Linkedin.com"
          href="https://linkedin.com/in/wesselpawel"
          className="duration-200 text-white"
        >
          <FaLinkedin className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}
