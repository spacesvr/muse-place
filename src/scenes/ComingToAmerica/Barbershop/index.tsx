import { Suspense } from "react";
import { StandardEnvironment } from "spacesvr";
import { Sky } from "@react-three/drei";
import Barbershop from "./models/Barbershop";
import Mirror from "./components/Mirror";
import { Vector3 } from "three";
import MobileOnboarding from "../components/MobileOnboarding";
import BTSTrigger from "../overlays/BTSTrigger";
import FullscreenVideoTrigger from "../overlays/FullscreenVideoTrigger";
import AmazonContainer from "../components/AmazonContainer";
import PauseMenu from "../components/PauseMenu";
import { Perf } from "r3f-perf";
import PhotoBoothTrigger from "../overlays/PhotoBoothTrigger";
import Renderer from "../components/Renderer";
import CastConvoTrigger from "../overlays/CastConvoTrigger";
import UomaTrigger from "../overlays/UomaTrigger";
import HairstyleTrigger from "../overlays/HairstyleTrigger";
import GiveawayTrigger from "../overlays/GiveawayTrigger";
import DefJamTrigger from "../overlays/DefJamTrigger";
import LeaveBarbershop from "./components/LeaveBarbershop";
import HstryTrigger from "../overlays/HstryTrigger";
import AMUTrigger from "../overlays/AMUTrigger";

const BarbershopScene = () => {
  return (
    <AmazonContainer>
      <StandardEnvironment
        pauseMenu={<PauseMenu />}
        playerProps={{ pos: [1.276, 1.1, 2.543], speed: 0.9, rot: -2 }}
      >
        <MobileOnboarding />
        <BTSTrigger />
        <PhotoBoothTrigger />
        <FullscreenVideoTrigger />
        <CastConvoTrigger />
        <UomaTrigger />
        <HairstyleTrigger />
        <GiveawayTrigger />
        <DefJamTrigger />
        <LeaveBarbershop />
        <HstryTrigger />
        <AMUTrigger />
        <Sky />
        <Suspense fallback={null}>
          <Barbershop />
        </Suspense>
        <Suspense fallback={null}>
          <Mirror />
        </Suspense>
        <ambientLight />
        {/*<Perf />*/}
        <Renderer />
      </StandardEnvironment>
    </AmazonContainer>
  );
};

export default BarbershopScene;
