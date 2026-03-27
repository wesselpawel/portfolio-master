import Content from "./Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "O mnie | Tworzenie stron internetowych Grudziądz",
  description:
    "Poznaj moją drogę od technikum informatycznego do tworzenia stron, sklepów i platform internetowych. Front-end, SEO i strony internetowe w Grudziądzu.",
  openGraph: {
    title: "O mnie | Tworzenie stron internetowych Grudziądz",
    description:
      "Poznaj moją drogę od technikum informatycznego do tworzenia stron, sklepów i platform internetowych. Front-end, SEO i strony internetowe w Grudziądzu.",
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
