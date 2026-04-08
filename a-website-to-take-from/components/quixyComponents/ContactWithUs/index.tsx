"use client";

// import { pushLead } from "@/common/firebase";

export default function ContactWithUs() {
  return (
    <div>
      <button
        // onClick={pushLead(data)}
        type="submit"
        className="bg-blue-600 text-white p-3  hover:bg-blue-500 transition"
      >
        Wyślij wiadomość
      </button>
    </div>
  );
}
