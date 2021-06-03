import React, { Suspense } from "react";
import ChadModel from "./models/ChadKight/Chad07";
import { AudioAnalyser } from "three";
import { ScrollData } from "./types/scroll";
import { Preload } from "@react-three/drei";
import FBPixel from "../components/FacebookPixel";
import GoogleAnalytics from "../components/GoogleAnalytics";

export type AltoProps = {
  socials: string[];
  scrollData: ScrollData[];
  model: {
    url: string;
    scale: number;
  };
  content: {
    name: string;
    landing: {
      title: string;
      body: string;
    };
  };
  audio?: string;
  font: string;
  fontSize: number;
  aa?: AudioAnalyser;
  setAA?: (aa: AudioAnalyser) => void;
  fbPixel?: string;
  googleAnalytics?: string;
  premium?: boolean;
};

export const ChadAltoContext = React.createContext<AltoProps>({} as AltoProps);
const defaultContext: AltoProps = {
  socials: ["http://instagram.com/musehq"],
  font: "https://d27rt3a60hh1lx.cloudfront.net/content/alto/ohmightyisis.ttf",
  fontSize: 1,
  model: {
    url:
      "https://d27rt3a60hh1lx.cloudfront.net/models/TheMuse-1614830089/themuse-pose.glb",
    scale: 1.4,
  },
  scrollData: [],
  content: {
    name: "Muse",
    landing: {
      title: "Welcome to Alto",
      body: `otherwise known as the music venue of the gods. For thousands of years, Alto has been only accessible to immortal beings, but you seem to have found us anyway.. At the top of those stairs, you'll be the first mortal to ever hear Lucid Monday's latest work`,
    },
  },
  premium: false,
};

const Alto = (props: Partial<AltoProps>) => {
  const { fbPixel, googleAnalytics } = props;

  return (
    <ChadAltoContext.Provider value={{ ...defaultContext, ...props }}>
      <Preload all />
      <Suspense fallback={null}>
        <Preload all />
        <ChadModel />
      </Suspense>
      <ambientLight intensity={0.5} />
      <FBPixel code={fbPixel} />
      <GoogleAnalytics code={googleAnalytics} />
    </ChadAltoContext.Provider>
  );
};

export default Alto;
