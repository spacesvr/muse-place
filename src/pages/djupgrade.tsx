import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "../themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "DJ Upgrade",
  socials: [
    "https://www.instagram.com/dj_upgrade/",
    "https://open.spotify.com/artist/46t8N3Le53lfIvlrVbjN3L?si=_3iEAWlMQsW6Ngp_FAq9Cw",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/djupgrade`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.mp4`,
    audio: true,
    size: [720, 406],
  },
  {
    src: `${url}/2.mp4`,
    size: [640, 798],
  },
  {
    src: `${url}/3.mp4`,
    size: [720, 406],
  },
  {
    src: `${url}/4.mp4`,
    size: [720, 720],
  },
  {
    src: `${url}/5.mp4`,
    size: [640, 334],
  },
  {
    src: `${url}/6.mp4`,
    size: [640, 800],
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>DJ Upgrade</title>
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