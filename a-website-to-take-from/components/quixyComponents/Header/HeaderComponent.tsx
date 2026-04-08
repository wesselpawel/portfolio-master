"use client";
import Cta from "@/components/cta/Cta";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { polishCities, getCityNominative } from "@/lib/polishCities";
export default function HeaderComponent({
  showHeader,
  menuShow,
  hovered,
  productsOpen,
  setProductsOpen,
  handleMouseEnter,
  handleMouseLeave,
  width,
  setMenuShow,
  setHovered,
}: {
  showHeader: boolean;
  menuShow: boolean;
  hovered: string;
  productsOpen: boolean;
  setProductsOpen: Function;
  handleMouseEnter: Function;
  handleMouseLeave: Function;
  width: number;
  setMenuShow: Function;
  setHovered: Function;
}) {
  return (
    <>
      <div
        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className={`fixed left-0 top-0 z-[10000] px-6 bg-white flex flex-row items-center justify-center w-full ${
          showHeader || menuShow || hovered === "cat" || productsOpen
            ? "-translate-y-0"
            : "-translate-y-[100%]"
        } duration-300 `}
      >
        {/* Header Content */}
        <div className="flex w-full max-w-7xl items-center justify-between">
          <Link
            title="Platforma internetowa pracy zdalnej Quixy"
            href="/"
            className="flex flex-col font-light h-full relative min-w-32"
          >
            <Image
              src="/assets/quixy-logo.png"
              width={224}
              height={224}
              alt="Platforma dla freelancerów"
              title="Platforma dla freelancerów"
              className="w-24 aspect-auto absolute top-1/2 -translate-y-1/2"
            />
          </Link>
          <div className="flex items-center">
            <div className={`mr-1 w-max group lg:hidden`}>
              <button
                onClick={() => {
                  if (!menuShow) {
                    if (productsOpen) {
                      setProductsOpen(false);
                    } else {
                      setProductsOpen(true);
                    }
                  } else {
                    setProductsOpen(false);
                    setMenuShow(false);
                  }
                }}
                title="Menu z Pracą Zdalną"
                className={`${
                  (menuShow || productsOpen) && "opened"
                } flex items-center h-full w-max text-sm sm:text-base drop-shadow-sm duration-100 cursor-pointer font-bold`}
              >
                <svg width="65" height="65" viewBox="0 0 100 100">
                  <path
                    className="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path
                    className="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="lg:flex items-center w-full hidden">
            {/* Strony Internetowe Section */}
            <div className="flex items-center space-x-8">
              <div
                onMouseEnter={() => {
                  width >= 1024 && handleMouseEnter("strony");
                }}
                onMouseLeave={() => {
                  width >= 1024 && handleMouseLeave();
                }}
                className="relative group"
              >
                <button
                  title="Strony internetowe dla miast w Polsce"
                  className="flex items-center text-black hover:text-green-600 transition-colors duration-200 font-medium text-base"
                >
                  <span className="relative z-50 px-3 py-2">
                    Strony internetowe
                  </span>
                  <FaChevronDown className="ml-1 text-sm" />
                </button>

                {/* Dropdown for Strony Internetowe */}
                <div
                  className={`absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${
                    hovered === "strony"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } transition-all duration-200`}
                >
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                      Strony internetowe dla miast:
                    </h3>
                    <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
                      {polishCities.slice(0, 20).map((city) => (
                        <Link
                          key={city}
                          href={`/oferta/tworzenie-stron-internetowych-${city}-cennik`}
                          title={`Tworzenie stron internetowych ${getCityNominative(
                            city
                          )}`}
                          className="text-xs text-gray-600 hover:text-green-600 transition-colors py-1 px-2 rounded hover:bg-gray-50"
                        >
                          {getCityNominative(city)}
                        </Link>
                      ))}
                      {polishCities.length > 20 && (
                        <div className="col-span-2 text-xs text-gray-500 py-2 text-center">
                          +{polishCities.length - 20} więcej miast
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                onMouseEnter={() => {
                  width >= 1024 && handleMouseEnter("cat");
                }}
                onMouseLeave={() => {
                  width >= 1024 && handleMouseLeave();
                }}
                className={`w-max h-full py-5 group`}
              >
                <button
                  onClick={() => {
                    setProductsOpen(true);
                    setMenuShow(false);
                    setHovered("");
                  }}
                  title="Firmy, Freelancerzy, Oferty Pracy Zdalnej, Zlecenia, Usługi Quixy"
                  className={`flex text-black hover:text-white items-center w-max py-[14px] px-[10px] drop-shadow-sm duration-500 relative text-base cursor-pointer`}
                >
                  <span
                    className={`relative z-50 ${
                      hovered === "cat" &&
                      "text-green-600 transition-colors duration-200"
                    } rounded-md px-3 py-2`}
                  >
                    Nasza oferta
                  </span>
                  <FaChevronDown
                    className={`${
                      hovered === "cat"
                        ? "text-green-600 transition-colors duration-200"
                        : ""
                    } ml-1 text-sm`}
                  />
                </button>
              </div>

              <Link
                href="/news"
                className="rounded-md text-base drop-shadow-sm shadow-black text-black px-4 py-2 bg-gradient-to-br hover:from-green-600 hover:to-green-700 hover:text-white transition-all duration-200 font-medium"
              >
                Aktualności
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
