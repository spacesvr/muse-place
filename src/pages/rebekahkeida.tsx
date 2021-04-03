import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Standard = dynamic(import("scenes/Alto"), { ssr: false });

const ARTIST = {
  name: "Rebekah Keida",
  socialLinks: ["https://twitter.com/bekahtron"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/rebekah`;

const scrollData: ScrollData[] = [
  {
    img: `${url}/0.JPG`,
    position: [15, -0.61, 30],
  },
  {
    img: `${url}/1.JPG`,
    position: [-15, -0.61, 30],
  },
  {
    img: `${url}/2.JPG`,
    position: [12.36, 1.21, -15.84],
  },
  {
    img: `${url}/3.JPG`,
    position: [-15, -1.13, -30],
  },
  {
    img: `${url}/4.JPG`,
    position: [30.52, -0.39, 0.97],
  },
  {
    img: `${url}/5.JPG`,
    position: [-12.04, 3.55, -5],
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Standard
        scrollData={scrollData}
        socials={ARTIST.socialLinks}
        audio="https://d27rt3a60hh1lx.cloudfront.net/audio/ini-bestmixever.mp3"
      />
    </>
  );
};

export default LinkTree;
