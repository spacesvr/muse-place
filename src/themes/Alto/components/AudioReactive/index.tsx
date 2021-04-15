import { Suspense, useContext, useEffect, useRef } from "react";
import { Audio } from "spacesvr";
import { Vector3, Group } from "three";
import Distort from "../Distort";
import { Shadow, useAnimations, useGLTF } from "@react-three/drei";
import { AltoContext } from "../../index";
import { AltoSceneState } from "../../../../scenes/Alto";
import { GroupProps } from "react-three-fiber";

/**
 * Audio Reactive component. Will slowly rotate and sway model
 * if there is no audio.
 * @param props
 * @constructor
 */
const AudioReactive = (props: GroupProps) => {
  const { aa, setAA } = useContext(AltoSceneState);
  const { audio, model } = useContext(AltoContext);
  const { url, scale } = model;

  return (
    <group {...props}>
      {audio && (
        <Audio
          url={audio}
          setAudioAnalyser={setAA}
          position={new Vector3(0, 11, 0)}
        />
      )}
      <Suspense fallback={null}>
        <group position-y={-3}>
          <Distort aa={aa}>
            <group scale={[scale, scale, scale]}>
              <GeneralModel url={url} />
            </group>
          </Distort>
        </group>
        <group position-y={-5.22} rotation-x={-Math.PI / 2} scale={[2, 2, 1]}>
          {/* @ts-ignore */}
          <Shadow opacity={0.5} />
        </group>
      </Suspense>
    </group>
  );
};

export default AudioReactive;

const GeneralModel = (props: { url: string }) => {
  const { url } = props;
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
};
