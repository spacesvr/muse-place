import { Image, Video } from "spacesvr";
import SocialButton from "themes/components/SocialButton";
import { GroupProps } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Label from "themes/components/Label";
import Info from "./components/Info";
import TitleCard from "./components/TitleCard";

const CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/jasonmatias";
const EMAIL = "youremail@gmail.com";
const CONTACT = "mailto:youremail@gmail.com?";
const SITE = "https://jasonmatias.com";

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
        position={[2.49, 0.9, 4]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/FTLL.jpg`}
          framed
          frameWidth={0.75}
          size={1.2}
          position-x={-6.5}
        />
        <TitleCard
          position={[-5.6, -0.1, 0.1]}
          title="For The Love Of Light"
          width={0.8}
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/landscapes#/for-the-love-of-light/"
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
          frameWidth={0.75}
          size={2}
          position-x={0.2}
        />
        <TitleCard
          position={[1.7, -0.3, 0.2]}
          rotation-x={-0.5}
          title="Wandering Star"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/landscapes#/wandering-star/"
        />
        <Image
          src={`${CONTENT_FOLDER}/LanikaiSilence.jpg`}
          framed
          frameWidth={0.75}
          size={1.6}
          position-x={6.5}
        />
        <TitleCard
          position={[7.35, -0.1, 0.1]}
          title="Silence"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/seascapes#/template/"
        />
      </group>
      <group
        name="wall-top-left"
        position={[-1.25, 0.9, 0.62]}
        rotation-y={Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/Solitude.jpg`}
          framed
          frameWidth={0.75}
          position={[0, 0, -0.125]}
          scale={1.1}
        />
        <TitleCard
          position={[0, -0.65, 0.075]}
          rotation-x={-0.5}
          title="Solitude"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/lonely-boats#/solitude/"
        />
        <Image
          src={`${CONTENT_FOLDER}/CrescendoAndGale.jpg`}
          framed
          frameWidth={0.75}
          position={[1, 0, -0.125]}
          scale={1.1}
        />
        <TitleCard
          position={[1, -0.65, 0.075]}
          rotation-x={-0.5}
          width={0.8}
          title="Crescendo And Gale"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/black-and-white#/crescendo-and-gale/"
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
          frameWidth={0.75}
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
          position={[0.18, -0.11, 0]}
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
        <group position-y={0.5} name="asunstory">
          <Image
            src={`${CONTENT_FOLDER}/ASunStory.jpg`}
            framed
            frameWidth={0.75}
            size={1.25}
          />
        </group>
        <group name="edgeofsolace" position-y={-0.05}>
          <Image
            src={`${CONTENT_FOLDER}/EdgeOfSolace.jpg`}
            framed
            frameWidth={0.75}
            size={1.25}
          />
        </group>
        <group position-y={-0.6} name="avenadoraleaf">
          <Image
            src={`${CONTENT_FOLDER}/AvendasoraLeaf.jpg`}
            framed
            frameWidth={0.75}
            size={1.25}
          />
        </group>
        <group
          name="right-wall-title-cards"
          position={[-0.75, -0.9, 0.25]}
          rotation-x={-0.5}
        >
          <TitleCard
            title="A Sun Story"
            contactUrl="https://google.com"
            visitUrl="https://www.jasonmatias.com/landscapes#/a-sun-story/"
            position-x={0}
          />
          <TitleCard
            title="Edge Of Solace"
            contactUrl="https://google.com"
            visitUrl="https://www.jasonmatias.com/landscapes#/edge-of-solace/"
            position-x={0.75}
          />
          <TitleCard
            title="Avensadora Leaf"
            contactUrl="https://google.com"
            visitUrl="https://www.jasonmatias.com/landscapes#/avendasora-leaf/"
            position-x={1.5}
          />
        </group>
      </group>
      <group
        name="wall-bottom-left"
        position={[-1.63, 0.9, 0.15]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/IceCaveWithAView.jpg`}
          framed
          frameWidth={0.75}
          size={1.5}
          position-x={-0.05}
        />
        <TitleCard
          position={[0.3, -0.65, 0.1]}
          rotation-x={-0.5}
          width={0.8}
          title="Ice Cave With A View"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/landscapes#/ice-cave-with-a-view/"
        />
      </group>
      <group
        name="wall-bottom-middle"
        position={[-1.63, 0.9, 4.125]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/TreeOfFire.jpg`}
          framed
          frameWidth={0.75}
          size={1.5}
          position-x={-0.05}
        />
        <TitleCard
          position={[0.55, -0.65, 0.1]}
          rotation-x={-0.5}
          title="Tree of Fire"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/landscapes#/tree-of-fire/"
        />
      </group>
      <group
        name="wall-bottom-right"
        position={[-1.63, 0.9, 8.1]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          src={`${CONTENT_FOLDER}/FirstLightBW.jpg`}
          framed
          frameWidth={0.75}
          size={1.5}
          position-x={-0.05}
        />
        <TitleCard
          position={[0.55, -0.55, 0.1]}
          rotation-x={-0.5}
          title="First Light"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/black-and-white#/first-light/"
        />
      </group>
      <group
        name="wall-bottom"
        position={[-5.47, 0.9, 0.6]}
        rotation-y={Math.PI / 2}
      >
        <group
          position-y={-0.2}
          scale={[0.8, 0.8, 0.8]}
          name="skywardCollection"
        >
          <Image
            src={`${CONTENT_FOLDER}/Skyraider.jpg`}
            framed
            frameWidth={0.75}
            size={1}
            position={[2.68, 0, 0]}
          />
          <Image
            src={`${CONTENT_FOLDER}/Expeditor.jpg`}
            framed
            frameWidth={0.75}
            size={1.3}
            position={[1.5, 0, 0]}
          />
          <Image
            src={`${CONTENT_FOLDER}/Superfortress.jpg`}
            framed
            frameWidth={0.75}
            size={2.2}
            position={[1.95, 1.025, 0]}
          />
        </group>
        <TitleCard
          position={[0.15, 0, 0.1]}
          rotation-x={0}
          title="Skyward Collection"
          width={0.8}
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/landscapes#/skyward/"
        />
        <group position-x={-2.56}>
          <Image
            framed
            frameWidth={0.75}
            size={2}
            src={`${CONTENT_FOLDER}/HawaiiWave.jpg`}
            position-x={-2.4}
          />
          <TitleCard
            position={[-1.75, -0.5, 0.1]}
            rotation-x={-0.5}
            title="Three Fates"
            contactUrl={CONTACT}
            visitUrl="https://www.jasonmatias.com/seascapes#/three-fates/"
          />
          <Image
            framed
            frameWidth={0.75}
            size={2}
            src={`${CONTENT_FOLDER}/MolokaiPano.jpg`}
            position-x={0.4}
          />
          <TitleCard
            position={[-0.25, -0.5, 0.1]}
            rotation-x={-0.5}
            title="Molokai Light"
            contactUrl={CONTACT}
            visitUrl="https://www.jasonmatias.com/seascapes#/molokai-light/"
          />
        </group>
        <Image
          src={`${CONTENT_FOLDER}/LastLight.jpg`}
          framed
          frameWidth={0.75}
          size={2}
          position={[-9.5, 0, 0]}
        />
        <TitleCard
          position={[-8, -0.25, 0.1]}
          title="Last Light"
          contactUrl={CONTACT}
          visitUrl="https://www.jasonmatias.com/landscapes#/last-light/"
        />
      </group>
      <Image
        name="outside-edgefsolace"
        src={`${CONTENT_FOLDER}/EdgeOfSolace.jpg`}
        framed
        frameWidth={0.75}
        size={10}
        rotation-y={Math.PI}
        position={[-1.4, 1.5, 19]}
      />
      <Image
        name="outside-eddie"
        src={`${CONTENT_FOLDER}/EddieWave.jpg`}
        framed
        frameWidth={0.75}
        size={12}
        rotation-y={0}
        position={[-1.4, 1.5, -12]}
      />
    </group>
  );
}
