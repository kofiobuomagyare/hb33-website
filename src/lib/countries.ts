import type { Locale } from "./i18n";
import { baseLanguage } from "./i18n";

export interface Country {
  /** ISO 3166-1 alpha-2 code. */
  c: string;
  /** International dialing code without "+". */
  d: string;
  en: string;
  fr: string;
}

/**
 * World country list with dialing codes (full ISO coverage).
 * `en`/`fr` names power the localized search; every other locale falls
 * back to English names, which remain the stored/submitted value.
 */
export const countries: Country[] = [
  { c: "DZ", d: "213", en: "Algeria", fr: "Algérie" },
  { c: "AO", d: "244", en: "Angola", fr: "Angola" },
  { c: "BJ", d: "229", en: "Benin", fr: "Bénin" },
  { c: "BW", d: "267", en: "Botswana", fr: "Botswana" },
  { c: "BF", d: "226", en: "Burkina Faso", fr: "Burkina Faso" },
  { c: "BI", d: "257", en: "Burundi", fr: "Burundi" },
  { c: "CM", d: "237", en: "Cameroon", fr: "Cameroun" },
  { c: "CV", d: "238", en: "Cabo Verde", fr: "Cap-Vert" },
  { c: "CF", d: "236", en: "Central African Republic", fr: "République centrafricaine" },
  { c: "TD", d: "235", en: "Chad", fr: "Tchad" },
  { c: "KM", d: "269", en: "Comoros", fr: "Comores" },
  { c: "CG", d: "242", en: "Congo", fr: "Congo" },
  { c: "CD", d: "243", en: "DR Congo", fr: "RD Congo" },
  { c: "CI", d: "225", en: "Côte d’Ivoire", fr: "Côte d’Ivoire" },
  { c: "DJ", d: "253", en: "Djibouti", fr: "Djibouti" },
  { c: "EG", d: "20", en: "Egypt", fr: "Égypte" },
  { c: "GQ", d: "240", en: "Equatorial Guinea", fr: "Guinée équatoriale" },
  { c: "ER", d: "291", en: "Eritrea", fr: "Érythrée" },
  { c: "ET", d: "251", en: "Ethiopia", fr: "Éthiopie" },
  { c: "GA", d: "241", en: "Gabon", fr: "Gabon" },
  { c: "GM", d: "220", en: "Gambia", fr: "Gambie" },
  { c: "GH", d: "233", en: "Ghana", fr: "Ghana" },
  { c: "GN", d: "224", en: "Guinea", fr: "Guinée" },
  { c: "GW", d: "245", en: "Guinea-Bissau", fr: "Guinée-Bissau" },
  { c: "KE", d: "254", en: "Kenya", fr: "Kenya" },
  { c: "LS", d: "266", en: "Lesotho", fr: "Lesotho" },
  { c: "LR", d: "231", en: "Liberia", fr: "Libéria" },
  { c: "LY", d: "218", en: "Libya", fr: "Libye" },
  { c: "MG", d: "261", en: "Madagascar", fr: "Madagascar" },
  { c: "MW", d: "265", en: "Malawi", fr: "Malawi" },
  { c: "ML", d: "223", en: "Mali", fr: "Mali" },
  { c: "MR", d: "222", en: "Mauritania", fr: "Mauritanie" },
  { c: "MU", d: "230", en: "Mauritius", fr: "Maurice" },
  { c: "MA", d: "212", en: "Morocco", fr: "Maroc" },
  { c: "MZ", d: "258", en: "Mozambique", fr: "Mozambique" },
  { c: "NA", d: "264", en: "Namibia", fr: "Namibie" },
  { c: "NE", d: "227", en: "Niger", fr: "Niger" },
  { c: "NG", d: "234", en: "Nigeria", fr: "Nigéria" },
  { c: "RW", d: "250", en: "Rwanda", fr: "Rwanda" },
  { c: "ST", d: "239", en: "São Tomé and Príncipe", fr: "Sao Tomé-et-Principe" },
  { c: "SN", d: "221", en: "Senegal", fr: "Sénégal" },
  { c: "SC", d: "248", en: "Seychelles", fr: "Seychelles" },
  { c: "SL", d: "232", en: "Sierra Leone", fr: "Sierra Leone" },
  { c: "SO", d: "252", en: "Somalia", fr: "Somalie" },
  { c: "ZA", d: "27", en: "South Africa", fr: "Afrique du Sud" },
  { c: "SS", d: "211", en: "South Sudan", fr: "Soudan du Sud" },
  { c: "SD", d: "249", en: "Sudan", fr: "Soudan" },
  { c: "SZ", d: "268", en: "Eswatini", fr: "Eswatini" },
  { c: "TZ", d: "255", en: "Tanzania", fr: "Tanzanie" },
  { c: "TG", d: "228", en: "Togo", fr: "Togo" },
  { c: "TN", d: "216", en: "Tunisia", fr: "Tunisie" },
  { c: "UG", d: "256", en: "Uganda", fr: "Ouganda" },
  { c: "ZM", d: "260", en: "Zambia", fr: "Zambie" },
  { c: "ZW", d: "263", en: "Zimbabwe", fr: "Zimbabwe" },
  { c: "SA", d: "966", en: "Saudi Arabia", fr: "Arabie saoudite" },
  { c: "AE", d: "971", en: "United Arab Emirates", fr: "Émirats arabes unis" },
  { c: "QA", d: "974", en: "Qatar", fr: "Qatar" },
  { c: "KW", d: "965", en: "Kuwait", fr: "Koweït" },
  { c: "BH", d: "973", en: "Bahrain", fr: "Bahreïn" },
  { c: "OM", d: "968", en: "Oman", fr: "Oman" },
  { c: "YE", d: "967", en: "Yemen", fr: "Yémen" },
  { c: "IQ", d: "964", en: "Iraq", fr: "Irak" },
  { c: "IR", d: "98", en: "Iran", fr: "Iran" },
  { c: "JO", d: "962", en: "Jordan", fr: "Jordanie" },
  { c: "LB", d: "961", en: "Lebanon", fr: "Liban" },
  { c: "SY", d: "963", en: "Syria", fr: "Syrie" },
  { c: "IL", d: "972", en: "Israel", fr: "Israël" },
  { c: "PS", d: "970", en: "Palestine", fr: "Palestine" },
  { c: "TR", d: "90", en: "Turkey", fr: "Turquie" },
  { c: "CN", d: "86", en: "China", fr: "Chine" },
  { c: "IN", d: "91", en: "India", fr: "Inde" },
  { c: "ID", d: "62", en: "Indonesia", fr: "Indonésie" },
  { c: "MY", d: "60", en: "Malaysia", fr: "Malaisie" },
  { c: "SG", d: "65", en: "Singapore", fr: "Singapour" },
  { c: "TH", d: "66", en: "Thailand", fr: "Thaïlande" },
  { c: "VN", d: "84", en: "Vietnam", fr: "Viêt Nam" },
  { c: "PH", d: "63", en: "Philippines", fr: "Philippines" },
  { c: "BD", d: "880", en: "Bangladesh", fr: "Bangladesh" },
  { c: "PK", d: "92", en: "Pakistan", fr: "Pakistan" },
  { c: "LK", d: "94", en: "Sri Lanka", fr: "Sri Lanka" },
  { c: "MM", d: "95", en: "Myanmar", fr: "Birmanie" },
  { c: "KH", d: "855", en: "Cambodia", fr: "Cambodge" },
  { c: "LA", d: "856", en: "Laos", fr: "Laos" },
  { c: "JP", d: "81", en: "Japan", fr: "Japon" },
  { c: "KR", d: "82", en: "South Korea", fr: "Corée du Sud" },
  { c: "TW", d: "886", en: "Taiwan", fr: "Taïwan" },
  { c: "HK", d: "852", en: "Hong Kong", fr: "Hong Kong" },
  { c: "MN", d: "976", en: "Mongolia", fr: "Mongolie" },
  { c: "KZ", d: "7", en: "Kazakhstan", fr: "Kazakhstan" },
  { c: "UZ", d: "998", en: "Uzbekistan", fr: "Ouzbékistan" },
  { c: "AF", d: "93", en: "Afghanistan", fr: "Afghanistan" },
  { c: "NP", d: "977", en: "Nepal", fr: "Népal" },
  { c: "BT", d: "975", en: "Bhutan", fr: "Bhoutan" },
  { c: "MV", d: "960", en: "Maldives", fr: "Maldives" },
  { c: "GE", d: "995", en: "Georgia", fr: "Géorgie" },
  { c: "AM", d: "374", en: "Armenia", fr: "Arménie" },
  { c: "AZ", d: "994", en: "Azerbaijan", fr: "Azerbaïdjan" },
  { c: "DE", d: "49", en: "Germany", fr: "Allemagne" },
  { c: "FR", d: "33", en: "France", fr: "France" },
  { c: "GB", d: "44", en: "United Kingdom", fr: "Royaume-Uni" },
  { c: "NL", d: "31", en: "Netherlands", fr: "Pays-Bas" },
  { c: "BE", d: "32", en: "Belgium", fr: "Belgique" },
  { c: "ES", d: "34", en: "Spain", fr: "Espagne" },
  { c: "PT", d: "351", en: "Portugal", fr: "Portugal" },
  { c: "IT", d: "39", en: "Italy", fr: "Italie" },
  { c: "CH", d: "41", en: "Switzerland", fr: "Suisse" },
  { c: "AT", d: "43", en: "Austria", fr: "Autriche" },
  { c: "SE", d: "46", en: "Sweden", fr: "Suède" },
  { c: "NO", d: "47", en: "Norway", fr: "Norvège" },
  { c: "DK", d: "45", en: "Denmark", fr: "Danemark" },
  { c: "FI", d: "358", en: "Finland", fr: "Finlande" },
  { c: "IE", d: "353", en: "Ireland", fr: "Irlande" },
  { c: "PL", d: "48", en: "Poland", fr: "Pologne" },
  { c: "CZ", d: "420", en: "Czechia", fr: "Tchéquie" },
  { c: "SK", d: "421", en: "Slovakia", fr: "Slovaquie" },
  { c: "HU", d: "36", en: "Hungary", fr: "Hongrie" },
  { c: "RO", d: "40", en: "Romania", fr: "Roumanie" },
  { c: "BG", d: "359", en: "Bulgaria", fr: "Bulgarie" },
  { c: "GR", d: "30", en: "Greece", fr: "Grèce" },
  { c: "HR", d: "385", en: "Croatia", fr: "Croatie" },
  { c: "RS", d: "381", en: "Serbia", fr: "Serbie" },
  { c: "UA", d: "380", en: "Ukraine", fr: "Ukraine" },
  { c: "BY", d: "375", en: "Belarus", fr: "Biélorussie" },
  { c: "MD", d: "373", en: "Moldova", fr: "Moldavie" },
  { c: "RU", d: "7", en: "Russia", fr: "Russie" },
  { c: "IS", d: "354", en: "Iceland", fr: "Islande" },
  { c: "LU", d: "352", en: "Luxembourg", fr: "Luxembourg" },
  { c: "MT", d: "356", en: "Malta", fr: "Malte" },
  { c: "CY", d: "357", en: "Cyprus", fr: "Chypre" },
  { c: "EE", d: "372", en: "Estonia", fr: "Estonie" },
  { c: "LV", d: "371", en: "Latvia", fr: "Lettonie" },
  { c: "LT", d: "370", en: "Lithuania", fr: "Lituanie" },
  { c: "SI", d: "386", en: "Slovenia", fr: "Slovénie" },
  { c: "BA", d: "387", en: "Bosnia and Herzegovina", fr: "Bosnie-Herzégovine" },
  { c: "MK", d: "389", en: "North Macedonia", fr: "Macédoine du Nord" },
  { c: "AL", d: "355", en: "Albania", fr: "Albanie" },
  { c: "ME", d: "382", en: "Montenegro", fr: "Monténégro" },
  { c: "AD", d: "376", en: "Andorra", fr: "Andorre" },
  { c: "MC", d: "377", en: "Monaco", fr: "Monaco" },
  { c: "LI", d: "423", en: "Liechtenstein", fr: "Liechtenstein" },
  { c: "SM", d: "378", en: "San Marino", fr: "Saint-Marin" },
  { c: "US", d: "1", en: "United States", fr: "États-Unis" },
  { c: "CA", d: "1", en: "Canada", fr: "Canada" },
  { c: "MX", d: "52", en: "Mexico", fr: "Mexique" },
  { c: "BR", d: "55", en: "Brazil", fr: "Brésil" },
  { c: "AR", d: "54", en: "Argentina", fr: "Argentine" },
  { c: "CL", d: "56", en: "Chile", fr: "Chili" },
  { c: "CO", d: "57", en: "Colombia", fr: "Colombie" },
  { c: "PE", d: "51", en: "Peru", fr: "Pérou" },
  { c: "VE", d: "58", en: "Venezuela", fr: "Venezuela" },
  { c: "EC", d: "593", en: "Ecuador", fr: "Équateur" },
  { c: "BO", d: "591", en: "Bolivia", fr: "Bolivie" },
  { c: "PY", d: "595", en: "Paraguay", fr: "Paraguay" },
  { c: "UY", d: "598", en: "Uruguay", fr: "Uruguay" },
  { c: "GY", d: "592", en: "Guyana", fr: "Guyana" },
  { c: "SR", d: "597", en: "Suriname", fr: "Suriname" },
  { c: "PA", d: "507", en: "Panama", fr: "Panama" },
  { c: "CR", d: "506", en: "Costa Rica", fr: "Costa Rica" },
  { c: "GT", d: "502", en: "Guatemala", fr: "Guatemala" },
  { c: "HN", d: "504", en: "Honduras", fr: "Honduras" },
  { c: "NI", d: "505", en: "Nicaragua", fr: "Nicaragua" },
  { c: "SV", d: "503", en: "El Salvador", fr: "Salvador" },
  { c: "BZ", d: "501", en: "Belize", fr: "Belize" },
  { c: "CU", d: "53", en: "Cuba", fr: "Cuba" },
  { c: "JM", d: "1876", en: "Jamaica", fr: "Jamaïque" },
  { c: "HT", d: "509", en: "Haiti", fr: "Haïti" },
  { c: "DO", d: "1809", en: "Dominican Republic", fr: "République dominicaine" },
  { c: "TT", d: "1868", en: "Trinidad and Tobago", fr: "Trinité-et-Tobago" },
  { c: "BB", d: "1246", en: "Barbados", fr: "Barbade" },
  { c: "BS", d: "1242", en: "Bahamas", fr: "Bahamas" },
  { c: "AU", d: "61", en: "Australia", fr: "Australie" },
  { c: "NZ", d: "64", en: "New Zealand", fr: "Nouvelle-Zélande" },
  { c: "FJ", d: "679", en: "Fiji", fr: "Fidji" },
  { c: "PG", d: "675", en: "Papua New Guinea", fr: "Papouasie-Nouvelle-Guinée" },
  { c: "WS", d: "685", en: "Samoa", fr: "Samoa" },
  { c: "TO", d: "676", en: "Tonga", fr: "Tonga" },
  { c: "VU", d: "678", en: "Vanuatu", fr: "Vanuatu" },
];

