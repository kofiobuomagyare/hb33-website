import type { DictionaryPatch } from "../dictionaries";

/**
 * Swahili (Kiswahili) — full UI translation. Long-form product copy lives
 * in `lib/products.ts` and currently falls back to English/French.
 */
const sw: DictionaryPatch = {
  meta: {
    siteName: "HB33",
    homeTitle: "HB33 — Kakao, soya na cocopeat kwa jumla kutoka Afrika Magharibi",
    homeDescription:
      "HB33 inasambaza maharage ya kakao, maganda, siagi, nibs, potashi, keki, soya na cocopeat kwa jumla kwa watengenezaji na wanunuzi wa jumla duniani. Oda kwa makontena, zimethibitishwa toka chanzo.",
    productsTitle: "Bidhaa — Mazao ya kilimo kwa jumla",
    productsDescription:
      "Chunguza katalogi ya jumla ya HB33: maharage ya kakao, maganda, siagi, nibs, potashi, keki, soya na cocopeat. Oda ya chini kontena moja.",
    aboutTitle: "Kuhusu HB33",
    aboutDescription:
      "HB33 ni msambazaji wa mazao ya kilimo wa Afrika Magharibi anayehudumia watengenezaji, wasindikaji na wanunuzi wa jumla kwa shehena zilizothibitishwa.",
    howTitle: "Jinsi inavyofanya kazi — Mchakato wa oda ya jumla",
    howDescription:
      "Jinsi ya kununua kwa jumla kwa HB33: chunguza katalogi, omba bei, thibitisha upatikanaji na safirisha FOB au CIF. Kiwango cha chini kontena moja.",
    quoteTitle: "Omba bei — Ombi la oda ya jumla",
    quoteDescription:
      "Tuma ombi la oda ya jumla kwa HB33. Oda ya chini kontena moja. Tunathibitisha upatikanaji, bei na usafirishaji.",
    contactTitle: "Wasiliana na HB33",
    contactDescription:
      "Wasiliana na HB33 kwa maombi ya jumla kwa barua pepe au WhatsApp. Tunajibu na vipimo, bei na muda.",
    privacyTitle: "Sera ya Faragha",
    privacyDescription:
      "HB33 hukusanya data binafsi ndogo iwezekanavyo — tu yale unayotutumia kwenye maombi ya bei na jumbe za mawasiliano — ili kujibu ombi lako. Hakuna akaunti, hakuna jarida, hakuna vifuatiliaji vya matangazo.",
    termsTitle: "Masharti ya Matumizi",
    termsDescription:
      "Kutuma ombi la bei au ujumbe hakuundi mkataba, hakuthibitishi bidhaa zilizopo wala hakuweki bei. Oda ya chini: kontena moja. Masharti yanahusu maombi halisi ya jumla pekee.",
  },
  nav: {
    home: "Nyumbani",
    products: "Bidhaa",
    about: "Kutuhusu",
    howItWorks: "Jinsi inavyofanya kazi",
    contact: "Wasiliana nasi",
    requestQuote: "Omba bei",
    exploreProducts: "Tazama bidhaa",
    menu: "Menyu",
    close: "Funga",
    language: "Lugha",
    languageGroups: {
      global: "Dunia",
      europe: "Ulaya",
      asia: "Asia",
      "middle-east": "Mashariki ya Kati",
      ghana: "Ghana",
      nigeria: "Nigeria",
      "east-africa": "Afrika Mashariki",
      francophone: "Afrika Magharibi (Kifaransa)",
    },
  },
  common: {
    learnMore: "Jifunze zaidi",
    viewProduct: "Tazama bidhaa",
    viewAllProducts: "Tazama bidhaa zote",
    backToProducts: "Rudi kwenye bidhaa",
    relatedProducts: "Bidhaa zinazohusiana",
    send: "Tuma",
    sending: "Inatuma…",
    submitInquiry: "Tuma ombi",
    submitting: "Inatuma…",
    required: "Lazima",
    optional: "Hiari",
    containers: "makontena",
    container: "kontena",
    tonnageNote:
      "Uzito wa mwisho unategemea msongamano wa bidhaa na aina ya kontena — utathibitishwa kabla ya usafirishaji.",
    allRightsReserved: "Haki zote zimehifadhiwa.",
    backToTop: "Rudi juu",
    placeholderNote:
      "Maelezo yenye alama ya “itathibitishwa” yatalinganishwa na HB33 kabla ya usafirishaji.",
  },
  moq: {
    short: "Oda ya chini: kontena 1. Oda kubwa pekee.",
    long: "Oda ya chini: kontena 1 ya mizigo. Tunashughulikia oda kubwa pekee. Tafadhali wasiliana nasi ili kuthibitisha ukubwa wa kontena, uwezo wa upakiaji, upatikanaji na usafirishaji.",
    badge: "MOQ: kontena 1",
  },
  topbar: {
    message: "Mauzo ya nje ya jumla pekee — angalau kontena moja kwa oda.",
  },
  hero: {
    eyebrow: "Kakao na mazao ya Afrika Magharibi, yamekaguliwa toka chanzo",
    title: "Shehena moja mbaya inaweza kugharimu zaidi ya pesa.",
    lead: "HB33 inasambaza kakao bora, soya na cocopeat kwa wingi kwenye masoko ya dunia — inakaguliwa kabla ya kila shehena.",
    primary: "Tazama Bidhaa",
    secondary: "Omba Bei",
    stats: [
      { value: "MT 1,000", label: "Uwezo wa mwezi" },
      { value: "8", label: "Bidhaa za jumla" },
      { value: "3", label: "Mabara tunayohudumia" },
      { value: "FOB / CIF", label: "Usafirishaji duniani" },
    ],
  },
  trust: {
    eyebrow: "Kwa nini HB33",
    title: "Imeundwa kwa wanunuzi wasioweza kupata wiki mbaya.",
    items: [
      {
        title: "Uthibitisho kwanza",
        text: "Ukaguzi huru kabla ya kila shehena. Unyevu huthibitishwa toka chanzo, si wakati wa kuwasili.",
      },
      {
        title: "Hakuna madalali",
        text: "Mahusiano ya moja kwa moja na mashamba na vyama vya ushirika vya Afrika Magharibi. Tunamiliki mnyororo — hatuunganishi tu.",
      },
      {
        title: "Hatukai kimya",
        text: "Taarifa za kweli baada ya makubaliano. Nyaraka, upakiaji na hatua za usafirishaji unazoweza kutenda.",
      },
    ],
  },
  homeProducts: {
    eyebrow: "Bidhaa zetu",
    title: "Mazao nane ya jumla. Kiwango kimoja.",
    lead: "Bidhaa za kakao, mbegu za mafuta na bidhaa ya nazi — vimefungwa kwa makontena na kukaguliwa kila shehena.",
    cta: "Tazama katalogi nzima",
  },
  founder: {
    eyebrow: "Kutoka kwa mwanzilishi",
    title: "Karibu",
    titleAccent: "HB33.",
    imageAlt: "Hugo Obed, mwanzilishi wa HB33",
    paragraphs: [
      "HB33 ilijengwa juu ya imani rahisi: watengenezaji duniani wanastahili shehena wanazoweza kuziamini.",
      "Imani hiyo ilichochewa na uzoefu. Mwanzoni mwa safari yangu, mshirika wa usafirishaji alibadilisha njia za usafirishaji bila mimi kujua ili kupunguza gharama. Matokeo yalikuwa mabaya sana. Mvua iliharibu shehena, na nilibeba gharama yote ya hasara. Ilikuwa somo gumu, lakini lilibadilisha jinsi ninavyoshughulikia biashara ya usafirishaji.",
      "Uzoefu huo ulinifundisha kuwa ubora pekee hautatosha. Upataji wa kuaminika lazima uungwe mkono na usafirishaji wa kuaminika, nyaraka wazi na mawasiliano ya uwazi. Ndiyo maana kila shehena tunayoshughulikia huthibitishwa, huandikwa na kukaguliwa na SGS kabla ya kuondoka bandarini.",
      "Leo, HB33 inahudumia watengenezaji katika Asia, Ulaya na Mashariki ya Kati, ikisambaza kwa jumla maharage ya kakao, maganda, siagi, nibs, potashi na keki kutoka mashamba ya kuaminika ya Afrika Magharibi.",
      "Katika HB33, hatuamini kusafirisha na kutumaini. Tunaamini kupanga, kuthibitisha na kuwasilisha kwa ujasiri.",
      "Asante kwa kututumaini kama mshirika wako wa upataji. Tunatarajia kusaidia biashara yako kukua kwa ujasiri.",
    ],
    name: "Hugo Obed",
    role: "Mwanzilishi, HB33",
  },
  processPreview: {
    eyebrow: "Jinsi inavyofanya kazi",
    title: "Kutoka shambani hadi kiwandani kwako.",
    steps: [
      { title: "Tazama na uombe", text: "Chagua bidhaa na utuambie kiasi na unakoenda." },
      { title: "Thibitisha masharti", text: "Tunathibitisha upatikanaji, vipimo, bei na usafirishaji FOB/CIF." },
      { title: "Shehena iliyokaguliwa", text: "Imekaguliwa, imeandikwa na kusafirishwa kwa makontena yaliyojaa." },
    ],
    cta: "Tazama mchakato mzima",
  },
  logistics: {
    eyebrow: "Ufungaji na usafirishaji",
    title: "Imefungwa kwa makontena. Imeandikwa kwa forodha.",
    items: [
      { title: "Kwa makontena", text: "Upakiaji wa futi 20 na 40. Uwezo wa mwisho huthibitishwa kwa bidhaa na aina ya kontena." },
      { title: "Nyaraka za usafirishaji", text: "Cheti cha afya ya mimea, cheti cha asili na hati ya shehena kwenye kila usafirishaji." },
      { title: "FOB / CIF", text: "Masharti yako, bandari yako — na taarifa unazoweza kutenda." },
    ],
  },
  faqPreview: {
    eyebrow: "Maswali yanayoulizwa",
    title: "Wanunuzi huuliza nini kabla ya shehena yao ya kwanza.",
    cta: "Jinsi ya kuagiza",
  },
  homeFaqs: [
    {
      q: "HB33 inasambaza nini?",
      a: "Maharage ya kakao, maganda, siagi, nibs, potashi na keki kwa jumla, pamoja na soya na cocopeat — vyote kwa kiasi cha kontena kwa watengenezaji, wasindikaji na wanunuzi wa jumla.",
    },
    {
      q: "Oda ya chini ni ipi?",
      a: "Kontena moja kamili kwa oda. Tunashughulikia oda kubwa pekee na huthibitisha ukubwa wa kontena na uwezo wa upakiaji nawe kabla ya usafirishaji.",
    },
    {
      q: "Mnasafirisha FOB au CIF?",
      a: "Zote mbili. Hutoa bei ya FOB au CIF kulingana na kinachofaa shughuli zako, bandari yako na mnyororo wako wa ugavi.",
    },
    {
      q: "Ninapataje bei na vipimo?",
      a: "Tuma ombi la bei likiwa na bidhaa, kiasi na unakoenda. Tunajibu na vipimo, bei na muda — si mazungumzo ya mauzo.",
    },
  ],
  homeCta: {
    title: "Shehena yako ijayo haipaswi kuwa kamari.",
    lead: "Tuambie unachohitaji. Tutathibitisha upatikanaji, vipimo na usafirishaji — kwa maandishi.",
    primary: "Omba Bei",
    secondary: "Wasiliana nasi",
  },
  productsPage: {
    eyebrow: "Katalogi",
    title: "Katalogi ya jumla",
    lead: "Tafuta na chuja mazao nane yanayofaa makontena. Kila oda huanzia na kontena moja lililojaa.",
    searchLabel: "Tafuta bidhaa",
    searchPlaceholder: "Tafuta kakao, soya, cocopeat…",
    categoryLabel: "Aina",
    allCategories: "Aina zote",
    categories: {
      cocoa: "Bidhaa za kakao",
      oilseeds: "Mbegu za mafuta",
      "growing-media": "Bidhaa ya nazi",
    },
    sortLabel: "Panga",
    sortOptions: {
      featured: "Zilizoangaziwa",
      nameAsc: "Jina A–Z",
      nameDesc: "Jina Z–A",
    },
    results: "bidhaa",
    result: "bidhaa",
    showing: "Inaonyesha",
    emptyTitle: "Hakuna bidhaa inayolingana na vichujio.",
    emptyText: "Jaribu neno lingine au aina nyingine — au tutumie ombi lako moja kwa moja.",
    emptyCta: "Omba Bei",
    quoteAction: "Omba Bei",
  },
  productDetail: {
    overview: "Muhtasari",
    background: "Asili na umuhimu wa kibiashara",
    educationalNote:
      "Taarifa za jumla za mazao hapa chini ni za kuelimisha. Maelezo mahususi ya shehena ya HB33 huthibitishwa kwa kila ombi.",
    uses: "Matumizi",
    specs: "Vipimo",
    specsNote:
      "Vipimo vya kielelezo. Ubora, unyevu na ufungaji wa mwisho huthibitishwa kwa kila shehena na kukaguliwa kabla ya usafirishaji.",
    quality: "Ubora, ushughulikiaji na uhifadhi",
    packaging: "Ufungaji na usafirishaji wa jumla",
    buyers: "Wanunuzi na viwanda",
    moqTitle: "Oda ya chini",
    faq: "Maswali kuhusu bidhaa",
    quoteCta: "Omba bei ya bidhaa hii",
    quoteButton: "Omba Bei",
    whatsappButton: "Uliza WhatsApp",
    whatsappUnavailable:
      "Kuagiza kwa WhatsApp bado hakujasanidiwa — tafadhali tumia fomu ya bei au barua pepe ili tupokee ombi lako kwa uhakika.",
    toBeConfirmed: "Huthibitishwa kwa kila shehena",
  },
  aboutPage: {
    eyebrow: "Kuhusu HB33",
    title: "Mshirika wa upataji, si msambazaji tu.",
    lead: "HB33 ilijengwa juu ya imani rahisi: watengenezaji duniani wanastahili shehena za kakao na mazao wanazoweza kuziamini.",
    storyTitle: "Historia yetu",
    story: [
      "HB33 ilitokana na uzoefu wa moja kwa moja wa kile kinachoweza kwenda kombo katika biashara ya mazao — mshirika wa usafirishaji alibadilisha njia za usafirishaji bila taarifa ili kupunguza gharama, na mvua iliharibu shehena yote. Gharama ya somo hilo iliunda kila kitu katika jinsi tunavyofanya kazi leo.",
      "Ubora pekee hautatosha. Upataji wa kuaminika lazima uungwe mkono na usafirishaji wa kuaminika, nyaraka wazi na mawasiliano ya uwazi. Ndiyo maana kila shehena ya HB33 huthibitishwa, huandikwa na kukaguliwa kabla ya kuondoka bandarini.",
      "Leo, HB33 inasambaza bidhaa za kakao kwa jumla, soya na cocopeat kutoka mashamba na vyama vya ushirika vya kuaminika vya Afrika Magharibi kwa watengenezaji katika Asia, Ulaya na Mashariki ya Kati.",
    ],
    valuesEyebrow: "Maadili yetu",
    valuesTitle: "Tunachosimamia",
    values: [
      { title: "Uthibitisho kwanza", text: "Ukaguzi na upimaji wa unyevu toka chanzo — kabla ya kufunga na kupakia, si wakati wa kuwasili." },
      { title: "Upataji wa moja kwa moja", text: "Mahusiano ya muda mrefu na mashamba na vyama vya ushirika tunaowafahamu kwa majina." },
      { title: "Mawasiliano ya uwazi", text: "Uthibitisho wa maandishi, taarifa za kweli za usafirishaji na nyaraka kwenye kila kontena." },
    ],
    factsEyebrow: "Kwa muhtasari",
    factsTitle: "Ukweli wa biashara",
    factsNote:
      "Hapa kunatajwa ukweli uliothibitishwa pekee. Vyeti, maeneo na uwezo huthibitishwa kwa kila ombi — kamwe hazidhaniwi.",
    facts: [
      { label: "Kituo", value: "Afrika Magharibi" },
      { label: "Bidhaa", value: "SKU 8 za jumla" },
      { label: "Uwezo wa mwezi", value: "Hadi MT 1,000" },
      { label: "Masharti", value: "FOB / CIF" },
      { label: "Oda ya chini", value: "Kontena 1" },
    ],
    ctaTitle: "Fanya kazi na HB33",
    ctaText: "Tuambie kiasi na unakoenda — tutajibu na vipimo, bei na muda.",
    ctaPrimary: "Omba Bei",
    ctaSecondary: "Wasiliana nasi",
  },
  howPage: {
    eyebrow: "Jinsi inavyofanya kazi",
    title: "Hatua tano hadi kontena lililothibitishwa.",
    lead: "Kutuma ombi hakuthibitishi oda, upatikanaji wa bidhaa au bei ya mwisho moja kwa moja. Kila oda huthibitishwa kwa maandishi kabla ya kitu chochote kusafirishwa.",
    steps: [
      {
        title: "Chunguza katalogi",
        text: "Chunguza bidhaa, vipimo na ufungaji. Kila kitu kinauzwa kwa kiasi cha kontena kamili.",
      },
      {
        title: "Chagua zao na kiasi",
        text: "Chagua bidhaa zako na idadi ya makontena. Kiwango cha chini ni kontena moja kwa oda.",
      },
      {
        title: "Tuma ombi lako",
        text: "Tuma maelezo ya mawasiliano, uwasilishaji na mahitaji kupitia fomu ya bei, barua pepe au WhatsApp.",
      },
      {
        title: "Tunathibitisha masharti",
        text: "HB33 inathibitisha upatikanaji, bei, vipimo, upakiaji wa kontena, usafirishaji na malipo.",
      },
      {
        title: "Utekelezaji na ufuatiliaji",
        text: "Ukaguzi, nyaraka na usafirishaji — na taarifa katika kila hatua hadi kuwasilisha.",
      },
    ],
    noteTitle: "Tafadhali kumbuka",
    noteText:
      "Ombi ni ombi, si oda. Upatikanaji, bei ya mwisho, vipimo, upakiaji wa kontena, usafirishaji na masharti ya malipo hukubaliwa na HB33 kabla ya ahadi yoyote.",
    cta: "Anza kwa ombi la bei",
  },
  quotePage: {
    eyebrow: "Ombi la oda ya jumla",
    title: "Omba Bei",
    lead: "Tuambie unachohitaji na linakoenda wapi. Tutajibu na upatikanaji, vipimo, bei na usafirishaji.",
    form: {
      fullName: "Jina kamili",
      company: "Kampuni",
      email: "Barua pepe ya kazi",
      countryCode: "Nambari ya nchi",
      selectCode: "Chagua nambari",
      phone: "Nambari ya simu",
      country: "Nchi",
      searchCountryPlaceholder: "Anza kuandika nchi…",
      noCountryMatch: "Hakuna nchi inayolingana — endelea kuandika.",
      destination: "Unakoenda / bandari",
      timeframe: "Muda wa uwasilishaji",
      timeframeOptions: {
        asap: "Haraka iwezekanavyo",
        oneMonth: "Ndani ya mwezi 1",
        oneToThree: "Miezi 1–3",
        flexible: "Haina haraka / kupanga",
      },
      packaging: "Ufungaji unaopendelea",
      packagingPlaceholder: "mf. magunia ya jute 60kg, mifuko PP 25kg…",
      items: "Bidhaa na kiasi",
      product: "Bidhaa",
      selectProduct: "Chagua bidhaa…",
      quantityContainers: "Makontena",
      addProduct: "Ongeza bidhaa",
      removeProduct: "Ondoa",
      notes: "Mahitaji zaidi",
      notesPlaceholder: "Vipimo, ubora, unyevu, masharti (FOB/CIF)…",
      atLeastOne: "Ongeza angalau bidhaa moja.",
      submit: "Tuma ombi",
      submitting: "Inatuma…",
    },
    errors: {
      required: "Sehemu hii lazima.",
      email: "Weka barua pepe sahihi.",
      phone: "Weka nambari sahihi na nambari ya nchi.",
      minContainers: "Angalau kontena 1 kwa bidhaa — oda kubwa pekee.",
      selectProduct: "Chagua bidhaa au ondoa mstari huu.",
    },
    successTitle: "Ombi limepokelewa.",
    successLead: "Asante — ombi lako la jumla limerekodiwa.",
    reference: "Nambari yako ya kumbukumbu",
    nextStepsTitle: "Hatua zinazofuata",
    nextSteps: [
      "HB33 itathibitisha upatikanaji kwa kiasi chako.",
      "Utapokea bei za mwisho na vipimo.",
      "Upakiaji, ufungaji na usafirishaji FOB/CIF vitakubaliwa.",
      "Masharti ya malipo yatathibitishwa kabla ya utekelezaji.",
    ],
    emailStatusOn: "Nakala imetumwa kwa timu yetu ya mauzo kwa barua pepe.",
    emailStatusOff:
      "Usambazaji wa barua pepe haujawashwa katika mazingira haya, kwa hivyo kwa jibu la haraka zaidi tafadhali tuma pia ombi lako kwa barua pepe au WhatsApp kwa kutumia vitufe vilivyo chini — jumuisha nambari yako ya kumbukumbu.",
    sendEmail: "Tuma kwa barua pepe",
    sendWhatsapp: "Endelea WhatsApp",
    newInquiry: "Ombi jipya",
    failTitle: "Tatizo limetokea.",
    failText: "Ombi lako halikutumwa. Jaribu tena — au wasiliana nasi moja kwa moja kwa barua pepe.",
  },
  contactPage: {
    eyebrow: "Mawasiliano",
    title: "Ongea na HB33.",
    lead: "Kwa maombi ya jumla, bei na vipimo — tuandikie, tutajibu na muda, si matangazo.",
    formTitle: "Tuma ujumbe",
    form: {
      name: "Jina kamili",
      email: "Barua pepe",
      subject: "Kichwa",
      message: "Ujumbe",
      messagePlaceholder: "Bidhaa, kiasi, unakoenda…",
      submit: "Tuma ujumbe",
      sent: "Ujumbe umetumwa.",
    },
    errors: {
      required: "Sehemu hii lazima.",
      email: "Weka barua pepe sahihi.",
      messageShort: "Andika ujumbe wa angalau herufi 10.",
    },
    sentTitle: "Ujumbe umepokelewa.",
    sentText: "Asante — tutajibu hivi karibuni.",
    channelsTitle: "Njia za moja kwa moja",
    emailLabel: "Barua pepe",
    whatsappLabel: "WhatsApp",
    whatsappHint: "Njia ya haraka kwa maombi yanayoendelea — taja nambari yako ya kumbukumbu ikiwa unayo.",
    whatsappUnavailable:
      "WhatsApp bado haijasanidiwa. Tafadhali wasiliana nasi kwa barua pepe — tunajibu na vipimo, bei na muda.",
    locationLabel: "Kituo",
    responseNote: "Tunajibu maombi ya jumla ndani ya siku 1–2 za kazi.",
    failText: "Ujumbe wako haukutumwa. Jaribu tena au tutumie barua pepe moja kwa moja.",
  },
  privacyPage: {
    eyebrow: "Kisheria",
    title: "Sera ya Faragha",
    updated: "Ilisasishwa mwisho",
    intro:
      "HB33 hukusanya data binafsi kidogo iwezekanavyo: tu yale unayotutumia unapo omba bei au kuwasiliana nasi, ili tuweze kujibu. Hakuna akaunti, hakuna jarida na hakuna vifuatiliaji vya matangazo kwenye tovuti hii.",
    sections: [
      {
        title: "Taarifa unazotupa",
        text: "Maombi ya bei: jina, kampuni, barua pepe, simu, nchi, unakoenda, muda, ufungaji unaopendelea, bidhaa na kiasi cha makontena, na maelezo yoyote unayoongeza. Jumbe za mawasiliano: jina, barua pepe, kichwa na ujumbe. Hatukusanyi kingine chochote — hakuna akaunti na hakuna vipengele vya maoni au jarida.",
      },
      {
        title: "Jinsi tunavyotumia",
        text: "Kwa kujibu ombi lako pekee: kuthibitisha upatikanaji na bei, kuandaa vipimo na usafirishaji, na kuwasiliana kuhusu ombi lako. Hatuuzi data binafsi na hatutumi barua pepe za matangazo.",
      },
      {
        title: "Kuhifadhi na kushiriki",
        text: "Maombi hurekodiwa katika kumbukumbu ya seva ya tovuti ili ombi lolote lisipotee. Pale inaposanidiwa, nakala hutumwa kwa sanduku la mauzo la HB33 kwa barua pepe au kwa webhook ya faragha — skrini ya uthibitisho daima inakuambia kwa uaminifu kama usambazaji wa barua pepe umewashwa. Vitufe vya barua pepe na WhatsApp hufanya kazi ndani ya programu zako mwenyewe: tunapokea tu kile unachochagua kutuma.",
      },
      {
        title: "Cookies na uchanganuzi",
        text: "Kwa kawaida tovuti hii haiweki cookies na haiendeshi uchanganuzi au ufuatiliaji. Ikiwa uchanganuzi utawashwa, hupakiwa tu baada ya kuukubali kwenye bango la idhini, na chaguo lako huhifadhiwa ndani ya kivinjari chako.",
      },
      {
        title: "Kuhifadhi na haki zako",
        text: "Kumbukumbu za maombi huhifadhiwa kwa madhumuni halali ya biashara na kumbukumbu. Unaweza kuomba wakati wowote nakala, marekebisho au kufutwa kwa maelezo yako kwa kutumia barua pepe ya mawasiliano kwenye tovuti hii.",
      },
      {
        title: "Ilani ya maudhui ya awali",
        text: "Sera hii inaeleza mtiririko halisi wa data wa tovuti lakini bado inapaswa kupitiwa na mwanasheria wa HB33 kabla ya matumizi ya kibiashara, ikiwa ni pamoja na sheria inayotumika, majukumu ya usindikaji wa data na maelezo yoyote ya mwenyeji au mtoa barua pepe.",
      },
    ],
  },
  termsPage: {
    eyebrow: "Kisheria",
    title: "Masharti ya Matumizi",
    updated: "Ilisasishwa mwisho",
    intro:
      "Kwa kutumia tovuti hii unakubali masharti yafuatayo. Ikiwa hukubali, tafadhali usitumie tovuti.",
    sections: [
      {
        title: "Maombi si oda",
        text: "Kutuma ombi la bei au ujumbe hakuundi mkataba, hakuthibitishi upatikanaji wa bidhaa wala hakuweki bei. Hakuna malipo kwenye tovuti hii. Oda zote huthibitishwa tofauti kwa maandishi pamoja na vipimo, upakiaji, usafirishaji na masharti ya malipo.",
      },
      {
        title: "Oda ya chini",
        text: "HB33 hushughulikia oda kubwa pekee, kwa kiwango cha chini cha kontena moja kamili kwa oda. Maombi chini ya kiwango hiki hayawezi kutekelezwa.",
      },
      {
        title: "Taarifa za bidhaa",
        text: "Vipimo vinavyoonyeshwa kwenye tovuti hii ni vya kielelezo. Ubora, unyevu, ufungaji na upakiaji wa mwisho huthibitishwa kwa kila shehena na kukaguliwa kabla ya usafirishaji.",
      },
      {
        title: "Matumizi yanayokubalika",
        text: "Tumia fomu za maombi kwa uaminifu na kwa mahitaji halisi ya jumla pekee. Usitume spam, maelezo ya uongo, maudhui haramu au maombi ya kiotomatiki ya wingi yanayodhulumu huduma.",
      },
      {
        title: "Maudhui na dhima",
        text: "Maandishi na muundo wa tovuti ni mali ya HB33; picha za bidhaa ni mali ya watu wengine wanaotajwa kwenye kurasa husika. Kwa kadiri sheria inaruhusu, HB33 haiwajibiki kwa maamuzi yaliyofanywa kwa msingi wa maudhui ya kielelezo ya tovuti — masharti ya maandishi yaliyothibitishwa yanatawala kila oda.",
      },
      {
        title: "Ilani ya maudhui ya awali",
        text: "Haya ni maudhui ya kuanzia na yanapaswa kupitiwa na mwanasheria wa HB33 kabla ya matumizi ya kibiashara, ikiwa ni pamoja na sheria inayotumika, mipaka ya dhima na vifungu vya kutatua migogoro.",
      },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Ukurasa huu haukuingia kontenani.",
    text: "Ukurasa unaoutafuta haupo au umehamishwa.",
    home: "Rudi nyumbani",
    products: "Tazama bidhaa",
  },
  consent: {
    title: "Idhini ya cookies na uchanganuzi",
    text: "Tunatumia uchanganuzi unaoheshimu faragha kuboresha tovuti. Hupakiwa tu ukikubali. Ukikataa, hakuna kinachofuatiliwa.",
    accept: "Kubali uchanganuzi",
    decline: "Kataa",
  },
  footer: {
    tagline: "Kakao, soya na cocopeat kwa jumla — vimekaguliwa toka chanzo, vinasafirishwa duniani.",
    shop: "Katalogi",
    company: "Kampuni",
    legal: "Sheria",
    privacy: "Faragha",
    terms: "Masharti",
    contactTitle: "Mawasiliano",
    language: "Lugha",
    minOrder: "Oda ya chini: kontena 1.",
    photoCredit: "Picha kupitia Wikimedia Commons — angalia mikopo kwenye kurasa za bidhaa.",
  },
};

export default sw;
