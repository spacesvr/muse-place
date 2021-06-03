import * as THREE from "three";
import { BufferGeometry } from "three";

export const createBirdGeometry = (
  birds: number,
  width: number
): BufferGeometry => {
  const triangles = birds * 3;
  const points = triangles * 3;

  const geo = new BufferGeometry();

  // prepare buffers
  const vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
  const birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
  const references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
  const birdVertex = new THREE.BufferAttribute(new Float32Array(points), 1);
  geo.setAttribute("position", vertices);
  geo.setAttribute("birdColor", birdColors);
  geo.setAttribute("reference", references);
  geo.setAttribute("birdVertex", birdVertex);

  // generate vertices
  let v = 0;
  const wingsSpan = 5;
  const pushVerts = (...args: number[]) => {
    for (let i = 0; i < args.length; i++) {
      // @ts-ignore
      vertices.array[v++] = args[i];
    }
  };

  for (let f = 0; f < birds; f++) {
    // Body
    pushVerts(0, -0, -20, 0, 4, -20, 0, 0, 30);

    // Left Wing
    pushVerts(0, 0, -15, -wingsSpan, 0, 0, 0, 0, 15);

    // Right Wing
    pushVerts(0, 0, 15, wingsSpan, 0, 0, 0, 0, -15);
  }

  for (let v = 0; v < triangles * 3; v++) {
    const i = ~~(v / 3);
    const x = (i % width) / width;
    const y = ~~(i / width) / width;

    const c = new THREE.Color(0x444444 + (~~(v / 9) / birds) * 0x666666);

    // @ts-ignore
    birdColors.array[v * 3 + 0] = c.r;
    // @ts-ignore
    birdColors.array[v * 3 + 1] = c.g;
    // @ts-ignore
    birdColors.array[v * 3 + 2] = c.b;

    // @ts-ignore
    references.array[v * 2] = x;
    // @ts-ignore
    references.array[v * 2 + 1] = y;

    // @ts-ignore
    birdVertex.array[v] = v % 9;
  }

  geo.scale(0.2, 0.2, 0.2);

  return geo;
};
