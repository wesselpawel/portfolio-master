import { copyToClipboard } from "@/lib/copyToClipboard";
import { useState } from "react";
import { toast } from "react-toastify";

// UserSocialLinksAdder Component
export default function UserSocialLinksAdder({
  handleReduxUserState,
  source,
  setChangesWereMade,
}: {
  handleReduxUserState: any;
  source: any;
  setChangesWereMade: any;
}) {
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    facebook: source?.socials?.facebook || "",
    tiktok: source?.socials?.tiktok || "",
    instagram: source?.socials?.instagram || "",
    quixy: source?.pseudo
      ? `https://quixy.pl/${
          source.seek !== "ask" && source.seek ? "talent" : "company"
        }/${source?.pseudo}`
      : "",
    twitter: source?.socials?.twitter || "",
    youtube: source?.socials?.youtube || "",
    linkedin: source?.socials?.linkedin || "",
    github: source?.socials?.github || "",
  });

  const handleInputChange = (key: string, value: string) => {
    // Update local state for social links
    setSocialLinks((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    // Dispatch updated social links to Redux
    handleReduxUserState([...source?.socials, { [key]: value }], "socials");

    // Mark changes as made
    setChangesWereMade(true);
  };

  const socialSourcesArray = [
    {
      label: "Link do Facebooka",
      value: socialLinks.facebook,
      placeholder: "https://facebook.com/your-profile",
      key: "facebook",
    },
    {
      label: "Link do TikToka",
      value: socialLinks.tiktok,
      placeholder: "https://tiktok.com/@your-username",
      key: "tiktok",
    },
    {
      label: "Link do Instagrama",
      value: socialLinks.instagram,
      placeholder: "https://instagram.com/your-profile",
      key: "instagram",
    },
    {
      label: "Link do Quixy",
      value: socialLinks.quixy,
      placeholder: "Skonfiguruj profil",
      key: "quixy",
    },
    {
      label: "Link do Twittera",
      value: socialLinks.twitter,
      placeholder: "https://twitter.com/@your-username",
      key: "twitter",
    },
    {
      label: "Link do YouTube'a",
      value: socialLinks.youtube,
      placeholder: "https://www.youtube.com/channel/your-channel-id",
      key: "youtube",
    },
    {
      label: "Link do LinkdIn'a",
      value: socialLinks.linkedin,
      placeholder: "https://www.linkedin.com/in/your-username/",
      key: "linkedin",
    },
    {
      label: "Link do GitHub'a",
      value: socialLinks.github,
      placeholder: "https://github.com/your-username",
      key: "github",
    },
  ];

  return (
    <div className="mt-6">
      Prowadzisz Social Media?
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => setSocialsOpen(!socialsOpen)}
          className="underline text-cta font-gotham text-left hover:no-underline"
        >
          {socialsOpen
            ? "Zwiń listę konfiguracji social media"
            : "Rozwiń listę konfiguracji social media"}
        </button>
        {socialsOpen &&
          socialSourcesArray.map((social) => (
            <div key={social.key} className="flex flex-col">
              <label className="text-lg text-black">{social.label}</label>
              <input
                onClick={() => {
                  if (social.key === "quixy") {
                    copyToClipboard(social?.value);
                    toast.success(
                      `Pomyślnie skopiowano link ${social?.value} do schowka.`
                    );
                  }
                }}
                type="text"
                disabled={social.key === "quixy" ? true : false}
                value={social.value}
                onChange={(e) => handleInputChange(social.key, e.target.value)}
                className={`border border-primary ${
                  social.key === "quixy"
                    ? "bg-gradient-to-r from-primary to-cta text-white cursor-pointer"
                    : "bg-white text-black"
                }  p-2 font-light`}
                placeholder={social.placeholder}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
