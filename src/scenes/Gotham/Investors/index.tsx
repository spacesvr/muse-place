import SocialButton from "themes/components/SocialButton";
import { GroupProps } from "react-three-fiber";
import { Text } from "@react-three/drei";
import { Idea } from "./components/Idea";
import { Image, Interactable } from "spacesvr";
import ColorCylinder from "./components/ColorCylinder";
import SpinningBuilder from "./components/SpinningBuilder";

const FONT = "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";
const CONTENT =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/investors";

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

function ImageLink(
  props: { image?: string; link?: string; text: string } & GroupProps
) {
  const { image, link, text, ...restProps } = props;

  const SIZE = 0.5;

  return (
    <group {...restProps}>
      {link && (
        <Interactable onClick={() => window.open(link, "_blank")}>
          <mesh visible={false}>
            <planeBufferGeometry args={[SIZE, SIZE]} />
          </mesh>
        </Interactable>
      )}
      {image && <Image src={image} size={SIZE} />}
      {/* @ts-ignore */}
      <Text
        font={FONT}
        position-y={-SIZE / 2 - 0.05}
        anchorY="top"
        maxWidth={SIZE}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  );
}

function ImageLinks(props: GroupProps) {
  const links = [
    {
      image: `${CONTENT}/kirax23.jpg`,
      link: "https://muse.place/kirax23",
      text: "Kira X-23",
    },
    {
      image: `${CONTENT}/silks.jpg`,
      link: "https://silksbyvp.com/world",
      text: "Silks By VP",
    },
    {
      image: `${CONTENT}/c2a.jpg`,
      link: "https://muse.place/comingtoamerica/barbershop",
      text: "Coming 2 America",
    },
    {
      image: `${CONTENT}/awge.jpg`,
      text: "AWGE",
    },
    {
      image: `${CONTENT}/chad.jpg`,
      link: "https://spaces.gallery/chad",
      text: "Chad Knight",
    },
  ];

  return (
    <group {...props}>
      {links.map((link, i) => (
        <ImageLink key={link.link} {...link} position-x={i * 0.7} />
      ))}
    </group>
  );
}

export default function Investors() {
  return (
    <group name="muse-deck">
      <group
        name="wall-top"
        position={[2.49, 0.65, 3.25]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          position={[-1.45, 0.35, 0]}
          size={0.6}
          src="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/investors/running-man-left-exit.jpg"
        />
        <group name="connect" position={[-1.65, 0.1, 0]}>
          <AnnotatedLink link="https://instagram.com/musehq" />
          <AnnotatedLink
            link="https://app.slidebean.com/p/pm6sgokwzm/Pitch-Deck-V10-NGF"
            text="Exit to pitch deck"
            position-y={-0.2}
          />
        </group>
        <ImageLinks position-y={0.3} />
      </group>
      <group
        name="wall-bottom"
        position={[-5.47, 0.95, 0.6]}
        rotation-y={Math.PI / 2}
      >
        {/* @ts-ignore */}
        <Text font={FONT} color="black" fontSize={1} position-x={-3.43}>
          muse
        </Text>
      </group>
      <ColorCylinder position={[-4.6, 0, 7.1]} />
      <group name="idea" position={[-4.6, 0, 7.1]}>
        <Idea position-y={0.5} size={0.75} />
      </group>
      <ColorCylinder position={[-4.6, 0, 1.1]} />
      <group position={[-4.6, 0, 1.1]} name="builder">
        <SpinningBuilder position-y={1.5} />
      </group>
    </group>
  );
}
