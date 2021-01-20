import { Keyframe, KeyframeEnvironment, StandardEnvironment } from "spacesvr";
import { CanvasProps } from "react-three-fiber";
import { isMobile } from "react-device-detect";
import { Vector3 } from "three";

const DualEnvironment = (props: {
  children: React.ReactNode;
  keyframes: Keyframe[];
  canvasProps: Partial<CanvasProps>;
  player?: {
    pos?: Vector3;
    rot?: number;
  };
}) => {
  const { keyframes, children, canvasProps, player } = props;

  if (isMobile) {
    return (
      <KeyframeEnvironment keyframes={keyframes} canvasProps={canvasProps}>
        {children}
      </KeyframeEnvironment>
    );
  } else {
    return (
      <StandardEnvironment player={player} canvasProps={canvasProps}>
        {children}
      </StandardEnvironment>
    );
  }
};

export default DualEnvironment;