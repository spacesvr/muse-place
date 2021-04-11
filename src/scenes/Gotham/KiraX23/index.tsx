import { Suspense, useMemo } from "react";
import KiraHead from "./KiraHead";
import { Floating, Image, Text, Video, Interactable } from "spacesvr";
import { MeshStandardMaterial } from "three";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

const KiraX23 = () => {
  const glowMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: 0x2db6bd,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const planet =
    "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/PLANETX23.png";
  const planetTex = useLoader(THREE.TextureLoader, planet);

  const handlePlanetX = () => {
    window.location.href = "/kirax23/alto";
  };

  // @ts-ignore
  return (
    <group>
      <Floating>
        <Suspense fallback={null}>
          <KiraHead position={[-1, -5, -13]} />
        </Suspense>
      </Floating>
      <mesh position={[-5.48, 1.25, 4.2]} rotation-y={Math.PI / 2}>
        <planeBufferGeometry args={[16.5, 3, 60, 30]} />
        <meshStandardMaterial
          color={0x00ff00}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[2.49, 1.25, 4.2]} rotation-y={Math.PI / 2}>
        <planeBufferGeometry args={[16.5, 3, 60, 30]} />
        <meshStandardMaterial
          color={0x00ff00}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      <group
        position={[-2, 2.5, 4]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[17, 15, 1]}
      >
        <mesh>
          <planeBufferGeometry args={[1, 1, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      <Interactable onClick={handlePlanetX}>
        <group
          position={[2.48, 1.25, 4.1]}
          rotation-y={-Math.PI / 2}
          scale={[5, 5, 5]}
        >
          <mesh>
            <planeBufferGeometry args={[1, 0.15]} />
            <meshStandardMaterial map={planetTex} opacity={1} transparent />
          </mesh>
        </group>
      </Interactable>
      <group
        position={[-5.46, 1, 8]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.5, 0.5, 1]}
      >
        <Image
          src="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/QRCODE1.png"
          size={1.5}
          position-x={-3}
          framed
        />
        <Image
          src="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/QRCODE2.png"
          size={1.5}
          position-x={15}
          framed
        />
      </group>
      <group scale={[5, 5, 5]}>
        <group position={[-1.16, 0.3, 1]} rotation={[0, Math.PI / 2, 0]}>
          <group scale={[1.001, 1.03, 1.001]}>
            <Text
              text={"KIRA-X23"}
              size={1.15}
              material={glowMaterial}
              position={[0, 0, -0.019]}
              font="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/ethnocentric.json"
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default KiraX23;
