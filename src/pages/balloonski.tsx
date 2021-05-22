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
    src: `${url}/NFT-Gator-PalmTree.mp4`,
    audio: true,
    volume: 0.15,
  },
  {
    src: `${url}/nft.mp4`,
    audio: true,
    volume: 0.15,
  },
  {
    src: `${url}/balloonski.jpeg`,
  },
  {
    src: `${url}/many+balloonski+ghosts.jpg`,
  },
];

const envProps = {
  playerProps: {
    pos: [-4.1, 1, 5],
    rot: -Math.PI / 2,
  },
};

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
        environmentProps={envProps}
        premium
        simulationProps={{
          signalHost: "alto.us-west-1.elasticbeanstalk.com",
          signalPort: 443,
          signalPath: "/signal",
          socketServer: "wss://alto.us-west-1.elasticbeanstalk.com:8081",
          frequency: 25,
        }}
      >
        <Balloonski />
      </Gotham>
    </>
  );
};

export default LinkTree;
