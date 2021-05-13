import { useGLTF } from "@react-three/drei";
import { InstancedMesh, Mesh, Object3D, Vector3 } from "three";
import { useLayoutEffect, useMemo, useRef } from "react";

const InstancedObject = (props: { mesh: Mesh; placements: Object3D[] }) => {
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

type GenerateFunc = (x: number, y: number, z: number) => Vector3;

type InstancedModelProps = {
  model: string;
  count: number;
  generation: GenerateFunc;
  transform?: Object3D;
};

const InstancedModel = (props: InstancedModelProps) => {
  const { model, count, generation, transform = new Object3D() } = props;

  const gltf = useGLTF(model);

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
      obj.position.add(generation(Math.random(), Math.random(), Math.random()));
      spots.push(obj);
    }
    return spots;
  }, [generation, count]);

  const instances = meshes.map((mesh) => (
    <InstancedObject key={mesh.uuid} mesh={mesh} placements={placements} />
  ));

  return <group {...props}>{instances}</group>;
};

export default InstancedModel;
