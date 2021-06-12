import { Image, Video } from "spacesvr";
import { useShopifyShop } from "../Balloonski/utils/shopify";
import { createContext, Suspense } from "react";
import { ShopState } from "../Balloonski/types/shop";
import Shop from "./components/Shop";
import { Text } from "@react-three/drei";
import { isMobile } from "react-device-detect";

const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kkites";
export const ShopContext = createContext<ShopState>({} as ShopState);

export default function KKites() {
  const shop = useShopifyShop({
    domain: "ifakemakeeclothes.myshopify.com",
    storefrontAccessToken: "f1d9e74c201bf95d868112be8b4c927d",
  });

  return (
    <ShopContext.Provider value={shop}>
      <Shop />
      <group
        position={[-1.36, 1.26, 0]}
        rotation-y={Math.PI / 2}
        name="left-pane-back"
      >
        {isMobile && (
          <Image
            name="1"
            src={`${CONTENT_FOLDER}/1.jpg`}
            position-x={0.45}
            framed
          />
        )}
        {isMobile && (
          <Image
            name="2"
            src={`${CONTENT_FOLDER}/2.jpg`}
            position-x={-0.65}
            framed
          />
        )}
        {!isMobile && (
          <Video
            src={`${CONTENT_FOLDER}/V1.mp4`}
            position-z={-0.05}
            size={1.2}
            framed
            muted
          />
        )}
      </group>
      <group
        position={[-1.6, 1.26, 0]}
        rotation-y={-Math.PI / 2}
        name="left-pane-front"
      >
        {isMobile && (
          <Image
            name="3"
            src={`${CONTENT_FOLDER}/3.jpg`}
            position-x={0.55}
            framed
          />
        )}
        {isMobile && (
          <Image
            name="4"
            src={`${CONTENT_FOLDER}/4.jpg`}
            position-x={-0.4}
            framed
          />
        )}
        {!isMobile && (
          <Video
            name="3"
            src={`${CONTENT_FOLDER}/V2.mp4`}
            position-x={0.55}
            framed
            muted
          />
        )}
        {!isMobile && (
          <Video
            name="4"
            src={`${CONTENT_FOLDER}/V3.mp4`}
            position-x={-0.4}
            framed
            muted
          />
        )}
      </group>
      <group
        position={[-1.64, 1.26, 4.05]}
        rotation-y={Math.PI}
        name="middle-pane-left"
      >
        {isMobile && (
          <Image
            name="5"
            src={`${CONTENT_FOLDER}/5.jpg`}
            position-x={-0.6}
            framed
          />
        )}
        {isMobile && (
          <Image
            name="6"
            src={`${CONTENT_FOLDER}/6.jpg`}
            position-x={0.45}
            framed
          />
        )}
        {!isMobile && (
          <Video
            name="5"
            src={`${CONTENT_FOLDER}/Final+4.mp4`}
            size={1.2}
            framed
            muted
          />
        )}
      </group>
      <group
        position={[-1.64, 1.26, 4.25]}
        rotation-y={2 * Math.PI}
        name="middle-pane-right"
      >
        {isMobile && (
          <Image
            name="7"
            src={`${CONTENT_FOLDER}/7.jpg`}
            position-x={-0.45}
            framed
          />
        )}
        {isMobile && (
          <Image
            name="8"
            src={`${CONTENT_FOLDER}/8.jpg`}
            position-x={0.6}
            framed
          />
        )}
        {!isMobile && (
          <Video
            name="7"
            src={`${CONTENT_FOLDER}/Kk+Barbed+Chains.mp4`}
            position-x={-0.45}
            framed
            muted
          />
        )}
        {!isMobile && (
          <Video
            name="8"
            src={`${CONTENT_FOLDER}/Kk+Jesus+Piece.mp4`}
            position-x={0.6}
            framed
            muted
          />
        )}
      </group>
      <group
        position={[-1.36, 1.26, 8.11]}
        rotation-y={Math.PI / 2}
        name="right-pane-back"
      >
        <Image
          name="9"
          src={`${CONTENT_FOLDER}/9.jpg`}
          position-x={0.45}
          framed
        />
        <Image
          name="10"
          src={`${CONTENT_FOLDER}/10.jpg`}
          position-x={-0.55}
          framed
        />
      </group>
      <group
        position={[-1.6, 1.26, 8.11]}
        rotation-y={-Math.PI / 2}
        name="right-pane-front"
      >
        {isMobile && (
          <Image
            name="11"
            src={`${CONTENT_FOLDER}/11.jpg`}
            position-x={0.55}
            framed
          />
        )}
        {isMobile && (
          <Image
            name="12"
            src={`${CONTENT_FOLDER}/12.jpg`}
            position-x={-0.45}
            framed
          />
        )}
        {!isMobile && (
          <Video
            name="11"
            src={`${CONTENT_FOLDER}/kkchainpieces.mp4`}
            size={1.2}
            muted
            framed
          />
        )}
      </group>
      <group
        position={[2.49, 1.25, 10.0]}
        rotation-y={-Math.PI / 2}
        name="back-wall-right"
      >
        <Image
          name="r1"
          src={`${CONTENT_FOLDER}/r1.jpg`}
          position={[0.15, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r2"
          src={`${CONTENT_FOLDER}/r2.jpg`}
          position={[1.3, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r3"
          src={`${CONTENT_FOLDER}/r3.jpg`}
          position={[0.15, -0.75, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r4"
          src={`${CONTENT_FOLDER}/r4.jpg`}
          position={[1.3, -0.75, 0]}
          size={1.15}
          framed
        />
      </group>
      <group
        position={[2.49, 1.25, -3.0]}
        rotation-y={-Math.PI / 2}
        name="back-wall-left"
      >
        <Image
          name="l1"
          src={`${CONTENT_FOLDER}/l1.jpg`}
          position={[0.15, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l2"
          src={`${CONTENT_FOLDER}/l2.jpg`}
          position={[1.3, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l3"
          src={`${CONTENT_FOLDER}/l3.jpg`}
          position={[0.15, -0.75, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l4"
          src={`${CONTENT_FOLDER}/l4.jpg`}
          position={[1.3, -0.75, 0]}
          size={1.15}
          framed
        />
      </group>
      <group
        position={[-5.47, 1.25, 0]}
        rotation-y={Math.PI / 2}
        name="front-wall-right"
      >
        <Image
          name="l5"
          src={`${CONTENT_FOLDER}/l5.jpg`}
          position={[0.15, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l6"
          src={`${CONTENT_FOLDER}/l6.jpg`}
          position={[1.3, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l7"
          src={`${CONTENT_FOLDER}/l7.jpg`}
          position={[2.45, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l8"
          src={`${CONTENT_FOLDER}/l8.jpg`}
          position={[0.15, -0.75, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l9"
          src={`${CONTENT_FOLDER}/l9.jpg`}
          position={[1.3, -0.75, 0]}
          size={1.15}
          framed
        />
        <Image
          name="l10"
          src={`${CONTENT_FOLDER}/l10.jpg`}
          position={[2.45, -0.75, 0]}
          size={1.15}
          framed
        />
      </group>
      <group
        position={[-5.47, 1.25, 11.7]}
        rotation-y={Math.PI / 2}
        name="front-wall-left"
      >
        <Image
          name="r5"
          src={`${CONTENT_FOLDER}/r5.jpg`}
          position={[0.15, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r6"
          src={`${CONTENT_FOLDER}/r6.jpg`}
          position={[1.3, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r7"
          src={`${CONTENT_FOLDER}/r7.jpg`}
          position={[2.45, 0.5, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r8"
          src={`${CONTENT_FOLDER}/r8.jpg`}
          position={[0.15, -0.75, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r9"
          src={`${CONTENT_FOLDER}/r9.jpg`}
          position={[1.3, -0.75, 0]}
          size={1.15}
          framed
        />
        <Image
          name="r10"
          src={`${CONTENT_FOLDER}/r10.jpg`}
          position={[2.45, -0.75, 0]}
          size={1.15}
          framed
        />
      </group>
      <group
        position={[-5.47, 1.25, 6.0]}
        rotation-y={Math.PI / 2}
        name="front-wall-middle"
      >
        <Text
          fontSize={0.6}
          color="white"
          anchorX="left"
          position={[-2.25, 0.0025, 0]}
        >
          IFAKEMAKECLOTHES.COM
        </Text>
      </group>
      <group name="outside-videos" position={[-1.82, 1, 0]}>
        <Video
          src={`${CONTENT_FOLDER}/jpiece.mp4`}
          scale={20}
          position-z={-9.5}
          framed
          muted
        />
        <Video
          src={`${CONTENT_FOLDER}/jpiece.mp4`}
          scale={20}
          rotation-y={Math.PI}
          position-z={18}
          framed
          muted
        />
      </group>
      <group
        position={[-1.46, 2.5, 3.91]}
        rotation={[Math.PI / 2, 0, 0]}
        name="ceiling-video"
      >
        <Video
          src={`${CONTENT_FOLDER}/jpiece.mp4`}
          scale={[11, 17, 11]}
          muted
        />
      </group>
    </ShopContext.Provider>
  );
}
