"use client";
import Link from "next/link";
import { FaChevronDown, FaHome, FaPlusCircle, FaTag } from "react-icons/fa";
import { useState } from "react";
import {
  FaBriefcase,
  FaChevronLeft,
  FaCoins,
  FaGlobe,
  FaLightbulb,
  FaList,
  FaPowerOff,
  FaUser,
  FaBars,
} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { set_modals } from "@/common/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";
import { setLight } from "@/common/redux/slices/lightSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/common/firebase";
import { setUser } from "@/common/redux/slices/user";

export default function Nav({
  isNavOpen,
  setNavOpen,
}: {
  isNavOpen: any;
  setNavOpen: any;
}) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const navItems = [
    {
      title: "Praca",
      href: `/oferta`,
      expandable: true,
      icon: <FaBriefcase />,
      subItems: [
        {
          title: "Dodaj ofertę",
          href: `/user/add_job_offer`,
          icon: <FaPlusCircle />,
        },
        {
          title: "Moje ogłoszenia",
          href: `/user/job_offers`,
          icon: <FaList />,
        },
      ],
    },
    {
      expandable: true,
      title: "Rynek",
      href: ``,
      icon: <FaTag />,
      subItems: [
        {
          title: "Dodaj usługę",
          href: `/user/new_service`,
          icon: <FaPlusCircle />,
        },
        {
          title: "Moje usługi",
          href: `/user/services`,
          icon: <FaList />,
        },
        { title: "Przegląd", href: `/user`, icon: <FaHome /> },
        { title: "Strona główna", href: `/`, icon: <FaGlobe /> },
        {
          title: "Zapytania",
          href: `/user/leads`,
          icon: <AiFillThunderbolt />,
        },
      ],
    },
  ];
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { light } = useSelector((state: any) => state.light);
  function logout() {
    dispatch(setUser(""));
    signOut(auth).then(() => {
      router.push("/login");
    });
  }

  // Mobile menu toggle button (below lg)
  // Show only below lg, hide on lg and up
  // The menu itself is hidden below lg unless mobileMenuOpen is true
  return (
    <div>
      {/* Mobile menu toggle button */}
      <div className="block lg:!hidden fixed top-[70px] left-0 z-[200]">
        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className={`m-2 p-2 rounded-md shadow-md ${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          }`}
          aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {/* Menu container */}
      <div
        className={`
          z-[150]
          ${mobileMenuOpen ? "fixed top-0 left-0 w-screen h-screen" : "hidden"}
          lg:sticky lg:top-[94px] lg:left-0 lg:block
          transition-all duration-200
          ${
            light
              ? "bg-white/95 lg:bg-transparent"
              : "bg-[#222430]/95 lg:bg-transparent"
          }
        `}
      >
        <div
          className={`lg:py-6 lg:px-6 h-full sticky left-0 top-0 scrollbar ${
            light ? "text-black" : "text-white"
          }`}
        >
          <div className="relative flex flex-col gap-12 h-full">
            <div
              className={`relative flex flex-col justify-between h-full ${
                light ? "bg-white duration-150" : "bg-[#222430] duration-150"
              } lg:rounded-lg`}
            >
              <div className="w-full">
                <div className="w-full flex justify-between">
                  <Link
                    href="/"
                    className="mr-20 font-sans font-bold flex flex-row items-center py-2 px-6 !text-white bg-gradient-to-b from-primaryStart to-primaryEnd rounded-br-3xl lg:rounded-tl-lg w-max max-w-full"
                  >
                    <div>Panel administracyjny</div>
                  </Link>
                  <button
                    onClick={() => dispatch(setLight(!light))}
                    className={`${
                      light ? "bg-primaryEnd" : "bg-white"
                    } lg:rounded-bl-lg lg:rounded-tr-lg duration-300 rounded-bl-3xl w-16 h-16 flex items-center justify-center`}
                  >
                    <FaLightbulb
                      className={`rotate-45 text-3xl ${
                        light ? "text-white" : "text-accentStart"
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-4 font-sans">
                  <div className="flex flex-col flex-wrap justify-between w-full px-4 gap-2">
                    <button
                      onClick={() => {
                        dispatch(
                          set_modals({
                            ...modals,
                            quixies: false,
                            config: !modals.config,
                          })
                        );
                        setNavOpen(!isNavOpen);
                        setMobileMenuOpen(false);
                      }}
                      className={`${
                        modals.config
                          ? `border-primaryStart ${
                              light ? "bg-gray-200" : "bg-[#2F313C]"
                            }`
                          : `border-transparent ${
                              light ? "hover:bg-gray-200" : "hover:bg-[#2F313C]"
                            }  `
                      } border-l-2 flex items-center py-2 px-4 w-full rounded-md`}
                    >
                      <FaUser className="mr-2" />
                      Ustawienia
                    </button>
                    {navItems.map((item, index) => (
                      <div
                        key={index}
                        className={`w-full ${
                          item.expandable ? "relative" : ""
                        }`}
                      >
                        {index === 1 && (
                          <button
                            onClick={() => {
                              dispatch(
                                set_modals({
                                  ...modals,
                                  quixies: !modals.quixies,
                                  config: false,
                                })
                              );
                              setNavOpen(!isNavOpen);
                              setMobileMenuOpen(false);
                            }}
                            className={`${
                              modals.quixies
                                ? `border-primaryStart ${
                                    light ? "bg-gray-200" : "bg-[#2F313C]"
                                  }`
                                : `border-transparent ${
                                    light
                                      ? "hover:bg-gray-200"
                                      : "hover:bg-[#2F313C]"
                                  }`
                            } border-l-2 mb-2 flex items-center py-2 px-4 w-full rounded-md`}
                          >
                            <FaCoins className="mr-2" />
                            Sklep
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (item.expandable) {
                              if (expandedItems.includes(index as never)) {
                                setExpandedItems(
                                  expandedItems.filter((i) => i !== index)
                                );
                              } else {
                                setExpandedItems([
                                  ...expandedItems,
                                  index as never,
                                ]);
                              }
                            } else {
                              router.push(item.href);
                              setNavOpen(!isNavOpen);
                              setMobileMenuOpen(false);
                            }
                          }}
                          className={`${
                            pathname === item.href
                              ? `${
                                  light ? "bg-gray-200" : "bg-[#2F313C]"
                                } border-primaryStart`
                              : `${
                                  light
                                    ? "hover:bg-gray-200"
                                    : "hover:bg-[#2F313C]"
                                } border-transparent`
                          } border-l-2 ${
                            item.expandable ? "cursor-pointer" : ""
                          } ${
                            expandedItems.includes(index as never) &&
                            `${
                              light
                                ? "bg-gray-200 hover:bg-gray-200"
                                : "bg-[#2F313C] hover:bg-[#3B3D47]"
                            }`
                          } flex items-center justify-between py-2 px-4 w-full rounded-md`}
                        >
                          <div className="flex flex-row items-center">
                            <div className="mr-2">{item.icon}</div>
                            {item.title}
                          </div>
                          {item.expandable && (
                            <div
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (item.expandable) {
                                  if (expandedItems.includes(index as never)) {
                                    setExpandedItems(
                                      expandedItems.filter((i) => i !== index)
                                    );
                                  } else {
                                    setExpandedItems([
                                      ...expandedItems,
                                      index as never,
                                    ]);
                                  }
                                }
                              }}
                              className={`${
                                light
                                  ? "lg:hover:bg-gray-200"
                                  : "hover:bg-[#3B3D47]"
                              } rounded-md p-1`}
                            >
                              <FaChevronDown
                                className={`duration-150 ${
                                  expandedItems.includes(index as never)
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              />
                            </div>
                          )}
                        </button>

                        {item.expandable &&
                          expandedItems.includes(index as never) && (
                            <div
                              className={`py-2 px-4 w-full gap-2 flex flex-col`}
                            >
                              {item.subItems.map((subItem, subIndex) => (
                                <div key={subIndex}>
                                  <button
                                    onClick={() => {
                                      router.push(subItem.href);
                                      setNavOpen(!isNavOpen);
                                      setMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center py-2 px-4 w-full ${
                                      subItem.href === pathname
                                        ? `border-primaryStart ${
                                            light
                                              ? "bg-gray-200"
                                              : "bg-[#2F313C]"
                                          }`
                                        : `border-transparent ${
                                            light
                                              ? "hover:bg-gray-200"
                                              : "hover:bg-[#2F313C]"
                                          }`
                                    } border-l-2 rounded-md`}
                                  >
                                    {subItem.icon}
                                    <div className="ml-2">{subItem.title}</div>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        {index + 1 === navItems.length && (
                          <button
                            onClick={() => {
                              logout();
                              setNavOpen(!isNavOpen);
                              setMobileMenuOpen(false);
                            }}
                            className={`mt-2 ${
                              modals.quixies
                                ? `border-primaryStart ${
                                    light ? "bg-gray-200" : "bg-[#2F313C]"
                                  }`
                                : `border-transparent ${
                                    light
                                      ? "hover:bg-gray-200"
                                      : "hover:bg-[#2F313C]"
                                  }`
                            } border-l-2 mb-2 flex items-center py-2 px-4 w-full rounded-md`}
                          >
                            <FaPowerOff className="mr-2" />
                            Wyloguj
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
