"use client";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { FaFacebook, FaTiktok, FaChevronRight } from "react-icons/fa6";

export default function ProductsWide({
  width,

  hovered,
  handleMouseEnter,
  handleMouseLeave,
  jobs,

  setProductsOpen,
}: {
  width: number;

  hovered: string;
  handleMouseEnter: any;
  handleMouseLeave: any;
  jobs: any;

  setProductsOpen: any;
}) {
  function resetHeader() {
    handleMouseLeave();
  }
  return (
    <div
      onMouseEnter={() => {
        width >= 1024 && handleMouseEnter("cat");
      }}
      onMouseLeave={() => {
        width >= 1024 && handleMouseLeave();
      }}
      className={`z-[9999] fixed w-full max-h-[85vh] overflow-y-auto top-0 left-0 bg-white border-t border-gray-200 ${
        hovered === "cat"
          ? "translate-y-[116px] lg:translate-y-[84px] opacity-100"
          : "-translate-y-[100vh] opacity-0"
      } hidden lg:block transition-all duration-300 ease-in-out shadow-2xl`}
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header Section */}
        <div className="mt-4 flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <h2 className="text-2xl font-bold text-gray-900">Nasza Oferta</h2>
            <div className="flex items-center space-x-4">
              <Link
                title="Strony Internetowe WWW z Cennikiem Grudziądz Tiktok"
                target="_blank"
                href="https://www.tiktok.com/@strony_www_grudziadz"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaTiktok className="text-lg text-gray-700" />
              </Link>
              <Link
                title="Strony Internetowe WWW z Cennikiem Grudziądz Facebook"
                href="https://www.facebook.com/profile.php?id=61579945978455"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaFacebook className="text-lg text-gray-700" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {jobs.map((job: any, i: any) => (
            <div key={i} className="space-y-4">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 shadow-lg">
                <Link
                  href={`/oferta/dla-firm/${polishToEnglish(job.title)}`}
                  title={`Oferta ${job.title}`}
                  onClick={resetHeader}
                  className="block group"
                >
                  <h3 className="text-xl font-bold text-white group-hover:text-green-100 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center mt-2 text-green-100 text-sm">
                    <span>Zobacz wszystkie oferty</span>
                    <FaChevronRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Subcategories */}
              <div className="space-y-2">
                {job.data.map((item: any, itemIndex: any) => (
                  <div key={itemIndex} className="group">
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <Link
                        href={`/oferta/dla-firm/${polishToEnglish(
                          job.title
                        )}/${polishToEnglish(item.title)}`}
                        onClick={resetHeader}
                        title={`Oferta ${job.title} / ${item.title}`}
                        className="block"
                      >
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                          {item.title}
                        </h4>
                      </Link>

                      {/* Subcategory Grid */}
                      <div className="grid grid-cols-1 gap-2">
                        {item.data
                          .slice(0, 4)
                          .map((subcategory: any, subIndex: any) => (
                            <Link
                              key={subIndex}
                              onClick={() => resetHeader()}
                              title={`Oferta ${job.title}/${item.title}/${subcategory.title}`}
                              href={`/oferta/dla-firm/${polishToEnglish(
                                job.title
                              )}/${polishToEnglish(
                                item.title
                              )}/${polishToEnglish(subcategory.title)}`}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-white rounded-md transition-all duration-200 border border-transparent hover:border-green-200"
                            >
                              {subcategory.title}
                            </Link>
                          ))}
                        {item.data.length > 4 && (
                          <div className="text-xs text-gray-500 px-3 py-2">
                            +{item.data.length - 4} więcej opcji
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm">
            Nie znalazłeś tego czego szukasz?
            <Link
              href="/contact"
              className="text-green-600 hover:text-green-700 font-medium ml-1"
              onClick={resetHeader}
            >
              Skontaktuj się z nami
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
