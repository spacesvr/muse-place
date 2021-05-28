import { ReactNode, useLayoutEffect, useMemo, useRef } from "react";
// @ts-ignore
import { Interactable, useLimiter } from "spacesvr";
import { Group, Material, MathUtils, Mesh } from "three";
import { uniforms, frag, vert } from "./shaders/trigger";
import { useFrame } from "@react-three/fiber";

type Props = {
  children: ReactNode[];
  onClick?: () => void;
};

const Trigger = (props: Props) => {
  const { children, onClick } = props;

  const group = useRef<Group>();
  const matRef = useRef<Material>();
  const seed = useMemo(
    () => Math.floor(Math.random() * 1000000000) / 1000000000,
    []
  );

  const limiter = useLimiter(45);
  const g = useRef(0);
  const targetG = useRef(0);

  useLayoutEffect(() => {
    if (!group.current || !(group.current?.children[0] as Mesh).material) {
      return;
    }

    const mesh = group.current?.children[0] as Mesh;
    const material = (mesh.material as Material).clone();

    material.onBeforeCompile = function (shader) {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.glow = { value: 0 };
      shader.uniforms.dist = { value: 0 };
      shader.uniforms.seed = { value: seed };

      shader.vertexShader = uniforms + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        vert
      );

      shader.fragmentShader = uniforms + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        frag
      );

      material.userData.shader = shader;
    };

    matRef.current = material;
    mesh.material = material;
    mesh.material.needsUpdate = true;
  }, [uniforms, frag]);

  useFrame(({ clock }, delta) => {
    if (!group.current || !limiter.isReady(clock)) {
      return;
    }

    if (matRef?.current?.userData?.shader?.uniforms?.time) {
      if (g.current !== targetG.current) {
        g.current = MathUtils.lerp(g.current, targetG.current, 10 * delta);
      }

      matRef.current.userData.shader.uniforms.time.value =
        clock.getElapsedTime() * 2.66;
      matRef.current.userData.shader.uniforms.glow.value =
        Math.round(g.current * 10000) / 10000;
    }
  });

  if (!children || !children.length || children.length !== 2) {
    return <>{children}</>;
  }

  return (
    <>
      <group ref={group}>{children[0]}</group>
      <Interactable
        onClick={onClick}
        onHover={() => {
          targetG.current = 1;
        }}
        onUnHover={() => {
          targetG.current = 0;
        }}
      >
        {children[1]}
      </Interactable>
    </>
  );
};

export default Trigger;
