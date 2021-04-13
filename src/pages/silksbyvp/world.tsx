import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Silks = dynamic(import("scenes/Silks"), { ssr: false });

const SilksByVP: NextPage = () => {
  return (
    <>
      <Head>
        <title>Silks By VP</title>
        <script
          type="application/javascript"
          async
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Yud2dd"
        ></script>
      </Head>
      <Silks />
    </>
  );
};

export default SilksByVP;
