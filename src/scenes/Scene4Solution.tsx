import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SHADOW } from "../theme";
import { CaptionTrack } from "../components/Caption";
import { Callout } from "../components/Callout";
import { Scene } from "../components/Scene";
import { SceneHeader } from "../components/SceneHeader";
import { JOINT_Y, VIEW, Wall, holeX, wallCardStyle } from "../components/Wall";
import { SCRIPT } from "../content";
import { bob } from "../animations";
import { SCENE_TITLES } from "../timeline";

const WALL_LEFT = 510;
const WALL_TOP = 190;
const WALL_WIDTH = 900;

const STEPS = [
  { n: "1", title: "Perçage", detail: "Un trou tous les 10 cm" },
  { n: "2", title: "Injection", detail: "Crème hydrofuge sous pression" },
];

/** Carte d'étape (1/2 puis 2/2), en fondu croisé. */
const StepCard: React.FC<{ index: number; opacity: number }> = ({
  index,
  opacity,
}) => {
  const step = STEPS[index];
  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        top: 290,
        width: 380,
        opacity,
        background: COLORS.white,
        borderRadius: 26,
        boxShadow: SHADOW.card,
        padding: "30px 34px",
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          color: COLORS.blue,
        }}
      >
        {`Étape ${step.n} / 2`}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 46,
          fontWeight: 800,
          color: COLORS.ink,
        }}
      >
        {step.title}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 28,
          fontWeight: 600,
          lineHeight: 1.3,
          color: COLORS.inkSoft,
        }}
      >
        {step.detail}
      </div>
    </div>
  );
};

/**
 * Calques d'annotation dessinés dans le même repère que le schéma de mur :
 * cote « 10 cm » entre deux perçages et cartouche d'injection.
 */
const WallAnnotations: React.FC<{ ruler: number; inject: number }> = ({
  ruler,
  inject,
}) => {
  const frame = useCurrentFrame();
  const a = holeX(5);
  const b = holeX(6);
  const mid = (a + b) / 2;
  const y = JOINT_Y - 60;
  const nozzleX = interpolate(inject, [0, 1], [holeX(0), holeX(12)]);

  return (
    <svg
      width={WALL_WIDTH}
      height={(WALL_WIDTH * VIEW.h) / VIEW.w}
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {/* Cote « 10 cm » */}
      {ruler > 0.01 ? (
        <g opacity={ruler}>
          <line
            x1={a}
            y1={y - 4}
            x2={a}
            y2={JOINT_Y - 14}
            stroke={COLORS.blueDark}
            strokeWidth={3}
          />
          <line
            x1={b}
            y1={y - 4}
            x2={b}
            y2={JOINT_Y - 14}
            stroke={COLORS.blueDark}
            strokeWidth={3}
          />
          <line
            x1={a}
            y1={y}
            x2={b}
            y2={y}
            stroke={COLORS.blueDark}
            strokeWidth={3}
          />
          <polyline
            points={`${a + 11},${y - 6} ${a + 1},${y} ${a + 11},${y + 6}`}
            fill="none"
            stroke={COLORS.blueDark}
            strokeWidth={3}
          />
          <polyline
            points={`${b - 11},${y - 6} ${b - 1},${y} ${b - 11},${y + 6}`}
            fill="none"
            stroke={COLORS.blueDark}
            strokeWidth={3}
          />
          <rect
            x={mid - 52}
            y={y - 46}
            width={104}
            height={38}
            rx={19}
            fill={COLORS.white}
            stroke={COLORS.blue}
            strokeWidth={3}
          />
          <text
            x={mid}
            y={y - 19}
            textAnchor="middle"
            fontSize={26}
            fontWeight={800}
            fill={COLORS.blueDark}
          >
            10 cm
          </text>
        </g>
      ) : null}

      {/* Cartouche d'injection qui progresse le long du joint */}
      {inject > 0.001 && inject < 0.999 ? (
        <g transform={`translate(${nozzleX} ${JOINT_Y - 116 + bob(frame, 22, 4)})`}>
          <rect x={-19} y={-96} width={38} height={22} rx={7} fill={COLORS.blueDark} />
          <rect x={-15} y={-78} width={30} height={64} rx={9} fill={COLORS.blue} />
          <rect x={-9} y={-66} width={18} height={40} rx={5} fill={COLORS.bluePale} opacity={0.75} />
          <path d="M-7 -14 L7 -14 L3 24 L-3 24 Z" fill={COLORS.blueDark} />
          <circle cx={0} cy={40} r={9} fill={COLORS.barrierGlow} opacity={0.9} />
          <circle cx={0} cy={62} r={6} fill={COLORS.barrierGlow} opacity={0.5} />
        </g>
      ) : null}
    </svg>
  );
};

/** Séquence 4 — La solution technique (28 → 50 s). */
export const Scene4Solution: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  const jointHighlight = interpolate(frame, [60, 105], [0, 1], clamp);
  const holes = interpolate(frame, [130, 300], [0, 1], clamp);
  const ruler = interpolate(frame, [196, 220, 330, 352], [0, 1, 1, 0], clamp);
  const barrier = interpolate(frame, [360, 545], [0, 1], clamp);
  const arrows = interpolate(frame, [0, 20, 380, 520], [0, 0.55, 0.55, 0], clamp);
  const step2 = interpolate(frame, [318, 348], [0, 1], clamp);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <SceneHeader index={4} title={SCENE_TITLES.solution} />

        <div
          style={{ ...wallCardStyle(WALL_WIDTH), left: WALL_LEFT, top: WALL_TOP }}
        >
          <Wall
            uid="s4"
            width={WALL_WIDTH}
            dampLevel={0.78}
            arrows={arrows}
            mould={0.6}
            flaking={1}
            jointHighlight={jointHighlight}
            holes={holes}
            barrier={barrier}
          />
          <WallAnnotations ruler={ruler} inject={barrier} />
        </div>

        <StepCard index={0} opacity={1 - step2} />
        <StepCard index={1} opacity={step2} />

        <Callout
          text="Joint de ciment horizontal"
          accent={COLORS.blue}
          delay={92}
          rotate={-1.5}
          fontSize={30}
          style={{ left: 118, top: 588, opacity: 1 - step2 }}
        />
        <Callout
          text="Crème hydrofuge"
          accent={COLORS.blue}
          delay={372}
          rotate={1.5}
          fontSize={32}
          style={{ left: 1478, top: 300 }}
        />
        <Callout
          text="Barrière étanche"
          accent={COLORS.barrier}
          delay={470}
          rotate={-1.5}
          fontSize={32}
          style={{ left: 1466, top: 430 }}
        />
        <Callout
          text="Même à 95 % d'humidité !"
          accent={COLORS.alert}
          delay={566}
          rotate={2}
          fontSize={32}
          style={{ left: 1400, top: 566 }}
        />

        <CaptionTrack lines={SCRIPT.solution} />
      </AbsoluteFill>
    </Scene>
  );
};
