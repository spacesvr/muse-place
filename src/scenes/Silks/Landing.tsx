import styled from "@emotion/styled";
import { css, Global } from "@emotion/core";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #f0f8ff;
`;

const Middle = styled.div`
  width: 100%;
  position: absolute;
  z-index: 2;
  top: 50%;

  & > img {
    max-height: 30vh;
    z-index: 2;
    object-fit: contain;
    max-width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    height: 0px;
    width: 100%;
    border: 4px solid white;
  }
`;

const TopSelection = styled.button`
  flex: 1;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: none;
  outline: none;
  cursor: pointer;

  & > h1 {
    color: white;
    font-size: 2rem;
    font-family: "HelveticaBlk", sans-serif;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    color: black;
    text-transform: uppercase;
    padding: 10px 25px;
    border-radius: 5px;

    @media screen and (max-width: 700px) {
      font-size: 2rem;
    }
  }

  & > img,
  & > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
    filter: brightness(0.3);
    transition: filter 0.15s linear;
    transform: scale(1.1);

    &:hover {
      filter: brightness(0.6);
    }
  }
`;

const BottomSelection = styled(TopSelection)`
  & > h1 {
    top: unset;
    bottom: 30%;
    transform: translate(-50%, 50%);
  }
`;

const global = css`
  @font-face {
    font-family: "HelveticaBlk";
      format("opentype");
  }

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

const CONTENT_FOLDER = `https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp`;

const Landing = () => {
  return (
    <Container>
      <Global styles={global} />
      <Middle>
        <img src={`${CONTENT_FOLDER}/silksbyvp.gif`} />
      </Middle>
      <TopSelection
        onClick={() =>
          window.open("https://silks-by-vp.myshopify.com/", "_blank")
        }
      >
        <img src={`${CONTENT_FOLDER}/yellow-green-durag.jpg`} />
        <h1>Go to 2D Shop</h1>
      </TopSelection>
      <BottomSelection
        onClick={() => (window.location.href = "/silksbyvp/world")}
      >
        <video autoPlay muted playsInline loop>
          <source type="video/mp4" src={`${CONTENT_FOLDER}/gameplay.mp4`} />
        </video>
        <h1>Go to 3D Shop</h1>
      </BottomSelection>
    </Container>
  );
};

export default Landing;
