import { Suspense, useContext, useEffect, useRef, useState } from "react";
import ShoppingCart from "../../models/ShoppingCart";
import { Tool } from "../../modifiers/Tool";
import { ShopContext } from "../../index";
import { Interactable, Spinning, useEnvironment } from "spacesvr";
// @ts-ignore
import { animated, useSpring } from "react-spring/three";
import { config } from "react-spring";
import { Preload } from "@react-three/drei";
import SpeechBubble from "../SpeechBubble";
import FacePlayer from "../../modifiers/FacePlayer";
import CartView from "./components/CartView";

const Cart = () => {
  const { cart } = useContext(ShopContext);
  const { device } = useEnvironment();

  const [incr, setIncr] = useState(0);
  const [speech, setSpeech] = useState(false);
  const prevCart = useRef(0);

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "c") {
      if (cart.isOpen) cart.close();
      else cart.open();

      if (speech) setSpeech(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", onKeyPress);
    return () => {
      window.removeEventListener("keypress", onKeyPress);
    };
  }, [speech, cart.isOpen]);

  // rotate cart when product is added
  const { rotY } = useSpring({
    rotY: Math.PI * 2 * incr,
    config: config.wobbly,
  });

  const { scale } = useSpring({ scale: cart.count > 0 ? 1 : 0 });

  useEffect(() => {
    if (cart.count !== prevCart.current) {
      setIncr(incr + 1);
      prevCart.current = cart.count;
    }
    if (incr === 1 && cart.count === 1) {
      setSpeech(true);
    }
  }, [incr, cart.count]);

  const onTap = () => {
    if (cart.isOpen) cart.close();
    else cart.open();
    if (speech) setSpeech(false);
  };

  const posY = device.mobile
    ? cart.isOpen
      ? -0.9
      : 0.6
    : cart.isOpen
    ? 0
    : -0.75;
  const posX = 0.8;
  const cartScale = device.mobile ? 0.45 : 0.75;

  return (
    <>
      <Tool pos={[posX, posY]} face={false} pinY={device.mobile}>
        <animated.group scale={scale}>
          {speech && (
            <FacePlayer>
              <group scale={15} position={[device.mobile ? -12 : -15, 3, 0]}>
                <SpeechBubble>
                  {device.mobile
                    ? "tap to view your cart"
                    : "press c to view your cart"}
                </SpeechBubble>
              </group>
            </FacePlayer>
          )}
          <Interactable onClick={device.mobile ? onTap : undefined}>
            <mesh position-y={2.64} visible={false}>
              <boxBufferGeometry args={[5, 5, 5]} />
            </mesh>
          </Interactable>
          <Spinning ySpeed={cart.isOpen ? 0 : 0.6}>
            <animated.group rotation-y={rotY}>
              <Suspense fallback={null}>
                <Preload all />
                <ShoppingCart scale={cartScale} rotation-y={-Math.PI} />
              </Suspense>
            </animated.group>
          </Spinning>
        </animated.group>
      </Tool>
      {cart.isOpen && <CartView />}
    </>
  );
};

export default Cart;
