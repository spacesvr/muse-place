import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Carlos Alberto",
  socialLinks: ["https://www.instagram.com/homocomsico"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/carlosalberto`;
const linkData = [
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
    src: `${url}/6.jpg`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Gotham
        artwork={linkData}
        socials={ARTIST.socialLinks}
        name={ARTIST.name}
        night
      />
    </>
  );
};

export default LinkTree;
