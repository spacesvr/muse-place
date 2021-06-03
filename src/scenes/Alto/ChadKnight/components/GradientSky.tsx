// @ts-ignore
import glsl from "glslify";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { ShaderMaterial } from "three";
import * as THREE from "three";
import { useLimiter } from "spacesvr";
import { useSeason } from "../contexts/Seasons";
import { useSpring, animated } from "react-spring/three";
import { Winter, Spring, Summer, Fall } from "./constants/seasonColors";
import { isMobile } from "react-device-detect";

type GradientSky = {
  radius?: number;
} & JSX.IntrinsicElements["group"];

const GradientSky = (props: GradientSky) => {
  const { radius, ...restProps } = props;

  const { activeSeason } = useSeason();
  const { skyColors, mobileSkyColor } = useSpring({
    skyColors:
      activeSeason === "Winter"
        ? Winter.sky
        : activeSeason === "Summer"
        ? Summer.sky
        : activeSeason === "Spring"
        ? Spring.sky
        : Fall.sky,
    mobileSkyColor:
      activeSeason === "Winter"
        ? Winter.mobileSky
        : activeSeason === "Summer"
        ? Summer.mobileSky
        : activeSeason === "Spring"
        ? Spring.mobileSky
        : Fall.mobileSky,
    config: {
      mass: 5,
    },
  });
  const NUM_COLORS = skyColors.get().length;

  const mat = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        radius: { value: radius },
        colors: { value: skyColors.get() },
        num_colors: { value: NUM_COLORS },
        time: { value: 0 },
      },
      vertexShader: `
          varying vec3 absPosition;
          void main() {
            absPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
      `,
      fragmentShader: glsl`
          uniform highp float radius;
          uniform highp float time;
          uniform int num_colors;
          uniform highp float colors[100];
          varying vec3 absPosition;
          
          #pragma glslify: snoise = require(glsl-noise-simplex/3d.glsl) 
            float fsnoise(float val1, float val2, float val3){
              return snoise(vec3(val1,val2,val3));
            }
      
          void main() {
            highp float yCoord = (gl_FragCoord.y / gl_FragCoord.w);
            highp float height = ((absPosition.y + radius) / 2.) / (radius);
            highp float noise1 = snoise((absPosition * 0.01)+ time*0.07);
            highp float noise2 = snoise((absPosition * 0.2)+ time*0.4);
            
            highp float noise = noise1 * 0.8 + noise2 * 0.2;
            
            vec3 color = vec3(colors[0], colors[1], colors[2]);
            for(int i = 3; i < num_colors; i+=3) {
              vec3 thisColor = vec3(colors[i], colors[i+1], colors[i+2]);
              highp float lastPerc = float(i - 1) / float(num_colors);
              highp float thisPerc = float(i) / float(num_colors);
              color = mix(color, thisColor, smoothstep(lastPerc, thisPerc, height + noise * 0.1));
            }
            
            // color *= 1.;
            
            gl_FragColor = vec4( color, 1.0 );
          }
      `,
    });
  }, []);
  mat.side = THREE.DoubleSide;

  const limiter = useLimiter(50);
  useFrame(({ clock }) => {
    if (!limiter.isReady(clock)) return;
    if (mat) {
      mat.uniforms.time.value = clock.getElapsedTime();
      mat.uniforms.colors.value = skyColors.get();
    }
  });

  if (isMobile) {
    return (
      <group {...restProps}>
        <mesh>
          <sphereBufferGeometry args={[radius, 50, 50]} />
          <animated.meshBasicMaterial
            color={mobileSkyColor}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group {...restProps}>
      <mesh material={mat}>
        <sphereBufferGeometry args={[radius, 50, 50]} />
      </mesh>
    </group>
  );
};

export default GradientSky;
