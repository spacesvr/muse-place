import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Standard = dynamic(import("scenes/Alto"), { ssr: false });

const ARTIST = {
  name: "Siimbiie Selassiie",
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/siimbiieselassiie`;

const scrollData: ScrollData[] = [
  {
    img: `${url}/1.jpg`,
    text: "Tell me more about your flexing abilities...",
    position: [15, -0.61, 30],
  },
  {
    img: `${url}/2.JPG`,
    text:
      "I started eating fire because I was scared of it....people asked me how I got over my fear. The answer is simple. I didn’t. Courage isn’t the lack of fear, it’s the willingness to face it.",
    position: [-15, -0.61, 30],
  },
  {
    img: `${url}/3.jpg`,
    text: "🦁 HAKUNA MATATA. 🦁",
    position: [12.36, 1.21, -15.84],
  },
  {
    img: `${url}/4.jpg`,
    text: "Missing Africa...",
    position: [-15, -1.13, -30],
  },
  {
    img: `${url}/5.JPG`,
    text: "Melkam Gana.",
    position: [30.52, -0.39, 0.97],
  },
  {
    img: `${url}/6.jpg`,
    text:
      "No this isn't a joke. VIICES out now. Corona can't stop us. Love you.",
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
        font={undefined}
        fontSize={0.85}
        socials={[
          "https://siimbiie.org/",
          "https://www.instagram.com/siimbiie/",
          "https://www.youtube.com/watch?app=desktop&v=yn3xf-sL99Q",
        ]}
        scrollData={scrollData}
        content={{
          name: "Siimbiie Selassiie",
          landing: {
            title: "Welcome to the world of Siimbiie Selassiie!",
            body: "",
          },
        }}
        audio="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/siimbiieselassiie/TOURII$T GUMP.mp3"
      />
    </>
  );
};

export default LinkTree;
