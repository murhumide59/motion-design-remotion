import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONT } from "../theme";

type Props = {
  /** Hauteur du logo en px (le fichier garde son ratio). */
  size?: number;
  /** Ajoute « HAUTS-DE-FRANCE » sous le logo, comme sur la version complète. */
  showBaseline?: boolean;
  style?: React.CSSProperties;
};

/**
 * Logo officiel Mur Humide (`public/logo.png`).
 * Pour le mettre à jour, il suffit de remplacer ce fichier.
 */
export const Logo: React.FC<Props> = ({
  size = 120,
  showBaseline = false,
  style,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: FONT,
        ...style,
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{ height: size, width: "auto", display: "block" }}
      />
      {showBaseline ? (
        <div
          style={{
            marginTop: size * 0.06,
            fontSize: size * 0.155,
            fontWeight: 800,
            letterSpacing: size * 0.014,
            color: COLORS.ink,
            whiteSpace: "nowrap",
          }}
        >
          HAUTS-DE-FRANCE
        </div>
      ) : null}
    </div>
  );
};
