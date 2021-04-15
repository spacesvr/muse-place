import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Standard = dynamic(import("scenes/Alto/kira"), { ssr: false });

const ARTIST = {
  name: "Kira-X23",
  socialLinks: [
    "https://www.instagram.com/djkirax23/",
    "https://twitter.com/djkirax23",
    "https://kira.x23.com",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23`;

const scrollData: ScrollData[] = [];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Standard
        socials={ARTIST.socialLinks}
        scrollData={scrollData}
        audio="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/kiramix.mp3"
      />
    </>
  );
};

export default LinkTree;
