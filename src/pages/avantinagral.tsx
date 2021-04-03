import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });
const ARTIST = {
  name: "Avantinagral",
  socials: [
    "https://www.instagram.com/avantinagral/",
    "https://open.spotify.com/artist/2Wwa2Sov84hVY7Hxfqu71Y?si=YBcFgxEaSYiizO_h3-OFHA",
    "https://linktr.ee/avantinagral",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/avantinagral`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.mp4`,
    audio: true,
  },
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/3.mp4`,
  },
  {
    src: `${url}/4.mp4`,
  },
  {
    src: `${url}/5.mp4`,
  },
  {
    src: `${url}/6.mp4`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Avantinagral</title>
      </Head>
      <Gotham artwork={artwork} socials={ARTIST.socials} name={ARTIST.name} />
    </>
  );
};

export default LinkTree;
