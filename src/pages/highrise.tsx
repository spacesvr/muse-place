import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Gotham = dynamic(import("scenes/Gotham"), { ssr: false });
const Highrise = dynamic(import("scenes/Gotham/Highrise"), {
  ssr: false,
});

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Highrise Co.</title>
        <title>Gallery</title>
      </Head>
      <Gotham socials={[]} name="" premium night>
        <Highrise />
      </Gotham>
    </>
  );
};

export default LinkTree;
