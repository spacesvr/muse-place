import { useEnvironment } from "spacesvr";
import Overlay from "../modifiers/Overlay";
import { useLayoutEffect, useState } from "react";
import styled from "@emotion/styled";

const Darker = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Container = styled.div`
  width: 95%;
  max-width: 500px;

  position: absolute;
  padding: 15px 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  text-align: center;

  & > input {
    width: 90%;
    margin: 5px 0;
    font-size: 1.5rem;
    padding: 5px 20px;
    box-sizing: border-box;
  }

  & > div {
    width: 90%;
    margin: 30px auto 0;
    display: flex;
    justify-content: space-evenly;
  }
`;

const YesButton = styled.button`
  font-size: 1.25rem;
  padding: 10px 20px;
  border: none;
  color: white;
  background: green;
  cursor: pointer;
  transition: opacity 0.15s linear;

  &:hover {
    opacity: 0.8;
  }
`;
const NoButton = styled(YesButton)`
  background: gray;
`;

export type EmailCollectionProps = { title?: string; link?: string };

export default function EmailCollection(props: EmailCollectionProps) {
  const { title = "Sign up to receive updates!", link } = props;

  const [hasUnpaused, setHasUnpaused] = useState(false);
  const { paused, overlay, setPaused } = useEnvironment();

  useLayoutEffect(() => {
    if (!hasUnpaused && !paused) {
      setTimeout(() => setPaused(true, "emailcollection"), 25000);
      setHasUnpaused(true);
    }
  }, [hasUnpaused, paused]);

  if (!paused || overlay !== "emailcollection") {
    return null;
  }

  return (
    <Overlay>
      <Darker>
        <Container>
          <h3>{title}</h3>
          {!link && <input type="email" placeholder="Enter email" />}
          <div>
            <YesButton onClick={() => window.open(link, "_blank")}>
              Sign Up
            </YesButton>
            <NoButton onClick={() => setPaused(false)}>No Thanks</NoButton>
          </div>
        </Container>
      </Darker>
    </Overlay>
  );
}
