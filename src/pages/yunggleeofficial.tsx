import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Yungg Lee",
  socials: [
    "https://www.instagram.com/yunggleeofficial_/",
    "https://open.spotify.com/artist/7dFrIo1IWHQuS8GAqhZ3yw?si=PnBbyPXCQd-jBk0HOqm4Wg",
    "https://linktr.ee/Yunggleeofficial_",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/yunggleeofficial`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.jpg`,
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
        <title>Yungg Lee</title>
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
