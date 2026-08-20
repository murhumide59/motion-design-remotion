# brand/

Fichiers sources fournis par Mur Humide, conservés tels quels.

| Fichier | Usage |
|---|---|
| `lelogo.png` | Logo officiel. Copié tel quel en `public/logo.png`, utilisé par `src/components/Logo.tsx`. |
| `mascotte2.png` | Rendu 3D de Victor, bras ouverts. Déjà fourni avec un canal alpha : simplement recadré sur le personnage pour donner `public/mascotte2.png`. |
| `lamascotte.png` | Rendu 3D de Victor avec son panneau. Le fichier d'origine est en RVB **sans canal alpha** : le damier de fond y est aplati. Il a été détouré (fond rendu transparent, recadrage sur le personnage) pour produire `public/mascotte.png`. |

Si une nouvelle version de la mascotte est fournie **avec** un vrai fond
transparent, il suffit de la déposer directement en `public/mascotte.png`.
