import { useMemo } from "react";
import { MathUtils, Spherical, Vector2, Vector3 } from "three";
import { Cloud } from "@react-three/drei";

const NUM = 20;

const Clouds = () => {
  const positions = useMemo(() => {
    const poses = [];
    for (let i = 0; i < NUM; i++) {
      const r = 50 + Math.random() * 70;
      const p = Math.PI / 2 - (Math.PI / 3) * Math.random();
      const t = Math.random() * 2 * Math.PI;
      poses.push(new Vector3().setFromSpherical(new Spherical(r, p, t)));
    }
    return poses;
  }, []);

  return positions.map((pos: any) => (
    <Cloud position={pos} key={Math.random()} />
  ));
};

export default Clouds;
