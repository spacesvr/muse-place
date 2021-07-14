import { RoundedBox, Text } from "@react-three/drei";
import Product from "./Product";
import { RangeTool } from "../../../modifiers/RangeTool";
import { useContext } from "react";
import { ShopContext } from "../../../index";
import { useEnvironment } from "spacesvr";

const FONT_FILE =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

export default function CartView() {
  const { device } = useEnvironment();

  const { cart } = useContext(ShopContext);

  const subtotal = cart.items.reduce(
    // @ts-ignore
    (acc, it) => acc + it.quantity * it.variant.price,
    0
  );

  return (
    <group name="cart-view">
      <RangeTool pos={[0, 0]} distance={6} onExit={() => cart.close()}>
        <pointLight position={[0, 0, 1]} distance={0.4} />
        <RoundedBox
          args={[20, 20, 0.5]}
          radius={0.25}
          smoothness={4}
          position-z={-4}
        >
          <meshStandardMaterial transparent opacity={0.95} />
        </RoundedBox>
        {cart.items.map((item, i) => (
          <Product
            item={item}
            position-x={(-(cart.items.length - 1) / 2 + i) * 6.5}
          />
        ))}
        {cart.count === 0 && (
          <Text
            font={FONT_FILE}
            color="black"
            textAlign="center"
            maxWidth={12}
            fontSize={1}
          >
            Your cart is empty
          </Text>
        )}
        {cart.count !== 0 && (
          <Text
            font={FONT_FILE}
            color="black"
            textAlign="center"
            maxWidth={18}
            fontSize={0.9}
            position-y={-7}
            position-z={-3}
          >
            {`Subtotal: $${subtotal.toString()}`}
          </Text>
        )}
        <Text
          font={FONT_FILE}
          color="#666"
          textAlign="center"
          maxWidth={18}
          fontSize={0.75}
          position-y={-8.5}
          position-z={-3}
          lineHeight={0.89}
        >
          {(device.mobile
            ? "tap the cart or look away to close"
            : "press c or look away to close") +
            "\n" +
            (device.mobile
              ? "tap the register to check out"
              : "click the register to check out")}
        </Text>
      </RangeTool>
    </group>
  );
}
