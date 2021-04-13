import { Fog, StandardEnvironment } from "spacesvr";
import * as THREE from "three";
import { Sky, Stars } from "@react-three/drei";

import React, { ReactNode, useState } from "react";
import { AudioAnalyser, DoubleSide, Vector3 } from "three";
import Alto, { AltoProps } from "themes/Alto";
import Lighting from "themes/Alto/components/Lighting";
import Dropoff from "themes/Alto/components/Dropoff";
import { HDRI } from "spacesvr";

export type AltoSceneProps = {
  stars?: boolean;
  fog?: [string, number, number];
  skyColor?: string;
  children?: ReactNode;
  hdri?: string;
} & Partial<AltoProps>;

type AltoSceneStore = {
  aa?: AudioAnalyser;
  setAA: (aa: AudioAnalyser) => void;
};
export const AltoSceneState = React.createContext({} as AltoSceneStore);

const AltoScene = (props: AltoSceneProps) => {
  const { stars, fog, skyColor, children, hdri, ...restProps } = props;

  const [aa, setAA] = useState<THREE.AudioAnalyser>();

  return (
    <StandardEnvironment
      player={{ pos: new Vector3(0, 2.7, 36), rot: -Math.PI / 2, speed: 2.4 }}
      disableGround
    >
      <AltoSceneState.Provider value={{ aa, setAA }}>
        {stars && <Stars count={5000} factor={100000} radius={5000000} fade />}
        {fog && (
          <Fog color={new THREE.Color(fog[0])} near={fog[1]} far={fog[2]} />
        )}
        {skyColor && (
          <mesh>
            <sphereBufferGeometry args={[60, 60, 60]} />
            <meshStandardMaterial
              color={skyColor}
              opacity={0.9}
              transparent
              side={DoubleSide}
            />
          </mesh>
        )}
        <HDRI
          src={
            hdri ||
            "https://d27rt3a60hh1lx.cloudfront.net/content/alto/SkyMural3.hdr"
          }
          hideBackground={hdri === undefined}
        />
        <Alto {...restProps} />
        <Lighting />
        <Dropoff />
        {/* @ts-ignore */}
        {children && React.cloneElement(children, { aa })}
      </AltoSceneState.Provider>
    </StandardEnvironment>
  );
};

export default AltoScene;
