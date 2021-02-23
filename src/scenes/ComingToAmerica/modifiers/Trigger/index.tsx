import { ReactNode, useLayoutEffect, useRef } from "react";
import { Interactable, useLimiter } from "spacesvr";
import { Group, Material, Mesh } from "three";
import { uniforms, frag, vert } from "./shaders/trigger";
import { useFrame } from "react-three-fiber";
import { useSpring } from "react-spring";
import { getSpringValues } from "../../../Silks/utils/spring";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

const Trigger = (props: Props) => {
  const { children, onClick } = props;

  const group = useRef<Group>();
  const matRef = useRef<Material>();

  const limiter = useLimiter(30);
  const [spring, setSpring] = useSpring(() => ({
    g: [0],
  }));

  useLayoutEffect(() => {
    if (!group.current || !(group.current?.children[0] as Mesh).material) {
      return;
    }

    const mesh = group.current?.children[0] as Mesh;
    const material = (mesh.material as Material).clone();

    material.onBeforeCompile = function (shader) {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.glow = { value: 0 };

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
  }, [frag]);

  useFrame(({ clock }) => {
    if (!group.current || !limiter.isReady(clock)) {
      return;
    }

    if (matRef?.current?.userData?.shader?.uniforms?.time) {
      const [g] = getSpringValues(spring);

      matRef.current.userData.shader.uniforms.time.value = clock.getElapsedTime();
      matRef.current.userData.shader.uniforms.glow.value = g;
    }
  });

  return (
    <Interactable
      onHover={() => setSpring({ g: [1] })}
      onUnHover={() => setSpring({ g: [0] })}
    >
      <group ref={group}>{children}</group>
    </Interactable>
  );
};

export default Trigger;