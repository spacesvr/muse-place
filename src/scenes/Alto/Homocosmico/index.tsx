import { Floating, Image } from "spacesvr";

const NUM_IMAGES = 30;
const RADIUS = 32;
const GAP = 0.2;
const FOLDER = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/homocosmico`;

function Images() {
  const urls = new Array(NUM_IMAGES)
    .fill("")
    .map((_, ind) => `${FOLDER}/dreams/Dream N°${ind + 1}.jpg`);

  console.log(urls);

  const rot = (ind: number) =>
    (Math.PI * 2 - GAP) * (ind / NUM_IMAGES) - Math.PI + GAP;

  return (
    <group>
      {urls.map((url, ind) => (
        <group rotation-y={rot(ind)}>
          <group position={[0, 1.5, -RADIUS]}>
            <Floating>
              <Image src={url} size={2} framed />
            </Floating>
          </group>
        </group>
      ))}
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
