import { Image, Interactable, Video } from "spacesvr";
import Slideshow from "themes/components/Slideshow";
import { Text } from "@react-three/drei";
import { ShopContext } from "../KKites";
import { GroupProps } from "@react-three/fiber";
import { Floating } from "spacesvr";
import { isMobile } from "react-device-detect";

const FONT =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/violetsummer/Proxima_Nova_Bold.otf";

const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/violetsummer";

const links = [`${CONTENT_FOLDER}/vsz11.jpg`, `${CONTENT_FOLDER}/vsz115.jpg`];

const captions = ["", ""];

const links2 = [
  `${CONTENT_FOLDER}/vsz1162.jpg`,
  `${CONTENT_FOLDER}/vsz1164.jpg`,
  `${CONTENT_FOLDER}/vsz1165.jpg`,
  `${CONTENT_FOLDER}/vsz1166.jpg`,
  `${CONTENT_FOLDER}/vsz1167.jpg`,
];

const captions2 = ["", "", "", "", ""];

const links3 = [
  `${CONTENT_FOLDER}/vsz1110.jpg`,
  `${CONTENT_FOLDER}/vsz1112.jpg`,
  `${CONTENT_FOLDER}/vsz1126.jpg`,
  `${CONTENT_FOLDER}/vsz1147.jpg`,
];

const captions3 = ["", "", "", ""];

const links4 = [
  `${CONTENT_FOLDER}/vsz0004.jpg`,
  `${CONTENT_FOLDER}/vsz0005.jpg`,
];

const captions4 = ["", ""];

const links5 = [
  `${CONTENT_FOLDER}/foundersletter.jpg`,
  `${CONTENT_FOLDER}/vsz0003.jpg`,
];

const captions5 = ["", ""];

