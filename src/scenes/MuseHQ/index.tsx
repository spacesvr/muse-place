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
        <VisualIdea name="saas-0" size={0.4} position={[-0.16, 0.85, -3.95]} />
        <VisualIdea
          name="saas-1"
          size={0.15}
          position={[11.82 - 7.09, 0.9, 1.61 - 3.19]}
          utility={0.9}
        />
        <VisualIdea
          name="saas-2"
          size={0.6}
          position={[6.93 - 7.09, 0.85, 4 - 3.19]}
        />
        <Builder00 />
        <EffectComposer autoClear multisampling={0}>
          <Bloom
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            intensity={0.5}
            height={300}
          />
        </EffectComposer>
      </IdentityLayer>
    </StandardEnvironment>
  );
}
