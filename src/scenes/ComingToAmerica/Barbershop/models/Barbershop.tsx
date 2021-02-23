/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACO_URL, useTrimeshCollision } from "spacesvr";
import { BufferGeometry } from "three";
import Trigger from "../../modifiers/Trigger";

type GLTFResult = GLTF & {
  nodes: {
    clay: THREE.Mesh;
    walls: THREE.Mesh;
    seatframe: THREE.Mesh;
    chairs: THREE.Mesh;
    armrest: THREE.Mesh;
    barberchair: THREE.Mesh;
    ceiling: THREE.Mesh;
    floor: THREE.Mesh;
    collider: THREE.Mesh;
  };
  materials: {
    ["clay.mat"]: THREE.MeshStandardMaterial;
    ["walls.mat"]: THREE.MeshStandardMaterial;
    ["seatframe.mat"]: THREE.MeshStandardMaterial;
    ["chairs.mat"]: THREE.MeshStandardMaterial;
    ["armrest.mat"]: THREE.MeshStandardMaterial;
    ["barberchair.mat"]: THREE.MeshStandardMaterial;
    ["ceiling.mat"]: THREE.MeshStandardMaterial;
    ["floor.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/C2ABarbershop-1613911793/barbershop_02.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL, DRACO_URL) as GLTFResult;

  useTrimeshCollision(
    (nodes.collider.geometry as BufferGeometry)
      .clone()
      .scale(0.275, 0.275, 0.275)
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[0.275, 0.275, 0.275]} position-y={0.005}>
        <mesh
          name="clay"
          material={materials["clay.mat"]}
          geometry={nodes.clay.geometry}
        />
        <mesh
          name="walls"
          material={materials["walls.mat"]}
          geometry={nodes.walls.geometry}
          scale={[108.7553, 42.7347, 144.051]}
        />
        <mesh
          name="seatframe"
          material={materials["seatframe.mat"]}
          geometry={nodes.seatframe.geometry}
        />
        <mesh
          name="chairs"
          material={materials["chairs.mat"]}
          geometry={nodes.chairs.geometry}
        />
        <mesh
          name="armrest"
          material={materials["armrest.mat"]}
          geometry={nodes.armrest.geometry}
        />
        <mesh
          name="barberchair"
          material={materials["barberchair.mat"]}
          geometry={nodes.barberchair.geometry}
        />
        <mesh
          name="ceiling"
          material={materials["ceiling.mat"]}
          geometry={nodes.ceiling.geometry}
          scale={[168.1893, 57.9186, 215.7007]}
        />
        <mesh
          name="floor"
          material={materials["floor.mat"]}
          geometry={nodes.floor.geometry}
        />
        {/*<mesh*/}
        {/*  name="collider"*/}
        {/*  material={nodes.collider.material}*/}
        {/*  geometry={nodes.collider.geometry}*/}
        {/*/>*/}
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL, DRACO_URL);
