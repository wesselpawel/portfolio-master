import dynamic from "next/dynamic";
import React from "react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditorRequirements({
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
        value={formData.requirements}
        onChange={(e) => setFormData({ ...formData, requirements: e })}
        modules={modules}
        formats={formats}
        placeholder={!formData?.requirements ? "Wpisz tekst" : ""}
        className={`border rounded-md border-primaryStart/70 text-black bg-white w-full max-w-[500px] sm:max-w-[600px] md:max-w-[750px] xl:max-w-[600px] 2xl:max-w-[850px] mb-3`}
        theme="snow" // Quill's default theme
      />
    </div>
  );
}
