import { Text } from "@react-three/drei";
import React from "react";
import SocialLinks from "../../components/SocialLinks";

type Props = {
  socials: string[];
};

const Tablatures = (props: Props) => {
  const { socials } = props;

  const textStyles: Partial<typeof Text.defaultProps> = {
    fontSize: 0.2,
    color: "#554c41",
    maxWidth: 1.3,
    font: "https://d27rt3a60hh1lx.cloudfront.net/content/alto/ohmightyisis.ttf",
    anchorY: "top",
  };

  return (
    <>
      <group
        position={[-1.34, 2.25, 29.28]}
        rotation={[0, Math.PI / 6, 0]}
        name="tablature-left"
      >
        <Text {...textStyles} textAlign="center">
          Welcome to Alto
        </Text>
        <Text
          {...textStyles}
          position-y={-1.8}
          fontSize={0.125}
          textAlign="center"
        >
          Created By Muse • Get Your Own
        </Text>
      </group>
      <group
        position={[1.93, 2.2, 29.26]}
        rotation={[0, -Math.PI / 6, 0]}
        name="tablature-right"
      >
        <group position-y={-0.05}>
          <Text {...textStyles} textAlign="justify">
            Welcome to Alto
          </Text>
          <Text
            {...textStyles}
            fontSize={0.113}
            position-y={-0.31}
            textAlign="justify"
          >
            otherwise known as the music venue of the gods. For thousands of
            years, Alto has been only accessible to immortal beings, but you
            seem to have found us anyway.. At the top of those stairs, you'll be
            able the first mortal to ever hear Lucid Monday's latest work.
          </Text>
        </group>
        <group position-y={-1.5}>
          <Text {...textStyles} fontSize={0.125} textAlign="center">
            Follow Muse
          </Text>
          <group scale={[1.75, 1.75, 1.75]} position-y={-0.28}>
            <SocialLinks socials={socials} />
          </group>
        </group>
      </group>
    </>
  );
};

export default Tablatures;