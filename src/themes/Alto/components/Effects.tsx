import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";

const Effects = () => {
  return (
    <Suspense fallback={null}>
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.6}
          height={200}
        />
      </EffectComposer>
    </Suspense>
  );
};

export default Effects;