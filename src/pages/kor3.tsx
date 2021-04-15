import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { MeshStandardMaterial } from "three";
import { useMemo } from "react";

const Gotham = dynamic(import("scenes/Gotham/OldGotham"), { ssr: false });

const ARTIST = {
  name: "Kor3",
  socialLinks: [
    "https://www.instagram.com/kor3design",
    "https://twitter.com/Kor3design",
    "https://rarible.com/rarikor3",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kor3`;
const linkData = [
  {
    src: `${url}/1.mp4`,
    audio: true,
  },
  {
    src: `${url}/2.mp4`,
    audio: true,
  },
  {
    src: `${url}/3.mp4`,
    audio: true,
  },
  {
    src: `${url}/4.mp4`,
    audio: true,
  },
  {
    src: `${url}/5.mp4`,
    audio: true,
  },
  {
    src: `${url}/6.mp4`,
    audio: true,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Gotham
        artwork={linkData}
        socials={ARTIST.socialLinks}
        name={ARTIST.name}
        audio={`${url}/music.mp3`}
        scenePos={[0, -20, 0]}
        fogNear={0}
        fogFar={150}
        fogColor={"#000000"}
        hMapScale={30}
        xzMapScale={100}
        floorColor="black"
        night
      >
        <group position={[0, 0, 0]}>
          <mesh position={[-5.48, 1.25, 4.2]} rotation-y={Math.PI / 2}>
            <planeBufferGeometry args={[16.5, 3, 60, 30]} />
            <meshStandardMaterial
              color={0x7700ff}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[2.49, 1.25, 4.2]} rotation-y={Math.PI / 2}>
            <planeBufferGeometry args={[16.5, 3, 60, 30]} />
            <meshStandardMaterial
              color={0x7700ff}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </Gotham>
    </>
  );
};

export default LinkTree;
