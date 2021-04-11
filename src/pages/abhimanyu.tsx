import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Abhimanyu Bhadauria",
  socials: ["https://www.behance.net/mnayu", "https://dribbble.com/Mnayu"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/abhimanyu`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.png`,
  },
  {
    src: `${url}/2.png`,
  },
  {
    src: `${url}/3.png`,
  },
  {
    src: `${url}/4.png`,
    audio: true,
  },
  {
    src: `${url}/5.png`,
  },
  {
    src: `${url}/6.png`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Abhimanyu Bhadauria | Muse Place</title>
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
