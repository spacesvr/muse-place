/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { AnimationMixer, Bone, Object3D, SkinnedMesh } from "three";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";

type GLTFResult = GLTF & {
  nodes: {
    avatar_1: THREE.SkinnedMesh;
    Hips_bind: THREE.Bone;
    Armature: Object3D;
  };
  materials: {
    ["avatar.mat"]: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | "dance1"
  | "dance2"
  | "idle"
  | "jawdrop"
  | "swing"
  | "trophycase";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/Builder-1620882407/avatar_02.glb.gz";

type ModelProps = {
  animation?: ActionName;
} & GroupProps;

export default function Model(props: ModelProps) {
  const { animation = "idle", ...rest } = props;

  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(FILE_URL) as GLTFResult;

  const scene = useThree((state) => state.scene);
  const [armature, setArmature] = useState<Object3D | undefined>();
  const [rig, setRig] = useState<Bone>();
  const [mixer, setMixer] = useState<AnimationMixer | undefined>();
  const actions = useRef<GLTFActions>();

  // function to dispose of loaded dummy
  const disposeDummy = useCallback(() => {
    if (armature) {
      armature.traverse((obj) => scene.remove(obj));
      setArmature(undefined);
      setRig(undefined);
    }
  }, [armature]);

  useEffect(() => {
    if (!armature) {
      // create new armature
      const newArmature = SkeletonUtils.clone(nodes.Armature) as Object3D;

      //create new mixer
      const avatar = getArmatureChild(newArmature, "avatar") as SkinnedMesh;
      const newMixer = new THREE.AnimationMixer(avatar);

      // store the rig in state because when it is added to the scene
      // the armature loses the child
      const locRig = getArmatureChild(newArmature, "rig") as Bone;
      setRig(locRig);

      // see meshes up close, need this shit bruv
      newArmature.traverse((obj) => (obj.frustumCulled = false));

      // load all actions and play selected one
      // @ts-ignore
      actions.current = animations.reduce((acc, cur) => {
        const name = cur.name as ActionName;
        // @ts-ignore
        acc[name] = newMixer.clipAction(cur, group.current);
        return acc;
      }, {});

      // play the current animation
      // @ts-ignore
      actions.current[animation].play();

      // store into state
      setArmature(newArmature);
      setMixer(newMixer);
    }
  }, [armature]);

  // trigger dummy disposal on props change
  useEffect(() => () => disposeDummy(), [animation]);

  useEffect(() => {
    if (!armature || !actions.current) return;
    actions.current[animation].play();
  }, [animation, armature, actions]);

  // update animation every frame
  useFrame((_, delta) => mixer && mixer.update(delta));

  if (!armature) {
    return null;
  }

  // get armature mesh children
  const avatar = getArmatureChild(armature, "avatar") as SkinnedMesh;

  return (
    <group ref={group} {...rest} dispose={null}>
      <group
        name="Armature"
        rotation-x={Math.PI / 2}
        scale={0.007}
        frustumCulled={false}
      >
        {rig && <primitive object={rig} />}
        {getSkinnedMesh(avatar, materials["avatar.mat"])}
      </group>
    </group>
  );
}

// helper, create explicit skinnedMesh object as react component
const getSkinnedMesh = (object: SkinnedMesh, material: THREE.Material) => {
  return (
    <skinnedMesh
      material={material}
      geometry={object.geometry}
      skeleton={object.skeleton}
      frustumCulled={false}
    />
  );
};

// helper, get one of children from the armature, returns undefined if not found
const getArmatureChild = (armature: Object3D, id: "avatar" | "rig") => {
  switch (id) {
    case "avatar":
      return armature.children.find((ch) => ch.name === "avatar_1");
    case "rig":
      return armature.children.find((ch) => ch.name === "Hips_bind");
  }

  return undefined;
};

useGLTF.preload(FILE_URL);
