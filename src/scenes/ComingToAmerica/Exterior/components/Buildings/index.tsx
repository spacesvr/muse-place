import { GroupProps } from "react-three-fiber";
import { INSTANCE_DATA } from "./instance";
import { useGLTF, useTexture } from "@react-three/drei";
import { DRACO_URL } from "spacesvr";
import {
  InstancedMesh,
  Mesh,
  Material,
  Geometry,
  MeshStandardMaterial,
} from "three";
import * as THREE from "three";
import { ReactNode, useLayoutEffect, useMemo, useRef } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    light: THREE.Mesh;
    dark: THREE.Mesh;
    lattice: THREE.Mesh;
    stairs: THREE.Mesh;
    windows: THREE.Mesh;
    glass: THREE.Mesh;
  };
  materials: {
    ["lattice.mat"]: THREE.MeshStandardMaterial;
    ["stairs.mat"]: THREE.MeshStandardMaterial;
    ["windows.mat"]: THREE.MeshStandardMaterial;
    ["glass.mat"]: THREE.MeshStandardMaterial;
  };
};

const CONTENT_FOLDER = "https://d27rt3a60hh1lx.cloudfront.net";
const FILE_URL = `${CONTENT_FOLDER}/models/C2ABuilding-1613902614/building_02.glb`;

const InstancedBuildingPiece = (props: {
  material: Material;
  geometry: Geometry;
}) => {
  const { geometry, material } = props;
  const mesh = useRef<InstancedMesh>();

  useLayoutEffect(() => {
    if (!mesh.current) return;

    for (let i = 0; i < INSTANCE_DATA.length; i++) {
      const obj = INSTANCE_DATA[i]();
      obj.updateMatrix();
      mesh.current.setMatrixAt(i, obj.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [INSTANCE_DATA]);

  return (
    <group {...props}>
      <instancedMesh
        ref={mesh}
        args={[geometry, material, INSTANCE_DATA.length]}
      />
    </group>
  );
};

const Buildings = (props: GroupProps) => {
  const gltf = useGLTF(FILE_URL, DRACO_URL) as GLTFResult;

  const light = useTexture(`${CONTENT_FOLDER}/content/c2a/bricks/light.jpg`);
  light.wrapS = light.wrapT = THREE.RepeatWrapping;
  light.repeat.x = light.repeat.y = 20;

  const ao = useTexture(`${CONTENT_FOLDER}/content/c2a/bricks/ao.jpg`);
  ao.wrapS = ao.wrapT = THREE.RepeatWrapping;
  ao.repeat.x = ao.repeat.y = 20;

  const dark = useTexture(`${CONTENT_FOLDER}/content/c2a/bricks/dark.jpg`);
  dark.wrapS = dark.wrapT = THREE.RepeatWrapping;
  dark.repeat.x = dark.repeat.y = 20;

  const lightMat = useMemo(
    () =>
      new MeshStandardMaterial({
        map: light,
        aoMap: ao,
        aoMapIntensity: 2,
        side: THREE.DoubleSide,
      }),
    []
  );
  const darkMat = useMemo(
    () =>
      new MeshStandardMaterial({
        map: dark,
        aoMap: ao,
        aoMapIntensity: 2,
        side: THREE.DoubleSide,
      }),
    []
  );

  const pieces = useMemo(() => {
    const pic: ReactNode[] = [];
    gltf.scene.traverse((child) => {
      if ((child as Mesh).material && (child as Mesh).geometry) {
        let mat = (child as Mesh).material as Material;

        if (child.name === "light") {
          mat = lightMat;
        }

        if (child.name === "dark") {
          mat = darkMat;
        }

        pic.push(
          <InstancedBuildingPiece
            key={child.uuid}
            material={mat}
            geometry={(child as Mesh).geometry as Geometry}
          />
        );
      }
    });
    return pic;
  }, []);

  return <group {...props}>{pieces}</group>;
};

export default Buildings;
