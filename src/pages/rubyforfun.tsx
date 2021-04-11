import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Standard = dynamic(import("scenes/Alto"), { ssr: false });

const ARTIST = {
  name: "Ruby for Fun!",
  socialLinks: [
    "https://twitter.com/rubyforfun",
    "https://www.instagram.com/rubyforfun/",
    "https://www.ruby.fun/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/rubyforfun`;

const scrollData: ScrollData[] = [
  {
    img: `${url}/1.jpg`,
    text: "The first Ready-to-Drink Hibiscus water",
    position: [15, -0.61, 30],
  },
  {
    img: `${url}/2.jpg`,
    text: "Let’s explore the Rubyverse...",
    position: [-15, -0.61, 30],
  },
  {
    img: `${url}/3.JPG`,
    text: "Tastes like Fun!",
    position: [12.36, 1.21, -15.84],
  },
  {
    img: `${url}/4.JPG`,
    text: "Find us on Earth, and Beyond!",
    position: [-15, -1.13, -30],
  },
  {
    img: `${url}/5.JPG`,
    text: "The only vegan, plant-based, intergalactic beverage on the market.",
    position: [30.52, -0.39, 0.97],
  },
  {
    img: `${url}/6.jpg`,
    text:
      'This one goes out to all those "better for you" beverages on store shelves.',
    position: [-12.04, 3.55, -5],
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Standard
        scrollData={scrollData}
        socials={ARTIST.socialLinks}
        audio="https://d27rt3a60hh1lx.cloudfront.net/audio/ini-bestmixever.mp3"
        content={{
          name: "Ruby For Fun",
          landing: {
            title: "Ruby for Fun",
            body:
              "The only vegan, plant-based, intergalactic beverage on the market.",
          },
        }}
      />
    </>
  );
};

export default LinkTree;
