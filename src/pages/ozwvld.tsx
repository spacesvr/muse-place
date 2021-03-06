import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });
const ARTIST = {
  name: "OZWVLD",
  socials: ["https://www.instagram.com/ozwvld/", "https://vimeo.com/399998090"],
};
const Ozwvld = dynamic(import("scenes/Gotham/Ozwvld"), { ssr: false });

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/ozwvld`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.jpg`,
    audio: true,
  },
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/3.jpg`,
  },
  {
    src: `${url}/4.jpg`,
  },
  {
    src: `${url}/5.jpg`,
  },
  {
    src: `${url}/6.jpg`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>OZWVLD</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name={ARTIST.name}
        night
      >
        <Ozwvld />
      </Gotham>
    </>
  );
};

export default LinkTree;
