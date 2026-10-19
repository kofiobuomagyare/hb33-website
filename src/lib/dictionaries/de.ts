import type { DictionaryPatch } from "../dictionaries";

/**
 * German (Deutsch) — full UI translation. Long-form product copy lives in
 * `lib/products.ts` and currently falls back to English/French.
 */
const de: DictionaryPatch = {
  meta: {
    siteName: "HB33",
    homeTitle: "HB33 — Bulk-Kakao, Sojabohnen & Kokos-Substrat aus Westafrika",
    homeDescription:
      "HB33 liefert Bulk-Kakaobohnen, -schalen, -butter, -nibs, -pottasche, -kuchen, Sojabohnen und Kokos-Substrat an Hersteller und Großabnehmer weltweit. Bestellungen in Containern, am Ursprung geprüft.",
    productsTitle: "Produkte — Landwirtschaftliche Bulk-Rohstoffe",
    productsDescription:
      "Durchsuchen Sie den HB33 Bulk-Katalog: Kakaobohnen, Schalen, Butter, Nibs, Pottasche, Kuchen, Sojabohnen und Kokos-Substrat. Mindestbestellung ein Schiffscontainer.",
    aboutTitle: "Über HB33",
    aboutDescription:
      "HB33 ist ein westafrikanischer Rohstofflieferant für Hersteller, Verarbeiter und Großabnehmer mit verifizierten Bulk-Lieferungen.",
    howTitle: "So funktioniert's — Bulk-Bestellprozess",
    howDescription:
      "So kaufen Sie in Bulk bei HB33: Katalog durchsuchen, Angebot anfordern, Verfügbarkeit bestätigen und FOB oder CIF versenden. Minimum ein Container.",
    quoteTitle: "Angebot anfordern — Bulk-Bestellanfrage",
    quoteDescription:
      "Senden Sie eine Bulk-Bestellanfrage an HB33. Mindestbestellung ein Schiffscontainer. Wir bestätigen Verfügbarkeit, Preise und Versand.",
    contactTitle: "HB33 kontaktieren",
    contactDescription:
      "Kontaktieren Sie HB33 für Bulk-Anfragen per E-Mail oder WhatsApp. Wir antworten mit Spezifikationen, Preisen und Timing.",
    privacyTitle: "Datenschutzerklärung",
    privacyDescription:
      "HB33 erhebt nur minimale personenbezogene Daten — nur das, was Sie uns bei Angebotsanfragen und Kontaktnachrichten senden — um Ihre Anfrage zu beantworten. Keine Konten, keine Newsletter, keine Werbe-Tracker.",
    termsTitle: "Nutzungsbedingungen",
    termsDescription:
      "Das Absenden einer Angebotsanfrage oder Nachricht begründet keinen Vertrag, bestätigt keinen Bestand und legt keinen Preis fest. Mindestbestellung: ein Schiffscontainer. Die Bedingungen gelten nur für echte Bulk-Anfragen.",
  },
  nav: {
    home: "Start",
    products: "Produkte",
    about: "Über uns",
    howItWorks: "So funktioniert's",
    contact: "Kontakt",
    requestQuote: "Angebot anfordern",
    exploreProducts: "Produkte entdecken",
    menu: "Menü",
    close: "Schließen",
    language: "Sprache",
    languageGroups: {
      global: "Global",
      europe: "Europa",
      asia: "Asien",
      "middle-east": "Naher Osten",
      ghana: "Ghana",
      nigeria: "Nigeria",
      "east-africa": "Ostafrika",
      francophone: "Frankophones Westafrika",
    },
  },
  common: {
    learnMore: "Mehr erfahren",
    viewProduct: "Produkt ansehen",
    viewAllProducts: "Alle Produkte ansehen",
    backToProducts: "Zurück zu den Produkten",
    relatedProducts: "Ähnliche Produkte",
    send: "Senden",
    sending: "Wird gesendet…",
    submitInquiry: "Anfrage senden",
    submitting: "Wird gesendet…",
    required: "Pflichtfeld",
    optional: "Optional",
    containers: "Container",
    container: "Container",
    tonnageNote:
      "Die endgültige Tonnage hängt von Produktdichte und Containertyp ab — wird vor dem Versand bestätigt.",
    allRightsReserved: "Alle Rechte vorbehalten.",
    backToTop: "Nach oben",
    placeholderNote:
      "Angaben mit dem Hinweis „wird bestätigt“ werden vor jedem Versand mit HB33 geklärt.",
  },
  moq: {
    short: "Mindestbestellung: 1 Schiffscontainer. Nur Großbestellungen.",
    long: "Mindestbestellung: 1 Schiffscontainer. Wir bearbeiten nur Großbestellungen. Bitte kontaktieren Sie uns, um Containertyp, Ladekapazität, Verfügbarkeit und Versand zu bestätigen.",
    badge: "MOQ: 1 Container",
  },
  topbar: {
    message: "Nur Bulk-Export — mindestens ein Container pro Bestellung.",
  },
  hero: {
    eyebrow: "Westafrikanischer Kakao & Rohstoffe, geprüft am Ursprung",
    title: "Eine schlechte Lieferung kostet mehr als Geld.",
    lead: "HB33 liefert Premium-Kakao, Sojabohnen und Kokos-Substrat in Bulk-Mengen an Märkte weltweit — vor jedem Versand geprüft.",
    primary: "Produkte entdecken",
    secondary: "Angebot anfordern",
    stats: [
      { value: "1.000 MT", label: "Monatskapazität" },
      { value: "8", label: "Bulk-Produkte" },
      { value: "3", label: "Belieferte Kontinente" },
      { value: "FOB / CIF", label: "Weltweiter Versand" },
    ],
  },
  trust: {
    eyebrow: "Warum HB33",
    title: "Für Käufer, die sich keine schlechte Woche leisten können.",
    items: [
      {
        title: "Prüfung zuerst",
        text: "Unabhängige Inspektion vor jedem Versand. Feuchte am Ursprung geprüft, nie bei Ankunft.",
      },
      {
        title: "Keine Zwischenhändler",
        text: "Direkte Beziehungen zu westafrikanischen Farmen und Genossenschaften. Wir besitzen die Kette — wir überbrücken sie nicht nur.",
      },
      {
        title: "Wir schweigen nicht",
        text: "Echte Updates nach Vertragsabschluss. Dokumentation, Verladung und Versandmeilensteine, auf die Sie sich verlassen können.",
      },
    ],
  },
  homeProducts: {
    eyebrow: "Unsere Produkte",
    title: "Acht Bulk-Rohstoffe. Ein Standard.",
    lead: "Kakaoprodukte, Ölsaaten und Kokosprodukt — für Container verpackt und Partie für Partie geprüft.",
    cta: "Gesamten Katalog ansehen",
  },
  founder: {
    eyebrow: "Aus dem Büro des Gründers",
    title: "Willkommen bei",
    titleAccent: "HB33.",
    imageAlt: "Hugo Obed, Gründer von HB33",
    paragraphs: [
      "HB33 wurde auf einer einfachen Überzeugung aufgebaut: Hersteller weltweit verdienen Lieferungen, denen sie vertrauen können.",
      "Diese Überzeugung entstand aus Erfahrung. Früh in meiner Laufbahn änderte ein Logistikpartner ohne mein Wissen die Versandrouten, um Kosten zu senken. Das Ergebnis war verheerend. Regen beschädigte die Lieferung und ich trug den vollen Verlust. Es war eine harte Lektion, aber sie hat meinen Umgang mit dem Exportgeschäft verändert.",
      "Diese Erfahrung lehrte mich, dass Qualität allein nicht reicht. Verlässliche Beschaffung muss auf verlässlicher Logistik, klaren Dokumenten und transparenter Kommunikation beruhen. Deshalb wird jede Lieferung, die wir abwickeln, vor dem Verlassen des Hafens geprüft, dokumentiert und SGS-inspiziert.",
      "Heute beliefert HB33 Hersteller in Asien, Europa und dem Nahen Osten mit Bulk-Kakaobohnen, -schalen, -butter, -nibs, -pottasche und -kuchen aus vertrauenswürdigen westafrikanischen Farmen.",
      "Bei HB33 glauben wir nicht an Versenden und Hoffen. Wir glauben an Planung, Prüfung und Lieferung mit Zuversicht.",
      "Vielen Dank für Ihr Vertrauen als Beschaffungspartner. Wir freuen uns darauf, Ihrem Unternehmen zu Wachstum mit Zuversicht zu verhelfen.",
    ],
    name: "Hugo Obed",
    role: "Gründer, HB33",
  },
  processPreview: {
    eyebrow: "So funktioniert's",
    title: "Vom Hoftor bis in Ihre Fabrik.",
    steps: [
      { title: "Ansehen & anfragen", text: "Wählen Sie Produkte und nennen Sie uns Mengen und Ziel." },
      { title: "Konditionen bestätigen", text: "Wir bestätigen Verfügbarkeit, Spezifikationen, Preise und FOB/CIF-Versand." },
      { title: "Geprüfter Versand", text: "Geprüft, dokumentiert und in vollen Containern versandt." },
    ],
    cta: "Gesamten Ablauf ansehen",
  },
  logistics: {
    eyebrow: "Verpackung & Logistik",
    title: "Für Container verpackt. Für den Zoll dokumentiert.",
    items: [
      { title: "Containerbasiert", text: "20-Fuß- und 40-Fuß-Verladungen. Endkapazität je Produkt und Containertyp bestätigt." },
      { title: "Exportpapiere", text: "Pflanzengesundheitszeugnis, Ursprungszeugnis und Konnossement bei jeder Lieferung." },
      { title: "FOB / CIF", text: "Ihre Bedingungen, Ihr Hafen — mit Updates, auf die Sie sich verlassen können." },
    ],
  },
  faqPreview: {
    eyebrow: "Häufige Fragen",
    title: "Was Käufer vor ihrer ersten Lieferung fragen.",
    cta: "So bestellen Sie",
  },
  homeFaqs: [
    {
      q: "Was liefert HB33?",
      a: "Bulk-Kakaobohnen, -schalen, -butter, -nibs, -pottasche und -kuchen sowie Sojabohnen und Kokos-Substrat — alles in Containermengen für Hersteller, Verarbeiter und Großabnehmer.",
    },
    {
      q: "Wie hoch ist die Mindestbestellung?",
      a: "Ein voller Schiffscontainer pro Bestellung. Wir bearbeiten nur Bulk-Bestellungen und bestätigen die richtige Containergröße und Ladekapazität vor dem Versand mit Ihnen.",
    },
    {
      q: "Versenden Sie FOB oder CIF?",
      a: "Beides. Wir quotieren FOB oder CIF, je nachdem, was für Ihren Betrieb, Ihren Hafen und Ihre Lieferkette am besten passt.",
    },
    {
      q: "Wie erhalte ich Preise und Spezifikationen?",
      a: "Senden Sie eine Angebotsanfrage mit Produkt, Menge und Ziel. Wir antworten mit Spezifikationen, Preisen und Timing — kein Verkaufsgespräch.",
    },
  ],
  homeCta: {
    title: "Ihre nächste Lieferung sollte kein Glücksspiel sein.",
    lead: "Sagen Sie uns, was Sie brauchen. Wir bestätigen Verfügbarkeit, Spezifikationen und Versand — schriftlich.",
    primary: "Angebot anfordern",
    secondary: "Kontakt",
  },
  productsPage: {
    eyebrow: "Katalog",
    title: "Bulk-Katalog",
    lead: "Durchsuchen und filtern Sie acht containerfähige Rohstoffe. Jede Bestellung beginnt bei einem vollen Container.",
    searchLabel: "Produkte suchen",
    searchPlaceholder: "Kakao, Soja, Kokos suchen…",
    categoryLabel: "Kategorie",
    allCategories: "Alle Kategorien",
    categories: {
      cocoa: "Kakaoprodukte",
      oilseeds: "Ölsaaten",
      "growing-media": "Kokosprodukt",
    },
    sortLabel: "Sortieren",
    sortOptions: {
      featured: "Empfohlen",
      nameAsc: "Name A–Z",
      nameDesc: "Name Z–A",
    },
    results: "Produkte",
    result: "Produkt",
    showing: "Zeige",
    emptyTitle: "Keine Produkte für diese Filter.",
    emptyText: "Versuchen Sie einen anderen Suchbegriff oder eine andere Kategorie — oder senden Sie uns Ihre Anforderung direkt.",
    emptyCta: "Angebot anfordern",
    quoteAction: "Angebot anfordern",
  },
  productDetail: {
    overview: "Überblick",
    background: "Herkunft & wirtschaftliche Bedeutung",
    educationalNote:
      "Die allgemeinen Rohstoffinformationen unten dienen der Information. HB33-Partie-Details werden pro Anfrage bestätigt.",
    uses: "Verwendung & Anwendungen",
    specs: "Spezifikationen",
    specsNote:
      "Indikative Spezifikationen. Endgültige Sorte, Feuchte und Verpackung werden pro Partie bestätigt und vor dem Versand geprüft.",
    quality: "Qualität, Handhabung & Lagerung",
    packaging: "Verpackung & Bulk-Versand",
    buyers: "Typische Käufer & Branchen",
    moqTitle: "Mindestbestellmenge",
    faq: "Fragen zum Produkt",
    quoteCta: "Angebot für dieses Produkt anfordern",
    quoteButton: "Angebot anfordern",
    whatsappButton: "Per WhatsApp fragen",
    whatsappUnavailable:
      "WhatsApp-Bestellung ist noch nicht konfiguriert — bitte nutzen Sie das Angebotsformular oder E-Mail, damit wir Ihre Anfrage zuverlässig erhalten.",
    toBeConfirmed: "Pro Partie zu bestätigen",
  },
  aboutPage: {
    eyebrow: "Über HB33",
    title: "Ein Beschaffungspartner, nicht nur ein Lieferant.",
    lead: "HB33 wurde auf einer einfachen Überzeugung aufgebaut: Hersteller weltweit verdienen Kakao- und Rohstofflieferungen, denen sie vertrauen können.",
    storyTitle: "Unsere Geschichte",
    story: [
      "HB33 entstand aus eigener Erfahrung damit, was im Rohstoffhandel schiefgehen kann — ein Logistikpartner änderte einst ohne Ankündigung die Versandrouten, um Kosten zu senken, und Regen beschädigte die gesamte Lieferung. Die Kosten dieser Lektion prägen alles, wie wir heute arbeiten.",
      "Qualität allein reicht nicht. Verlässliche Beschaffung muss auf verlässlicher Logistik, klaren Dokumenten und transparenter Kommunikation beruhen. Deshalb wird jede HB33-Lieferung vor dem Verlassen des Hafens geprüft, dokumentiert und inspiziert.",
      "Heute liefert HB33 Bulk-Kakaoprodukte, Sojabohnen und Kokos-Substrat aus vertrauenswürdigen westafrikanischen Farmen und Genossenschaften an Hersteller in Asien, Europa und dem Nahen Osten.",
    ],
    valuesEyebrow: "Unsere Werte",
    valuesTitle: "Wofür wir stehen",
    values: [
      { title: "Prüfung zuerst", text: "Inspektion und Feuchteprüfung am Ursprung — vor dem Abfüllen und Verladen, nicht bei Ankunft." },
      { title: "Direkte Beschaffung", text: "Langjährige Beziehungen zu Farmen und Genossenschaften, die wir namentlich kennen." },
      { title: "Transparente Kommunikation", text: "Schriftliche Bestätigungen, echte Versandupdates und Papiere bei jedem Container." },
    ],
    factsEyebrow: "Auf einen Blick",
    factsTitle: "Geschäftsdaten",
    factsNote:
      "Hier werden nur verifizierte Fakten genannt. Zertifizierungen, Ziele und Kapazitäten werden pro Anfrage bestätigt — nie angenommen.",
    facts: [
      { label: "Sitz", value: "Westafrika" },
      { label: "Produkte", value: "8 Bulk-SKUs" },
      { label: "Monatskapazität", value: "Bis zu 1.000 MT" },
      { label: "Bedingungen", value: "FOB / CIF" },
      { label: "Mindestbestellung", value: "1 Schiffscontainer" },
    ],
    ctaTitle: "Arbeiten Sie mit HB33",
    ctaText: "Nennen Sie uns Ihre Mengen und Ihr Ziel — wir antworten mit Spezifikationen, Preisen und Timing.",
    ctaPrimary: "Angebot anfordern",
    ctaSecondary: "Kontakt",
  },
  howPage: {
    eyebrow: "So funktioniert's",
    title: "Fünf Schritte zu einem geprüften Container.",
    lead: "Das Absenden einer Anfrage bestätigt nicht automatisch eine Bestellung, den Bestand oder einen Endpreis. Jede Bestellung wird schriftlich bestätigt, bevor etwas versendet wird.",
    steps: [
      {
        title: "Katalog ansehen",
        text: "Entdecken Sie Produkte, Spezifikationen und Verpackung. Alles wird in vollen Container-Mengen verkauft.",
      },
      {
        title: "Rohstoff & Menge wählen",
        text: "Wählen Sie Ihre Produkte und die Anzahl der Container. Minimum ist ein Schiffscontainer pro Bestellung.",
      },
      {
        title: "Anfrage senden",
        text: "Senden Sie Kontakt-, Liefer- und Anforderungsdetails über das Angebotsformular, E-Mail oder WhatsApp.",
      },
      {
        title: "Wir bestätigen die Konditionen",
        text: "HB33 bestätigt Verfügbarkeit, Preise, Spezifikationen, Containerverladung, Versand und Zahlung.",
      },
      {
        title: "Erfüllung & Nachverfolgung",
        text: "Inspektion, Dokumentation und Versand — mit Updates bei jedem Meilenstein bis zur Lieferung.",
      },
    ],
    noteTitle: "Bitte beachten",
    noteText:
      "Eine Anfrage ist eine Anfrage, keine Bestellung. Verfügbarkeit, Endpreise, Spezifikationen, Containerverladung, Versand und Zahlungsbedingungen werden vor jeder Verpflichtung mit HB33 vereinbart.",
    cta: "Mit einer Angebotsanfrage beginnen",
  },
  quotePage: {
    eyebrow: "Bulk-Bestellanfrage",
    title: "Angebot anfordern",
    lead: "Sagen Sie uns, was Sie brauchen und wohin es soll. Wir antworten mit Verfügbarkeit, Spezifikationen, Preisen und Versand.",
    form: {
      fullName: "Vollständiger Name",
      company: "Firmenname",
      email: "Geschäftliche E-Mail",
      countryCode: "Ländervorwahl",
      selectCode: "Vorwahl wählen",
      phone: "Telefonnummer",
      country: "Land",
      searchCountryPlaceholder: "Land eintippen…",
      noCountryMatch: "Kein passendes Land — weiter tippen.",
      destination: "Lieferziel / Hafen",
      timeframe: "Gewünschter Lieferzeitraum",
      timeframeOptions: {
        asap: "So schnell wie möglich",
        oneMonth: "Innerhalb 1 Monats",
        oneToThree: "1–3 Monate",
        flexible: "Flexibel / in Planung",
      },
      packaging: "Wunschverpackung",
      packagingPlaceholder: "z. B. 60-kg-Jutesäcke, 25-kg-PP-Säcke, lose…",
      items: "Produkte & Mengen",
      product: "Produkt",
      selectProduct: "Produkt wählen…",
      quantityContainers: "Container",
      addProduct: "Weiteres Produkt",
      removeProduct: "Entfernen",
      notes: "Weitere Anforderungen",
      notesPlaceholder: "Zielspezifikationen, Grad, Feuchtegrenzen, Lieferbedingungen (FOB/CIF)…",
      atLeastOne: "Mindestens ein Produkt hinzufügen.",
      submit: "Anfrage senden",
      submitting: "Wird gesendet…",
    },
    errors: {
      required: "Dieses Feld ist erforderlich.",
      email: "Geben Sie eine gültige E-Mail-Adresse ein.",
      phone: "Geben Sie eine gültige Nummer mit Ländervorwahl ein.",
      minContainers: "Mindestens 1 Container pro Produkt — nur Großbestellungen.",
      selectProduct: "Wählen Sie ein Produkt oder entfernen Sie diese Zeile.",
    },
    successTitle: "Anfrage erhalten.",
    successLead: "Vielen Dank — Ihre Bulk-Anfrage wurde erfasst.",
    reference: "Ihre Referenznummer",
    nextStepsTitle: "Wie es weitergeht",
    nextSteps: [
      "HB33 bestätigt die Verfügbarkeit für Ihre Mengen.",
      "Sie erhalten Endpreise und Partie-Spezifikationen.",
      "Containerbeladung, Verpackung und FOB/CIF-Versand werden vereinbart.",
      "Zahlungsbedingungen werden vor der Abwicklung bestätigt.",
    ],
    emailStatusOn: "Eine Kopie wurde per E-Mail an unser Vertriebsteam weitergeleitet.",
    emailStatusOff:
      "Der E-Mail-Versand ist in dieser Umgebung nicht aktiviert. Für die schnellste Antwort senden Sie Ihre Anfrage bitte zusätzlich per E-Mail oder WhatsApp über die Schaltflächen unten — mit Ihrer Referenznummer.",
    sendEmail: "Per E-Mail senden",
    sendWhatsapp: "Per WhatsApp fortsetzen",
    newInquiry: "Neue Anfrage",
    failTitle: "Etwas ist schiefgelaufen.",
    failText: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut — oder kontaktieren Sie uns direkt per E-Mail.",
  },
  contactPage: {
    eyebrow: "Kontakt",
    title: "Sprechen Sie mit HB33.",
    lead: "Für Bulk-Anfragen, Angebote und Spezifikationen — schreiben Sie uns, wir antworten mit Terminen, nicht mit Werbung.",
    formTitle: "Nachricht senden",
    form: {
      name: "Vollständiger Name",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      messagePlaceholder: "Produkt, Mengen, Ziel…",
      submit: "Nachricht senden",
      sent: "Nachricht gesendet.",
    },
    errors: {
      required: "Dieses Feld ist erforderlich.",
      email: "Geben Sie eine gültige E-Mail-Adresse ein.",
      messageShort: "Bitte schreiben Sie mindestens 10 Zeichen.",
    },
    sentTitle: "Nachricht erhalten.",
    sentText: "Vielen Dank — wir melden uns in Kürze.",
    channelsTitle: "Direkte Kanäle",
    emailLabel: "E-Mail",
    whatsappLabel: "WhatsApp",
    whatsappHint: "Am schnellsten für laufende Anfragen — nennen Sie Ihre Referenznummer, falls vorhanden.",
    whatsappUnavailable:
      "WhatsApp ist noch nicht konfiguriert. Bitte erreichen Sie uns per E-Mail — wir antworten mit Spezifikationen, Preisen und Timing.",
    locationLabel: "Standort",
    responseNote: "Wir beantworten Bulk-Anfragen innerhalb von 1–2 Werktagen.",
    failText: "Ihre Nachricht konnte nicht gesendet werden. Bitte erneut versuchen oder uns direkt per E-Mail kontaktieren.",
  },
  privacyPage: {
    eyebrow: "Rechtliches",
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert",
    intro:
      "HB33 erhebt so wenige personenbezogene Daten wie möglich: nur das, was Sie uns bei einer Angebotsanfrage oder Kontaktaufnahme senden, damit wir antworten können. Es gibt keine Konten, keine Newsletter und keine Werbe-Tracker auf dieser Website.",
    sections: [
      {
        title: "Informationen, die Sie uns geben",
        text: "Angebotsanfragen: Name, Unternehmen, E-Mail, Telefon, Land, Lieferziel, Zeitraum, Verpackungswunsch, Produkte und Containermengen sowie Ihre Notizen. Kontaktnachrichten: Name, E-Mail, Betreff und Nachricht. Wir erheben nichts anderes — es gibt keine Konten und keine Kommentar- oder Newsletter-Funktionen.",
      },
      {
        title: "Wie wir sie verwenden",
        text: "Ausschließlich zur Beantwortung Ihrer Anfrage: Bestätigung von Verfügbarkeit und Preisen, Erstellung von Spezifikationen und Versand sowie Kommunikation zu Ihrer Anfrage. Wir verkaufen keine personenbezogenen Daten und versenden keine Marketing-E-Mails.",
      },
      {
        title: "Speicherung und Weitergabe",
        text: "Eingaben werden im Serverprotokoll der Website erfasst, damit keine Anfrage verloren geht. Sofern konfiguriert, wird eine Kopie per E-Mail an das HB33-Vertriebspostfach oder an einen privaten Webhook weitergeleitet — der Bestätigungsbildschirm sagt Ihnen stets ehrlich, ob der E-Mail-Versand aktiv ist. Die E-Mail- und WhatsApp-Schaltflächen agieren innerhalb Ihrer eigenen Apps: Wir erhalten nur, was Sie senden möchten.",
      },
      {
        title: "Cookies und Analyse",
        text: "Standardmäßig setzt diese Website keine Cookies und führt keine Analyse oder Nachverfolgung durch. Falls Analyse aktiviert wird, lädt sie erst, nachdem Sie im Einwilligungsbanner zugestimmt haben, und Ihre Wahl wird lokal in Ihrem Browser gespeichert.",
      },
      {
        title: "Aufbewahrung und Ihre Rechte",
        text: "Anfragedatensätze werden für berechtigte Geschäfts- und Nachweiszwecke aufbewahrt. Sie können jederzeit eine Kopie, Berichtigung oder Löschung Ihrer Daten über die Kontakt-E-Mail auf dieser Website verlangen.",
      },
      {
        title: "Platzhalter-Hinweis",
        text: "Diese Richtlinie beschreibt die echten Datenflüsse der Website, sollte aber vor kommerzieller Nutzung von der Rechtsberatung von HB33 geprüft werden, einschließlich anwendbarem Recht, Datenverarbeitungsrollen und aller Hosting- oder E-Mail-Anbieter-Spezifika.",
      },
    ],
  },
  termsPage: {
    eyebrow: "Rechtliches",
    title: "Nutzungsbedingungen",
    updated: "Zuletzt aktualisiert",
    intro:
      "Mit der Nutzung dieser Website stimmen Sie den folgenden Bedingungen zu. Wenn Sie nicht einverstanden sind, nutzen Sie die Website bitte nicht.",
    sections: [
      {
        title: "Anfragen sind keine Bestellungen",
        text: "Das Absenden einer Angebotsanfrage oder Nachricht begründet keinen Vertrag, bestätigt keinen Bestand und legt keinen Preis fest. Es gibt keinen Checkout und keine Zahlung auf dieser Website. Alle Bestellungen werden separat schriftlich mit Spezifikationen, Verladung, Versand und Zahlungsbedingungen bestätigt.",
      },
      {
        title: "Mindestbestellung",
        text: "HB33 bearbeitet nur Bulk-Bestellungen mit einem Minimum von einem vollen Schiffscontainer pro Bestellung. Anfragen unter dieser Schwelle können nicht erfüllt werden.",
      },
      {
        title: "Produktinformationen",
        text: "Die auf dieser Website gezeigten Spezifikationen sind indikativ. Endgültige Sorte, Feuchte, Verpackung und Verladung werden pro Partie bestätigt und vor dem Versand geprüft.",
      },
      {
        title: "Zulässige Nutzung",
        text: "Nutzen Sie die Anfrageformulare ehrlich und nur für echte Bulk-Anforderungen. Reichen Sie keinen Spam, keine falschen Angaben, keine rechtswidrigen Inhalte oder automatisierten Massenanfragen ein, die den Dienst missbrauchen.",
      },
      {
        title: "Inhalt und Haftung",
        text: "Website-Text und -Design gehören HB33; Produktfotografie gehört Dritten, die auf den jeweiligen Seiten genannt werden. Soweit gesetzlich zulässig, haftet HB33 nicht für Entscheidungen, die auf Basis indikativer Website-Inhalte getroffen werden — bestätigte schriftliche Bedingungen gelten für jede Bestellung.",
      },
      {
        title: "Platzhalter-Hinweis",
        text: "Dies ist Starter-Inhalt und sollte vor kommerzieller Nutzung von der Rechtsberatung von HB33 geprüft werden, einschließlich anwendbarem Recht, Haftungsobergrenzen und Streitbeilegungsklauseln.",
      },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Diese Seite hat es nicht in den Container geschafft.",
    text: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    home: "Zurück zur Startseite",
    products: "Produkte ansehen",
  },
  consent: {
    title: "Cookie- & Analyse-Einwilligung",
    text: "Wir verwenden datenschutzfreundliche Analyse, um die Website zu verbessern. Sie lädt nur, wenn Sie zustimmen. Bei Ablehnung wird nichts verfolgt.",
    accept: "Analyse akzeptieren",
    decline: "Ablehnen",
  },
  footer: {
    tagline: "Kakao, Soja & Kokos-Substrat in Bulk — geprüft am Ursprung, weltweit versandt.",
    shop: "Katalog",
    company: "Unternehmen",
    legal: "Rechtliches",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    contactTitle: "Kontakt",
    language: "Sprache",
    minOrder: "Mindestbestellung: 1 Schiffscontainer.",
    photoCredit: "Fotografie über Wikimedia Commons — Credits auf den Produktseiten.",
  },
};

export default de;
