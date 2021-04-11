import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Million King",
  socialLinks: [
    "https://www.instagram.com/millionkingmusic",
    "https://open.spotify.com/artist/6To84cmvQDTiQz44PoDbmN?si=B_ZscDFtSamB10XZiqqafw",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/dustinking`;
const linkData = [
  {
    src: `${url}/1.JPG`,
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
    src: `${url}/5.jpg`,
  },
  {
    src: `${url}/6.png`,
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
        audio="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/dustinking/newmusic.mp3"
        night
      />
    </>
  );
};

export default LinkTree;
