import { Text } from "@react-three/drei";
import React, { useContext } from "react";
import SocialLinks from "../../components/SocialLinks";
import SocialButton from "../../components/SocialButton";
import Scroll from "../models/Scroll";
import { Floating } from "spacesvr";
import { AltoContext } from "../index";

type Props = {
  scrolls: number;
};

const Tablatures = (props: Props) => {
  const { scrolls } = props;

  const { socials, font, content, fontSize, scrollData } = useContext(
    AltoContext
  );
  const { landing, name } = content;
  const { title, body } = landing;

  const textStyles: Partial<typeof Text.defaultProps> = {
    fontSize: 0.2 * fontSize,
    color: "#554c41",
    maxWidth: 1.3,
    font,
    anchorY: "top",
  };

  return (
    <>
      <group
        position={[-1.34, 2.25, 29.28]}
        rotation={[0, Math.PI / 6, 0]}
        name="tablature-left"
      >
        <group position-y={-0.05}>
          {/* @ts-ignore */}
          <Text {...textStyles} textAlign="center">
            {title}
          </Text>
          {/* @ts-ignore */}
          <Text
            {...textStyles}
            fontSize={0.113 * fontSize}
            position-y={-0.31}
            textAlign="center"
          >
            {body}
          </Text>
        </group>
        <group position-y={-1.5}>
          {/* @ts-ignore */}
          <Text {...textStyles} fontSize={0.125 * fontSize} textAlign="center">
            {`Follow ${name}`}
          </Text>
          <group scale={[0.4, 0.4, 0.4]} position-y={-0.28}>
            <SocialLinks socials={socials} />
          </group>
        </group>
      </group>
      <group
        position={[1.93, 2.2, 29.26]}
        rotation={[0, -Math.PI / 6, 0]}
        name="tablature-right"
      >
        <group name="collection" position-y={-0.4}>
          <Floating height={0.05} speed={2}>
            <Scroll
              open={false}
              position={[-0.3, -0.3, 0.2]}
              rotation-z={-Math.PI / 2}
              scale={[0.8, 0.8, 0.8]}
            />
          </Floating>
          {/* @ts-ignore */}
          <Text
            {...textStyles}
            fontSize={0.25 * fontSize}
            position={[0.3, -0.1, 0]}
            textAlign="right"
          >
            {scrolls.toString()} / {scrollData.length.toString()}
          </Text>
          {/* @ts-ignore */}
          <Text
            {...textStyles}
            fontSize={0.15 * fontSize}
            position={[0.3, -0.35, 0]}
            textAlign="right"
          >
            found
          </Text>
        </group>
        <group name="muse-credits" position-y={0.1} position-x={0.05}>
          {/* @ts-ignore */}
          <Text
            {...textStyles}
            position={[-0.22, -1.65, 0]}
            fontSize={0.11 * fontSize}
            letterSpacing={0.19}
            textAlign="right"
          >
            Created By Muse
          </Text>
          {/* @ts-ignore */}
          <Text
            {...textStyles}
            position={[-0.22, -1.8, 0]}
            fontSize={0.11 * fontSize}
            letterSpacing={0.19}
            textAlign="right"
          >
            Want Your Own?
          </Text>
          <SocialButton
            link="https://musevr.typeform.com/to/QwGYwJH2"
            position={[0.45, -1.785, 0]}
            scale={[0.6, 0.6, 0.6]}
          />
        </group>
      </group>
    </>
  );
};

export default Tablatures;
