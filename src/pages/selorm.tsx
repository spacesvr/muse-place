import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "SELORM",
  socials: [
    "https://open.spotify.com/artist/0EcqRKRmBxLUENS1xyq3Dv?si=6UPrxntLTiCTt8SKa0d1JQ",
    "https://www.instagram.com/selorm.k/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/selorm`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/5.mp4`,
  },
  {
    src: `${url}/3.jpg`,
  },
  {
    src: `${url}/1.mp4`,
    audio: true,
  },
  {
    src: `${url}/6.jpg`,
  },
  {
    src: `${url}/4.jpg`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>SELORM | Muse Place</title>
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
