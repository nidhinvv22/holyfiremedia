export interface LanguageConfig {
  id: string;
  code: "ml" | "kn" | "ta" | "hi" | "en";
  name: string;
  nativeName: string;
  transliterationName: string;
  fontClass: string;
  adjective: string;
  badgeColor: string;
}

export const LANGUAGES: Record<string, LanguageConfig> = {
  malayalam: {
    id: "malayalam",
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    transliterationName: "Manglish",
    fontClass: "font-malayalam",
    adjective: "Malayalam",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  kannada: {
    id: "kannada",
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    transliterationName: "Kanglish",
    fontClass: "font-sans",
    adjective: "Kannada",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  tamil: {
    id: "tamil",
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    transliterationName: "Tanglish",
    fontClass: "font-sans",
    adjective: "Tamil",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  english: {
    id: "english",
    code: "en",
    name: "English",
    nativeName: "English",
    transliterationName: "English",
    fontClass: "font-sans",
    adjective: "English",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
};

export function getLanguage(langKey?: string): LanguageConfig {
  if (langKey && LANGUAGES[langKey.toLowerCase()]) {
    return LANGUAGES[langKey.toLowerCase()];
  }
  return LANGUAGES.malayalam;
}
