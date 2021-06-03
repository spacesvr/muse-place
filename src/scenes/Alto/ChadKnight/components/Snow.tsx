import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLimiter } from "spacesvr";
import { useSeason } from "../contexts/Seasons";
import { useSpring } from "react-spring/three";
import { isMobile } from "react-device-detect";

function drawRadialGradation(
  ctx: CanvasRenderingContext2D | null,
  canvasRadius: number,
  canvasW: number,
  canvasH: number
) {
  if (!ctx) return;
  ctx.save();
  const gradient = ctx.createRadialGradient(
    canvasRadius,
    canvasRadius,
    0,
    canvasRadius,
    canvasRadius,
    canvasRadius
  );
  gradient.addColorStop(0, "rgba(255,255,255,1.0)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasW, canvasH);
  ctx.restore();
}

function getTexture() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const diameter = 64.0;
  canvas.width = diameter;
  canvas.height = diameter;
  const canvasRadius = diameter / 2;

  /* gradation circle
  ------------------------ */
  drawRadialGradation(ctx, canvasRadius, canvas.width, canvas.height);

  /* snow crystal
  ------------------------ */
  const texture = new THREE.Texture(canvas);
  texture.type = THREE.FloatType;
  texture.needsUpdate = true;
  return texture;
}

export default function Snow(props: {
  particleNum?: number;
  maxRange?: number;
}) {
  const { particleNum = 10000, maxRange = 300 } = props;
  const minRange = maxRange / 2;

  if (isMobile) {
    return <></>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { activeSeason } = useSeason();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const buffer = useRef();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const material = useRef();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { size } = useSpring({
    size: activeSeason === "Winter" ? 2 : 0,
    config: {
      mass: 1,
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const limiter = useLimiter(45);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useFrame(({ clock }) => {
    if (!limiter.isReady(clock) || !buffer.current) return;
    // @ts-ignore
    const posArr = buffer.current.attributes.position.array;
    // @ts-ignore
    const velArr = buffer.current.attributes.velocity.array;

    posArr.forEach((vertex: any, i: number) => {
      const velocity = velArr[i];

      switch (i % 3) {
        case 0:
          posArr[i] +=
            Math.sin(clock.getElapsedTime() * 0.001 * velocity) * 0.1;
          break;
        case 1:
          posArr[i] += velocity;
          if (posArr[i] < -minRange) {
            posArr[i] = minRange;
          }
          break;
        case 2:
          posArr[i] +=
            Math.sin(clock.getElapsedTime() * 0.0015 * velocity) * 0.1;
          break;
        default:
          break;
      }
    });
    // @ts-ignore
    buffer.current.attributes.position.needsUpdate = true;
    if (material.current) {
      // @ts-ignore
      material.current.size = size.get();
      // @ts-ignore
      material.current.depthFunc = THREE.LessEqualDepth;
    }
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [positions, velocities] = useMemo(() => {
    const positions = [],
      velocities = [];
    for (let i = 0; i < particleNum; i++) {
      positions.push(Math.floor(Math.random() * maxRange - minRange));
      positions.push(Math.floor(Math.random() * maxRange - minRange));
      positions.push(Math.floor(Math.random() * maxRange - minRange));
      velocities.push(Math.floor(Math.random() * 6 - 3) * 0.1);
      velocities.push(Math.floor(Math.random() * 5 + 3) * -0.05);
      velocities.push(Math.floor(Math.random() * 6 - 3) * 0.1);
    }
    return [new Float32Array(positions), new Float32Array(velocities)];
  }, [particleNum]);

  if (activeSeason !== "Winter") return <></>;

  return (
    <group name="snow">
      <points>
        <bufferGeometry ref={buffer}>
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attachObject={["attributes", "velocity"]}
            count={velocities.length / 3}
            array={velocities}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size.get()}
          color="white"
          vertexColors={false}
          map={getTexture()}
          depthWrite={false}
          transparent
          fog
          ref={material}
        />
      </points>
    </group>
  );
}
