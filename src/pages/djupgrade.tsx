import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GothamProps } from "themes/Gotham";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });

const ARTIST = {
  name: "DJ Upgrade",
  socials: [
    "https://www.instagram.com/dj_upgrade/",
    "https://open.spotify.com/artist/46t8N3Le53lfIvlrVbjN3L?si=_3iEAWlMQsW6Ngp_FAq9Cw",
  ],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/djupgrade`;
const artwork: GothamProps["artwork"] = [
  {
    src: `${url}/1.mp4`,
    audio: true,
  },
  {
    src: `${url}/2.mp4`,
  },
  {
    src: `${url}/3.mp4`,
  },
  {
    src: `${url}/4.mp4`,
  },
  {
    src: `${url}/5.mp4`,
  },
  {
    src: `${url}/6.mp4`,
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>DJ Upgrade</title>
      </Head>
      <Gotham
        artwork={artwork}
        socials={ARTIST.socials}
        name={ARTIST.name}
        coupon="djupgrade"
        night
      />
    </>
  );
};

export default LinkTree;
