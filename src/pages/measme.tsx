import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";
const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Me As Me",
  socialLinks: [
    "https://www.instagram.com/itsmeasme",
    "https://open.spotify.com/artist/0whePKSPIr8YOevyI5hjpo?si=cmghAscfS9SjKtIp3kbG_w",
    "https://www.measme.me/shop",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/itsmeasme`;
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
    src: `${url}/4.mp4`,
  },
  {
    src: `${url}/5.mp4`,
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
        artwork={artwork}
        socials={ARTIST.socialLinks}
        name={ARTIST.name}
        audio={`${url}/music.mp3`}
      />
    </>
  );
};

export default LinkTree;
