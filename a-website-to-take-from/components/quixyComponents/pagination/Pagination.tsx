"use client";
import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onShowMore: () => void; // Add a function to handle "pokaż więcej talentów"
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onShowMore,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle "Pokaż więcej talentów"
  function handleShowMore() {
    onShowMore();
  }

  // Hide pagination if items > 6 and show "pokaż więcej talentów" button
  if (totalItems > itemsPerPage) {
    return (
      <div className="flex justify-center">
        {totalItems > 1 && (
          <button
            style={{ boxShadow: "0px 1px 5px rgba(0,0,0,0.8)" }}
            onClick={handleShowMore}
            className="mt-4  border-gray-300 hover:scale-105 duration-100 px-4 py-2 bg-gradient-to-br from-zinc-600 to-zinc-700 text-white rounded-md"
          >
            Wyświetl więcej
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {totalItems > 6 && (
          <div className="mt-4  text-center text-white bg-gradient-to-b to-accentEnd from-accentStart w-max py-2 px-4 rounded-md mx-auto">
            Jesteś na bieżąco
          </div>
        )}
      </div>
    );
  }
};

export default Pagination;
