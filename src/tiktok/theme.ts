/**
 * Charte du storyboard « Stopper l'humidité montante » (version 9:16).
 *
 * ⚠️ Ces valeurs viennent du storyboard PDF, qui diffère du bleu/orange
 * communiqués plus tôt (#019EE5 / #DD6A00). Tout est centralisé ici : pour
 * repasser sur l'autre charte, il suffit de changer `navy` et `orange`.
 */

export const C = {
  navy: "#003366", // fonds, titres, bandeaux
  navyDeep: "#00223F",
  navyLight: "#0A4C86",
  /** Fond « navy clair » demandé pour les plans en coupe. */
  navyPale: "#EAF2F8",

  orange: "#F07800", // accents, chiffres d'étape, flèches
  orangeDark: "#B85B00",
  orangeLight: "#FFA33F",

  white: "#FFFFFF",
  ink: "#0B1B2B",

  water: "#1B8CD8",
  waterDeep: "#0C5C93",
} as const;

/**
 * Le storyboard demande Poppins. Aucune police n'est embarquée dans le projet
 * (le rendu doit fonctionner hors ligne) : on utilise la pile système la plus
 * proche. Pour du vrai Poppins, ajouter @remotion/google-fonts.
 */
export const FONT_TITLE =
  '"Poppins", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif';
export const FONT_BODY = FONT_TITLE;
