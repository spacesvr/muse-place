import { Floating, Image } from "spacesvr";
import { Text } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Artwork from "./components/Artwork";
// @ts-ignore
import { texts } from "./constants/texts";

const NUM_IMAGES = 30;
const RADIUS = 32;
const GAP = 0.2;
const FOLDER = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/homocosmico`;

function Images() {
  const insideUrls = new Array(4)
    .fill("")
    .map((_, ind) => `${FOLDER}/dreams2/Dream N°${ind + 1}-min.jpg`);
  const middleUrls = new Array(6)
    .fill("")
    .map((_, ind) => `${FOLDER}/dreams2/Dream N°${ind + 5}-min.jpg`);
  const outsideUrls = new Array(20)
    .fill("")
    .map((_, ind) => `${FOLDER}/dreams2/Dream N°${ind + 11}-min.jpg`);

  const insideRot = (ind: number) =>
    (Math.PI * 2 - GAP) * (ind / 5) - Math.PI + GAP;
  const middleRot = (ind: number) =>
    (Math.PI * 2 - GAP) * (ind / 7) - Math.PI + GAP;
  const outsideRot = (ind: number) =>
    (Math.PI * 2 - GAP) * (ind / 21) - Math.PI + GAP;

  return (
    <group>
      {insideUrls.map((url, ind) => (
        <group rotation-y={insideRot(ind + 1)} key={ind}>
          <group position={[0, 7.5, -3]}>
            <group position-x={1.35}>
              <Text
                anchorX="center"
                anchorY="middle"
                maxWidth={0.9}
                fontSize={0.075}
                color="black"
                animations={[]}
              >
                {texts[ind]}
              </Text>
            </group>
            <Image src={url} size={2} />
          </group>
        </group>
      ))}
      {middleUrls.map((url, ind) => (
        <group rotation-y={-middleRot(ind + 1)} key={ind + 4}>
          <group rotation-y={-Math.PI} position={[0, 5.5, -12]}>
            <group position-x={1.355}>
              <Text
                anchorX="center"
                anchorY="middle"
                maxWidth={0.9}
                fontSize={0.075}
                color="black"
                animations={[]}
              >
                {texts[ind + 4]}
              </Text>
            </group>
            <Image src={url} size={2} />
          </group>
        </group>
      ))}
      {outsideUrls.map((url, ind) => (
        <group rotation-y={outsideRot(ind + 1)} key={ind + 10}>
          <group position={[0, 1.5, -RADIUS]}>
            <group position-x={1.35}>
              <Text
                anchorX="center"
                anchorY="middle"
                maxWidth={0.9}
                fontSize={0.075}
                color="black"
                animations={[]}
              >
                {texts[ind + 10]}
              </Text>
            </group>
            <Image src={url} size={2} />
          </group>
        </group>
      ))}
      <group rotation-y={Math.PI / 2 - 0.105}>
        <Artwork count={20} />
      </group>
      <group rotation-y={Math.PI / 4 - 0.05}>
        <Artwork count={6} />
      </group>
      <group rotation-y={Math.PI / 6 - 0.075}>
        <Artwork count={4} />
      </group>
      {/*<Perf />*/}
    </group>
  );
}

export default function Homocosmico() {
  return (
    <group name="homocosmico">
      <Images />
    </group>
  );
}
