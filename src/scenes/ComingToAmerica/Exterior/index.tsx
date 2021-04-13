import { Suspense } from "react";
import { Audio, HDRI, StandardEnvironment } from "spacesvr";
import Sidewalk from "./models/Sidewalk";
import { Vector3 } from "three";
import Buildings from "./components/Buildings";
import MobileOnboarding from "../components/MobileOnboarding";
import AmazonContainer from "../components/AmazonContainer";
import PauseMenu from "../components/PauseMenu";
import EnterBarbershop from "./components/EnterBarbershop";
import MyTSharpTrigger from "../overlays/MyTSharpTrigger";
import BarbershopSignTrigger from "../overlays/BarbershopSignTrigger";
import PhotoBoothTrigger from "../overlays/PhotoBoothTrigger";
import Renderer from "../components/Renderer";

const ComingAmerica = () => {
  return (
    <AmazonContainer>
      <StandardEnvironment
        pauseMenu={<PauseMenu />}
        playerProps={{
          pos: [-1.315, 1.7, 5.58],
          rot: -Math.PI / 2,
          speed: 2,
        }}
        disableGround
      >
        <MobileOnboarding />
        <EnterBarbershop />
        <MyTSharpTrigger />
        <BarbershopSignTrigger />
        <PhotoBoothTrigger />
        <Suspense fallback={null}>
          <Sidewalk />
        </Suspense>
        <pointLight position={[0, 20, 0]} intensity={0.2} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Buildings />
        </Suspense>
        <Audio
          url="https://d27rt3a60hh1lx.cloudfront.net/content/c2a/audio/queens-audio.mp3"
          position={[0, 10, 0]}
        />
        <HDRI src="https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp/Hazy_Afternoon_HDR_full.hdr" />
        <Renderer />
      </StandardEnvironment>
    </AmazonContainer>
  );
};

export default ComingAmerica;
