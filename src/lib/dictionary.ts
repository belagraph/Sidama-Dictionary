export type Script = "Latin" | "Ethiopic";

export type DictionaryEntry = {
  id: string;
  sidamaLatin: string;
  sidamaEthiopic?: string;
  amharic: string;
  english: string;
  partOfSpeech: string;
  category: string;
  definitionSidama?: string;
  definitionAmharic?: string;
  definitionEnglish?: string;
  pronunciation?: string;
  examples?: { sidama?: string; amharic?: string; english?: string }[];
  verified: boolean;
};

// Add only entries reviewed by fluent Sidaamu Afoo speakers.
// The starter intentionally contains no invented Sidama words or translations.
export const entries: DictionaryEntry[] = [];

export const categories = [
  "All words",
  "Family & relationships",
  "Culture & traditions",
  "Food & agriculture",
  "Nature & environment",
  "People & society",
  "Education",
  "Everyday expressions",
  "History & heritage",
];

export function searchEntries(query: string, script: Script) {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return entries;
  return entries.filter((entry) => {
    const sidama = script === "Latin" ? entry.sidamaLatin : (entry.sidamaEthiopic ?? "");
    return [
      sidama,
      entry.sidamaLatin,
      entry.sidamaEthiopic ?? "",
      entry.amharic,
      entry.english,
    ].some((value) => value.toLocaleLowerCase().includes(q));
  });
}