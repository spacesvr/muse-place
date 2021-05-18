import { Image, Video, Interactable } from "spacesvr";
import { Text } from "@react-three/drei";
import NftPlacard from "themes/components/NftPlacard";

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/nft`;
const THEME_COLOR = "green";

export default function BenNft() {
  return (
    <group>
      <Interactable
        onClick={() =>
          window.open(
            "https://opensea.io/accounts/0x8b873805b19d60e16a53cd30992fef01c007a746",
            "_blank"
          )
        }
      >
        <Image
          rotation-y={(3 * Math.PI) / 2}
          position={[2.475, 1.25, 4.25]}
          scale={1}
          src={`${url}/pfp.png`}
          framed
        />
      </Interactable>
      <Text rotation-y={(3 * Math.PI) / 2} position={[2.5, 0.5, 4.25]}>
        0x8b873805b19d60e16a53cd30992fef01c007a746
      </Text>
      <group rotation-y={2 * Math.PI} position={[-1.5, 1, -3]} name="DogeNFT">
        <Image scale={2} src={`${url}/dogenft.png`} framed />
        <NftPlacard
          position={[2, -0.15, 0]}
          title="CryptDoge #11"
          owner="0x8b873805b19d60e16a53cd30992fef01c007a746"
          link="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/17826942262815328078676720949164963321595370456112527570767857418897817862145"
          color={THEME_COLOR}
        />
      </group>
      <group
        rotation-y={Math.PI}
        position={[-1.5, 1, 11.5]}
        name="RabbitHoleNFT"
      >
        <Video scale={2} src={`${url}/rabbithole.mp4`} framed />
        <NftPlacard
          position={[2, -0.15, 0]}
          title="Up the RaBBIT Hol3"
          owner="0x8b873805b19d60e16a53cd30992fef01c007a746"
          link="https://opensea.io/assets/0xd07dc4262bcdbf85190c01c996b4c06a461d2430/71322"
          color={THEME_COLOR}
        />
      </group>
    </group>
  );
}
