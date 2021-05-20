import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const MuseHQ = dynamic(import("scenes/MuseHQ"), { ssr: false });

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>Muse</title>
      </Head>
      <MuseHQ />
    </>
  );
};

export default LinkTree;
