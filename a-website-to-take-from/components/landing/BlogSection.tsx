"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDocuments } from "@/common/firebase";
import { Post } from "@/types";
import { FaEye } from "react-icons/fa";

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const collectionDocs: any = await getDocuments("blog");
        const unique = new Map<string, Post>();
        for (const p of collectionDocs || []) {
          if (p?.postId) unique.set(p.postId, p as Post);
        }
        setPosts(Array.from(unique.values()));
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section
      className={`relative w-full py-24 overflow-hidden px-4 ${
        posts.length > 0 ? "block" : "hidden"
      }`}
    >
      <div className="relative z-10 w-full px-3 max-w-7xl mx-auto">
        <div className="mb-12 text-center relative">
          <span className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white font-gotham">
            Ostatnie wpisy z bloga
          </span>
          <p className="font-gotham font-light text-gray-200 mt-3 text-base lg:text-lg max-w-2xl mx-auto"></p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#0f1320]/80 backdrop-blur-xl border border-[#2a2f3d]/50 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-[16/9] bg-[#1a1f2e] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1320]/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 bg-[#1a1f2e] rounded-full w-20" />
                    <div className="h-6 bg-[#1a1f2e] rounded-full w-16" />
                  </div>
                  <div className="h-6 bg-[#1a1f2e] rounded w-4/5 mb-2" />
                  <div className="h-6 bg-[#1a1f2e] rounded w-3/5" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 bg-[#1a1f2e] rounded-full w-12" />
                    <div className="h-6 bg-[#1a1f2e] rounded-full w-16" />
                  </div>
                  <div className="h-4 bg-[#1a1f2e] rounded w-24 mt-5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts
              .filter((post) => post?.manual === true)
              .slice(0, 8)
              .map((post) => (
                <div
                  key={post.postId}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActivePost(post)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActivePost(post);
                  }}
                  className="group relative bg-[#0f1320]/80 hover:bg-[#141723]/90 transition-all duration-300 rounded-2xl overflow-hidden border border-[#2a2f3d]/50 backdrop-blur-xl cursor-pointer hover:border-[#B4FC2D]/30 hover:shadow-lg hover:shadow-[#B4FC2D]/10 hover:-translate-y-1"
                >
                  {/* Floating accent dot */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-[#B4FC2D] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={
                        typeof post.mainImage === "string" &&
                        (post.mainImage.startsWith("http://") ||
                          post.mainImage.startsWith("https://") ||
                          post.mainImage.startsWith("/"))
                          ? post.mainImage
                          : "/images/projects/quixy/hero.png"
                      }
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1320]/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs mb-3">
                      <span className="bg-[#1a1f2e]/60 backdrop-blur-sm border border-[#2a2f3d]/30 text-gray-300 px-2.5 py-1 rounded-full">
                        {new Date(post.creationTime).toLocaleDateString(
                          "pl-PL"
                        )}
                      </span>
                      {typeof post.readTime === "number" &&
                        post.readTime > 0 && (
                          <span className="bg-[#1a1f2e]/60 backdrop-blur-sm border border-[#2a2f3d]/30 text-gray-300 px-2.5 py-1 rounded-full">
                            {post.readTime} min
                          </span>
                        )}
                      {typeof post.viewerCount === "number" && (
                        <span className="flex flex-row items-center bg-[#1a1f2e]/60 backdrop-blur-sm border border-[#2a2f3d]/30 text-gray-300 px-2.5 py-1 rounded-full">
                          <FaEye />
                          {post.viewerCount}
                        </span>
                      )}
                    </div>

                    <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 group-hover:text-[#B4FC2D] transition-colors duration-300 font-gotham">
                      {post.title}
                    </h3>

                    <div className="mt-5">
                      <Link
                        href={`/oferta/${post.slug || post.url || post.postId}`}
                        className="inline-flex items-center text-[#B4FC2D] hover:text-[#A3E626] text-sm font-medium transition-colors duration-300"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          e.stopPropagation()
                        }
                      >
                        Otwórz artykuł
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {activePost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setActivePost(null)}
          />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f1320]/95 backdrop-blur-xl border border-[#2a2f3d]/50 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePost(null)}
              className="absolute right-4 top-4 z-20 w-8 h-8 bg-[#1a1f2e]/80 hover:bg-[#22263a] border border-[#2a2f3d] rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all"
              aria-label="Zamknij"
            >
              ✕
            </button>

            {/* Scrollable content container */}
            <div className="max-h-[90vh] overflow-y-auto scrollbar">
              <div className="relative aspect-[16/7] min-h-[200px]">
                <Image
                  src={
                    typeof activePost.mainImage === "string" &&
                    (activePost.mainImage.startsWith("http://") ||
                      activePost.mainImage.startsWith("https://") ||
                      activePost.mainImage.startsWith("/"))
                      ? activePost.mainImage
                      : "/images/projects/quixy/hero.png"
                  }
                  alt={activePost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1320] via-[#0f1320]/20 to-transparent" />

                {/* Floating accent elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-[#B4FC2D] rounded-full opacity-60 animate-pulse" />
                <div className="absolute top-8 right-8 w-2 h-2 bg-[#3EE7C0] rounded-full opacity-40" />
                <div className="absolute bottom-6 left-8 w-1 h-1 bg-[#B4FC2D] rounded-full opacity-80" />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-xs mb-4">
                  <span className="bg-[#1a1f2e]/60 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-300 px-3 py-1.5 rounded-full">
                    {new Date(activePost.creationTime).toLocaleDateString(
                      "pl-PL"
                    )}
                  </span>
                  {typeof activePost.readTime === "number" &&
                    activePost.readTime > 0 && (
                      <span className="bg-[#1a1f2e]/60 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-300 px-3 py-1.5 rounded-full">
                        {activePost.readTime} min czytania
                      </span>
                    )}
                  {typeof activePost.viewerCount === "number" && (
                    <span className="bg-[#1a1f2e]/60 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-300 px-3 py-1.5 rounded-full">
                      {activePost.viewerCount} wyświetleń
                    </span>
                  )}
                </div>

                <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight font-gotham">
                  {activePost.title}
                </h3>

                {activePost.intro && (
                  <p className="text-gray-200 mt-4 leading-relaxed text-base md:text-lg whitespace-pre-line">
                    {activePost.intro}
                  </p>
                )}

                {activePost.tags && activePost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {activePost.tags.slice(0, 6).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gradient-to-r from-[#1a1f2e] to-[#22263a] text-gray-300 px-3 py-1.5 rounded-full border border-[#2a2f3d]/30 backdrop-blur-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/oferta/${
                      activePost.slug || activePost.url || activePost.postId
                    }`}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] hover:from-[#A3E626] hover:to-[#2DD4B0] text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#B4FC2D]/20"
                  >
                    Czytaj cały artykuł →
                  </Link>
                  <button
                    onClick={() => setActivePost(null)}
                    className="inline-flex items-center justify-center bg-[#1a1f2e]/80 hover:bg-[#22263a] border border-[#2a2f3d] text-gray-200 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
