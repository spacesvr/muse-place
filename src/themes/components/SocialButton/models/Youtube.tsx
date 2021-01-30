/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACO_URL } from "spacesvr";

type GLTFResult = GLTF & {
  nodes: {
    youtubebutton: THREE.Mesh;
  };
  materials: {
    ["youtube.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/Youtube-1611646088/youtube.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL, DRACO_URL) as GLTFResult;

  materials["youtube.mat"].metalness = 0;
  materials["youtube.mat"].roughness = 0.25;

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <mesh
          name="youtubebutton"
          material={materials["youtube.mat"]}
          geometry={nodes.youtubebutton.geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL, DRACO_URL);