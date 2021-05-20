import { Suspense, useEffect, useState } from "react";
import {
  InfinitePlane,
  StandardEnvironment,
  useEnvironment,
  usePlayer,
} from "spacesvr";
import { Preload, Sky } from "@react-three/drei";
import Musehq from "./models/Musehq";
import AmbientParticles from "./components/AmbientParticles";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { VisualIdea } from "./components/VisualIdea";
import Builder00 from "./characters/Builder00";
import { IdentityLayer } from "./layers/identity";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function MuseHQ() {
  return (
    <StandardEnvironment
      playerProps={{
        speed: 1.65,
        pos: [-19.748, 9, -2.1],
        rot: -Math.PI / 2,
      }}
      canvasProps={{
        camera: { far: 300 },
        dpr: 1,
        gl: { antialias: false },
      }}
    >
      <IdentityLayer>
        <InfinitePlane height={6} />
        <Sky
          turbidity={20}
          rayleigh={4}
          mieCoefficient={0}
          mieDirectionalG={1}
          inclination={0.114}
          azimuth={0.32}
          sunPosition={[0, 1, 0]}
          distance={300}
        />
        <Preload all />
        <ambientLight intensity={2} />
        <AmbientParticles position={[-4 - 7.09, 6, -3 - 3.19]} />
        <Suspense fallback={null}>
          <Preload all />
          <Musehq />
        </Suspense>
        <VisualIdea name="saas-0" size={0.4} position={[-0.16, 6.85, -3.95]} />
        <VisualIdea
          name="saas-1"
          size={0.15}
          position={[11.82 - 7.09, 6.9, 1.61 - 3.19]}
          utility={0.9}
        />
        <VisualIdea
          name="saas-2"
          size={0.6}
          position={[6.93 - 7.09, 6.85, 4 - 3.19]}
        />
        <Builder00 />
        {/*<EffectComposer autoClear multisampling={0}>*/}
        {/*  <Bloom*/}
        {/*    luminanceThreshold={0.25}*/}
        {/*    luminanceSmoothing={0.9}*/}
        {/*    intensity={0.5}*/}
        {/*    height={300}*/}
        {/*  />*/}
        {/*</EffectComposer>*/}
      </IdentityLayer>
    </StandardEnvironment>
  );
}
