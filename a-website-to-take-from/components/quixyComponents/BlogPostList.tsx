"use client";
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "./pagination/Pagination";
import Image from "next/image";
import { useSelector } from "react-redux";

const BlogPostList = ({ posts }: { posts: any }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Initially, 3 items per page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    setItemsPerPage((prev) => prev + 6); // Load 6 more items each time the button is clicked
  };

  const indexOfLastIdea = currentPage * itemsPerPage;
  return (
    <div className="mt-12">
      <h3 className="text-white text-xl lg:text-3xl font-extrabold">
        Aktualności
      </h3>
      {posts && (
        <div className="mt-6 grid sm:grid-cols-2 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {posts?.map((post: any, i: number) => (
            <Link
              href={`/news/${post.url}`}
              key={i}
              title={`Artykuł ${post.title}`}
              className="rounded-lg group relative aspect-square h-max flex flex-col border-2 border-gray-200 hover:border-ctaStart"
            >
              <div className="w-full overflow-hidden flex items-start">
                <Image
                  src={post.primaryImage}
                  width={512}
                  height={512}
                  alt={`Obrazek ${post.title}`}
                  className="absolute inset-0 object-cover w-full h-full rounded-md"
                />
              </div>
              <h2 className="rounded-md bg-gradient-to-br from-zinc-600 to-zinc-700 duration-300 absolute bottom-3 left-3 right-3 text-sm mt-3 text-white font-extralight text-left px-3 py-1">
                {post?.title}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
