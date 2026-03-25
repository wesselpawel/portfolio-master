import Content from "./Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jak zostałem front-end developerem?",
  description:
    "Jak zacząłem programować, jak zostałem front-end developer, historia, motywacja, timeline i plany na przyszłość.",
  openGraph: {
    title: "Jak zostałem front-end developerem?",
    description:
      "Jak zacząłem programować, jak zostałem front-end developer, historia, motywacja, timeline i plany na przyszłość.",
  },
  twitter: {
    title: "Jak zostałem front-end developerem?",
    description:
      "Jak zacząłem programować, jak zostałem front-end developer, historia, motywacja, timeline i plany na przyszłość.",
  },
};

export default function Page() {
  return (
    <div>
      <Content />
    </div>
  );
}
