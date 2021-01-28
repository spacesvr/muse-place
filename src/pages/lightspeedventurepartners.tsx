import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "../themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Lightspeed",
  socials: [
    "https://www.instagram.com/lightspeedventurepartners/",
    "https://lsvp.com/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/lightspeedventurepartners`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.jpg`,
    audio: true,
    size: [750, 750],
  },
  {
    src: `${url}/2.jpg`,
    size: [1066, 711],
  },
  {
    src: `${url}/3.jpg`,
    size: [1066, 711],
  },
  {
    src: `${url}/4.jpg`,
    size: [1080, 566],
  },
  {
    src: `${url}/5.mp4`,
    size: [480, 480],
  },
  {
    src: `${url}/6.jpg`,
    size: [1080, 1350],
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lightspeed</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name={ARTIST.name}
        map="city"
        scenePos={[0, -20, 0]}
        fogNear={0}
        fogFar={150}
        fogColor={"#000000"}
        hMapScale={30}
        xzMapScale={100}
        floorColor="black"
        night
        stars
      />
    </>
  );
};

export default LinkTree;