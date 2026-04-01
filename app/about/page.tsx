import Content from "./Content";
import { Metadata } from "next";

const SITE_URL = "https://wesselpawel.com";

export const metadata: Metadata = {
  title: "O mnie | Tworzenie stron internetowych Grudziądz",
  description:
    "Poznaj moją drogę od technikum informatycznego do tworzenia stron, sklepów i platform internetowych. Front-end, SEO i strony internetowe w Grudziądzu.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: "O mnie | Tworzenie stron internetowych Grudziądz",
    description:
      "Poznaj moją drogę od technikum informatycznego do tworzenia stron, sklepów i platform internetowych. Front-end, SEO i strony internetowe w Grudziądzu.",
    siteName: "Paweł Wessel - WWW Expert",
  },
  twitter: {
    title: "O mnie | Tworzenie stron internetowych Grudziądz",
    description:
      "Poznaj moją drogę od technikum informatycznego do tworzenia stron, sklepów i platform internetowych. Front-end, SEO i strony internetowe w Grudziądzu.",
  },
};

export default function Page() {
  return (
    <div>
      <Content />
    </div>
  );
}
