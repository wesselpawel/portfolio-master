import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";

// Pomocniczo: mini „slugify” dla URL
function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

type BaseResponse = {
  title: string;
  shortDesc: string;
  text1Title: string;
  text1Desc: string;
  text2Title: string;
  text2Desc: string;
  text3Title: string;
  text3Desc: string;
  text4Title: string;
  text4Desc: string;
  text5Title: string;
  text5Desc: string;
  text6Title: string;
  text6Desc: string;
  text7Title: string;
  text7Desc: string;
  googleTitle: string;
  googleDescription: string;
  googleKeywords: string;
  url: string;
  urlLabel: string;
  category: string;
  tags: string;
};

type SectionPayload = {
  content: string; // semantyczny HTML
  image: string; // miejsce na ścieżkę/URL obrazu, jeśli chcesz dodać później
};

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic")?.trim();
  if (!topic) {
    return NextResponse.json(
      { error: "Brak parametru ?topic. Podaj temat posta." },
      { status: 400 }
    );
  }

  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY!,
    // użyj modelu dostępnego w Twoim środowisku; zostawiam domyślne jak w przykładzie
    model: "gpt-4",
  });

  // „rozgrzanie” połączenia (opcjonalne)
  await chat.sendMessage("Ping");

  // 1) Generujemy bazową strukturę 7-sekcyjnego posta + SEO
  const response = await chat.sendMessage(
    `Generujesz post na bloga, który ma być rozbudowany i obejmować 7 sekcji.
Napisz angażujący tekst na temat: ${topic}.
Uwzględnij poprawne odmiany pisowni polskiej.
Całość (suma treści sekcji) powinna mieć 1500–2000 znaków (ze spacjami).
Podziel treść na dokładnie 7 sekcji, każda z własnym tytułem i opisem (text1..text7).
Dodaj również tytuł główny, krótkie streszczenie oraz SEO (title/description/keywords), a także czytelny URL i label do CTA.`,
    {
      expect: {
        examples: [
          {
            response: {
              title: "Jak algorytm TikToka może zmienić strategię twórców",
              shortDesc:
                "Poznaj zaawansowane metody, które umożliwiają dotarcie do większej liczby odbiorców na TikToku.",
              text1Title: "Wprowadzenie",
              text1Desc:
                "TikTok jest obecnie jedną z najczęściej używanych platform...",
              text2Title: "Mechanika Algorytmu",
              text2Desc: "TikTok analizuje każdy ruch użytkowników...",
              text3Title: "Wpływ na Twórców",
              text3Desc: "Dzięki algorytmowi nawet początkujący twórcy mogą...",
              text4Title: "Strategie Twórców",
              text4Desc:
                "Hashtagi, dźwięki i timing publikacji mają kluczowe znaczenie...",
              text5Title: "Analiza Danych",
              text5Desc:
                "Czytanie statystyk pozwala lepiej rozumieć widownię...",
              text6Title: "Odkrywanie Nowych Trendów",
              text6Desc:
                "Algorytm dostosowuje się do trendów – warto je śledzić...",
              text7Title: "Przyszłość Algorytmów",
              text7Desc:
                "Algorytmy będą ewoluować – zrozumienie ich działania to przewaga...",
              googleTitle:
                "Algorytm TikToka - pełny przewodnik po strategiach dla twórców",
              googleDescription:
                "Sprawdź, jak działa algorytm TikToka i jak go wykorzystać.",
              googleKeywords:
                "algorytm TikTok, strategie twórców TikTok, rozwój profilu TikTok",
              url: "algorytm-tiktoka-strategie",
              urlLabel: "Dowiedz się więcej o algorytmie TikToka",
              category: "Social Media",
              tags: "TikTok,algorytm,strategie,twórców,media społecznościowe",
            },
          },
        ],
        properties: {
          response: {
            title: "string",
            shortDesc: "string",
            text1Title: "string",
            text1Desc: "string",
            text2Title: "string",
            text2Desc: "string",
            text3Title: "string",
            text3Desc: "string",
            text4Title: "string",
            text4Desc: "string",
            text5Title: "string",
            text5Desc: "string",
            text6Title: "string",
            text6Desc: "string",
            text7Title: "string",
            text7Desc: "string",
            googleTitle: "string",
            googleDescription: "string",
            googleKeywords: "string",
            url: "string",
            urlLabel: "string",
            category: "string",
            tags: "string",
          },
        },
        // KLUCZOWA ZMIANA: required wewnątrz `response`
        schema: {
          additionalProperties: true,
          type: "object",
          properties: {
            response: {
              type: "object",
              properties: {
                title: { type: "string" },
                shortDesc: { type: "string" },
                text1Title: { type: "string" },
                text1Desc: { type: "string" },
                text2Title: { type: "string" },
                text2Desc: { type: "string" },
                text3Title: { type: "string" },
                text3Desc: { type: "string" },
                text4Title: { type: "string" },
                text4Desc: { type: "string" },
                text5Title: { type: "string" },
                text5Desc: { type: "string" },
                text6Title: { type: "string" },
                text6Desc: { type: "string" },
                text7Title: { type: "string" },
                text7Desc: { type: "string" },
                googleTitle: { type: "string" },
                googleDescription: { type: "string" },
                googleKeywords: { type: "string" },
                url: { type: "string" },
                urlLabel: { type: "string" },
                category: { type: "string" },
                tags: { type: "string" },
              },
              required: [
                "title",
                "shortDesc",
                "text1Title",
                "text1Desc",
                "text2Title",
                "text2Desc",
                "text3Title",
                "text3Desc",
                "text4Title",
                "text4Desc",
                "text5Title",
                "text5Desc",
                "text6Title",
                "text6Desc",
                "text7Title",
                "text7Desc",
                "googleTitle",
                "googleDescription",
                "googleKeywords",
                "url",
                "urlLabel",
                "category",
                "tags",
              ],
            },
          },
          required: ["response"],
        },
      },
    }
  );

  // Bezpieczny odczyt bazowych pól
  const baseRaw = (response.content as any)?.response ?? {};
  const base: BaseResponse = {
    title: baseRaw.title ?? `Artykuł: ${topic}`,
    shortDesc: baseRaw.shortDesc ?? "",
    text1Title: baseRaw.text1Title ?? "Wprowadzenie",
    text1Desc: baseRaw.text1Desc ?? "",
    text2Title: baseRaw.text2Title ?? "",
    text2Desc: baseRaw.text2Desc ?? "",
    text3Title: baseRaw.text3Title ?? "",
    text3Desc: baseRaw.text3Desc ?? "",
    text4Title: baseRaw.text4Title ?? "",
    text4Desc: baseRaw.text4Desc ?? "",
    text5Title: baseRaw.text5Title ?? "",
    text5Desc: baseRaw.text5Desc ?? "",
    text6Title: baseRaw.text6Title ?? "",
    text6Desc: baseRaw.text6Desc ?? "",
    text7Title: baseRaw.text7Title ?? "",
    text7Desc: baseRaw.text7Desc ?? "",
    googleTitle: baseRaw.googleTitle ?? baseRaw.title ?? `SEO: ${topic}`,
    googleDescription: baseRaw.googleDescription ?? baseRaw.shortDesc ?? "",
    googleKeywords: baseRaw.googleKeywords ?? topic,
    url:
      baseRaw.url && typeof baseRaw.url === "string"
        ? baseRaw.url
        : slugify(baseRaw.title ?? topic),
    urlLabel: baseRaw.urlLabel ?? "Czytaj więcej",
    category: baseRaw.category ?? "Blog",
    tags: baseRaw.tags ?? "",
  };

  // 2) Generator HTML sekcji (semantyczny)
  async function buildSectionHTML(title: string, description: string) {
    const sec = await chat.sendMessage(
      `Generujesz sekcję na bloga w SEMANTYCZNYM HTML.
Zachowaj profesjonalny, ale przystępny ton.
Używaj <section>, <h2>/<h3>, <p>, oraz <ul>/<li> tam, gdzie to naturalne.
Unikaj inline-style, żadnych skryptów. Tylko czysty HTML.

tytuł:(${title})
opis:(${description})`,
      {
        expect: {
          examples: [
            {
              response: {
                section:
                  "<section><h2>Tytuł</h2><p>Wprowadzenie...</p><ul><li>Punkt</li></ul></section>",
              },
            },
          ],
          properties: { response: { section: "string" } },
          schema: {
            additionalProperties: true,
            type: "object",
            properties: {
              response: {
                type: "object",
                properties: { section: { type: "string" } },
                required: ["section"],
              },
            },
            required: ["response"],
          },
        },
      }
    );

    const html =
      (sec.content as any)?.response?.section ??
      `<section><h2>${title}</h2><p>${description}</p></section>`;
    return html as string;
  }

  // 3) Budujemy HTML dla sekcji 2..7
  const sections: Record<string, SectionPayload> = {};
  const pairs: Array<[number, string, string]> = [
    [2, base.text2Title, base.text2Desc],
    [3, base.text3Title, base.text3Desc],
    [4, base.text4Title, base.text4Desc],
    [5, base.text5Title, base.text5Desc],
    [6, base.text6Title, base.text6Desc],
    [7, base.text7Title, base.text7Desc],
  ];

  for (const [idx, t, d] of pairs) {
    if ((t && t.trim()) || (d && d.trim())) {
      const html = await buildSectionHTML(t, d);
      sections[`section${idx}`] = { content: html, image: "" };
    }
  }

  // 4) Zwracamy payload gotowy do renderu po stronie klienckiej
  const payload = { ...base, ...sections };

  return NextResponse.json(payload, { status: 200 });
}
