import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT_TITLE } from "../theme";
import { Captions } from "../components/Caption";
import { WallShot } from "../components/WallShot";
import { DIAG } from "../framing";
import { SUBS } from "../content";
import { Sparkles } from "../../components/Effects";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Plan 11 — retour à la coupe : la crème diffuse depuis chaque trou, les
 * auréoles se rejoignent en un trait continu, et le bleu de l'humidité
 * recule jusqu'à disparaître.
 */
export const Barriere: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();

  const barrier = interpolate(frame, [6, 74], [0, 1], clamp);
  const damp = interpolate(frame, [60, 132], [0.56, 0.03], clamp);
  const clean = interpolate(frame, [66, 138], [0, 1], clamp);

  return (
    <AbsoluteFill>
      <WallShot
        framing={DIAG}
        dampLevel={damp}
        arrows={interpolate(frame, [0, 40], [0.9, 0], clamp)}
        mould={interpolate(frame, [60, 130], [0.7, 0], clamp)}
        flaking={1}
        repaired={interpolate(frame, [80, 140], [0, 1], clamp)}
        holes={1}
        patched={1}
        barrier={barrier}
        clean={clean}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
          <Sparkles
            seed="tk-dry"
            count={14}
            box={{ x: DIAG.sx(220), y: DIAG.sy(60), w: DIAG.sx(740) - DIAG.sx(220), h: DIAG.sy(380) - DIAG.sy(60) }}
            frame={frame}
            from={86}
          />
        </svg>
      </WallShot>

      {/* Bandeau bénéfice : c'est le pic de la vidéo */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 150,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [76, 92, duration - 6, duration], [0, 1, 1, 0], clamp),
          transform: `scale(${interpolate(frame, [76, 96], [0.86, 1], clamp)})`,
        }}
      >
        <div
          style={{
            background: C.orange,
            color: C.white,
            borderRadius: 8,
            padding: "20px 40px",
            fontFamily: FONT_TITLE,
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          Barrière étanche continue
        </div>
      </div>

      <Captions subs={SUBS.barriere} />
    </AbsoluteFill>
  );
};
