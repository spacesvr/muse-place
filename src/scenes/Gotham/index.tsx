import { Audio, Fog, StandardEnvironment } from "spacesvr";
import { Sky, Stars } from "@react-three/drei";

import Buildings from "themes/Gotham/components/Buildings";
import Onboarding from "themes/components/Onboarding";
import Gotham, { GothamProps } from "themes/Gotham";
import { ReactNode } from "react";
import { Color, Vector3 } from "three";
import { SimulationProps } from "spacesvr/core/types/simulation";

export type GothamSceneProps = {
  night?: boolean;
  children?: ReactNode;
  audio?: string;
  simulationProps?: SimulationProps;
} & GothamProps;

export default function GothamScene(props: GothamSceneProps) {
  const { children, audio, night, simulationProps } = props;

  return (
    <StandardEnvironment
      canvasProps={{ camera: { far: 200 } }}
      playerProps={{ pos: [-3.4, 1, 4.9], rot: Math.PI, speed: 1.7 }}
      simulationProps={simulationProps}
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
