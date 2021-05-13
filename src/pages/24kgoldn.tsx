import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham/"), { ssr: false });

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/24kgoldn`;
const linkData = [
  {
    src: `${url}/1.png`,
  },
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/4.jpg`,
  },
  {
    src: `${url}/3.mp4`,
    audio: true,
  },
  {
    src: `${url}/5.jpg`,
  },
  {
    src: `${url}/6.jpg`,
  },
];

const links = [
  "https://www.instagram.com/24kgoldn/",
  "https://twitter.com/24kgoldn",
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>24k Goldn | Muse Place</title>
      </Head>
      <Gotham socials={links} artwork={linkData} name="24k Goldn" night />
    </>
  );
};

export default LinkTree;
