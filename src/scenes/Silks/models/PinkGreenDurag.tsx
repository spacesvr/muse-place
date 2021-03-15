/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Durag1obj1: THREE.Mesh;
  };
  materials: {
    ["Durag1.obj"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/PinkGreenDuragNoDraco-1615786203/scene.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" scale={[0.225, 0.225, 0.225]}>
        <mesh
          name="Durag1obj1"
          material={materials["Durag1.obj"]}
          geometry={nodes.Durag1obj1.geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
