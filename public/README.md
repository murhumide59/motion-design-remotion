# public/

Assets utilisés au rendu. Pour changer un visuel, il suffit de remplacer le
fichier : aucun code à modifier.

| Fichier | Utilisé par |
|---|---|
| `logo.png` | `src/components/Logo.tsx` — logo officiel Mur Humide. |
| `mascotte.png` | Victor avec son panneau « Diagnostic gratuit » — séquences 1 et 6. Détouré à partir de `brand/lamascotte.png`. |
| `mascotte2.png` | Victor bras ouverts — séquences 2, 3 et 5. Recadré depuis `brand/mascotte2.png` (déjà fourni avec transparence). |

Le choix du visuel se fait par séquence, via la prop `src` du composant
`Mascotte` (`<Mascotte src="mascotte2.png" … />`).

Recommandations pour un remplacement de la mascotte :

- PNG **à fond réellement transparent** (le fichier d'origine était en RVB, le
  damier était aplati dans l'image et a dû être détouré) ;
- format **portrait**, personnage cadré au plus juste ;
- le composant gère l'entrée (fondu + spring), la respiration et le salut.
