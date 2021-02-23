import { useEnvironment } from "spacesvr";
import Overlay from "../modifiers/Overlay";
import PopupContainer from "./components/PopupContainer";
import { Title } from "./components/Styles";
import styled from "@emotion/styled";

const CONTENT_FOLDER = "https://d27rt3a60hh1lx.cloudfront.net/content/c2a";

const VideoContainer = styled.div`
  width: 95%;
  max-width: 450px;
  margin: 0 auto;
`;

const VideoPlaceholder = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin: 20px 0;

  &:first-of-type {
    margin-top: 0;
  }
`;

const BTSTrigger = () => {
  const { paused, overlay, setPaused } = useEnvironment();

  if (!paused || overlay !== "bts") {
    return null;
  }

  return (
    <Overlay>
      <PopupContainer onClose={() => setPaused(false)}>
        <Title>BEHIND THE SCENES</Title>
        <VideoContainer>
          <VideoPlaceholder src={`${CONTENT_FOLDER}/video-placeholder.png`} />
          <VideoPlaceholder src={`${CONTENT_FOLDER}/video-placeholder.png`} />
          <VideoPlaceholder src={`${CONTENT_FOLDER}/video-placeholder.png`} />
        </VideoContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default BTSTrigger;