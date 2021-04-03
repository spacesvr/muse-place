import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Standard = dynamic(import("scenes/Alto"), { ssr: false });

const ARTIST = {
  name: "Symfonee",
  socialLinks: ["https://www.instagram.com/symfonee/", "https://heavy-nyc.com"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/symfonee`;

const scrollData: ScrollData[] = [
  {
    img: `${url}/0.jpg`,
    position: [15, -0.61, 30],
  },
  {
    img: `${url}/1.jpg`,
    position: [-15, -0.61, 30],
  },
  {
    img: `${url}/2.jpg`,
    position: [12.36, 1.21, -15.84],
  },
  {
    img: `${url}/3.jpg`,
    position: [-15, -1.13, -30],
  },
  {
    img: `${url}/4.jpg`,
    position: [30.52, -0.39, 0.97],
  },
  {
    img: `${url}/5.mp4`,
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
        // audio="https://d27rt3a60hh1lx.cloudfront.net/audio/ini-bestmixever.mp3"
      />
    </>
  );
};

export default LinkTree;
