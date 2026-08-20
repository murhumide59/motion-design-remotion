import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Captions } from "../components/Caption";
import { WallShot } from "../components/WallShot";
import { DIAG } from "../framing";
import { SUBS } from "../content";
import { Mascotte } from "../../components/Mascotte";
import { bob } from "../../animations";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Nappe d'eau animée dans le sol. */
const WaterTable: React.FC<{ y: number; progress: number; frame: number }> = ({
  y,
  progress,
  frame,
}) => {
  const steps = 12;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = (1080 * i) / steps;
    const wy = y + Math.sin(i * 0.9 + frame / 22) * 9;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(0)} ${wy.toFixed(1)} `;
  }
  d += "L1080 1920 L0 1920 Z";

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }} opacity={progress}>
      <defs>
        <linearGradient id="mh-nappe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.water} stopOpacity={0.75} />
          <stop offset="100%" stopColor={C.waterDeep} stopOpacity={0.95} />
        </linearGradient>
      </defs>
      <path d={d} fill="url(#mh-nappe)" />
      <path
        d={d.split(" L1080 1920")[0]}
        fill="none"
        stroke={C.white}
        strokeWidth={6}
        strokeOpacity={0.55}
      />
    </svg>
  );
};

/** Plan 4 — le plan clé : l'eau du sol remonte dans la maçonnerie. */
export const Diagnostic: React.FC<{ duration: number }> = () => {
  const frame = useCurrentFrame();

  const nappe = interpolate(frame, [8, 34], [0, 1], clamp);
  const damp = interpolate(frame, [30, 118], [0.04, 0.56], clamp);
  const arrows = interpolate(frame, [34, 56], [0, 1], clamp);
  const victor = interpolate(frame, [62, 92], [0, 1], clamp);
  const victorX = interpolate(victor, [0, 1], [1180, 606]);

  return (
    <AbsoluteFill>
      <WallShot
        framing={DIAG}
        dampLevel={damp}
        arrows={arrows}
        mould={interpolate(frame, [70, 130], [0, 0.7], clamp)}
        flaking={1}
        under={<WaterTable y={DIAG.ground + 70} progress={nappe} frame={frame} />}
      />

      <Mascotte
        src="mascotte2.png"
        height={520}
        delay={62}
        bobPeriod={30}
        style={{
          position: "absolute",
          left: victorX,
          bottom: 1920 - DIAG.ground,
          opacity: victor > 0 ? 1 : 0,
        }}
      />
      {/* Le doigt de Victor : une flèche qui pointe la zone humide */}
      {victor > 0.9 ? (
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
          <g
            transform={`translate(${victorX - 24 + bob(frame, 26, 10)} 792)`}
            stroke={C.orange}
            strokeWidth={14}
            strokeLinecap="round"
            fill="none"
          >
            <line x1={0} y1={0} x2={-120} y2={0} />
            <polyline points="-80,-34 -124,0 -80,34" />
          </g>
        </svg>
      ) : null}

      <Captions subs={SUBS.diagnostic} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${C.navy}00 78%, ${C.navy}22 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
