export interface LyricsData {
      /** Lyrics in the native script (e.g. Malayalam, Kannada, Tamil) */
      native: string;
      /** Phonetic Romanized transliteration (e.g. Manglish, Kanglish, Tanglish) */
      transliterated: string;
}

export interface Song {
      slug: string;
      title: string;
      artist: string;
      artistSlug?: string;
      language?: "malayalam" | "kannada" | "tamil" | "english";
      alternateTitles?: string[];
      description: string;
      freeFile?: string;
      paidFile?: string;
      price: number;
      originalPrice?: number;
      originalArtist?: string;
      duration: string;
      hasKaraoke: boolean;
      hasFreeVersion?: boolean;
      hasPremiumVersion?: boolean;
      hasLyrics: boolean;
      thumbnail?: string;
      premiumType?: "no-chorus" | "with-chorus";
      videoId?: string;
      lyrics?: LyricsData;
}

export const songs: Song[] = [
      {
            slug: "aradhyane-parishudhane",
            title: "Aradhyane Parishudhane",
            artist: "Fr. Joseph Mukkatt",
            artistSlug: "fr-joseph-mukkatt",
            language: "malayalam",
            alternateTitles: ["Ennullam Thirayunnori Sneham", "Ennullam Thirayunnori"],
            description: "A beautiful Malayalam Christian devotional worship song by Fr. Joseph Mukkatt.",
            freeFile: "",
            paidFile: "",
            price: 500,
            originalPrice: 1000,
            originalArtist: "Traditional",
            duration: "4:32",
            hasKaraoke: true,
            hasFreeVersion: true,
            hasPremiumVersion: true,
            hasLyrics: true,
            thumbnail: "/images/karaoke/thumbnails/aradhyane-parishudhane.webp",
            premiumType: "no-chorus",
            videoId: "NJAAUEmt_so",
            lyrics: {
                  transliterated: `ennulam thirayunori sneham ni mathrame
enn ninavilum kanavilum ay nirayunnoren deyvame
enne nin swanthamakidu
enne nin nadamakidu

aradhyane parishudhane paramonnatha deivame
anayunnu njan thirumumbilay alivode enne nokkaname

irulmoodum vazhiyil nin sneham
thunayayi varane enn nadha 
karamonn thalarum nerath
karuthalin karamay varane ni
idanenjil murivode anayunu ni
enne nin marod cherthiduvan aa nenjinte chhodett urangate njn
athumathramanente anandhame

aradhyane parishudhane paramonnatha deivame
anayunnu njan thirumumbilay alivode enne nokkaname

ninamozhukum vazhiyil njn pora
nin padha ennum pinthudaram
ariyathe akalum nerathum
arikilay enne cherthidane
alivinte alayazhiakunnu ni
enn hridayathin spandhanam akunu ni
sarvathin udayon ni mathrame
sarvadhi nadhanum ni mathrame

ennulam thirayunori sneham ni mathrame
enn ninavilum kanavilum ay nirayunnoren deyvame
enne nin swanthamakidu
enne nin nadamakidu

aradhyane parishudhane paramonnatha deivame
anayunnu njan thirumumbilay alivode enne nokkaname`,
                  native: `എന്നുള്ളം തിരിയുന്നൊരീ സ്നേഹം നീ മാത്രമേ 
എന് നിനവിലും കനവിലുമായ് നിറയുന്നൊരെന് ദൈവമേ 
എന്നെ നിന് സ്വന്തമാക്കിടൂ എന്നെ നിന് നാദമാക്കിടൂ (2) 

ആരാധ്യനെ പരിശുദ്ധനേ പരമോന്നതാ ദൈവമേ 
അണയുന്നു ഞാന് തിരുമുന്പിലായ് അലിവോടെ എന്നെ നോക്കണമേ


ഇരുള്മൂടും വഴിയില് നിന് സ്നേഹം  
തുണയായി വരണേ എന് നാഥാ 
കരമൊന്നു തളരും നേരത്തും 
കരുതലിന് കരമായ് വരണേ നീ (2)
ഇടനെഞ്ചില് മുറിവോടെ അണയുന്നു നീ
എന്നെ നിന് മാറോട് ചേര്ത്തീടുവാന് 
ആ നെഞ്ചിന്റെ ചൂടേറ്റുറങ്ങട്ടെ ഞാന്
അതുമാത്രമാണെന്റെ ആനന്ദമേ

ആരാധ്യനെ പരിശുദ്ധനേ പരമോന്നതാ ദൈവമേ 
അണയുന്നു ഞാന് തിരുമുന്പിലായ് അലിവോടെ എന്നെ നോക്കണമേ(2)

നിണമൊഴുകും വഴിയില് ഞാന് പോരാം
നിന് പാദമെന്നും പിന്തുടരാം 
അറിയാതെ അകലും നേരത്തും 
അരികിലായി എന്നെ ചേര്ത്തിടണേ (2)
അലിവിന്റെ അലയാഴിയാകുന്നു നീ 
എന് ഹൃദയത്തിന് സ്പന്ദനമാകുന്നു നീ 
സര്വ്വത്തിന് ഉടയോന് നീ മാത്രമേ 
സര്വ്വാധിനാഥനും നീ മാത്രമേ

എന്നുള്ളം തിരിയുന്നൊരീ സ്നേഹം നീ മാത്രമേ 
എന് നിനവിലും കനവിലുമായ് നിറയുന്നൊരെന് ദൈവമേ 
എന്നെ നിന് സ്വന്തമാക്കിടൂ എന്നെ നിന് നാദമാക്കിടൂ (2) 

ആരാധ്യനെ പരിശുദ്ധനേ പരമോന്നതാ ദൈവമേ 
അണയുന്നു ഞാന് തിരുമുന്പിലായ് അലിവോടെ എന്നെ നോക്കണമേ.`
            }
      },
      {
            slug: "aradhana-aradhana",
            title: "Aradhana Aradhana",
            artist: "Fr. Joseph Mukkatt",
            artistSlug: "fr-joseph-mukkatt",
            language: "malayalam",
            alternateTitles: [],
            description: "A profound Malayalam Christian devotional song of worship by Fr. Joseph Mukkatt.",
            freeFile: "/audio/karaoke-aradhana-aradhana.mp3",
            paidFile: "",
            price: 0,
            originalPrice: 0,
            originalArtist: "Fr. Joseph Mukkatt",
            duration: "4:00",
            hasKaraoke: true,
            hasFreeVersion: true,
            hasPremiumVersion: false,
            hasLyrics: true,
            thumbnail: "/images/karaoke/thumbnails/aradhana-aradhana.webp",
            premiumType: "with-chorus",
            videoId: "7aVrtNj0jZs",
            lyrics: {
                  transliterated: `Nadhamay Roopamay
Snehamaay Sathyamayi
Jeevnay Deepamay
Veediyay Vazhikaatiyay
en naadhan innidha

Arikil anayum Adhula sanhemae
Padidam Aradhana
Karuna vatta uravayagum
Unnadha Aradhaana

Aradhaana Araadhaana
Sathya Snehame Aradhana
Aradhaana Araadhaana
Nithya Roopmae Aradhana

Njan Thakarum Ende chaarayay Vannedane
Mullu neerum prarthankalk uthram thannedane (2)
Mukham onna thirumaaril chaayichadaany
Vannu njan manasinde nombarangal nin kurishil
cherthu njan

Arikil anayum Adhula sanhemae
Padidam Aradhana
Karuna vatta uravayagum
Unnadha Aradhaana

Aradhaana Araadhaana
Sathya Snehame Aradhana
Aradhaana Araadhaana
Nithya Roopmae Aradhana`,
                  native: `നാദമായ് രൂപമായ്
സ്നേഹമായ് സത്യമായ്
ജീവനായ് ദീപമായ്
വീഥിയായ് വഴികാട്ടിയായ്
എൻ നാഥൻ ഇന്നിതാ

അരികിൽ അണയും അതുല സ്നേഹമേ
പാടിടാം ആരാധന
കരുണ വറ്റാ ഉറവയാകും
ഉന്നതാ ആരാധന

ആരാധന ആരാധന
സത്യ സ്നേഹമേ ആരാധന
ആരാധന ആരാധന
നിത്യ രൂപമേ ആരാധന

ഞാൻ തകരും എന്റെ ചാരെയായ് വന്നെടണേ
മുള്ളു നീറും പ്രാർത്ഥനകൾക്ക് ഉത്തരം തന്നേടണേ (2)
മുഖം ഒന്നാ തിരുമാറിൽ ചായ്ച്ചീടാനായ് 
വന്നു ഞാൻ മനസ്സിന്റെ നൊമ്പരങ്ങൾ നിൻ കുരിശിൽ
ചേർത്തു ഞാൻ

അരികിൽ അണയും അതുല സ്നേഹമേ
പാടിടാം ആരാധന
കരുണ വറ്റാ ഉറവയാകും
ഉന്നതാ ആരാധന

ആരാധന ആരാധന
സത്യ സ്നേഹമേ ആരാധന
ആരാധന ആരാധന
നിത്യ രൂപമേ ആരാധന`
            }
      },
      {
            slug: "o-nanna-yesuve",
            title: "O Nanna Yesuve",
            artist: "Fr. Joseph Mukkatt",
            artistSlug: "fr-joseph-mukkatt",
            language: "kannada",
            alternateTitles: ["Oh Nanna Yesuve"],
            description: "A heartfelt Kannada Christian devotional prayer and worship song by Fr. Joseph Mukkatt.",
            freeFile: "",
            paidFile: "",
            price: 250,
            originalPrice: 500,
            originalArtist: "Fr. Joseph Mukkatt",
            duration: "4:15",
            hasKaraoke: true,
            hasFreeVersion: false,
            hasPremiumVersion: true,
            hasLyrics: true,
            thumbnail: "/images/karaoke/thumbnails/o_nanna_yesuve.webp",
            premiumType: "no-chorus",
            videoId: "",
            lyrics: {
                  transliterated: `O nanna yesuve ninnodhige jeevisalu
nannathamvu harshisidhe Annandhahi naliyuthidhe(2)
Mithi illadha ninna aa divya snehava
paramapavithrane nannalli thumbisuve(2)

Baa baa nannesuve jeevantha rottiye
Hridhayadhi araadhisuve(2)
Araadhane Araadhane Yesuve Araadhane(2)

Divyakaruneya surishe prabhuve
Ni baruva samayadhi swargeeya anubhava needuve devane(2)
Nannusirali neenu usiraagi bereyalu
nannondhu bereyuvaa devalayavaaguve 

Baa baa nannesuve jeevantha rottiye
Hridhayadhi araadhisuve(2)
Araadhane Araadhane Yesuve Araadhane(2)

Rottiyu dehavaagi rasavu rakthavaagi 
marpadisuva devaa nannannu maarpadisu O Devane(2)
Ee jeevake neene asareyu prabhuve
ninnodhige nithyakku jeevisuve devane

Baa baa nannesuve jeevantha rottiye
Hridhayadhi araadhisuve(2)
Araadhane Araadhane Yesuve Araadhane(2)`,
                  native: `ಓ ನನ್ನ ಯೇಸುವೇ ನಿನ್ನೊಂದಿಗೆ ಜೀವಿಸಲು
ನನ್ನ ಆತ್ಮವು ಹರ್ಷಿಸಿದೆ
ಆನಂದದಿ ನಲಿಯುತಿದೆ (2)

ಮಿತಿಯಿಲ್ಲದ ನಿನ್ನ ಆ ದಿವ್ಯ ಸ್ನೇಹವ
ಪರಮಪವಿತ್ರನೇ ನನ್ನಲ್ಲಿ ತುಂಬಿಸುವೆ (2)

ಬಾ ಬಾ ನನ್ನೇಸುವೇ, ಜೀವಂತ ರೊಟ್ಟಿಯೇ
ಹೃದಯದಿ ಆರಾಧಿಸುವೆ (2)

ಆರಾಧನೆ ಆರಾಧನೆ
ಯೇಸುವೇ ಆರಾಧನೆ (2)

ದಿವ್ಯಕರುಣೆಯ ಸುರಿಶೇ ಪ್ರಭುವೇ
ನೀ ಬರುವ ಸಮಯದಿ
ಸ್ವರ್ಗೀಯ ಅನುಭವ ನೀಡುವೆ ದೇವನೇ (2)

ನನ್ನ ಉಸಿರಲಿ ನೀನು ಉಸಿರಾಗಿ ಬೆರೆಯಲು
ನನ್ನೊಂದು ಬೆರೆಯುವ ದೇವಾಲಯವಾಗುವೆ

ಬಾ ಬಾ ನನ್ನೇಸುವೇ, ಜೀವಂತ ರೊಟ್ಟಿಯೇ
ಹೃದಯದಿ ಆರಾಧಿಸುವೆ (2)

ಆರಾಧನೆ ಆರಾಧನೆ
ಯೇಸುವೇ ಆರಾಧನೆ (2)

ರೊಟ್ಟಿಯು ದೇಹವಾಗಿ
ರಸವು ರಕ್ತವಾಗಿ
ಮಾರ್ಪಡಿಸುವ ದೇವಾ
ನನ್ನನ್ನು ಮಾರ್ಪಡಿಸು ಓ ದೇವನೇ (2)

ಈ ಜೀವಕೆ ನೀನೇ ಆಸರೆಯು ಪ್ರಭುವೇ
ನಿನ್ನೊಂದಿಗೆ ನಿತ್ಯಕ್ಕೂ ಜೀವಿಸುವೆ ದೇವನೇ

ಬಾ ಬಾ ನನ್ನೇಸುವೇ, ಜೀವಂತ ರೊಟ್ಟಿಯೇ
ಹೃದಯದಿ ಆರಾಧಿಸುವೆ (2)

ಆರಾಧನೆ ಆರಾಧನೆ
ಯೇಸುವೇ ಆರಾಧನೆ (2)`
            }
      },
      {
            slug: "kurbanayay-theerna-snehame",
            title: "Kurbanayay Theerna Snehame",
            artist: "Fr. Joseph Mukkatt",
            artistSlug: "fr-joseph-mukkatt",
            language: "malayalam",
            alternateTitles: [],
            description: "A touching Holy Communion Malayalam Christian song by Fr. Joseph Mukkatt.",
            freeFile: "",
            paidFile: "",
            price: 0,
            originalArtist: "Fr. Joseph Mukkatt",
            duration: "4:00",
            hasKaraoke: false,
            hasFreeVersion: false,
            hasPremiumVersion: false,
            hasLyrics: true,
            videoId: "L5jN1aveRRA",
            lyrics: {
                  transliterated: `Kurbanayay Theerna Snehame
Kurbanayil Vazhum Albudhamae
Ende Jeevande Vilayay Theernavane
Ente Pranil Alivay Chernavane
Eeshoye 

Va va Eeshoye
Ende hridayathil
Divyakarunya kanalay Ni varane(2)

Muriyumbozhum Madhuryamerum
Aradhyamam Thiruvosthiye
Ayyayirangale samthriptharaakiya
Albudhamam Thiruvosthi

Paapiyam Ennil Ni Innu Cherumbol
Kripayay Nirayaname

Va va Eeshoye
Ende hridayathil
Divyakarunya kanalay Ni varane(2)

Njan Muriyumbol
nin murivugalal
soukhyam pagarunna snehame
Thalli parayumbolum 
Thali kalayadhenne
Marodu cherkumen Daivame
Nerumen nenjile Vedhanyellam
ariyunna Yeshuve

Va va Eeshoye
Ende hridayathil
Divyakarunya kanalay Ni varane(2)

Kurbanayay Theerna Karunyame
Kurbanayil Vazhum Albudhamae
Ende Jeevande Vilayay Theernavane
Ente Pranil Alivay Chernavane
Eeshoye 

Va va Eeshoye
Ende hridayathil
Divyakarunya kanalay Ni varane(2)

Va va Eeshoye
Ende hridayathil
Divyakarunya kanalay Ni varane(2)`,
                  native: `കുർബാനയായ് തീർന്ന സ്നേഹമേ
കുർബാനയിൽ വാഴും അത്ഭുതമേ
എന്റെ ജീവന്റെ വിലയായ് തീർന്നവനേ
എന്റെ പ്രാണനിൽ അലിവായ് ചേർന്നവനേ 
ഈശോയേ 

വാ വാ ഈശോയേ
എന്റെ ഹൃദയത്തിൽ 
ദിവ്യകാരുണ്യ കനലായ് നീ വരണേ (2)

മുറിയുമ്പോഴും മാധുര്യമേറും
ആരാധ്യമാം തിരുവോസ്തിയേ
അയ്യായിരങ്ങളെ സംതൃപ്തരാക്കിയ 
അത്ഭുതമാം തിരുവോസ്തി 

പാപിയാം എന്നിൽ നീ ഇന്നു ചേരുമ്പോൾ
കൃപയായ് നിറയണമേ 

വാ വാ ഈശോയേ
എന്റെ ഹൃദയത്തിൽ 
ദിവ്യകാരുണ്യ കനലായ് നീ വരണേ (2)

ഞാൻ മുറിയുമ്പോൾ 
നിൻ മുറിവുകളാൽ
സൗഖ്യം പകരുന്ന സ്നേഹമേ
തള്ളി പറയുമ്പോഴും
തള്ളിക്കളയാതെന്നെ
മാറോടു ചേർക്കുമെൻ ദൈവമേ 
നീറുമെൻ നെഞ്ചിലെ വേദനയെല്ലാം 
അറിയുന്ന യേശുവേ 

വാ വാ ഈശോയേ
എന്റെ ഹൃദയത്തിൽ 
ദിവ്യകാരുണ്യ കനലായ് നീ വരണേ (2)

കുർബാനയായ് തീർന്ന കാരുണ്യമേ 
കുർബാനയിൽ വാഴും അത്ഭുതമേ
എന്റെ ജീവന്റെ വിലയായ് തീർന്നവനേ
എന്റെ പ്രാണനിൽ അലിവായ് ചേർന്നവനേ 
ഈശോയേ 

വാ വാ ഈശോയേ
എന്റെ ഹൃദയത്തിൽ 
ദിവ്യകാരുണ്യ കനലായ് നീ വരണേ (2)

വാ വാ ഈശോയേ
എന്റെ ഹൃദയത്തിൽ 
ദിവ്യകാരുണ്യ കനലായ് നീ വരണേ (2)`
            }
      }
];
