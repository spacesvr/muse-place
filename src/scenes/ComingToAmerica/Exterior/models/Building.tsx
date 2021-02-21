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

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/C2ABuilding-1613815933/building_01.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL, DRACO_URL) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[0.35, -0.35, -0.35]}>
        <mesh
          name="light"
          material={nodes.light.material}
          geometry={nodes.light.geometry}
        />
        <mesh
          name="dark"
          material={nodes.dark.material}
          geometry={nodes.dark.geometry}
        />
        <mesh
          name="lattice"
          material={materials["lattice.mat"]}
          geometry={nodes.lattice.geometry}
        />
        <mesh
          name="stairs"
          material={materials["stairs.mat"]}
          geometry={nodes.stairs.geometry}
        />
        <mesh
          name="windows"
          material={materials["windows.mat"]}
          geometry={nodes.windows.geometry}
        />
        <mesh
          name="glass"
          material={materials["glass.mat"]}
          geometry={nodes.glass.geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL, DRACO_URL);
