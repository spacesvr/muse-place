import { GroupProps, useFrame } from "@react-three/fiber";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image } from "spacesvr";
import Control from "./Control";
import { Group, Vector3 } from "three";
import { Product } from "../../types/shop";
import { ShopContext } from "../../index";

type Props = {
  children?: ReactNode;
  productId?: string;
  productName?: string;
  variationNumber: number;
} & GroupProps;

type KioskContext = {
  productId?: string;
  product?: Product;
  open: boolean;
};

const DEPTH = 0.75;
const WIDTH = 0.25; //changed from 0.6 which is original

export const KioskContext = createContext<KioskContext>({} as KioskContext);

const Kiosk = (props: Props) => {
  const { children, productId, productName, variationNumber } = props;
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

  const images = product?.images || [];
  const visual =
    children || (images[0] && <Image src={images[0]} size={0.4} framed />);

  useEffect(() => {
    if (!product) return;
    product.visual = visual;
  }, [visual]);

  return (
    <group name="kiosk" {...props} ref={group}>
      <KioskContext.Provider value={{ productId, product, open }}>
        <Control
          width={WIDTH}
          position-z={DEPTH / 2 - 0.05}
          productName={productName}
          productId={product?.id}
          visual={visual}
          variation={variationNumber}
        />
      </KioskContext.Provider>
    </group>
  );
};

export default Kiosk;
