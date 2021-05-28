import { Suspense } from "react";
import { StandardEnvironment, Audio } from "spacesvr";
import { Preload } from "@react-three/drei";
import Musehq from "./models/Musehq";
import AmbientParticles from "./components/AmbientParticles";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { VisualIdea } from "./components/VisualIdea";
import Builder00 from "./characters/Builder00";
import Builder07 from "./characters/Builder07";
import Builder0102 from "./characters/Builder0102";
import { IdentityLayer } from "./layers/identity";
import { Vector3 } from "three";
import Environment from "./components/Environment";

export default function MuseHQ() {
  return (
    <StandardEnvironment
      playerProps={{
        speed: 1.65,
        pos: [-19.748, 0, -2.1],
        rot: -Math.PI / 2,
      }}
      canvasProps={{
        camera: { far: 300 },
        dpr: 1,
        gl: { antialias: false },
      }}
      dev={process.env.NODE_ENV === "development"}
    >
      <IdentityLayer>
        <Preload all />
        <ambientLight intensity={2} />
        <AmbientParticles position={[-4 - 7.09, 0, -3 - 3.19]} />
        <Suspense fallback={null}>
          <Preload all />
          <Musehq position-y={-6} />
        </Suspense>
        <group name="source" position={[-2.51, 1.76, -1.87]}>
          <VisualIdea name="saas-1" size={1.35} utility={0.9} />
          <Audio
            url="https://d27rt3a60hh1lx.cloudfront.net/audio/nocopyright-lofi-muse.mp3"
            rollOff={0.7}
            volume={1.6}
            dCone={new Vector3(360, 360, 0)}
          />
          {/*<Environment />*/}
        </group>
        <Builder00 />
        <Builder07 />
        <Builder0102 />
        {/*<EffectComposer autoClear multisampling={0}>*/}
        {/*  <Bloom*/}
        {/*    luminanceThreshold={0.25}*/}
        {/*    luminanceSmoothing={0.9}*/}
        {/*    intensity={0.9}*/}
        {/*    height={300}*/}
        {/*  />*/}
        {/*</EffectComposer>*/}
      </IdentityLayer>
    </StandardEnvironment>
  );
}
