import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Gettacar",
  socials: [
    "https://www.instagram.com/Gettacar",
    "https://www.gettacar.com/?utm_source=Instagram&utm_medium=bio%20link&utm_campaign=Instagram_bio_link",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/gettacar`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.jpg`,
  },
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/3.jpg`,
  },
  {
    src: `${url}/4.jpg`,
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
        <title>Gettacar | Muse Place</title>
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
