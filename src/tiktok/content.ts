import type { PlanId } from "./timeline";

export type Sub = { from: number; duration: number; text: string };

/**
 * Sous-titres, repris mot pour mot du storyboard.
 * `from` et `duration` sont en frames, relatifs au début du plan (25 fps).
 */
export const SUBS: Partial<Record<PlanId, Sub[]>> = {
  accroche: [
    { from: 14, duration: 54, text: "Salpêtre, moisissures, odeur de cave ?" },
    { from: 70, duration: 52, text: "Vos plinthes se décollent ?" },
  ],
  diagnostic: [
    { from: 26, duration: 122, text: "L'eau du sol remonte par capillarité." },
  ],
  etape1: [
    { from: 8, duration: 78, text: "1 — Décroûtage jusqu'à la maçonnerie saine." },
  ],
  etape2: [
    { from: 8, duration: 78, text: "2 — Traçage tous les 12 cm sur le joint le plus bas." },
  ],
  etape3: [
    { from: 8, duration: 78, text: "3 — Perçage Ø 12 mm, profondeur = épaisseur du mur − 3 cm." },
  ],
  etape4: [
    { from: 8, duration: 78, text: "4 — Dépoussiérage : la crème doit toucher la maçonnerie." },
  ],
  etape5: [
    { from: 12, duration: 96, text: "5 — Injection d'Humabloc Plus, retrait lent." },
    { from: 112, duration: 60, text: "Le dernier centimètre reste libre." },
  ],
  barriere: [
    { from: 44, duration: 104, text: "Une barrière étanche continue. Définitive." },
  ],
  etape6: [
    { from: 6, duration: 68, text: "6 — Rebouchage et enduit d'assainissement respirant." },
  ],
};

/** Écran de signature. */
export const SIGNATURE = {
  title: "Diagnostic gratuit",
  pastilles: ["Garantie de résultat", "Devis sous 48 h", "Hauts-de-France & Oise"],
  site: "mh59.fr",
} as const;
