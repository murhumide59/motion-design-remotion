# public/

Assets utilisés au rendu. Pour changer un visuel, il suffit de remplacer le
fichier : aucun code à modifier.

| Fichier | Utilisé par |
|---|---|
| `logo.png` | `src/components/Logo.tsx` — logo officiel Mur Humide. |
| `mascotte.png` | `src/components/Mascotte.tsx` — Victor, détouré à partir de `brand/lamascotte.png`. |

Recommandations pour un remplacement de la mascotte :

- PNG **à fond réellement transparent** (le fichier d'origine était en RVB, le
  damier était aplati dans l'image et a dû être détouré) ;
- format **portrait**, personnage cadré au plus juste ;
- le composant gère l'entrée (fondu + spring), la respiration et le salut.
