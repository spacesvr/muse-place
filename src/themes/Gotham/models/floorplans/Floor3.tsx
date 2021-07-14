/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { BufferGeometry, Color } from "three";
import { useTrimeshCollision } from "spacesvr";

type GLTFResult = GLTF & {
  nodes: {
    collider: THREE.Mesh;
    frames: THREE.Mesh;
    structure: THREE.Mesh;
  };
  materials: {
    ["frames.mat"]: THREE.MeshStandardMaterial;
    ["structure.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/floor3-1623708125/floor3.glb.gz";

export default function Model(
  props: { night?: boolean } & JSX.IntrinsicElements["group"]
) {
  const { night, ...restProps } = props;

  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  if (night) {
    materials["structure.mat"].emissive = new Color("#292929");
    // materials["middleSupports"].emissive = new Color("#292929");
  } else {
    materials["structure.mat"].emissive = new Color("#ffffff");
    // materials["middleSupports"].emissive = new Color("#ffffff");
  }

  useTrimeshCollision(
    (nodes.structure.geometry as BufferGeometry)
      .clone()
      .scale(1, 1, 1)
      .translate(-1.505, 0, 3.96)
  );

  return (
    <group ref={group} {...restProps} dispose={null}>
      <group scale={1} position={[-1.505, 0, 3.96]} name="Scene">
        <group name="Gotham_03glb">
          <mesh
            name="frames"
            geometry={nodes.frames.geometry}
            material={materials["frames.mat"]}
          />
          <mesh
            name="structure"
            geometry={nodes.structure.geometry}
            material={materials["structure.mat"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
