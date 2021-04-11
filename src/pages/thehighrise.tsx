import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "THE HIGH RISE",
  socialLinks: ["https://www.instagram.com/highriseagency"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/highrise`;
const linkData = [
  {
    src: `${url}/BART-DTG.jpg`,
  },
  {
    src: `${url}/bnb.rockout.logo.jpg`,
  },
  {
    src: `${url}/BrandLogo.png`,
  },
  {
    src: `${url}/gshitdh.png`,
  },
  {
    src: `${url}/TRIPPY+REEL.mp4`,
  },
  {
    src: `${url}/TYEDYEHOOD2.png`,
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
