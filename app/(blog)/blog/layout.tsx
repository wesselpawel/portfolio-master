import { NavLeft, NavRight } from "@/components/Navigation";
import "aos/dist/aos.css";
import Link from "next/link";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white overflow-hidden">
      <Link
        href="/"
        className="fixed left-6 lg:left-12 top-12 z-[550] flex flex-row items-center justify-center"
      >
        <h2 className="italic font-bold text-2xl text-white drop-shadow-md shadow-black">
          wesiu.
          <span className=" text-yellow-500">dev</span>
        </h2>
      </Link>

      {children}
    </div>
  );
}
