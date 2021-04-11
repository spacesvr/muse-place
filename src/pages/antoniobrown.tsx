import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";
import { ScrollData } from "themes/Alto/types/scroll";

const Alto = dynamic(import("scenes/Alto"), { ssr: false });

const ARTIST = {
  name: "Antonio Brown",
  socials: [
    "https://www.instagram.com/shdwgxd/",
    "https://twitter.com/shdwgxd",
    "mailto:antoniollbrown@gmail.com",
  ],
};

const FOLDER = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/antoniobrown`;

const scrollData: ScrollData[] = [
  {
    img: `${FOLDER}/image0.jpeg`,
    text:
      'Set The Tone "Stamped and Approved Hoodie"\n\nInspired by Set The Tone Multimedia Company\'s official stamp of approval by the state of Illinois',
    position: [15, -0.61, 30],
  },
  {
    img: `${FOLDER}/image1.png`,
    text:
      'Set The Tone "Parks Tee"\n\nLogo inspired by my hometown Milwaukee, WI County Parks.',
    position: [-15, -0.61, 30],
  },
  {
    img: `${FOLDER}/image4.png`,
    text:
      'Set The Tone "Stamped and Approved Tee"\n\nInspired by Set The Tone Multimedia Company\'s official stamp of approval by the state of Illinois.',
    position: [-15, -1.13, -30],
  },
  {
    img: `${FOLDER}/image6.png`,
    text:
      'Set The Tone "Stamped and Approved Tee"\n\nInspired by Set The Tone Multimedia Company\'s official stamp of approval by the state of Illinois.',
    position: [12.36, 1.21, -15.84],
  },
  {
    img: `${FOLDER}/image8.png`,
    text:
      'Set The Tone "Developer Tee"\n\nInspired by one of my favorite apps. The "Developer" Tee is for anyone operating in the new millennium.',
    position: [30.52, -0.39, 0.97],
  },
  {
    img: `${FOLDER}/image2.png`,
    text:
      'Set The Tone "Parks Tee"\n\nLogo inspired by my hometown Milwaukee, WI County Parks.',
    position: [-12.04, 3.55, -5],
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Antonio Brown | Muse Place</title>
      </Head>
      <Alto
        font={undefined}
        fontSize={0.83}
        socials={ARTIST.socials}
        scrollData={scrollData}
        content={{
          name: "Set The Tone",
          landing: {
            title: "Set The Tone",
            body:
              "Delivering timely, quality work so that you too can set the tone for others to follow!\n\nThere are six images scattered around the map - find them, screenshot, and post in your story for discount code!",
          },
        }}
        audio={`${FOLDER}/BigBang.mp3`}
      />
    </>
  );
};

export default LinkTree;
