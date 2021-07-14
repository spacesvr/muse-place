import Desk from "../../models/Desk";
import Register from "../../models/Register";
import Kiosk from "./Kiosk";
import { Suspense, useState } from "react";
import Cart from "../Cart";
import { Image, Interactable, useEnvironment } from "spacesvr";
import { Preload, Text } from "@react-three/drei";
import SpeechBubble from "../SpeechBubble";
import FacePlayer from "../../modifiers/FacePlayer";
import * as THREE from "three";
import { animated } from "react-spring/three";
import { Tool } from "../../modifiers/Tool";

const KIOSK_GAP = 0.27, //changed from 0.75
  IMG_GAP = 0.9;
const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/avnt3d";

const TITLE_FONT = {
  fontSize: 0.045,
  color: "black",
  anchorX: "left",
  textAlign: "left",
};

const SUB_FONT = {
  fontSize: 0.02,
  color: "black",
  anchorY: "top",
  anchorX: "left",
  textAlign: "left",
};

const HEIGHT = 0.15;
const PADDING_Y = 0.07;
const PADDING_X = 0.02;
const WIDTH = 0.8;
const CART_WIDTH = HEIGHT * 1.5;
const CART_HEIGHT = HEIGHT * 0.75;
const TEXT_WIDTH = WIDTH - CART_WIDTH - PADDING_X * 3;

export default function Shop() {
  const { device } = useEnvironment();
  const [display, toggleDisplay] = useState(false);
  const [speech, setSpeech] = useState(false);
  const displayVariations = () => {
    if (display) {
      toggleDisplay(false);
      setSpeech(false);
    } else if (!display) {
      toggleDisplay(true);
      setSpeech(true);
    }
  };

  return (
    <group
      name="shop"
      position={[-5.83, -0.09, 7.42]}
      rotation={[0.0, 1.57, 0.0]}
    >
      <Cart />
      <group
        position={[1.95, 0.65, 3.0]}
        rotation-y={-Math.PI / 2}
        name="productLabels"
      >
        <group
          position-x={0.5}
          position-z={0.35}
          position-y={HEIGHT / 2}
          name="content"
        >
          <mesh position-z={-0.026}>
            <boxBufferGeometry args={[WIDTH, HEIGHT, 0.05]} />
            <meshStandardMaterial color="white" side={THREE.DoubleSide} />
          </mesh>
          {/* @ts-ignore */}
          <Text
            name="title"
            {...TITLE_FONT}
            position-y={HEIGHT / 2 - PADDING_Y}
            position-x={-WIDTH / 2 + PADDING_X}
            maxWidth={TEXT_WIDTH}
          >
            The Escape Journey Shoes
          </Text>
          {/* @ts-ignore */}
          <group
            name="add-to-cart"
            position-x={WIDTH / 2 - CART_WIDTH / 2 - PADDING_X}
            position-y={0.01}
          >
            <Interactable onClick={displayVariations}>
              <mesh>
                <boxBufferGeometry args={[CART_WIDTH, CART_HEIGHT, 0.02]} />
                <meshStandardMaterial color={"red"} />
              </mesh>
            </Interactable>
            {/* @ts-ignore */}
            <Text
              fontSize={0.04}
              color="white"
              textAlign="center"
              anchorY="middle"
              anchorX="center"
              position-z={0.021}
            >
              {display ? "Done" : "View Sizes"}
            </Text>
          </group>
        </group>

        {display && (
          <>
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 6"
              variationNumber={0}
              position-x={KIOSK_GAP * 4}
              position-y={KIOSK_GAP * 1.3}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 7"
              variationNumber={1}
              position-x={KIOSK_GAP * 5}
              position-y={KIOSK_GAP * 1.3}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 8"
              variationNumber={2}
              position-x={KIOSK_GAP * 6}
              position-y={KIOSK_GAP * 1.3}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 9"
              variationNumber={3}
              position-x={KIOSK_GAP * 4}
              position-y={KIOSK_GAP * 0.65}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 10"
              variationNumber={4}
              position-x={KIOSK_GAP * 5}
              position-y={KIOSK_GAP * 0.65}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 11"
              variationNumber={5}
              position-x={KIOSK_GAP * 6}
              position-y={KIOSK_GAP * 0.65}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 12"
              variationNumber={6}
              position-x={KIOSK_GAP * 4}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 13"
              variationNumber={7}
              position-x={KIOSK_GAP * 5}
            />
            <Kiosk
              productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTc2NDg5NzgwMTc="
              productName="Size 14"
              variationNumber={8}
              position-x={KIOSK_GAP * 6}
            />
          </>
        )}
        {speech && (
          <FacePlayer>
            <group scale={1} position={[0, 0.25, 0.5]}>
              <SpeechBubble>got a size? click done!</SpeechBubble>
            </group>
          </FacePlayer>
        )}

        {!speech && (
          <FacePlayer>
            <group scale={1} position={[0, 0.25, 0.5]}>
              <SpeechBubble>click the register to checkout</SpeechBubble>
            </group>
          </FacePlayer>
        )}
      </group>
      <group name="desk-register">
        <Suspense fallback={null}>
          <Preload all />
          <Desk
            position={[2.04, -0.25, 4.25]}
            rotation-y={-Math.PI / 2}
            scale={[1.54, 0.8, 1.29]}
          />
          <Register />
        </Suspense>
      </group>
    </group>
  );
}
