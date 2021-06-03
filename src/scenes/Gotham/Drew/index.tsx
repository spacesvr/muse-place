import { Image, Interactable, Video } from "spacesvr";
import { Text } from "@react-three/drei";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";
import SocialButton from "themes/components/SocialButton";
import CrazyMaterial from "./shaders/crazy";
import Palm from "./models/Palmtree";
import { MeshBasicMaterial } from "three";
import * as THREE from "three";
import { useMemo, Suspense } from "react";
import LavaCeiling from "./components/LavaCeiling";

const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/drew";

function PngImage(props: { src: string; size?: number } & GroupProps) {
  const { src, size = 1, ...restProps } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const imageTex = useLoader(THREE.TextureLoader, src);

  const width = imageTex.image.width,
    height = imageTex.image.height;
  const max = Math.max(width, height);
  const WIDTH = (width / max) * size,
    HEIGHT = (height / max) * size;

  return (
    <Suspense fallback={null}>
      <group scale={size} {...restProps}>
        <mesh>
          <planeBufferGeometry args={[WIDTH, HEIGHT]} />
          <meshBasicMaterial map={imageTex} transparent />
        </mesh>
      </group>
    </Suspense>
  );
}

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

export default function Drew() {
  const crazyMaterial = useMemo(() => new CrazyMaterial(), []);
  useFrame(({ clock }, delta) => {
    if (crazyMaterial) {
      // @ts-ignore
      crazyMaterial.time += delta / 3;
    }
  });

  return (
    <group>
      {/*<LavaCeiling crazyMaterial={crazyMaterial} />*/}
      <group
        position={[-3.5, 0, 4.14]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        name="rugs"
      >
        <PngImage src={`${CONTENT_FOLDER}/panther+sticker_rug.png`} size={2} />
        <PngImage
          src={`${CONTENT_FOLDER}/panther+sticker_rug.png`}
          position-x={4}
          size={2}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/panther+sticker_rug.png`}
          position-x={-4}
          size={2}
        />
      </group>
      <group name="palmTrees">
        <Palm position={[1.5, 0, -4]} name="palm1" />
        <Palm position={[-4.5, 0, -4]} name="palm1" />
        <Palm position={[-4.5, 0, 10.5]} name="palm1" />
        <Palm position={[1.5, 0, 10.5]} name="palm1" />
      </group>
      <group
        name="back-wall-right"
        rotation-y={-Math.PI / 2}
        position={[2.49, 1.25, 10.6]}
      >
        {/*<Text>Back Wall Right</Text>*/}
        {/*<Image src={`${CONTENT_FOLDER}/bugs+bunny.png`} framed size={1.75} />*/}
        {/*<ClickHere*/}
        {/*  position-y={-1.1}*/}
        {/*  color="black"*/}
        {/*  link="https://www.highrisetv.com/hrtv-blog/weekly-drops-episode-3"*/}
        {/*/>*/}
      </group>
      <group
        name="back-wall-left"
        rotation-y={-Math.PI / 2}
        position={[2.49, 1.25, -2.35]}
      >
        <Text>Back Wall Left</Text>
        {/*<Image src={`${CONTENT_FOLDER}/fgo.png`} framed size={1.75} />*/}
      </group>
      <group
        name="back-wall"
        position={[2.49, 1.07, 4]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/Hentai.png`}
          framed
          size={1.2}
          position-x={-1.0}
          position-y={0.6}
        />
        <group name="connect" position={[-2.65, 0.1, 0]}>
          {/* @ts-ignore */}
          <Text fontSize={0.1} anchorX="left" color="white">
            Back Wall Mid Left
          </Text>
        </group>
        <group name="sponsors">
          <Image
            src={`${CONTENT_FOLDER}/homer+sticker.png`}
            framed
            size={2}
            position-x={0.8}
            position-y={0.3}
          />
        </group>
      </group>
      <group
        name="left-middle-wall-back"
        position={[-1.39, 1.07, 0.62]}
        rotation-y={Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/homer.png`}
          framed
          position-x={-0.1}
          position-y={0.15}
          size={1.25}
        />
        {/*<ClickHere*/}
        {/*  link="https://www.youtube.com/watch?v=HcxiI8AjE-s"*/}
        {/*  position={[1.25, 0.2, 0.075]}*/}
        {/*  text="Watch Now"*/}
        {/*/>*/}
        <Image
          src={`${CONTENT_FOLDER}/spongebob.png`}
          framed
          position-x={1.05}
          position-y={0.15}
          size={1.25}
        />
        {/*<ClickHere*/}
        {/*  link="https://www.youtube.com/watch?v=gQsrV5gaBYg"*/}
        {/*  position={[1.25, -1, 0.075]}*/}
        {/*  text="Watch Now"*/}
        {/*/>*/}
      </group>
      <group
        name="center-middle-wall-back"
        position={[-1.39, 1.25, 4.1]}
        rotation-y={Math.PI / 2}
      >
        <Text material={new MeshBasicMaterial({ visible: false })}>
          Center Middle Wall Front
        </Text>
        @ts-ignore
        <Image
          src={`${CONTENT_FOLDER}/surf+pic+5.jpg`}
          position={[0.5, -0.5, 0]}
          framed
        />
        <Image
          src={`${CONTENT_FOLDER}/surf+pic+6.jpg`}
          position={[0, 0.55, 0]}
          framed
        />
        <Image
          src={`${CONTENT_FOLDER}/surf+pic+7.jpg`}
          position={[-0.5, -0.5, 0]}
          framed
        />
      </group>
      <group
        name="right-middle-wall-back"
        position={[-1.39, 1.25, 8.6]}
        rotation-y={Math.PI / 2}
      >
        {/*<Text>Right Middle Wall Back</Text>*/}
        <Image
          src={`${CONTENT_FOLDER}/main+wall+2.jpg`}
          framed
          size={1.25}
          position-x={-0.1}
        />
        <Image
          src={`${CONTENT_FOLDER}/main+wall+3.jpg`}
          framed
          size={1.25}
          position-x={1.05}
        />
      </group>
      <group
        name="left-middle-wall-front"
        position={[-1.63, 1.25, -0.35]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/squirtle.png`}
          framed
          position-x={-0.1}
          size={1.25}
        />
        <Image
          src={`${CONTENT_FOLDER}/richie+rich.png`}
          framed
          position-x={1.05}
          size={1.25}
        />
        {/*<ClickHere*/}
        {/*  position-y={-0.85}*/}
        {/*  link="https://www.highrisetv.com/hrtv-blog"*/}
        {/*  color="black"*/}
        {/*/>*/}
      </group>
      <group
        name="center-wall-middle-front"
        position={[-1.63, 1.25, 4.125]}
        rotation-y={-Math.PI / 2}
      >
        <Text material={new MeshBasicMaterial({ visible: false })}>
          Center Middle Wall Front
        </Text>
        <Image
          src={`${CONTENT_FOLDER}/surf+pic+1.jpg`}
          position={[0.6, 0.35, 0]}
          framed
          size={0.8}
        />
        <Image
          src={`${CONTENT_FOLDER}/surf+pic+2.jpg`}
          position={[0.6, -0.65, 0]}
          framed
          size={0.8}
        />
        <Image
          src={`${CONTENT_FOLDER}/surf+pic+3.jpg`}
          position={[-0.5, -0.75, 0]}
          framed
          size={1}
        />
        <Image
          src={`${CONTENT_FOLDER}/surf+pic+4.jpg`}
          position={[-0.5, 0.25, 0]}
          framed
          size={1}
        />
      </group>
      <group
        name="right-middle-wall-front"
        position={[-1.63, 1.25, 7.65]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/bugs+bunny.png`}
          framed
          size={1.25}
          position-x={-0.1}
        />
        <Image
          src={`${CONTENT_FOLDER}/wallpaper.png`}
          framed
          size={1.25}
          position-x={1.05}
        />
      </group>
      <group
        name="wall-bottom"
        position={[-5.47, 0.95, 0.6]}
        rotation-y={Math.PI / 2}
      >
        <Video
          src={`${CONTENT_FOLDER}/2.mp4`}
          size={2.5}
          position={[-7, 0.35, 0]}
          muted
        />
        <PngImage
          src={`${CONTENT_FOLDER}/collage+1.png`}
          size={1.3}
          position={[-9.1, -0.5, 0]}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/collage+2.png`}
          size={1.3}
          position={[-9.1, 1.19, 0]}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/collage+3.png`}
          size={1.5}
          position={[-10.815, -0.775, 0]}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/collage+4.png`}
          size={1.5}
          position={[-10.815, 1.475, 0]}
        />
        <group position-x={-3.95} name="front-wall-middle">
          {/*  /!* @ts-ignore *!/*/}
          <PngImage
            src={`${CONTENT_FOLDER}/heatwave+logo.png`}
            size={2.1}
            position-y={0.3}
          />
        </group>
        <Video
          src={`${CONTENT_FOLDER}/1.mp4`}
          size={2.5}
          position={[-1, 0.35, 0]}
          muted
        />
        <PngImage
          src={`${CONTENT_FOLDER}/main+wall+1.jpg`}
          size={1.15}
          position={[3.067, -0.25, 0]}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/main+wall+2.jpg`}
          size={1.15}
          position={[2.095, -0.25, 0]}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/main+wall+3.jpg`}
          size={1.15}
          position={[1.15, -0.25, 0]}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/main+wall+4.jpg`}
          size={1.25}
          position={[1.65, 1, 0]}
        />
        <PngImage
          src={`${CONTENT_FOLDER}/main+wall+5.jpg`}
          size={1.075}
          position={[2.9, 1, 0]}
        />
      </group>
    </group>
  );
}
