# « Victor fait l'injection » — vidéo Mur Humide Hauts-de-France

Film d'animation réalisé avec [Remotion](https://remotion.dev), destiné à
tourner en boucle sur un écran TV lors d'un salon de l'habitat. Victor, la
mascotte, réalise le traitement en direct : constat, perçage, injection,
résultat.

- **Format** : 1920 × 1080 (16:9 horizontal)
- **Cadence** : 30 fps
- **Durée** : 70 s (2100 frames)
- **Identité** : bleu `#019EE5` & orange `#DD6A00` (charte Mur Humide)
- **Composition** : `MurhumideVideo`

## Démarrer

```bash
npm install
npm run dev             # ouvre Remotion Studio (prévisualisation + timeline)
npm run render          # 16:9 → out/murhumide.mp4
npm run render:tiktok   # 9:16 → out/murhumide-tiktok.mp4
npm run lint            # eslint + tsc
```

Deux compositions sont disponibles :

| Composition | Format | Cadence | Durée | Usage |
|---|---|---|---|---|
| `MurhumideVideo` | 1920x1080 | 30 fps | 70 s | Écran TV de salon, en boucle |
| `MurhumideTikTok` | 1080x1920 | 25 fps | 45 s | TikTok / Reels / LinkedIn |

> Environnement sans Chrome téléchargeable ? Ajoutez
> `--browser-executable=/chemin/vers/chrome` à la commande de rendu.

## Déroulé des 6 séquences

| # | Séquence | Timecode | Ce qui se passe à l'image |
|---|----------|----------|---------------------------|
| 1 | Intro | 0 → 8 s | Victor entre en scène, salue, logo Mur Humide |
| 2 | Le constat | 8 → 18 s | Il s'approche du mur, le touche : une écaille de plâtre tombe (« CRAC ! »), l'humidité remonte, moisissures, puis l'ampoule de l'idée |
| 3 | Le perçage | 18 → 32 s | Perceuse en main, il avance le long du joint et perce les 13 trous, poussière et étoiles d'impact, mètre-ruban « 10 cm », badge « Ø 12 mm » |
| 4 | L'injection | 32 → 50 s | Pistolet à cartouche, il injecte trou par trou ; la crème bleue diffuse et la barrière étanche se dessine sous ses pas |
| 5 | Le résultat | 50 → 60 s | Il rebouche les trous à la truelle, recule et admire : le mur sèche, les moisissures disparaissent, le plâtre est refait |
| 6 | Écran de fin | 60 → 70 s | Victor salue devant le logo, coordonnées et diagnostic gratuit |

Les scènes se recouvrent de `SCENE_OVERLAP` frames (18) pour un fondu croisé
continu.

## Structure du code

```
brand/                     fichiers sources fournis par le client
public/                    assets utilisés au rendu (logo, mascotte)
src/
├─ index.ts               point d'entrée Remotion
├─ Root.tsx               déclaration de la composition
├─ MurhumideVideo.tsx     décor permanent + les 6 séquences
├─ timeline.ts            format, durées et ordre des séquences
├─ content.ts             TOUS les textes + nom de la mascotte + coordonnées
├─ theme.ts               couleurs de la charte, typo, ombres
├─ animations.ts          helpers spring / interpolate réutilisables
├─ wallState.ts           état du mur (humidité, trous, barrière, séchage)
│                         calculé à partir de la frame absolue
├─ components/
│  ├─ Set.tsx             décor permanent : ciel, sol, mur, logo, progression
│  ├─ Stage.tsx           ciel, sol, repères de placement (sol, joint, Victor)
│  ├─ Wall.tsx            le mur en coupe, piloté par props
│  ├─ Mascotte.tsx        Victor (deux poses, marche et salut)
│  ├─ Tools.tsx           perceuse, pistolet à cartouche, mètre, truelle
│  ├─ Effects.tsx         poussière, étoiles d'impact, onomatopées, étincelles
│  ├─ SpeechBubble.tsx    bulle de BD, la pointe suit Victor
│  ├─ Callout.tsx         étiquette incrustée qui « pope »
│  ├─ Logo.tsx            logo officiel + « HAUTS-DE-FRANCE »
│  ├─ ProgressBar.tsx     barre de progression globale
│  └─ Scene.tsx           enveloppe de séquence (fondu croisé)
└─ scenes/                une séquence par fichier
   ├─ Scene1Intro.tsx
   ├─ Scene2Constat.tsx
   ├─ Scene3Percage.tsx
   ├─ Scene4Injection.tsx
   ├─ Scene5Resultat.tsx
   └─ Scene6Cta.tsx
```

Deux principes structurent le code :

- **Le décor est continu.** `Set.tsx` est rendu une seule fois, hors des
  séquences ; l'état du mur vient de `wallState.ts`, calculé à partir de la
  frame absolue. Les scènes n'ajoutent que Victor, ses outils et son texte, ce
  qui évite tout saut du décor d'une scène à l'autre.
- **Victor et ses outils partagent le même repère.** `Stage.tsx` expose la
  position du sol, celle du joint de ciment, l'abscisse de chaque trou et la
  fonction `victorLeftFor()` qui place Victor pour que la pointe de son outil
  vise exactement le trou en cours. C'est ce qui synchronise sa marche, la
  perceuse, la poussière et l'apparition des trous dans le mur.

Échelle du schéma : **40 px = 10 cm**, d'où les 13 perçages espacés de 10 cm
sur le joint horizontal.

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


## Version verticale — « Stopper l'humidité montante »

`MurhumideTikTok` suit le storyboard PDF (version 9:16, 45 s) : accroche en
macro dès la frame 0, sous-titres remontés à 25 % du bas pour rester hors de
l'interface TikTok, montage cut sec, compréhension totale sans le son.

```
src/tiktok/
├─ TikTokVideo.tsx      assemblage des 10 plans
├─ timeline.ts          durées reprises du tableau « Version 9x16 »
├─ content.ts           sous-titres, mot pour mot du storyboard
├─ theme.ts             charte du storyboard (navy #003366 / orange #F07800)
├─ framing.ts           deux cadrages du mur : DIAG (large) et WORK (chantier)
├─ footage.ts           branchement des prises de vue réelles
├─ components/          bandeau sous-titre, pastille d'étape, outils, décors
└─ plans/               un fichier par séquence
```

### Prises de vue réelles

Le storyboard mêle motion design et tournage. Les plans à tourner
(décroûtage, perçage, injection…) sont pour l'instant joués par des
animations de remplacement, si bien que la vidéo est diffusable dès
maintenant. Pour brancher un rush : déposer le fichier dans
`public/footage/` et renseigner son nom dans `src/tiktok/footage.ts` — voir
`public/footage/README.md` pour la liste de tournage et les réglages.
