import { GroupProps, useFrame } from "react-three-fiber";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Floating } from "spacesvr";
import Control from "./components/Control";
import { useBox } from "@react-three/cannon";
import { Group, Vector3 } from "three";
import Images from "./components/Images";
import Description from "./components/Description";
import { Product, ShopState } from "../../types/shop";
import { ShopContext } from "../../index";

type Props = {
  children: ReactNode;
  productId?: string;
} & GroupProps;

type KioskContext = {
  productId?: string;
  product?: Product;
  open: boolean;
};

const DEPTH = 0.75;
const WIDTH = 0.6;

export const KioskContext = createContext<KioskContext>({} as KioskContext);

const Kiosk = (props: Props) => {
  const { children, productId } = props;

  const group = useRef<Group>();
  const [open, setOpen] = useState(false);
  const { current: pos } = useRef(new Vector3(100, 100, 100));
  const { products } = useContext(ShopContext);

  useFrame(({ camera }) => {
    if (group.current && camera.position.distanceTo(pos) < 1.5) {
      setOpen(true);
    } else if (open) {
      setOpen(false);
    }
  });

  const product = products.find((prod) => prod.id === productId);

  return (
    <group name="kiosk" {...props} ref={group}>
      <mesh position-y={-3 / 2 + 0.025}>
        <boxBufferGeometry args={[WIDTH, 3, DEPTH]} />
        <meshStandardMaterial color={0x464646} />
      </mesh>
      <KioskContext.Provider value={{ productId, product, open }}>
        <group position-y={0.4}>
          <Floating height={0.05} speed={2}>
            {children}
          </Floating>
        </group>
        <Control width={WIDTH} position-z={DEPTH / 2 - 0.05} />
        <Images position={[-WIDTH / 2 - 0.05, 0.5, DEPTH / 4]} />
        <Description position={[WIDTH / 2 + 0.15, 0.25, DEPTH / 4]} />
      </KioskContext.Provider>
    </group>
  );
};

export default Kiosk;
