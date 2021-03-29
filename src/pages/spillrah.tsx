import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "spill.rah",
  socialLinks: [
    "https://www.instagram.com/spillrah",
    "https://open.spotify.com/artist/2VlCmPerBLbnxuVdQcH7D6?si=gbCEbj9_RKe1b_u6rrW4bA",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/spill`;
const linkData = [
  {
    src: `${url}/1.jpg`,
  },
  {
    src: `${url}/2.jpg`,
  },
  {
    src: `${url}/3.mp4`,
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
        audio={`${url}/music.mp3`}
        night
      />
    </>
  );
};

export default LinkTree;
