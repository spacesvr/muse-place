import { useEnvironment } from "spacesvr";
import Overlay from "../../modifiers/Overlay";
import LiveChat from "./components/LiveChat";
import styled from "@emotion/styled";
import ReactPlayer from "react-player/lazy";
import { videos } from "../../assets/videos";
import CloseIcon from "@material-ui/icons/Close";

const FullscreenContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  z-index: 10;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  padding: 0.75rem;
  color: white;
  font-size: 2rem;
  border: none;
  background: none;
  line-height: 1em;
  border-radius: 10px;

  cursor: pointer;

  background: rgb(101 101 101 / 75%);
  backdrop-filter: blur(9px);

  &:hover {
  }
`;

const FullscreenVideo = () => {
  const { paused, overlay, setPaused } = useEnvironment();

  if (!paused || !overlay || !overlay.includes("fullscreen")) {
    return null;
  }

  const id = overlay.split("-")[1];
  const num = parseInt(overlay.split("-")[2], 10);
  const url = videos[id][num];

  const onClick =
    videos[id].length > 1 ? () => setPaused(true, id) : () => setPaused(false);

  return (
    <Overlay>
      <FullscreenContainer>
        <Close onClick={onClick}>
          <CloseIcon />
        </Close>
        <ReactPlayer url={url} width="100%" height="100%" />
        <LiveChat />
      </FullscreenContainer>
    </Overlay>
  );
};

export default FullscreenVideo;
