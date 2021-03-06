/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    niftybutton: THREE.Mesh;
  };
  materials: {
    ["nifty.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/nifty-1622230816/nifty.glb.gz";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" scale={0.05}>
        <group name="nifty-buttonglb">
          <mesh
            name="niftybutton"
            geometry={nodes.niftybutton.geometry}
            material={materials["nifty.mat"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
