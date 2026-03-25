import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";
import StarsBg from "@/components/StarsBg";
import Footer from "@/components/ContactSection";

// async function getPost(url: string, blogType?: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?url=${url}&secret=${process.env.API_SECRET_KEY}`,
//     { next: { revalidate: 180 } }
//   );
//   if (!res) {
//     throw new Error("Failed to fetch data");
//   }
//   const post = res.json();
//   return post;
// }

// async function getBlogData() {
//   const req = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?secret=${process.env.API_SECRET_KEY}`,
//     { next: { revalidate: 30 } }
//   );
//   const posts = req.json();
//   return posts;
// }
export default async function Page() {
  // const { posts } = await getBlogData();
  return (
    <div className="w-full min-h-screen px-5 lg:px-[8vw] xl:px-[12vw] relative">
      <div className="h-screen w-full fixed left-0 top-0 bg-gradient-to-br from-black via-zinc-800 to-black scale-150"></div>
      <StarsBg />
      <div
        className={`bg-slate-800 w-full min-h-[60vh] z-[10] relative mt-48 rounded-xl border-2 border-slate-900`}
      >
        <div className="text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold bg-yellow-300 rounded-tl-xl rounded-br-xl px-12 py-3 w-max">
          Wszystkie wpisy
        </div>
        {/* <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 my-8">
          {posts?.posts?.map((post: Post, i: number) => (
            <Link
              href={`/blog/${post.url}`}
              key={i}
              className="group relative aspect-square h-max flex flex-col hover:bg-purple-300 hover:p-1 duration-300 ease-in-out rounded-lg shadow-md  shadow-zinc-700"
            >
              <div className="w-full overflow-hidden flex items-start">
                <Image
                  src={post.mainImage}
                  width={1024}
                  height={1024}
                  alt={post.title}
                  className="w-full object-contain rounded-lg shadow-md shadow-zinc-700"
                />
              </div>
              <span className="group-hover:bg-gray-200 duration-300 group-hover:p-4 absolute bottom-3 left-3 right-3 text-base lg:text-xl  drop-shadow-xl shadow-black mt-3 bg-white text-zinc-700 font-bold text-left p-3 rounded-lg">
                {post.title}
              </span>
            </Link>
          ))}
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
