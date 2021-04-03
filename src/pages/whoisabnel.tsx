import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";
import { Keyframe } from "spacesvr";
import { Vector3 } from "three";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });
const Whoisabnel = dynamic(import("scenes/Gotham/Whoisabnel"), { ssr: false });

const ARTIST = {
  name: "whoisabnel",
  socials: [
    "https://www.instagram.com/whoisabnel/",
    "https://open.spotify.com/artist/5Hxu0qykbixWUDf2G5RgsW?si=TxBDOL-4Soar5dVnAFTrWw",
  ],
};

const artwork: GothamProps["artwork"] = [];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>whoisabnel | Muse Place</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name={ARTIST.name}
        night
        open
      >
        <Whoisabnel />
      </Gotham>
    </>
  );
};

export default LinkTree;
