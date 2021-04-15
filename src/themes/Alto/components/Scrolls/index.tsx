import Scroll from "./Scroll";
import { useContext } from "react";
import { AltoContext } from "../../index";

type ScrollsProps = {
  count: number;
  setCount: (n: number) => void;
};

const Scrolls = (props: ScrollsProps) => {
  const { count, setCount } = props;

  const { scrollData } = useContext(AltoContext);

  return (
    <group>
      {scrollData.map((scroll) => (
        <Scroll
          count={count}
          setCount={setCount}
          img={scroll.img}
          text={scroll.text}
          textColor={scroll.textColor}
          textSize={scroll.textSize}
          textY={scroll.textY}
          position={scroll.position}
          rotation-y={scroll.rotationY}
          key={scroll.img}
          name={`scroll-${scroll.img}`}
        />
      ))}
    </group>
  );
};

export default Scrolls;
