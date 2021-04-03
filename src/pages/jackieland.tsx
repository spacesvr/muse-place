import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Standard = dynamic(import("scenes/Alto"), { ssr: false });

const ARTIST = {
  name: "Jackie",
  socials: [
    "https://www.instagram.com/j.a.c.k.i.e.l.a.n.d/",
    "https://www.jackielandworld.com/",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/jackieland`;
const scrollData: ScrollData[] = [
  {
    img: `${url}/1.jpg`,
    position: [15, -0.61, 30],
    text:
      "[Forbes 90 Under 90 award]\n" +
      "Awards & Praise!\n" +
      "Jackie LOVES compliments (who doesn’t) but especially in the form of an award! And if the award involved little to no work on her end, even better! Give her this fake award and she’ll be busy admiring herself in its glow.\n",
  },
  {
    img: `${url}/2.JPG`,
    position: [-15, -0.61, 30],
    text:
      "[Cheese & Franco on green background]\n" +
      "Jackie’s Cats! \n" +
      "Mention you have a cat ONCE and Jackie will go on and on about her personal cat hellscape. Ask if little Cheese has smashed any family heirlooms today? Or if Franco has begged for food only to throw it all up in her shoes? You’ll be outta Jackieland in no time!\n",
  },
  {
    img: `${url}/3.jpg`,
    position: [12.36, 1.21, -15.84],
    text:
      "[Money] \n" +
      "Money! \n" +
      "Jackie is money HUNGRY. Just bribe her and she’ll leave you alone forever!\n",
  },
  {
    img: `${url}/4.jpg`,
    position: [-15, -1.13, -30],
    text:
      "[Chocolate Birthday cake]\n" +
      "Jackie’s Birthday!\n" +
      "Tell Jackie it’s her birthday! She looves her birthday and celebrates the whole month (yep, one of those). She’ll be so distracted eating cake and dancing, she won’t even notice you’re almost gone.\n",
  },
  {
    img: `${url}/5.jpg`,
    position: [30.52, -0.39, 0.97],
    text:
      "[Megaphone]\n" +
      "Yelling!\n" +
      "Jackie respects people who can shout louder than she does. In Jackieland, The loudest person in the room wins. And if the loudest person in the room isn’t Jackie, they will also be asked to leave—and now that’s YOU! \n",
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jackie</title>
        <title>Land</title>
      </Head>
      <Standard scrollData={scrollData} socials={ARTIST.socials} />
    </>
  );
};

export default LinkTree;
