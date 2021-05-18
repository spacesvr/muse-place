import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });
const BenNft = dynamic(import("scenes/Gotham/BenNft"), { ssr: false });

const ARTIST = {
  name: "Ben's NFT Collection",
  socialLinks: [
    "https://www.instagram.com/itsbenha",
    "https://twitter.com/itsbenha?lang=en",
    "https://www.muse.place/",
  ],
};

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Gotham socials={ARTIST.socialLinks} name={ARTIST.name} signup open night>
        <BenNft />
      </Gotham>
    </>
  );
};

export default LinkTree;
