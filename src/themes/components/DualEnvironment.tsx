import { Keyframe, KeyframeEnvironment, StandardEnvironment } from "spacesvr";
import { ContainerProps } from "react-three-fiber";
import { isMobile } from "react-device-detect";
import { Vector3 } from "three";
import { ReactNode } from "react";

const DualEnvironment = (props: {
  children: ReactNode;
  keyframes: Keyframe[];
  canvasProps: Partial<ContainerProps>;
  disableGround?: boolean;
  playerProps?: {
    pos?: [number, number, number];
    rot?: number;
    speed?: number;
  };
}) => {
  const {
    keyframes,
    children,
    canvasProps,
    playerProps,
    disableGround,
  } = props;

  if (isMobile) {
    return (
      <KeyframeEnvironment keyframes={keyframes} canvasProps={canvasProps}>
        {children}
      </KeyframeEnvironment>
    );
  } else {
    return (
      <StandardEnvironment
        playerProps={playerProps}
        canvasProps={canvasProps}
        disableGround={disableGround}
      >
        {children}
      </StandardEnvironment>
    );
  }
};

export default DualEnvironment;
