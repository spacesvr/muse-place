import { Image, Video } from "spacesvr";
import { useShopifyShop } from "../AVNT/utils/shopify";
import { createContext, Suspense } from "react";
import { ShopState } from "../AVNT/types/shop";
import Shop from "./components/Shop";
import { Text } from "@react-three/drei";

const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/avnt";

export const ShopContext = createContext<ShopState>({} as ShopState);

export default function Avnt() {
  const shop = useShopifyShop({
    domain: "avntspace.myshopify.com",
    storefrontAccessToken: "ae59b92add8e2a21c04c534c2c9a51fd",
  });

  //console.log(shop);

  return (
    <ShopContext.Provider value={shop}>
      <Shop />
      <group>
        <group
          name="right-pane-front"
          position={[-1.6, 1.07, 8.1]}
          rotation-y={-Math.PI / 2}
        >
          <Image
            src={`${CONTENT_FOLDER}/alienhoodie1.png`}
            framed
            size={0.7}
            position-x={0.6}
            position-y={0.1}
          />
          <Image
            src={`${CONTENT_FOLDER}/alienhoodie2.png`}
            framed
            size={0.7}
            position-x={1.5}
            position-y={0.1}
          />
        </group>
        <group
          name="right-pane-back"
          position={[-1.39, 1.07, 8.1]}
          rotation-y={Math.PI / 2}
        >
          <Image
            src={`${CONTENT_FOLDER}/aliensocks1.jpg`}
            framed
            size={0.7}
            position-x={-1.5}
            position-y={0.1}
          />
          <Image
            src={`${CONTENT_FOLDER}/aliensocks2.jpg`}
            framed
            size={0.7}
            position-x={-0.6}
            position-y={0.1}
          />
        </group>
        <group
          name="middle-block-north"
          position={[-2.0, 0.45, 3.3]}
          rotation-y={-Math.PI / 2}
        >
          {/* @ts-ignore */}
          <Image
            src={`${CONTENT_FOLDER}/shoes1.jpg`}
            position={[0.2, 0.7, 0]}
            size={0.7}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/shoes2.jpg`}
            position={[1.05, 0.7, 0]}
            size={0.7}
            framed
          />
        </group>
        <group
          name="middle-block-south"
          position={[-0.95, 0.425, 4.505]}
          rotation-y={Math.PI / 2}
        >
          {/* @ts-ignore */}
          <Image
            src={`${CONTENT_FOLDER}/shoes3.jpg`}
            position={[0.2, 0.7, 0]}
            size={0.7}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/shoes4.jpg`}
            position={[1.05, 0.7, 0]}
            size={0.7}
            framed
          />
        </group>
        <group
          name="middle-block-east"
          position={[-1.65, 0.425, 4.95]}
          rotation-y={0}
        >
          {/* @ts-ignore */}
          <Image
            src={`${CONTENT_FOLDER}/shoes5.jpg`}
            position={[0.2, 0.705, 0]}
            size={0.7}
            framed
          />
        </group>
        <group
          name="middle-block-west"
          position={[-1.255, 0.425, 2.9]}
          rotation-y={Math.PI}
        >
          {/* @ts-ignore */}
          <Image
            src={`${CONTENT_FOLDER}/shoes6.jpg`}
            position={[0.2, 0.705, 0]}
            size={0.7}
            framed
          />
        </group>
        <group
          name="left-pane-front"
          position={[-1.5, 1.07, -1.0]}
          rotation-y={-Math.PI / 2}
        >
          <Image
            src={`${CONTENT_FOLDER}/escapetee.png`}
            framed
            size={0.7}
            position-x={0.65}
            position-y={0.1}
          />
          <Image
            src={`${CONTENT_FOLDER}/alientee.png`}
            framed
            size={0.7}
            position-x={1.5}
            position-y={0.1}
          />
        </group>
        <group
          name="left-pane-back"
          position={[-1.35, 1.07, -1.0]}
          rotation-y={Math.PI / 2}
        >
          <Image
            src={`${CONTENT_FOLDER}/matrixtee1.png`}
            framed
            size={0.7}
            position-x={-1.5}
            position-y={0.1}
          />
          <Image
            src={`${CONTENT_FOLDER}/matrixtee2.png`}
            framed
            size={0.7}
            position-x={-0.65}
            position-y={0.1}
          />
        </group>
        <group
          position={[2.49, 1.25, 10.0]}
          rotation-y={-Math.PI / 2}
          name="back-wall-right"
        >
          <Image
            src={`${CONTENT_FOLDER}/sideimage1.jpg`}
            position={[0.15, 0.5, 0]}
            size={1.15}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[-0.01, 0.03, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          <Image
            src={`${CONTENT_FOLDER}/sideimage2.jpg`}
            position={[1.4, 0.5, 0]}
            size={1.15}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[1.26, 0.03, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          <Image
            src={`${CONTENT_FOLDER}/sideimage3.jpg`}
            position={[0.15, -0.75, 0]}
            size={1.15}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[-0.01, -1.2, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          <Image
            src={`${CONTENT_FOLDER}/sideimage4.jpg`}
            position={[1.4, -0.75, 0]}
            size={1.15}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[1.26, -1.2, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
        </group>
        <group
          position={[2.4, 2.25, 1.8]}
          rotation-y={-Math.PI / 2}
          name="back-wall-middle"
        >
          <Image
            src={`${CONTENT_FOLDER}/sideimage5.jpg`}
            position={[0.4, -1.1, 0]}
            size={1.2}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/sideimage6.jpg`}
            position={[1.8, -1.1, 0]}
            size={1.2}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/sideimage7.jpg`}
            position={[3.2, -1.1, 0]}
            size={1.2}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/sideimage8.jpg`}
            position={[4.6, -1.1, 0]}
            size={1.2}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[0.25, -1.8, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[1.65, -1.8, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[3.05, -1.8, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[4.45, -1.8, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
        </group>
        <group
          position={[2.49, 1.25, -3.0]}
          rotation-y={-Math.PI / 2}
          name="back-wall-left"
        >
          <Image
            src={`${CONTENT_FOLDER}/sideimage9.jpg`}
            position={[0.15, 0.5, 0]}
            size={1.15}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/sideimage10.jpg`}
            position={[1.4, 0.5, 0]}
            size={1.15}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/sideimage11.jpg`}
            position={[0.15, -0.75, 0]}
            size={1.15}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/sideimage12.jpg`}
            position={[1.4, -0.75, 0]}
            size={1.15}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[-0.01, 0.03, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}

          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[1.26, 0.03, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}

          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[-0.01, -1.2, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}

          {/*<Text*/}
          {/*  fontSize={0.075}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[1.26, -1.2, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
        </group>
        <group
          position={[-5.47, 0.65, 2.0]}
          rotation-y={Math.PI / 2}
          name="front-wall-right"
        >
          <Image
            src={`${CONTENT_FOLDER}/frontimage1.jpg`}
            position={[1.1, 0.5, 0]}
            size={1.75}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/frontimage2.jpg`}
            position={[3.6, 0.5, 0]}
            size={1.75}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.1}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[1.0, -0.5, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          {/*<Text*/}
          {/*  fontSize={0.1}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[3.5, -0.5, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
        </group>
        <group
          position={[-5.47, 0.65, 11.6]}
          rotation-y={Math.PI / 2}
          name="front-wall-left"
        >
          <Image
            src={`${CONTENT_FOLDER}/frontimage3.jpg`}
            position={[0.8, 0.5, 0]}
            size={1.75}
            framed
          />
          <Image
            src={`${CONTENT_FOLDER}/frontimage4.jpg`}
            position={[3.3, 0.5, 0]}
            size={1.75}
            framed
          />
          {/*<Text*/}
          {/*  fontSize={0.1}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[0.6, -0.5, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
          {/*<Text*/}
          {/*  fontSize={0.1}*/}
          {/*  color="white"*/}
          {/*  anchorX="left"*/}
          {/*  position={[3.2, -0.5, 0.02]}*/}
          {/*>*/}
          {/*  @credit*/}
          {/*</Text>*/}
        </group>
        <group
          position={[-1.46, 2.5, 6.1]}
          rotation={[Math.PI / 2, 0, 0]}
          name="ceiling-video"
        >
          <Video
            src={`${CONTENT_FOLDER}/Ceilingvideo2.mp4`}
            scale={[11, 17, 7]}
            size={2}
            muted
          />
        </group>
        <group name="outside-videos" position={[-1.82, 1, 0]}>
          <Video
            src={`${CONTENT_FOLDER}/Ceilingvideo2.mp4`}
            scale={20}
            position-z={-9.5}
            framed
            muted
          />
          <Video
            src={`${CONTENT_FOLDER}/Ceilingvideo2.mp4`}
            scale={20}
            rotation-y={Math.PI}
            position-z={18}
            framed
            muted
          />
        </group>
      </group>
    </ShopContext.Provider>
  );
}
