import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Marvin Crayton Jr.",
  socials: [
    "https://www.instagram.com/media_seauxcray/",
    "https://open.spotify.com/artist/787OwNFvbbQwnrD4NJHm0i?nd=1",
    "https://soundcloud.com/seauxcray?ref=clipboard&p=i&c=1",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/media_seauxcray`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.mp4`,
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
        <title>Marvin Crayton Jr.</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name={ARTIST.name}
        night
      />
    </>
  );
};

export default LinkTree;
