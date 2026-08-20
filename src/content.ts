/**
 * Tous les textes de la vidéo.
 * C'est le seul fichier à modifier pour changer le script, le nom de la
 * mascotte ou les coordonnées affichées sur l'écran de fin.
 */

/** Nom de la mascotte — remplacez-le par le nom retenu. */
export const MASCOTTE_NAME = "Victor";

export const BRAND = {
  name: "Mur Humide",
  baseline: "Hauts-de-France",
  /** ⚠️ Site, e-mail et stand restent à confirmer avant diffusion. */
  phone: "03 20 06 55 11",
  site: "www.murhumide.fr",
  email: "contact@murhumide.fr",
  stand: "Stand B12 — Hall 3",
} as const;

export type CaptionLine = {
  /** Frame de début, relative au début de la séquence */
  from: number;
  /** Durée d'affichage en frames */
  durationInFrames: number;
  text: string;
};

/** Texte parlé, découpé en phrases affichées au bas de l'écran. */
export const SCRIPT: Record<string, CaptionLine[]> = {
  intro: [
    {
      from: 46,
      durationInFrames: 66,
      text: `Bonjour ! Je suis ${MASCOTTE_NAME}…`,
    },
    {
      from: 112,
      durationInFrames: 80,
      text: "…et aujourd'hui je vais vous expliquer un problème que beaucoup de maisons anciennes connaissent :",
    },
    {
      from: 192,
      durationInFrames: 60,
      text: "les remontées capillaires !",
    },
  ],
  probleme: [
    {
      from: 30,
      durationInFrames: 110,
      text: "L'humidité remonte du sol dans vos murs, comme une éponge.",
    },
    {
      from: 140,
      durationInFrames: 110,
      text: "Résultat : le plâtrage se détache, des taches de moisissure apparaissent,",
    },
    {
      from: 250,
      durationInFrames: 120,
      text: "et les murs restent humides malgré tous vos efforts.",
    },
  ],
  diagnostic: [
    {
      from: 20,
      durationInFrames: 90,
      text: "La première étape, c'est le diagnostic :",
    },
    {
      from: 110,
      durationInFrames: 140,
      text: "on identifie précisément où l'humidité remonte dans la maçonnerie.",
    },
  ],
  solution: [
    {
      from: 12,
      durationInFrames: 98,
      text: "Notre solution ? La technique d'injection.",
    },
    {
      from: 110,
      durationInFrames: 110,
      text: "On perce des petits trous tous les 10 centimètres,",
    },
    {
      from: 220,
      durationInFrames: 120,
      text: "directement dans le joint de ciment horizontal, juste au-dessus du sol.",
    },
    {
      from: 340,
      durationInFrames: 110,
      text: "Ensuite, on y injecte une crème hydrofuge spéciale,",
    },
    {
      from: 450,
      durationInFrames: 110,
      text: "qui crée une véritable barrière étanche à l'intérieur du mur",
    },
    {
      from: 560,
      durationInFrames: 110,
      text: "— même sur des murs avec 95 % d'humidité !",
    },
  ],
  resultat: [
    {
      from: 20,
      durationInFrames: 110,
      text: "Cette barrière empêche l'humidité de remonter plus haut.",
    },
    {
      from: 130,
      durationInFrames: 70,
      text: "Les trous sont ensuite rebouchés,",
    },
    {
      from: 200,
      durationInFrames: 110,
      text: "et le mur peut sécher et retrouver son aspect d'origine.",
    },
  ],
  cta: [
    {
      from: 24,
      durationInFrames: 116,
      text: "Une solution simple, durable, et garantie.",
    },
    {
      from: 140,
      durationInFrames: 150,
      text: "Retrouvez-nous sur notre stand pour un diagnostic gratuit !",
    },
  ],
};
