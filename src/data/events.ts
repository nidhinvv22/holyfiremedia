export interface EventSpeaker {
  name: string;
  title?: string;
}

export interface EventData {
  slug: string;
  title: string;
  titleMalayalam?: string;
  date: string; // ISO format YYYY-MM-DD
  endDate?: string;
  time: string;
  recurrence?: string;
  image: string; // path relative to public/, used for OG tags
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    mapUrl?: string;
  };
  organizer: string;
  speakers: EventSpeaker[];
  activities: string[];
  description: string;
  descriptionMalayalam?: string;
  contact: { name: string; phone: string }[];
  email?: string;
  website?: string;
  notes?: string[];
  tags: string[];
}

export const events: EventData[] = [
  {
    slug: "london-bible-convention-july-2026",
    title: "First Saturday London Bible Convention",
    titleMalayalam: "ആദ്യശനി ലണ്ടൻ ബൈബിൾ കൺവെൻഷൻ",
    date: "2026-07-04",
    time: "09:30 AM – 04:00 PM",
    recurrence: "Every first Saturday of the month",
    image: "/images/events/london-bible-convention.png",
    location: {
      name: "Our Lady of La Salette",
      address: "1 Rainham Rd., Rainham",
      city: "Essex RM13 8SR, UK",
      country: "United Kingdom",
      mapUrl: "https://maps.google.com/?q=Our+Lady+of+La+Salette+Rainham+Essex",
    },
    organizer: "Catholic Syro-Malabar Eparchy of Great Britain – Commission for Evangelisation",
    speakers: [
      { name: "Bishop Mar Joseph Srampickal", title: "Bishop" },
      { name: "Fr. Shinoj Kalarickal", title: "Father" },
      { name: "Fr. Joseph Mukkat", title: "Father" },
      { name: "Sr. Ann Maria SH", title: "Sister" },
    ],
    activities: [
      "Holy Rosary",
      "Holy Mass",
      "Adoration",
      "Spiritual Sharing",
      "Healing & Deliverance",
      "Confession",
    ],
    description:
      "Join the First Saturday London Bible Convention organized by the Catholic Syro-Malabar Eparchy of Great Britain. A powerful day of prayer, worship, healing, and spiritual renewal featuring Bishop Mar Joseph Srampickal, Fr. Joseph Mukkat, Fr. Shinoj Kalarickal, and Sr. Ann Maria SH. Separate sessions available for children and adults in English.",
    descriptionMalayalam:
      "കർത്താവു പറഞ്ഞു: ഞാൻ തന്നെ നിന്നാട്ടുകൂടെ വരുകയും നിനക്ക് ആശ്വാസം നൽകുകയും ചെയ്യും. (പുറപ്പാട് 33:14)",
    contact: [
      { name: "Manoj", phone: "07848 808550" },
      { name: "Mathachan", phone: "07915602258" },
    ],
    email: "evangelisation@csmegb.org",
    notes: [
      "Separate sessions for children & adults in English",
      "Held every first Saturday of the month",
    ],
    tags: [
      "london",
      "bible-convention",
      "syro-malabar",
      "healing",
      "retreat",
      "uk",
      "malayalam-christian",
      "essex",
    ],
  },
];
