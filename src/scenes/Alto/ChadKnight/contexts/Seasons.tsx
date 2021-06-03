import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useLimiter } from "spacesvr";

export type Season = "Winter" | "Summer" | "Spring" | "Fall";

type SeasonContext = {
  activeSeason?: Season;
};

export const SeasonContext = createContext<SeasonContext>({} as SeasonContext);
export function useSeason() {
  return useContext(SeasonContext);
}

export default function Seasons(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const [activeSeason, setActiveSeason] = useState<Season>();

  const { camera } = useThree();
  const limiter = useLimiter(45);
  useFrame(({ clock }) => {
    if (!limiter.isReady(clock)) return;

    if (camera.position.x > 0 && camera.position.z > 0) {
      setActiveSeason("Winter");
    }
    if (camera.position.x > 0 && camera.position.z < 0) {
      setActiveSeason("Summer");
    }
    if (camera.position.x < 0 && camera.position.z > 0) {
      setActiveSeason("Spring");
    }
    if (camera.position.x < 0 && camera.position.z < 0) {
      setActiveSeason("Fall");
    }
  });

  return (
    <group>
      <SeasonContext.Provider value={{ activeSeason }}>
        {children}
      </SeasonContext.Provider>
    </group>
  );
}
