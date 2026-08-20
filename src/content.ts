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

/** Répliques de Victor, affichées dans sa bulle de BD. */
export const SCRIPT: Record<string, CaptionLine[]> = {
  intro: [
    {
      from: 30,
      durationInFrames: 92,
      text: `Bonjour ! Je suis ${MASCOTTE_NAME}, votre guide anti-humidité.`,
    },
    {
      from: 122,
      durationInFrames: 130,
      text: "Aujourd'hui je vous montre comment on stoppe les remontées capillaires, en direct !",
    },
  ],
  constat: [
    {
      from: 24,
      durationInFrames: 104,
      text: "Regardez ce mur : le plâtre se détache, il y a de la moisissure…",
    },
    {
      from: 128,
      durationInFrames: 94,
      text: "L'humidité remonte du sol, comme une éponge.",
    },
    {
      from: 222,
      durationInFrames: 96,
      text: "Mais pas de panique, j'ai la solution !",
    },
  ],
  percage: [
    {
      from: 18,
      durationInFrames: 132,
      text: "Première étape : je perce des trous tous les 10 centimètres,",
    },
    {
      from: 150,
      durationInFrames: 140,
      text: "bien alignés dans le joint de ciment, juste au-dessus du sol.",
    },
    {
      from: 290,
      durationInFrames: 148,
      text: "Un diamètre de 12 millimètres, pas plus !",
    },
  ],
  injection: [
    {
      from: 18,
      durationInFrames: 150,
      text: "Ensuite, j'injecte notre crème hydrofuge dans chaque trou.",
    },
    {
      from: 168,
      durationInFrames: 200,
      text: "Elle se diffuse dans la maçonnerie et crée une vraie barrière étanche horizontale",
    },
    {
      from: 368,
      durationInFrames: 190,
      text: "— même sur des murs très humides !",
    },
  ],
  resultat: [
    {
      from: 18,
      durationInFrames: 92,
      text: "Je referme les trous, et voilà !",
    },
    {
      from: 110,
      durationInFrames: 84,
      text: "L'humidité ne peut plus remonter.",
    },
    {
      from: 194,
      durationInFrames: 124,
      text: "Le mur va sécher tranquillement et retrouver son aspect d'origine.",
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
