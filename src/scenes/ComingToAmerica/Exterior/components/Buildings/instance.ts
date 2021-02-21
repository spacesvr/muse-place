import { Object3D } from "three";

/******
 *                      N  barbershop
 *                      ^ /
 *                      •
 *
 *              W <     •      > E
 *                       \
 *                        user/spawn
 *                      v
 *                      S
 */

// transforms that need to be applied to all instances
const initialObject = () => {
  const SCALE = 0.315;
  const obj = new Object3D();
  obj.scale.set(SCALE, -SCALE, -SCALE);
  obj.updateMatrix();
  return obj;
};

export const INSTANCE_DATA: (() => Object3D)[] = [
  // beside barbershop west
  () => {
    const obj = initialObject();
    faceSouth(obj);
    obj.position.set(-9, 0, 0);
    return obj;
  },
  // beside barbershop east
  () => {
    const obj = initialObject();
    faceSouth(obj);
    obj.position.set(10.1, 0, 0);
    return obj;
  },
  // west of barbershop 1
  () => {
    const obj = initialObject();
    flip(obj);
    obj.position.set(-19, 0, 1);
    return obj;
  },
  // west of barbershop 2
  () => {
    const obj = initialObject();
    obj.position.set(-19, 0, 10.35);
    return obj;
  },
  // opposite barbershop 1
  () => {
    const obj = initialObject();
    faceNorth(obj);
    obj.position.set(0, 0.1, 10.25);
    return obj;
  },
  // opposite barbershop 2
  () => {
    const obj = initialObject();
    faceNorth(obj);
    obj.position.set(-9.5, 0.1, 10.25);
    return obj;
  },
  // opposite barbershop 3
  () => {
    const obj = initialObject();
    faceNorth(obj);
    obj.position.set(9.6, 0.1, 10.25);
    return obj;
  },
  // east of barbershop 1
  () => {
    const obj = initialObject();
    faceWest(obj);
    obj.position.set(19, 0, 1);
    return obj;
  },
  // east of barbershop 2
  () => {
    const obj = initialObject();
    faceWest(obj);
    obj.position.set(19, 0, 10.75);
    return obj;
  },
];

// flips building to face the other way
const flip = (obj: Object3D) => {
  obj.scale.z *= -1;
  obj.updateMatrix();
};

const faceNorth = (obj: Object3D) => {
  obj.rotation.y = Math.PI / 2;
  obj.updateMatrix();
};
const faceSouth = (obj: Object3D) => {
  obj.rotation.y = -Math.PI / 2;
  obj.updateMatrix();
};
const faceEast = (obj: Object3D) => {
  obj.updateMatrix();
};
const faceWest = (obj: Object3D) => {
  obj.rotation.y = Math.PI;
  obj.updateMatrix();
};
