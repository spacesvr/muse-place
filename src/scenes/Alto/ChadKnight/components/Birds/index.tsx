import { vert as birdVert, frag as birdFrag } from "./shaders/bird";
import { Variable } from "three/examples/jsm/misc/GPUComputationRenderer";
import { useContext, useMemo, useRef } from "react";
import * as THREE from "three";
import { createBirdGeometry } from "./core/bird";
import { initComputeRenderer } from "./core/physics";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { AltoSceneState } from "scenes/Alto";
import { useDetectGPU } from "@react-three/drei";
import { useLimiter } from "scenes/Silks/utils/limiter";
import { useSeason } from "../../contexts/Seasons";
import { animated, useSpring } from "react-spring/three";

// general scale: z=350

/* TEXTURE WIDTH FOR SIMULATION */

const effectController = {
  separation: 60,
  alignment: 80,
  cohesion: 70,
  freedom: 0.75,
};

const SCALE = 0.5;

const Birds = (props: { bounds?: number } & GroupProps) => {
  const { bounds = 10, ...restProps } = props;
  const { aa } = useContext(AltoSceneState);
  const { gl, camera } = useThree();

  const posVar = useRef<Variable>();
  const velVar = useRef<Variable>();

  const gpu = useDetectGPU();
  const limiter = useLimiter(45);
  const TIER = gpu?.tier || 0;
  const pow = TIER > 2 ? 4 : 2;
  const WIDTH = Math.pow(2, pow);
  const BIRDS = WIDTH * WIDTH;

  const gpuCompute = useMemo(
    () => initComputeRenderer(gl, posVar, velVar, bounds, WIDTH),
    [bounds, WIDTH, BIRDS]
  );
  const birdMesh = useMemo(() => {
    const geometry = createBirdGeometry(BIRDS, WIDTH);

    const material = new THREE.ShaderMaterial({
      vertexShader: birdVert,
      fragmentShader: birdFrag,
      side: THREE.DoubleSide,
      uniforms: {
        color: { value: new THREE.Color(0xff2200) },
        texturePosition: { value: null },
        textureVelocity: { value: null },
        time: { value: 1.0 },
        delta: { value: 0.0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.PI / 2;
    mesh.matrixAutoUpdate = false;
    mesh.frustumCulled = false;
    mesh.updateMatrix();

    return mesh;
  }, [BIRDS, WIDTH, TIER]);

  const { activeSeason } = useSeason();
  const { size } = useSpring({
    size: activeSeason === "Spring" ? 1 : 0,
    config: {
      mass: 2,
    },
  });

  useFrame(({ clock, mouse }, delta) => {
    if (!gpuCompute || !birdMesh || !posVar.current || !velVar.current) return;
    if (!limiter.isReady(clock)) return;

    const now = clock.getElapsedTime() / 1000;
    const speed = 0.1 + (aa?.getFrequencyData()[20] || 0) * 0.005;

    const posUniforms = posVar.current.material.uniforms;
    const velUniforms = velVar.current.material.uniforms;
    const birdUniforms = birdMesh.material.uniforms;

    // update timing
    posUniforms["time"].value = now;
    posUniforms["delta"].value = delta * speed;
    velUniforms["time"].value = now;
    velUniforms["delta"].value = delta * speed;
    birdUniforms["time"].value = now;
    birdUniforms["delta"].value = delta * speed;

    // update predator position
    const normX = MathUtils.clamp(camera.position.x / bounds, -1, 1);
    const normZ = MathUtils.clamp(camera.position.z / bounds, -1, 1);
    velUniforms["predator"].value.set(normX, -1, normZ);

    // behavior update
    velUniforms["separationDistance"].value = effectController.separation;
    velUniforms["alignmentDistance"].value = effectController.alignment;
    velUniforms["cohesionDistance"].value = effectController.cohesion;
    velUniforms["freedomFactor"].value = effectController.freedom;

    // pass position and velocity computations
    gpuCompute.compute();
    // @ts-ignore
    const posTex = gpuCompute.getCurrentRenderTarget(posVar.current).texture;
    // @ts-ignore
    const velTex = gpuCompute.getCurrentRenderTarget(posVar.current).texture;
    birdUniforms["texturePosition"].value = posTex;
    birdUniforms["textureVelocity"].value = velTex;
  });

  return (
    <group scale={SCALE} position-y={10} {...restProps}>
      <animated.group scale={size}>
        <primitive object={birdMesh} />
      </animated.group>
    </group>
  );
};

export default Birds;
