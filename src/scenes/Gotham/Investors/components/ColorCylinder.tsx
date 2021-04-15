import { GroupProps, useFrame } from "react-three-fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, MeshStandardMaterial } from "three";

export default function ColorCylinder(props: GroupProps) {
  const material = useRef<MeshStandardMaterial>();
  const seed = useMemo(() => Math.random(), []);

  useFrame(({ clock }) => {
    if (!material.current) return;

    material.current.color.setHSL(
      (Math.sin((1 + seed * 0.5 - 0.25) * clock.getElapsedTime() + seed * 100) +
        1) /
        2,
      0.8,
      0.7
    );
  });

  return (
    <group {...props}>
      <mesh position-y={1.5}>
        <cylinderBufferGeometry args={[0.8, 0.8, 3, 24]} />
        <meshStandardMaterial
          ref={material}
          transparent
          opacity={0.9}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
