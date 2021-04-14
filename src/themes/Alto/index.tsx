import React, { Suspense, useState } from "react";
import AltoModel from "./models/AltoModel";
import { AudioAnalyser, Color } from "three";
import Grass from "./components/Grass";
import Sun from "./components/Sun";
import Scrolls from "./components/Scrolls";
import Tablatures from "./components/Tablatures";
import Birds from "./components/Birds";
import AudioReactive from "./components/AudioReactive";
import { ScrollData } from "./types/scroll";
import { Fog } from "spacesvr";
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
};

export const AltoContext = React.createContext<AltoProps>({} as AltoProps);
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
};

const Alto = (props: Partial<AltoProps>) => {
  const { fbPixel, googleAnalytics } = props;

  const [scrollCount, setScrollCount] = useState(0);

  return (
    <AltoContext.Provider value={{ ...defaultContext, ...props }}>
      <Fog color={new Color("#ffffff")} near={15} far={70} />
      <Preload all />
      <Suspense fallback={null}>
        <Preload all />
        <AltoModel />
        <Grass />
      </Suspense>
      <Sun />
      <Scrolls count={scrollCount} setCount={setScrollCount} />
      {/*<Birds />*/}
      <Tablatures scrolls={scrollCount} />
      {/*<AudioReactive position={[0, 11, 0]} />*/}
      <FBPixel code={fbPixel} />
      <GoogleAnalytics code={googleAnalytics} />
    </AltoContext.Provider>
  );
};

export default Alto;
