import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../theme";
import { CaptionTrack } from "../components/Caption";
import { Callout } from "../components/Callout";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { SceneHeader } from "../components/SceneHeader";
import { Wall, wallCardStyle } from "../components/Wall";
import { SCRIPT } from "../content";
import { useSmoothSpring } from "../animations";
import { SCENE_TITLES } from "../timeline";

/**
 * Séquence 2 — Le problème (8 → 20 s).
 * L'humidité monte du sol dans le mur : le plâtrage se détache et les
 * moisissures apparaissent.
 */
export const Scene2Probleme: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const rise = useSmoothSpring(26, 150);
  const decay = useSmoothSpring(150, 150);

  const dampLevel = interpolate(rise, [0, 1], [0.02, 0.82]);
  const flaking = interpolate(decay, [0, 1], [0, 1]);
  const mould = interpolate(decay, [0, 1], [0, 1]);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <SceneHeader index={2} title={SCENE_TITLES.probleme} />

        <div style={{ ...wallCardStyle(900), left: 880, top: 190 }}>
          <Wall
            uid="s2"
            width={900}
            dampLevel={dampLevel}
            arrows={Math.min(1, rise * 1.6)}
            flaking={flaking}
            mould={mould}
          />
        </div>

        <Callout
          text="Plâtrage qui se détache ?"
          delay={152}
          rotate={-2.5}
          style={{ left: 128, top: 250 }}
        />
        <Callout
          text="Moisissures ?"
          delay={196}
          rotate={2}
          accent={COLORS.mould}
          style={{ left: 214, top: 364 }}
        />

        <Mascotte
          src="mascotte2.png"
          height={372}
          delay={14}
          slideFrom={-90}
          style={{ position: "absolute", left: 214, bottom: 250 }}
        />

        <CaptionTrack lines={SCRIPT.probleme} />
      </AbsoluteFill>
    </Scene>
  );
};
