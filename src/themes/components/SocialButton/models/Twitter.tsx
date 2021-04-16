/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    twitterbutton: THREE.Mesh;
  };
  materials: {
    ["twitter.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/SBTwitter-1618368288/scene.glb.gz";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  materials["twitter.mat"].metalness = 0;
  materials["twitter.mat"].roughness = 0.25;

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <mesh
          name="twitterbutton"
          material={materials["twitter.mat"]}
          geometry={nodes.twitterbutton.geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
