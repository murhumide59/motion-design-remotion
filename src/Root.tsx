import React from "react";
import { Composition } from "remotion";
import { MurhumideVideo } from "./MurhumideVideo";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MurhumideVideo"
      component={MurhumideVideo}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
