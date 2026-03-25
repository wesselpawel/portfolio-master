export function generateRandomDescription() {
  const themes = [
    "Manicure Hybrydowy Zdjęcie",
    "Paznokcie Hybrydowe Zdjęcie",

    "Manicure Hybrydowy",
    "Paznokcie Hybrydowe",

    "Paznokcie Żelowe",
    "Manicure Żelowy",

    "Paznokcie Klasyczne",
    "Manicure Klasyczny",

    "Paznokcie Zdobione",
    "Manicure Zdobiony",

    "Salon Manicure Grudziądz Zdjęcie",
    "Zdjęcie Paznokci Grudziądz",
  ];
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
}
