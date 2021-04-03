import { Floating, Image } from "spacesvr";
import { Text } from "@react-three/drei";

const NUM_IMAGES = 30;
const RADIUS = 32;
const GAP = 0.2;
const FOLDER = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/homocosmico`;

const texts = [
  "Dream N°1\n" +
    "La presión social y el estrés por cumplir nuestras tareas u objetivos nos llevan a inundarnos de incertidumbres sobre nuestro futuro, solo tomate un descanso y deja descansar tu mente, una mente en blanco es un nuevo lienzo para empezar de nuevo.\n" +
    "Social pressure and stress to fulfill our tasks or objectives lead us to flood us with uncertainties about our future, just take a break and let your mind rest, a blank mind is a new canvas to start over.",
  "Dream N°2\n" +
    "El universo te creó y si crees en él, se materializa cada pensamiento que desees crear.\n" +
    "The universe created you and if you believe in it, every thought you want to create materializes.",
  "Dream N°3\n" +
    "Cuida la tierra que te dio la vida.\n" +
    "Take care of the land that gave you life.",
  "Dream N°4\n" +
    "Pronto tocaremos Marte, y pronto tocaremos el espacio interestelar.\n" +
    "Soon we will touch Mars, and soon we will touch interstellar space.",
  "Dream N°5\n" +
    "El agua, el hermoso milagro que nos brindó el universo.\n" +
    "Water, the beautiful miracle that the universe gave us.",
  "Dream N°6\n" +
    "Esta es una postal después de miles de años en terraformar Europa una de las lunas de Júpiter.\n" +
    "This is a postcard after thousands of years in terraforming Europa one of the moons of Jupiter.",
  "Dream N°7\n" +
    "El planeta se ahoga poco a poco, y esa misma corriente se debe a nuestra pequeña existencia en un pequeño lapso de tiempo.\n" +
    "The planet is drowning little by little, and that same current is due to our small existence in a small period of time.",
  "Dream N°8\n" +
    "Ese increíble momento de plenitud cuando logras alcanzar y tocar tus sueños.\n" +
    "That incredible moment of fulfillment when you reach and touch your dreams.",
  "Dream N°9\n" +
    "Tal vez nuestro futuro se encuentre más allá del cielo.\n" +
    "Maybe our future is beyond the sky.",
  "Dream N°10\n" +
    "El encuentro de dos mundos, dos mentes, dos corazones.\n" +
    "The meeting of two worlds, two minds, two hearts.",
  "Dream N°11\n" +
    "Sueño con ver ballenas, el animal ancestral que surgió del agua y regresó a ella para quedarse.\n" +
    "I dream of seeing whales, the ancestral animal that emerged from the water and returned to it to stay.\n",
  "Dream N°12\n" +
    "Atardeceres en un mar de sucesos.\n" +
    "Sunsets in a sea of ​​events.",
  "Dream N°13\n" +
    "Despéjate de tu mente, despéjate de la sociedad, despéjate del mundo, despéjate por un tiempo, despeja tu alma.\n" +
    "Detach yourself from your mind, detach yourself from society, detach yourself from the world, detach yourself for a while, clear your soul.",
  "Dream N°14\n" +
    "Ese instante en el que te das cuenta que lo tienes todo y avanzas con ese todo.\n" +
    "That moment in which you realize that you have everything and you move forward with that everything.",
  "Dream N°15\n" +
    "El crecer, sentir, vivir, el uno mismo con la tierra.\n" +
    "Growing, feeling, living, the self with the earth.",
  "Dream N°16\n" +
    "Un pequeño viaje en un gran bosque enteógeno.\n" +
    "A small journey in a large entheogenic forest.",
  "Dream N°17\n" +
    "Lo inevitable, el mundo nos trae y nos lleva con él.\n" +
    "The inevitable, the world brings us and takes us with it.",
  "Dream N°18\n" +
    "Descenso a la realidad, después de un largo viaje en la cima de la conciencia.\n" +
    "Descent into reality, after a long journey to the peak of consciousness.",
  "Dream N°19\n" +
    "Parece imposible, pero cuando te lo propones y te esfuerzas lo suficiente lograr lo inimaginable.\n" +
    "It seems impossible, but when you put your mind to it and try hard enough to achieve the unimaginable.",
  "Dream N°20\n" +
    "Todo tiene un límite, todo tiene un final, vivan cada instante como si fuese el último.\n" +
    "Everything has a limit, everything has an end, live each moment as if it were the last.",
  "Dream N°21\n" +
    "Los pasos cortos te pueden llevar a un camino de infinitas probabilidades.\n" +
    "Short steps can lead you down a path of infinite probabilities.",
  "Dream N°22\n" +
    "Lo quieras o no, todos estamos destinados tarde o temprano a ser olvidados.\n" +
    "Whether you like it or not, we are all destined sooner or later to be forgotten.",
  "Dream N°23\n" +
    "La exploración que te llevó más allá de lo inexplorable.\n" +
    "The exploration that took you beyond the unexplored.",
  "Dream N°24\n" +
    "Distorsión y transformación de la conciencia a través del tiempo y el espacio.\n" +
    "Distortion and transformation of consciousness through time and space.",
  "Dream N°25\n" +
    "Si algún día somos visitados por ellos, ese día tal vez será el último.\n" +
    "If one day we are visited by them, that day may be the last.",
  "Dream N°26\n" +
    "En este mar de posibilidades somos náufragos que sueñan con encontrar la plenitud.\n" +
    "In this sea of possibilities we are castaways who dream of finding fulfillment.",
  "Dream N°27\n" +
    "Esa bonita distracción que nos distrae del desastroso mundo que nos rodea.\n" +
    "That nice distraction that distracts us from the disastrous world around us.",
  "Dream N°28\n" +
    "Cuando pones los pies en la tierra es cuando te enteras de la inmensa capacidad que tienes para afrontar tus problemas.\n" +
    "When you put your feet on the ground is when you learn of the immense capacity you have to face your problems.",
  "Dream N°29\n" +
    "Respira con la tierra, fluye con el universo.\n" +
    "Breathe with the earth, flow with the universe.",
  "Dream N°30\n" +
    "¿Recuerdas cuándo fue la última vez que sin darte cuenta estuviste apreciando lo hermosos de la vida?\n" +
    "Do you remember when was the last time that without realizing it you were appreciating the beauty of life?",
];

function Images() {
  const insideUrls = new Array(4)
    .fill("")
    .map((_, ind) => `${FOLDER}/dreams/Dream N°${ind + 1}.jpg`);
  const middleUrls = new Array(6)
    .fill("")
    .map((_, ind) => `${FOLDER}/dreams/Dream N°${ind + 5}.jpg`);
  const outsideUrls = new Array(20)
    .fill("")
    .map((_, ind) => `${FOLDER}/dreams/Dream N°${ind + 11}.jpg`);

  console.log(outsideUrls);

  const insideRot = (ind: number) =>
    (Math.PI * 2 - GAP) * (ind / 5) - Math.PI + GAP;
  const middleRot = (ind: number) =>
    (Math.PI * 2 - GAP) * (ind / 7) - Math.PI + GAP;
  const outsideRot = (ind: number) =>
    (Math.PI * 2 - GAP) * (ind / 21) - Math.PI + GAP;

  return (
    <group>
      {insideUrls.map((url, ind) => (
        <group rotation-y={insideRot(ind + 1)} key={ind}>
          <group position={[0, 7.5, -3]}>
            <group position-x={1.5}>
              <mesh>
                <boxBufferGeometry args={[1, 1.75, 0.1]} />
                <meshStandardMaterial color="white" />
              </mesh>
              <group position-z={0.06}>
                {/*ts-ignore*/}
                <Text
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={0.9}
                  fontSize={0.075}
                  color="black"
                >
                  {texts[ind]}
                </Text>
              </group>
            </group>
            <Floating>
              <Image src={url} size={2} framed />
            </Floating>
          </group>
        </group>
      ))}
      {middleUrls.map((url, ind) => (
        <group rotation-y={-middleRot(ind + 1)} key={ind + 4}>
          <group rotation-y={-Math.PI} position={[0, 5.5, -12]}>
            <group position-x={1.5}>
              <mesh>
                <boxBufferGeometry args={[1, 1.75, 0.1]} />
                <meshStandardMaterial color="white" />
              </mesh>
              <group position-z={0.06}>
                {/*ts-ignore*/}
                <Text
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={0.9}
                  fontSize={0.075}
                  color="black"
                >
                  {texts[ind] + 4}
                </Text>
              </group>
            </group>
            <Floating>
              <Image src={url} size={2} framed />
            </Floating>
          </group>
        </group>
      ))}
      {outsideUrls.map((url, ind) => (
        <group rotation-y={outsideRot(ind + 1)} key={ind + 10}>
          <group position={[0, 1.5, -RADIUS]}>
            <group position-x={1.5}>
              <mesh>
                <boxBufferGeometry args={[1, 1.75, 0.1]} />
                <meshStandardMaterial color="white" />
              </mesh>
              <group position-z={0.06}>
                {/*ts-ignore*/}
                <Text
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={0.9}
                  fontSize={0.075}
                  color="black"
                >
                  {texts[ind + 10]}
                </Text>
              </group>
            </group>
            <Floating>
              <Image src={url} size={2} framed />
            </Floating>
          </group>
        </group>
      ))}
    </group>
  );
}

export default function Homocosmico() {
  return (
    <group name="homocosmico">
      <Images />
    </group>
  );
}
