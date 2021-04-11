import { Audio, Fog, StandardEnvironment } from "spacesvr";
import { Sky, Stars } from "@react-three/drei";

import Buildings from "themes/Gotham/components/Buildings";
import Gotham, { GothamProps } from "themes/Gotham";
import { Color, Vector3 } from "three";

type CodameProps = {
  socialLinks: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    web?: string;
  };
  audio?: string;
  night?: boolean;
} & GothamProps;

export default function Codame(props: CodameProps) {
  const { artwork, socialLinks, night, name, audio } = props;

  const socials = [];
  if (socialLinks.instagram) socials.push(socialLinks.instagram);
  if (socialLinks.twitter) socials.push(socialLinks.twitter);
  if (socialLinks.web) socials.push(socialLinks.web);
  if (socialLinks.spotify) socials.push(socialLinks.spotify);

  return (
    <StandardEnvironment
      canvasProps={{ camera: { far: 200 } }}
      player={{ pos: new Vector3(-3.4, 1, 4.9), rot: Math.PI, speed: 1.7 }}
    >
      {!night && <Sky inclination={1} distance={night ? 0 : 1000000} />}
      {night && <Stars count={5000} factor={100000} radius={5000000} fade />}
      {audio && (
        <Audio url={audio} position={new Vector3(-6, 1, 2.5)} volume={1.2} />
      )}
      <Fog
        color={new Color(night ? "#000000" : "#ececf4")}
        near={20}
        far={200}
      />
      <Buildings fogColor={night ? "#000000" : "#ececf4"} />
      <Gotham name={name} socials={socials} artwork={artwork} />
    </StandardEnvironment>
  );
}
