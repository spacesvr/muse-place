import { Fog, StandardEnvironment } from "spacesvr";
import * as THREE from "three";
import { Sky, Stars } from "@react-three/drei";

import React, { ReactNode, useState } from "react";
import { AudioAnalyser, DoubleSide } from "three";
import ChadAlto, { AltoProps } from "themes/Alto/Chad";
import Lighting from "themes/Alto/components/Lighting";
import Dropoff from "themes/Alto/components/Dropoff";
import { SimulationProps } from "spacesvr/core/types/simulation";
import Seasons from "./ChadKnight/contexts/Seasons";

export type AltoSceneProps = {
  stars?: boolean;
  fog?: [string, number, number];
  skyColor?: string;
  children?: ReactNode;
  hdri?: string;
  simulationProps?: SimulationProps;
} & Partial<AltoProps>;

type AltoSceneStore = {
  aa?: AudioAnalyser;
  setAA: (aa: AudioAnalyser) => void;
};
export const ChadAltoSceneState = React.createContext({} as AltoSceneStore);

const AltoScene = (props: AltoSceneProps) => {
  const {
    stars,
    fog,
    skyColor,
    children,
    simulationProps,
    hdri,
    ...restProps
  } = props;

  const [aa, setAA] = useState<THREE.AudioAnalyser>();

  return (
    <StandardEnvironment
      playerProps={{ pos: [0.5, -4, 70], rot: 0, speed: 7 }}
      canvasProps={{ dpr: 1, camera: { far: 300 } }}
      simulationProps={simulationProps}
      signup="http://bit.ly/musehq"
      disableGround
    >
      <Seasons>
        <ChadAltoSceneState.Provider value={{ aa, setAA }}>
          {stars && (
            <Stars count={5000} factor={100000} radius={5000000} fade />
          )}
          {fog && (
            <Fog color={new THREE.Color(fog[0])} near={fog[1]} far={fog[2]} />
          )}
          {skyColor && (
            <mesh name="sun">
              <sphereBufferGeometry args={[60, 60, 60]} />
              <meshStandardMaterial
                color={skyColor}
                opacity={0.9}
                transparent
                side={DoubleSide}
              />
            </mesh>
          )}
          {!hdri && <Sky sunPosition={[0, 1, 0]} />}
          <ChadAlto {...restProps} />
          <Lighting />
          <Dropoff maxDist={35} resetPos={[0.5, -4, 70]} />
          {/* @ts-ignore */}
          {children && React.cloneElement(children, { aa })}
        </ChadAltoSceneState.Provider>
      </Seasons>
    </StandardEnvironment>
  );
};

export default AltoScene;
