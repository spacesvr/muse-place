import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham/OldGotham"), { ssr: false });
const KiraX23 = dynamic(import("scenes/Gotham/KiraX23"), { ssr: false });

const ARTIST = {
  name: "KIRA-X23",
  socials: [
    "https://soundcloud.com/experiment23",
    "https://twitter.com/djkirax23",
    "https://www.instagram.com/djkirax23/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.jpg`,
  },
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/3.jpg`,
  },
  {
    src: `${url}/4.jpg`,
  },
  {
    src: `${url}/5.jpg`,
  },
  {
    src: `${url}/6.jpg`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>KIRA-X23 | Muse Place</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name=""
        map="city"
        scenePos={[0, -20, 0]}
        fogNear={0}
        fogFar={150}
        fogColor={"#000000"}
        hMapScale={30}
        xzMapScale={100}
        floorColor="black"
        night
        audio={`${url}/hottopic-1.mp3`}
        environmentProps={{ playerProps: { speed: 1.7 * 2 } }}
      >
        <KiraX23 />
      </Gotham>
    </>
  );
};

export default LinkTree;
