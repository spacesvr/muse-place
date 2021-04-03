import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Femi Aina New York",
  socials: [
    "https://www.instagram.com/femiainanewyork/",
    "https://femiainanewyork.com/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/femiainanewyork`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.png`,
    audio: true,
  },
  {
    src: `${url}/2.png`,
  },
  {
    src: `${url}/3.png`,
  },
  {
    src: `${url}/4.jpg`,
  },
  {
    src: `${url}/5.png`,
  },
  {
    src: `${url}/6.jpg`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Femi Aina New York</title>
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
