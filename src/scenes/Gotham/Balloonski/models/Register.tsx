/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGLTF, Text } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Interactable } from "spacesvr";
import { ShopContext } from "../index";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "react-spring/three";
import FacePlayer from "../modifiers/FacePlayer";

type GLTFResult = GLTF & {
  nodes: {
    Plane146: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/register-1619748810/register.glb.gz";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult;
  const { cart } = useContext(ShopContext);

  materials["Material"].metalness = cart.count > 0 ? 0 : 0.8;
  materials["Material"].emissive.setColorName("white");

  const [hovered, setHovered] = useState(false);
  const [needToShow, setNeedToShow] = useState(cart.count === 0);
  const [showSpeech, setShowSpeech] = useState(false);

  const { posY, scale } = useSpring({
    posY: showSpeech ? 1 : 0,
    scale: showSpeech ? 1 : 0,
  });

  const target = useRef(0);

  useFrame(({ clock }) => {
    const amplitude = 0.03;
    const wave =
      target.current === 0.5
        ? amplitude * Math.sin(clock.getElapsedTime() * 3)
        : 0;

    if (materials["Material"].metalness !== target.current) {
      materials["Material"].metalness = MathUtils.lerp(
        materials["Material"].metalness,
        target.current,
        0.08
      );
    }

    materials.Material.emissiveIntensity = amplitude / 2 + wave;
  });

  useEffect(() => {
    if (cart.count === 0) {
      target.current = 0.8;
    } else {
      if (hovered) {
        target.current = 0.3;
      } else {
        target.current = 0.5;
      }
    }

    if (needToShow && cart.count > 0) {
      setShowSpeech(true);
      setNeedToShow(false);
      setTimeout(() => setShowSpeech(false), 5000);
    }
  }, [needToShow, cart.count, hovered]);

  const onClick = useCallback(() => {
    if (cart.url && cart.count > 0 && !cart.isOpen) {
      window.open(cart.url, "_blank");
    }
  }, [cart.url, cart.count, cart.isOpen]);

  return (
    <group
      ref={group}
      dispose={null}
      position={[2, 0.55, 5.55]}
      rotation-y={-Math.PI - 0.3}
      scale={0.75}
      {...props}
    >
      <animated.group scale={scale} position-y={posY}>
        <FacePlayer>
          <Text fontSize={0.1} outlineWidth={0.01}>
            Click the register to check out
          </Text>
        </FacePlayer>
      </animated.group>
      <Interactable
        onClick={onClick}
        onHover={() => setHovered(true)}
        onUnHover={() => setHovered(false)}
      >
        <mesh position={[0, 0.225, 0.1]} name="hitbox">
          <boxBufferGeometry args={[0.67, 0.56, 0.65]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
      </Interactable>
      <group scale={2} name="Register2">
        <mesh
          name="Plane146"
          geometry={nodes.Plane146.geometry}
          material={materials.Material}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
