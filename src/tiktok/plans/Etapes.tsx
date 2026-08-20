import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT_TITLE } from "../theme";
import { Captions } from "../components/Caption";
import { Footage } from "../components/Footage";
import { StepBadge } from "../components/StepBadge";
import { WallShot } from "../components/WallShot";
import {
  Blower,
  Chisel,
  DustJet,
  HoleCutaway,
  PencilMark,
} from "../components/SiteTools";
import { WORK } from "../framing";
import { SUBS } from "../content";
import { Drill, InjectionGun, TapeMeasure, Trowel } from "../../components/Tools";
import { DustPuff, ImpactStar } from "../../components/Effects";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TOOL_SCALE = 1.45;

/** Petite étiquette technique (cote, diamètre…). */
const Spec: React.FC<{ text: string; x: number; y: number; progress: number }> = ({
  text,
  x,
  y,
  progress,
}) => {
  if (progress <= 0.01) return null;
  const w = 60 + text.length * 30;
  return (
    <g transform={`translate(${x} ${y}) scale(${interpolate(progress, [0, 1], [0.6, 1])})`} opacity={Math.min(1, progress * 2)}>
      <rect x={-w / 2} y={-44} width={w} height={88} rx={12} fill={C.orange} />
      <text x={0} y={16} textAnchor="middle" fontFamily={FONT_TITLE} fontSize={54} fontWeight={800} fill={C.white}>
        {text}
      </text>
    </g>
  );
};

/* ------------------------- 1 — Décroûtage ------------------------- */

export const Etape1: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const flaking = interpolate(frame, [6, duration - 12], [0.15, 1], clamp);
  const hitX = [WORK.holeX(2), WORK.holeX(4), WORK.holeX(6)];
  const hit = Math.min(2, Math.floor(frame / 28));

  return (
    <AbsoluteFill>
      <Footage shot="C">
        <WallShot framing={WORK} dampLevel={0.55} flaking={flaking} mould={0.5} arrows={0.35} zoom={interpolate(frame, [0, duration], [1, 1.05], clamp)}>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
            {hitX.map((x, i) => {
              const start = i * 28;
              const p = interpolate(frame, [start, start + 22], [0, 1], clamp);
              return (
                <g key={i}>
                  <DustPuff x={x} y={620} progress={p} />
                  <ImpactStar x={x} y={620} progress={p} color={C.orange} />
                </g>
              );
            })}
            <Chisel x={hitX[hit]} y={620} shake={1} frame={frame} scale={TOOL_SCALE} />
          </svg>
        </WallShot>
      </Footage>
      <StepBadge n={1} label="Décroûtage" />
      <Captions subs={SUBS.etape1} />
    </AbsoluteFill>
  );
};

/* --------------------------- 2 — Traçage --------------------------- */

export const Etape2: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const tape = interpolate(frame, [10, 34, duration - 8, duration], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill>
      <Footage shot="D">
        <WallShot framing={WORK} dampLevel={0.55} flaking={1} mould={0.4} arrows={0.3} jointHighlight={interpolate(frame, [4, 24], [0, 1], clamp)}>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
            {Array.from({ length: 7 }, (_, i) => {
              const p = interpolate(frame, [16 + i * 6, 28 + i * 6], [0, 1], clamp);
              if (p <= 0.01) return null;
              return (
                <g key={i} opacity={p}>
                  <PencilMark
                    x={WORK.holeX(i)}
                    y={WORK.joint}
                    scale={interpolate(p, [0, 1], [0.4, 1.6])}
                  />
                </g>
              );
            })}
            <TapeMeasure
              x1={WORK.holeX(2)}
              x2={WORK.holeX(3)}
              y={WORK.joint - 210}
              label="12 cm"
              progress={tape}
              labelScale={2.1}
            />
          </svg>
        </WallShot>
      </Footage>
      <StepBadge n={2} label="Traçage" />
      <Captions subs={SUBS.etape2} />
    </AbsoluteFill>
  );
};

/* --------------------------- 3 — Perçage --------------------------- */

