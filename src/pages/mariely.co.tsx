import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Mariely",
  socials: ["https://mariely.co/", "https://www.instagram.com/mariely.co/"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/marielyco`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.jpg`,
  },
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/6.jpg`,
  },
  {
    src: `${url}/4.jpg`,
  },
  {
    src: `${url}/3.jpg`,
  },
  {
    src: `${url}/5.jpg`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mariely | Muse Place</title>
      </Head>
      <Gotham artwork={artwork} socials={ARTIST.socials} name={ARTIST.name} />
    </>
  );
};

export default LinkTree;
