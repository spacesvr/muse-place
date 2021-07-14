import { GroupProps, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { ReactNode, useContext, useMemo, useState } from "react";
import { ShopContext } from "../../index";
import { Interactable } from "spacesvr";

const HEIGHT = 0.15;
const PADDING_Y = 0.035;
const PADDING_X = 0.02;

const TITLE_FONT = {
  fontSize: 0.025,
  color: "black",
  anchorX: "left",
  textAlign: "left",
};

const SUB_FONT = {
  fontSize: 0.02,
  color: "black",
  anchorY: "top",
  anchorX: "left",
  textAlign: "left",
};

type Props = {
  width: number;
  productName?: string;
  productId?: string;
  visual?: ReactNode;
  variation: number;
} & GroupProps;

const Control = (props: Props) => {
  const {
    width,
    productName,
    productId,
    visual,
    variation,
    ...restProps
  } = props;

  const WIDTH = width * 0.9;
  const CART_WIDTH = HEIGHT * 0.5;
  const TEXT_WIDTH = WIDTH - CART_WIDTH - PADDING_X * 3;

  const { cart, products } = useContext(ShopContext);
  const product = products.find((prod) => prod.id === productId);

  const addToCart = () => {
    if (variant) {
      cart.add(variant.id, visual);
    }
  };

  const variant =
    product && product.variants.length ? product.variants[variation] : null;
  return (
    <group {...restProps} name="control">
      <group rotation-x={-Math.PI * 0.13}>
        <group position-y={HEIGHT / 2} name="content">
          <mesh position-z={-0.026}>
            <boxBufferGeometry args={[WIDTH, HEIGHT, 0.05]} />
            <meshStandardMaterial color="white" side={THREE.DoubleSide} />
          </mesh>
          {/* @ts-ignore */}
          <Text
            name="title"
            {...TITLE_FONT}
            position-y={HEIGHT / 2 - PADDING_Y}
            position-x={-WIDTH / 2 + PADDING_X}
            maxWidth={TEXT_WIDTH}
          >
            {productName ? productName : product ? product.title : "Loading..."}
          </Text>
          {/* @ts-ignore */}
          <Text
            name="subtitle"
            {...SUB_FONT}
            position-y={-0.01}
            position-x={-WIDTH / 2 + PADDING_X}
            maxWidth={TEXT_WIDTH}
          >
            {variant
              ? `$${variant.price}${variant.available ? "" : " - OUT OF STOCK"}`
              : "Loading..."}
          </Text>
          <group
            name="add-to-cart"
            position-x={WIDTH / 2 - CART_WIDTH / 2 - PADDING_X}
            position-y={0.01}
          >
            <Interactable onClick={addToCart}>
              <mesh>
                <boxBufferGeometry args={[CART_WIDTH, CART_WIDTH, 0.02]} />
                <meshStandardMaterial
                  color={variant && variant.available ? "red" : "gray"}
                />
              </mesh>
            </Interactable>
            {/* @ts-ignore */}
            <Text
              fontSize={0.07}
              color="white"
              textAlign="center"
              anchorY="middle"
              anchorX="center"
              position-z={0.021}
            >
              {variant && variant.available ? "+" : "x"}
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Control;
