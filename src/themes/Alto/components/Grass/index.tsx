import * as THREE from "three";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import {
  ShaderMaterial,
  InstancedMesh,
  PlaneBufferGeometry,
  Raycaster,
  Vector3,
} from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { grassFrag, grassUniforms, grassVert } from "./shaders/grass";
import SimplexNoise from "simplex-noise";
import cache1 from "./cache/cache1";
import { useLimiter } from "spacesvr";

const COUNT = 10000;
const MIN_RADIUS = 10;
const MAX_RADIUS = 35;

const useGrassMat = (): ShaderMaterial => {
  const grassTex = useLoader(
    THREE.TextureLoader,
    "https://d27rt3a60hh1lx.cloudfront.net/content/alto/grass.png"
  );

  const limiter = useLimiter(30);

  useFrame(({ clock }) => {
    if (!mat || !limiter.isReady(clock)) return;

    mat.uniforms["globalTime"].value = clock.getElapsedTime();
  });

  const mat = useMemo(() => {
    return new ShaderMaterial({
      uniforms: grassUniforms(grassTex),
      vertexShader: grassVert,
      fragmentShader: grassFrag,
    });
  }, []);

  mat.side = THREE.DoubleSide;

  return mat;
};

const Grass = () => {
  const { scene } = useThree();
  const grassMat = useGrassMat();
  const mesh = useRef<InstancedMesh>();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => new PlaneBufferGeometry(0.5, 0.5), []);
  const [counter, setCounter] = useState(1);
  const simplex = useMemo(() => new SimplexNoise(), []);

  useEffect(() => {
    const terrain = scene.getObjectByName("terrain");
    const generate = false; // set to true and refresh to get a new cached version generated
    const cache = [];
    const parsedCache = JSON.parse(cache1);

    if (!terrain || !mesh.current) {
      setTimeout(() => setCounter(counter + 1), 200);
      return;
    }
    const raycaster = new Raycaster();

    for (let i = 0; i < COUNT; i++) {
      let x, y, z, nx, nz;

      if (generate) {
        // generate position
        const radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
        let theta = Math.random() * Math.PI * 2;

        // between PI_2  +- 0.1 don't spawn
        if (theta > Math.PI / 2 - 0.1 && theta <= Math.PI / 2) {
          theta = Math.PI / 2 - 0.1 - 0.1 * Math.pow(Math.random(), 4);
        } else if (theta < Math.PI / 2 + 0.1 && theta >= Math.PI / 2) {
          theta = Math.PI / 2 + 0.1 + 0.1 * Math.pow(Math.random(), 4);
        }

        // convert to cartesian
        x = radius * Math.cos(theta);
        z = radius * Math.sin(theta);

        // raycast straight down (generation)
        raycaster.ray.origin.set(x, 10, z);
        raycaster.ray.lookAt(new Vector3(x, 0, z));
        const intersects = raycaster.intersectObject(terrain, false);

        if (intersects.length <= 0) {
          continue;
        }

        // get y and normal (generation)
        const p = intersects[0].point;
        y = p.y - 0.2;
        const n = intersects[0].face?.normal.clone() || new Vector3();
        n.transformDirection(terrain.matrixWorld);

        nx = n.x;
        nz = n.z;

        const modX = Math.floor((x / MAX_RADIUS) * 100);
        const modY = Math.floor((y / 10) * 100);
        const modZ = Math.floor((z / MAX_RADIUS) * 100);
        const modNX = Math.floor(n.x * 10);
        const modNZ = Math.floor(n.z * 10);

        cache.push(modX);
        cache.push(modY);
        cache.push(modZ);
        cache.push(modNX);
        cache.push(modNZ);
      } else {
        x = (parsedCache[i * 5] / 100) * 35;
        y = (parsedCache[i * 5 + 1] / 100) * 10 + 0.1;
        z = (parsedCache[i * 5 + 2] / 100) * 35;
        nx = parsedCache[i * 5 + 3] / 10;
        nz = parsedCache[i * 5 + 4] / 10;
      }

      // add randomness
      const scaleY = 1 + 0.7 * simplex.noise3D(x, y, z);
      const scaleX = 1 + 0.2 + Math.random();

      // with coordinates, generate
      dummy.clear();
      dummy.scale.set(scaleX, scaleY, 1);
      dummy.rotation.x = -nx;
      dummy.rotation.z = -nz;
      dummy.rotation.y = Math.random() * Math.PI * 2;
      dummy.position.set(x, y + 0.25, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    if (generate) console.log(cache.toString());
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [mesh, grassMat, counter]);

  return (
    <group>
      <instancedMesh ref={mesh} args={[geo, grassMat, COUNT]} />
    </group>
  );
};

export default Grass;
