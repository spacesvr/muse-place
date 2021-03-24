/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useMemo, useRef } from "react";
// @ts-ignore
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshBasicMaterial } from "three";
import { useLoader } from "react-three-fiber";

type GLTFResult = GLTF & {
  nodes: {
    TEXT: THREE.Mesh;
    VARIATION_1: THREE.Mesh;
    VARIATION_2: THREE.Mesh;
    LOGO: THREE.Mesh;
  };
  materials: {
    DefaultMaterial: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/card-1615785502/card.glb";
const frameTex =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/frame.jpg";
const backplateTex =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/backplate.png";
const logoTex =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/backlogo.png";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;

  const frameTexture = useLoader(THREE.TextureLoader, frameTex),
    backplateTexture = useLoader(THREE.TextureLoader, backplateTex),
    logoTexture = useLoader(THREE.TextureLoader, logoTex);

  const frameMat = useMemo(() => new MeshBasicMaterial({ map: frameTexture }), [
    frameTexture,
  ]);
  const backplateMat = useMemo(
    () => new MeshBasicMaterial({ map: backplateTexture }),
    [backplateTexture]
  );
  const logoMat = useMemo(() => new MeshBasicMaterial({ map: logoTexture }), [
    logoTexture,
  ]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="RootNode">
          <group
            name="KIRA_CARD"
            rotation={[Math.PI, -0.1571, -Math.PI]}
            scale={[0.001, 0.001, 0.001]}
          >
            <mesh
              name="TEXT"
              material={materials.DefaultMaterial}
              geometry={nodes.TEXT.geometry}
              position={[1.0215, -952.8225, -0.4862]}
              rotation={[-Math.PI, 0.1571, -Math.PI]}
              scale={[1, 1, 1]}
            />
            <mesh
              name="VARIATION_1"
              material={backplateMat}
              geometry={nodes.VARIATION_1.geometry}
              rotation={[Math.PI / 2, 0, -1.4835]}
              scale={[1, 1, 1]}
            />
            <mesh
              name="VARIATION_2"
              material={frameMat}
              geometry={nodes.VARIATION_2.geometry}
              rotation={[Math.PI / 2, 0, -1.4835]}
              scale={[1, 1, 1]}
            />
            <mesh
              name="LOGO"
              material={logoMat}
              geometry={nodes.LOGO.geometry}
              position={[-26.5141, 10.7335, -15.8289]}
              rotation={[-Math.PI, 0.1571, -Math.PI]}
              scale={[1, 1, 1]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
useGLTF.preload(FILE_URL);