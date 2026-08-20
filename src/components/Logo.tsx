import React from "react";
import { random } from "remotion";
import { COLORS, FONT } from "../theme";

type Variant = "full" | "compact";

type Props = {
  /** Hauteur totale du logo en px. */
  size?: number;
  /**
   * `full` : le bloc de briques complet avec « HAUTS-DE-FRANCE » (écrans
   * d'intro et de fin). `compact` : goutte + wordmark sur une ligne, pour le
   * bandeau des séquences.
   */
  variant?: Variant;
  showBaseline?: boolean;
  style?: React.CSSProperties;
};

/* ---------------------------- Mur de briques ---------------------------- */

const ROWS = 11;
const ROW_H = 44;
const ROW_GAP = 9;
const BRICK_W = 122;
const BRICK_GAP = 9;
const WALL_W = 940;

/** Briques en appareil croisé, avec des extrémités volontairement irrégulières. */
const BRICKS = Array.from({ length: ROWS }, (_, r) => {
  const y = r * (ROW_H + ROW_GAP);
  const offset = r % 2 === 0 ? 0 : -(BRICK_W + BRICK_GAP) / 2;
  const trimLeft = Math.round(random(`bl${r}`) * 2) * 62;
  const trimRight = Math.round(random(`br${r}`) * 2) * 62;
  const bricks: { x: number; y: number; w: number }[] = [];
  for (let c = -1; c < 9; c++) {
    const x = offset + c * (BRICK_W + BRICK_GAP);
    const x0 = Math.max(x, trimLeft);
    const x1 = Math.min(x + BRICK_W, WALL_W - trimRight);
    if (x1 - x0 > 26) bricks.push({ x: x0, y, w: x1 - x0 });
  }
  return bricks;
}).flat();

const Droplet: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => {
  const h = w * 1.34;
  return (
    <path
      d={`M${x} ${y} C${x} ${y} ${x - w / 2} ${y + h * 0.52} ${x - w / 2} ${y + h * 0.66} a${w / 2} ${w / 2} 0 0 0 ${w} 0 C${x + w / 2} ${y + h * 0.52} ${x} ${y} ${x} ${y} Z`}
      fill={COLORS.blue}
      stroke={COLORS.blueDeep}
      strokeWidth={8}
      strokeLinejoin="round"
    />
  );
};

/** Texte bleu à liseré bleu nuit, détouré de blanc (comme sur le logo). */
const BrandText: React.FC<{
  x: number;
  y: number;
  size: number;
  children: string;
  halo?: number;
}> = ({ x, y, size, children, halo = 26 }) => (
  <>
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={size}
      fontWeight={900}
      letterSpacing={-size * 0.01}
      stroke={COLORS.white}
      strokeWidth={halo}
      strokeLinejoin="round"
      paintOrder="stroke"
      fill={COLORS.white}
    >
      {children}
    </text>
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={size}
      fontWeight={900}
      letterSpacing={-size * 0.01}
      stroke={COLORS.blueDeep}
      strokeWidth={9}
      strokeLinejoin="round"
      paintOrder="stroke"
      fill={COLORS.blue}
    >
      {children}
    </text>
  </>
);

/* ------------------------------------------------------------------ */

const FULL_VB = { w: 940, h: 726 };
const COMPACT_VB = { w: 760, h: 150 };

/**
 * Logo Mur Humide Hauts-de-France, reconstitué en SVG (net à toute taille).
 * Pour utiliser le fichier officiel à la place, déposez-le dans `public/`
 * et remplacez ce composant par un `<Img src={staticFile("logo.png")} />`.
 */
export const Logo: React.FC<Props> = ({
  size = 120,
  variant = "compact",
  showBaseline = false,
  style,
}) => {
  if (variant === "full") {
    const scale = size / FULL_VB.h;
    return (
      <svg
        width={FULL_VB.w * scale}
        height={size}
        viewBox={`0 0 ${FULL_VB.w} ${FULL_VB.h}`}
        style={{ display: "block", ...style }}
      >
        <g>
          {BRICKS.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={ROW_H}
              rx={9}
              fill={COLORS.orange}
            />
          ))}
        </g>
        <BrandText x={452} y={268} size={172}>
          MUR
        </BrandText>
        <Droplet x={742} y={148} w={104} />
        <BrandText x={470} y={452} size={172}>
          HUMIDE
        </BrandText>
        <text
          x={470}
          y={706}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={92}
          fontWeight={800}
          letterSpacing={2}
          fill={COLORS.ink}
        >
          HAUTS-DE-FRANCE
        </text>
      </svg>
    );
  }

  const scale = size / COMPACT_VB.h;
  return (
    <svg
      width={COMPACT_VB.w * scale}
      height={size}
      viewBox={`0 0 ${COMPACT_VB.w} ${COMPACT_VB.h}`}
      style={{ display: "block", ...style }}
    >
      <Droplet x={54} y={16} w={82} />
      <text
        x={126}
        y={showBaseline ? 96 : 108}
        fontFamily={FONT}
        fontSize={92}
        fontWeight={900}
        letterSpacing={-1}
        stroke={COLORS.blueDeep}
        strokeWidth={7}
        strokeLinejoin="round"
        paintOrder="stroke"
        fill={COLORS.blue}
      >
        MUR HUMIDE
      </text>
      {showBaseline ? (
        <text
          x={130}
          y={138}
          fontFamily={FONT}
          fontSize={31}
          fontWeight={800}
          letterSpacing={5.5}
          fill={COLORS.ink}
        >
          HAUTS-DE-FRANCE
        </text>
      ) : null}
    </svg>
  );
};