export const Etape3: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  /* 7 trous sont visibles dans ce cadrage : on les perce dans l'ordre, la
     progression du mur (13 trous au total) suit le même rythme. */
  const drilled = interpolate(frame, [8, duration - 10], [0, 7 / 13], clamp);
  const toolX = WORK.holeX(Math.min(6, drilled * 13));

  return (
    <AbsoluteFill>
      <Footage shot="E">
        <WallShot framing={WORK} dampLevel={0.55} flaking={1} mould={0.4} arrows={0.3} holes={drilled} jointHighlight={1}>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
            {Array.from({ length: 7 }, (_, i) => {
              const f = 8 + ((duration - 18) * i) / 6;
              const p = interpolate(frame, [f, f + 20], [0, 1], clamp);
              return (
                <g key={i}>
                  <DustPuff x={WORK.holeX(i)} y={WORK.joint} progress={p} />
                  <ImpactStar x={WORK.holeX(i)} y={WORK.joint} progress={p} color={C.orange} />
                </g>
              );
            })}
            <Drill x={toolX} y={WORK.joint} angle={54} shake={1} frame={frame} scale={TOOL_SCALE} accent={C.orange} />
            <Spec text="Ø 12 mm" x={772} y={604} progress={interpolate(frame, [30, 46], [0, 1], clamp)} />
          </svg>
        </WallShot>
      </Footage>
      <StepBadge n={3} label="Perçage" />
      <Captions subs={SUBS.etape3} />
    </AbsoluteFill>
  );
};

/* ------------------------ 4 — Dépoussiérage ------------------------ */

export const Etape4: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const target = 3;

  return (
    <AbsoluteFill>
      <Footage shot="G">
        <WallShot
          framing={WORK}
          dampLevel={0.55}
          flaking={1}
          mould={0.4}
          arrows={0.3}
          holes={1}
          zoom={interpolate(frame, [0, duration], [1.06, 1.12], clamp)}
        >
          <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
            <DustJet x={WORK.holeX(target)} y={WORK.joint} progress={interpolate(frame, [12, duration - 6], [0, 1], clamp)} />
            <Blower x={WORK.holeX(target) + 40} y={WORK.joint} scale={TOOL_SCALE} />
          </svg>
        </WallShot>
      </Footage>
      <StepBadge n={4} label="Dépoussiérage" />
      <Captions subs={SUBS.etape4} />
    </AbsoluteFill>
  );
};

/* ------------------------- 6 — Rebouchage ------------------------- */

export const Etape6: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const patched = interpolate(frame, [4, duration - 20], [0, 1], clamp);
  const toolX = interpolate(patched, [0, 1], [WORK.holeX(6), WORK.holeX(0)]);

  return (
    <AbsoluteFill>
      <Footage shot="K">
        <WallShot
          framing={WORK}
          dampLevel={0.12}
          flaking={0.35}
          repaired={interpolate(frame, [10, duration], [0, 1], clamp)}
          mould={0}
          arrows={0}
          holes={1}
          patched={patched}
          barrier={1}
          clean={1}
        >
          <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
            {patched < 1 ? <Trowel x={toolX} y={WORK.joint} angle={54} scale={TOOL_SCALE} /> : null}
          </svg>
        </WallShot>
      </Footage>
      <StepBadge n={6} label="Rebouchage" />
      <Captions subs={SUBS.etape6} />
    </AbsoluteFill>
  );
};

/* -------------------------- 5 — Injection -------------------------- */

export const Etape5: React.FC<{ duration: number }> = () => {
  const frame = useCurrentFrame();
  const cut = 108;
  const inject = interpolate(frame, [16, cut - 10], [0, 1], clamp);

  if (frame >= cut) {
    const f = frame - cut;
    return (
      <AbsoluteFill style={{ backgroundColor: C.navyPale }}>
        <HoleInsert frame={f} />
        <StepBadge n={5} label="Injection" delay={0} hold={40} />
        <Captions subs={SUBS.etape5} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <Footage shot="H">
        <WallShot
          framing={WORK}
          dampLevel={0.55}
          flaking={1}
          mould={0.35}
          arrows={0.25}
          holes={1}
          barrier={inject * 0.32}
          zoom={interpolate(frame, [0, cut], [1.05, 1.14], clamp)}
        >
          <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
            <InjectionGun
              x={WORK.holeX(Math.min(3, inject * 4))}
              y={WORK.joint}
              angle={54}
              shake={1}
              frame={frame}
              scale={TOOL_SCALE}
              accent={C.orange}
            />
          </svg>
        </WallShot>
      </Footage>
      <StepBadge n={5} label="Injection" />
      <Captions subs={SUBS.etape5} />
    </AbsoluteFill>
  );
};

const HoleInsert: React.FC<{ frame: number }> = ({ frame }) => {
  const fill = interpolate(frame, [0, 40], [0.15, 1], clamp);
  const gap = interpolate(frame, [34, 48], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ transform: `scale(${interpolate(frame, [0, 60], [1.02, 1.08], clamp)})` }}>
      <HoleCutaway fill={fill} showGap={gap} />
    </AbsoluteFill>
  );
};
