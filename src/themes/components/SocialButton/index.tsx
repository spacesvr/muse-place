import { Interactable } from "spacesvr";
import { Suspense } from "react";

import Instagram from "./models/Instagram";
import Twitter from "./models/Twitter";
import Web from "./models/Web";
import Spotify from "./models/Spotify";
import Youtube from "./models/Youtube";
import Typeform from "./models/Typeform";
import Soundcloud from "./models/Soundcloud";
import { GroupProps } from "react-three-fiber";

type SocialProps = {
  link: string;
} & GroupProps;

export default function SocialButton(props: SocialProps) {
  const { link, ...restProps } = props;

  const lowerLink = link.toLowerCase();

  const model = lowerLink.includes("instagram.com") ? (
    <Instagram />
  ) : lowerLink.includes("twitter.com") ? (
    <Twitter />
  ) : lowerLink.includes("spotify.com") ? (
    <Spotify />
  ) : lowerLink.includes("youtube.com") ? (
    <Youtube />
  ) : lowerLink.includes("typeform") ? (
    <Typeform />
  ) : lowerLink.includes("soundcloud.com") ? (
    <Soundcloud />
  ) : (
    <Web />
  );

  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <group {...restProps}>
      <Suspense fallback={null}>
        <Interactable onClick={handleClick}>{model}</Interactable>
      </Suspense>
    </group>
  );
}
