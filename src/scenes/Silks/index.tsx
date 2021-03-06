import { Suspense, useState } from "react";
import { StandardEnvironment } from "spacesvr";
import SilksModel from "./models/SilksModel";
import Gallery from "./components/Gallery";
import Cart from "./components/Cart";
import Kiosks from "./components/Kiosks";
import Renderer from "./components/Renderer";
import ValPerre from "./characters/ValPerre";
import MusicVideo from "./components/MusicVideo";
import { createContext } from "react";
import Lighting from "./components/Lighting";
import { ShopState } from "./types/shop";
import { useShopifyShop } from "./utils/shopify";
import Michael from "./characters/Michael";
import EmailCollection from "./overlays/EmailCollection";
import Guide from "./components/Guide";
import { Preload } from "@react-three/drei";

export const ShopContext = createContext<ShopState>({} as ShopState);

type SilksState = { giveCode: boolean; setGiveCode: (b: boolean) => void };
export const SilksContext = createContext<SilksState>({} as SilksState);

const Silks = () => {
  const shop = useShopifyShop({
    domain: "silks-by-vp.myshopify.com",
    storefrontAccessToken: "0ee16eee5ad43db15eaf55d74aee5c98",
  });

  const [giveCode, setGiveCode] = useState(false);

  console.log(shop);

  return (
    <StandardEnvironment
      playerProps={{
        pos: [4.6, 1, -1.9],
        rot: Math.PI / 2,
        speed: 2,
        controls: { disableGyro: true },
      }}
    >
      <ShopContext.Provider value={shop}>
        <SilksContext.Provider value={{ giveCode, setGiveCode }}>
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
          <Guide />
          <EmailCollection />
          {/*<Perf />*/}
        </SilksContext.Provider>
      </ShopContext.Provider>
    </StandardEnvironment>
  );
};

export default Silks;
