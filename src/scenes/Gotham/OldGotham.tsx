import { Audio, Fog, Keyframe, StandardEnvironment } from "spacesvr";
import * as THREE from "three";
import { Sky, Stars } from "@react-three/drei";

import Outside from "themes/Gotham/components/Outside";
import Lighting from "themes/Gotham/components/Lighting";
import Gotham, { GothamProps } from "themes/Gotham";
import { ReactNode } from "react";
import { Vector3 } from "three";

export type GothamSceneProps = {
  floorColor?: string;
  sunPos?: number;
  night?: boolean;
  stars?: boolean;
  fogColor?: string;
  fogFar?: number;
  fogNear?: number;
  map?: string;
  scenePos?: [number, number, number];
  hMapScale?: number;
  xzMapScale?: number;
  far?: number;
  lightColor?: string;
  children?: ReactNode;
  audio?: string;
  keyframes?: Keyframe[];
  environmentProps?: any;
} & GothamProps;

const GothamScene = (props: GothamSceneProps) => {
  const {
    children,
    audio,
    floorColor = 0xbbbbbb,
    sunPos = 1,
    night,
    stars,
    fogColor,
    map,
    scenePos = [0, -1, 0],
    hMapScale,
    xzMapScale,
    lightColor,
    keyframes,
    environmentProps = {},
  } = props;

  const { playerProps, ...restEnvProps } = environmentProps;

  return (
    <StandardEnvironment
      playerProps={{
        pos: [-4, 1, 9.9],
        rot: (2 * Math.PI) / 1.2,
        speed: 1.7,
        controls: { disableGyro: true },
        ...playerProps,
      }}
      {...restEnvProps}
    >
      <Sky inclination={sunPos} distance={night ? 0 : 1000000} />
      {stars && <Stars count={1500} fade />}
      {fogColor && <Fog color={new THREE.Color(fogColor)} near={10} far={80} />}
      {audio && (
        <Audio url={audio} position={new Vector3(-6, 1, 2.5)} volume={1.2} />
      )}
      <Lighting color={lightColor} />
      <Outside
        position={scenePos}
        color={floorColor}
        hScale={hMapScale}
        xzScale={xzMapScale}
      />
      <Gotham {...props} />
      {children}
    </StandardEnvironment>
  );
};

export default GothamScene;
