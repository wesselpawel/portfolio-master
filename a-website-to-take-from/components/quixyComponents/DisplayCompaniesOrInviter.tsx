import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import Pagination from "./pagination/Pagination";
import ProfileCard from "./ProfileCard";

export default function DisplayCompaniesOrInviter({ data }: { data: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Initially, 6 items per page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    setItemsPerPage((prev) => prev + 6); // Load 6 more talents each time the button is clicked
  };
  const indexOfLastTalent = currentPage * itemsPerPage;
  const currentData = data?.slice(0, indexOfLastTalent);
  return (
    <div className="mt-6">
      <div className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-4`}>
        {/* Wyświetlenie dostępnych talentów */}
        {currentData.map((talent: any, i: number) => (
          <ProfileCard
            key={talent?.pseudo || i}
            profile={talent}
            type="firma"
          />
        ))}
        <Link
          href="/register"
          className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-105"
        >
          <FaPlusCircle className="text-zinc-600 text-5xl min-w-16 lg:min-w-20 h-16 lg:h-20" />
          <div className="px-4">
            <p className="text-lg lg:text-xl font-bold text-black font-gotham">
              Dołącz do nas
            </p>
            <p className="text-sm text-black font-gotham font-light">
              Skonfiguruj profil na naszej platformie i wyświetlaj swoje usługi.
            </p>
          </div>
        </Link>
      </div>
      {data?.length > 0 && (
        <div>
          <Pagination
            onShowMore={handleShowMore}
            totalItems={data?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
