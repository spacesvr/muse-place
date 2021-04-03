import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "themes/Alto/types/scroll";

const Alto = dynamic(import("scenes/Alto"), { ssr: false });
const Homocosmico = dynamic(import("scenes/Alto/Homocosmico"), { ssr: false });

const FOLDER = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/homocosmico`;

const scrollData: ScrollData[] = [];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Homocosmico | Muse Place</title>
      </Head>
      <Alto
        font={undefined}
        fontSize={0.83}
        socials={["https://www.instagram.com/homocosmico/"]}
        hdri={`${FOLDER}/space.hdr`}
        scrollData={scrollData}
        content={{
          name: "homocosmico",
          landing: {
            title: "HOMOCOSMICO",
            body: "Escritor, evolucionista. Bienvenido a mi mundo.",
          },
        }}
      >
        <Homocosmico />
      </Alto>
    </>
  );
};

export default LinkTree;