function ClickHere(
  props: { link: string; text?: string; color?: string } & GroupProps
) {
  const { link, text, color = "purple", ...restProps } = props;

  return (
    <group {...restProps}>
      <Interactable
        onClick={() => {
          window.open(link, "_blank");
        }}
      >
        <mesh>
          <boxBufferGeometry args={[0.65, 0.2, 0.07]} />
          <meshBasicMaterial color="blue" visible={false} />
        </mesh>
      </Interactable>
      <mesh>
        <boxBufferGeometry args={[1.05, 0.15, 0.05]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position-z={-0.01}>
        <boxBufferGeometry args={[1.15, 0.2, 0.04]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text color={color} position-z={0.04} fontSize={0.075} font={FONT}>
        {text}
      </Text>
    </group>
  );
}

export default function VSummer() {
  return (
    <group>
      <group
        name="left-pane-front"
        position={[-2.0, 0.98, -1.93]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/vsz1148.jpg`}
          framed
          size={2.2}
          position-x={1}
          position-y={0.1}
        />
      </group>
      <group
        name="left-pane-back"
        position={[-1.05, 1.07, -2.0]}
        rotation-y={Math.PI / 2}
      >
        <Slideshow
          links={links}
          captions={captions}
          size={1.5}
          position={[-1.05, -0.02, 0]}
          textColor="black"
          darkArrow={true}
        />
      </group>
      <group
        name="middle-block-north"
        position={[-1.95, 0.9, 3.325]}
        rotation-y={-Math.PI / 2}
      >
        {/* @ts-ignore */}
        <Slideshow
          links={links2}
          captions={captions2}
          size={1.5}
          position={[0.59, 0.1, 0.06]}
          textColor="black"
          darkArrow={true}
        />
      </group>
      <group
        name="middle-block-south"
        position={[-1.73, 0.465, 4.225]}
        rotation-y={Math.PI / 2}
      >
        {/* @ts-ignore */}
        <Image
          src={`${CONTENT_FOLDER}/vsz1197.jpg`}
          position={[0.23, 0.6, 0]}
          size={2.25}
          framed
        />
        {/* @ts-ignore */}
      </group>
      <group
        name="middle-block-west"
        position={[-1.085, 0.385, 2.85]}
        rotation-y={Math.PI}
      >
        {/* @ts-ignore */}
        <Image
          src={`${CONTENT_FOLDER}/vsz1178.jpg`}
          position={[0.2, 0.705, 0]}
          size={1.4}
          framed
        />
        <Image
          src={`${CONTENT_FOLDER}/vsz1198_720.jpg`}
          rotation-y={Math.PI}
          position={[0.2, 0.705, -0.3]}
          size={1.5}
          framed
        />
      </group>
      <group
        name="right-pane-front"
        position={[-1.38, 0.95, 8.15]}
        rotation-y={-Math.PI / 2}
      >
        {!isMobile && (
          <Video
            src={`${CONTENT_FOLDER}/LaPrairie.mp4`}
            framed
            size={2.2}
            position-x={0.6}
            position-y={0.2}
          />
        )}
        {isMobile && (
          <Video
            src={`${CONTENT_FOLDER}/LaPrairie.mp4`}
            framed
            size={2.2}
            position-x={0.6}
            position-y={0.2}
            muted
          />
        )}
      </group>
      <group
        name="right-pane-back"
        position={[-1.28, 1.07, 9.34]}
        rotation-y={Math.PI / 2}
      >
        <Slideshow
          links={links3}
          captions={captions3}
          size={1.5}
          position={[0.59, 0.13, 0.06]}
          textColor="black"
          darkArrow={true}
        />
      </group>
      <group
        name="right-block-east"
        position={[-2.08, 0.425, 9.83]}
        rotation-y={0}
      >
        {/* @ts-ignore */}
        <Image
          src={`${CONTENT_FOLDER}/vsz1179.jpg`}
          position={[0.2, 0.705, 0]}
          size={1.4}
          framed
        />
        <Image
          src={`${CONTENT_FOLDER}/vsz1138.jpg`}
          rotation-y={Math.PI}
          position={[0.2, 0.705, -0.3]}
          size={1.6}
          framed
        />
      </group>
      <group
        name="front-wall-upper-right"
        position={[-5.29, 0.995, -6.77]}
        rotation-z={-0.29}
      >
        {!isMobile && (
          <Video
            src={`${CONTENT_FOLDER}/sewing.mp4`}
            rotation-y={Math.PI / 2}
            position={[0.2, 0.705, 7.24]}
            size={1.6}
            framed
          />
        )}
        {isMobile && (
          <Video
            src={`${CONTENT_FOLDER}/sewing.mp4`}
            rotation-y={Math.PI / 2}
            position={[0.2, 0.705, 7.24]}
            size={1.6}
            framed
            muted
          />
        )}
      </group>
      <group
        name="front-wall-bottom-right"
        position={[-4.67, 0.625, -0.58]}
        rotation={[3.162, 1.562, 3.112]}
      >
        <Slideshow
          links={links4}
          captions={captions4}
          size={1.0}
          position={[-1.05, -0.32, -0.37]}
          rotation={[-0.73, 0, 0]}
          textColor="black"
          darkArrow={true}
        />
      </group>
      <group
        name="front-wall-upper-left"
        position={[-5.27, 1.085, 0.74]}
        rotation-z={-0.29}
      >
        <Video
          src={`${CONTENT_FOLDER}/introvid.mp4`}
          rotation-y={Math.PI / 2}
          position={[0.2, 0.705, 7.24]}
          size={1.6}
          framed
        />
      </group>
      <group
        name="front-wall-bottom-left"
        position={[-4.67, 0.625, 6.97]}
        rotation={[3.162, 1.562, 3.112]}
      >
        <Slideshow
          links={links5}
          captions={captions5}
          size={1.2}
          position={[-1.05, -0.32, -0.37]}
          rotation={[-0.73, 0, 0]}
          textColor="black"
          darkArrow={true}
        />
      </group>
      <group
        name="back-wall-upper"
        position={[2.25, 1.395, 11.5]}
        rotation={[-3.15, 0, -3.43]}
      >
        <Video
          src={`${CONTENT_FOLDER}/compost.mp4`}
          rotation-y={Math.PI / 2}
          position={[0.2, 0.705, 7.24]}
          size={1.7}
          framed
        />
      </group>
      <group
        name="back-wall-lower"
        position={[1.69, -0.28, 11.5]}
        rotation={[-3.133, 0, -2.373]}
      >
        <Image
          src={`${CONTENT_FOLDER}/compost.jpg`}
          rotation-y={Math.PI / 2}
          position={[0.2, 0.705, 7.24]}
          size={1.7}
          framed
        />
      </group>

      <group
        position={[-5.47, 1.25, 4.5]}
        rotation-y={Math.PI / 2}
        name="front-wall-middle"
      >
        <Text
          fontSize={0.5}
          color="white"
          anchorX="left"
          position={[-1.8, 0.3, 0]}
          font={FONT}
        >
          VIOLET SUMMER
        </Text>
        <Text
          fontSize={0.2}
          color="white"
          anchorX="left"
          position={[-1.2, -0.1, 0]}
          font={FONT}
        >
          Urban Sustainability & Crypto
        </Text>
        <ClickHere
          color="#552F8A"
          text="Access Zine NFT"
          link="https://rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:637355?tab=owners"
          position={[1.0, -0.4, 0]}
        />
        <ClickHere
          color="#552F8A"
          text="Sign Up for Exclusive Updates"
          link="https://eepurl.com/hq1FYb"
          position={[1.0, -0.7, 0]}
        />
      </group>
      <Floating height={0.115} speed={3}>
        <Interactable
          onClick={() => {
            window.open(
              "https://indd.adobe.com/view/20b981c4-0f4b-475a-92ca-ec2a3a829d0d",
              "_blank"
            );
          }}
        >
          <Video
            src={`${CONTENT_FOLDER}/easteregg.mp4`}
            name="easter-egg"
            position={[1.15, 1.01, -1.4]}
            rotation-y={-0.67}
            scale={[0.25, 0.25, 0.25]}
            muted
          />
        </Interactable>
      </Floating>
    </group>
  );
}
