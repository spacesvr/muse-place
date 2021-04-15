import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "../themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });
const Investors = dynamic(import("scenes/Gotham/Investors"), {
  ssr: false,
});
const ARTIST = {
  name: "",
  socials: [],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/investors`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.jpg`,
    size: 1.8,
  },
  {
    src: `${url}/2.jpg`,
    size: 1.8,
  },
  {
    src: `${url}/5-smaller.mp4`,
    size: 1.8,
  },
  {
    src: `${url}/4.jpg`,
    size: 1.8,
  },
  {
    src: `${url}/3.jpg`,
    size: 1.8,
  },
  {
    src: `${url}/6.jpg`,
    size: 1.8,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Investors | Muse</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name={ARTIST.name}
        emailCollection={{
          title: "Be the first to hear about our progress",
          link: "https://mailchimp.com",
        }}
        premium
        night
        simulationProps={{
          signalHost: "live.muse.place",
          signalPort: 443,
          signalPath: "/signal",
          socketServer: "wss://live.muse.place:8081",
          frequency: 40,
        }}
      >
        <Investors />
      </Gotham>
    </>
  );
};

export default LinkTree;
