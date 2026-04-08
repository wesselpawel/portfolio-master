import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Link from "next/link";
import { getProductByUrl, getProducts } from "@/common/firebase/quixy";
import { renderMarkdown } from "@/lib/parseMarkdown";
import BlogPostList from "@/components/quixyComponents/BlogPostList";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { getPosts } from "@/lib/getPosts";
import Hero from "@/components/hero/Hero";
export async function generateStaticParams() {
  const products = await getProducts();
  return products?.map((product: any) => ({
    slug: product?.url,
  }));
}
export const revalidate = 60;
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const product: any = await getProductByUrl(params?.slug);
  const posts = await getPosts();
  return (
    <>
      <div className="w-full h-full fixed left-0 top-0 bg-black/80">
        <Hero />
      </div>
      <div className="overflow-x-hidden px-4 container mx-auto">
        <div className="pt-24 pb-24 relative">
          <div className="text-white flex flex-col breadcrumbs">
            <ul className="flex items-center flex-wrap">
              <li>
                <Link href={`/`} title="praca zdalna">
                  hello!
                </Link>
              </li>
              <li>
                <Link href="/news" title="aktualności">
                  news
                </Link>
              </li>
              <li>
                <Link
                  href={`/news/${polishToEnglish(product?.url)}`}
                  title="aktualności"
                >
                  {product?.url}
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mx-auto">
            <div className="flex flex-col">
              {product?.title && (
                <h1
                  style={{ lineHeight: 1.15 }}
                  className="text-2xl sm:text-5xl font-extrabold text-left mb-6 drop-shadow-xl shadow-black text-zinc-800"
                >
                  {product?.title}
                </h1>
              )}
              {product?.shortDesc && (
                <div
                  className="bg-gradient-to-b from-ctaStart to-ctaEnd rounded-md p-3 text-white text-lg lg:text-xl !font-gotham"
                  dangerouslySetInnerHTML={renderMarkdown(product?.shortDesc)}
                />
              )}

              {!product?.primaryImage && (
                <div className="bg-gray-300 hover:bg-opacity-80 duration-300 flex items-center justify-center w-full aspect-square mt-6 lg:hidden text-7xl text-gray-500">
                  <FaImage />
                </div>
              )}
              {product?.primaryImage && (
                <div className="relative lg:hidden">
                  <Image
                    src={product?.primaryImage}
                    width={1024}
                    height={1024}
                    alt={`Obraz ${product?.title}`}
                    className="w-full h-auto mt-6 rounded-md"
                  />
                  <div className="w-max absolute bottom-4 right-4">
                    <Link href="/">
                      <Image
                        src="/assets/quixy-logo.png"
                        width={420}
                        height={420}
                        alt=""
                        className="w-[80px]"
                      />
                    </Link>
                  </div>
                </div>
              )}

              {[
                product?.text1Title,
                product?.text2Title,
                product?.text3Title,
                product?.text4Title,
                product?.text5Title,
                product?.text6Title,
                product?.text7Title,
              ].map((title, index) =>
                title ? (
                  <div key={index}>
                    <h2 className="text-3xl font-bold mt-6 lg:mt-12 mb-4 drop-shadow-xl shadow-black text-zinc-800">
                      {title}
                    </h2>
                    <div
                      className="text-gray-700 font-light text-lg"
                      dangerouslySetInnerHTML={renderMarkdown(
                        product[`text${index + 1}Desc`]
                      )}
                    />
                  </div>
                ) : null
              )}
            </div>

            <div className="flex flex-col sticky top-12 right-0">
              {!product?.primaryImage && (
                <div className="bg-gray-300 hover:bg-opacity-80 duration-300 items-center justify-center w-full aspect-square hidden lg:flex text-7xl text-gray-500">
                  <FaImage />
                </div>
              )}
              {product?.primaryImage && (
                <div className="relative hidden lg:block">
                  <Image
                    src={product?.primaryImage}
                    width={1024}
                    height={1024}
                    alt={`Obraz ${product?.title}`}
                    className="w-full h-auto rounded-md"
                  />
                  <div className="w-max absolute bottom-4 right-4">
                    <Link href="/">
                      <Image
                        src="/assets/quixy-logo.png"
                        width={420}
                        height={420}
                        alt=""
                        className="lg:w-[80px]"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white pb-12">
          {product?.secondaryImage &&
            product?.text4Title &&
            product?.text4Desc && (
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-12">
                <div className="relative w-full">
                  <Image
                    style={{ boxShadow: "0px 0px 5px #000000" }}
                    src={product?.secondaryImage}
                    width={1024}
                    height={1024}
                    alt={`Obraz ${product?.text4Title}`}
                    className="w-full h-auto"
                  />
                  <div className="w-max absolute bottom-4 right-4">
                    <Link href="/">
                      <Image
                        src="/assets/quixy-logo.png"
                        width={420}
                        height={420}
                        alt=""
                        className="w-[80px]"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="bg-white pb-12">
          {product?.thirdaryImage &&
            product?.text5Title &&
            product?.text5Desc && (
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-12">
                <div className="relative w-full">
                  <Image
                    style={{ boxShadow: "0px 0px 5px #000000" }}
                    src={product?.thirdaryImage}
                    width={1024}
                    height={1024}
                    alt={`praca${product?.text5Title}`}
                    className="w-full h-auto"
                  />
                  <div className="w-max absolute bottom-4 right-4">
                    <Link href="/">
                      <Image
                        src="/assets/quixy-logo.png"
                        width={420}
                        height={420}
                        alt=""
                        className="w-[80px]"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl text-left font-bold drop-shadow-xl shadow-black text-zinc-800">
                    {product?.text5Title}
                  </h2>
                  <div
                    className="text-gray-700 font-light text-lg mt-4"
                    dangerouslySetInnerHTML={renderMarkdown(product?.text5Desc)}
                  />
                </div>
              </div>
            )}
        </div>

        <div className="mb-12">
          {posts?.length > 1 && <BlogPostList posts={posts} />}
        </div>
      </div>
    </>
  );
}
export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  // Pobierz dane produktu
  const product: any = await getProductByUrl(params?.slug);

  return {
    title: product?.googleTitle,
    description: product?.googleDescription || "",
    publisher: "quixy.pl",
    url: `https://quixy.pl/news/${product?.url}`,
    authors: [
      {
        name: "quixy",
        url: "https://quixy.pl",
      },
    ],
    icons: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      {
        url: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    openGraph: {
      type: "website",
      url: `https://quixy.pl/news/${product?.url}`,
      title: product?.googleTitle,
      description: product?.googleDescription,
      siteName: "Quixy",
      images: [{ url: product?.primaryImage, type: "image/png" }],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@Quixy",
      title: product?.googleTitle,
      description: product?.googleDescription,
      image: { url: product?.primaryImage },
    },
    meta: [{ name: "theme-color", content: "#fff" }],
  };
}
