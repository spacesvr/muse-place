import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "Brendan North",
  socialLinks: ["https://www.instagram.com/brendannorth"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/brendannorth`;
const linkData = [
  {
    src: `${url}/image0.jpeg`,
  },
  {
    src: `${url}/image1.jpeg`,
  },
  {
    src: `${url}/image2.jpeg`,
  },
  {
    src: `${url}/image3.jpeg`,
  },
  {
    src: `${url}/image4.jpeg`,
  },
  {
    src: `${url}/image5.jpeg`,
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
