import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "NIAJ",
  socials: [
    "https://www.instagram.com/niajseban/",
    "http://smarturl.it/sause/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/niajseban`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.mp4`,
  },
  {
    src: `${url}/2.mp4`,
  },
  {
    src: `${url}/3.mp4`,
  },
  {
    src: `${url}/4.jpg`,
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
        <title>NIAJ</title>
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
