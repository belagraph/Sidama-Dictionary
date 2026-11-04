export type Phrase = {
  id: string;
  english: string;
  sidamaLatin: string;
  sidamaEthiopic?: string;
  amharic: string;
  category: string;
  usage?: string;
  pronunciation?: string;
  audioUrl?: string;
  exampleEnglish?: string;
  exampleSidama?: string;
  exampleAmharic?: string;
  verified?: boolean;
};

export const categories = [
  { name: "Greetings", icon: "☀", description: "Say hello and start a conversation." },
  { name: "Introductions", icon: "◉", description: "Names, backgrounds and meeting people." },
  { name: "Farewells", icon: "↗", description: "Say goodbye and see you later." },
  { name: "Polite expressions", icon: "♡", description: "Please, thank you and apologies." },
  { name: "Everyday conversation", icon: "☷", description: "Useful phrases for daily life." },
  { name: "Questions & answers", icon: "?", description: "Ask, understand and respond." },
  { name: "Family & relationships", icon: "⌂", description: "Talk about family and people." },
  { name: "Food & dining", icon: "✳", description: "Meals, drinks and eating together." },
  { name: "Shopping & money", icon: "◇", description: "Prices, buying and paying." },
  { name: "Directions & places", icon: "⌖", description: "Find places and ask the way." },
  { name: "Time & dates", icon: "◷", description: "Days, times and appointments." },
  { name: "Travel & transport", icon: "➜", description: "Moving around and travelling." },
  { name: "Work & education", icon: "▤", description: "Work, learning and school." },
  { name: "Feelings & opinions", icon: "☻", description: "Share how you feel and what you think." },
  { name: "Health & emergencies", icon: "✚", description: "Ask for help and explain a problem." },
  { name: "Culture & traditions", icon: "✺", description: "Expressions used in cultural settings." },
  { name: "Common responses", icon: "✓", description: "Short answers and natural replies." },
  { name: "Proverbs & sayings", icon: "❝", description: "Traditional wisdom and expressions." },
];

// Keep this list empty until phrase translations have been supplied and reviewed.
// The admin import sheet uses these exact column names.
export const phrases: Phrase[] = [];

export function searchPhrases(query: string) {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return phrases;
  return phrases.filter((item) =>
    [item.english, item.sidamaLatin, item.sidamaEthiopic ?? "", item.amharic, item.usage ?? "", item.category]
      .some((value) => value.toLocaleLowerCase().includes(q))
  );
}
