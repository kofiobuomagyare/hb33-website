import type { Locale } from "./i18n";
import { baseLanguage } from "./i18n";

export type Localized = { en: string; fr: string };
export type Category = "cocoa" | "oilseeds" | "growing-media";

export interface ProductSpec {
  label: Localized;
  value: Localized;
}

export interface ProductFaq {
  q: Localized;
  a: Localized;
}

export interface Product {
  slug: string;
  category: Category;
  image: string;
  imageAlt: Localized;
  /** Verified photo credit (proper name/license, not translated). */
  credit: string;
  creditUrl: string;
  license: string;
  name: Localized;
  tagline: Localized;
  overview: Localized[];
  history: Localized[];
  uses: { title: Localized; text: Localized }[];
  specs: ProductSpec[];
  quality: Localized[];
  packaging: Localized[];
  buyers: { title: Localized; text: Localized }[];
  faqs: ProductFaq[];
  featured?: boolean;
}

export const t = (l: Localized, locale: Locale): string =>
  baseLanguage(locale) === "fr" ? l.fr : l.en;

const file = (name: string, width = 1280) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${name}?width=${width}`;

export const products: Product[] = [
  {
    slug: "cocoa-beans",
    category: "cocoa",
    image: file("Cocoa_beans_in_a_sack.jpg"),
    imageAlt: {
      en: "Jute sack filled with dried cocoa beans",
      fr: "Sac de jute rempli de fèves de cacao séchées",
    },
    credit: "Ei'eke",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Cocoa_beans_in_a_sack.jpg",
    license: "CC BY-SA 4.0",
    name: { en: "Cocoa Beans", fr: "Fèves de cacao" },
    tagline: {
      en: "Fermented, sun-dried beans sourced direct from West African farms.",
      fr: "Fèves fermentées et séchées au soleil, en direct des fermes ouest-africaines.",
    },
    overview: [
      {
        en: "Our cocoa beans are fermented on-farm, sun-dried to a stable moisture level, and graded before bagging. Sourced through cooperatives we work with season after season, every lot is traceable to origin and inspected before it leaves port.",
        fr: "Nos fèves sont fermentées à la ferme, séchées au soleil jusqu’à une humidité stable, puis calibrées avant ensachage. Issues de coopératives partenaires saison après saison, chaque lot est traçable jusqu’à l’origine et inspecté avant de quitter le port.",
      },
      {
        en: "Beans are sold in full-container quantities in jute or polypropylene bags, with moisture, mould and bean-count verified at origin — not on arrival.",
        fr: "Les fèves sont vendues par conteneurs complets en sacs de jute ou polypropylène, avec humidité, moisissures et calibre vérifiés à l’origine — pas à l’arrivée.",
      },
    ],
    history: [
      {
        en: "Cacao (Theobroma cacao) originated in the Amazon basin and reached West Africa in the 19th century, where climate and smallholder farming made the region the world’s dominant producer. Today Côte d’Ivoire and Ghana alone account for well over half of global output, and fermented West African beans are the reference raw material for bulk chocolate, butter and powder worldwide.",
        fr: "Le cacaoyer (Theobroma cacao), originaire du bassin amazonien, est arrivé en Afrique de l’Ouest au XIXe siècle, où climat et petites exploitations ont fait de la région le premier producteur mondial. Aujourd’hui, la Côte d’Ivoire et le Ghana représentent à eux seuls plus de la moitié de la production mondiale, et les fèves fermentées ouest-africaines sont la matière première de référence pour le chocolat, le beurre et la poudre en vrac.",
      },
    ],
    uses: [
      {
        title: { en: "Chocolate manufacturing", fr: "Chocolaterie" },
        text: {
          en: "Roasting and grinding into liquor for couverture, compounds and fillings.",
          fr: "Torréfaction et broyage en masse pour couvertures, composés et fourrages.",
        },
      },
      {
        title: { en: "Butter & powder pressing", fr: "Pressage beurre et poudre" },
        text: {
          en: "Feedstock for hydraulic pressing into prime butter and press cake.",
          fr: "Matière première pour le pressage hydraulique en beurre prime et tourteau.",
        },
      },
      {
        title: { en: "Nib & specialty lines", fr: "Nibs et lignes spéciales" },
        text: {
          en: "Winnowing into nibs for craft chocolate, inclusions and retail packs.",
          fr: "Décorticage en nibs pour chocolat artisanal, inclusions et sachets détail.",
        },
      },
      {
        title: { en: "Shell recovery", fr: "Valorisation des coques" },
        text: {
          en: "Hulls separated at winnowing feed biomass, mulch and brewing streams.",
          fr: "Les coques séparées alimentent les filières biomasse, paillage et brassage.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Origin", fr: "Origine" },
        value: { en: "West Africa (farm cooperatives)", fr: "Afrique de l’Ouest (coopératives)" },
      },
      {
        label: { en: "Moisture", fr: "Humidité" },
        value: { en: "≤ 7.5% (verified at origin)", fr: "≤ 7,5 % (vérifiée à l’origine)" },
      },
      {
        label: { en: "Mould / slaty", fr: "Moisies / ardoisées" },
        value: { en: "Within merchantable limits, confirmed per lot", fr: "Dans les limites marchandes, confirmé par lot" },
      },
      {
        label: { en: "Bean count", fr: "Calibre" },
        value: { en: "Main-crop sizing, confirmed per lot", fr: "Calibre récolte principale, confirmé par lot" },
      },
      {
        label: { en: "Fermentation", fr: "Fermentation" },
        value: { en: "On-farm box fermented, sun-dried", fr: "Fermentation en caisses à la ferme, séchage solaire" },
      },
      {
        label: { en: "Packaging", fr: "Conditionnement" },
        value: { en: "60–65 kg jute or PP bags, container loaded", fr: "Sacs jute ou PP 60–65 kg, chargés en conteneur" },
      },
    ],
    quality: [
      {
        en: "Moisture is tested before bagging; off-spec lots are rejected, not blended. Bags are stored off-ground under cover, and containers are ventilated and desiccated where the route requires it.",
        fr: "L’humidité est contrôlée avant ensachage ; les lots hors norme sont rejetés, pas mélangés. Les sacs sont stockés sur palettes à l’abri, et les conteneurs sont ventilés et déshumidifiés selon la route.",
      },
    ],
    packaging: [
      {
        en: "60–65 kg jute or woven PP bags, palletised on request.",
        fr: "Sacs jute ou PP tissé 60–65 kg, palettisés sur demande.",
      },
      {
        en: "20ft and 40ft container loadings; final tonnage confirmed per lot.",
        fr: "Chargements 20 et 40 pieds ; tonnage final confirmé par lot.",
      },
      {
        en: "Private labelling and bag marking available for contracted volumes.",
        fr: "Marquage privé et étiquetage disponibles pour volumes contractés.",
      },
    ],
    buyers: [
      {
        title: { en: "Chocolate makers", fr: "Chocolatiers industriels" },
        text: { en: "Grinders and confectionery houses running continuous lines.", fr: "Broyeurs et confiseurs en lignes continues." },
      },
      {
        title: { en: "Butter pressers", fr: "Presseurs de beurre" },
        text: { en: "Plants pressing butter and powder for food and cosmetics.", fr: "Usines pressant beurre et poudre pour food et cosmétique." },
      },
      {
        title: { en: "Distributors", fr: "Distributeurs" },
        text: { en: "Regional wholesalers serving processors and roasters.", fr: "Grossistes régionaux au service des transformateurs." },
      },
    ],
    faqs: [
      {
        q: { en: "Are the beans fermented?", fr: "Les fèves sont-elles fermentées ?" },
        a: {
          en: "Yes — on-farm box fermentation followed by sun-drying, with fermentation level confirmed per lot.",
          fr: "Oui — fermentation en caisses à la ferme puis séchage solaire, niveau confirmé par lot.",
        },
      },
      {
        q: { en: "How many bags fit a container?", fr: "Combien de sacs par conteneur ?" },
        a: {
          en: "It depends on bag weight and container type. Tell us your target volume and we confirm the exact loading plan.",
          fr: "Selon le poids des sacs et le type de conteneur. Indiquez votre volume visé et nous confirmons le plan de chargement exact.",
        },
      },
      {
        q: { en: "Do you provide samples?", fr: "Fournissez-vous des échantillons ?" },
        a: {
          en: "Samples can be arranged for serious container-quantity inquiries — mention it in your quote request.",
          fr: "Des échantillons peuvent être organisés pour les demandes sérieuses en quantité conteneur — mentionnez-le dans votre devis.",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "cocoa-bean-shells",
    category: "cocoa",
    image: file("Roasted_Cocoa_Bean.JPG"),
    imageAlt: {
      en: "Roasted cocoa bean with shell fragments in hand",
      fr: "Fève torréfiée avec fragments de coques dans la main",
    },
    credit: "Glorgana",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Roasted_Cocoa_Bean.JPG",
    license: "CC BY-SA 3.0",
    name: { en: "Cocoa Bean Shells", fr: "Coques de fèves de cacao" },
    tagline: {
      en: "Our flagship export — cleaned, low-moisture shells for energy, feed and soil.",
      fr: "Notre export phare — coques nettoyées à faible humidité pour énergie, alimentation animale et sols.",
    },
    overview: [
      {
        en: "Shells are the husks separated from the kernel during winnowing. Our flagship export is cleaned, screened and dried to a low, stable moisture so it burns evenly, stores safely and handles cleanly through augers and dosing lines.",
        fr: "Les coques sont les enveloppes séparées de l’amande lors du décorticage. Notre export phare est nettoyé, criblé et séché à une humidité basse et stable pour une combustion régulière, un stockage sûr et une manutention propre.",
      },
      {
        en: "Supplied in bulk or bagged for biomass plants, feed mills, mulch blenders and brewers — in full containers only.",
        fr: "Fourni en vrac ou ensaché pour centrales biomasse, usines d’aliments, mélangeurs de paillis et brasseurs — en conteneurs complets uniquement.",
      },
    ],
    history: [
      {
        en: "For decades shells were treated as factory waste. As energy costs rose and circular production spread, cocoa shells became a traded biomass fuel and soil input: fibrous, residual cocoa aroma, and available wherever beans are winnowed at scale.",
        fr: "Longtemps considérées comme un déchet d’usine, les coques sont devenues avec la hausse de l’énergie et l’économie circulaire un combustible biomasse et un amendement échangés : fibreuses, au léger parfum de cacao, disponibles partout où les fèves sont décortiquées à grande échelle.",
      },
    ],
    uses: [
      {
        title: { en: "Biomass fuel", fr: "Combustible biomasse" },
        text: {
          en: "Pellets and direct firing for boilers, kilns and renewable plants.",
          fr: "Granulés et combustion directe pour chaudières, fours et centrales renouvelables.",
        },
      },
      {
        title: { en: "Animal feed", fr: "Alimentation animale" },
        text: {
          en: "Fibre ingredient for ruminant rations within regulated inclusion rates.",
          fr: "Ingrédient fibreux pour rations de ruminants selon taux d’incorporation réglementés.",
        },
      },
      {
        title: { en: "Mulch & soil", fr: "Paillage et sols" },
        text: {
          en: "Decorative, cocoa-scented mulch and compost feedstock.",
          fr: "Paillis décoratif parfumé au cacao et matière pour compost.",
        },
      },
      {
        title: { en: "Brewing & extraction", fr: "Brassage et extraction" },
        text: {
          en: "Cocoa-shell tea, brewing adjuncts and theobromine recovery streams.",
          fr: "Thé de coques, auxiliaires de brassage et filières d’extraction de théobromine.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Form", fr: "Forme" },
        value: { en: "Cleaned shells, screened; ground on request", fr: "Coques nettoyées, criblées ; broyées sur demande" },
      },
      {
        label: { en: "Moisture", fr: "Humidité" },
        value: { en: "Low and stable, verified per lot", fr: "Basse et stable, vérifiée par lot" },
      },
      {
        label: { en: "Purity", fr: "Pureté" },
        value: { en: "Screened to remove dust and foreign matter", fr: "Criblées pour éliminer poussières et corps étrangers" },
      },
      {
        label: { en: "Packaging", fr: "Conditionnement" },
        value: { en: "Bulk, big-bags or 25–50 kg PP bags", fr: "Vrac, big-bags ou sacs PP 25–50 kg" },
      },
      {
        label: { en: "Loading", fr: "Chargement" },
        value: { en: "Full containers; tonnage confirmed per lot", fr: "Conteneurs complets ; tonnage confirmé par lot" },
      },
    ],
    quality: [
      {
        en: "Shells are dried after separation and stored under cover. Keep dry in transit and at warehouse; high-moisture storage causes caking and mould.",
        fr: "Les coques sont séchées après séparation et stockées à l’abri. Garder au sec en transit et en entrepôt ; un stockage humide provoque agglomération et moisissures.",
      },
    ],
    packaging: [
      {
        en: "Loose bulk, 500–1000 kg big-bags, or 25–50 kg PP bags.",
        fr: "Vrac, big-bags 500–1000 kg ou sacs PP 25–50 kg.",
      },
      {
        en: "Ground or pellet-grade preparation available for contracted volumes.",
        fr: "Préparation broyée ou qualité granulés pour volumes contractés.",
      },
      {
        en: "Container stuffing supervised with weight tickets per lot.",
        fr: "Empotage supervisé avec tickets de pesée par lot.",
      },
    ],
    buyers: [
      {
        title: { en: "Biomass plants", fr: "Centrales biomasse" },
        text: { en: "Renewable-energy operators needing clean, even-burning feedstock.", fr: "Opérateurs d’énergie renouvelable exigeant un combustible propre et régulier." },
      },
      {
        title: { en: "Feed mills", fr: "Usines d’aliments" },
        text: { en: "High-volume compounders running shell-inclusive rations.", fr: "Fabricants à haut volume intégrant des coques aux rations." },
      },
      {
        title: { en: "Horticulture blenders", fr: "Mélangeurs horticoles" },
        text: { en: "Mulch and compost producers serving growers and retail.", fr: "Producteurs de paillis et compost pour horticulteurs et détail." },
      },
      {
        title: { en: "Brewers & extractors", fr: "Brasseurs et extracteurs" },
        text: { en: "Drinks and ingredient makers using shell character.", fr: "Boissonniers et ingrédientistes valorisant le caractère des coques." },
      },
    ],
    faqs: [
      {
        q: { en: "Can shells be pelletised?", fr: "Les coques peuvent-elles être granulées ?" },
        a: {
          en: "Yes — low-moisture screened shells pelletise well. Confirm grind size with us before ordering.",
          fr: "Oui — des coques criblées à faible humidité se granulent bien. Confirmez la granulométrie avant commande.",
        },
      },
      {
        q: { en: "Are they suitable for animal feed?", fr: "Conviennent-elles à l’alimentation animale ?" },
        a: {
          en: " commonly used in ruminant rations within regulated theobromine limits — check your local feed rules and confirm inclusion rates with your nutritionist.",
          fr: "Couramment utilisées en rations de ruminants dans les limites réglementées de théobromine — vérifiez la réglementation locale et les taux avec votre nutritionniste.",
        },
      },
      {
        q: { en: "Bulk or bagged?", fr: "Vrac ou ensaché ?" },
        a: {
          en: "Both. Energy users usually take bulk or big-bags; horticulture and brewing usually take 25–50 kg bags.",
          fr: "Les deux. L’énergie prend plutôt vrac ou big-bags ; horticulture et brassage plutôt sacs 25–50 kg.",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "cocoa-butter",
    category: "cocoa",
    image: file("Cocoa_butter.jpg"),
    imageAlt: {
      en: "Cocoa butter set in tins",
      fr: "Beurre de cacao figé en boîtes",
    },
    credit: "Rebeccananonof",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Cocoa_butter.jpg",
    license: "CC0",
    name: { en: "Cocoa Butter", fr: "Beurre de cacao" },
    tagline: {
      en: "Prime pressed butter, natural or deodorised, for food and skincare.",
      fr: "Beurre prime pressé, naturel ou désodorisé, pour food et soins.",
    },
    overview: [
      {
        en: "Cocoa butter is the pale-yellow fat pressed from cocoa liquor. Ours is prime pressed and filtered, supplied natural for full cocoa character or deodorised for neutral applications in confectionery and cosmetics.",
        fr: "Le beurre de cacao est la matière grasse jaune pâle pressée de la masse de cacao. Le nôtre est pressé prime et filtré, naturel pour le plein caractère cacao ou désodorisé pour les applications neutres en confiserie et cosmétique.",
      },
      {
        en: "Packed in food-grade cartons for container shipment, with melt point, free fatty acids and moisture confirmed per lot.",
        fr: "Conditionné en cartons alimentaires pour expédition conteneur, avec point de fusion, acidité et humidité confirmés par lot.",
      },
    ],
    history: [
      {
        en: "Invented with the cocoa press in 1828, cocoa butter made modern chocolate possible — and its sharp melt just below body temperature made it equally prized in ointments and skincare, where it remains a premium emollient today.",
        fr: "Inventé avec la presse à cacao en 1828, le beurre de cacao a rendu le chocolat moderne possible — et sa fusion nette juste sous la température du corps en a fait aussi un ingrédient prisé des pommades et soins, où il reste un émollient premium.",
      },
    ],
    uses: [
      {
        title: { en: "Confectionery", fr: "Confiserie" },
        text: {
          en: "Chocolate tempering, coatings, centres and bakery fats.",
          fr: "Tempérage du chocolat, enrobages, centres et matières boulangères.",
        },
      },
      {
        title: { en: "Skincare & cosmetics", fr: "Soins et cosmétique" },
        text: {
          en: "Butters, balms, soaps and emollient bases for formulators and labs.",
          fr: "Beurres, baumes, savons et bases émollientes pour formulateurs et labos.",
        },
      },
      {
        title: { en: "Pharmaceutical bases", fr: "Bases pharmaceutiques" },
        text: {
          en: "Suppository and ointment bases within pharma-grade specs on request.",
          fr: "Bases de suppositoires et pommades selon specs pharma sur demande.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Type", fr: "Type" },
        value: { en: "Prime pressed; natural or deodorised", fr: "Pressé prime ; naturel ou désodorisé" },
      },
      {
        label: { en: "Melt point", fr: "Point de fusion" },
        value: { en: "Approx. 32–35 °C, confirmed per lot", fr: "Env. 32–35 °C, confirmé par lot" },
      },
      {
        label: { en: "Free fatty acids", fr: "Acidité" },
        value: { en: "Within prime-butter limits, confirmed per lot", fr: "Dans les limites prime, confirmé par lot" },
      },
      {
        label: { en: "Moisture", fr: "Humidité" },
        value: { en: "Low, confirmed per lot", fr: "Basse, confirmée par lot" },
      },
      {
        label: { en: "Packaging", fr: "Conditionnement" },
        value: { en: "Food-grade cartons (20–25 kg), container loaded", fr: "Cartons alimentaires (20–25 kg), chargés en conteneur" },
      },
    ],
    quality: [
      {
        en: "Butter is solid at ambient temperature but melts in heat: ship and store cool, away from strong odours. Deodorised grade is recommended for warm-climate cosmetics supply chains.",
        fr: "Le beurre est solide à température ambiante mais fond à la chaleur : expédier et stocker au frais, à l’abri des odeurs fortes. Le grade désodorisé est recommandé pour les chaînes cosmétiques en climat chaud.",
      },
    ],
    packaging: [
      {
        en: "20–25 kg food-grade cartons with inner liner.",
        fr: "Cartons alimentaires 20–25 kg avec doublure intérieure.",
      },
      {
        en: "Reefer or ventilated containers on request for hot-season routes.",
        fr: "Conteneurs frigorifiques ou ventilés sur demande pour routes en saison chaude.",
      },
      {
        en: "Palletised, shrink-wrapped and lot-coded for traceability.",
        fr: "Palettisé, filmé et codé par lot pour traçabilité.",
      },
    ],
    buyers: [
      {
        title: { en: "Confectionery houses", fr: "Confiseurs" },
        text: { en: "Chocolate and coating plants buying prime butter by the container.", fr: "Chocolateries et usines d’enrobage achetant au conteneur." },
      },
      {
        title: { en: "Cosmetic brands & labs", fr: "Marques cosmétiques et labos" },
        text: { en: "Skincare formulators needing consistent, low-odour butter.", fr: "Formulateurs soins exigeant un beurre régulier et peu odorant." },
      },
      {
        title: { en: "Distributors", fr: "Distributeurs" },
        text: { en: "Food-ingredient wholesalers serving regional makers.", fr: "Grossistes en ingrédients au service des fabricants régionaux." },
      },
    ],
    faqs: [
      {
        q: { en: "Natural or deodorised?", fr: "Naturel ou désodorisé ?" },
        a: {
          en: "Both are available. Natural keeps cocoa aroma for chocolate; deodorised is neutral for white coatings and cosmetics.",
          fr: "Les deux sont disponibles. Le naturel garde l’arôme cacao ; le désodorisé est neutre pour enrobages blancs et cosmétique.",
        },
      },
      {
        q: { en: "How is it shipped in hot weather?", fr: "Comment est-il expédié par temps chaud ?" },
        a: {
          en: "In lined cartons, container loaded; reefer or ventilated options are quoted on request for hot-season routes.",
          fr: "En cartons doublés, chargé en conteneur ; options frigorifiques ou ventilées cotées sur demande pour saison chaude.",
        },
      },
      {
        q: { en: "What documents come with it?", fr: "Quels documents l’accompagnent ?" },
        a: {
          en: "Certificate of analysis per lot plus phytosanitary, certificate of origin and bill of lading.",
          fr: "Certificat d’analyse par lot plus phytosanitaire, certificat d’origine et connaissement.",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "cocoa-nibs",
    category: "cocoa",
    image: file("Cocoa_Nibs_in_Bowl.jpg"),
    imageAlt: {
      en: "Bowl of crushed cocoa nibs",
      fr: "Bol de nibs de cacao concassés",
    },
    credit: "Ll1324",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Cocoa_Nibs_in_Bowl.jpg",
    license: "CC0",
    name: { en: "Cocoa Nibs", fr: "Nibs de cacao" },
    tagline: {
      en: "Crushed kernel with minimal shell — ready for grinding or craft lines.",
      fr: "Amande concassée à coques minimales — prête pour broyage ou lignes artisanales.",
    },
    overview: [
      {
        en: "Nibs are roasted (or raw, on request) cocoa kernels broken after winnowing, with shell content kept to a minimum. They are the direct step before grinding into liquor — and a finished ingredient for craft makers.",
        fr: "Les nibs sont des amandes torréfiées (ou crues, sur demande) concassées après décorticage, à teneur minimale en coques. Étape directe avant broyage en masse — et ingrédient fini pour artisans.",
      },
      {
        en: "Supplied in vacuum or lined cartons and bags for container shipment, with roast profile and sizing agreed per order.",
        fr: "Fournis en cartons ou sacs sous vide ou doublés pour expédition conteneur, avec profil de torréfaction et calibre convenus par commande.",
      },
    ],
    history: [
      {
        en: "Nibs predate industrial chocolate: Mesoamerican drinkers ground roasted kernels with stone tools centuries ago. The craft-chocolate revival made single-origin nibs a premium ingredient again — for grinding, brewing and inclusions.",
        fr: "Les nibs précèdent le chocolat industriel : les Mésoaméricains broyaient déjà les amandes torréfiées à la pierre il y a des siècles. Le renouveau du chocolat artisanal en a refait un ingrédient premium — pour broyage, brassage et inclusions.",
      },
    ],
    uses: [
      {
        title: { en: "Craft chocolate", fr: "Chocolat artisanal" },
        text: {
          en: "Bean-to-bar grinding, single-origin bars and couvertures.",
          fr: "Broyage bean-to-bar, tablettes mono-origine et couvertures.",
        },
      },
      {
        title: { en: "Bakery & inclusions", fr: "Boulangerie et inclusions" },
        text: {
          en: "Cookies, granola, ice-cream and snack inclusions with cocoa crunch.",
          fr: "Cookies, granola, glaces et inclusions croquantes au cacao.",
        },
      },
      {
        title: { en: "Brewing & distilling", fr: "Brassage et distillation" },
        text: {
          en: "Stouts, liqueurs and botanical spirits with cocoa depth.",
          fr: "Stouts, liqueurs et spiritueux botaniques au fond cacao.",
        },
      },
      {
        title: { en: "Retail packing", fr: "Conditionnement détail" },
        text: {
          en: "Pouches of roasted nibs for health-food and specialty shelves.",
          fr: "Sachets de nibs torréfiés pour rayons diététiques et spécialisés.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Form", fr: "Forme" },
        value: { en: "Broken kernel; roast profile agreed per order", fr: "Amande concassée ; torréfaction convenue par commande" },
      },
      {
        label: { en: "Shell content", fr: "Teneur en coques" },
        value: { en: "Minimal, confirmed per lot", fr: "Minimale, confirmée par lot" },
      },
      {
        label: { en: "Moisture", fr: "Humidité" },
        value: { en: "Low and stable, confirmed per lot", fr: "Basse et stable, confirmée par lot" },
      },
      {
        label: { en: "Packaging", fr: "Conditionnement" },
        value: { en: "Vacuum or lined cartons / bags", fr: "Cartons / sacs sous vide ou doublés" },
      },
      {
        label: { en: "Loading", fr: "Chargement" },
        value: { en: "Full containers; tonnage confirmed per lot", fr: "Conteneurs complets ; tonnage confirmé par lot" },
      },
    ],
    quality: [
      {
        en: "Nibs pick up odours and moisture fast: keep sealed, cool and dry. Vacuum packing is recommended for long routes and craft-grade lots.",
        fr: "Les nibs absorbent vite odeurs et humidité : garder scellé, au frais et au sec. Le sous-vide est recommandé pour longues routes et lots craft.",
      },
    ],
    packaging: [
      {
        en: "Vacuum packs, lined cartons or food-grade bags to buyer spec.",
        fr: "Sous-vide, cartons doublés ou sacs alimentaires selon spec acheteur.",
      },
      {
        en: "Private-label pouches available for contracted retail volumes.",
        fr: "Sachets marque privée pour volumes détail contractés.",
      },
      {
        en: "Container loaded with moisture protection on request.",
        fr: "Chargé en conteneur avec protection humidité sur demande.",
      },
    ],
    buyers: [
      {
        title: { en: "Bean-to-bar makers", fr: "Artisans bean-to-bar" },
        text: { en: "Craft chocolate houses buying traceable, low-shell nibs.", fr: "Chocolateries artisanales achetant des nibs traçables et propres." },
      },
      {
        title: { en: "Food manufacturers", fr: "Industriels food" },
        text: { en: "Bakery, snack and ice-cream lines using nib inclusions.", fr: "Lignes boulangerie, snack et glaces utilisant des inclusions." },
      },
      {
        title: { en: "Brewers & distillers", fr: "Brasseurs et distillateurs" },
        text: { en: "Drinks makers building cocoa character into product.", fr: "Boissonniers apportant du caractère cacao au produit." },
      },
    ],
    faqs: [
      {
        q: { en: "Raw or roasted?", fr: "Crus ou torréfiés ?" },
        a: {
          en: "Roasted is standard; raw nibs and custom roast profiles are available on request.",
          fr: "Torréfiés en standard ; crus et profils sur mesure disponibles sur demande.",
        },
      },
      {
        q: { en: "What shell level can you guarantee?", fr: "Quel taux de coques garantissez-vous ?" },
        a: {
          en: "Shell content is minimised by winnowing and confirmed per lot — state your limit in the inquiry.",
          fr: "Minimisé par décorticage et confirmé par lot — indiquez votre limite dans la demande.",
        },
      },
      {
        q: { en: "Do you do retail pouches?", fr: "Faites-vous des sachets détail ?" },
        a: {
          en: "Yes for contracted container volumes, with private labelling available.",
          fr: "Oui pour volumes conteneur contractés, avec marque privée disponible.",
        },
      },
    ],
  },
  {
    slug: "cocoa-cake",
    category: "cocoa",
    image: file("Cocoa-powder-1883108.jpg"),
    imageAlt: {
      en: "Bowl of milled cocoa powder from press cake",
      fr: "Bol de poudre de cacao issue du tourteau",
    },
    credit: "thecakeschool",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Cocoa-powder-1883108.jpg",
    license: "CC0",
    name: { en: "Cocoa Cake", fr: "Tourteau de cacao" },
    tagline: {
      en: "Semi-pressed cake from butter extraction — for drinks, baking and feed.",
      fr: "Tourteau semi-pressé issu de l’extraction du beurre — pour boissons, boulangerie et aliments.",
    },
    overview: [
      {
        en: "After part of the butter is pressed out of cocoa liquor, the remaining solids form press cake — milled into powder for beverages and bakery, or used directly in feed compounding.",
        fr: "Après extraction partielle du beurre de la masse, les solides restants forment le tourteau — moulu en poudre pour boissons et boulangerie, ou utilisé direct en aliments composés.",
      },
      {
        en: "Supplied in food-grade bags for container shipment, with residual butter content and fineness agreed per order.",
        fr: "Fourni en sacs alimentaires pour expédition conteneur, avec teneur résiduelle en beurre et finesse convenues par commande.",
      },
    ],
    history: [
      {
        en: "Press cake is as old as the cocoa press itself: once butter became valuable for chocolate and cosmetics, the leftover cake became the world’s cocoa powder — the base of drinking chocolate, bakery mixes and compound coatings.",
        fr: "Le tourteau est aussi vieux que la presse à cacao : une fois le beurre valorisé pour chocolat et cosmétique, le tourteau restant est devenu la poudre de cacao mondiale — base du chocolat à boire, des mix boulangers et des enrobages composés.",
      },
    ],
    uses: [
      {
        title: { en: "Beverages", fr: "Boissons" },
        text: {
          en: "Drinking chocolate, malted drinks and instant cocoa mixes.",
          fr: "Chocolat à boire, boissons maltées et mix instantanés.",
        },
      },
      {
        title: { en: "Bakery", fr: "Boulangerie" },
        text: {
          en: "Cakes, biscuits and fillings needing deep cocoa colour and flavour.",
          fr: "Gâteaux, biscuits et fourrages exigeant couleur et goût cacao intenses.",
        },
      },
      {
        title: { en: "Animal feed", fr: "Alimentation animale" },
        text: {
          en: "Protein-bearing ingredient for compounders within regulated limits.",
          fr: "Ingrédient protéique pour fabricants dans les limites réglementées.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Form", fr: "Forme" },
        value: { en: "Press cake / milled powder, fineness agreed per order", fr: "Tourteau / poudre moulue, finesse convenue par commande" },
      },
      {
        label: { en: "Residual butter", fr: "Beurre résiduel" },
        value: { en: "10–22% range typical, confirmed per lot", fr: "Fourchette typique 10–22 %, confirmée par lot" },
      },
      {
        label: { en: "Moisture", fr: "Humidité" },
        value: { en: "Low, confirmed per lot", fr: "Basse, confirmée par lot" },
      },
      {
        label: { en: "Packaging", fr: "Conditionnement" },
        value: { en: "25–50 kg food-grade bags", fr: "Sacs alimentaires 25–50 kg" },
      },
      {
        label: { en: "Loading", fr: "Chargement" },
        value: { en: "Full containers; tonnage confirmed per lot", fr: "Conteneurs complets ; tonnage confirmé par lot" },
      },
    ],
    quality: [
      {
        en: "Keep sealed and dry; ground cake absorbs moisture and odours. Food-grade lots ship in lined bags with lot coding.",
        fr: "Garder scellé et au sec ; le tourteau moulu absorbe humidité et odeurs. Les lots alimentaires voyagent en sacs doublés codés par lot.",
      },
    ],
    packaging: [
      {
        en: "25–50 kg multi-wall food-grade bags with inner liner.",
        fr: "Sacs alimentaires multicouches 25–50 kg avec doublure.",
      },
      {
        en: "Palletised and shrink-wrapped for container loading.",
        fr: "Palettisé et filmé pour chargement conteneur.",
      },
      {
        en: "Bulk cake slabs available for grinders on request.",
        fr: "Tourteaux bruts en vrac pour broyeurs sur demande.",
      },
    ],
    buyers: [
      {
        title: { en: "Beverage makers", fr: "Boissonniers" },
        text: { en: "Drinks plants milling cake into cocoa beverages and mixes.", fr: "Usines de boissons moulant le tourteau en boissons et mix." },
      },
      {
        title: { en: "Bakeries & biscuit plants", fr: "Boulangeries et biscuiteries" },
        text: { en: "Industrial bakers needing strong cocoa colour and flavour.", fr: "Boulangers industriels exigeant couleur et goût intenses." },
      },
      {
        title: { en: "Feed compounders", fr: "Fabricants d’aliments" },
        text: { en: "Mills formulating rations within theobromine regulations.", fr: "Usines formulant dans les limites de théobromine." },
      },
    ],
    faqs: [
      {
        q: { en: "What fat content do you supply?", fr: "Quelle teneur en matière grasse ?" },
        a: {
          en: "Residual butter typically 10–22%, confirmed per lot — state your target in the inquiry.",
          fr: "Beurre résiduel typiquement 10–22 %, confirmé par lot — indiquez votre cible dans la demande.",
        },
      },
      {
        q: { en: "Cake or pre-milled powder?", fr: "Tourteau ou poudre prémoulue ?" },
        a: {
          en: "Both. Grinders often take cake slabs; beverage and bakery lines usually take milled powder.",
          fr: "Les deux. Les broyeurs prennent souvent le tourteau brut ; boissons et boulangerie plutôt la poudre moulue.",
        },
      },
      {
        q: { en: "Is it food grade?", fr: "Est-il de qualité alimentaire ?" },
        a: {
          en: "Food-grade packing and handling for beverage and bakery use; feed-grade streams are quoted separately.",
          fr: "Conditionnement et manutention alimentaires pour boissons et boulangerie ; filières feed cotées séparément.",
        },
      },
    ],
  },
  {
    slug: "cocoa-potash",
    category: "cocoa",
    image: file("Dried_Cacao_Pod_Held_in_Hand.jpg"),
    imageAlt: {
      en: "Dried cacao pod husk, the source of cocoa potash",
      fr: "Cabosse séchée, source de la potasse de cacao",
    },
    credit: "Siarhei Besarab",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Dried_Cacao_Pod_Held_in_Hand.jpg",
    license: "CC BY-SA 4.0",
    name: { en: "Cocoa Potash", fr: "Potasse de cacao" },
    tagline: {
      en: "Traditional pod-husk ash for soap, soil and heritage foods.",
      fr: "Cendre traditionnelle de cabosses pour savon, sols et mets patrimoniaux.",
    },
    overview: [
      {
        en: "Cocoa potash is the ash of dried cocoa pod husks — a traditional alkaline ingredient used in West African soft soap (alata samina / ose dudu), as a soil amendment, and in heritage dishes where it tenderises and seasons.",
        fr: "La potasse de cacao est la cendre de cabosses séchées — un ingrédient alcalin traditionnel du savon mou ouest-africain (alata samina / ose dudu), amendement des sols et ingrédient de mets patrimoniaux qu’elle attendrit et assaisonne.",
      },
      {
        en: "Supplied dried, sieved and bagged in container quantities for soap makers, agro-input blenders and food distributors.",
        fr: "Fournie séchée, tamisée et ensachée en quantités conteneur pour savonniers, mélangeurs d’intrants et distributeurs food.",
      },
    ],
    history: [
      {
        en: "Long before industrial lye, pod-husk ash was the alkali of West African soap and cooking — every harvest’s empty husks became next season’s soap and fertiliser. Industrial and organic buyers now source it as a natural, traceable alkaline input.",
        fr: "Bien avant la soude industrielle, la cendre de cabosses était l’alcali du savon et de la cuisine ouest-africaine — les coques vides de chaque récolte devenaient le savon et l’engrais de la saison suivante. Industriels et bio s’y approvisionnent aujourd’hui comme intrant alcalin naturel et traçable.",
      },
    ],
    uses: [
      {
        title: { en: "Organic soap making", fr: "Savonnerie bio" },
        text: {
          en: "Alkali base for traditional soft and black soaps.",
          fr: "Base alcaline des savons mous et noirs traditionnels.",
        },
      },
      {
        title: { en: "Fertiliser & soil", fr: "Engrais et sols" },
        text: {
          en: "Potassium-rich ash for organic soil programmes.",
          fr: "Cendre riche en potassium pour programmes de sols bio.",
        },
      },
      {
        title: { en: "Heritage foods", fr: "Mets patrimoniaux" },
        text: {
          en: "Tenderiser and seasoning in traditional dishes, food-grade lots only.",
          fr: "Attendrisseur et assaisonnement de plats traditionnels, lots alimentaires uniquement.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Source", fr: "Source" },
        value: { en: "Dried cocoa pod husks, ashed and sieved", fr: "Cabosses séchées, calcinées et tamisées" },
      },
      {
        label: { en: "Form", fr: "Forme" },
        value: { en: "Fine ash / lumps per buyer spec", fr: "Cendre fine / morceaux selon spec acheteur" },
      },
      {
        label: { en: "Grade", fr: "Grade" },
        value: { en: "Food-grade and technical grades, confirmed per lot", fr: "Grades alimentaire et technique, confirmés par lot" },
      },
      {
        label: { en: "Packaging", fr: "Conditionnement" },
        value: { en: "25–50 kg lined bags", fr: "Sacs doublés 25–50 kg" },
      },
      {
        label: { en: "Loading", fr: "Chargement" },
        value: { en: "Full containers; tonnage confirmed per lot", fr: "Conteneurs complets ; tonnage confirmé par lot" },
      },
    ],
    quality: [
      {
        en: "Ash must stay bone-dry: it cakes and loses strength with moisture. Food-grade lots are prepared and packed separately from technical grades.",
        fr: "La cendre doit rester parfaitement sèche : elle durcit et perd sa force à l’humidité. Les lots alimentaires sont préparés et ensachés séparément des grades techniques.",
      },
    ],
    packaging: [
      {
        en: "25–50 kg moisture-proof lined bags.",
        fr: "Sacs doublés anti-humidité 25–50 kg.",
      },
      {
        en: "Food-grade and technical streams packed and labelled separately.",
        fr: "Filières alimentaire et technique ensachées et étiquetées séparément.",
      },
      {
        en: "Palletised container loading with desiccant protection.",
        fr: "Chargement palettisé avec protection déshydratante.",
      },
    ],
    buyers: [
      {
        title: { en: "Soap manufacturers", fr: "Savonniers" },
        text: { en: "Makers of traditional soft, black and organic soaps.", fr: "Fabricants de savons mous, noirs et bio traditionnels." },
      },
      {
        title: { en: "Agro-input blenders", fr: "Mélangeurs d’intrants" },
        text: { en: "Organic fertiliser and soil-conditioner producers.", fr: "Producteurs d’engrais bio et d’amendements." },
      },
      {
        title: { en: "Food distributors", fr: "Distributeurs food" },
        text: { en: "Suppliers of heritage ingredients, food-grade lots only.", fr: "Fournisseurs d’ingrédients patrimoniaux, lots alimentaires uniquement." },
      },
    ],
    faqs: [
      {
        q: { en: "Food grade or technical?", fr: "Alimentaire ou technique ?" },
        a: {
          en: "Both are available and packed separately — state your end use so we quote the right grade.",
          fr: "Les deux existent et sont ensachés séparément — indiquez votre usage pour le bon grade.",
        },
      },
      {
        q: { en: "How should it be stored?", fr: "Comment la stocker ?" },
        a: {
          en: "Sealed, off-ground and completely dry. Once damp, potash cakes and weakens.",
          fr: "Scellée, sur palettes et au sec absolu. Humide, la potasse durcit et s’affaiblit.",
        },
      },
      {
        q: { en: "What is the minimum order?", fr: "Quelle est la commande minimum ?" },
        a: {
          en: "One full container, like all HB33 products — bulk orders only.",
          fr: "Un conteneur complet, comme tous les produits HB33 — vrac uniquement.",
        },
      },
    ],
  },
  {
    slug: "soybeans",
    category: "oilseeds",
    image: file("Multi_colored_soybeans.jpg"),
    imageAlt: {
      en: "Soybean seeds spilling from an envelope",
      fr: "Graines de soja versées d’une enveloppe",
    },
    credit: "Scott Bauer, U.S. Department of Agriculture",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Multi_colored_soybeans.jpg",
    license: "Public domain",
    name: { en: "Soybeans", fr: "Soja en grains" },
    tagline: {
      en: "Protein-rich oilseeds for crushers, feed mills and food makers.",
      fr: "Graines protéagineuses pour triturateurs, usines d’aliments et food.",
    },
    overview: [
      {
        en: "Our soybeans are cleaned, dried and graded for bulk shipment — destined for oil crushing, protein meal and direct food use. Every lot is checked for moisture, admixture and damage before container loading.",
        fr: "Notre soja est nettoyé, séché et calibré pour expédition vrac — pour trituration, tourteaux protéiques et usage alimentaire direct. Chaque lot est contrôlé en humidité, impuretés et grains endommagés avant chargement.",
      },
      {
        en: "Supplied in bulk or bagged in full containers, with specifications confirmed per lot and inspection available before shipment.",
        fr: "Fourni en vrac ou ensaché en conteneurs complets, spécifications confirmées par lot et inspection possible avant expédition.",
      },
    ],
    history: [
      {
        en: "Soy (Glycine max) was domesticated in East Asia thousands of years ago and became a global commodity in the 20th century: roughly four-fifths of every bean goes to animal feed as meal after crushing, with the oil serving food, biodiesel and industry — making dependable bulk supply critical for crushers everywhere.",
        fr: "Le soja (Glycine max), domestiqué en Asie orientale il y a des millénaires, est devenu une matière mondiale au XXe siècle : environ quatre cinquièmes de chaque graine partent en alimentation animale après trituration, l’huile servant au food, au biodiesel et à l’industrie — d’où l’importance d’un approvisionnement vrac fiable.",
      },
    ],
    uses: [
      {
        title: { en: "Oil crushing", fr: "Trituration" },
        text: {
          en: "Refined oil for food, frying and industrial applications.",
          fr: "Huile raffinée pour food, friture et applications industrielles.",
        },
      },
      {
        title: { en: "Protein meal", fr: "Tourteaux protéiques" },
        text: {
          en: "High-protein meal for poultry, aqua and livestock feed.",
          fr: "Tourteaux riches en protéines pour volailles, aquaculture et bétail.",
        },
      },
      {
        title: { en: "Food manufacturing", fr: "Industrie alimentaire" },
        text: {
          en: "Tofu, soymilk, textured protein and flour streams.",
          fr: "Tofu, jus de soja, protéines texturées et farines.",
        },
      },
      {
        title: { en: "Full-fat feed", fr: "Aliments full-fat" },
        text: {
          en: "Extruded full-fat beans for energy-dense rations.",
          fr: "Graines extrudées pour rations à haute densité énergétique.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Type", fr: "Type" },
        value: { en: "Natural soybeans, cleaned and graded", fr: "Soja naturel, nettoyé et calibré" },
      },
      {
        label: { en: "Moisture", fr: "Humidité" },
        value: { en: "≤ 13% typical, confirmed per lot", fr: "≤ 13 % typique, confirmé par lot" },
      },
      {
        label: { en: "Protein / oil", fr: "Protéines / huile" },
        value: { en: "Indicative, confirmed per lot by analysis", fr: "Indicatifs, confirmés par lot sur analyse" },
      },
      {
        label: { en: "Admixture / damage", fr: "Impuretés / grains endommagés" },
        value: { en: "Within merchantable limits, confirmed per lot", fr: "Dans les limites marchandes, confirmé par lot" },
      },
      {
        label: { en: "Packaging", fr: "Conditionnement" },
        value: { en: "Bulk, big-bags or 50 kg PP bags", fr: "Vrac, big-bags ou sacs PP 50 kg" },
      },
      {
        label: { en: "Loading", fr: "Chargement" },
        value: { en: "Full containers; tonnage confirmed per lot", fr: "Conteneurs complets ; tonnage confirmé par lot" },
      },
    ],
    quality: [
      {
        en: "Soybeans must ship dry and stay ventilated: heat plus moisture causes heating, mould and free-fatty-acid rise. Containers are loaded from under-cover stocks with weight and quality tickets.",
        fr: "Le soja doit voyager sec et ventilé : chaleur et humidité provoquent échauffement, moisissures et acidité. Les conteneurs sont chargés depuis des stocks abrités avec tickets de pesée et qualité.",
      },
    ],
    packaging: [
      {
        en: "Loose bulk, 500–1000 kg big-bags, or 50 kg PP bags.",
        fr: "Vrac, big-bags 500–1000 kg ou sacs PP 50 kg.",
      },
      {
        en: "Fumigation and phytosanitary treatment per destination rules.",
        fr: "Fumigation et traitement phytosanitaire selon règles de destination.",
      },
      {
        en: "Container loading supervised with independent inspection on request.",
        fr: "Empotage supervisé avec inspection indépendante sur demande.",
      },
    ],
    buyers: [
      {
        title: { en: "Oil crushers", fr: "Triturateurs" },
        text: { en: "Solvent and mechanical plants running continuous crush.", fr: "Usines continues par solvant ou mécanique." },
      },
      {
        title: { en: "Feed mills", fr: "Usines d’aliments" },
        text: { en: "Compounders buying beans and meal for protein rations.", fr: "Fabricants achetant grains et tourteaux pour rations protéiques." },
      },
      {
        title: { en: "Food processors", fr: "Transformateurs food" },
        text: { en: "Tofu, beverage and textured-protein manufacturers.", fr: "Fabricants de tofu, boissons et protéines texturées." },
      },
    ],
    faqs: [
      {
        q: { en: "GMO or non-GMO?", fr: "OGM ou non-OGM ?" },
        a: {
          en: "State your requirement in the inquiry — availability and documentation are confirmed per lot and destination.",
          fr: "Indiquez votre exigence dans la demande — disponibilité et documentation confirmées par lot et destination.",
        },
      },
      {
        q: { en: "Bulk or bagged?", fr: "Vrac ou ensaché ?" },
        a: {
          en: "Both. Crushers usually take bulk; food and feed bagging lines take big-bags or 50 kg bags.",
          fr: "Les deux. Les triturateurs prennent plutôt le vrac ; les lignes food et aliments plutôt big-bags ou sacs 50 kg.",
        },
      },
      {
        q: { en: "What tonnage fits a container?", fr: "Quel tonnage par conteneur ?" },
        a: {
          en: "It varies with container type and packing — we confirm the exact loading plan with your quote.",
          fr: "Selon type de conteneur et conditionnement — nous confirmons le plan exact avec votre devis.",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "cocopeat",
    category: "growing-media",
    image: file("Coir_pith_industry.jpg"),
    imageAlt: {
      en: "Coconut husk piles at a coir pith processing yard",
      fr: "Tas de bourres de coco dans une unité de tourbe de coco",
    },
    credit: "Rprasanth1",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Coir_pith_industry.jpg",
    license: "CC BY-SA 4.0",
    name: { en: "Cocopeat", fr: "Cocopeat" },
    tagline: {
      en: "Washed, buffered coir pith for growers, nurseries and blenders.",
      fr: "Tourbe de coco lavée et tamponnée pour horticulteurs, pépinières et mélangeurs.",
    },
    overview: [
      {
        en: "Cocopeat (coir pith) is the spongy fibre milled from coconut husks — a renewable, high-retention growing medium for horticulture, hydroponics and nurseries. Ours is washed to control salts and sieved for consistent structure.",
        fr: "Le cocopeat (tourbe de coco) est la fibre spongieuse moulue des bourres de coco — un support renouvelable à haute rétention pour horticulture, hydroponie et pépinières. Le nôtre est lavé pour maîtriser les sels et criblé pour une structure régulière.",
      },
      {
        en: "Pressed into 5 kg blocks, briquettes or loose bags for container shipment — with EC, pH and expansion confirmed per lot.",
        fr: "Pressé en blocs 5 kg, briquettes ou sacs en vrac pour expédition conteneur — avec EC, pH et expansion confirmés par lot.",
      },
    ],
    history: [
      {
        en: "Coir was historically a rope-and-mat fibre while the spongy pith was discarded — until Dutch greenhouse growers in the 1980s–90s proved washed coir pith could outperform peat in slabs and pots. It is now a mainstream professional substrate, valued as peatlands face extraction limits.",
        fr: "La fibre de coco servait historiquement aux cordes et nattes tandis que la tourbe était jetée — jusqu’à ce que les serristes néerlandais des années 1980–90 prouvent que la tourbe lavée surpassait la tourbe blonde en pains et pots. C’est aujourd’hui un substrat professionnel majeur, prisé face aux limites d’extraction des tourbières.",
      },
    ],
    uses: [
      {
        title: { en: "Greenhouse growing", fr: "Cultures sous serre" },
        text: {
          en: "Slabs and grow bags for vegetables, berries and flowers.",
          fr: "Pains et sacs de culture pour légumes, petits fruits et fleurs.",
        },
      },
      {
        title: { en: "Nurseries & propagation", fr: "Pépinières et multiplication" },
        text: {
          en: "Seed trays, plugs and potting mixes with steady moisture.",
          fr: "Plateaux de semis, mottes et terreaux à humidité régulière.",
        },
      },
      {
        title: { en: "Hydroponics", fr: "Hydroponie" },
        text: {
          en: "Buffered, low-EC media for recirculating systems.",
          fr: "Supports tamponnés à faible EC pour systèmes recirculés.",
        },
      },
      {
        title: { en: "Soil blending", fr: "Mélanges de sols" },
        text: {
          en: "Retail and landscape mixes replacing peat fractions.",
          fr: "Terreaux détail et paysage en remplacement de fractions de tourbe.",
        },
      },
    ],
    specs: [
      {
        label: { en: "Material", fr: "Matière" },
        value: { en: "Milled coconut-husk pith, sieved", fr: "Tourbe de bourre de coco moulue, criblée" },
      },
      {
        label: { en: "Treatment", fr: "Traitement" },
        value: { en: "Washed; buffered grades on request", fr: "Lavée ; grades tamponnés sur demande" },
      },
      {
        label: { en: "EC / pH", fr: "EC / pH" },
        value: { en: "Low-EC washed; values confirmed per lot", fr: "Lavée faible EC ; valeurs confirmées par lot" },
      },
      {
        label: { en: "Forms", fr: "Formes" },
        value: { en: "5 kg blocks, 650 g briquettes, loose bags", fr: "Blocs 5 kg, briquettes 650 g, sacs en vrac" },
      },
      {
        label: { en: "Loading", fr: "Chargement" },
        value: { en: "Full containers; palletised, confirmed per lot", fr: "Conteneurs complets ; palettisé, confirmé par lot" },
      },
    ],
    quality: [
      {
        en: "Keep dry until use — compressed blocks wick moisture and swell. Buffered, low-EC grades are recommended for salt-sensitive crops and recirculating hydroponics.",
        fr: "Garder au sec jusqu’à usage — les blocs compressés absorbent et gonflent. Les grades tamponnés faible EC sont recommandés pour cultures sensibles et hydroponie recirculée.",
      },
    ],
    packaging: [
      {
        en: "5 kg compressed blocks, shrink-wrapped and palletised.",
        fr: "Blocs compressés 5 kg, filmés et palettisés.",
      },
      {
        en: "650 g briquettes and discs for retail programmes on request.",
        fr: "Briquettes 650 g et disques pour programmes détail sur demande.",
      },
      {
        en: "Loose-fill bags for blenders, container loaded.",
        fr: "Sacs en vrac pour mélangeurs, chargés en conteneur.",
      },
    ],
    buyers: [
      {
        title: { en: "Commercial growers", fr: "Horticulteurs" },
        text: { en: "Greenhouse vegetable, berry and flower operations.", fr: "Serristes en légumes, petits fruits et fleurs." },
      },
      {
        title: { en: "Nurseries", fr: "Pépinières" },
        text: { en: "Propagation and young-plant producers.", fr: "Producteurs de plants et jeunes pousses." },
      },
      {
        title: { en: "Substrate blenders", fr: "Mélangeurs de substrats" },
        text: { en: "Potting-mix and retail soil brands buying base media.", fr: "Marques de terreaux achetant la matière de base." },
      },
    ],
    faqs: [
      {
        q: { en: "Washed or buffered?", fr: "Lavé ou tamponné ?" },
        a: {
          en: "Washed is standard; calcium-buffered low-EC grades are available for hydroponics and sensitive crops.",
          fr: "Lavé en standard ; grades tamponnés faible EC pour hydroponie et cultures sensibles.",
        },
      },
      {
        q: { en: "Blocks or loose?", fr: "Blocs ou vrac ?" },
        a: {
          en: "Both. Blocks ship dense and expand on site; blenders usually take loose bags.",
          fr: "Les deux. Les blocs voyagent denses et gonflent sur site ; les mélangeurs prennent plutôt le vrac.",
        },
      },
      {
        q: { en: "How much expands from a 5 kg block?", fr: "Quel volume pour un bloc 5 kg ?" },
        a: {
          en: "Expansion varies by compression — typical yields are confirmed per lot with your quote.",
          fr: "L’expansion varie selon compression — rendements typiques confirmés par lot avec votre devis.",
        },
      },
    ],
    featured: true,
  },
];

export const productSlugs = products.map((p) => p.slug);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  const sameCategory = products.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = products.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function categoryProducts(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

/** Slim {slug, localized name} list for form selects. Server-safe. */
export function localizedProductOptions(
  list: Product[],
  locale: Locale,
): { slug: string; name: string }[] {
  return list.map((p) => ({ slug: p.slug, name: t(p.name, locale) }));
}
