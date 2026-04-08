"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [active, setActive] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
          <Image
            src="/assets/lightbulb.png"
            width={144}
            height={144}
            alt="FAQ Icon"
            className="w-16 h-16"
          />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-gotham">
          Często zadawane pytania
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych
          usług
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-6" />
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-green-200"
          >
            <button
              className="w-full text-left px-8 py-6 font-semibold text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset hover:bg-gray-50"
              onClick={() => setActive(active === index ? null : index)}
              aria-expanded={active === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-gotham text-lg lg:text-xl">
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      active === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-white transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>

            {active === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-8 pb-6 animate-fadeIn"
              >
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-3"></div>
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-gotham">
            Nie znalazłeś odpowiedzi na swoje pytanie?
          </h3>
          <p className="text-gray-600 mb-6">
            Skontaktuj się z nami bezpośrednio - chętnie odpowiemy na wszystkie
            Twoje pytania
          </p>
          <Link
            href="/contact"
            title="Skontaktuj się"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Skontaktuj się z nami
          </Link>
        </div>
      </div>
    </section>
  );
}
