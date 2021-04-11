import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Christian Santamaria",
  socials: [
    "https://www.instagram.com/christiansantamaria",
    "https://christiansantamaria.app/",
    "https://www.facebook.com/ChristianSantamariaNYC/",
    "https://www.linkedin.com/in/christiansantamaria/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/christiansantamaria`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.JPG`,
  },
  {
    src: `${url}/2.JPG`,
  },
  {
    src: `${url}/3.JPG`,
  },
  {
    src: `${url}/4.JPG`,
    audio: true,
  },
  {
    src: `${url}/5.JPG`,
  },
  {
    src: `${url}/6.JPG`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Christian Santamaria | Muse Place</title>
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
