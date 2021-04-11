import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Gotham, { GothamProps } from "themes/Gotham";
const Codame = dynamic(import("scenes/Gotham/Codame"), { ssr: false });

const ARTIST = {
  name: "Benjamin Ha",
  socialLinks: {
    instagram: "https://www.instagram.com/itsbenha",
    twitter: "https://twitter.com/itsbenha",
    web: "https://www.muse.place/muse",
  },
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/itsbenha`;
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
  },
  {
    src: `${url}/5.jpg`,
  },
  {
    src: `${url}/6.mp4`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Codame
        socials={[]}
        artwork={artwork}
        socialLinks={ARTIST.socialLinks}
        name={ARTIST.name}
      />
    </>
  );
};

export default LinkTree;
