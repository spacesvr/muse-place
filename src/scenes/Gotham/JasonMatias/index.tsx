import { Image, Video } from "spacesvr";
import Placard from "../../../themes/components/Placard";
import SocialButton from "../../../themes/components/SocialButton";
import { GroupProps } from "react-three-fiber";
import { Text } from "@react-three/drei";

const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/jasonmatias";

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

export default function JasonMatias() {
  return (
    <group name="jason-matias">
      <group
        name="wall-top"
        position={[2.49, 1.07, 4]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/FTLL.jpg`}
          framed
          size={1.6}
          position-x={-6.5}
        />
        <group name="connect" position={[-2.65, -0.1, 0]}>
          {/* @ts-ignore */}
          <Text
            fontSize={0.1}
            color="black"
            anchorX="left"
            position={[-0.2, 0.2, 0]}
          >
            Connect
          </Text>
          <AnnotatedLink link="https://instagram.com/realjasonmatias" />
          <AnnotatedLink
            link="https://jasonmatias.com"
            text="Exit to JasonMatias.com"
            position-y={-0.2}
          />
        </group>
        <Image
          src={`${CONTENT_FOLDER}/WanderingStar.jpg`}
          framed
          size={2}
          position-x={0.8}
        />
        <Image
          src={`${CONTENT_FOLDER}/LanikaiSilence.jpg`}
          framed
          size={1.6}
          position-x={6.5}
        />
      </group>
      <group
        name="wall-top-left"
        position={[-1.39, 1.07, 0.62]}
        rotation-y={Math.PI / 2}
      >
        <Image src={`${CONTENT_FOLDER}/Solitude.jpg`} framed />
        {/*<Placard title="Solitude">*/}
        {/*  There is something extremely calming about boats to me. At a lake*/}
        {/*  shrouded in fog in New York I really felt as though the world was only*/}
        {/*  as large as openings between the mist. Like covering your head with*/}
        {/*  the blankets and willing that dream back. The mist was my blanket. It*/}
        {/*  felt invigorating when I filled my chest with it. While waiting for*/}
        {/*  the small boat to turn in the current I imagined that the condensed*/}
        {/*  air I exhaled on the cool morning was adding to the morning’s misty*/}
        {/*  blanket; I was a part of the magic. That was just Nature allowing me*/}
        {/*    to play along the way she allows all of us from time to time, if we*/}
        {/*    pay attention to her.*/}
        {/*</Placard>*/}
        <Image
          src={`${CONTENT_FOLDER}/CrescendoAndGale.jpg`}
          framed
          position-x={1}
        />
      </group>
      <group
        name="wall-top-middle"
        position={[-1.39, 1.07, 4.1]}
        rotation-y={Math.PI / 2}
      >
        <Video
          src={`${CONTENT_FOLDER}/4.mp4`}
          framed
          size={1.5}
          position-y={0.4}
        />
        <Image
          src={`${CONTENT_FOLDER}/Portrait.jpg`}
          size={0.4}
          position={[-0.625, -0.31, 0]}
        />
        {/* @ts-ignore */}
        <Text
          position={[0.19, -0.1, 0]}
          color="black"
          fontSize={0.0375}
          maxWidth={1.225}
          anchorY="top"
        >
          Jason Matias is an author and contemporary photographer who lives and
          works in the Greater Seattle Area. A New York native, his photographs
          of nature include locations around the globe. More recently in his
          career his creative focus expanded work with models. No matter the
          subject, Jason’s work focuses on the ideas of isolation and
          introspection.{"\n\n"}Jason Matias’ career in photography officially
          began in 2012 however he began exploring photography as a medium of
          expression during his service in the United States Air Force in 2006.
          His experience and artist direction eventually culminated in two
          distant veins of work, Comfortable Isolation and the Aria.{"\n\n"}
          Jason’s artwork has been shown in exhibitions in the US including Art
          Basel Week and Art Expo New York and in private shows around the
          world. His photography has been featured in National Geographic,
          Weather Channel, and TED, among others. In 2020, Jason published his
          first book, NakedThoughts.
        </Text>
      </group>
      <group
        name="wall-top-right"
        position={[-1.39, 1.07, 8.1]}
        rotation-y={Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/ASunStory.jpg`}
          framed
          size={1.5}
          position-y={0.6}
        />
        <Image src={`${CONTENT_FOLDER}/EdgeOfSolace.jpg`} framed size={1.5} />
        <Image
          src={`${CONTENT_FOLDER}/AvendasoraLeaf.jpg`}
          framed
          size={1.5}
          position-y={-0.6}
        />
      </group>
      <group
        name="wall-bottom-left"
        position={[-1.63, 1.07, 0.15]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/IceCaveWithAView.jpg`}
          framed
          size={1.5}
        />
      </group>
      <group
        name="wall-bottom-middle"
        position={[-1.63, 1.07, 4.125]}
        rotation-y={-Math.PI / 2}
      >
        <Image src={`${CONTENT_FOLDER}/TreeOfFire.jpg`} framed size={1.5} />
      </group>
      <group
        name="wall-bottom-right"
        position={[-1.63, 1.07, 8.1]}
        rotation-y={-Math.PI / 2}
      >
        <Image src={`${CONTENT_FOLDER}/FirstLightBW.jpg`} framed size={1.5} />
      </group>
      <group
        name="wall-bottom"
        position={[-5.47, 0.95, 0.6]}
        rotation-y={Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/Skyraider.jpg`}
          framed
          size={1}
          position={[2.75, 0, 0]}
        />
        <Image
          src={`${CONTENT_FOLDER}/Expeditor.jpg`}
          framed
          size={1.3}
          position={[1.25, 0, 0]}
        />
        <Image
          src={`${CONTENT_FOLDER}/Superfortress.jpg`}
          framed
          size={2}
          position={[-1, 0, 0]}
        />
        <group position-x={-4.25}>
          {/* @ts-ignore */}
          <Text color="black" fontSize={0.15} position={[-1, 0.5, -0.03]}>
            New Releases April 7th
          </Text>
          <Image
            framed
            size={1.25}
            src="https://d27rt3a60hh1lx.cloudfront.net/images/placeholder-10x3.jpg"
            position-x={-2}
          />
          <Image
            framed
            size={1.25}
            src="https://d27rt3a60hh1lx.cloudfront.net/images/placeholder-10x3.jpg"
          />
        </group>
        <Image
          src={`${CONTENT_FOLDER}/LastLight.jpg`}
          framed
          size={2}
          position={[-9.5, 0, 0]}
        />
      </group>
      <Image
        name="outside-edgefsolace"
        src={`${CONTENT_FOLDER}/EdgeOfSolace.jpg`}
        framed
        size={10}
        rotation-y={Math.PI}
        position={[-1.4, 1.5, 19]}
      />
      <Image
        name="outside-eddie"
        src={`${CONTENT_FOLDER}/EddieWave.jpg`}
        framed
        size={12}
        rotation-y={0}
        position={[-1.4, 1.5, -12]}
      />
    </group>
  );
}
