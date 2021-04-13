import { Tool } from "../modifiers/Tool";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "react-three-fiber";
import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../index";

const FONT_SIZE = 1.5;
const CHAR_SPEED = 0.05;
const TIMEOUT = 5;

const Guide = () => {
  const { cart } = useContext(ShopContext);
  const { size } = useThree();

  const { width } = size;

  const [message, setMessage] = useState("");
  const [saidCounterMessage, setSaidCounterMessage] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [str, setStr] = useState("");
  const startTime = useRef(0);
  const prevCart = useRef(0);

  useFrame(({ clock }) => {
    const diff = clock.getElapsedTime() - startTime.current;

    if (needsUpdate) {
      startTime.current = clock.getElapsedTime();
      setNeedsUpdate(false);
    } else if (diff < TIMEOUT) {
      if (message !== "" && str !== message) {
        const elapsed = clock.getElapsedTime() - startTime.current;
        const count = Math.floor(elapsed / CHAR_SPEED);
        const newString = message.substr(0, count);
        if (newString !== str) {
          setStr(newString);
        }
      }
    } else if (diff >= TIMEOUT && (message !== "" || str !== "")) {
      setMessage("");
      setStr("");
    }
  });

  useEffect(() => {
    if (cart.count !== prevCart.current) {
      if (!saidCounterMessage && cart.count > 0) {
        // run on first cart update > 0
        prevCart.current = cart.count;
        setSaidCounterMessage(true);
        setMessage("Go to the counter to checkout");
        setNeedsUpdate(true);
      }
    }
  }, [cart.count]);

  if (message === "") {
    return null;
  }

  return (
    <Tool pos={[0, -0.9]} pinY>
      {/* @ts-ignore */}
      <Text
        color="white"
        maxWidth={width / 35}
        fontSize={FONT_SIZE}
        outlineColor="black"
        textAlign="center"
        anchorY="bottom"
        outlineWidth={FONT_SIZE * 0.1}
      >
        {str}
      </Text>
    </Tool>
  );
};

export default Guide;
