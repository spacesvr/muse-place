import * as THREE from "three";
import { DataTexture, WebGLRenderer } from "three";
import { MutableRefObject } from "react";
import {
  GPUComputationRenderer,
  Variable,
} from "three/examples/jsm/misc/GPUComputationRenderer";
import { frag as posFrag, vert as velVert } from "../shaders/physics";

export const isSafari = () =>
  !!navigator.userAgent.match(/Safari/i) &&
  !navigator.userAgent.match(/Chrome/i);

export const fillPositionTexture = (texture: DataTexture, bounds: number) => {
  const theArray = texture.image.data;

  for (let k = 0, kl = theArray.length; k < kl; k += 4) {
    const x = Math.random() * bounds - bounds / 2;
    const y = Math.random() * bounds - bounds / 2;
    const z = Math.random() * bounds - bounds / 2;

    theArray[k + 0] = x;
    theArray[k + 1] = y;
    theArray[k + 2] = z;
    theArray[k + 3] = 1;
  }
};

export const fillVelocityTexture = (texture: DataTexture, bounds: number) => {
  const theArray = texture.image.data;

  for (let k = 0, kl = theArray.length; k < kl; k += 4) {
    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;
    const z = Math.random() - 0.5;

    theArray[k + 0] = x * 10;
    theArray[k + 1] = y * 10;
    theArray[k + 2] = z * 10;
    theArray[k + 3] = 1;
  }
};

export const initComputeRenderer = (
  renderer: WebGLRenderer,
  posVar: MutableRefObject<Variable | undefined>,
  velVar: MutableRefObject<Variable | undefined>,
  bounds: number,
  width: number
): GPUComputationRenderer => {
  const gpucomp = new GPUComputationRenderer(width, width, renderer);

  if (isSafari()) {
    gpucomp.setDataType(THREE.HalfFloatType);
  }

  const dtPosition = gpucomp.createTexture();
  const dtVelocity = gpucomp.createTexture();
  fillPositionTexture(dtPosition, bounds * 20);
  fillVelocityTexture(dtVelocity, bounds);

  velVar.current = gpucomp.addVariable("textureVelocity", velVert, dtVelocity);
  posVar.current = gpucomp.addVariable("texturePosition", posFrag, dtPosition);

  gpucomp.setVariableDependencies(velVar.current, [
    posVar.current,
    velVar.current,
  ]);
  gpucomp.setVariableDependencies(posVar.current, [
    posVar.current,
    velVar.current,
  ]);

  const positionUniforms = posVar.current.material.uniforms;
  const velocityUniforms = velVar.current.material.uniforms;

  positionUniforms["time"] = { value: 0.0 };
  positionUniforms["delta"] = { value: 0.0 };
  velocityUniforms["time"] = { value: 1.0 };
  velocityUniforms["delta"] = { value: 0.0 };
  velocityUniforms["testing"] = { value: 1.0 };
  velocityUniforms["separationDistance"] = { value: 1.0 };
  velocityUniforms["alignmentDistance"] = { value: 1.0 };
  velocityUniforms["cohesionDistance"] = { value: 1.0 };
  velocityUniforms["freedomFactor"] = { value: 1.0 };
  velocityUniforms["predator"] = { value: new THREE.Vector3() };
  velVar.current.material.defines.BOUNDS = bounds.toFixed(2);

  velVar.current.wrapS = THREE.RepeatWrapping;
  velVar.current.wrapT = THREE.RepeatWrapping;
  posVar.current.wrapS = THREE.RepeatWrapping;
  posVar.current.wrapT = THREE.RepeatWrapping;

  const error = gpucomp.init();

  if (error !== null) {
    console.error(error);
  }

  return gpucomp;
};
