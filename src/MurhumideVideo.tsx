import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS, FONT } from "./theme";
import { Background } from "./components/Background";
import { ProgressBar } from "./components/ProgressBar";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Probleme } from "./scenes/Scene2Probleme";
import { Scene3Diagnostic } from "./scenes/Scene3Diagnostic";
import { Scene4Solution } from "./scenes/Scene4Solution";
import { Scene5Resultat } from "./scenes/Scene5Resultat";
import { Scene6Cta } from "./scenes/Scene6Cta";
import {
  SCENE_DURATIONS,
  SCENE_OVERLAP,
  SCENE_ORDER,
  SCENE_START,
  SCENE_TITLES,
  type SceneId,
} from "./timeline";

const SCENE_COMPONENTS: Record<
  SceneId,
  React.FC<{ durationInFrames: number }>
> = {
  intro: Scene1Intro,
  probleme: Scene2Probleme,
  diagnostic: Scene3Diagnostic,
  solution: Scene4Solution,
  resultat: Scene5Resultat,
  cta: Scene6Cta,
};

/**
 * Vidéo Murhumide — 1920x1080, 30 fps, 70 s.
 * Les scènes se recouvrent de `SCENE_OVERLAP` frames pour un fondu croisé ;
 * le fond et la barre de progression restent continus.
 */
export const MurhumideVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.offWhite, fontFamily: FONT }}>
      <Background />

      {SCENE_ORDER.map((id, i) => {
        const Component = SCENE_COMPONENTS[id];
        const isLast = i === SCENE_ORDER.length - 1;
        return (
          <Sequence
            key={id}
            name={`${i + 1} — ${SCENE_TITLES[id]}`}
            from={SCENE_START[id]}
            durationInFrames={
              SCENE_DURATIONS[id] + (isLast ? 0 : SCENE_OVERLAP)
            }
          >
            <Component durationInFrames={SCENE_DURATIONS[id]} />
          </Sequence>
        );
      })}

      <ProgressBar />
    </AbsoluteFill>
  );
};
