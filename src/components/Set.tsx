import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Stage, Toolbox, WALL_W, WALL_X, WALL_Y } from "./Stage";
import { Wall } from "./Wall";
import { Logo } from "./Logo";
import { ProgressBar } from "./ProgressBar";
import { wallStateAt } from "../wallState";
import { SCENE_START } from "../timeline";

/**
 * Décor et habillage permanents : ciel, sol, mur (dont l'état évolue avec la
 * frame absolue), logo en cartouche et barre de progression. Rendu une seule
 * fois, hors des séquences, pour une continuité parfaite d'une scène à l'autre.
 */
export const Set: React.FC = () => {
  const frame = useCurrentFrame();
  const state = wallStateAt(frame);

  /* Le mur entre en scène à la fin de l'intro, et s'efface derrière le
     message de fin. */
  const wallOpacity = interpolate(
    frame,
    [
      SCENE_START.intro + 150,
      SCENE_START.intro + 200,
      SCENE_START.cta - 20,
      SCENE_START.cta + 40,
    ],
    [0, 1, 1, 0.22],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <Stage />
      <Toolbox />

      <div
        style={{
          position: "absolute",
          left: WALL_X,
          top: WALL_Y,
          opacity: wallOpacity,
        }}
      >
        <Wall uid="set" width={WALL_W} {...state} />
      </div>

      <Logo
        size={104}
        style={{
          position: "absolute",
          right: 54,
          top: 42,
          opacity: interpolate(
            frame,
            [SCENE_START.constat - 30, SCENE_START.constat + 10, SCENE_START.cta - 40, SCENE_START.cta],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      />

      <ProgressBar />
    </AbsoluteFill>
  );
};
