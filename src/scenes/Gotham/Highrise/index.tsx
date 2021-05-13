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

const handleHRTVLink = () => (window.location.href = "https://highrisetv.com");

const handleHRDeckLink = () =>
  (window.location.href =
    "https://www.dropbox.com/s/b9xrt379ocwc1n7/HRmarketing2021%20%28dragged%29.pdf?dl=0");

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
          size={4.5}
        />
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
        <group name="connect" position={[-2.65, -0.1, 0]}>
          {/* @ts-ignore */}
          <Text
            fontSize={0.1}
            color="black"
            anchorX="left"
            position={[-0.1, -0.2, 0]}
          >
            Check us out on these platforms:
          </Text>
          <AnnotatedLink
            link="https://thehighriseco.com"
            text="Exit to The Highrise Co"
            position-y={-0.4}
            position-x={0.2}
          />
          <AnnotatedLink
            link="https://www.highrise-agency.com/"
            text="Exit to Highrise Agency"
            position-y={-0.6}
            position-x={0.2}
          />
          <AnnotatedLink
            link="https://www.highrisetv.com/"
            text="Exit to Highrise TV"
            position-y={-0.8}
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
          src={`${CONTENT_FOLDER}/5a.jpg`}
          framed
          position-y={0.8}
          position-x={0.5}
          size={1.8}
        />
        <Image
          src={`${CONTENT_FOLDER}/5b.jpg`}
          framed
          position-y={-0.4}
          position-x={0.5}
          size={1.8}
        />
      </group>
      <group
        name="wall-top-middle"
        position={[-1.39, 1.07, 4.1]}
        rotation-y={Math.PI / 2}
      >
        {/* @ts-ignore */}
        <Text
          position={[0.05, 1.0, 0]}
          color="black"
          fontSize={0.1}
          maxWidth={1.225}
          anchorY="top"
        >
          Events:
        </Text>
        <Text
          position={[0.05, 0.8, 0]}
          color="black"
          fontSize={0.08}
          maxWidth={1.225}
          anchorY="top"
        >
          Coming Soon!
        </Text>
        <Text
          position={[0.05, 0.1, 0]}
          color="black"
          fontSize={0.1}
          maxWidth={1.225}
          anchorY="top"
        >
          Social Media:
        </Text>
        <AnnotatedLink
          link="https://www.instagram.com/thehighriseco"
          text="@thehighriseco on Instagram"
          position={[-0.4, -0.2, 0]}
        />
        <AnnotatedLink
          link="https://www.twitter.com/thehighriseco"
          text="@thehighriseco on Twitter"
          position={[-0.4, -0.4, 0]}
        />
        <AnnotatedLink
          link="https://www.instagram.com/highrisetv"
          text="@highrisetv"
          position={[-0.4, -0.6, 0]}
        />
        <AnnotatedLink
          link="mailto:info@thehighriseco.com"
          text="Bang our line: info@thehighriseco.com"
          position={[-0.4, -0.8, 0]}
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
        <Interactable onClick={handleHRTVLink}>
          <Image src={`${CONTENT_FOLDER}/1.jpg`} framed size={1.5} />
        </Interactable>
      </group>
      <group
        name="wall-bottom-middle"
        position={[-1.63, 1.07, 4.125]}
        rotation-y={-Math.PI / 2}
      >
        <Interactable onClick={handleHRDeckLink}>
          <Image src={`${CONTENT_FOLDER}/3.jpg`} framed size={1.7} />
        </Interactable>
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
          src={`${CONTENT_FOLDER}/9.jpg`}
          framed
          size={1.75}
          position={[3.25, 0.4, 0]}
        />
        <Image
          src={`${CONTENT_FOLDER}/8.jpg`}
          framed
          size={1.75}
          position={[1.25, 0.4, 0]}
        />
        <Image
          src={`${CONTENT_FOLDER}/7.jpeg`}
          framed
          size={1.75}
          position={[-0.75, 0.4, 0]}
        />
        <group position-x={-4.25}>
          {/* @ts-ignore */}
          <Text
            fontSize={0.1}
            color="black"
            anchorX="left"
            position={[1.4, 0.3, 0]}
          >
            Explore:
          </Text>
          <Video
            framed
            size={2}
            src={`${CONTENT_FOLDER}/2.mp4`}
            position-y={0.4}
            position-x={0.3}
          />
          <AnnotatedLink
            link="https://thehighriseco.com"
            text="Visit The Highrise Co"
            position-y={0.1}
            position-x={1.5}
          />
          <AnnotatedLink
            link="https://highrisetv.com"
            text="Visit Highrise TV"
            position-y={-0.1}
            position-x={1.5}
          />
          <AnnotatedLink
            link="https://www.highrise-agency.com/"
            text="Visit the Highrise Agency"
            position-y={-0.3}
            position-x={1.5}
          />
          <AnnotatedLink
            link="https://thehighriseco.shop/"
            text="Visit the Shop"
            position-y={-0.5}
            position-x={1.5}
          />
        </group>
        <Image
          src={`${CONTENT_FOLDER}/10.jpg`}
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
      {/*<Image*/}
      {/*  name="raining-weed"*/}
      {/*  src={`${CONTENT_FOLDER}/raining-weed.gif`}*/}
      {/*  framed*/}
      {/*  size={10}*/}
      {/*  rotation-y={Math.PI}*/}
      {/*  position={[-1.4, 1.5, 19]}*/}
      {/*/>*/}
      {/*<Image*/}
      {/*  name="raining-weed-other"*/}
      {/*  src={`${CONTENT_FOLDER}/raining-weed.gif`}*/}
      {/*  framed*/}
      {/*  size={12}*/}
      {/*  rotation-y={0}*/}
      {/*  position={[-1.4, 1.5, -12]}*/}
      {/*/>*/}
    </group>
  );
}
