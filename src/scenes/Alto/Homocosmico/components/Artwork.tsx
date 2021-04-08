import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  InstancedMesh,
  Spherical,
  Vector3,
} from "three";

type SceneProps = {
  count?: number;
  fogColor?: string;
};

const FLOOR = -100;
const GAP = 0.2;

const Artwork = (props: SceneProps) => {
  const { count = 10, fogColor = "0x000000" } = props;

  const mesh = useRef<InstancedMesh>();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (mesh.current && count) {
      for (let i = 0; i < count; i++) {
        if (count === 4) {
          const rot = (Math.PI * 2 - GAP) * (i / 5) - Math.PI + GAP;
          dummy.position.set(3.1 * Math.cos(rot), 7.5, 3.1 * Math.sin(rot));
          dummy.updateMatrix();
          dummy.lookAt(new Vector3(0, 7.5, 0));
          dummy.updateMatrix();
          if (i === 3) {
            dummy.rotation.y -= 0.125;
          } else {
            dummy.rotation.y += 0.125;
          }
        } else if (count === 6) {
          const rot = (Math.PI * 2 - GAP) * (i / 7) - Math.PI + GAP;
          dummy.position.set(
            11.925 * Math.cos(rot),
            5.5,
            11.925 * Math.sin(rot)
          );
          dummy.updateMatrix();
          dummy.lookAt(new Vector3(0, 5.5, 0));
        } else if (count === 20) {
          const rot = (Math.PI * 2 - GAP) * (i / 21) - Math.PI + GAP;
          dummy.position.set(
            32.075 * Math.cos(rot),
            1.5,
            32.075 * Math.sin(rot)
          );
          dummy.updateMatrix();
          dummy.lookAt(new Vector3(0, 1.5, 0));
        } else {
          const rot = (Math.PI * 2 - GAP) * (i / count) - Math.PI + GAP;
          dummy.position.set(
            32.075 * Math.cos(rot),
            1.5,
            32.075 * Math.sin(rot)
          );
          dummy.updateMatrix();
          dummy.lookAt(new Vector3(0, 1.5, 0));
        }
        // dummy.rotation.y = (Math.PI * 2 - GAP) * (i / (count+emptySpaces)) - Math.PI + GAP;
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }

      mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [count, mesh]);

  return (
    <group>
      {/* @ts-ignore */}
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <meshStandardMaterial color="white" />
        <boxBufferGeometry args={[3, 2.25, 0.1]} />
      </instancedMesh>
    </group>
  );
};

export default Artwork;
