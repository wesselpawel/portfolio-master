"use client";
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "./pagination/Pagination";
import { polishToEnglish } from "../../utils/polishToEnglish";

interface Idea {
  name: string;
  creationTime: string;
}

interface IdeasProps {
  ideas: Idea[];
}

const IdeaListSlug: React.FC<IdeasProps> = ({ ideas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Initially, 6 items per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    setItemsPerPage((prev) => prev + 6); // Load 6 more talents each time the button is clicked
  };

  const indexOfLastIdea = currentPage * itemsPerPage;
  const currentIdeas = ideas?.slice(0, indexOfLastIdea);

  return (
    <div className="bg-white p-4 sm:p-8 mx-auto font-gotham sm: sm:my-12">
      <h2 className="text-xl sm:text-3xl max-w-2xl text-black">
        Zobacz wszystkie pomysły wygenerowane przez naszych użytkowników
      </h2>
      <p className="text-black max-w-2xl mt-4 mb-3 font-light text-lg">
        Przejrzyj listę projektów i dołącz do grupy, lub utwórz swój pomysł i
        niech inni dołączą do Ciebie!
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentIdeas.map((idea: Idea, i: number) => (
          <Link
            key={i}
            href={`/business-ideas/${polishToEnglish(
              idea?.name
            )}${idea?.creationTime?.toString()}`}
            className="bg-gradient-to-r from-primary to-cta text-white flex flex-col justify-between p-6 border  shadow-sm hover:shadow-lg hover:border-primary hover:shadow-primary hover:scale-105 duration-300"
          >
            {idea?.name}
          </Link>
        ))}
      </div>
      <Pagination
        onShowMore={handleShowMore}
        totalItems={ideas.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default IdeaListSlug;
