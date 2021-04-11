import styled from "@emotion/styled";
import { isMobile } from "react-device-detect";
import { useEnvironment } from "spacesvr";
import { keyframes } from "@emotion/core";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-three-fiber";
import { Html } from "@react-three/drei";

const Container = styled.div<{ paused: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  transition: opacity 0.25s ease;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.paused ? 1 : 0)};
  pointer-events: ${(props) => (props.paused ? "all" : "none")};
`;

const ClickContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const hueRotate = keyframes`
  from{
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
`;

const Window = styled.div`
  width: 90%;
  max-width: 400px;
  height: 91vw;
  max-height: 400px;
  padding: 20px 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 3%;
  background-image: url("https://d27rt3a60hh1lx.cloudfront.net/images/muse-bg.jpg");
  background-position: center;
  background-size: cover;
  font-family: sans-serif;
  animation: ${hueRotate} 15s ease infinite;
  box-sizing: border-box;
`;

const Continue = styled.div`
  width: 90%;
  max-width: 400px;
  height: auto;
  cursor: pointer;
  text-align: center;
  font-size: 1.3em;
  font-family: "Quicksand", sans-serif;
  transition: opacity 0.15s linear;
  margin-top: 20px;
  background: white;
  line-height: 1em;
  padding: 12px 0;
  border-radius: 10px;
  :hover {
    opacity: 0.5;
  }
`;

const Text = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0;
  font-family: "Roboto", sans-serif, monospace;
  font-size: 0.7em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > p {
    margin: 0.2em;
  }
`;

const InfoPics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 400px) {
    margin-top: -20px;
  }
`;

const Keys = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const Key = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
  border: 2px solid white;
  margin-bottom: 7px;
  @media screen and (max-width: 400px) {
    width: 30px;
    height: 30px;
  }
`;

const Captions = styled.div`
  width: 67%;
  margin-top: -20px;
  margin-left: 25px;
  font-size: 0.6em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 400px) {
    width: 75%;
    margin-left: 30px;
  }
`;

const BottomKeys = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

const Onboarding = () => {
  const { paused, overlay, setPaused, containerRef } = useEnvironment();
  const [firstVisit, setVisit] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (window.localStorage.getItem("login")) {
      setVisit(false);
    } else if (firstVisit) {
      window.localStorage.setItem("login", "visited");
    }
  }, []);

  const closeOverlay = () => {
    setPaused(false);
    setVisit(false);
  };

  if (overlay || !firstVisit || !containerRef.current) {
    return null;
  }

  return (
    <Html>
      {createPortal(
        <Container paused={paused}>
          <ClickContainer onClick={closeOverlay} />
          <Window>
            <Text>
              <p>Pause with the {isMobile ? "Menu Button" : "Esc key"}</p>
            </Text>
            {isMobile ? (
              <InfoPics>
                <img
                  src="https://d27rt3a60hh1lx.cloudfront.net/images/joystick.gif"
                  width={100}
                  style={{
                    mixBlendMode: "multiply",
                    position: "relative",
                    left: "35px",
                    bottom: "25px",
                  }}
                />
                <img
                  src="https://d27rt3a60hh1lx.cloudfront.net/images/gesture.gif"
                  width={120}
                />
              </InfoPics>
            ) : (
              <InfoPics>
                <Keys>
                  <Key>W</Key>
                  <BottomKeys>
                    <Key>A</Key>
                    <Key>S</Key>
                    <Key>D</Key>
                  </BottomKeys>
                </Keys>
                <img
                  src="https://d27rt3a60hh1lx.cloudfront.net/images/source.gif"
                  width={175}
                />
              </InfoPics>
            )}
            <Captions>
              <p>Move</p>
              <p>Look Around</p>
            </Captions>
          </Window>
          <Continue onClick={closeOverlay}>continue</Continue>
        </Container>,
        containerRef.current
      )}
    </Html>
  );
};

export default Onboarding;
