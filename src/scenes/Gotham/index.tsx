import { Audio, Fog, StandardEnvironment } from "spacesvr";
import { Sky, Stars } from "@react-three/drei";

import Buildings from "themes/Gotham/components/Buildings";
import Gotham, { GothamProps } from "themes/Gotham";
import { ReactNode } from "react";
import { Vector3 } from "three";
import Onboarding from "../../themes/components/Onboarding";
import { Color } from "three";

export type GothamSceneProps = {
  night?: boolean;
  children?: ReactNode;
  audio?: string;
} & GothamProps;

export default function GothamScene(props: GothamSceneProps) {
  const { children, audio, night } = props;

  return (
    <StandardEnvironment
      canvasProps={{ camera: { far: 200 } }}
      player={{ pos: new Vector3(-3.4, 1, 4.9), rot: Math.PI, speed: 1.7 }}
    >
      {!night && <Sky inclination={1} distance={night ? 0 : 1000000} />}
      {night && <Stars count={1500} fade />}
      <Fog
        color={new Color(night ? "#000000" : "#ececf4")}
        near={20}
        far={200}
      />
      {audio && (
        <Audio url={audio} position={new Vector3(-6, 1, 2.5)} volume={1.2} />
      )}
      <Onboarding />
      <Buildings fogColor={night ? "#000000" : "#ececf4"} />
      <Gotham {...props} />
      {children}
    </StandardEnvironment>
  );
}
