import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Shed = dynamic(import("scenes/Shed"), {
  ssr: false,
});

const ShedScene: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Shed</title>
      </Head>
      <Shed />
    </>
  );
};

export default ShedScene;
