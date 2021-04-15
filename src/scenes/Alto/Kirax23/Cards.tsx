import NftCard from "themes/Alto/models/Kira/NftCard";
import React, { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { MeshBasicMaterial } from "three";

const GAP = 0.2;
const links: any[] = [
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g10.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-discovery-12710",
    thin: true,
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g1.JPG",
    link: "https://foundation.app/X23/x23-genesis-release-7116",
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g2.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-arrival-7595",
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g3.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-download-8117",
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g4.JPG",
    link:
      "https://foundation.app/X23/x23-genesis-collection-deus-x23-machina-8682",
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g5.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-night-city-9257",
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g6.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-invasion-9837",
    thin: true,
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g7.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-deception-10462",
    thin: true,
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g8.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-final-boss-11610",
  },
  {
    img:
      "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/g9.JPG",
    link: "https://foundation.app/X23/x23-genesis-collection-aftermath-12138",
  },
];

const frameTex =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/FRAME.jpg";
const backplateTex =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/BACKPLATE.png";
const logoTex =
  "https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/BACK_LOGO.png";

export default function Cards() {
  const [frameMap, backplateMap, logoMap] = useLoader(THREE.TextureLoader, [
    frameTex,
    backplateTex,
    logoTex,
  ]);
  const materials: MeshBasicMaterial[] = [],
    mats: JSX.Element[] = [];

  useMemo(() => {
    const frameMat = new MeshBasicMaterial({ map: frameMap });
    materials.push(frameMat);
  }, [frameMap]);
  useMemo(() => {
    const backplateMat = new MeshBasicMaterial({ map: backplateMap });
    materials.push(backplateMat);
  }, [backplateMap]);
  useMemo(() => {
    const logoMat = new MeshBasicMaterial({ map: logoMap });
    materials.push(logoMat);
  }, [logoMap]);

  function rotate(index: number) {
    return (Math.PI * 2 - GAP) * (index / 11) - Math.PI + GAP;
  }

  links.forEach((link) =>
    mats.push(
      <group
        rotation-y={-rotate(links.indexOf(link) + 1) + 0.1}
        key={links.indexOf(link)}
      >
        <group rotation-y={-Math.PI / 2} position={[0, 5.9, -12]}>
          <group position-x={1.35}>
            <NftCard
              link={link.link}
              image={link.img ? link.img : undefined}
              video={link.video ? link.video : undefined}
              thin={link.thin ? true : undefined}
              mats={materials}
            />
          </group>
        </group>
      </group>
    )
  );

  return (
    <group>
      <NftCard
        image="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/netflixStill.jpg"
        link="https://foundation.app/X23"
        mats={materials}
        position={[0, 7, 0]}
        name="goldCard"
        thin
        rotate
      />
      {mats}
    </group>
  );
}
