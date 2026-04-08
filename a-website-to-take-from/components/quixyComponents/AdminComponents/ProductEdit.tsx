"use client";
import Image from "next/image";
import Input from "@/components/quixyComponents/AdminComponents/Input";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import ContentButton from "@/components/quixyComponents/AdminComponents/ContentButton";
import HtmlInput from "@/components/quixyComponents/AdminComponents/HtmlInput";
import { v4 as uuid } from "uuid";
import {
  createProduct,
  deleteDraft,
  deleteProduct,
  updateDraft,
  updateProduct,
} from "@/common/firebase/quixy";
import { storage } from "@/common/firebase/firebase";
import ImagePicker from "@/components/quixyComponents/AdminComponents/ImagePicker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import ExtraSettings from "@/components/quixyComponents/AdminComponents/ExtraSettings";
import { toast } from "react-toastify";
import { toastUpdate } from "../Toast/ToastUpdate";
import { polishToEnglish } from "../../../utils/polishToEnglish";
async function requestPostGeneration(topic: string) {
  const answer = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/generateBlogPost?topic=${topic}`
  );
  return answer;
}
export default function ProductEdit({
  source,
  place,
}: {
  source: any;
  place: "products" | "drafts" | "new";
}) {
  const router = useRouter();

  const initialInput = {
    type: "",
    title: "",
    label: "",
  };
  const [topic, setTopic] = useState("");
  function generateBlogPost(topic: string) {
    const id = toast.loading(<span>Generuję posta</span>, {
      position: "bottom-right",
      theme: "dark",
    });

    if (!topic) {
      toastUpdate("Podaj temat", id, "error");
      return;
    }

    (async () => {
      try {
        const data = await requestPostGeneration(topic).then((data) => {
          toastUpdate("Sukces!", id, "success");
          return data.json();
        });

        setProduct({
          ...product,
          title: data?.title || "",
          shortDesc: data?.shortDesc || "",
          text1Title: data?.text1Title || "",
          text1Desc: data?.text1Desc || "",
          text2Title: data?.text2Title || "",
          text2Desc: data?.text2Desc || "",
          text3Title: data?.text3Title || "",
          text3Desc: data?.text3Desc || "",
          text4Title: data?.text4Title || "",
          text4Desc: data?.text4Desc || "",
          text5Title: data?.text5Title || "",
          text5Desc: data?.text5Desc || "",
          text6Title: data?.text6Title || "",
          text6Desc: data?.text6Desc || "",
          text7Title: data?.text7Title || "",
          text7Desc: data?.text7Desc || "",
          googleTitle: data?.googleTitle || "",
          googleDescription: data?.googleDescription || "",
          googleKeywords: data?.googleKeywords || "",
          url: data?.url || "",
          tags: data?.tags || "",
        });
      } catch (err: any) {
        toastUpdate("error", id, "error");
      }
    })();
  }
  const [SEOError, setSEOError] = useState(false);
  const [normalError, setNormalError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [extraSettingsOpen, setExtraSettingsOpen] = useState(false);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [product, setProduct] = useState<any>(source);
  const [sourceOfImagePicker, setSourceOfImagePicker] = useState("");
  const [currentInput, setCurrentInput] = useState(initialInput);
  const [loading, setLoading] = useState(false);
  function closeImagePicker() {
    setImagePickerOpen(false);
    setSourceOfImagePicker("");
  }

  function handleChange(e: any) {
    if (e.target.name !== "url") {
      setProduct({ ...product, [e.target.name]: e.target.value });
    } else if (e.target.name === "url") {
      setProduct({
        ...product,
        [e.target.name]: polishToEnglish(e.target.value),
      });
    }
  }
  function closeInput() {
    setCurrentInput(initialInput);
  }

  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  async function upload(files: any) {
    setUploadCount(files.length);
    setUploading(true);
    const localImagesArray: any = [];
    const uploadFile = async (file: any) => {
      const randId = uuid();
      const imageRef = ref(storage, randId);

      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const data = {
          src: url,
        };
        localImagesArray.push(data);
        setSelectedImage(data.src);
      } catch (error) {
        return;
      }
    };

    // Iterate through each file and upload
    const uploadPromises = files.map(uploadFile);

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      setProduct({
        ...product,
        images: [...product.images, ...localImagesArray],
      });

      setLoading(false);
      setUploading(false);
    } catch (error) {
      setLoading(false);
      setUploading(false);
      return;
    }
  }
  const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <div
      className={`w-full duration-500 ${
        isFullscreen ? "fixed left-0 top-0 overflow-y-scroll h-screen" : "p-24"
      }`}
    >
      <div
        className={`fixed right-8 bottom-12 flex items-center group z-[1500] bg-black  p-4 flex-col`}
      >
        <div className="my-4">
          <span>Wpisz tytuł posta</span> <br />
          <input
            className="!text-black  bg-slate-400 mt-1 p-2 outline-none placeholder:text-gray-500"
            type="text"
            value={topic}
            onChange={(e) => setTopic(polishToEnglish(e.target.value))}
          />
        </div>
        <button
          onClick={() => {
            generateBlogPost(topic);
          }}
          className="p-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
        >
          Generuj posta
        </button>
      </div>
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className={`fixed right-8 bottom-8 flex items-center group z-[1500]`}
      >
        <div className="group-hover:opacity-100 duration-300 opacity-0 bg-green-500 h-11 px-3  flex items-center text-white">
          {isFullscreen ? "Zamknij" : "Pełny ekran"}
        </div>
        <div className="text-2xl aspect-square w-11 h-11 group-hover:rounded-l-none  bg-green-500 group-hover:bg-green-400 text-white items-center justify-center flex">
          {!isFullscreen && <AiOutlineFullscreen />}
          {isFullscreen && <AiOutlineFullscreenExit />}
        </div>
      </button>
      {isUploading && (
        <div className="z-[500] flex items-center justify-center text-center fixed left-0 top-0 bg-black bg-opacity-75 w-full h-screen font-bold text-xl text-white">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      {imagePickerOpen && (
        <ImagePicker
          product={product}
          setProduct={setProduct}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          handler={upload}
          imagePickerOpen={imagePickerOpen}
          closeImagePicker={closeImagePicker}
          images={product.images}
          sourceOfImagePicker={sourceOfImagePicker}
        />
      )}
      <Input
        value={product[currentInput.title]}
        title={currentInput.title}
        handleChange={handleChange}
        type={currentInput.type}
        label={currentInput.label}
        closeInput={closeInput}
      />
      <HtmlInput
        label={currentInput.label}
        type={currentInput.type}
        closeInput={closeInput}
        setProduct={setProduct}
        product={product}
        currentInput={currentInput}
      />
      <div className={`relative w-full bg-white min-h-screen`}>
        <div
          className={`z-[50] sticky w-full flex items-center justify-between bg-slate-800 left-0 top-0 p-1.5 ${
            isFullscreen ? "px-20" : ""
          } `}
        >
          <p className="text-white font-bold w-[50%]">
            {place === "new" && (
              <p className="text-white font-bold w-max">
                Dodajesz nowy wpis na stronę
              </p>
            )}
            {place !== "new" && (
              <>
                Pracujesz nad wpisem{" "}
                <span className="text-green-400 italic">
                  {!product.title && product.id}
                  {product.title && product.title}
                </span>
              </>
            )}
          </p>

          <ExtraSettings
            product={product}
            extraSettingsOpen={extraSettingsOpen}
            setExtraSettingsOpen={setExtraSettingsOpen}
            handleChange={handleChange}
            dbUpdate={updateProduct}
            error={SEOError}
          />
          <div>
            <div className="flex flex-row items-center space-x-2">
              {place !== "new" && (
                <>
                  <button
                    onClick={() => {
                      if (place === "products") {
                        deleteProduct(product.id).then(() =>
                          router.push("/admin/products")
                        );
                      } else if (place === "drafts") {
                        deleteDraft(product.id).then(() =>
                          router.push("/admin/products/drafts")
                        );
                      }
                    }}
                    className="bg-red-500 hover:bg-red-400 text-white p-1.5 "
                  >
                    Usuń
                  </button>

                  <button
                    onClick={() => {
                      if (place === "products") {
                        updateProduct(product.id, product).then(() =>
                          setTimeout(() => {
                            router.push("/admin/products");
                          }, 2000)
                        );
                      } else if (place === "drafts") {
                        updateDraft(product.id, product).then(() =>
                          setTimeout(() => {
                            router.push("/admin/products/drafts");
                          }, 2000)
                        );
                      }
                    }}
                    className={`bg-gray-500 hover:bg-gray-400
                   text-white p-1.5 `}
                  >
                    {!loading && "Zapisz zmiany"}
                  </button>
                </>
              )}
              {(place === "new" || place === "drafts") && (
                <>
                  {loading && (
                    <div className="bg-green-500 hover:bg-green-400 text-white p-3">
                      Wczytywanie
                    </div>
                  )}
                  {!loading && (
                    <button
                      onClick={() => {
                        if (
                          product.title &&
                          product.shortDesc &&
                          product.primaryImage &&
                          product.googleTitle &&
                          product.googleDescription &&
                          product.url
                        ) {
                          createProduct(product).then(() =>
                            router.push("/admin/products")
                          );
                        } else {
                          toast.error(<div>Uzupełnij dane!</div>, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                          });
                          if (
                            !product.title ||
                            !product.shortDesc ||
                            !product.primaryImage
                          ) {
                            setNormalError(true);
                          }
                          if (
                            !product.googleTitle ||
                            !product.googleDescription ||
                            !product.url
                          ) {
                            setSEOError(true);
                          }
                        }
                      }}
                      className="w-max bg-green-500 hover:bg-green-400 text-white p-3"
                    >
                      Dodaj wpis
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={`${isFullscreen ? "px-32" : ""} p-12`}>
          <div className="grid grid-cols-2 gap-4 mx-auto mt-12">
            <div className="flex flex-col">
              {" "}
              {normalError && !product.title && (
                <div className="my-3 text-red-500 font-bold">
                  Uzupełnij tytuł!
                </div>
              )}
              <ContentButton
                label="Tytuł wpisu"
                value={product.title}
                type="text"
                title="title"
                setInput={setCurrentInput}
                optional={false}
              />
              <div className="mt-3"></div>
              {normalError && !product.shortDesc && (
                <div className="my-3 text-red-500 font-bold">
                  Uzupełnij opis!
                </div>
              )}
              <ContentButton
                label="Krótki opis"
                value={product.shortDesc}
                type="html"
                title="shortDesc"
                setInput={setCurrentInput}
                optional={false}
              />
              <ContentButton
                label="Tytuł tekstu 1"
                value={product.text1Title}
                type="text"
                title="text1Title"
                setInput={setCurrentInput}
                optional={true}
              />
              <ContentButton
                label="Opis tekstu 1"
                value={product.text1Desc}
                type="html"
                title="text1Desc"
                setInput={setCurrentInput}
                optional={true}
              />
              <ContentButton
                label="Tytuł tekstu 2"
                value={product.text2Title}
                type="text"
                title="text2Title"
                setInput={setCurrentInput}
                optional={true}
              />
              <ContentButton
                label="Opis tekstu 2"
                value={product.text2Desc}
                type="html"
                title="text2Desc"
                setInput={setCurrentInput}
                optional={true}
              />
            </div>
            {/* image input */}
            <div className="flex flex-col items-center mt-4">
              {normalError && !product.primaryImage && (
                <div className="my-3 text-red-500 font-bold">
                  Dodaj główny obrazek!
                </div>
              )}
              <div className="w-full">
                <button
                  className={`${
                    !product.primaryImage &&
                    "add_image_btn flex flex-col items-center justify-center text-zinc-800"
                  }`}
                  onClick={() => {
                    setImagePickerOpen(true);
                    setSourceOfImagePicker("primaryImage");
                  }}
                >
                  {!product.primaryImage && (
                    <div className="flex items-center justify-center flex-col">
                      <FaImage className="text-7xl mb-4" /> Dodaj obraz
                    </div>
                  )}
                  {product.primaryImage !== "" && (
                    <div className="min-w-full">
                      <Image
                        src={product.primaryImage}
                        width={1024}
                        height={1024}
                        alt=""
                        className="min-w-full object-cover"
                        style={{ boxShadow: "0px 0px 5px #000000" }}
                      />
                    </div>
                  )}
                </button>
              </div>{" "}
              <div className="w-full flex flex-col">
                <ContentButton
                  label="Tytuł tekstu 3"
                  value={product.text3Title}
                  type="text"
                  title="text3Title"
                  setInput={setCurrentInput}
                  optional={true}
                />
                <ContentButton
                  label="Opis tekstu 3"
                  value={product.text3Desc}
                  type="html"
                  title="text3Desc"
                  setInput={setCurrentInput}
                  optional={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-12 grid grid-cols-2 w-full mt-24">
          <div className="w-full mt-4">
            <button
              onClick={() => {
                setImagePickerOpen(true);
                setSourceOfImagePicker("secondaryImage");
              }}
              className={`${
                !product.secondaryImage &&
                "add_image_btn flex flex-col items-center justify-center text-zinc-800"
              }`}
            >
              {!product.secondaryImage && (
                <>
                  <FaImage className="text-7xl mb-4" />
                  Dodaj obraz
                  <span className="text-sm font-normal">(opcjonalnie)</span>
                </>
              )}
              {product.secondaryImage && (
                <div className="min-w-full">
                  <Image
                    style={{ boxShadow: "0px 0px 5px #000000" }}
                    src={product.secondaryImage}
                    width={1024}
                    height={1024}
                    alt=""
                    className="min-w-full object-cover"
                  />
                </div>
              )}
            </button>
          </div>
          <div className="flex flex-col pl-4">
            <ContentButton
              label="Tytuł tekstu 4"
              value={product.text4Title}
              type="text"
              title="text4Title"
              setInput={setCurrentInput}
              optional={true}
            />
            <ContentButton
              label="Opis tekstu 4"
              value={product.text4Desc}
              type="html"
              title="text4Desc"
              setInput={setCurrentInput}
              optional={true}
            />
          </div>
        </div>
        <div className="p-12 grid grid-cols-2 w-full mt-24">
          {/* Konfiguracja text5 */}

          <div className="flex flex-col pl-4">
            <ContentButton
              label="Tytuł tekstu 5"
              value={product.text5Title}
              type="text"
              title="text5Title"
              setInput={setCurrentInput}
              optional={true}
            />
            <ContentButton
              label="Opis tekstu 5"
              value={product.text5Desc}
              type="html"
              title="text5Desc"
              setInput={setCurrentInput}
              optional={true}
            />
          </div>
        </div>
        <div className="p-12 grid grid-cols-2 w-full mt-24">
          <div className="flex flex-col pl-4">
            <ContentButton
              label="Tytuł tekstu 6"
              value={product.text6Title}
              type="text"
              title="text6Title"
              setInput={setCurrentInput}
              optional={true}
            />
            <ContentButton
              label="Opis tekstu 6"
              value={product.text6Desc}
              type="html"
              title="text6Desc"
              setInput={setCurrentInput}
              optional={true}
            />
          </div>
        </div>
        <div className="p-12 grid grid-cols-2 w-full mt-24">
          <div className="flex flex-col pl-4">
            <ContentButton
              label="Tytuł tekstu 7"
              value={product.text7Title}
              type="text"
              title="text7Title"
              setInput={setCurrentInput}
              optional={true}
            />
            <ContentButton
              label="Opis tekstu 7"
              value={product.text7Desc}
              type="html"
              title="text7Desc"
              setInput={setCurrentInput}
              optional={true}
            />
            <div className="text-xl mt-24">tagi:</div>
            {product?.tags}
          </div>
        </div>
        <div className="w-full">
          <button
            className={`${
              !product.tertiaryImage &&
              "add_image_btn flex flex-col items-center justify-center text-zinc-800"
            }`}
            onClick={() => {
              setImagePickerOpen(true);
              setSourceOfImagePicker("tertiaryImage");
            }}
          >
            {!product.tertiaryImage && (
              <div className="flex items-center justify-center flex-col">
                <FaImage className="text-7xl mb-4" /> Dodaj obraz
              </div>
            )}
            {product.tertiaryImage !== "" && (
              <div className="min-w-full">
                <Image
                  src={product?.tertiaryImage}
                  width={1024}
                  height={1024}
                  alt=""
                  className="min-w-full object-cover"
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                />
              </div>
            )}
          </button>
        </div>{" "}
        <div className="w-full">
          <button
            className={`${
              !product.quaternaryImage &&
              "add_image_btn flex flex-col items-center justify-center text-zinc-800"
            }`}
            onClick={() => {
              setImagePickerOpen(true);
              setSourceOfImagePicker("quaternaryImage");
            }}
          >
            {!product.quaternaryImage && (
              <div className="flex items-center justify-center flex-col">
                <FaImage className="text-7xl mb-4" /> Dodaj obraz
              </div>
            )}
            {product.quaternaryImage !== "" && (
              <div className="min-w-full">
                <Image
                  src={product?.quaternaryImage}
                  width={1024}
                  height={1024}
                  alt=""
                  className="min-w-full object-cover"
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                />
              </div>
            )}
          </button>
        </div>{" "}
      </div>
    </div>
  );
}
