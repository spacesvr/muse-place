import { Interactable, StandardEnvironment, Image } from "spacesvr";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

import React, { ReactNode, useMemo, useState } from "react";
import { AudioAnalyser, DoubleSide, MeshBasicMaterial, Vector3 } from "three";
import Alto, { AltoProps } from "themes/Alto/Kira";
import Lighting from "themes/Alto/components/Lighting";
import Dropoff from "themes/Alto/components/Dropoff";
import { HDRI } from "spacesvr";
import Cards from "./Kirax23/Cards";

export type AltoSceneProps = {
  stars?: boolean;
  skyColor?: string;
  children?: ReactNode;
} & Partial<AltoProps>;

type AltoSceneStore = {
  aa?: AudioAnalyser;
  setAA: (aa: AudioAnalyser) => void;
};

export const AltoSceneState = React.createContext({} as AltoSceneStore);

const AltoScene = (props: AltoSceneProps) => {
  const { stars, skyColor, children, ...restProps } = props;

  const skyloft =
    "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/SKYLOFT2.png";

  const handleSkyloft = () => {
    window.location.href = "/kirax23";
  };

  const [aa, setAA] = useState<THREE.AudioAnalyser>();

  return (
    <StandardEnvironment
      playerProps={{ pos: [0, 2.7, 36], rot: -Math.PI / 2, speed: 4.5 }}
      canvasProps={{ pixelRatio: 1 }}
      disableGround
    >
      <AltoSceneState.Provider value={{ aa, setAA }}>
        {stars && <Stars count={5000} factor={100000} radius={5000000} fade />}
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
        <HDRI src="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/kirahdri2.hdr" />
        <Alto {...restProps} />
        <Lighting />
        <Dropoff />
        <Interactable onClick={handleSkyloft}>
          <group
            position={[-12, 1, 32]}
            rotation-y={Math.PI / 1.2}
            scale={[5, 5, 5]}
          >
            <Image src={skyloft} />
          </group>
        </Interactable>
        <Cards />
        {/*@ts-ignore*/}
        {children && React.cloneElement(children, { aa })}
      </AltoSceneState.Provider>
    </StandardEnvironment>
  );
};

export default AltoScene;
