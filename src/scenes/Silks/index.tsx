import { Suspense } from "react";
import { StandardEnvironment } from "spacesvr";
import SilksModel from "./models/SilksModel";
import { Vector3 } from "three";
import Gallery from "./components/Gallery";
import Cart from "./components/Cart";
import { Perf } from "r3f-perf";
import Kiosks from "./components/Kiosks";
import Renderer from "./components/Renderer";
import ValPerre from "./characters/ValPerre";
import MusicVideo from "./components/MusicVideo";
import { createContext } from "react";
import Lighting from "./components/Lighting";
import { ShopState } from "./types/shop";
import { useShopifyShop } from "./utils/shopify";
import Michael from "./characters/Michael";
import MobileOnboarding from "./overlays/MobileOnboarding";
import Guide from "./components/Guide";
import { Preload } from "@react-three/drei";

export const ShopContext = createContext<ShopState>({} as ShopState);

const Silks = () => {
  const shop = useShopifyShop({
    domain: "silks-by-vp.myshopify.com",
    storefrontAccessToken: "0ee16eee5ad43db15eaf55d74aee5c98",
  });

  return (
    <StandardEnvironment
      playerProps={{
        pos: [4.6, 1, -1.9],
        rot: Math.PI,
        speed: 1.3,
        controls: { disableGyro: true },
      }}
    >
      <ShopContext.Provider value={shop}>
        <Preload all />
        <Cart />
        <Gallery />
        <MusicVideo />
        <Lighting />
        <Suspense fallback={null}>
          <Preload all />
          <SilksModel />
        </Suspense>
        <Suspense fallback={null}>
          <Preload all />
          <ValPerre />
          <Michael />
        </Suspense>
        <Kiosks />
        <Renderer />
        <MobileOnboarding />
        <Guide />
        {/*<Perf />*/}
      </ShopContext.Provider>
    </StandardEnvironment>
  );
};

export default Silks;
