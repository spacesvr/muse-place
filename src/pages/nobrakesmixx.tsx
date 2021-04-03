import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "NOBRAKES",
  socials: [
    "https://www.instagram.com/nobrakesmixx/",
    "https://music.apple.com/us/album/mixx-type-beats/1545716993",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/nobrakesmixx`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.mp4`,
    audio: true,
  },
  {
    src: `${url}/2.mp4`,
  },
  {
    src: `${url}/3.jpg`,
  },
  {
    src: `${url}/4.mp4`,
  },
  {
    src: `${url}/5.jpg`,
  },
  {
    src: `${url}/6.mp4`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>NOBRAKES</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name={ARTIST.name}
        night
      />
    </>
  );
};

export default LinkTree;
