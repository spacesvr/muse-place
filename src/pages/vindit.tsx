import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Vindit",
  socialLinks: [
    "https://www.instagram.com/vind1t",
    "https://open.spotify.com/artist/7IMqmZRaebLWN3e0uxkrIP?si=6P0CJ5VoT1u4rHmAxkSO3A",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/vind1t`;
const linkData = [
  {
    src: `${url}/0.jpg`,
  },
  {
    src: `${url}/1.mp4`,
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
    src: `${url}/5.mp4`,
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
