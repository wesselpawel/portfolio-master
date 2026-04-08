"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const opinions = [
  {
    initial: "A",
    color: "bg-blue-500",
    name: "Anna N.",
    role: "Właścicielka salonu fryzjerskiego",
    text: "Strona gotowa szybciej niż się spodziewałam! Wszystko działa super.",
  },
  {
    initial: "M",
    color: "bg-green-500",
    name: "Marek Z.",
    role: "CEO firmy e-commerce",
    text: "Sklep śmiga, płatności bez problemu, a sprzedaż rośnie. Polecam!",
  },
  {
    initial: "K",
    color: "bg-purple-500",
    name: "Katarzyna W.",
    role: "Lekarz dentysta",
    text: "Wszystko ogarnięte od A do Z. Strona dla gabinetu wygląda świetnie.",
  },
  {
    initial: "T",
    color: "bg-orange-500",
    name: "Tomasz L.",
    role: "Właściciel agencji marketingowej",
    text: "Freelancer robił stronę i system dla klientów. Polecam!",
  },
  {
    initial: "J",
    color: "bg-pink-500",
    name: "Joanna K.",
    role: "Artystka, właścicielka galerii",
    text: "Moje prace w końcu mają swoje miejsce w sieci! Strona wygląda pięknie.",
  },
  {
    initial: "R",
    color: "bg-indigo-500",
    name: "Robert N.",
    role: "Właściciel restauracji",
    text: "Zamówienia online działają super, klienci zadowoleni, ja też! Dzięki!",
  },
  {
    initial: "E",
    color: "bg-teal-500",
    name: "Ewa K.",
    role: "Właścicielka sklepu internetowego",
    text: "Strona śmiga na telefonie i komputerze, a klienci łatwo kupują.",
  },
  {
    initial: "M",
    color: "bg-emerald-500",
    name: "Michał J.",
    role: "Dyrektor firmy IT",
    text: "Aplikacja działa bez zarzutu. Polecam Quixy każdemu!",
  },
  {
    initial: "A",
    color: "bg-cyan-500",
    name: "Aleksandra W.",
    role: "Marketing Manager",
    text: "Strona wygląda świetnie i ładuje się błyskawicznie.",
  },
  {
    initial: "P",
    color: "bg-rose-500",
    name: "Piotr M.",
    role: "Właściciel centrum medycznego",
    text: "Rezerwacje online, bajka. Wszystko działa, pacjenci zadowoleni.",
  },
  {
    initial: "L",
    color: "bg-violet-500",
    name: "Liliana B.",
    role: "Właścicielka butiku",
    text: "Więcej klientów i szybka strona – o to chodziło!",
  },
  {
    initial: "D",
    color: "bg-amber-500",
    name: "Damian C.",
    role: "CEO startupu technologicznego",
    text: "Wszystko działa jak należy. Quixy zna się na rzeczy!",
  },
];

const stats = [
  {
    value: "100%",
    color: "text-blue-600",
    label: "Zadowoleni klienci",
  },
  {
    value: "79+",
    color: "text-green-600",
    label: "Zrealizowanych projektów",
  },
  {
    value: "24/7",
    color: "text-purple-600",
    label: "Wsparcie techniczne",
  },
  {
    value: "5.0",
    color: "text-orange-600",
    label: "Średnia ocen",
  },
];

export default function OpinionsSection({ darkBg }: { darkBg?: boolean }) {
  // Helper to choose text color based on darkBg
  const nameTextClass = darkBg ? "text-white" : "text-gray-800";
  const roleTextClass = darkBg ? "text-gray-200" : "text-gray-500";
  const opinionTextClass = darkBg ? "text-gray-100" : "text-gray-700";

  return (
    <div className="mt-24 h-max block w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
      >
        {opinions.map((op, idx) => (
          <SwiperSlide key={idx}>
            <div className="p-5 duration-300 h-max flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 aspect-square ${op.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                >
                  {op.initial}
                </div>
                <div>
                  <span className={`font-bold text-lg ${nameTextClass}`}>
                    {op.name}
                  </span>
                  <p
                    className={`text-sm font-gotham font-light ${roleTextClass}`}
                  >
                    {op.role}
                  </p>
                </div>
              </div>
              <p
                className={`leading-relaxed flex-1 text-sm mt-2 ${opinionTextClass}`}
              >
                {op.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
