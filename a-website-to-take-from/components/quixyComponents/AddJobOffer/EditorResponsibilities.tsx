import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
export default function EditorResponsibilities({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  // Quill toolbar options - only bullets and numbered lists
  const modules = {
    toolbar: [
      [{ list: "bullet" }, { list: "ordered" }], // Enable bullet and numbered lists only
    ],
  };

  const formats = ["list"]; // Only recognize bullet and numbered list formatting

  return (
    <div>
      <ReactQuill
        value={formData.responsibilities}
        onChange={(e) => setFormData({ ...formData, responsibilities: e })}
        modules={modules}
        formats={formats}
        placeholder={!formData?.responsibilities ? "Stwórz listę" : ""}
        className={`border rounded-md border-primaryStart/70 text-black bg-white w-full max-w-[500px] sm:max-w-[600px] md:max-w-[750px] xl:max-w-[600px] 2xl:max-w-[850px] mb-3`}
        theme="snow" // Quill's default theme
      />
    </div>
  );
}
