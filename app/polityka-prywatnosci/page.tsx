import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const SITE_URL = "https://wesselpawel.com";

export const metadata: Metadata = {
  title: "Polityka prywatności | wesselpawel.com",
  description:
    "Informacje o przetwarzaniu danych osobowych i zasadach kontaktu na stronie wesselpawel.com.",
  alternates: {
    canonical: `${SITE_URL}/polityka-prywatnosci`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/polityka-prywatnosci`,
    title: "Polityka prywatności | wesselpawel.com",
    description:
      "Informacje o przetwarzaniu danych osobowych i zasadach kontaktu na stronie wesselpawel.com.",
    siteName: "WWW Expert",
  },
  twitter: {
    title: "Polityka prywatności | wesselpawel.com",
    description:
      "Informacje o przetwarzaniu danych osobowych i zasadach kontaktu na stronie wesselpawel.com.",
  },
};

const sections = [
  {
    title: "Administrator danych",
    paragraphs: [
      "Administratorem danych osobowych przekazywanych za pośrednictwem serwisu jest PAWEŁ WESSEL, NIP 8762494772, REGON 387851407.",
      "W sprawach związanych z prywatnością możesz skontaktować się mailowo pod adresem hello@wesselpawel.com lub telefonicznie pod numerem 721 417 154.",
    ],
  },
  {
    title: "Jakie dane zbieram",
    paragraphs: [
      "Za pośrednictwem formularza kontaktowego mogę przetwarzać dane podane dobrowolnie przez użytkownika, w szczególności imię, numer telefonu oraz treść wiadomości.",
      "Jeżeli użytkownik wyrazi zgodę na analitykę, serwis może dodatkowo przetwarzać podstawowe informacje statystyczne dotyczące korzystania ze strony, takie jak odsłony, źródło wejścia czy czas wizyty.",
    ],
  },
  {
    title: "Cel przetwarzania danych",
    paragraphs: [
      "Dane przekazane w formularzu kontaktowym są wykorzystywane wyłącznie w celu odpowiedzi na zapytanie, przedstawienia oferty, kontaktu w sprawie współpracy lub dalszych ustaleń projektowych.",
      "Dane analityczne są przetwarzane wyłącznie po wyrażeniu zgody i służą do lepszego zrozumienia, jak użytkownicy korzystają z serwisu oraz które podstrony działają najskuteczniej.",
    ],
  },
  {
    title: "Podstawa prawna",
    paragraphs: [
      "Podstawą przetwarzania danych kontaktowych jest działanie podejmowane na żądanie użytkownika przed zawarciem umowy lub uzasadniony interes administratora polegający na obsłudze zapytań ofertowych.",
      "W przypadku danych analitycznych podstawą przetwarzania jest zgoda użytkownika wyrażona za pośrednictwem popupu cookies.",
    ],
  },
  {
    title: "Jak długo przechowuję dane",
    paragraphs: [
      "Dane z formularza kontaktowego są przechowywane przez czas niezbędny do obsługi zapytania, prowadzenia rozmów ofertowych oraz ewentualnej realizacji współpracy, a następnie przez okres wymagany przepisami lub uzasadniony ochroną roszczeń.",
      "Dane analityczne są przechowywane zgodnie z ustawieniami narzędzia analitycznego i tylko w zakresie objętym zgodą użytkownika.",
    ],
  },
  {
    title: "Prawa użytkownika",
    paragraphs: [
      "Użytkownik ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu oraz cofnięcia zgody w zakresie, w jakim podstawą przetwarzania jest zgoda.",
      "Użytkownik ma również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, jeżeli uzna, że dane są przetwarzane niezgodnie z prawem.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Dokument prawny"
      title="Polityka prywatności"
      intro="Na tej stronie znajdziesz podstawowe informacje o tym, jakie dane mogą być przetwarzane w ramach serwisu, w jakim celu oraz jakie prawa przysługują użytkownikowi."
      sections={sections.map((section) => ({
        title: section.title,
        paragraphs: [...section.paragraphs],
      }))}
    />
  );
}
