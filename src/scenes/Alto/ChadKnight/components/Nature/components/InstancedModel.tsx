import { useGLTF } from "@react-three/drei";
import { InstancedMesh, Mesh, Object3D, Vector3 } from "three";
import { useLayoutEffect, useMemo, useRef } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useSeason } from "../../../contexts/Seasons";
import { useSpring } from "react-spring/three";
import { Fall, Spring, Summer, Winter } from "../../constants/seasonColors";
import { useLimiter } from "spacesvr";

const InstancedObject = (
  props: { mesh: Mesh; placements: Object3D[] } & GroupProps
) => {
  const { mesh, placements } = props;
  const instances = useRef<InstancedMesh>();

  useLayoutEffect(() => {
    if (!instances.current) return;

    for (let i = 0; i < placements.length; i++) {
      const obj = placements[i];
      obj.updateMatrix();
      instances.current.setMatrixAt(i, obj.matrix);
    }
    instances.current.instanceMatrix.needsUpdate = true;
  }, [placements]);

  return (
    <group {...props}>
      <instancedMesh
        ref={instances}
        args={[mesh.geometry, mesh.material, placements.length]}
      />
    </group>
  );
};

type GenerateFunc = (r: number, theta: number) => Vector3;

type InstancedModelProps = {
  model: string;
  count: number;
  generation: GenerateFunc;
  transform?: Object3D;
};

const InstancedModel = (props: InstancedModelProps) => {
  const { model, count, generation, transform = new Object3D() } = props;

  const gltf = useGLTF(model);
  const { activeSeason } = useSeason();
  const { r, g, b } = useSpring({
    r:
      activeSeason === "Winter"
        ? Winter.grass.r
        : activeSeason === "Summer"
        ? Summer.grass.r
        : activeSeason === "Spring"
        ? Spring.grass.r
        : Fall.grass.r,
    g:
      activeSeason === "Winter"
        ? Winter.grass.g
        : activeSeason === "Summer"
        ? Summer.grass.g
        : activeSeason === "Spring"
        ? Spring.grass.g
        : Fall.grass.g,
    b:
      activeSeason === "Winter"
        ? Winter.grass.b
        : activeSeason === "Summer"
        ? Summer.grass.b
        : activeSeason === "Spring"
        ? Spring.grass.b
        : Fall.grass.b,
    config: {
      mass: 5,
    },
  });

  const meshes: Mesh[] = useMemo(() => {
    const pic: Mesh[] = [];
    gltf.scene.traverse((child) => {
      if ((child as Mesh).material && (child as Mesh).geometry) {
        pic.push(child as Mesh);
      }
    });
    return pic;
  }, [gltf, model]);

  const placements: Object3D[] = useMemo(() => {
    const spots = [];
    for (let i = 0; i < count; i++) {
      const obj = transform.clone();
      obj.position.add(generation(Math.random(), Math.random()));
      spots.push(obj);
    }
    return spots;
  }, [generation, count]);

  const instances = meshes.map((mesh) => (
    <InstancedObject key={mesh.uuid} mesh={mesh} placements={placements} />
  ));

  const limiter = useLimiter(45);
  useFrame(({ clock }) => {
    if (!limiter.isReady(clock)) return;
    instances[1].props.mesh.material.emissive.setRGB(r.get(), g.get(), b.get());
  });

  return <group {...props}>{instances}</group>;
};

export default InstancedModel;
