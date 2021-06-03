import { Image, Video, Interactable } from "spacesvr";
import SocialButton from "../../../themes/components/SocialButton";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Nature from "./components/Nature";
import { MeshStandardMaterial, Vector3 } from "three";
import { useMemo } from "react";
import CrazyMaterial from "../../../themes/Gotham/shaders/crazy";
import LavaCeiling from "./components/LavaCeiling";

const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/highrise";

function AnnotatedLink(props: { link: string; text?: string } & GroupProps) {
  const { link, text = link.replace("https://", ""), ...restProps } = props;

  const SCALE = 0.4;

  return (
    <group name={`annotatedlink-${link}`} {...restProps}>
      <SocialButton link={link} scale={[SCALE, SCALE, SCALE]} />
      {/* @ts-ignore */}
      <Text
        position-x={SCALE * 0.3}
        fontSize={0.06}
        anchorX="left"
        color="black"
      >
        {text}
      </Text>
    </group>
  );
}

function ClickHere(
  props: { link: string; text?: string; color?: string } & GroupProps
) {
  const { link, text = "Click Here", color = "red", ...restProps } = props;

  return (
    <group {...restProps}>
      <Interactable
        onClick={() => {
          window.open(link, "_blank");
        }}
      >
        <mesh>
          <boxBufferGeometry args={[0.55, 0.2, 0.07]} />
          <meshBasicMaterial color="blue" opacity={0} transparent />
        </mesh>
      </Interactable>
      <mesh>
        <boxBufferGeometry args={[0.5, 0.15, 0.05]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position-z={-0.01}>
        <boxBufferGeometry args={[0.55, 0.2, 0.04]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text color={color} position-z={0.04} fontSize={0.075}>
        {text}
      </Text>
    </group>
  );
}

const handleHRTVLink = () => window.open("https://highrisetv.com", "_blank");

export default function Highrise() {
  const weedShapeFunc = (x: number, y: number, z: number) => {
    const x_gen = x * 13 - 8;
    const z_gen = z > 0.5 ? (z - 0.5) * 10 + 13 : z * -10 - 6;
    return new Vector3(x_gen, y * 3 - 1.5, z_gen);
  };
  const crazyMaterial = useMemo(() => new CrazyMaterial(), []);

  useFrame(({ clock }, delta) => {
    if (crazyMaterial) {
      // @ts-ignore
      crazyMaterial.time += delta;
    }
  });

  return (
    <group name="highrise">
      <LavaCeiling crazyMaterial={crazyMaterial} />
      <group name="weed plants">
        <Nature density={1200} shape={weedShapeFunc} />
      </group>
      <group name="rug">
        <Image
          src={`${CONTENT_FOLDER}/logo.jpg`}
          position={[0.29, 0, 4.14]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          size={3.5}
        />
      </group>
      <group
        name="wall-right"
        rotation-y={-Math.PI / 2}
        position={[2.49, 1.25, 10.6]}
      >
        <Image src={`${CONTENT_FOLDER}/weeklydrops.png`} framed size={1.75} />
        <ClickHere
          position-y={-1.1}
          color="black"
          link="https://www.highrisetv.com/hrtv-blog/weekly-drops-episode-3"
        />
      </group>
      <group
        name="wall-left"
        rotation-y={-Math.PI / 2}
        position={[2.49, 1.25, -2.35]}
      >
        <Image src={`${CONTENT_FOLDER}/fgo.png`} framed size={1.75} />
      </group>
      <group
        name="wall-top"
        position={[2.49, 1.07, 4]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/highrise-logo.png`}
          framed
          size={1.2}
          position-x={-2.0}
          position-y={0.6}
        />
        <group name="connect" position={[-2.65, 0.1, 0]}>
          {/* @ts-ignore */}
          <Text
            fontSize={0.1}
            color="black"
            anchorX="left"
            position={[0.1, -0.225, 0]}
          >
            Directory:
          </Text>
          <AnnotatedLink
            link="https://www.highrisetv.com/"
            text="HIGHRISE TV PLATFORM"
            position-y={-0.4}
            position-x={0.2}
          />
          <AnnotatedLink
            link="https://www.highrise-agency.com/"
            text="HIGHRISE AGENCY WEBSITE"
            position-y={-0.6}
            position-x={0.2}
          />
          <AnnotatedLink
            link="https://www.dropbox.com/s/b9xrt379ocwc1n7/HRmarketing2021%20%28dragged%29.pdf?dl=0"
            text="HIGHRISE AGENCY DECK"
            position-y={-0.8}
            position-x={0.2}
          />
          <AnnotatedLink
            link="https://thehighriseco.shop/"
            text="SHOP HIGHRISE MERCH"
            position-y={-1}
            position-x={0.2}
          />
        </group>
        <group name="sponsors">
          <Image
            src={`${CONTENT_FOLDER}/sponsors.png`}
            framed
            size={3.5}
            position-x={0.8}
            position-y={0.3}
          />
        </group>
      </group>
      <group
        name="wall-top-left"
        position={[-1.39, 1.07, 0.62]}
        rotation-y={Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/ontherise.jpg`}
          framed
          position-y={0.8}
          position-x={0.5}
          size={1.8}
        />
        <ClickHere
          link="https://www.youtube.com/watch?v=HcxiI8AjE-s"
          position={[1.25, 0.2, 0.075]}
          text="Watch Now"
        />
        <Image
          src={`${CONTENT_FOLDER}/waxhotbox.jpg`}
          framed
          position-y={-0.4}
          position-x={0.5}
          size={1.8}
        />
        <ClickHere
          link="https://www.youtube.com/watch?v=gQsrV5gaBYg"
          position={[1.25, -1, 0.075]}
          text="Watch Now"
        />
      </group>
      <group
        name="wall-top-middle"
        position={[-1.39, 1.25, 4.1]}
        rotation-y={Math.PI / 2}
      >
        {/* @ts-ignore */}
        <Image
          src={`${CONTENT_FOLDER}/gs.png`}
          position={[0.05, 0.7, 0]}
          framed
        />
        <Text
          position={[0.05, 0.125, 0]}
          color="black"
          fontSize={0.1}
          maxWidth={1.225}
          anchorY="top"
        >
          Social Media:
        </Text>
        <AnnotatedLink
          link="https://www.instagram.com/highrisetv"
          text="@HIGHRISETV"
          position={[-0.3, -0.1, 0]}
        />
        <AnnotatedLink
          link="https://www.instagram.com/thehighriseco"
          text="@THEHIGHRISECO"
          position={[-0.3, -0.3, 0]}
        />
        <AnnotatedLink
          link="https://www.instagram.com/2girls.1bong/"
          text="@2GIRLS.1BONG"
          position={[-0.3, -0.5, 0]}
        />
        <AnnotatedLink
          link="https://www.youtube.com/user/TheHighRiseCo"
          text="  HRTV YOUTUBE"
          position={[-0.32, -0.7, 0.05]}
        />
        <AnnotatedLink
          link="https://www.youtube.com/channel/UCvV3rzgG0Pd96Hdy-bYZH8A"
          text="  HRAGENCY YOUTUBE"
          position={[-0.32, -0.9, 0.05]}
        />
      </group>
      <group
        name="wall-top-right"
        position={[-1.39, 1.07, 8.1]}
        rotation-y={Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/6a.jpg`}
          framed
          size={1.1}
          position-y={0.8}
          position-x={-0.2}
        />
        <Image
          src={`${CONTENT_FOLDER}/6b.jpeg`}
          framed
          size={1.1}
          position-y={-0.4}
          position-x={0.2}
        />
      </group>
      <group
        name="wall-bottom-left"
        position={[-1.63, 1.07, 0.15]}
        rotation-y={-Math.PI / 2}
      >
        <Image src={`${CONTENT_FOLDER}/1.jpg`} framed size={1.5} />
        <ClickHere
          position-y={-0.85}
          link="https://www.highrisetv.com/hrtv-blog"
          color="black"
        />
      </group>
      <group
        name="wall-bottom-middle"
        position={[-1.63, 1.07, 4.125]}
        rotation-y={-Math.PI / 2}
      >
        <Text position-y={0.6} color="black">
          2021 AGENCY DECK
        </Text>
        <Image src={`${CONTENT_FOLDER}/3.jpg`} framed size={1.7} />
        <ClickHere
          position-y={-0.7}
          link="https://www.dropbox.com/s/b9xrt379ocwc1n7/HRmarketing2021%20%28dragged%29.pdf?dl=0"
          color="black"
        />
      </group>
      <group
        name="wall-bottom-right"
        position={[-1.63, 1.07, 8.1]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/4a.jpg`}
          framed
          size={1.5}
          position-y={0.6}
        />
        <Image
          src={`${CONTENT_FOLDER}/4b.png`}
          framed
          size={1.5}
          position-y={-0.4}
        />
      </group>
      <group
        name="wall-bottom"
        position={[-5.47, 0.95, 0.6]}
        rotation-y={Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/9.png`}
          framed
          size={1.75}
          position={[3.25, 0.4, 0]}
        />
        <Image
          src={`${CONTENT_FOLDER}/8.png`}
          framed
          size={1.75}
          position={[1.25, 0.4, 0]}
        />
        <Image
          src={`${CONTENT_FOLDER}/7.png`}
          framed
          size={1.75}
          position={[-0.75, 0.4, 0]}
        />
        <group position-x={-3.95}>
          <Video
            framed
            size={2}
            src={`${CONTENT_FOLDER}/2.mp4`}
            position-y={0.35}
            position-x={0.3}
          />
          <group position-x={0.025} name="directory">
            {/* @ts-ignore */}
            <Text
              fontSize={0.1}
              color="black"
              anchorX="left"
              position={[-0.8, -0.8, 0]}
            >
              Directory:
            </Text>
            <Text
              fontSize={0.1}
              color="black"
              anchorX="center"
              position={[0.35, 1.5, 0]}
            >
              A NEW AGE 420 MEDIA AGENCY
            </Text>
            <AnnotatedLink
              link="https://highrisetv.com"
              text="HIGHRISE TV"
              position-y={-0.8}
              position-x={-0.25}
            />
            <AnnotatedLink
              link="https://www.highrise-agency.com/"
              text="HIGHRISE AGENCY"
              position-y={-0.8}
              position-x={0.325}
            />
            <AnnotatedLink
              link="https://thehighriseco.shop/"
              text="SHOP"
              position-y={-0.8}
              position-x={1.075}
            />
          </group>
        </group>
        <Image
          src={`${CONTENT_FOLDER}/10.png`}
          framed
          size={1.75}
          position={[-10.5, 0.4, 0]}
        />
        <Image
          framed
          src={`${CONTENT_FOLDER}/11.jpg`}
          size={1.75}
          position-x={-8.5}
          position-y={0.4}
        />
        <Image
          framed
          src={`${CONTENT_FOLDER}/12.jpg`}
          size={1.75}
          position-x={-6.5}
          position-y={0.4}
        />
      </group>
      <group rotation-z={Math.PI / 2} position={[0, 1, -3.85]}>
        <Image
          position-y={-0.5}
          scale={[1.5, 1.25, 1]}
          src={`${CONTENT_FOLDER}/FCKMTRC1.png`}
        />
        <Image
          position-y={1.5}
          scale={[1.5, 1.25, 1]}
          src={`${CONTENT_FOLDER}/FCKMTRC1.png`}
        />
        <Image
          position-y={3.5}
          scale={[1.5, 1.25, 1]}
          src={`${CONTENT_FOLDER}/FCKMTRC1.png`}
        />
      </group>
      <group rotation={[0, Math.PI, -Math.PI / 2]} position={[0, 1, 12.075]}>
        <Image
          position-y={-0.5}
          scale={[1.5, 1.25, 1]}
          src={`${CONTENT_FOLDER}/FCKMTRC1.png`}
        />
        <Image
          position-y={1.5}
          scale={[1.5, 1.25, 1]}
          src={`${CONTENT_FOLDER}/FCKMTRC1.png`}
        />
        <Image
          position-y={3.5}
          scale={[1.5, 1.25, 1]}
          src={`${CONTENT_FOLDER}/FCKMTRC1.png`}
        />
      </group>
    </group>
  );
}
