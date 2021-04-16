import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });
const Balloonski = dynamic(import("scenes/Gotham/Balloonski"), { ssr: false });

const ARTIST = {
  name: "Balloonski",
  socialLinks: [
    "https://www.instagram.com/balloonski",
    "https://Balloonski.com",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/balloonski`;

const linkData = [
  {
    src: `${url}/gator-stripper.jpg`,
  },
  {
    src: `${url}/gucci+ghost.jpg`,
  },
  {
    src: `${url}/balloon+frights.jpg`,
  },
  {
    src: `${url}/5.jpg`,
  },
  {
    src: `${url}/balloonski.jpeg`,
  },
  {
    src: `${url}/many+balloonski+ghosts.jpg`,
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
        premium
      >
        <Balloonski />
      </Gotham>
    </>
  );
};

export default LinkTree;
