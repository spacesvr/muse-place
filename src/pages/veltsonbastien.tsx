import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Veltson Bastien",
  socials: [
    "https://www.instagram.com/veltsonbastien/",
    "https://www.twitter.com/veltsonbastien",
    "https://www.amberxmedia.com",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/veltsonbastien`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.JPG`,
    audio: true,
  },
  {
    src: `${url}/2.JPG`,
  },
  {
    src: `${url}/3.JPG`,
  },
  {
    src: `${url}/4.JPG`,
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
        <title>Veltson Bastien</title>
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
