import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

type PedestalProps = {
  crazyMaterial: any;
};

const LavaCeiling = (props: PedestalProps) => {
  const { crazyMaterial } = props;

  const walls = useRef<Group>();

  useFrame((_, delta) => {
    if (walls.current) {
      walls.current.scale.y = 1;
      walls.current.scale.x = 1;
      walls.current.scale.z = Math.min(walls.current.scale.z + delta * 0.5, 1);
    }
  });

  return (
    <group ref={walls} scale={[0, 0, 0]}>
      <group position={[-1.51, 2.7, 4.2]}>
        <mesh material={crazyMaterial}>
          <boxBufferGeometry args={[8, 0.1, 16.5]} />
        </mesh>
      </group>
    </group>
  );
};

export default LavaCeiling;
