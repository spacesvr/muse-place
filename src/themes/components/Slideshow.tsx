import { GroupProps } from "@react-three/fiber";
import { useState } from "react";
import { Video, Image, Arrow, Interactable } from "spacesvr";
import { Text } from "@react-three/drei";
import FacePlayer from "themes/modifiers/FacePlayer";

type SlideshowProps = {
  size?: number;
  face?: boolean;
  links: string[];
  captions?: string[];
  textColor?: string;
  darkArrow?: boolean;
} & GroupProps;

function Media(props: { link: string; size: number } & GroupProps) {
  const { link, size, ...rest } = props;

  // video
  if (link.endsWith("mp4") || link.endsWith("mov")) {
    return (
      <group name="media" {...rest}>
        <Video src={link} size={size} framed />
      </group>
    );
  }

  //image
  return (
    <group name="media" {...rest}>
      <Image src={link} size={size} framed />
    </group>
  );
}

export default function Slideshow(props: SlideshowProps) {
  const {
    size = 1,
    face = false,
    links,
    captions,
    textColor = "white",
    darkArrow = false,
    ...rest
  } = props;

  const [curr, setCurr] = useState(0);

  const next = () =>
    curr === links.length - 1 ? setCurr(0) : setCurr(curr + 1);
  const prev = () =>
    curr === 0 ? setCurr(links.length - 1) : setCurr(curr - 1);

  const Innards = () => {
    return (
      <group name="innards">
        <Media link={links[curr]} size={size * 1.5} position-z={0.001} />
        <group
          name="console"
          position={[0, -size / 2 - 0.1, 0.2]}
          rotation-x={-0.4}
        >
          {captions && (
            <>
              {/* @ts-ignore */}
              <Text fontSize={0.1} position-y={0.15} color={textColor}>
                {captions[curr]}
              </Text>
            </>
          )}
          <Interactable onClick={next}>
            <Arrow
              position-x={0.4}
              scale={[0.7, 0.7, 0.7]}
              rotation-z={Math.PI}
              dark={darkArrow}
            />
          </Interactable>
          <Interactable onClick={prev}>
            <Arrow
              position-x={-0.4}
              scale={[0.7, 0.7, 0.7]}
              rotation-z={0}
              dark={darkArrow}
            />
          </Interactable>
          {/* @ts-ignore */}
          <Text fontSize={0.15} color={textColor}>
            {(curr + 1).toString()} / {links.length.toString()}
          </Text>
        </group>
      </group>
    );
  };

  if (face) {
    return (
      <group name="slideshow" {...rest}>
        <FacePlayer>
          <Innards />
        </FacePlayer>
      </group>
    );
  }

  return (
    <group name="slideshow" {...rest}>
      <Innards />
    </group>
  );
}
