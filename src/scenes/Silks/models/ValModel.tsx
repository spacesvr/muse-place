/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["ears1_1"]: THREE.SkinnedMesh;
    ["nose1_1"]: THREE.SkinnedMesh;
    ["stitchs1_1"]: THREE.SkinnedMesh;
    ["Fabric1_1"]: THREE.SkinnedMesh;
    ["Sphere1_11_1"]: THREE.SkinnedMesh;
    ["pants1_1"]: THREE.SkinnedMesh;
    ["shirt1_1"]: THREE.SkinnedMesh;
    ["left_arm1_1"]: THREE.SkinnedMesh;
    ["neck1_1"]: THREE.SkinnedMesh;
    ["head1_1"]: THREE.SkinnedMesh;
    Noeud1: THREE.SkinnedMesh;
    Sphere: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    michaael: THREE.MeshStandardMaterial;
    stitchs: THREE.MeshStandardMaterial;
    Fabric: THREE.MeshStandardMaterial;
    ["Mat.2"]: THREE.MeshStandardMaterial;
    Mat: THREE.MeshStandardMaterial;
    ["Mat1"]: THREE.MeshStandardMaterial;
  };
};

type ActionName = "animation_0";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/SilksValNoDraco-1615786556/scene.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(FILE_URL) as GLTFResult;

  // @ts-ignore
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      actions.animation_0.play();
    }
  }, [actions]);

  materials["michaael"].metalness = 0.66;

  return (
    <group {...props} dispose={null} name="val">
      <group scale={[0.0012, 0.0012, 0.0012]}>
        <group name="Null" ref={group}>
          <primitive object={nodes.mixamorigHips} />
          <group name="ears1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="ears1_1"
              material={materials.michaael}
              geometry={nodes["ears1_1"].geometry}
              skeleton={nodes["ears1_1"].skeleton}
            />
          </group>
          <group name="nose1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="nose1_1"
              material={materials.michaael}
              geometry={nodes["nose1_1"].geometry}
              skeleton={nodes["nose1_1"].skeleton}
            />
          </group>
          <group name="stitchs1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="stitchs1_1"
              material={materials.stitchs}
              geometry={nodes["stitchs1_1"].geometry}
              skeleton={nodes["stitchs1_1"].skeleton}
            />
          </group>
          <group name="Fabric1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="Fabric1_1"
              material={materials.Fabric}
              geometry={nodes["Fabric1_1"].geometry}
              skeleton={nodes["Fabric1_1"].skeleton}
            />
          </group>
          <group name="Sphere1_11" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="Sphere1_11_1"
              material={materials["Mat.2"]}
              geometry={nodes["Sphere1_11_1"].geometry}
              skeleton={nodes["Sphere1_11_1"].skeleton}
            />
          </group>
          <group name="pants1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="pants1_1"
              material={materials.Mat}
              geometry={nodes["pants1_1"].geometry}
              skeleton={nodes["pants1_1"].skeleton}
            />
          </group>
          <group name="shirt1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="shirt1_1"
              material={materials["Mat1"]}
              geometry={nodes["shirt1_1"].geometry}
              skeleton={nodes["shirt1_1"].skeleton}
            />
          </group>
          <group name="left_arm1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="left_arm1_1"
              material={materials.michaael}
              geometry={nodes["left_arm1_1"].geometry}
              skeleton={nodes["left_arm1_1"].skeleton}
            />
          </group>
          <group name="neck1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="neck1_1"
              material={materials.michaael}
              geometry={nodes["neck1_1"].geometry}
              skeleton={nodes["neck1_1"].skeleton}
            />
          </group>
          <group name="head1" position={[-2.237, -31.7118, -0.2285]}>
            <skinnedMesh
              name="head1_1"
              material={materials.michaael}
              geometry={nodes["head1_1"].geometry}
              skeleton={nodes["head1_1"].skeleton}
            />
          </group>
          <skinnedMesh
            name="Noeud1"
            material={nodes.Noeud1.material}
            geometry={nodes.Noeud1.geometry}
            skeleton={nodes.Noeud1.skeleton}
            position={[-2.237, -31.7118, -0.2285]}
          />
          <skinnedMesh
            name="Sphere"
            material={nodes.Sphere.material}
            geometry={nodes.Sphere.geometry}
            skeleton={nodes.Sphere.skeleton}
            position={[-2.237, -31.7118, -0.2285]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
