import NftScroll from "./NftScroll";
import { useEffect, useRef } from "react";
import { Audio } from "spacesvr";
import * as THREE from "three";
import { useSeason } from "../../contexts/Seasons";
import { Winter, Spring, Summer, Fall } from "../constants/seasonColors";

const CONTENT =
    "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/chadknight",
  DISTANCE = 45,
  SCALE = 2,
  POSY = -16.5,
  TXTSIZE = 3.5,
  TXTALIGN = "left",
  OFFSET = 3;

export default function NftScrolls() {
  const winter = useRef<THREE.Group>(),
    winterAudio = useRef<THREE.Group>(),
    summer = useRef<THREE.Group>(),
    summerAudio = useRef<THREE.Group>(),
    spring = useRef<THREE.Group>(),
    springAudio = useRef<THREE.Group>(),
    fall = useRef<THREE.Group>(),
    fallAudio = useRef<THREE.Group>();

  const { activeSeason } = useSeason();

  useEffect(() => {
    if (winter.current && summer.current && spring.current && fall.current) {
      winter.current.lookAt(0, winter.current.position.y, 0);
      summer.current.lookAt(0, summer.current.position.y, 0);
      spring.current.lookAt(0, spring.current.position.y, 0);
      fall.current.lookAt(0, fall.current.position.y, 0);
    }
  }, [winter, summer, spring, fall]);

  return (
    <group name="scrolls">
      <group position={[DISTANCE, POSY, DISTANCE]} ref={winter}>
        <NftScroll scale={SCALE} vid={`${CONTENT}/wntrnft.mp4`} />
        <NftScroll
          position-x={OFFSET}
          scale={SCALE}
          text={Winter.poem}
          font={`${CONTENT}/journey.ttf`}
          textSize={TXTSIZE}
          textAlign={TXTALIGN}
          textY={-0.2}
          title="Winter"
          nft="https://niftygateway.com/itemdetail/primary/0x9c7f4e2de0dbae78f69506bf43fb9327192e7102/2"
        />
      </group>
      <group position={[-DISTANCE, POSY, DISTANCE]} ref={spring}>
        <NftScroll scale={SCALE} vid={`${CONTENT}/sprngnft.mp4`} />
        <NftScroll
          position-x={OFFSET}
          scale={SCALE}
          text={Spring.poem}
          font={`${CONTENT}/journey.ttf`}
          textSize={TXTSIZE}
          textAlign={TXTALIGN}
          title="Spring"
          textY={-0.2}
          nft="https://niftygateway.com/itemdetail/primary/0x9c7f4e2de0dbae78f69506bf43fb9327192e7102/4"
        />
      </group>
      <group position={[DISTANCE, POSY - 1, -DISTANCE]} ref={summer}>
        <NftScroll scale={SCALE} vid={`${CONTENT}/smmrnft.mp4`} />
        <NftScroll
          position-x={OFFSET}
          scale={SCALE}
          text={Summer.poem}
          font={`${CONTENT}/journey.ttf`}
          textSize={TXTSIZE}
          textAlign={TXTALIGN}
          title="Summer"
          textY={-0.2}
          nft="https://niftygateway.com/itemdetail/primary/0x9c7f4e2de0dbae78f69506bf43fb9327192e7102/1"
        />
      </group>
      <group position={[-DISTANCE, POSY - 1, -DISTANCE]} ref={fall}>
        <NftScroll scale={SCALE} vid={`${CONTENT}/fllnft.mp4`} />
        <NftScroll
          position-x={OFFSET}
          scale={SCALE}
          text={Fall.poem}
          font={`${CONTENT}/journey.ttf`}
          textSize={TXTSIZE}
          textAlign={TXTALIGN}
          title="Fall"
          textY={-0.2}
          nft="https://niftygateway.com/itemdetail/primary/0x9c7f4e2de0dbae78f69506bf43fb9327192e7102/3"
        />
      </group>
    </group>
  );
}