/** Flag emoji from ISO code (regional indicators; falls back to letter pairs on Windows). */
export function flagEmoji(iso: string): string {
  return [...iso.toUpperCase()]
    .map((ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)))
    .join("");
}

/** Display name in the visitor's language (French where available, else English). */
export function countryName(country: Country, locale: Locale): string {
  return baseLanguage(locale) === "fr" ? country.fr : country.en;
}

/** Accent-insensitive lowercase for search matching. */
export function searchKey(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/gu, "");
}

/** Countries matching a query against localized + English names, ISO code, or dial code. */
export function searchCountries(query: string, locale: Locale): Country[] {
  const q = searchKey(query.trim());
  if (!q) return [...countries].sort((a, b) => countryName(a, locale).localeCompare(countryName(b, locale)));
  const digits = q.replace(/\D/g, "");
  const matches = countries.filter((country) => {
    const names = [searchKey(countryName(country, locale)), searchKey(country.en)];
    if (names.some((n) => n.includes(q))) return true;
    if (searchKey(country.c).includes(q)) return true;
    if (digits && country.d.startsWith(digits)) return true;
    return false;
  });
  return matches.sort((a, b) => {
    const an = searchKey(countryName(a, locale));
    const bn = searchKey(countryName(b, locale));
    const aStarts = an.startsWith(q) ? 0 : 1;
    const bStarts = bn.startsWith(q) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return an.localeCompare(bn);
  });
}

/** Find a country by its stored (English) name. */
export function findCountryByName(name: string): Country | undefined {
  const key = searchKey(name.trim());
  return countries.find((c) => searchKey(c.en) === key || searchKey(c.fr) === key);
}
