import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import LandingPageSearchInput from "@/components/LandingPageSearchInput";
import { FaChevronRight, FaSearch, FaUser, FaNewspaper } from "react-icons/fa";

export default function ProductsMobile({
  productsOpen,
  setProductsOpen,
  setMenuShow,
  jobs,
  menuShow,
  setHovered,
}: {
  productsOpen: boolean;
  setProductsOpen: Function;
  setMenuShow: Function;
  jobs: any;
  menuShow: boolean;
  setHovered: Function;
}) {
  function resetHeader() {
    setMenuShow(false);
    setProductsOpen(false);
    setHovered("");
  }
  return (
    <div>
      <div
        className={`fixed w-screen h-full overflow-y-auto left-0 top-0 bg-white transition-all duration-300 ${
          productsOpen
            ? "pt-[75px] opacity-100 z-[500]"
            : "z-[-10] opacity-0 pointer-events-none"
        } lg:hidden`}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Nasza Oferta</h2>
          <p className="text-green-100 text-sm">
            Znajdź idealne rozwiązanie dla swojej firmy
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 px-4 py-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link
              onClick={resetHeader}
              href="/login"
              className="flex items-center justify-center space-x-2 bg-white rounded-lg py-3 px-4 shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
              <FaUser className="text-green-600" />
              <span className="font-medium text-gray-700">Logowanie</span>
            </Link>
            <Link
              onClick={resetHeader}
              href="/news"
              className="flex items-center justify-center space-x-2 bg-white rounded-lg py-3 px-4 shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
              <FaNewspaper className="text-blue-600" />
              <span className="font-medium text-gray-700">Aktualności</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <LandingPageSearchInput
              rounded={true}
              isLandingPage={false}
              resetHeader={resetHeader}
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="px-4 py-4 space-y-4">
          {jobs.map((job: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                <Link
                  href={`/oferta/dla-firm/${polishToEnglish(job.title)}`}
                  onClick={resetHeader}
                  title={`Przejdź do ofert ${job.title}`}
                  className="flex items-center justify-between group"
                >
                  <h3 className="font-bold text-gray-900 text-lg">
                    {job.title}
                  </h3>
                  <FaChevronRight className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              {/* Subcategories */}
              <div className="p-4 space-y-3">
                {job.data.map((item: any, z: number) => (
                  <div key={z} className="space-y-2">
                    <Link
                      href={`/oferta/dla-firm/${polishToEnglish(
                        job.title
                      )}/${polishToEnglish(item.title)}`}
                      onClick={resetHeader}
                      title={`Przejdź do ofert ${item.title}`}
                      className="block font-semibold text-gray-800 hover:text-green-600 transition-colors"
                    >
                      {item.title}
                    </Link>

                    {/* Horizontal Scroll Subcategories */}
                    <div className="overflow-x-auto">
                      <div
                        className="flex space-x-2 pb-2"
                        style={{ width: "max-content" }}
                      >
                        {item.data.map((subcategory: any, j: number) => (
                          <Link
                            key={j}
                            title={`Oferta ${subcategory.title}`}
                            onClick={resetHeader}
                            href={`/oferta/dla-firm/${polishToEnglish(
                              job.title
                            )}/${polishToEnglish(item.title)}/${polishToEnglish(
                              subcategory.title
                            )}`}
                            className="flex-shrink-0 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:text-green-700 transition-all duration-200 whitespace-nowrap"
                          >
                            {subcategory.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-6 bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              Potrzebujesz pomocy w wyborze?
            </p>
            <Link
              href="/contact"
              onClick={resetHeader}
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Skontaktuj się z nami</span>
              <FaChevronRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
