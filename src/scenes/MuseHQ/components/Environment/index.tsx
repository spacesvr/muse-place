import { useMemo, useRef } from "react";
import { Color, Mesh, ShaderMaterial, SphereGeometry } from "three";
import { frag, vert } from "./shaders/idea";

const COUNT = 500;
const BOUND_Y = 100;
const BOUND_R = 100;

export default function Environment() {
  const RADIUS = 4;
  const NOISE_AMPLITUDE = 0.82;
  const NOISE_FREQ = 0.154;

  const mesh = useRef<Mesh>();
  const COLOR = useMemo(() => new Color(), []);
  const geo = useMemo(() => new SphereGeometry(RADIUS, 32, 16), []);

  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          radius: { value: RADIUS },
          time: { value: 0 },
          color: {
            value: COLOR,
          },
          radiusVariationAmplitude: {
            value: NOISE_AMPLITUDE,
          },
          radiusNoiseFrequency: {
            value: NOISE_FREQ,
          },
        },
        vertexShader: vert,
        fragmentShader: frag,
      }),
    []
  );

  return (
    <group name="environment">
      <instancedMesh ref={mesh} args={[geo, mat, COUNT]} />
    </group>
  );
}
