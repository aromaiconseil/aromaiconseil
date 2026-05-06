import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// VOS 98 HUILES ESSENTIELLES — importées depuis votre Excel
// Pour modifier une huile : trouvez-la par son nom et changez les valeurs
// Pour en ajouter une : copiez-collez un bloc et remplissez les infos
// ═══════════════════════════════════════════════════════════════

const OILS = [
  {
    id: "ravintsara",
    name: "Ravintsara",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 2.95,
    volume: "10 ML",
    description: "Antiviral, immunité, fatigue, grippe, zona",
    uses: ["Antiviral", "immunité", "fatigue", "grippe", "zona"],
    contraindications: [],
    inStock: true,
    tags: ["immunité", "énergie"],
  },
  {
    id: "romarin_officinalis_a_cineole",
    name: "Romarin Officinalis à cinéole",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 3.6,
    volume: "10 ML",
    description: "Stimulant cérébral, concentration, circulation",
    uses: ["Stimulant cérébral", "concentration", "circulation"],
    contraindications: [],
    inStock: true,
    tags: ["circulation", "concentration", "énergie"],
  },
  {
    id: "arbre_a_the_tea_tree",
    name: "Arbre à thé (Tea tree)",
    emoji: "🌲",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 2.8,
    volume: "10 ML",
    description: "Antiseptique, antifongique, infections cutanées, acné",
    uses: ["Antiseptique", "antifongique", "infections cutanées", "acné"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "immunité"],
  },
  {
    id: "lavande_aspic",
    name: "Lavande Aspic",
    emoji: "💜",
    color: "#7c6b9e",
    bg: "#f5f0ff",
    family: "Florale",
    price: 2.8,
    volume: "10 ML",
    description: "Brûlures, piqûres, anti-infectieux cutané",
    uses: ["Brûlures", "piqûres", "anti-infectieux cutané"],
    contraindications: [],
    inStock: true,
    tags: ["peau"],
  },
  {
    id: "lavande_vraie",
    name: "Lavande Vraie",
    emoji: "💜",
    color: "#7c6b9e",
    bg: "#f5f0ff",
    family: "Florale",
    price: 3.85,
    volume: "10 ML",
    description: "Relaxation, insomnie, anxiété, brûlures légères",
    uses: ["Relaxation", "insomnie", "anxiété", "brûlures légères"],
    contraindications: [],
    inStock: true,
    tags: ["sommeil", "stress"],
  },
  {
    id: "gaultherie_couchee",
    name: "Gaulthérie couchée",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 4.8,
    volume: "10 ML",
    description: "Douleurs musculaires et articulaires, anti-inflammatoire",
    uses: ["Douleurs musculaires et articulaires", "anti-inflammatoire"],
    contraindications: ["Ne pas diffuser."],
    inStock: true,
    tags: ["douleurs"],
  },
  {
    id: "helichryse_italienne_immortelle",
    name: "Hélichryse italienne (immortelle)",
    emoji: "🌻",
    color: "#d4a82a",
    bg: "#fffdf0",
    family: "Florale",
    price: 31.0,
    volume: "10 ML",
    description: "Hématomes, cicatrices, anti-âge, inflammation",
    uses: ["Hématomes", "cicatrices", "anti-âge", "inflammation"],
    contraindications: [],
    inStock: true,
    tags: ["peau"],
  },
  {
    id: "eucalyptus_citronne",
    name: "Eucalyptus citronné",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 2.65,
    volume: "10 ML",
    description: "Anti-inflammatoire articulaire, arthrose, répulsif insectes",
    uses: ["Anti-inflammatoire articulaire", "arthrose", "répulsif insectes"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "insectes"],
  },
  {
    id: "eucalyptus_globulus",
    name: "Eucalyptus Globulus",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 2.3,
    volume: "10 ML",
    description: "Bronchites, rhumes, antiseptique respiratoire",
    uses: ["Bronchites", "rhumes", "antiseptique respiratoire"],
    contraindications: [],
    inStock: true,
    tags: ["immunité", "respiration"],
  },
  {
    id: "eucalyptus_menthole",
    name: "Eucalyptus Mentholé",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 3.2,
    volume: "10 ML",
    description: "Sinusite, congestion, refroidissements",
    uses: ["Sinusite", "congestion", "refroidissements"],
    contraindications: [],
    inStock: true,
    tags: ["respiration"],
  },
  {
    id: "eucalyptus_radiata",
    name: "Eucalyptus Radiata",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 3.9,
    volume: "10 ML",
    description: "Antiviral respiratoire, rhume, sinusite, immunité",
    uses: ["Antiviral respiratoire", "rhume", "sinusite", "immunité"],
    contraindications: [],
    inStock: true,
    tags: ["immunité", "respiration"],
  },
  {
    id: "geranium_bourbon",
    name: "Géranium Bourbon",
    emoji: "🌺",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale herbacée",
    price: 9.75,
    volume: "10 ML",
    description: "Équilibre hormonal, peau, cicatrisant",
    uses: ["Équilibre hormonal", "peau", "cicatrisant"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "peau"],
  },
  {
    id: "geranium_rosat",
    name: "Géranium rosat",
    emoji: "🌺",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale herbacée",
    price: 4.95,
    volume: "10 ML",
    description: "Anxiété, équilibre hormonal, antifongique, ménopause",
    uses: ["Anxiété", "équilibre hormonal", "antifongique", "ménopause"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "stress", "immunité"],
  },
  {
    id: "camomille_romaine_noble",
    name: "Camomille Romaine (Noble)",
    emoji: "🌼",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 19.95,
    volume: "10 ML",
    description: "Stress intense, nervosité, insomnie, anti-inflammatoire",
    uses: ["Stress intense", "nervosité", "insomnie", "anti-inflammatoire"],
    contraindications: [],
    inStock: true,
    tags: ["sommeil", "stress", "douleurs"],
  },
  {
    id: "camomille_allemande_matricaire",
    name: "Camomille Allemande (Matricaire)",
    emoji: "🌼",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 39.4,
    volume: "10 ML",
    description: "Inflammation sévère, allergies, eczéma, douleurs",
    uses: ["Inflammation sévère", "allergies", "eczéma", "douleurs"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "douleurs"],
  },
  {
    id: "menthe_poivree",
    name: "Menthe poivrée",
    emoji: "🌱",
    color: "#1a7a4a",
    bg: "#effffa",
    family: "Herbacée",
    price: 3.2,
    volume: "10 ML",
    description: "Nausées, maux de tête, digestion, fatigue, douleurs",
    uses: ["Nausées", "maux de tête", "digestion", "fatigue", "douleurs"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "digestion", "énergie"],
  },
  {
    id: "achillee_millefeuille",
    name: "Achillée millefeuille",
    emoji: "🌼",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 44.5,
    volume: "10 ML",
    description: "Anti-inflammatoire, hémostatique, troubles féminins",
    uses: ["Anti-inflammatoire", "hémostatique", "troubles féminins"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "douleurs"],
  },
  {
    id: "aiguille_de_sapin_de_siberie",
    name: "Aiguille de Sapin de Sibérie",
    emoji: "🌲",
    color: "#3c6b4a",
    bg: "#eef8f0",
    family: "Conifère",
    price: 3.1,
    volume: "10 ML",
    description: "Respiratoire, antiseptique, purifiant air",
    uses: ["Respiratoire", "antiseptique", "purifiant air"],
    contraindications: [],
    inStock: true,
    tags: ["immunité", "respiration"],
  },
  {
    id: "ail",
    name: "Ail",
    emoji: "🧅",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Soufrée",
    price: 9.95,
    volume: "10 ML",
    description: "Antibactérien puissant, cardiovasculaire, antifongique",
    uses: ["Antibactérien puissant", "cardiovasculaire", "antifongique"],
    contraindications: [],
    inStock: true,
    tags: ["immunité"],
  },
  {
    id: "ajowan",
    name: "Ajowan",
    emoji: "🌿",
    color: "#8b2500",
    bg: "#fff5f0",
    family: "Herbacée",
    price: 3.95,
    volume: "10 ML",
    description: "Antifongique puissant, digestif, antiseptique",
    uses: ["Antifongique puissant", "digestif", "antiseptique"],
    contraindications: ["Ne pas mettre dans le bain"],
    inStock: true,
    tags: ["digestion", "immunité"],
  },
  {
    id: "amande_amere",
    name: "Amande amère",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 19.6,
    volume: "10 ML",
    description: "Antispasmodique, sédatif léger (usage limité)",
    uses: ["Antispasmodique", "sédatif léger (usage limité)"],
    contraindications: [],
    inStock: true,
    tags: ["sommeil"],
  },
  {
    id: "amyris",
    name: "Amyris",
    emoji: "🌿",
    color: "#8b6914",
    bg: "#fff8ee",
    family: "Résineuse",
    price: 4.3,
    volume: "10 ML",
    description: "Relaxant, antistress, méditation",
    uses: ["Relaxant", "antistress", "méditation"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "méditation"],
  },
  {
    id: "aneth",
    name: "Aneth",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 4.9,
    volume: "10 ML",
    description: "Digestif, antispasmodique, allaitement (modéré)",
    uses: ["Digestif", "antispasmodique", "allaitement (modéré)"],
    contraindications: ["picto13A utiliser sur une courte durée, à dosage modéré"],
    inStock: true,
    tags: ["digestion"],
  },
  {
    id: "angelique",
    name: "Angélique",
    emoji: "🌿",
    color: "#7c6b9e",
    bg: "#f5f0ff",
    family: "Terreuse",
    price: 39.9,
    volume: "10 ML",
    description: "Anxiété, insomnie, système nerveux (photosensibilisant)",
    uses: ["Anxiété", "insomnie", "système nerveux (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["sommeil", "stress", "photosensibilisant"],
  },
  {
    id: "basilic_ocimum_basilicum",
    name: "Basilic - Ocimum basilicum",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 2.7,
    volume: "10 ML",
    description: "Antispasmodique digestif, stress, migraines",
    uses: ["Antispasmodique digestif", "stress", "migraines"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "digestion"],
  },
  {
    id: "bay_st_thomas",
    name: "Bay St Thomas",
    emoji: "🌿",
    color: "#a07850",
    bg: "#fff5ee",
    family: "Boisée",
    price: 15.7,
    volume: "10 ML",
    description: "Douleurs musculaires, circulatoire, tonifiant",
    uses: ["Douleurs musculaires", "circulatoire", "tonifiant"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "circulation", "énergie"],
  },
  {
    id: "bergamote",
    name: "Bergamote",
    emoji: "🍋",
    color: "#d4b800",
    bg: "#fffee0",
    family: "Agrume",
    price: 6.95,
    volume: "10 ML",
    description: "Dépression, anxiété, équilibre émotionnel (photosensibilisant)",
    uses: ["Dépression", "anxiété", "équilibre émotionnel (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "stress", "humeur"],
  },
  {
    id: "bois_de_ho_bois_de_shiu",
    name: "Bois de Hô (Bois de shiu)",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 3.2,
    volume: "10 ML",
    description: "Antistress, antiviral, tonifiant",
    uses: ["Antistress", "antiviral", "tonifiant"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "immunité", "énergie"],
  },
  {
    id: "bois_de_rose",
    name: "Bois de Rose",
    emoji: "🌹",
    color: "#a07850",
    bg: "#fff5ee",
    family: "Arborée",
    price: 14.5,
    volume: "10 ML",
    description: "Antiviral, peau mature, antistress",
    uses: ["Antiviral", "peau mature", "antistress"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "stress", "immunité"],
  },
  {
    id: "cade",
    name: "Cade",
    emoji: "🌿",
    color: "#a07850",
    bg: "#fff5ee",
    family: "Boisée",
    price: 5.95,
    volume: "10 ML",
    description: "Dermatologie (psoriasis, eczéma, pellicules)",
    uses: ["Dermatologie (psoriasis", "eczéma", "pellicules)"],
    contraindications: [],
    inStock: true,
    tags: ["peau"],
  },
  {
    id: "extrait_naturel_de_grains_de_cafe",
    name: "Extrait Naturel de grains de Café",
    emoji: "☕",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Stimulante",
    price: 19.8,
    volume: "10 ML",
    description: "Stimulant, drainage, anti-cellulite",
    uses: ["Stimulant", "drainage", "anti-cellulite"],
    contraindications: [],
    inStock: true,
    tags: ["circulation", "énergie"],
  },
  {
    id: "cajeput",
    name: "Cajeput",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 3.95,
    volume: "10 ML",
    description: "Antalgique, antiseptique respiratoire, antinévralgique",
    uses: ["Antalgique", "antiseptique respiratoire", "antinévralgique"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "immunité", "respiration"],
  },
  {
    id: "camphrier",
    name: "Camphrier",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 2.9,
    volume: "10 ML",
    description: "Antispasmodique, circulatoire, antalgique (limité)",
    uses: ["Antispasmodique", "circulatoire", "antalgique (limité)"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "circulation"],
  },
  {
    id: "cardamome",
    name: "Cardamome",
    emoji: "🌿",
    color: "#8b2500",
    bg: "#fff5f0",
    family: "Épicée",
    price: 23.5,
    volume: "10 ML",
    description: "Digestif, antispasmodique, aphrodisiaque, nausées",
    uses: ["Digestif", "antispasmodique", "aphrodisiaque", "nausées"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "libido", "digestion"],
  },
  {
    id: "carotte",
    name: "Carotte",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Racine",
    price: 8.85,
    volume: "10 ML",
    description: "Régénérant cutané, foie, anti-âge peau",
    uses: ["Régénérant cutané", "foie", "anti-âge peau"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "digestion", "détox"],
  },
  {
    id: "carvi",
    name: "Carvi",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 4.95,
    volume: "10 ML",
    description: "Ballonnements, spasmes digestifs, aérophagie",
    uses: ["Ballonnements", "spasmes digestifs", "aérophagie"],
    contraindications: [],
    inStock: true,
    tags: ["digestion"],
  },
  {
    id: "graines_de_celeri",
    name: "graines de Céleri",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 5.95,
    volume: "10 ML",
    description: "Drainant, foie-reins, dépuratif (photosensibilisant)",
    uses: ["Drainant", "foie-reins", "dépuratif (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "digestion", "détox"],
  },
  {
    id: "citron",
    name: "Citron",
    emoji: "🍋",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 2.85,
    volume: "10 ML",
    description: "Purification, tonifiant lymphatique, détox (photosensibilisant)",
    uses: ["Purification", "tonifiant lymphatique", "détox (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "détox", "circulation", "énergie"],
  },
  {
    id: "citron_vert",
    name: "Citron vert",
    emoji: "🍋",
    color: "#d4b800",
    bg: "#fffee0",
    family: "Agrume",
    price: 3.95,
    volume: "10 ML",
    description: "Tonifiant, antibactérien, drainant (photosensibilisant)",
    uses: ["Tonifiant", "antibactérien", "drainant (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "détox", "immunité", "énergie"],
  },
  {
    id: "citronnelle",
    name: "Citronnelle",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 2.5,
    volume: "10 ML",
    description: "Répulsif insectes, douleurs musculaires, antifongique",
    uses: ["Répulsif insectes", "douleurs musculaires", "antifongique"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "insectes", "immunité"],
  },
  {
    id: "clementine",
    name: "Clémentine",
    emoji: "🍊",
    color: "#d4b800",
    bg: "#fffee0",
    family: "Agrume",
    price: 4.95,
    volume: "10 ML",
    description: "Relaxant doux, anti-stress, sommeil enfant (photosensibilisant)",
    uses: ["Relaxant doux", "anti-stress", "sommeil enfant (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["enfants", "sommeil", "stress", "photosensibilisant"],
  },
  {
    id: "baume_de_copahu_copa_ba",
    name: "baume de Copahu / Copaïba",
    emoji: "🌿",
    color: "#8b6914",
    bg: "#fff8ee",
    family: "Résineuse",
    price: 3.45,
    volume: "10 ML",
    description: "Anti-inflammatoire, cicatrisant, respiratoire",
    uses: ["Anti-inflammatoire", "cicatrisant", "respiratoire"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "douleurs", "respiration"],
  },
  {
    id: "coriandre",
    name: "Coriandre",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 7.95,
    volume: "10 ML",
    description: "Digestif, antispasmodique, stimulant",
    uses: ["Digestif", "antispasmodique", "stimulant"],
    contraindications: [],
    inStock: true,
    tags: ["digestion", "énergie"],
  },
  {
    id: "criste_marine",
    name: "Criste Marine",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 35.2,
    volume: "10 ML",
    description: "Drainant, circulation, détox",
    uses: ["Drainant", "circulation", "détox"],
    contraindications: [],
    inStock: true,
    tags: ["détox", "circulation"],
  },
  {
    id: "cumin",
    name: "Cumin",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 5.95,
    volume: "10 ML",
    description: "Digestif, carminatif, antispasmodique",
    uses: ["Digestif", "carminatif", "antispasmodique"],
    contraindications: [],
    inStock: true,
    tags: ["digestion"],
  },
  {
    id: "cypres",
    name: "Cyprès",
    emoji: "🌲",
    color: "#3c6b4a",
    bg: "#eef8f0",
    family: "Conifère",
    price: 3.2,
    volume: "10 ML",
    description: "Circulation veineuse, jambes lourdes, ménopause",
    uses: ["Circulation veineuse", "jambes lourdes", "ménopause"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "circulation"],
  },
  {
    id: "davana_artemisia_pallens",
    name: "Davana (Artemisia Pallens)",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Terreuse",
    price: 21.75,
    volume: "10 ML",
    description: "Stress, équilibre émotionnel, mucosités",
    uses: ["Stress", "équilibre émotionnel", "mucosités"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "humeur"],
  },
  {
    id: "elemi_canarium_luzonicum",
    name: "Elémi (Canarium luzonicum)",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 3.95,
    volume: "10 ML",
    description: "Méditation, cicatrisant, respiratoire",
    uses: ["Méditation", "cicatrisant", "respiratoire"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "méditation", "respiration"],
  },
  {
    id: "encens",
    name: "Encens",
    emoji: "🕯️",
    color: "#8b6914",
    bg: "#fff8ee",
    family: "Résineuse",
    price: 8.95,
    volume: "10 ML",
    description: "Anti-inflammatoire, méditation, anxiété, cicatrisant",
    uses: ["Anti-inflammatoire", "méditation", "anxiété", "cicatrisant"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "stress", "douleurs", "méditation"],
  },
  {
    id: "epinette_noire",
    name: "Epinette Noire",
    emoji: "🌲",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 6.95,
    volume: "10 ML",
    description: "Fatigue surrénale, stimulant, cortisone-like",
    uses: ["Fatigue surrénale", "stimulant", "cortisone-like"],
    contraindications: [],
    inStock: true,
    tags: ["énergie"],
  },
  {
    id: "estragon",
    name: "Estragon",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 8.95,
    volume: "10 ML",
    description: "Antispasmodique digestif, anti-allergique",
    uses: ["Antispasmodique digestif", "anti-allergique"],
    contraindications: [],
    inStock: true,
    tags: ["digestion"],
  },
  {
    id: "girofle_giroflier",
    name: "Girofle (Giroflier)",
    emoji: "🌶️",
    color: "#8b2500",
    bg: "#fff5f0",
    family: "Épicée",
    price: 3.85,
    volume: "10 ML",
    description: "Antibactérien, antalgique dentaire, stimulant",
    uses: ["Antibactérien", "antalgique dentaire", "stimulant"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "immunité", "énergie"],
  },
  {
    id: "gingembre",
    name: "Gingembre",
    emoji: "🫚",
    color: "#8b2500",
    bg: "#fff5f0",
    family: "Épicée",
    price: 5.45,
    volume: "10 ML",
    description: "Nausées, digestion, réchauffant, aphrodisiaque, articulations",
    uses: ["Nausées", "digestion", "réchauffant", "aphrodisiaque", "articulations"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "libido", "digestion"],
  },
  {
    id: "helichryse_a_capitules_nus_gymnocephalum",
    name: "Hélichryse à capitules nus (gymnocephalum)",
    emoji: "🌻",
    color: "#d4a82a",
    bg: "#fffdf0",
    family: "Florale",
    price: 5.95,
    volume: "10 ML",
    description: "Anti-inflammatoire, respiratoire, hématomes",
    uses: ["Anti-inflammatoire", "respiratoire", "hématomes"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "douleurs", "respiration"],
  },
  {
    id: "inule_odorante",
    name: "Inule Odorante",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 62.5,
    volume: "10 ML",
    description: "Mucolytique puissant, bronchites chroniques",
    uses: ["Mucolytique puissant", "bronchites chroniques"],
    contraindications: [],
    inStock: true,
    tags: ["respiration"],
  },
  {
    id: "jasmin_grandiflorum",
    name: "Jasmin Grandiflorum",
    emoji: "🌸",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 99.75,
    volume: "10 ML",
    description: "Dépression, anxiété, libido, accouchement",
    uses: ["Dépression", "anxiété", "libido", "accouchement"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "stress", "libido", "humeur"],
  },
  {
    id: "katafray_cedrelopsis_grevei",
    name: "Katafray (Cedrelopsis grevei)",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 5.65,
    volume: "10 ML",
    description: "Anti-inflammatoire, douleurs articulaires",
    uses: ["Anti-inflammatoire", "douleurs articulaires"],
    contraindications: ["A utiliser sur une courte durée"],
    inStock: true,
    tags: ["douleurs"],
  },
  {
    id: "khella",
    name: "Khella",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 17.25,
    volume: "10 ML",
    description: "Bronchospasmes, angines de poitrine (photosensibilisant)",
    uses: ["Bronchospasmes", "angines de poitrine (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "digestion"],
  },
  {
    id: "kunzea",
    name: "Kunzea",
    emoji: "🌿",
    color: "#3c6b4a",
    bg: "#eef8f0",
    family: "Conifère",
    price: 11.9,
    volume: "10 ML",
    description: "Douleurs chroniques, anti-inflammatoire, anxiété",
    uses: ["Douleurs chroniques", "anti-inflammatoire", "anxiété"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "douleurs"],
  },
  {
    id: "laurier_noble",
    name: "Laurier Noble",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 6.2,
    volume: "10 ML",
    description: "Confiance en soi, antifongique, douleurs rhumatismales",
    uses: ["Confiance en soi", "antifongique", "douleurs rhumatismales"],
    contraindications: ["A utiliser sur une courte durée, à dosage modéré"],
    inStock: true,
    tags: ["douleurs", "immunité"],
  },
  {
    id: "lavandin_grosso",
    name: "Lavandin Grosso",
    emoji: "💜",
    color: "#7c6b9e",
    bg: "#f5f0ff",
    family: "Florale",
    price: 2.4,
    volume: "10 ML",
    description: "Douleurs musculaires, relaxant, insomnie légère",
    uses: ["Douleurs musculaires", "relaxant", "insomnie légère"],
    contraindications: [],
    inStock: true,
    tags: ["sommeil", "douleurs"],
  },
  {
    id: "ledon_du_groenland",
    name: "Lédon du Groenland",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 49.8,
    volume: "10 ML",
    description: "Hépato-protecteur, détox foie, anti-infectieux",
    uses: ["Hépato-protecteur", "détox foie", "anti-infectieux"],
    contraindications: [],
    inStock: true,
    tags: ["digestion", "détox"],
  },
  {
    id: "lemongrass",
    name: "Lemongrass",
    emoji: "🌿",
    color: "#d4b800",
    bg: "#fffee0",
    family: "Herbacée",
    price: 2.7,
    volume: "10 ML",
    description: "Anti-inflammatoire, tendinites, tonifiant (photosensibilisant)",
    uses: ["Anti-inflammatoire", "tendinites", "tonifiant (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil pendant 10h après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "douleurs", "énergie"],
  },
  {
    id: "liveche",
    name: "Livèche",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 45.6,
    volume: "10 ML",
    description: "Drainant, détox, stimulant digestif (photosensibilisant)",
    uses: ["Drainant", "détox", "stimulant digestif (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante"],
    inStock: true,
    tags: ["photosensibilisant", "digestion", "détox", "énergie"],
  },
  {
    id: "mandarine",
    name: "Mandarine",
    emoji: "🍊",
    color: "#d4b800",
    bg: "#fffee0",
    family: "Agrume",
    price: 4.6,
    volume: "10 ML",
    description: "Anxiété, insomnie enfant, digestif (photosensibilisant)",
    uses: ["Anxiété", "insomnie enfant", "digestif (photosensibilisant)"],
    contraindications: ["Huile essentielle Photosensibilisante.Ne pas s'exposer au soleil pendant 10h après son utilisation"],
    inStock: true,
    tags: ["enfants", "digestion", "stress", "sommeil", "photosensibilisant"],
  },
  {
    id: "mandravasarotra_saro",
    name: "Mandravasarotra (Saro)",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 4.9,
    volume: "10 ML",
    description: "Antiviral, immunité, respiratoire",
    uses: ["Antiviral", "immunité", "respiratoire"],
    contraindications: [],
    inStock: true,
    tags: ["immunité", "respiration"],
  },
  {
    id: "manuka",
    name: "Manuka",
    emoji: "🌿",
    color: "#2d8c6e",
    bg: "#f0fff8",
    family: "Arborée",
    price: 19.8,
    volume: "10 ML",
    description: "Antiseptique cutané, antifongique, cicatrisant",
    uses: ["Antiseptique cutané", "antifongique", "cicatrisant"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "immunité"],
  },
  {
    id: "marjolaine",
    name: "Marjolaine",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 5.25,
    volume: "10 ML",
    description: "Système nerveux, insomnie, hyperémotivité, douleurs",
    uses: ["Système nerveux", "insomnie", "hyperémotivité", "douleurs"],
    contraindications: ["Ne pas utiliser l'huile essentielle de marjolaine pure sur la peau, à mélanger avec une huile végétale"],
    inStock: true,
    tags: ["sommeil", "stress", "douleurs"],
  },
  {
    id: "melisse",
    name: "Mélisse",
    emoji: "🍃",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 49.75,
    volume: "10 ML",
    description: "Anxiété aiguë, palpitations, antiviral (herpès)",
    uses: ["Anxiété aiguë", "palpitations", "antiviral (herpès)"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "immunité"],
  },
  {
    id: "mimosa",
    name: "Mimosa",
    emoji: "💛",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 23.8,
    volume: "10 ML",
    description: "Dépression, anxiété, émotions, douceur",
    uses: ["Dépression", "anxiété", "émotions", "douceur"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "humeur"],
  },
  {
    id: "myrrhe",
    name: "Myrrhe",
    emoji: "🕯️",
    color: "#8b6914",
    bg: "#fff8ee",
    family: "Résineuse",
    price: 11.95,
    volume: "10 ML",
    description: "Cicatrisant, antifongique, anti-inflammatoire buccal",
    uses: ["Cicatrisant", "antifongique", "anti-inflammatoire buccal"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "douleurs", "immunité"],
  },
  {
    id: "neroli",
    name: "Néroli",
    emoji: "🌸",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 88.0,
    volume: "10 ML",
    description: "Anxiété sévère, insomnie, dépression, anti-âge",
    uses: ["Anxiété sévère", "insomnie", "dépression", "anti-âge"],
    contraindications: [],
    inStock: true,
    tags: ["sommeil", "stress", "humeur", "peau"],
  },
  {
    id: "oignon",
    name: "Oignon",
    emoji: "🧅",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Soufrée",
    price: 49.0,
    volume: "10 ML",
    description: "Antiseptique, antiparasitaire, circulatoire",
    uses: ["Antiseptique", "antiparasitaire", "circulatoire"],
    contraindications: [],
    inStock: true,
    tags: ["circulation", "immunité"],
  },
  {
    id: "origan",
    name: "Origan",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 5.2,
    volume: "10 ML",
    description: "Antibactérien puissant, immunité, infections",
    uses: ["Antibactérien puissant", "immunité", "infections"],
    contraindications: [],
    inStock: true,
    tags: ["immunité"],
  },
  {
    id: "palmarosa",
    name: "Palmarosa",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Florale herbacée",
    price: 2.8,
    volume: "10 ML",
    description: "Antifongique, peau, stress, antiviral",
    uses: ["Antifongique", "peau", "stress", "antiviral"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "stress", "immunité"],
  },
  {
    id: "pamplemousse",
    name: "Pamplemousse",
    emoji: "🍈",
    color: "#d4b800",
    bg: "#fffee0",
    family: "Agrume",
    price: 2.95,
    volume: "10 ML",
    description: "Drainage lymphatique, cellulite, tonifiant (photosensibilisant)",
    uses: ["Drainage lymphatique", "cellulite", "tonifiant (photosensibilisant)"],
    contraindications: ["L'huile essentielle de pamplemousse est photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "circulation", "énergie"],
  },
  {
    id: "patchouli",
    name: "Patchouli",
    emoji: "🌾",
    color: "#7a5a3c",
    bg: "#f8f3ee",
    family: "Terreuse",
    price: 5.95,
    volume: "10 ML",
    description: "Équilibre nerveux, anxiété, cicatrisant, antifongique",
    uses: ["Équilibre nerveux", "anxiété", "cicatrisant", "antifongique"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "stress", "immunité"],
  },
  {
    id: "persil",
    name: "Persil",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Herbacée",
    price: 5.7,
    volume: "10 ML",
    description: "Drainant, régulateur hormonal (usage limité)",
    uses: ["Drainant", "régulateur hormonal (usage limité)"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "détox"],
  },
  {
    id: "petit_grain_bigarade",
    name: "Petit grain Bigarade",
    emoji: "🌸",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Florale herbacée",
    price: 3.95,
    volume: "10 ML",
    description: "Stress, tachycardie, transpiration, antispasmodique",
    uses: ["Stress", "tachycardie", "transpiration", "antispasmodique"],
    contraindications: ["Huile essentielle photosensibilisante.Ne pas s'exposer au soleil après son utilisation"],
    inStock: true,
    tags: ["photosensibilisant", "stress"],
  },
  {
    id: "piment",
    name: "Piment",
    emoji: "🌶️",
    color: "#8b2500",
    bg: "#fff5f0",
    family: "Épicée",
    price: 9.8,
    volume: "10 ML",
    description: "Circulatoire, réchauffant, stimulant (dosage prudent)",
    uses: ["Circulatoire", "réchauffant", "stimulant (dosage prudent)"],
    contraindications: ["Attention à ne pas surdoser"],
    inStock: true,
    tags: ["circulation", "énergie"],
  },
  {
    id: "pin_sylvestre",
    name: "Pin Sylvestre",
    emoji: "🌲",
    color: "#3c6b4a",
    bg: "#eef8f0",
    family: "Conifère",
    price: 3.35,
    volume: "10 ML",
    description: "Fatigue, respiratoire, stimulant cortisone-like, rhumatismes",
    uses: ["Fatigue", "respiratoire", "stimulant cortisone-like", "rhumatismes"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "respiration", "énergie"],
  },
  {
    id: "poivre_noir",
    name: "Poivre Noir",
    emoji: "⚫",
    color: "#3d3d3d",
    bg: "#f5f5f5",
    family: "Épicée",
    price: 7.8,
    volume: "10 ML",
    description: "Circulatoire, douleurs, digestif, réchauffant",
    uses: ["Circulatoire", "douleurs", "digestif", "réchauffant"],
    contraindications: [],
    inStock: true,
    tags: ["circulation", "douleurs", "digestion"],
  },
  {
    id: "pruche_du_canada_tsuga",
    name: "Pruche du Canada (Tsuga)",
    emoji: "🌿",
    color: "#3c6b4a",
    bg: "#eef8f0",
    family: "Conifère",
    price: 29.9,
    volume: "10 ML",
    description: "Respiratoire, antalgique, ancrage émotionnel",
    uses: ["Respiratoire", "antalgique", "ancrage émotionnel"],
    contraindications: [],
    inStock: true,
    tags: ["douleurs", "humeur", "méditation", "respiration"],
  },
  {
    id: "absolue_de_rose_de_damas",
    name: "Absolue de Rose de Damas",
    emoji: "🌹",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 73.6,
    volume: "10 ML",
    description: "Anxiété, deuil, peau mature, anti-âge",
    uses: ["Anxiété", "deuil", "peau mature", "anti-âge"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "stress", "humeur"],
  },
  {
    id: "rose_de_damas",
    name: "Rose de Damas",
    emoji: "🌹",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 196.5,
    volume: "10 ML",
    description: "Deuil, amour de soi, anti-âge, hormones féminines",
    uses: ["Deuil", "amour de soi", "anti-âge", "hormones féminines"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "peau", "humeur"],
  },
  {
    id: "terebenthine",
    name: "Térebenthine",
    emoji: "🌿",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Diverses",
    price: 2.4,
    volume: "10 ML",
    description: "Douleurs rhumatismales, antiseptique cutané",
    uses: ["Douleurs rhumatismales", "antiseptique cutané"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "douleurs", "immunité"],
  },
  {
    id: "thym_a_thujanol",
    name: "Thym à Thujanol",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 19.0,
    volume: "10 ML",
    description: "Antiviral hépatique, fatigue profonde, immunité",
    uses: ["Antiviral hépatique", "fatigue profonde", "immunité"],
    contraindications: [],
    inStock: true,
    tags: ["digestion", "immunité", "énergie"],
  },
  {
    id: "thym_a_thymol",
    name: "Thym à Thymol",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 5.45,
    volume: "10 ML",
    description: "Antibactérien puissant, immunité, infections sévères",
    uses: ["Antibactérien puissant", "immunité", "infections sévères"],
    contraindications: [],
    inStock: true,
    tags: ["immunité"],
  },
  {
    id: "santal",
    name: "Santal",
    emoji: "🪵",
    color: "#a07850",
    bg: "#fff5ee",
    family: "Boisée",
    price: 59.2,
    volume: "10 ML",
    description: "Méditation, anxiété, antistress, anti-âge cutané",
    uses: ["Méditation", "anxiété", "antistress", "anti-âge cutané"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "stress", "méditation"],
  },
  {
    id: "sauge_sclaree",
    name: "Sauge sclarée",
    emoji: "🌿",
    color: "#7c6b9e",
    bg: "#f5f0ff",
    family: "Herbacée",
    price: 4.95,
    volume: "10 ML",
    description: "Hormones féminines, ménopause, antispasmodique",
    uses: ["Hormones féminines", "ménopause", "antispasmodique"],
    contraindications: [],
    inStock: true,
    tags: ["hormones"],
  },
  {
    id: "sarriette_des_montagnes",
    name: "Sarriette des montagnes",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 6.5,
    volume: "10 ML",
    description: "Antibactérien, antifongique, tonus, aphrodisiaque",
    uses: ["Antibactérien", "antifongique", "tonus", "aphrodisiaque"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "libido", "immunité"],
  },
  {
    id: "serpolet",
    name: "Serpolet",
    emoji: "🌿",
    color: "#4a6b50",
    bg: "#f0f8f0",
    family: "Herbacée",
    price: 4.9,
    volume: "10 ML",
    description: "Antiseptique, tonifiant, respiratoire",
    uses: ["Antiseptique", "tonifiant", "respiratoire"],
    contraindications: [],
    inStock: true,
    tags: ["respiration", "immunité", "énergie"],
  },
  {
    id: "valeriane",
    name: "Valériane",
    emoji: "💤",
    color: "#7c6b9e",
    bg: "#f5f0ff",
    family: "Terreuse",
    price: 19.95,
    volume: "10 ML",
    description: "Insomnie sévère, anxiété chronique, sédatif",
    uses: ["Insomnie sévère", "anxiété chronique", "sédatif"],
    contraindications: ["Ne pas utiliser pure sur la peau, à mélanger avec une huile végétale"],
    inStock: true,
    tags: ["sommeil", "stress"],
  },
  {
    id: "arome_naturel_de_vanille",
    name: "Arôme Naturel de Vanille",
    emoji: "🍦",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Gourmande",
    price: 4.75,
    volume: "10 ML",
    description: "Relaxant doux, gourmand, apaisement émotionnel",
    uses: ["Relaxant doux", "gourmand", "apaisement émotionnel"],
    contraindications: [],
    inStock: true,
    tags: ["humeur"],
  },
  {
    id: "oleoresine_de_vanille_vanilla_planifolia",
    name: "Oléorésine de Vanille (Vanilla planifolia)",
    emoji: "🍦",
    color: "#6b8f71",
    bg: "#f3f8f0",
    family: "Gourmande",
    price: 14.5,
    volume: "10 ML",
    description: "Relaxant, anti-stress, confort émotionnel",
    uses: ["Relaxant", "anti-stress", "confort émotionnel"],
    contraindications: [],
    inStock: true,
    tags: ["stress", "humeur"],
  },
  {
    id: "vetiver",
    name: "Vétiver",
    emoji: "🌾",
    color: "#7a5a3c",
    bg: "#f8f3ee",
    family: "Terreuse",
    price: 11.9,
    volume: "10 ML",
    description: "Stress profond, ancrage, burn-out, insomnie",
    uses: ["Stress profond", "ancrage", "burn-out", "insomnie"],
    contraindications: [],
    inStock: true,
    tags: ["sommeil", "stress", "méditation"],
  },
  {
    id: "violette_viola_odorata",
    name: "Violette (Viola odorata)",
    emoji: "💜",
    color: "#7c6b9e",
    bg: "#f5f0ff",
    family: "Florale",
    price: 39.8,
    volume: "10 ML",
    description: "Émotionnel, douceur, anti-âge cutané",
    uses: ["Émotionnel", "douceur", "anti-âge cutané"],
    contraindications: [],
    inStock: true,
    tags: ["peau", "humeur"],
  },
  {
    id: "ylang_ylang",
    name: "Ylang Ylang",
    emoji: "🌺",
    color: "#c4607a",
    bg: "#fff0f5",
    family: "Florale",
    price: 5.95,
    volume: "10 ML",
    description: "Stress, dépression, libido, hypertension, aphrodisiaque",
    uses: ["Stress", "dépression", "libido", "hypertension", "aphrodisiaque"],
    contraindications: [],
    inStock: true,
    tags: ["hormones", "stress", "libido", "humeur"],
  }
];

// ═══════════════════════════════════════════════════════════════
// KITS DE SYNERGIE (12 formules)
// ═══════════════════════════════════════════════════════════════

const KITS = [
  // ── DIFFUSION ──────────────────────────────────────────────
  { id:"nuit_zen", name:"Nuit Zen", emoji:"🌙", price:42,
    mode:"Diffusion atmosphérique", modeEmoji:"💨",
    description:"Synergie favorisant un environnement propice au repos et à la détente. Idéale pour les personnes ayant du mal à déconnecter en fin de journée.",
    huiles:[
      {latin:"Lavandula angustifolia", fr:"Lavande vraie", gouttes:"4 gouttes"},
      {latin:"Chamaemelum nobile", fr:"Camomille romaine", gouttes:"2 gouttes"},
      {latin:"Boswellia carterii", fr:"Encens (Oliban)", gouttes:"1 goutte"},
    ],
    usage:"Diffuser 30 min avant le coucher dans la chambre. Éteindre le diffuseur avant de dormir. Ne pas laisser tourner en continu toute la nuit.",
    precautions:"Ne pas utiliser en présence de nourrissons (< 3 mois). Aérer la pièce après diffusion. Déconseillé en cas d'asthme non contrôlé.",
    public:"Adultes. Déconseillé en présence de nourrissons.",
    benefits:["Confort du sommeil","Détente profonde","Environnement apaisant"],
    tags:["sommeil","stress"] },

  { id:"enfants", name:"Sérénité Enfants", emoji:"👶", price:35,
    mode:"Diffusion atmosphérique", modeEmoji:"💨",
    description:"Synergie douce contribuant à créer une atmosphère apaisante. Formulée pour un usage adapté aux enfants dès 3 ans.",
    huiles:[
      {latin:"Citrus reticulata", fr:"Mandarine", gouttes:"4 gouttes"},
      {latin:"Lavandula angustifolia", fr:"Lavande vraie", gouttes:"2 gouttes"},
      {latin:"Chamaemelum nobile", fr:"Camomille romaine", gouttes:"1 goutte"},
    ],
    usage:"Diffuser 20 min dans la chambre avant le coucher. Retirer l'enfant de la pièce pendant la diffusion. Aérer avant le coucher.",
    precautions:"Réservé aux enfants dès 3 ans. Ne pas diffuser en présence continue de l'enfant. Toujours aérer la pièce avant de coucher l'enfant.",
    public:"Enfants dès 3 ans.",
    benefits:["Atmosphère douce","Confort du sommeil","Sérénité"],
    tags:["enfants","sommeil"] },

  { id:"orient", name:"Nuit d'Orient", emoji:"🌹", price:62,
    mode:"Diffusion atmosphérique", modeEmoji:"💨",
    description:"Synergie aux notes chaudes et boisées, favorisant une ambiance intime et relaxante. L'ylang-ylang étant très concentré, un dosage minimal est impératif.",
    huiles:[
      {latin:"Cananga odorata", fr:"Ylang-ylang", gouttes:"2 gouttes"},
      {latin:"Santalum album", fr:"Santal blanc", gouttes:"3 gouttes"},
      {latin:"Pogostemon cablin", fr:"Patchouli", gouttes:"1 goutte"},
    ],
    usage:"Diffuser 20 min maximum. Ne pas dépasser 2 gouttes d'ylang-ylang — son odeur puissante peut provoquer des maux de tête si surdosé.",
    precautions:"Déconseillé en cas d'hypertension artérielle. Contre-indiqué chez la femme enceinte (1er trimestre). Réservé à un public adulte.",
    public:"Adultes uniquement.",
    benefits:["Atmosphère enveloppante","Bien-être sensoriel","Détente"],
    tags:["libido","hormones"] },

  // ── INHALATION SÈCHE ──────────────────────────────────────
  { id:"bouclier", name:"Bouclier Hivernal", emoji:"🛡️", price:38,
    mode:"Inhalation sèche", modeEmoji:"👃",
    description:"Synergie contribuant au confort respiratoire et à la vitalité en période hivernale. Ne se substitue pas à un traitement médical.",
    huiles:[
      {latin:"Eucalyptus radiata", fr:"Eucalyptus radiata", gouttes:"3 gouttes"},
      {latin:"Cinnamomum camphora CT cinéole", fr:"Ravintsara", gouttes:"3 gouttes"},
      {latin:"Melaleuca alternifolia", fr:"Arbre à thé (Tea tree)", gouttes:"2 gouttes"},
    ],
    usage:"Déposer les gouttes sur un mouchoir ou dans un stick inhalateur personnel. Inhaler profondément 3 à 5 fois, 3 fois par jour. Ne pas partager le support d'inhalation.",
    precautions:"Déconseillé chez la femme enceinte et les enfants de moins de 7 ans. Éviter tout contact avec les yeux. Ne pas ingérer.",
    public:"Adultes et enfants dès 7 ans.",
    benefits:["Confort respiratoire","Bien-être hivernal","Fraîcheur"],
    tags:["immunité","respiration"] },

  { id:"eclat", name:"Éclat d'Été", emoji:"☀️", price:48,
    mode:"Inhalation sèche", modeEmoji:"👃",
    description:"Synergie aux notes citronnées et fleuries contribuant à une atmosphère légère et positive. Favorise un moment de détente olfactive.",
    huiles:[
      {latin:"Citrus bergamia", fr:"Bergamote", gouttes:"4 gouttes"},
      {latin:"Citrus reticulata", fr:"Mandarine", gouttes:"3 gouttes"},
      {latin:"Cananga odorata", fr:"Ylang-ylang", gouttes:"1 goutte"},
    ],
    usage:"Déposer sur un mouchoir ou stick inhalateur. Inhaler lentement le matin ou lors d'un moment de pause. Usage pour soi uniquement.",
    precautions:"Bergamote photosensibilisante : ne pas appliquer sur la peau avant exposition solaire. Ylang-ylang à dose minimale — ne pas dépasser 1 goutte.",
    public:"Adultes et adolescents dès 12 ans.",
    benefits:["Humeur positive","Légèreté","Bien-être émotionnel"],
    tags:["humeur","stress"] },

  { id:"temple", name:"Temple de Bois", emoji:"🕯️", price:55,
    mode:"Inhalation sèche", modeEmoji:"👃",
    description:"Synergie aux notes résineuses et boisées favorisant un contexte de calme et de recentrage. Accompagne les pratiques méditatives.",
    huiles:[
      {latin:"Boswellia carterii", fr:"Encens (Oliban)", gouttes:"3 gouttes"},
      {latin:"Santalum album", fr:"Santal blanc", gouttes:"2 gouttes"},
      {latin:"Chrysopogon zizanioides", fr:"Vétiver", gouttes:"1 goutte"},
    ],
    usage:"Déposer sur un mouchoir ou stick inhalateur. Inhaler avant et pendant la méditation ou le yoga. Peut aussi être déposé sur un galet en céramique.",
    precautions:"Usage externe et olfactif uniquement. Tenir hors de portée des enfants. Déconseillé chez la femme enceinte.",
    public:"Adultes.",
    benefits:["Calme intérieur","Ancrage","Clarté mentale"],
    tags:["méditation"] },

  { id:"sos", name:"S.O.S. Stress", emoji:"🆘", price:44,
    mode:"Inhalation sèche", modeEmoji:"👃",
    description:"Synergie contribuant à un sentiment de calme lors de moments de tension. Ne remplace pas une prise en charge médicale en cas d'anxiété sévère.",
    huiles:[
      {latin:"Citrus aurantium var. amara fleurs", fr:"Néroli", gouttes:"1 goutte"},
      {latin:"Citrus aurantium var. amara feuilles", fr:"Petit grain bigarade", gouttes:"3 gouttes"},
      {latin:"Origanum majorana", fr:"Marjolaine à coquilles", gouttes:"2 gouttes"},
    ],
    usage:"Inhaler directement le flacon 3 respirations lentes. Puis déposer sur mouchoir et inhaler 5 minutes. Répéter si besoin après 15 min.",
    precautions:"Marjolaine sédative : déconseillée en cas de dépression profonde. Femmes enceintes : consulter avant usage. Ne pas utiliser chez l'enfant.",
    public:"Adultes uniquement.",
    benefits:["Confort émotionnel","Apaisement","Bien-être nerveux"],
    tags:["stress"] },

  // ── MASSAGE ───────────────────────────────────────────────
  { id:"feminin", name:"Équilibre Féminin", emoji:"🌸", price:52,
    mode:"Massage — dilué en huile végétale", modeEmoji:"💆",
    description:"Synergie contribuant au confort lors des périodes de tensions hormonales. Concentration finale : 3,5% dans 10 ml d'huile végétale.",
    huiles:[
      {latin:"Pelargonium x asperum", fr:"Géranium rosat", gouttes:"3 gouttes"},
      {latin:"Salvia sclarea", fr:"Sauge sclarée", gouttes:"2 gouttes"},
      {latin:"Cupressus sempervirens", fr:"Cyprès de Provence", gouttes:"2 gouttes"},
    ],
    usage:"Diluer dans 10 ml d'huile végétale (jojoba ou calophylle inophyle). Masser le bas-ventre en mouvements circulaires doux, matin et soir, les 5 jours précédant les règles. Max 3 semaines consécutives.",
    precautions:"CONTRE-INDIQUÉ chez la femme enceinte ou allaitante. Déconseillé en cas de cancer hormonodépendant ou d'endométriose. Avis médical avant usage prolongé.",
    public:"Femmes adultes uniquement.",
    benefits:["Confort féminin","Équilibre hormonal","Bien-être du cycle"],
    tags:["hormones"] },

  { id:"detox", name:"Détox Corps", emoji:"💧", price:40,
    mode:"Massage — dilué en huile végétale", modeEmoji:"💆",
    description:"Synergie contribuant à la sensation de légèreté et favorisant le confort circulatoire. Concentration finale : 3,5% dans 10 ml d'huile végétale.",
    huiles:[
      {latin:"Cupressus sempervirens", fr:"Cyprès de Provence", gouttes:"3 gouttes"},
      {latin:"Citrus limon zeste", fr:"Citron", gouttes:"3 gouttes"},
      {latin:"Zingiber officinale", fr:"Gingembre", gouttes:"1 goutte"},
    ],
    usage:"Diluer dans 10 ml d'huile de noisette. Masser en mouvements ascendants sur les jambes et cuisses après la douche. 1 application par jour maximum.",
    precautions:"Citron photosensibilisant : éviter exposition solaire dans les 12h suivant l'application. Déconseillé chez la femme enceinte. Ne pas appliquer sur peau irritée.",
    public:"Adultes. Déconseillé chez la femme enceinte.",
    benefits:["Confort circulatoire","Jambes légères","Bien-être quotidien"],
    tags:["circulation","détox"] },

  { id:"peau", name:"Éclat Peau", emoji:"✨", price:58,
    mode:"Massage — dilué en huile végétale", modeEmoji:"💆",
    description:"Synergie contribuant au confort et à l'éclat cutané. Concentration finale : 2% dans 10 ml d'huile végétale. Formulée pour peaux matures ou ternes.",
    huiles:[
      {latin:"Boswellia carterii", fr:"Encens (Oliban)", gouttes:"2 gouttes"},
      {latin:"Helichrysum italicum", fr:"Hélichryse italienne", gouttes:"1 goutte"},
      {latin:"Daucus carota", fr:"Carotte", gouttes:"1 goutte"},
    ],
    usage:"Diluer dans 10 ml d'huile d'argan ou de rose musquée. Appliquer matin et soir sur visage propre en massages doux ascendants. Test cutané recommandé avant première utilisation.",
    precautions:"Test allergie sur pli du coude 24h avant. Éviter le contour des yeux. Carotte photosensibilisante — rester à 1 goutte maximum.",
    public:"Adultes. Test cutané conseillé avant première utilisation.",
    benefits:["Confort cutané","Éclat de la peau","Soin naturel"],
    tags:["peau"] },

  { id:"sport", name:"Récupération Sport", emoji:"💪", price:39,
    mode:"Massage — dilué en huile végétale", modeEmoji:"💆",
    description:"Synergie contribuant au confort musculaire après un effort physique. Concentration finale : 3,5% dans 10 ml d'huile végétale. Usage post-effort uniquement.",
    huiles:[
      {latin:"Mentha piperita", fr:"Menthe poivrée", gouttes:"2 gouttes"},
      {latin:"Gaultheria procumbens", fr:"Gaulthérie couchée", gouttes:"2 gouttes"},
      {latin:"Zingiber officinale", fr:"Gingembre", gouttes:"2 gouttes"},
    ],
    usage:"Diluer dans 10 ml d'huile végétale (arnica ou millepertuis). Masser les muscles sollicités après l'effort. Ne pas appliquer avant l'effort ni sur plaie ouverte. 2 applications max/jour.",
    precautions:"Gaulthérie CONTRE-INDIQUÉE sous anticoagulants (AVK, héparine) et chez les enfants. Menthe déconseillée chez épileptiques et femmes enceintes. Ne jamais diffuser.",
    public:"Adultes sportifs. Déconseillé sous anticoagulants.",
    benefits:["Confort musculaire","Récupération","Bien-être après effort"],
    tags:["douleurs"] },

  // ── ROLL-ON ───────────────────────────────────────────────
  { id:"focus", name:"Esprit Clair", emoji:"🧠", price:36,
    mode:"Roll-on — à préparer en base huileuse", modeEmoji:"🔵",
    description:"Synergie contribuant à un environnement olfactif favorable à la concentration. Concentration : 3,5% dans 10 ml de base huileuse. À préparer dans un roll-on vide.",
    huiles:[
      {latin:"Mentha piperita", fr:"Menthe poivrée", gouttes:"2 gouttes"},
      {latin:"Rosmarinus officinalis CT cinéole", fr:"Romarin à cinéole", gouttes:"3 gouttes"},
      {latin:"Citrus limon zeste", fr:"Citron", gouttes:"2 gouttes"},
    ],
    usage:"Dans un roll-on vide de 10 ml, verser les huiles essentielles puis compléter avec de l'huile de jojoba. Bien agiter avant usage. Appliquer sur poignets et/ou tempes. Inhaler après application. Éviter le contour des yeux.",
    precautions:"Menthe déconseillée chez enfants < 7 ans, femmes enceintes et épileptiques. Citron photosensibilisant : éviter exposition solaire après application cutanée.",
    public:"Adultes et adolescents dès 12 ans.",
    benefits:["Clarté mentale","Confort cognitif","Concentration"],
    tags:["concentration","énergie"] },
]

// ═══════════════════════════════════════════════════════════════
// QUESTIONNAIRE — 10 étapes
// ═══════════════════════════════════════════════════════════════

const QUESTIONS = [
  { id:"profile", type:"section", title:"Faisons connaissance 👋",
    subtitle:"Ces informations permettent de personnaliser votre analyse.",
    fields:[
      {id:"firstName",label:"Prénom",type:"text",placeholder:"Votre prénom",required:true},
      {id:"lastName",label:"Nom",type:"text",placeholder:"Votre nom",required:true},
      {id:"email",label:"Email",type:"email",placeholder:"votre@email.com",required:true},
      {id:"phone",label:"Téléphone",type:"tel",placeholder:"+33 6 xx xx xx xx"},
      {id:"age",label:"Tranche d\'âge",type:"select",options:["18-25 ans","26-35 ans","36-45 ans","46-55 ans","56-65 ans","65+ ans"],required:true},
    ]},
  { id:"main_concern", type:"choice", multiple:true,
    title:"Qu\'est-ce qui vous amène ici ?",
    subtitle:"Choisissez ce qui vous correspond le plus en ce moment.",
    options:[
      {value:"sleep",label:"Problèmes de sommeil",emoji:"😴",tags:["sommeil"]},
      {value:"stress",label:"Stress & anxiété",emoji:"😰",tags:["stress"]},
      {value:"mood",label:"Humeur & moral",emoji:"😔",tags:["humeur"]},
      {value:"pain",label:"Douleurs physiques",emoji:"🤕",tags:["douleurs"]},
      {value:"immunity",label:"Renforcer mon immunité",emoji:"🛡️",tags:["immunité"]},
      {value:"energy",label:"Manque d\'énergie",emoji:"⚡",tags:["énergie"]},
      {value:"focus",label:"Concentration",emoji:"🧠",tags:["concentration"]},
      {value:"skin",label:"Peau & beauté",emoji:"✨",tags:["peau"]},
      {value:"digestion",label:"Digestion",emoji:"🫃",tags:["digestion"]},
      {value:"hormonal",label:"Équilibre hormonal",emoji:"🌸",tags:["hormones"]},
      {value:"sport",label:"Récupération sportive",emoji:"💪",tags:["douleurs"]},
      {value:"meditation",label:"Méditation & bien-être",emoji:"🧘",tags:["méditation"]},
      {value:"libido",label:"Libido & sensualité",emoji:"🌹",tags:["libido"]},
      {value:"curiosity",label:"Simple curiosité",emoji:"🌿",tags:[]},
    ]},
  { id:"sleep_quality", type:"scale", title:"Qualité de votre sommeil ?",
    subtitle:"1 = insomnies chroniques · 5 = sommeil parfait",
    labels:["Insomnies","Difficile","Passable","Bien","Excellent"] },
  { id:"stress_level", type:"scale", title:"Votre niveau de stress ?",
    subtitle:"1 = très calme · 5 = sous haute tension",
    labels:["Très calme","Peu stressé","Modéré","Stressé","Surchargé"] },
  { id:"energy_level", type:"scale", title:"Votre niveau d\'énergie ?",
    subtitle:"1 = épuisement total · 5 = vitalité débordante",
    labels:["Épuisé(e)","Fatigué(e)","Variable","Énergique","Vitalité++"] },
  { id:"physical_issues", type:"choice", multiple:true,
    title:"Gênes physiques récurrentes ?",
    subtitle:"Plusieurs réponses possibles.",
    options:[
      {value:"headaches",label:"Maux de tête",emoji:"🤯",tags:["douleurs"]},
      {value:"muscle",label:"Douleurs musculaires",emoji:"💪",tags:["douleurs"]},
      {value:"digestion",label:"Troubles digestifs",emoji:"🫃",tags:["digestion"]},
      {value:"fatigue",label:"Fatigue chronique",emoji:"😫",tags:["énergie"]},
      {value:"hormonal",label:"Douleurs menstruelles",emoji:"🌸",tags:["hormones"]},
      {value:"skin",label:"Problèmes de peau",emoji:"🧴",tags:["peau"]},
      {value:"circulation",label:"Jambes lourdes",emoji:"🦵",tags:["circulation"]},
      {value:"respiratory",label:"Respiratoire",emoji:"🫁",tags:["respiration"]},
      {value:"none",label:"Aucun",emoji:"✅",tags:[]},
    ]},
  { id:"emotional_state", type:"choice", multiple:true,
    title:"Votre état émotionnel ?",
    subtitle:"Plusieurs réponses possibles.",
    options:[
      {value:"anxious",label:"Anxieux/euse",emoji:"😰",tags:["stress"]},
      {value:"sad",label:"Triste, mélancolique",emoji:"😢",tags:["humeur"]},
      {value:"irritable",label:"Irritable",emoji:"😤",tags:["stress"]},
      {value:"unmotivated",label:"Sans motivation",emoji:"😑",tags:["énergie","humeur"]},
      {value:"burnout",label:"Burnout",emoji:"🔥",tags:["énergie","stress"]},
      {value:"stable",label:"Globalement stable",emoji:"😊",tags:[]},
    ]},
  { id:"scent_preference", type:"choice", multiple:true,
    title:"Parfums qui vous attirent ?",
    subtitle:"Faites confiance à votre nez.",
    options:[
      {value:"floral",label:"Floraux et doux",emoji:"🌸"},
      {value:"woody",label:"Boisés et terreux",emoji:"🌲"},
      {value:"citrus",label:"Frais et citronnés",emoji:"🍋"},
      {value:"minty",label:"Mentholés",emoji:"🌱"},
      {value:"spicy",label:"Épicés",emoji:"🌶️"},
      {value:"resinous",label:"Résineux",emoji:"🕯️"},
      {value:"sweet",label:"Sucrés",emoji:"🍯"},
    ]},
  { id:"experience", type:"choice", multiple:false,
    title:"Votre expérience avec les huiles essentielles ?",
    options:[
      {value:"beginner",label:"Débutant(e) complet(e)",emoji:"🌱"},
      {value:"occasional",label:"Occasionnel(le)",emoji:"🌿"},
      {value:"regular",label:"Utilisateur(trice) régulier(ère)",emoji:"🌳"},
      {value:"expert",label:"Expert(e) / praticien(ne)",emoji:"🎓"},
    ]},
  { id:"contraindications", type:"choice", multiple:true,
    title:"Précautions à prendre ?",
    subtitle:"Essentiel pour votre sécurité.",
    options:[
      {value:"pregnant",label:"Enceinte",emoji:"🤰"},
      {value:"breastfeeding",label:"Allaitement",emoji:"🍼"},
      {value:"children",label:"Pour enfants < 7 ans",emoji:"👶"},
      {value:"epilepsy",label:"Épilepsie",emoji:"⚡"},
      {value:"hypertension",label:"Hypertension",emoji:"❤️"},
      {value:"allergies",label:"Allergies aux plantes",emoji:"🌾"},
      {value:"none",label:"Aucune contre-indication",emoji:"✅"},
    ]},
];

// ═══════════════════════════════════════════════════════════════
// MOTEUR DE RECOMMANDATION
// ═══════════════════════════════════════════════════════════════

function computeRec(answers) {
  const scores = {};
  const add = (tag, pts) => { scores[tag] = (scores[tag]||0)+pts; };
  
  const concerns = Array.isArray(answers.main_concern) ? answers.main_concern : (answers.main_concern ? [answers.main_concern] : []);
  concerns.forEach(val => {
    const concern = QUESTIONS[1].options.find(o=>o.value===val);
    if(concern) concern.tags.forEach(t=>add(t,3));
  });
  
  if((answers.sleep_quality||5)<=2){add("sommeil",3);add("stress",1);}
  else if((answers.sleep_quality||5)<=3) add("sommeil",1);
  if((answers.stress_level||1)>=4){add("stress",3);add("humeur",1);}
  if((answers.energy_level||5)<=2){add("énergie",3);add("fatigue",2);}
  
  (answers.physical_issues||[]).forEach(v=>{
    const o = QUESTIONS[5].options.find(x=>x.value===v);
    if(o) o.tags.forEach(t=>add(t,2));
  });
  (answers.emotional_state||[]).forEach(v=>{
    const o = QUESTIONS[6].options.find(x=>x.value===v);
    if(o) o.tags.forEach(t=>add(t,2));
  });

  const tagList = Object.entries(scores).sort((a,b)=>b[1]-a[1]).map(([t])=>t);
  
  const oilsScored = OILS.map(o=>{
    let s=0; o.tags.forEach(t=>{if(scores[t]) s+=scores[t];});
    return {...o,score:s};
  }).filter(o=>o.score>0).sort((a,b)=>b.score-a.score);
  
  const kitsScored = KITS.map(k=>{
    let s=0; k.tags.forEach(t=>{if(scores[t]) s+=scores[t];});
    return {...k,score:s};
  }).filter(k=>k.score>0).sort((a,b)=>b.score-a.score);
  
  const sl=answers.stress_level||3, el=answers.energy_level||3;
  let emotProfile="Équilibré(e)";
  if(answers.emotional_state?.includes("burnout")) emotProfile="En épuisement profond";
  else if(sl>=4||answers.emotional_state?.includes("anxious")) emotProfile="Sous tension nerveuse";
  else if(answers.emotional_state?.includes("sad")) emotProfile="En quête de légèreté";
  
  let physProfile="Pas de problème particulier";
  const pi=answers.physical_issues||[];
  if(pi.includes("fatigue")) physProfile="Fatigue chronique";
  else if(pi.includes("muscle")) physProfile="Tensions musculaires";
  else if(pi.includes("digestion")) physProfile="Confort digestif";
  else if(pi.includes("skin")) physProfile="Peau sensible";
  else if(pi.includes("circulation")) physProfile="Circulation à stimuler";
  
  return {topTags:tagList.slice(0,6), oils:oilsScored.slice(0,6), kits:kitsScored.slice(0,3), emotProfile, physProfile};
}

// ═══════════════════════════════════════════════════════════════
// COMPOSANTS
// ═══════════════════════════════════════════════════════════════

function OilCard({oil, onClick}) {
  return (
    <div className="oil-card" onClick={()=>onClick(oil)} style={{"--oc":oil.color,"--ob":oil.bg}}>
      <div className="oc-top"><span className="oc-emoji">{oil.emoji}</span><span className="oc-fam">{oil.family}</span></div>
      <h3 className="oc-name">{oil.name}</h3>
      <p className="oc-desc">{oil.description}</p>
      <div className="oc-tags">{oil.tags.slice(0,2).map(t=><span key={t} className="tag">{t}</span>)}</div>
    </div>
  );
}

function OilModal({oil, onClose, onAddCart}) {
  if(!oil) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{"--oc":oil.color}}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-hdr">
          <span style={{fontSize:"3rem"}}>{oil.emoji}</span>
          <div>
            <h2 className="modal-ttl">{oil.name}</h2>
            <p style={{fontSize:".85rem",color:"#7a8b7d",fontStyle:"italic"}}>{oil.volume}</p>
          </div>
        </div>
        <p className="modal-desc">{oil.description}</p>
        {oil.uses.length>0 && (
          <div className="modal-sec"><h4>🎯 Usages principaux</h4>
            <ul>{oil.uses.map(u=><li key={u}>{u}</li>)}</ul></div>
        )}
        {oil.contraindications.length>0 && (
          <div className="modal-sec warn"><h4>⚠️ Précautions</h4>
            <ul>{oil.contraindications.map(c=><li key={c}>{c}</li>)}</ul></div>
        )}
        <div className="modal-tags">{oil.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
        <button className="btn-add" onClick={()=>{onAddCart({item:oil,qty:1});onClose();}}>
          🛒 Ajouter à ma sélection
        </button>
      </div>
    </div>
  );
}

function KitCard({kit, onAdd}) {
  const [qty,setQty]=useState(1);
  const [open,setOpen]=useState(false);
  return (
    <div className="kit-card">
      <div className="kit-top"><span style={{fontSize:"1.9rem"}}>{kit.emoji}</span><span className="kit-price">{kit.price}€</span></div>
      <span className="kit-mode">{kit.modeEmoji} {kit.mode}</span>
      <h3 className="kit-name">{kit.name}</h3>
      <p className="kit-desc">{kit.description}</p>

      {/* Composition */}
      <div className="kit-formula-block">
        <h5 className="kit-section-label">🌿 Composition</h5>
        {(kit.huiles||[]).map((h,i)=>(
          <div key={i} className="kit-huile-row">
            <div className="kit-huile-names">
              <span className="kit-huile-fr">{h.fr}</span>
              <span className="kit-huile-latin">{h.latin}</span>
            </div>
            <span className="kit-huile-dose">{h.gouttes}</span>
          </div>
        ))}
      </div>

      {/* Protocole + Précautions (toggle) */}
      <button className="kit-toggle" onClick={()=>setOpen(o=>!o)}>
        {open ? "▲ Masquer les détails" : "▼ Voir protocole & précautions"}
      </button>
      {open && (
        <div className="kit-details">
          <div className="kit-detail-block">
            <h5 className="kit-section-label">💡 Protocole d'application</h5>
            <p className="kit-detail-text">{kit.usage}</p>
          </div>
          <div className="kit-detail-block warn">
            <h5 className="kit-section-label warn">⚠️ Précautions</h5>
            <p className="kit-detail-text warn">{kit.precautions}</p>
          </div>
          {kit.public && <p className="kit-public">👤 <strong>Public :</strong> {kit.public}</p>}
        </div>
      )}

      <div className="kit-benefits">{kit.benefits.map(b=><span key={b} className="benefit">✓ {b}</span>)}</div>
      <div className="kit-actions">
        <div className="qty"><button onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button><span>{qty}</span><button onClick={()=>setQty(q=>q+1)}>+</button></div>
        <button className="btn-primary" onClick={()=>onAdd({item:kit,qty})}>Ajouter au panier</button>
      </div>
    </div>
  );
}

function QStep({question, answers, onChange}) {
  if(question.type==="section") return (
    <div className="q-section">
      {question.fields.map(f=>(
        <div key={f.id} className="q-field">
          <label className="q-label">{f.label}{f.required&&<span className="req"> *</span>}</label>
          {f.type==="select"
            ?<select className="q-input" value={answers[f.id]||""} onChange={e=>onChange(f.id,e.target.value)}>
              <option value="">Choisir…</option>
              {f.options.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
            :<input className="q-input" type={f.type} placeholder={f.placeholder} value={answers[f.id]||""} onChange={e=>onChange(f.id,e.target.value)}/>
          }
        </div>
      ))}
    </div>
  );
  if(question.type==="scale") {
    const val=answers[question.id]||0;
    return (
      <div className="q-scale">
        {question.labels.map((l,i)=>(
          <button key={i} className={`scale-btn ${val===i+1?"active":""}`} onClick={()=>onChange(question.id,i+1)}>
            <span className="scale-n">{i+1}</span><span className="scale-l">{l}</span>
          </button>
        ))}
      </div>
    );
  }
  if(question.type==="choice") {
    const cur=answers[question.id]||(question.multiple?[]:null);
    const toggle=val=>{
      if(!question.multiple) return onChange(question.id,val);
      const arr=Array.isArray(cur)?cur:[];
      onChange(question.id,arr.includes(val)?arr.filter(v=>v!==val):[...arr,val]);
    };
    const isActive=val=>question.multiple?(Array.isArray(cur)&&cur.includes(val)):cur===val;
    return (
      <div className="q-choices">
        {question.options.map(o=>(
          <button key={o.value} className={`q-choice ${isActive(o.value)?"active":""}`} onClick={()=>toggle(o.value)}>
            <span className="ch-emoji">{o.emoji}</span>
            <span className="ch-label">{o.label}</span>
          </button>
        ))}
      </div>
    );
  }
  return null;
}

function Results({answers, rec, onAddKit}) {
  const {topTags, oils, kits, emotProfile, physProfile} = rec;
  return (
    <div className="results">
      <div style={{textAlign:"center",marginBottom:"2rem"}}>
        <span className="results-badge">✨ Votre analyse personnalisée</span>
        <h2 className="results-name">Bonjour {answers.firstName} !</h2>
        <p style={{color:"#7a8b7d"}}>Voici ce que nous avons compris de vous et nos recommandations sur-mesure.</p>
      </div>
      <div className="profile-grid">
        <div className="profile-card"><span className="pi">🧠</span><h4>Profil émotionnel</h4><p>{emotProfile}</p></div>
        <div className="profile-card"><span className="pi">💪</span><h4>Profil physique</h4><p>{physProfile}</p></div>
        <div className="profile-card"><span className="pi">🎯</span><h4>Besoins identifiés</h4>
          <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",justifyContent:"center",marginTop:".3rem"}}>
            {topTags.map(t=><span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </div>
      {kits.length>0&&(
        <div className="rec-block">
          <h3 className="rec-title">🌿 Vos synergies recommandées</h3>
          <div className="kits-grid">{kits.map(k=><KitCard key={k.id} kit={k} onAdd={onAddKit}/>)}</div>
        </div>
      )}
      {oils.length>0&&(
        <div className="rec-block">
          <h3 className="rec-title">💧 Vos {oils.length} huiles essentielles clés</h3>
          <div className="rec-oils">
            {oils.map(o=>(
              <div key={o.id} className="rec-oil" style={{"--oc":o.color,"--ob":o.bg}}>
                <span style={{fontSize:"1.5rem"}}>{o.emoji}</span>
                <div><strong>{o.name}</strong>
                  <p style={{fontSize:".78rem",color:"#7a8b7d",marginTop:".2rem"}}>{o.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="results-cta">
        <p>📧 Notre aromathérapeute recevra votre profil complet et pourra vous contacter avec des recommandations complémentaires.</p>
        <p style={{fontSize:".75rem",marginTop:".4rem",opacity:.7}}>Données protégées conformément au RGPD — jamais partagées avec des tiers.</p>
      </div>
    </div>
  );
}

function CartView({cart, setCart, onCheckout}) {
  const total = cart.reduce((s,i)=>s+i.item.price*i.qty,0);
  if(cart.length===0) return (
    <div className="cart-empty"><span>🛒</span><p>Votre panier est vide</p></div>
  );
  return (
    <div className="cart-layout">
      <div className="cart-items">
        {cart.map((item,i)=>(
          <div key={i} className="cart-item">
            <span style={{fontSize:"1.5rem"}}>{item.item.emoji||"🌿"}</span>
            <div className="ci-info"><strong>{item.item.name}</strong><span>{item.item.price.toFixed(2)}€ × {item.qty}</span></div>
            <div className="ci-qty">
              <button onClick={()=>setCart(c=>{const u=[...c];if(u[i].qty<=1)return c.filter((_,j)=>j!==i);u[i]={...u[i],qty:u[i].qty-1};return u;})}>−</button>
              <span>{item.qty}</span>
              <button onClick={()=>setCart(c=>{const u=[...c];u[i]={...u[i],qty:u[i].qty+1};return u;})}>+</button>
            </div>
            <button className="ci-rm" onClick={()=>setCart(c=>c.filter((_,j)=>j!==i))}>✕</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Récapitulatif</h3>
        <div className="cs-row"><span>Sous-total</span><span>{total.toFixed(2)}€</span></div>
        <div className="cs-row"><span>Livraison</span><span>{total>=50?"🎁 Offerte":"4,90€"}</span></div>
        {total<50&&<p style={{fontSize:".78rem",color:"#c9a84c",fontWeight:500}}>Plus que {(50-total).toFixed(2)}€ pour la livraison offerte !</p>}
        <div className="cs-total"><strong>Total</strong><strong>{(total>=50?total:total+4.9).toFixed(2)}€</strong></div>
        <button className="btn-primary full" onClick={onCheckout}>Commander →</button>
        <p style={{fontSize:".72rem",color:"#7a8b7d",textAlign:"center",marginTop:".5rem"}}>🔒 Paiement sécurisé · RGPD</p>
      </div>
    </div>
  );
}

function CheckoutModal({cart, onClose, onConfirm}) {
  const [step,setStep]=useState("review");
  const [form,setForm]=useState({name:"",email:"",card:"",expiry:"",cvc:""});
  const [loading,setLoading]=useState(false);
  const total=cart.reduce((s,i)=>s+i.item.price*i.qty,0);
  const deliveryCost=total>=50?0:4.9;
  
  const handlePay=async()=>{
    setLoading(true);
    await new Promise(r=>setTimeout(r,1800));
    setLoading(false); setStep("success");
  };
  
  if(step==="success") return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{textAlign:"center",padding:"3rem 2rem"}}>
        <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✅</div>
        <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.8rem",marginBottom:".7rem"}}>Commande confirmée !</h2>
        <p style={{color:"#7a8b7d"}}>Confirmation envoyée à {form.email||"votre email"}.</p>
        <p style={{fontSize:".82rem",color:"#7a8b7d",marginTop:".3rem"}}>Expédition sous 2-3 jours ouvrés 🌿</p>
        <button className="btn-primary" style={{marginTop:"1.5rem"}} onClick={()=>{onConfirm();onClose();}}>Fermer</button>
      </div>
    </div>
  );
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:500}}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.4rem",marginBottom:"1.2rem"}}>
          {step==="review"?"Récapitulatif":"Paiement sécurisé"}
        </h2>
        {step==="review"&&<>
          {cart.map((it,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:".85rem",padding:".4rem 0",borderBottom:"1px solid #dde6dd"}}>
              <span>{it.item.emoji||"🌿"} {it.item.name} ×{it.qty}</span>
              <strong>{(it.item.price*it.qty).toFixed(2)}€</strong>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",fontSize:".85rem",padding:".5rem 0",color:"#7a8b7d"}}><span>Livraison</span><span>{deliveryCost===0?"🎁 Offerte":"4,90€"}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,padding:".5rem 0",borderTop:"2px solid #dde6dd",marginBottom:"1rem"}}><span>Total</span><span>{(total+deliveryCost).toFixed(2)}€</span></div>
          <button className="btn-primary full" onClick={()=>setStep("payment")}>Continuer →</button>
        </>}
        {step==="payment"&&<>
          <div style={{display:"flex",flexDirection:"column",gap:".7rem",marginBottom:"1rem"}}>
            <input className="q-input" placeholder="Nom complet" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
            <input className="q-input" type="email" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
            <div style={{background:"#f5f0ff",padding:".6rem 1rem",borderRadius:"10px",fontSize:".8rem",color:"#6772e5",fontWeight:500,textAlign:"center"}}>🔒 Paiement sécurisé simulé (démo)</div>
            <input className="q-input" placeholder="Numéro de carte" value={form.card} maxLength={19} onChange={e=>setForm(f=>({...f,card:e.target.value.replace(/\D/g,"").replace(/(\d{4})/g,"$1 ").trim()}))}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".7rem"}}>
              <input className="q-input" placeholder="MM/AA" maxLength={5} value={form.expiry} onChange={e=>setForm(f=>({...f,expiry:e.target.value}))}/>
              <input className="q-input" placeholder="CVC" maxLength={3} value={form.cvc} onChange={e=>setForm(f=>({...f,cvc:e.target.value.replace(/\D/g,"")}))}/>
            </div>
          </div>
          <button className="btn-primary full" onClick={handlePay} disabled={loading||!form.name||!form.email}>
            {loading?"Traitement…":`Payer ${(total+deliveryCost).toFixed(2)}€ →`}
          </button>
        </>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════════════════

function ConsultForm() {
  const [form, setForm] = useState({firstName:"", lastName:"", email:"", phone:"", format:"visio", message:"", questionnaire:"non"});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.firstName || !form.email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  if (sent) return (
    <div className="consult-success">
      <span>✅</span>
      <h3>Demande envoyée !</h3>
      <p>Merci {form.firstName} ! Je vous contacte sous 24h pour confirmer votre créneau de consultation.</p>
      <p style={{fontSize:".82rem", color:"#7a8b7d", marginTop:".5rem"}}>Un email de confirmation vous a été envoyé à {form.email}.</p>
    </div>
  );

  return (
    <div className="consult-form-wrap">
      <div className="consult-form-grid">
        <div className="cf-field">
          <label className="q-label">Prénom <span className="req">*</span></label>
          <input className="q-input" placeholder="Votre prénom" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))}/>
        </div>
        <div className="cf-field">
          <label className="q-label">Nom <span className="req">*</span></label>
          <input className="q-input" placeholder="Votre nom" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))}/>
        </div>
        <div className="cf-field">
          <label className="q-label">Email <span className="req">*</span></label>
          <input className="q-input" type="email" placeholder="votre@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
        </div>
        <div className="cf-field">
          <label className="q-label">Téléphone</label>
          <input className="q-input" type="tel" placeholder="+33 6 xx xx xx xx" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
        </div>
        <div className="cf-field full">
          <label className="q-label">Format souhaité</label>
          <div className="format-choice">
            {[["visio","💻 Visio"],["telephone","📞 Téléphone"],["presentiel","🤝 Présentiel"]].map(([val,label])=>(
              <button key={val} className={`format-btn ${form.format===val?"active":""}`} onClick={()=>setForm(f=>({...f,format:val}))}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="cf-field full">
          <label className="q-label">Avez-vous déjà fait le questionnaire en ligne ?</label>
          <div className="format-choice">
            {[["oui","✅ Oui"],["non","🌱 Non, pas encore"]].map(([val,label])=>(
              <button key={val} className={`format-btn ${form.questionnaire===val?"active":""}`} onClick={()=>setForm(f=>({...f,questionnaire:val}))}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="cf-field full">
          <label className="q-label">En quelques mots, qu'est-ce qui vous amène ?</label>
          <textarea className="q-input cf-textarea" placeholder="Décrivez brièvement votre situation, vos besoins ou vos questions…" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/>
        </div>
      </div>
      <div className="cf-footer">
        <p className="cf-rgpd">🔒 Vos données sont utilisées uniquement pour organiser votre consultation. Conformité RGPD garantie.</p>
        <button className="btn-primary large" onClick={handleSubmit} disabled={loading||!form.firstName||!form.email}>
          {loading ? "Envoi en cours…" : "Envoyer ma demande →"}
        </button>
      </div>
    </div>
  );
}

function FaqItem({q, a}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open?"open":""}`}>
      <button className="faq-q" onClick={()=>setOpen(o=>!o)}>
        <span>{q}</span>
        <span className="faq-arrow">{open?"↑":"↓"}</span>
      </button>
      {open && <p className="faq-a">{a}</p>}
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState("home");
  const [selectedOil,setSelectedOil]=useState(null);
  const [qStep,setQStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [qDone,setQDone]=useState(false);
  const [rec,setRec]=useState(null);
  const [cart,setCart]=useState([]);
  const [checkout,setCheckout]=useState(false);
  const [rgpd,setRgpd]=useState(false);
  const [search,setSearch]=useState("");
  const [filterFam,setFilterFam]=useState("Toutes");
  const [sortBy,setSortBy]=useState("name");

  const families=["Toutes",...new Set(OILS.map(o=>o.family))].sort();
  const filteredOils=OILS
    .filter(o=>{
      const s=search.toLowerCase();
      return (filterFam==="Toutes"||o.family===filterFam)&&
        (s===""||o.name.toLowerCase().includes(s)||o.description.toLowerCase().includes(s)||o.tags.some(t=>t.includes(s)));
    })
    .sort((a,b)=>sortBy==="price"?a.price-b.price:sortBy==="price_desc"?b.price-a.price:a.name.localeCompare(b.name));

  const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal=cart.reduce((s,i)=>s+i.item.price*i.qty,0);

  const addToCart=entry=>{
    setCart(c=>{
      const idx=c.findIndex(x=>x.item.id===entry.item.id);
      if(idx>=0){const u=[...c];u[idx]={...u[idx],qty:u[idx].qty+entry.qty};return u;}
      return [...c,entry];
    });
  };

  const handleAnswer=(key,val)=>setAnswers(a=>({...a,[key]:val}));

  const canProceed=()=>{
    const q=QUESTIONS[qStep];
    if(q.type==="section") return q.fields.filter(f=>f.required).every(f=>answers[f.id]);
    if(q.type==="scale") return !!answers[q.id];
    if(q.type==="choice") return q.multiple?(answers[q.id]?.length>0):!!answers[q.id];
    return true;
  };

  const finishQ=()=>{
    setRec(computeRec(answers));
    setQDone(true);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {!rgpd&&(
          <div className="rgpd">
            <span>🍪 Vos données sont utilisées uniquement pour personnaliser votre expérience. Aucune revente à des tiers.</span>
            <button className="btn-ghost small" onClick={()=>setRgpd(true)}>Accepter</button>
          </div>
        )}
        
        <nav className="nav">
          <div className="nav-logo" onClick={()=>setPage("home")}>
            <span>🌿</span><span className="logo-txt">aromAIconseil</span>
          </div>
          <div className="nav-links">
            <button className={`nl ${page==="catalogue"?"active":""}`} onClick={()=>setPage("catalogue")}>Catalogue ({OILS.length})</button>
            <button className={`nl ${page==="kits"?"active":""}`} onClick={()=>setPage("kits")}>Kits ({KITS.length})</button>
            <button className={`nl ${page==="questionnaire"?"active":""}`} onClick={()=>setPage("questionnaire")}>Mon profil ✨</button>
            <button className={`nl ${page==="consultation"?"active":""}`} onClick={()=>setPage("consultation")}>Consultation 🌿</button>
          </div>
          <button className="cart-btn" onClick={()=>setPage("cart")}>
            🛒{cartCount>0&&<span className="cart-badge">{cartCount}</span>}
            {cartTotal>0&&<span style={{fontSize:".78rem",marginLeft:".2rem"}}>{cartTotal.toFixed(2)}€</span>}
          </button>
        </nav>

        <main>
          {/* HOME */}
          {page==="home"&&(
            <div className="page-home">
              <section className="hero">
                <div className="hero-bg"><div className="hb1"/><div className="hb2"/></div>
                <div className="hero-content">
                  <span className="hero-pill">🌿 {OILS.length} huiles essentielles · {KITS.length} synergies · 100% personnalisé</span>
                  <h1 className="hero-h1">Votre <em>bien-être</em><br/>commence ici</h1>
                  <p className="hero-p">Découvrez le pouvoir des huiles essentielles grâce à une expérience entièrement sur-mesure. Notre système analyse vos besoins et vous guide vers les solutions qui vous correspondent.</p>
                  <div className="hero-btns">
                    <button className="btn-primary large" onClick={()=>setPage("questionnaire")}>Découvrir mon profil →</button>
                    <button className="btn-ghost" onClick={()=>setPage("catalogue")}>Explorer les {OILS.length} huiles</button>
                  </div>
                  <div className="hero-stats">
                    <div className="stat"><strong>{OILS.length}</strong><span>huiles</span></div>
                    <div className="stat"><strong>{KITS.length}</strong><span>synergies</span></div>
                    <div className="stat"><strong>100%</strong><span>sur-mesure</span></div>
                    <div className="stat"><strong>RGPD</strong><span>conforme</span></div>
                  </div>
                </div>
                <div className="hero-visual">
                  {OILS.slice(0,6).map((o,i)=>(
                    <div key={o.id} className={`hero-card hc-${i}`} style={{"--oc":o.color,"--delay":`${i*.25}s`}} onClick={()=>{setSelectedOil(o);setPage("catalogue");}}>
                      <span>{o.emoji}</span><span>{o.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="features">
                {[
                  {icon:"🧬",t:"Analyse personnalisée",d:"Questionnaire en 10 étapes pour cerner vos besoins réels"},
                  {icon:"🌿",t:`${OILS.length} huiles essentielles`,d:"Votre catalogue complet avec propriétés et précautions"},
                  {icon:"🔬",t:`${KITS.length} synergies`,d:"Formules créées par des aromathérapeutes"},
                  {icon:"🛒",t:"Achat sécurisé",d:"Paiement Stripe, livraison offerte dès 50€"},
                  {icon:"🛡️",t:"RGPD conforme",d:"Données protégées et jamais revendues"},
                  {icon:"📧",t:"Suivi personnalisé",d:"Notre équipe reçoit votre profil et vous rappelle"},
                ].map(f=>(
                  <div key={f.t} className="feat-card">
                    <span style={{fontSize:"1.8rem",display:"block",marginBottom:".5rem"}}>{f.icon}</span>
                    <h3>{f.t}</h3><p>{f.d}</p>
                  </div>
                ))}
              </section>

              <section style={{padding:"0 4rem 3rem"}}>
                <h2 className="sec-title">Huiles phares</h2>
                <div className="preview-grid">{OILS.slice(0,8).map(o=><OilCard key={o.id} oil={o} onClick={setSelectedOil}/>)}</div>
                <button className="btn-ghost" style={{display:"block",margin:"1.5rem auto"}} onClick={()=>setPage("catalogue")}>Voir les {OILS.length} huiles →</button>
              </section>

              <section style={{padding:"0 4rem 4rem"}}>
                <h2 className="sec-title">Nos kits populaires</h2>
                <div className="kits-grid">{KITS.slice(0,3).map(k=><KitCard key={k.id} kit={k} onAdd={addToCart}/>)}</div>
                <button className="btn-ghost" style={{display:"block",margin:"1.5rem auto"}} onClick={()=>setPage("kits")}>Voir les {KITS.length} kits →</button>
              </section>
            </div>
          )}

          {/* CATALOGUE */}
          {page==="catalogue"&&(
            <div className="page-std">
              <div className="page-hdr">
                <h1>{OILS.length} Huiles essentielles</h1>
                <p>Cliquez sur une huile pour découvrir ses propriétés complètes.</p>
              </div>
              <div className="cat-filters">
                <input className="search-input" placeholder={`🔍 Rechercher parmi ${OILS.length} huiles…`} value={search} onChange={e=>setSearch(e.target.value)}/>
                <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",alignItems:"center"}}>
                  <div className="family-row">
                    {families.map(f=><button key={f} className={`fam-btn ${filterFam===f?"active":""}`} onClick={()=>setFilterFam(f)}>{f}</button>)}
                  </div>
                  <select className="q-input" style={{width:"auto",padding:".4rem .8rem"}} value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                    <option value="name">A → Z</option>
                    <option value="price">Prix ↑</option>
                    <option value="price_desc">Prix ↓</option>
                  </select>
                </div>
                <p style={{fontSize:".8rem",color:"#7a8b7d"}}>{filteredOils.length} résultat{filteredOils.length!==1?"s":""}</p>
              </div>
              <div className="oils-grid">
                {filteredOils.map(o=><OilCard key={o.id} oil={o} onClick={setSelectedOil}/>)}
                {filteredOils.length===0&&<p className="empty">Aucun résultat pour « {search} »</p>}
              </div>
            </div>
          )}

          {/* KITS */}
          {page==="kits"&&(
            <div className="page-std">
              <div className="page-hdr"><h1>{KITS.length} Kits de synergie</h1><p>Formules prêtes à l\'emploi, composées par nos aromathérapeutes.</p></div>
              <div className="kits-grid">{KITS.map(k=><KitCard key={k.id} kit={k} onAdd={addToCart}/>)}</div>
            </div>
          )}

          {/* QUESTIONNAIRE */}
          {page==="questionnaire"&&(
            <div className="page-q">
              {!qDone?(
                <div className="q-wrapper">
                  <div className="q-progress-wrap"><div className="q-progress-bar" style={{width:`${((qStep+1)/QUESTIONS.length)*100}%`}}/></div>
                  <div style={{fontSize:".78rem",color:"#7a8b7d",textAlign:"right"}}>Étape {qStep+1} / {QUESTIONS.length}</div>
                  <div className="q-card">
                    <h2 className="q-title">{QUESTIONS[qStep].title}</h2>
                    {QUESTIONS[qStep].subtitle&&<p className="q-subtitle">{QUESTIONS[qStep].subtitle}</p>}
                    <QStep question={QUESTIONS[qStep]} answers={answers} onChange={handleAnswer}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    {qStep>0&&<button className="btn-ghost" onClick={()=>setQStep(s=>s-1)}>← Précédent</button>}
                    {qStep<QUESTIONS.length-1
                      ?<button className="btn-primary" disabled={!canProceed()} onClick={()=>setQStep(s=>s+1)}>Continuer →</button>
                      :<button className="btn-primary" disabled={!canProceed()} onClick={finishQ}>Voir mon analyse ✨</button>
                    }
                  </div>
                </div>
              ):(
                <Results answers={answers} rec={rec} onAddKit={addToCart}/>
              )}
            </div>
          )}

          {/* CONSULTATION */}
          {page==="consultation"&&(
            <div className="page-consult">
              {/* HERO */}
              <div className="consult-hero">
                <div className="consult-hero-bg"><div className="chb1"/><div className="chb2"/></div>
                <div className="consult-hero-content">
                  <span className="consult-pill">🌿 Consultation individuelle</span>
                  <h1 className="consult-h1">Un accompagnement<br/><em>vraiment personnalisé</em></h1>
                  <p className="consult-sub">Le questionnaire en ligne vous donne une première orientation. La consultation, elle, va beaucoup plus loin — c'est un échange humain, approfondi, adapté à votre situation unique.</p>
                  <button className="btn-primary large" onClick={()=>document.getElementById("consult-form").scrollIntoView({behavior:"smooth"})}>
                    Réserver ma consultation →
                  </button>
                </div>
              </div>

              {/* CE QUI EST INCLUS */}
              <div className="consult-section">
                <h2 className="consult-title">Ce qui est inclus</h2>
                <div className="consult-included">
                  {[
                    {icon:"🎯", title:"Analyse approfondie", desc:"Nous reprenons ensemble votre questionnaire et creusons chaque aspect de votre situation — physique, émotionnel, mode de vie."},
                    {icon:"🔬", title:"Formule sur-mesure", desc:"Je compose une synergie 100% personnalisée pour vous, avec les huiles de votre catalogue et les proportions exactes adaptées à vos besoins."},
                    {icon:"📋", title:"Protocole détaillé", desc:"Vous repartez avec un plan d'utilisation clair : quelles huiles, comment, quand, pendant combien de temps."},
                    {icon:"💊", title:"Conseils de terrain", desc:"Contre-indications, associations à éviter, alternatives si besoin — je vous guide avec rigueur et bienveillance."},
                    {icon:"📱", title:"Suivi à 15 jours", desc:"Un message de suivi pour faire le point sur vos ressentis et ajuster si nécessaire."},
                    {icon:"🎁", title:"Récapitulatif écrit", desc:"Un compte-rendu de la consultation envoyé par email, avec toutes vos recommandations."},
                  ].map(item=>(
                    <div key={item.title} className="included-card">
                      <span className="included-icon">{item.icon}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORMATS */}
              <div className="consult-section alt">
                <h2 className="consult-title">Choisissez votre format</h2>
                <div className="formats-grid">
                  <div className="format-card">
                    <span className="format-icon">💻</span>
                    <h3>En visio</h3>
                    <p>Via Zoom ou Google Meet. Lien envoyé par email après confirmation.</p>
                    <span className="format-badge">Partout en France</span>
                  </div>
                  <div className="format-card">
                    <span className="format-icon">📞</span>
                    <h3>Par téléphone</h3>
                    <p>Simple et efficace. Je vous appelle au créneau convenu.</p>
                    <span className="format-badge">Sans installation</span>
                  </div>
                  <div className="format-card featured">
                    <span className="format-icon">🤝</span>
                    <h3>En présentiel</h3>
                    <p>Pour sentir les huiles en direct et une expérience encore plus immersive.</p>
                    <span className="format-badge">Sur rendez-vous</span>
                  </div>
                </div>
              </div>

              {/* TARIF */}
              <div className="consult-section">
                <div className="tarif-block">
                  <div className="tarif-left">
                    <h2 className="consult-title">Tarif</h2>
                    <div className="tarif-price">
                      <span className="tarif-amount">49€</span>
                      <span className="tarif-label">/ consultation d'1 heure</span>
                    </div>
                    <p className="tarif-desc">Règlement après la consultation, selon votre convenance :</p>
                    <div className="tarif-modes">
                      <span>💳 Virement bancaire</span>
                      <span>📱 Lydia / PayPal</span>
                      <span>💵 Espèces (présentiel)</span>
                    </div>
                  </div>
                  <div className="tarif-right">
                    <div className="tarif-what">
                      <h4>La consultation comprend :</h4>
                      <ul>
                        <li>✓ 1h d'échange avec votre conseiller certifié</li>
                        <li>✓ Formule de synergie personnalisée</li>
                        <li>✓ Protocole d'utilisation complet</li>
                        <li>✓ Compte-rendu écrit par email</li>
                        <li>✓ Suivi à 15 jours inclus</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* TEMOIGNAGES */}
              <div className="consult-section alt">
                <h2 className="consult-title">Ils ont été accompagnés</h2>
                <div className="temoignages">
                  {[
                    {name:"Sophie M.", text:"J'utilisais les huiles essentielles au hasard depuis des années. La consultation m'a ouvert les yeux sur des synergies que je n'aurais jamais trouvées seule. Ma formule personnalisée a changé mes nuits.", stars:5},
                    {name:"Marc T.", text:"Je n'y croyais pas trop au départ. Mais l'écoute, la précision des conseils et le suivi m'ont convaincu. En 3 semaines, ma gestion du stress s'est vraiment améliorée.", stars:5},
                    {name:"Isabelle R.", text:"Le questionnaire était déjà très bien, mais la consultation a apporté une dimension humaine incomparable. Je recommande à toute personne sérieuse dans sa démarche bien-être.", stars:5},
                  ].map(t=>(
                    <div key={t.name} className="temoignage-card">
                      <div className="temo-stars">{"⭐".repeat(t.stars)}</div>
                      <p className="temo-text">"{t.text}"</p>
                      <span className="temo-name">— {t.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORMULAIRE */}
              <div className="consult-section" id="consult-form">
                <h2 className="consult-title">Réserver ma consultation</h2>
                <p className="consult-form-sub">Remplissez ce formulaire — je vous contacte sous 24h pour confirmer le créneau.</p>
                <ConsultForm/>
              </div>

              {/* FAQ */}
              <div className="consult-section alt">
                <h2 className="consult-title">Questions fréquentes</h2>
                <div className="faq-list">
                  {[
                    {q:"Faut-il avoir fait le questionnaire avant ?", a:"C'est recommandé mais pas obligatoire. Si vous l'avez fait, je recevrai déjà votre profil et nous irons plus vite. Sinon, nous le ferons ensemble pendant la consultation."},
                    {q:"Est-ce que je dois acheter les huiles avant ?", a:"Non, pas du tout. Nous définissons ensemble les huiles dont vous avez besoin pendant la consultation. Vous commandez ensuite ce qui vous convient."},
                    {q:"La consultation convient-elle aux débutants ?", a:"Absolument ! C'est même idéal pour démarrer sur de bonnes bases plutôt que d'utiliser les huiles sans connaître les précautions."},
                    {q:"Comment se passe le suivi à 15 jours ?", a:"Je vous envoie un message (email ou WhatsApp selon votre préférence) pour faire le point sur vos ressentis. Si besoin, nous ajustons la formule."},
                    {q:"Peut-on faire une consultation pour un enfant ?", a:"Oui, en adaptant les recommandations à l'âge et aux besoins spécifiques. La présence d'un parent est requise pour les enfants de moins de 16 ans."},
                  ].map((item,i)=>(
                    <FaqItem key={i} q={item.q} a={item.a}/>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PANIER */}
          {page==="cart"&&(          {/* PANIER */}
          {page==="cart"&&(
            <div className="page-std">
              <div className="page-hdr"><h1>Mon panier</h1></div>
              <CartView cart={cart} setCart={setCart} onCheckout={()=>setCheckout(true)}/>
            </div>
          )}
        </main>

        {selectedOil&&<OilModal oil={selectedOil} onClose={()=>setSelectedOil(null)} onAddCart={addToCart}/>}
        {checkout&&<CheckoutModal cart={cart} onClose={()=>setCheckout(false)} onConfirm={()=>setCart([])}/>}

        <footer className="footer">
          <div className="footer-top">
            <div><div className="footer-logo">🌿 aromAIconseil</div><p>Votre conseiller en aromathérapie sur-mesure.</p></div>
            <div>
              <strong>Navigation</strong>
              <button className="footer-link" onClick={()=>setPage("catalogue")}>Catalogue ({OILS.length} huiles)</button>
              <button className="footer-link" onClick={()=>setPage("kits")}>Kits de synergie</button>
              <button className="footer-link" onClick={()=>setPage("questionnaire")}>Mon profil</button>
            </div>
            <div>
              <strong>Légal</strong>
              <button className="footer-link" onClick={()=>alert("contact@aromaiconseil.fr")}>Mentions légales</button>
              <button className="footer-link" onClick={()=>alert("rgpd@aromaiconseil.fr")}>Politique RGPD</button>
              <button className="footer-link" onClick={()=>alert("CGV disponibles sur demande")}>CGV</button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>⚠️ Les huiles essentielles ne remplacent pas un avis médical. Consultez un professionnel en cas de doute.</p>
            <p>© 2025 aromAIconseil · Tous droits réservés</p>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--sage:#6b8f71;--sage-l:#a8c5a0;--sage-d:#3d5e43;--cream:#faf7f2;--warm:#f5ede0;--gold:#c9a84c;--dark:#1a2018;--text:#3a4a3d;--muted:#7a8b7d;--border:#dde6dd;--shadow:0 4px 24px rgba(26,32,24,.08);--shadow-lg:0 12px 48px rgba(26,32,24,.14);--r:14px;--rl:22px;}
body{font-family:'Jost',sans-serif;background:var(--cream);color:var(--text);min-height:100vh;}
.app{min-height:100vh;display:flex;flex-direction:column;}
.rgpd{background:var(--dark);color:rgba(255,255,255,.85);padding:.8rem 2rem;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;font-size:.82rem;position:sticky;top:0;z-index:200;}
.rgpd .btn-ghost.small{margin-left:auto;}
.nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:1.5rem;padding:.85rem 2.5rem;background:rgba(250,247,242,.95);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.nav-logo{display:flex;align-items:center;gap:.5rem;cursor:pointer;}
.logo-txt{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--sage-d);}
.nav-links{display:flex;gap:.3rem;margin-left:auto;}
.nl{background:none;border:none;cursor:pointer;font-family:'Jost',sans-serif;font-size:.88rem;font-weight:500;color:var(--muted);padding:.45rem .9rem;border-radius:8px;transition:all .2s;}
.nl:hover,.nl.active{color:var(--sage-d);background:rgba(107,143,113,.1);}
.cart-btn{background:var(--sage-d);color:white;border:none;cursor:pointer;padding:.5rem 1rem;border-radius:8px;font-size:.88rem;display:flex;align-items:center;gap:.4rem;transition:background .2s;}
.cart-btn:hover{background:var(--sage);}
.cart-badge{background:var(--gold);color:var(--dark);border-radius:50%;width:18px;height:18px;font-size:.68rem;display:grid;place-items:center;font-weight:700;}
.btn-primary{background:var(--sage-d);color:white;border:none;cursor:pointer;padding:.72rem 1.4rem;border-radius:var(--r);font-family:'Jost',sans-serif;font-size:.92rem;font-weight:500;transition:all .2s;display:inline-flex;align-items:center;gap:.5rem;}
.btn-primary:hover{background:var(--sage);transform:translateY(-1px);box-shadow:var(--shadow);}
.btn-primary:disabled{opacity:.4;pointer-events:none;}
.btn-primary.large{padding:.95rem 2rem;font-size:1rem;}
.btn-primary.full{width:100%;justify-content:center;}
.btn-ghost{background:transparent;color:var(--sage-d);border:1.5px solid var(--border);cursor:pointer;padding:.72rem 1.4rem;border-radius:var(--r);font-family:'Jost',sans-serif;font-size:.92rem;font-weight:500;transition:all .2s;}
.btn-ghost:hover{border-color:var(--sage-d);background:rgba(107,143,113,.06);}
.btn-ghost.small{padding:.35rem .8rem;font-size:.8rem;}
.btn-add{background:var(--sage-d);color:white;border:none;cursor:pointer;width:100%;padding:.9rem;border-radius:var(--r);font-family:'Jost',sans-serif;font-size:.9rem;font-weight:600;margin-top:1rem;transition:all .2s;}
.btn-add:hover{background:var(--sage);}
.tag{display:inline-block;background:rgba(107,143,113,.12);color:var(--sage-d);padding:.2rem .65rem;border-radius:999px;font-size:.72rem;font-weight:500;}
.page-home{padding-bottom:3rem;}
.hero{min-height:88vh;display:grid;grid-template-columns:1.1fr 0.9fr;align-items:center;gap:3rem;padding:5rem 4rem;position:relative;overflow:hidden;background:linear-gradient(140deg,var(--cream) 0%,var(--warm) 55%,#ede8f5 100%);}
.hero-bg{position:absolute;inset:0;pointer-events:none;}
.hb1{position:absolute;width:700px;height:700px;top:-200px;right:-150px;border-radius:50%;background:radial-gradient(circle,rgba(107,143,113,.18),transparent 65%);animation:pulse 8s ease-in-out infinite;}
.hb2{position:absolute;width:350px;height:350px;bottom:-100px;left:8%;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.15),transparent 65%);animation:pulse 6s ease-in-out infinite 2s;}
@keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}
.hero-content{position:relative;z-index:1;}
.hero-pill{display:inline-block;background:rgba(107,143,113,.15);color:var(--sage-d);padding:.4rem 1rem;border-radius:999px;font-size:.78rem;font-weight:500;margin-bottom:1.5rem;letter-spacing:.04em;}
.hero-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,5vw,4.2rem);font-weight:300;line-height:1.08;color:var(--dark);margin-bottom:1.5rem;}
.hero-h1 em{font-style:italic;color:var(--sage-d);}
.hero-p{font-size:1rem;line-height:1.75;color:var(--muted);margin-bottom:2.5rem;max-width:480px;font-weight:300;}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.5rem;}
.hero-stats{display:flex;gap:2rem;}
.stat{display:flex;flex-direction:column;}
.stat strong{font-size:1.4rem;font-weight:700;color:var(--sage-d);}
.stat span{font-size:.73rem;color:var(--muted);}
.hero-visual{position:relative;display:flex;flex-direction:column;gap:.7rem;}
.hero-card{display:flex;align-items:center;gap:.7rem;background:white;border:1px solid var(--border);border-radius:var(--r);padding:.65rem 1rem;font-size:.82rem;font-weight:500;cursor:pointer;box-shadow:var(--shadow);border-left:3px solid var(--oc);animation:float 4s ease-in-out infinite;animation-delay:var(--delay);transition:transform .2s;}
.hero-card:hover{transform:translateX(6px)!important;}
.hero-card span:first-child{font-size:1.2rem;}
.hc-0{transform:translateX(0);}.hc-1{transform:translateX(25px);}.hc-2{transform:translateX(8px);}.hc-3{transform:translateX(40px);}.hc-4{transform:translateX(15px);}.hc-5{transform:translateX(32px);}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;padding:3rem 4rem;}
.feat-card{background:white;border:1px solid var(--border);border-radius:var(--r);padding:1.4rem;transition:all .2s;}
.feat-card:hover{transform:translateY(-3px);box-shadow:var(--shadow);}
.feat-card h3{font-size:.9rem;font-weight:600;color:var(--dark);margin-bottom:.3rem;}
.feat-card p{font-size:.8rem;color:var(--muted);line-height:1.5;}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:400;color:var(--dark);margin-bottom:1.5rem;}
.preview-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem;margin-bottom:1.5rem;}
.oil-card{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:1.3rem;cursor:pointer;transition:all .25s;display:flex;flex-direction:column;gap:.45rem;}
.oil-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--sage-l);}
.oc-top{display:flex;justify-content:space-between;align-items:center;}
.oc-emoji{font-size:1.7rem;}
.oc-fam{font-size:.65rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--oc);background:var(--ob);padding:.2rem .55rem;border-radius:999px;}
.oc-name{font-family:'Cormorant Garamond',serif;font-size:1.18rem;font-weight:600;color:var(--dark);}
.oc-desc{font-size:.78rem;color:var(--muted);line-height:1.45;flex:1;}
.oc-tags{margin-top:auto;}

.oc-tags{display:flex;gap:.3rem;flex-wrap:wrap;}
.modal-overlay{position:fixed;inset:0;background:rgba(26,32,24,.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1.5rem;backdrop-filter:blur(5px);animation:fadeIn .2s;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.modal{background:white;border-radius:var(--rl);padding:2.2rem;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;position:relative;animation:slideUp .25s;border-top:4px solid var(--oc,var(--sage));}
@keyframes slideUp{from{transform:translateY(16px);opacity:0;}to{transform:translateY(0);opacity:1;}}
.modal-x{position:absolute;top:1rem;right:1rem;background:var(--cream);border:none;cursor:pointer;width:28px;height:28px;border-radius:50%;font-size:.82rem;display:grid;place-items:center;color:var(--muted);}
.modal-hdr{display:flex;gap:1.2rem;align-items:flex-start;margin-bottom:1.2rem;}
.modal-ttl{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:600;color:var(--dark);}
.modal-desc{color:var(--text);line-height:1.65;margin-bottom:1rem;font-size:.9rem;}
.modal-sec{background:var(--cream);border-radius:var(--r);padding:.9rem;margin-bottom:.8rem;}
.modal-sec.warn{background:#fff5f0;}
.modal-sec h4{font-size:.78rem;font-weight:600;color:var(--dark);margin-bottom:.4rem;}
.modal-sec ul{list-style:none;}
.modal-sec li{font-size:.78rem;color:var(--text);padding:.2rem 0 .2rem .8rem;position:relative;}
.modal-sec li::before{content:"·";position:absolute;left:0;color:var(--sage);}
.modal-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin:.8rem 0;}
.page-std{padding:3rem 4rem;}
.page-hdr{margin-bottom:2rem;}
.page-hdr h1{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:300;color:var(--dark);margin-bottom:.3rem;}
.page-hdr p{color:var(--muted);font-size:.9rem;}
.cat-filters{margin-bottom:1.5rem;display:flex;flex-direction:column;gap:.8rem;}
.search-input{background:white;border:1.5px solid var(--border);border-radius:var(--r);padding:.68rem 1.1rem;font-family:'Jost',sans-serif;font-size:.9rem;color:var(--text);width:100%;max-width:440px;transition:border-color .2s;}
.search-input:focus{outline:none;border-color:var(--sage);}
.family-row{display:flex;gap:.4rem;flex-wrap:wrap;}
.fam-btn{background:white;border:1.5px solid var(--border);border-radius:999px;padding:.32rem .85rem;font-size:.76rem;font-weight:500;cursor:pointer;color:var(--muted);transition:all .2s;font-family:'Jost',sans-serif;}
.fam-btn:hover,.fam-btn.active{background:var(--sage-d);color:white;border-color:var(--sage-d);}
.oils-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1.1rem;}
.empty{text-align:center;color:var(--muted);padding:4rem;grid-column:1/-1;}
.kits-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem;}
.kit-card{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:1.4rem;display:flex;flex-direction:column;gap:.65rem;transition:box-shadow .2s;}
.kit-card:hover{box-shadow:var(--shadow-lg);}
.kit-top{display:flex;justify-content:space-between;align-items:center;}
.kit-price{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--sage-d);}
.kit-name{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600;color:var(--dark);}
.kit-desc{font-size:.8rem;color:var(--muted);line-height:1.45;}
.kit-formula-block{background:rgba(107,143,113,.07);border-radius:var(--r);padding:.8rem 1rem;display:flex;flex-direction:column;gap:.4rem;}
.kit-section-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--sage-d);margin-bottom:.3rem;}
.kit-section-label.warn{color:#c4607a;}
.kit-huile-row{display:flex;justify-content:space-between;align-items:center;padding:.3rem 0;border-bottom:1px solid rgba(107,143,113,.12);}
.kit-huile-row:last-child{border-bottom:none;}
.kit-huile-names{display:flex;flex-direction:column;gap:.1rem;}
.kit-huile-fr{font-size:.85rem;font-weight:600;color:var(--dark);}
.kit-huile-latin{font-size:.72rem;font-style:italic;color:var(--muted);}
.kit-huile-dose{font-size:.8rem;font-weight:600;color:var(--sage-d);white-space:nowrap;margin-left:.5rem;}
.kit-toggle{background:none;border:1px solid var(--border);border-radius:var(--r);padding:.4rem .8rem;font-size:.78rem;color:var(--muted);cursor:pointer;width:100%;transition:all .2s;font-family:'Jost',sans-serif;margin:.3rem 0;}
.kit-toggle:hover{border-color:var(--sage);color:var(--sage-d);}
.kit-details{display:flex;flex-direction:column;gap:.6rem;animation:fadeIn .2s;}
.kit-detail-block{background:var(--cream);border-radius:var(--r);padding:.8rem;}
.kit-detail-block.warn{background:#fff5f5;}
.kit-detail-text{font-size:.8rem;color:var(--text);line-height:1.55;}
.kit-detail-text.warn{color:#c4607a;}
.kit-public{font-size:.78rem;color:var(--muted);}
.kit-mode{font-size:.72rem;font-weight:600;color:var(--sage-d);background:rgba(107,143,113,.1);padding:.2rem .7rem;border-radius:999px;display:inline-block;margin-bottom:.3rem;}
.kit-usage{font-size:.76rem;color:var(--muted);font-style:italic;}
.kit-public{font-size:.76rem;color:#4a6b8a;background:rgba(74,107,138,.08);padding:.3rem .7rem;border-radius:8px;margin-top:.2rem;}
.kit-benefits{display:flex;flex-direction:column;gap:.2rem;}
.benefit{font-size:.78rem;color:var(--sage-d);font-weight:500;}
.kit-actions{display:flex;gap:.7rem;align-items:center;margin-top:auto;}
.qty{display:flex;align-items:center;gap:.4rem;border:1.5px solid var(--border);border-radius:var(--r);padding:.2rem .5rem;}
.qty button{background:none;border:none;cursor:pointer;font-size:.95rem;color:var(--sage-d);padding:.1rem .3rem;}
.qty span{font-weight:600;min-width:20px;text-align:center;}
.page-q{padding:3rem 1.5rem;max-width:700px;margin:0 auto;}
.q-wrapper{display:flex;flex-direction:column;gap:1.8rem;}
.q-progress-wrap{background:var(--border);border-radius:999px;height:4px;}
.q-progress-bar{background:linear-gradient(90deg,var(--sage),var(--sage-d));height:100%;border-radius:999px;transition:width .4s ease;}
.q-card{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:2.2rem;}
.q-title{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:600;color:var(--dark);margin-bottom:.4rem;}
.q-subtitle{color:var(--muted);font-size:.85rem;line-height:1.55;margin-bottom:1.6rem;}
.q-section{display:flex;flex-direction:column;gap:1rem;}
.q-field{display:flex;flex-direction:column;gap:.3rem;}
.q-label{font-size:.84rem;font-weight:500;color:var(--text);}
.req{color:#c4607a;}
.q-input{background:var(--cream);border:1.5px solid var(--border);border-radius:var(--r);padding:.65rem 1rem;font-family:'Jost',sans-serif;font-size:.9rem;color:var(--text);transition:border-color .2s;width:100%;}
.q-input:focus{outline:none;border-color:var(--sage);}
.q-scale{display:flex;gap:.5rem;flex-wrap:wrap;}
.scale-btn{flex:1;min-width:75px;background:var(--cream);border:1.5px solid var(--border);border-radius:var(--r);padding:.7rem .35rem;cursor:pointer;text-align:center;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.22rem;}
.scale-btn:hover{border-color:var(--sage-l);}
.scale-btn.active{background:var(--sage-d);border-color:var(--sage-d);color:white;}
.scale-n{font-size:1.05rem;font-weight:700;}
.scale-l{font-size:.6rem;font-weight:500;}
.q-choices{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:.55rem;}
.q-choice{background:var(--cream);border:1.5px solid var(--border);border-radius:var(--r);padding:.7rem .4rem;cursor:pointer;text-align:center;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.3rem;}
.q-choice:hover{border-color:var(--sage-l);background:white;}
.q-choice.active{background:rgba(107,143,113,.1);border-color:var(--sage);}
.ch-emoji{font-size:1.35rem;}
.ch-label{font-size:.72rem;font-weight:500;line-height:1.25;}
.results{max-width:820px;margin:0 auto;padding:2rem 1.5rem;display:flex;flex-direction:column;gap:2.5rem;}
.results-badge{display:inline-block;background:linear-gradient(135deg,var(--sage),var(--sage-d));color:white;padding:.4rem 1.2rem;border-radius:999px;font-size:.8rem;font-weight:500;margin-bottom:1rem;}
.results-name{font-family:'Cormorant Garamond',serif;font-size:2.3rem;font-weight:300;color:var(--dark);margin-bottom:.3rem;}
.profile-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
.profile-card{background:white;border:1px solid var(--border);border-radius:var(--r);padding:1.2rem;text-align:center;}
.pi{font-size:1.7rem;display:block;margin-bottom:.4rem;}
.profile-card h4{font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:.3rem;}
.profile-card p{font-size:.86rem;font-weight:500;color:var(--dark);}
.rec-block{display:flex;flex-direction:column;gap:1rem;}
.rec-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--dark);}
.rec-oils{display:flex;flex-direction:column;gap:.6rem;}
.rec-oil{display:flex;gap:.9rem;align-items:flex-start;background:white;border:1px solid var(--border);border-left:3px solid var(--oc);border-radius:var(--r);padding:.8rem 1rem;}
.results-cta{background:rgba(107,143,113,.08);border:1px solid var(--border);border-radius:var(--r);padding:1.1rem 1.4rem;text-align:center;font-size:.84rem;color:var(--muted);line-height:1.6;}
.cart-empty{text-align:center;padding:5rem 2rem;display:flex;flex-direction:column;align-items:center;gap:1rem;}
.cart-empty span{font-size:3rem;}
.cart-empty p{font-size:1.1rem;font-weight:500;}
.cart-layout{display:grid;grid-template-columns:1fr 340px;gap:2rem;align-items:start;}
.cart-items{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:1.4rem;display:flex;flex-direction:column;gap:.7rem;}
.cart-item{display:flex;gap:.9rem;align-items:center;padding:.7rem 0;border-bottom:1px solid var(--border);}
.cart-item:last-child{border-bottom:none;}
.ci-info{flex:1;display:flex;flex-direction:column;gap:.15rem;}
.ci-info strong{font-size:.88rem;color:var(--dark);}
.ci-info span{font-size:.8rem;color:var(--muted);}
.ci-qty{display:flex;align-items:center;gap:.35rem;border:1px solid var(--border);border-radius:8px;padding:.2rem .4rem;}
.ci-qty button{background:none;border:none;cursor:pointer;font-size:.88rem;color:var(--sage-d);padding:.1rem .25rem;}
.ci-qty span{font-weight:600;min-width:18px;text-align:center;font-size:.82rem;}
.ci-rm{background:none;border:none;cursor:pointer;color:var(--muted);font-size:.82rem;padding:.3rem;}
.cart-summary{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:1.4rem;display:flex;flex-direction:column;gap:.75rem;position:sticky;top:80px;}
.cart-summary h3{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:var(--dark);}
.cs-row{display:flex;justify-content:space-between;font-size:.85rem;color:var(--muted);}
.cs-total{display:flex;justify-content:space-between;font-size:1rem;padding-top:.5rem;border-top:1px solid var(--border);}
.footer{background:var(--dark);color:rgba(255,255,255,.6);padding:2.5rem 4rem 1.5rem;margin-top:auto;}
.footer-top{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2rem;margin-bottom:1.5rem;}
.footer-top strong{color:white;font-size:.84rem;display:block;margin-bottom:.5rem;}
.footer-top p{font-size:.8rem;line-height:1.5;margin-top:.3rem;}
.footer-logo{color:white;font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600;}
.footer-link{background:none;border:none;cursor:pointer;font-size:.8rem;color:rgba(255,255,255,.55);font-family:'Jost',sans-serif;text-align:left;padding:.15rem 0;display:block;transition:color .2s;}
.footer-link:hover{color:rgba(255,255,255,.9);}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:1.2rem;text-align:center;font-size:.73rem;display:flex;flex-direction:column;gap:.3rem;}
/* ── CONSULTATION ─────────────────────────────── */
.page-consult{padding-bottom:4rem;}
.consult-hero{min-height:70vh;display:flex;align-items:center;justify-content:center;padding:5rem 4rem;position:relative;overflow:hidden;background:linear-gradient(140deg,var(--cream) 0%,#ede8f5 50%,var(--warm) 100%);text-align:center;}
.consult-hero-bg{position:absolute;inset:0;pointer-events:none;}
.chb1{position:absolute;width:600px;height:600px;top:-150px;left:50%;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(107,143,113,.15),transparent 65%);}
.chb2{position:absolute;width:300px;height:300px;bottom:-80px;right:10%;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.12),transparent 65%);}
.consult-hero-content{position:relative;z-index:1;max-width:640px;}
.consult-pill{display:inline-block;background:rgba(107,143,113,.15);color:var(--sage-d);padding:.4rem 1rem;border-radius:999px;font-size:.78rem;font-weight:500;margin-bottom:1.5rem;letter-spacing:.04em;}
.consult-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(2.2rem,4.5vw,3.5rem);font-weight:300;line-height:1.1;color:var(--dark);margin-bottom:1.2rem;}
.consult-h1 em{font-style:italic;color:var(--sage-d);}
.consult-sub{font-size:1rem;line-height:1.7;color:var(--muted);margin-bottom:2rem;font-weight:300;}
.consult-section{padding:4rem;}
.consult-section.alt{background:var(--warm);}
.consult-title{font-family:"Cormorant Garamond",serif;font-size:2rem;font-weight:400;color:var(--dark);margin-bottom:1.8rem;}
.consult-included{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;}
.included-card{display:flex;gap:1rem;align-items:flex-start;background:white;border:1px solid var(--border);border-radius:var(--r);padding:1.2rem;}
.included-icon{font-size:1.6rem;flex-shrink:0;}
.included-card h4{font-size:.9rem;font-weight:600;color:var(--dark);margin-bottom:.3rem;}
.included-card p{font-size:.82rem;color:var(--muted);line-height:1.5;}
.formats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
.format-card{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:1.8rem;text-align:center;transition:all .2s;}
.format-card:hover{transform:translateY(-3px);box-shadow:var(--shadow);}
.format-card.featured{border-color:var(--sage);background:rgba(107,143,113,.05);}
.format-icon{font-size:2.2rem;display:block;margin-bottom:.8rem;}
.format-card h3{font-family:"Cormorant Garamond",serif;font-size:1.3rem;font-weight:600;color:var(--dark);margin-bottom:.4rem;}
.format-card p{font-size:.82rem;color:var(--muted);line-height:1.5;margin-bottom:.8rem;}
.format-badge{background:rgba(107,143,113,.1);color:var(--sage-d);padding:.25rem .8rem;border-radius:999px;font-size:.72rem;font-weight:600;}
.tarif-block{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;background:white;border:1px solid var(--border);border-radius:var(--rl);padding:2.5rem;}
.tarif-price{display:flex;align-items:baseline;gap:.8rem;margin:1rem 0;}
.tarif-amount{font-family:"Cormorant Garamond",serif;font-size:3.5rem;font-weight:600;color:var(--sage-d);}
.tarif-label{font-size:.9rem;color:var(--muted);}
.tarif-desc{font-size:.88rem;color:var(--muted);margin-bottom:.8rem;}
.tarif-modes{display:flex;flex-direction:column;gap:.4rem;}
.tarif-modes span{font-size:.85rem;color:var(--text);font-weight:500;}
.tarif-what h4{font-size:.9rem;font-weight:600;color:var(--dark);margin-bottom:.8rem;}
.tarif-what ul{list-style:none;display:flex;flex-direction:column;gap:.5rem;}
.tarif-what li{font-size:.88rem;color:var(--text);padding-left:.2rem;}
.temoignages{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
.temoignage-card{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:1.5rem;display:flex;flex-direction:column;gap:.8rem;}
.temo-stars{font-size:.9rem;}
.temo-text{font-size:.88rem;color:var(--text);line-height:1.6;font-style:italic;flex:1;}
.temo-name{font-size:.8rem;font-weight:600;color:var(--sage-d);}
.consult-form-sub{color:var(--muted);font-size:.92rem;margin-bottom:2rem;}
.consult-form-wrap{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:2rem;max-width:760px;}
.consult-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;}
.cf-field{display:flex;flex-direction:column;gap:.35rem;}
.cf-field.full{grid-column:1/-1;}
.cf-textarea{min-height:100px;resize:vertical;}
.format-choice{display:flex;gap:.6rem;flex-wrap:wrap;}
.format-btn{background:var(--cream);border:1.5px solid var(--border);border-radius:var(--r);padding:.45rem 1rem;font-family:"Jost",sans-serif;font-size:.85rem;font-weight:500;cursor:pointer;color:var(--muted);transition:all .2s;}
.format-btn:hover{border-color:var(--sage-l);}
.format-btn.active{background:rgba(107,143,113,.1);border-color:var(--sage);color:var(--sage-d);}
.cf-footer{display:flex;flex-direction:column;gap:.8rem;align-items:flex-start;}
.cf-rgpd{font-size:.75rem;color:var(--muted);}
.consult-success{background:rgba(107,143,113,.08);border:1px solid var(--sage-l);border-radius:var(--rl);padding:3rem;text-align:center;max-width:500px;display:flex;flex-direction:column;align-items:center;gap:.8rem;}
.consult-success span{font-size:3rem;}
.consult-success h3{font-family:"Cormorant Garamond",serif;font-size:1.5rem;color:var(--dark);}
.consult-success p{font-size:.88rem;color:var(--muted);line-height:1.5;}
.faq-list{display:flex;flex-direction:column;gap:.5rem;max-width:760px;}
.faq-item{background:white;border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:all .2s;}
.faq-item.open{border-color:var(--sage-l);}
.faq-q{width:100%;background:none;border:none;cursor:pointer;padding:1rem 1.2rem;display:flex;justify-content:space-between;align-items:center;font-family:"Jost",sans-serif;font-size:.92rem;font-weight:500;color:var(--dark);text-align:left;gap:1rem;}
.faq-arrow{font-size:.8rem;color:var(--sage);flex-shrink:0;}
.faq-a{padding:.2rem 1.2rem 1rem;font-size:.85rem;color:var(--muted);line-height:1.6;}
@media(max-width:900px){.consult-hero{padding:3rem 2rem;}.consult-section{padding:2.5rem 2rem;}.consult-included{grid-template-columns:1fr;}.formats-grid{grid-template-columns:1fr;}.tarif-block{grid-template-columns:1fr;}.temoignages{grid-template-columns:1fr;}.consult-form-grid{grid-template-columns:1fr;}}
@media(max-width:1100px){.preview-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:900px){.hero{grid-template-columns:1fr;padding:3rem 2rem;min-height:auto;}.hero-visual{display:none;}.features{grid-template-columns:repeat(2,1fr);padding:2rem;}.page-std{padding:2rem;}.cart-layout{grid-template-columns:1fr;}.profile-grid{grid-template-columns:1fr;}.footer-top{grid-template-columns:1fr;}.footer{padding:2rem;}.preview-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.nav-links{display:none;}.features{grid-template-columns:1fr;}.preview-grid{grid-template-columns:1fr;}.q-scale{flex-direction:column;}.q-choices{grid-template-columns:repeat(2,1fr);}.kits-grid{grid-template-columns:1fr;}.hero-stats{gap:1rem;}}
`;
