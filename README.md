# Vidéo Mur Humide Hauts-de-France — les remontées capillaires

Vidéo explicative animée avec [Remotion](https://remotion.dev), destinée à
tourner en boucle sur un écran TV lors d'un salon de l'habitat.

- **Format** : 1920 × 1080 (16:9 horizontal)
- **Cadence** : 30 fps
- **Durée** : 70 s (2100 frames)
- **Identité** : bleu `#019EE5` & orange `#DD6A00` (charte Mur Humide)
- **Composition** : `MurhumideVideo`

## Démarrer

```bash
npm install
npm run dev      # ouvre Remotion Studio (prévisualisation + timeline)
npm run render   # rend out/murhumide.mp4
npm run lint     # eslint + tsc
```

> Environnement sans Chrome téléchargeable ? Ajoutez
> `--browser-executable=/chemin/vers/chrome` à la commande de rendu.

## Déroulé des 6 séquences

| # | Séquence | Timecode | Frames | Contenu |
|---|----------|----------|--------|---------|
| 1 | Intro | 0 → 8 s | 0-240 | Apparition de Victor (fondu + scale spring), logo Mur Humide |
| 2 | Le problème | 8 → 20 s | 240-600 | Mur en coupe, flèches d'humidité montant du sol, plâtrage qui se détache, moisissures |
| 3 | Le diagnostic | 20 → 28 s | 600-840 | Loupe qui ausculte le mur, check-list, hygromètre animé jusqu'à 95 % |
| 4 | La solution | 28 → 50 s | 840-1500 | Étape 1 : perçage tous les 10 cm dans le joint. Étape 2 : injection de la crème hydrofuge et barrière étanche |
| 5 | Le résultat | 50 → 60 s | 1500-1800 | Balayage avant/après : le mur redevient sain et sec, trous rebouchés |
| 6 | Écran de fin | 60 → 70 s | 1800-2100 | Logo, coordonnées, mascotte qui salue, appel au diagnostic gratuit |

Les scènes se recouvrent de `SCENE_OVERLAP` frames (18) pour un fondu croisé
continu ; le fond et la barre de progression ne sont jamais coupés.

## Structure du code

```
brand/                     fichiers sources fournis par le client
public/                    assets utilisés au rendu (logo.png, mascotte.png)
src/
├─ index.ts               point d'entrée Remotion
├─ Root.tsx               déclaration de la composition
├─ MurhumideVideo.tsx     assemblage des 6 séquences
├─ timeline.ts            format, durées et ordre des séquences
├─ content.ts             TOUS les textes + nom de la mascotte + coordonnées
├─ theme.ts               couleurs de la charte, typo, ombres
├─ animations.ts          helpers spring / interpolate réutilisables
├─ components/            briques réutilisables
│  ├─ Scene.tsx           enveloppe de séquence (fondu croisé)
│  ├─ Background.tsx      fond continu de la vidéo
│  ├─ Logo.tsx            logo officiel (public/logo.png) + « HAUTS-DE-FRANCE »
│  ├─ Mascotte.tsx        Victor, la mascotte animée (public/mascotte.png)
│  ├─ Caption.tsx         sous-titres synchronisés du commentaire
│  ├─ SceneHeader.tsx     bandeau « étape N + titre » et logo
│  ├─ Callout.tsx         étiquette incrustée qui « pope »
│  ├─ MoistureGauge.tsx   hygromètre du diagnostic
│  ├─ ProgressBar.tsx     barre de progression globale
│  └─ Wall.tsx            schéma de mur en coupe (partagé par les scènes 2, 4, 5)
└─ scenes/                une séquence par fichier
   ├─ Scene1Intro.tsx
   ├─ Scene2Probleme.tsx
   ├─ Scene3Diagnostic.tsx
   ├─ Scene4Solution.tsx
   ├─ Scene5Resultat.tsx
   └─ Scene6Cta.tsx
```

`Wall.tsx` est le cœur graphique : un seul schéma SVG dont l'état (hauteur des
remontées, moisissures, décollement du plâtre, perçages, barrière hydrofuge,
mur assaini) est entièrement piloté par des props, ce qui permet de le faire
évoluer d'une séquence à l'autre. Échelle du schéma : **40 px = 10 cm**, d'où
les 13 perçages espacés de 10 cm sur le joint horizontal.

## À personnaliser avant diffusion

1. **`src/content.ts`** — le site, l'e-mail et le numéro de stand sont encore
   des valeurs d'exemple (le téléphone 03 20 06 55 11 est le bon).
2. **`public/`** — les visuels officiels : `logo.png`, `mascotte.png` (Victor
   avec son panneau, séquences 1 et 6) et `mascotte2.png` (Victor bras
   ouverts, séquences 2, 3 et 5). Pour les mettre à jour, il suffit de
   remplacer ces fichiers (voir `brand/README.md`).
3. **`src/content.ts` → `SCRIPT`** — les sous-titres et leur minutage
   (`from` / `durationInFrames`, en frames, relatifs au début de la séquence)
   si un voice-over est ajouté ensuite.

La vidéo est muette : les textes parlés sont affichés en sous-titres, ce qui
convient à un écran de salon sans son. Pour ajouter une voix off, déposez le
fichier dans `public/` et montez-le avec `<Audio src={staticFile(...)} />`
dans `MurhumideVideo.tsx`.
