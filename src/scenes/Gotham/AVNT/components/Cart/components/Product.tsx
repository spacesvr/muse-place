import { Item } from "../../../types/shop";
import { Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { useContext } from "react";
import { ShopContext } from "../../../index";
import { Image } from "spacesvr";
import Button from "../../Button";

type ProductProps = {
  item: Item;
} & GroupProps;

const CF_URL = "https://d27rt3a60hh1lx.cloudfront.net/images";

export default function Product(props: ProductProps) {
  const { item, ...rest } = props;
  const { products, cart } = useContext(ShopContext);

  const product = products.find(
    (prod) =>
      //@ts-ignore
      prod.variants.find((variant) => variant.id === item.variant.id) !==
      undefined
  );

  if (!product) return null;

  const { images } = product;

  // @ts-ignore
  const subtotal = (item.quantity * product.variants[0].price).toString();

  // @ts-ignore
  const visual = cart.visuals.get(item.variant.id);

  return (
    <group name={`product-${item.id}`} {...rest} scale={1}>
      {!visual && images[0] && (
        <Image src={images[0]} size={5} framed position-y={2} />
      )}
      <group name="visual" scale={10} position-y={2}>
        {visual}
      </group>
      <Text
        position-y={-3}
        fontSize={1.15}
        color="white"
        outlineColor="black"
        outlineWidth={0.1}
      >
        {item.quantity}
      </Text>
      <Text
        position-y={-1.5}
        position-z={-1}
        fontSize={1.15}
        color="white"
        outlineColor="black"
        outlineWidth={0.1}
      >
        {`$${subtotal}`}
      </Text>
      <Button
        position={[-1.25, -3, 0]}
        rounded
        onClick={() => cart.subtract(item.id)}
        image={
          item.quantity === 1
            ? `${CF_URL}/trash-alt-solid.jpg`
            : `${CF_URL}/minus-solid.jpg`
        }
      />
      <Button
        position={[1.25, -3, 0]}
        rounded
        // @ts-ignore
        onClick={() => cart.add(item.variant.id)}
        image={`${CF_URL}/plus-solid.jpg`}
      />
    </group>
  );
}
