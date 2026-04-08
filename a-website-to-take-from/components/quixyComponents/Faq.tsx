"use client";
import Link from "next/link";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqItems: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqItems }) => {
  const [visibleItems, setVisibleItems] = useState(3);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 3); // Show 3 more items on each click
  };

  return (
    <div>
      <span className="font-extrabold z-50 pb-3 text-2xl text-black w-full">
        Masz jakieś pytania?
      </span>
      <ul className="-mt-[2px] cursor-default select-none lg:hover:bg-gradient-to-r lg:hover:from-primaryStart/20 lg:hover:to-primaryEnd/20 bg-gradient-to-r text-lg text-black">
        {faqItems.slice(0, visibleItems).map((faq, index) => (
          <li
            key={index}
            className={`lg:hover:!text-white text-black lg:hover:bg-gradient-to-r lg:hover:from-primaryStart lg:hover:to-primaryEnd p-3 ${
              index + 1 !== visibleItems && "border-primaryStart/50 border-b-2"
            }`}
          >
            <span className="font-extrabold">{faq.question}</span>
            <p className="text-base">{faq.answer}</p>
          </li>
        ))}
      </ul>

      {visibleItems < faqItems.length ? (
        <div className="w-full flex items-start justify-start mt-3">
          <button
            onClick={handleShowMore}
            className="bg-gradient-to-r from-accentStart to-accentEnd text-white py-2 px-4 hover:scale-105 duration-100 rounded-md "
          >
            Pokaż więcej
          </button>
        </div>
      ) : (
        <div className="w-full flex items-start justify-start mt-3">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-ctaStart to-ctaEnd text-white py-2 px-4 hover:scale-105 duration-100 rounded-md "
          >
            Masz inne pytanie?
          </Link>
        </div>
      )}
    </div>
  );
};

export default FAQ;
