/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACO_URL, useEnvironment, useTrimeshCollision } from "spacesvr";
import { BufferGeometry } from "three";
import Trigger from "../../modifiers/Trigger";

type GLTFResult = GLTF & {
  nodes: {
    barber: THREE.Mesh;
    ["barber-hitbox"]: THREE.Mesh;
    radio: THREE.Mesh;
    ["radio-hitbox"]: THREE.Mesh;
    hairstyle: THREE.Mesh;
    ["hairstyle-hitbox"]: THREE.Mesh;
    defjam: THREE.Mesh;
    ["defjam-hitbox"]: THREE.Mesh;
    giveaway: THREE.Mesh;
    ["giveaway-hitbox"]: THREE.Mesh;
    tv: THREE.Mesh;
    ["tv-hitbox"]: THREE.Mesh;
    backdoor: THREE.Mesh;
    ["backdoor-hitbox"]: THREE.Mesh;
    barberchair: THREE.Mesh;
    photos: THREE.Mesh;
    news: THREE.Mesh;
    product: THREE.Mesh;
    clay: THREE.Mesh;
    clay2: THREE.Mesh;
    phone: THREE.Mesh;
    seatframe: THREE.Mesh;
    chairs: THREE.Mesh;
    armrest: THREE.Mesh;
    walls: THREE.Mesh;
    street: THREE.Mesh;
    ceiling: THREE.Mesh;
    collider: THREE.Mesh;
  };
  materials: {
    ["barber.mat"]: THREE.MeshStandardMaterial;
    ["radio.mat"]: THREE.MeshStandardMaterial;
    ["hairstyle.mat"]: THREE.MeshStandardMaterial;
    ["defjam.mat"]: THREE.MeshStandardMaterial;
    ["giveaway.mat"]: THREE.MeshStandardMaterial;
    ["tv.mat"]: THREE.MeshStandardMaterial;
    ["clay.mat"]: THREE.MeshStandardMaterial;
    ["barberchair.1"]: THREE.MeshStandardMaterial;
    ["photos.mat"]: THREE.MeshStandardMaterial;
    ["news.mat"]: THREE.MeshStandardMaterial;
    ["product.mat"]: THREE.MeshStandardMaterial;
    ["clay2.mat"]: THREE.MeshStandardMaterial;
    ["telephone.mat"]: THREE.MeshStandardMaterial;
    ["seatframe.mat"]: THREE.MeshStandardMaterial;
    ["chairs.mat"]: THREE.MeshStandardMaterial;
    ["armrest.mat"]: THREE.MeshStandardMaterial;
    ["walls.1"]: THREE.MeshStandardMaterial;
    ["street.1"]: THREE.MeshStandardMaterial;
    celining: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/C2ABarbershop-1614188530/barbershop_09.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { setPaused } = useEnvironment();
  const { nodes, materials } = useGLTF(FILE_URL, DRACO_URL) as GLTFResult;

  useTrimeshCollision(
    (nodes.collider.geometry as BufferGeometry)
      .clone()
      .scale(0.275, 0.275, 0.275)
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[0.275, 0.275, 0.275]} position-y={0.005}>
        <group scale={[0.9, 0.9, 0.9]} position={[-0.15, 0, -0.5]}>
          <Trigger onClick={() => setPaused(true, "hstry")}>
            <mesh
              name="barber"
              material={materials["barber.mat"]}
              geometry={nodes.barber.geometry}
            />
            <mesh
              name="barber-hitbox"
              visible={false}
              geometry={nodes["barber-hitbox"].geometry}
            />
          </Trigger>
        </group>
        <Trigger onClick={() => setPaused(true, "amu")}>
          <mesh
            name="radio"
            material={materials["radio.mat"]}
            geometry={nodes.radio.geometry}
          />
          <mesh
            name="radio-hitbox"
            visible={false}
            geometry={nodes["radio-hitbox"].geometry}
          />
        </Trigger>
        <Trigger onClick={() => setPaused(true, "hairstyle")}>
          <mesh
            name="hairstyle"
            material={materials["hairstyle.mat"]}
            geometry={nodes.hairstyle.geometry}
          />
          <mesh
            name="hairstyle-hitbox"
            visible={false}
            geometry={nodes["hairstyle-hitbox"].geometry}
          />
        </Trigger>
        <Trigger onClick={() => setPaused(true, "defjam")}>
          <mesh
            name="defjam"
            material={materials["defjam.mat"]}
            geometry={nodes.defjam.geometry}
          />
          <mesh
            name="defjam-hitbox"
            visible={false}
            geometry={nodes["defjam-hitbox"].geometry}
          />
        </Trigger>
        <Trigger onClick={() => setPaused(true, "giveaway")}>
          <mesh
            name="giveaway"
            material={materials["giveaway.mat"]}
            geometry={nodes.giveaway.geometry}
          />
          <mesh
            name="giveaway-hitbox"
            visible={false}
            geometry={nodes["giveaway-hitbox"].geometry}
          />
        </Trigger>
        <Trigger onClick={() => setPaused(true, "castconvo")}>
          <mesh
            name="tv"
            material={materials["tv.mat"]}
            geometry={nodes.tv.geometry}
          />
          <mesh
            name="tv-hitbox"
            visible={false}
            geometry={nodes["tv-hitbox"].geometry}
          />
        </Trigger>
        <Trigger onClick={() => setPaused(true, "bts")}>
          <mesh
            name="backdoor"
            material={materials["clay.mat"]}
            geometry={nodes.backdoor.geometry}
          />
          <mesh
            name="backdoor-hitbox"
            visible={false}
            geometry={nodes["backdoor-hitbox"].geometry}
          />
        </Trigger>
        <Trigger onClick={() => window.open("https://getbevel.com/", "_blank")}>
          <mesh
            name="product"
            material={materials["product.mat"]}
            geometry={nodes.product.geometry}
          />
          <mesh
            position={[-7.44, 2.5, -3.2]}
            rotation-y={Math.PI / 2}
            visible={false}
          >
            <boxBufferGeometry args={[7.25, 1, 1.25]} />
          </mesh>
        </Trigger>
        <mesh
          name="barberchair"
          material={materials["barberchair.1"]}
          geometry={nodes.barberchair.geometry}
        />
        <mesh
          name="photos"
          material={materials["photos.mat"]}
          geometry={nodes.photos.geometry}
        />
        <mesh
          name="news"
          material={materials["news.mat"]}
          geometry={nodes.news.geometry}
        />
        <mesh
          name="clay"
          material={materials["clay.mat"]}
          geometry={nodes.clay.geometry}
        />
        <mesh
          name="clay2"
          material={materials["clay2.mat"]}
          geometry={nodes.clay2.geometry}
        />
        <mesh
          name="phone"
          material={materials["telephone.mat"]}
          geometry={nodes.phone.geometry}
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
          name="walls"
          material={materials["walls.1"]}
          geometry={nodes.walls.geometry}
        />
        <mesh
          name="street"
          material={materials["street.1"]}
          geometry={nodes.street.geometry}
        />
        <mesh
          name="ceiling"
          material={materials.celining}
          geometry={nodes.ceiling.geometry}
          scale={[168.1893, 57.9186, 215.7007]}
        />
        {/*<mesh name="collider" material={nodes.collider.material} geometry={nodes.collider.geometry} />*/}
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL, DRACO_URL);
