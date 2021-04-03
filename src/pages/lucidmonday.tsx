import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Alto = dynamic(import("scenes/Alto"), { ssr: false });
const LucidMonday = dynamic(import("scenes/Alto/LucidMonday"), { ssr: false });

const FOLDER = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kr3wcial`;
const ARTIST = {
  name: "Lucid Monday",
};

const scrollData: ScrollData[] = [
  {
    img: `${FOLDER}/1.jpg`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    position: [15, -0.61, 30],
  },
  {
    img: `${FOLDER}/2.jpg`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    position: [-15, -0.61, 30],
  },
  {
    img: `${FOLDER}/3.jpg`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    position: [12.36, 1.21, -15.84],
  },
  {
    img: `${FOLDER}/4.jpg`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    position: [-15, -1.13, -30],
  },
  {
    img: `${FOLDER}/5.jpg`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    position: [30.52, -0.39, 0.97],
  },
  {
    img: `${FOLDER}/6.jpg`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    position: [-12.04, 3.55, -5],
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Alto
        font={undefined}
        fontSize={0.85}
        socials={[
          "https://open.spotify.com/user/0m1ewbfl4sfauko9hvrg5qopu?si=tD6RjOJRTdSTGn96XGaLEg",
          "https://soundcloud.com/lucidmonday",
          "https://twitter.com/lucid_monday",
          "https://www.instagram.com/lucidmonday/",
          "https://lucidmonday.com/",
        ]}
        scrollData={scrollData}
        model={{
          url:
            "https://d27rt3a60hh1lx.cloudfront.net/models/MonMon-1611717369/monmon.glb",
          scale: 1.3,
        }}
        content={{
          name: "Lucid Monday",
          landing: {
            title: "LUCID PALACE",
            body:
              "Lucid Monday comes here every tuesday to recover from their hangover. Only being able to stumble around, it took Dilip an hour to find the door, and he dropped some fresh singles he had in his pocket. Wouldn't want those to get out too soon...",
          },
        }}
        audio="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/lucidmonday/lucidmonday-yo.mp3"
      >
        <LucidMonday />
      </Alto>
    </>
  );
};

export default LinkTree;
