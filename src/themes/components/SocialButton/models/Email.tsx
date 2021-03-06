/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    emailbutton: THREE.Mesh;
  };
  materials: {
    ["email.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/SBMail-1620873501/email.glb.gz";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  materials["email.mat"].metalness = 0;

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.002}>
        <mesh
          name="emailbutton"
          geometry={nodes.emailbutton.geometry}
          material={materials["email.mat"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
