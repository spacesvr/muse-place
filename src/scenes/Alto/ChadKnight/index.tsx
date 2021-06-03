import { Vector3 } from "three";
import * as THREE from "three";
import Grass from "./components/Grass";
import Birds from "./components/Birds";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import Nature from "./components/Nature";
import Tableaux from "./components/Tableaux";
import NftScrolls from "./components/Scrolls/NftScrolls";
import GradientSky from "./components/GradientSky";
import Snow from "./components/Snow";

const ChadKnight = () => {
  const treePlacementFunc = (r: number, theta: number) => {
    const r_gen = r * 60 + 10;
    const theta_gen = theta * 2 * Math.PI;
    const cartCoords = new Vector3(0, -2, 0).setFromSphericalCoords(
      r_gen,
      1.75,
      theta_gen
    );
    cartCoords.y -= 5;
    return cartCoords;
  };

  return (
    <group>
      <Tableaux />
      <Snow particleNum={2500} />
      <GradientSky radius={200} />
      <Suspense fallback={null}>
        <Preload all />
        <Grass maxRadius={90} />
        <NftScrolls />
        <Nature density={1500} shape={treePlacementFunc} />
        <Birds bounds={10} position-y={-5} />
      </Suspense>
    </group>
  );
};

export default ChadKnight;
