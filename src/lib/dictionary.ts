export type Script = "Latin" | "Ethiopic";

export type DictionaryEntry = {
  id: string;
  english: string;
  sidamaLatin: string;
  sidamaEthiopic?: string;
  amharic: string;
  partOfSpeech: string;
  category: string;
  definitionEnglish?: string;
  definitionSidama?: string;
  definitionAmharic?: string;
  pronunciation?: string;
  examples?: { english?: string; sidama?: string; amharic?: string }[];
  verified: boolean;
};

// English is the primary lookup language, followed by Sidaamu Afoo and Amharic.
// Add translations only after review by fluent Sidaamu Afoo speakers.
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
      entry.english,
      sidama,
      entry.sidamaLatin,
      entry.sidamaEthiopic ?? "",
      entry.amharic,
    ].some((value) => value.toLocaleLowerCase().includes(q));
  });
}
