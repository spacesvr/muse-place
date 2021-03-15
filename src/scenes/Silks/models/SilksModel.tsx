/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { useTrimeshCollision } from "spacesvr";
import { BufferGeometry, Texture } from "three";

type GLTFResult = GLTF & {
  nodes: {
    rug: THREE.Mesh;
    speakers: THREE.Mesh;
    structure: THREE.Mesh;
    logoboxes: THREE.Mesh;
    glass: THREE.Mesh;
    lights: THREE.Mesh;
    walls: THREE.Mesh;
    floor: THREE.Mesh;
    collider: THREE.Mesh;
  };
  materials: {
    rug: THREE.MeshStandardMaterial;
    speakers: THREE.MeshStandardMaterial;
    structure: THREE.MeshStandardMaterial;
    logoboxes: THREE.MeshStandardMaterial;
    ["Mat.17"]: THREE.MeshStandardMaterial;
    lights: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/SilksNoDraco-1615800441/scene.glb.gz";
const FOLDER = "https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  const woodDiff = useTexture(`${FOLDER}/kitchen_wood_diff_1k.jpg`) as Texture;
  woodDiff.wrapT = woodDiff.wrapS = THREE.RepeatWrapping;
  woodDiff.repeat.x = woodDiff.repeat.y = 4;

  const plasterDiff = useTexture(
    `${FOLDER}/plaster_grey_04_diff_1k.jpg`
  ) as Texture;
  plasterDiff.wrapT = plasterDiff.wrapS = THREE.RepeatWrapping;
  plasterDiff.repeat.x = plasterDiff.repeat.y = 2;

  const fixMat = (mat: THREE.MeshStandardMaterial) => {
    mat.metalness = 1;
    mat.roughness = 0;
  };

  console.log(materials);

  fixMat(materials["rug"]);
  fixMat(materials["speakers"]);
  fixMat(materials["structure"]);
  fixMat(materials["logoboxes"]);
  fixMat(materials["Mat.17"]);
  fixMat(materials["lights"]);

  useTrimeshCollision(
    (nodes.collider.geometry as BufferGeometry)
      .clone()
      .scale(10, 10, 10)
      .translate(-4.39, 0, -2.47)
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[10, 10, 10]} position={[-4.39, 0, -2.47]}>
        <mesh
          name="rug"
          material={materials.rug}
          geometry={nodes.rug.geometry}
        />
        <mesh
          name="speakers"
          material={materials.speakers}
          geometry={nodes.speakers.geometry}
          rotation={[0, 0, 0]}
        />
        <mesh
          name="structure"
          material={materials.structure}
          geometry={nodes.structure.geometry}
        />
        <mesh
          name="logoboxes"
          material={materials.logoboxes}
          geometry={nodes.logoboxes.geometry}
        />
        <mesh
          name="glass"
          material={materials["Mat.17"]}
          geometry={nodes.glass.geometry}
        />
        <mesh
          name="lights"
          material={materials.lights}
          geometry={nodes.lights.geometry}
        />
        <mesh name="walls" geometry={nodes.walls.geometry}>
          <meshStandardMaterial
            map={plasterDiff}
            emissive={new THREE.Color(0xffffff)}
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh name="floor" geometry={nodes.floor.geometry}>
          <meshStandardMaterial map={woodDiff} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
