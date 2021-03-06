/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    typeformbutton: THREE.Mesh;
  };
  materials: {
    ["typeform.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/SBTypeform-1618368404/scen.glb.gz";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  materials["typeform.mat"].metalness = 0;
  materials["typeform.mat"].roughness = 0.25;

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <mesh
          name="typeformbutton"
          material={materials["typeform.mat"]}
          geometry={nodes.typeformbutton.geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
