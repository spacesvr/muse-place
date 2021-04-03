import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ScrollData } from "../themes/Alto/types/scroll";

const Standard = dynamic(import("scenes/Alto"), { ssr: false });

const ARTIST = {
  name: "Carlos Alberto",
  socialLinks: ["https://www.instagram.com/homocosmico"],
};

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/carlosalberto/hmcosmico`;

const scrollData: ScrollData[] = [
  {
    img: `${url}/Dream+N%C2%B01-min.jpg`,
    position: [-16.08, -0.56, -25.08],
    name: "1",
    text:
      "Dream N°1\n" +
      "La presión social y el estrés por cumplir nuestras tareas u objetivos nos llevan a inundarnos de incertidumbres sobre nuestro futuro, solo tomate un descanso y deja descansar tu mente, una mente en blanco es un nuevo lienzo para empezar de nuevo.\n" +
      "Social pressure and stress to fulfill our tasks or objectives lead us to flood us with uncertainties about our future, just take a break and let your mind rest, a blank mind is a new canvas to start over.\n",
  },
  {
    img: `${url}/Dream+N%C2%B02-min.jpg`,
    position: [-23.88, -0.72, -19.3],
    name: "2",
    text:
      "Dream N°2\n" +
      "El universo te creó y si crees en él, se materializa cada pensamiento que desees crear.\n" +
      "The universe created you and if you believe in it, every thought you want to create materializes.\n",
  },
  {
    img: `${url}/Dream+N%C2%B03-min.jpg`,
    position: [-30.39, -0.72, -10.07],
    name: "3",
    text:
      "Dream N°3\n" +
      "Cuida la tierra que te dio la vida.\n" +
      "Take care of the land that gave you life.\n",
  },
  {
    img: `${url}/Dream+N%C2%B04-min.jpg`,
    position: [-32.57, -0.42, 1.05],
    name: "4",
    text:
      "Dream N°4\n" +
      "Pronto tocaremos Marte, y pronto tocaremos el espacio interestelar.\n" +
      "Soon we will touch Mars, and soon we will touch interstellar space.\n",
  },
  {
    img: `${url}/Dream+N%C2%B05-min.jpg`,
    position: [-32.57, -0.42, 8.96],
    name: "5",
    text:
      "Dream N°5\n" +
      "El agua, el hermoso milagro que nos brindó el universo.\n" +
      "Water, the beautiful miracle that the universe gave us.\n",
  },
  {
    img: `${url}/Dream+N%C2%B06-min.jpg`,
    position: [-28.04, -0.42, 16.19],
    name: "6",
    text:
      "Dream N°6\n" +
      "Esta es una postal después de miles de años en terraformar Europa una de las lunas de Júpiter.\n" +
      "This is a postcard after thousands of years in terraforming Europa one of the moons of Jupiter.\n",
  },
  {
    img: `${url}/Dream+N%C2%B07-min.jpg`,
    position: [-2.8, 5.47, -4.68],
    name: "7",
    text:
      "Dream N°7\n" +
      "El planeta se ahoga poco a poco, y esa misma corriente se debe a nuestra pequeña existencia en un pequeño lapso de tiempo.\n" +
      "The planet is drowning little by little, and that same current is due to our small existence in a small period of time.\n",
    rotationY: 0.5,
  },
  {
    img: `${url}/Dream+N%C2%B08-min.jpg`,
    position: [3.1, 5.47, -4.4],
    name: "8",
    text:
      "Dream N°8\n" +
      "Ese increíble momento de plenitud cuando logras alcanzar y tocar tus sueños.\n" +
      "That incredible moment of fulfillment when you reach and touch your dreams.\n",
    rotationY: -1.03,
  },
  {
    img: `${url}/Dream+N%C2%B09-min.jpg`,
    position: [5.08, 5.47, 0.99],
    name: "9",
    text:
      "Dream N°9\n" +
      "Tal vez nuestro futuro se encuentre más allá del cielo.\n" +
      "Maybe our future is beyond the sky.\n",
    rotationY: -1.72,
  },
  {
    img: `${url}/Dream+N%C2%B010-min.jpg`,
    position: [-4.18, 5.47, 1.06],
    name: "10",
    text:
      "Dream N°10\n" +
      "El encuentro de dos mundos, dos mentes, dos corazones.\n" +
      "The meeting of two worlds, two minds, two hearts.\n",
    rotationY: 1.8,
  },
  {
    img: `${url}/Dream+N%C2%B011-min.jpg`,
    position: [9.07, 2.63, 13.5],
    name: "11",
    text:
      "Dream N°11\n" +
      "Sueño con ver ballenas, el animal ancestral que surgió del agua y regresó a ella para quedarse.\n" +
      "I dream of seeing whales, the ancestral animal that emerged from the water and returned to it to stay.\n",
    rotationY: -3.9,
  },
  {
    img: `${url}/Dream+N%C2%B012-min.jpg`,
    position: [14.63, 3.08, 1.46],
    name: "12",
    text:
      "Dream N°12\n" +
      "Atardeceres en un mar de sucesos.\n" +
      "Sunsets in a sea of ​​events.\n",
  },
  {
    img: `${url}/Dream+N%C2%B013-min.jpg`,
    position: [-14.13, 2.91, 7.04],
    name: "13",
    text:
      "Dream N°13\n" +
      "Despéjate de tu mente, despéjate de la sociedad, despéjate del mundo, despéjate por un tiempo, despeja tu alma.\n" +
      "Detach yourself from your mind, detach yourself from society, detach yourself from the world, detach yourself for a while, clear your soul.\n",
  },
  {
    img: `${url}/Dream+N%C2%B014-min.jpg`,
    position: [4.17, 3.2, -13.27],
    name: "14",
    text:
      "Dream N°14\n" +
      "Ese instante en el que te das cuenta que lo tienes todo y avanzas con ese todo.\n" +
      "That moment in which you realize that you have everything and you move forward with that everything.\n",
  },
  {
    img: `${url}/Dream+N%C2%B015-min.jpg`,
    position: [-2.77, 3.31, -13.27],
    name: "15",
    text:
      "Dream N°15\n" +
      "El crecer, sentir, vivir, el uno mismo con la tierra.\n" +
      "Growing, feeling, living, the self with the earth.\n",
  },
  {
    img: `${url}/Dream+N%C2%B016-min.jpg`,
    position: [-12.37, 3.66, -4.06],
    name: "16",
    text:
      "Dream N°16\n" +
      "Un pequeño viaje en un gran bosque enteógeno.\n" +
      "A small journey in a large entheogenic forest.\n",
  },
  {
    img: `${url}/Dream+N%C2%B017-min.jpg`,
    position: [-12.19, 3.61, -2.63],
    name: "17",
    text:
      "Dream N°17\n" +
      "Lo inevitable, el mundo nos trae y nos lleva con él.\n" +
      "The inevitable, the world brings us and takes us with it.\n",
  },
  {
    img: `${url}/Dream+N%C2%B018-min.jpg`,
    position: [18.68, -0.51, 26.18],
    name: "18",
    text:
      "Dream N°18\n" +
      "Descenso a la realidad, después de un largo viaje en la cima de la conciencia.\n" +
      "Descent into reality, after a long journey to the peak of consciousness.\n",
  },
  {
    img: `${url}/Dream+N%C2%B019-min.jpg`,
    position: [24.25, -0.32, 19.56],
    name: "19",
    text:
      "Dream N°19\n" +
      "Parece imposible, pero cuando te lo propones y te esfuerzas lo suficiente lograr lo inimaginable.\n" +
      "It seems impossible, but when you put your mind to it and try hard enough to achieve the unimaginable.\n",
  },
  {
    img: `${url}/Dream+N%C2%B020-min.jpg`,
    position: [30.94, -0.32, 8.43],
    name: "20",
    text:
      "Dream N°20\n" +
      "Todo tiene un límite, todo tiene un final, vivan cada instante como si fuese el último.\n" +
      "Everything has a limit, everything has an end, live each moment as if it were the last.\n",
  },
  {
    img: `${url}/Dream+N%C2%B021-min.jpg`,
    position: [32.82, -0.32, 0.99],
    name: "21",
    text:
      "Dream N°21\n" +
      "Los pasos cortos te pueden llevar a un camino de infinitas probabilidades.\n" +
      "Short steps can lead you down a path of infinite probabilities.\n",
  },
  {
    img: `${url}/Dream+N%C2%B022-min.jpg`,
    position: [30.24, -0.39, -7.93],
    name: "22",
    text:
      "Dream N°22\n" +
      "Lo quieras o no, todos estamos destinados tarde o temprano a ser olvidados.\n" +
      "Whether you like it or not, we are all destined sooner or later to be forgotten.\n",
  },
  {
    img: `${url}/Dream+N%C2%B023-min.jpg`,
    position: [28.27, -0.59, -13.39],
    name: "23",
    text:
      "Dream N°23\n" +
      "La exploración que te llevó más allá de lo inexplorable.\n" +
      "The exploration that took you beyond the unexplored.\n",
  },
  {
    img: `${url}/Dream+N%C2%B024-min.jpg`,
    position: [26.1, -0.8, -17],
    name: "24",
    text:
      "Dream N°24\n" +
      "Distorsión y transformación de la conciencia a través del tiempo y el espacio.\n" +
      "Distortion and transformation of consciousness through time and space.\n",
  },
  {
    img: `${url}/Dream+N%C2%B025-min.jpg`,
    position: [22.69, -0.8, -20.27],
    name: "25",
    text:
      "Dream N°25\n" +
      "Si algún día somos visitados por ellos, ese día tal vez será el último.\n" +
      "If one day we are visited by them, that day may be the last.\n",
  },
  {
    img: `${url}/Dream+N%C2%B026-min.jpg`,
    position: [18.06, -0.8, -24.71],
    name: "26",
    text:
      "Dream N°26\n" +
      "En este mar de posibilidades somos náufragos que sueñan con encontrar la plenitud.\n" +
      "In this sea of ​​possibilities we are castaways who dream of finding fulfillment.\n",
  },
  {
    img: `${url}/Dream+N%C2%B027-min.jpg`,
    position: [11.91, -0.8, -28.47],
    name: "27",
    text:
      "Dream N°27\n" +
      "Esa bonita distracción que nos distrae del desastroso mundo que nos rodea.\n" +
      "That nice distraction that distracts us from the disastrous world around us.\n",
  },
  {
    img: `${url}/Dream+N%C2%B028-min.jpg`,
    position: [5.38, -0.8, -31.18],
    name: "28",
    text:
      "Dream N°28\n" +
      "Cuando pones los pies en la tierra es cuando te enteras de la inmensa capacidad que tienes para afrontar tus problemas.\n" +
      "When you put your feet on the ground is when you learn of the immense capacity you have to face your problems.\n",
  },
  {
    img: `${url}/Dream+N%C2%B029-min.jpg`,
    position: [1.2, -0.56, -31.18],
    name: "29",
    text:
      "Dream N°29\n" +
      "Respira con la tierra, fluye con el universo.\n" +
      "Breathe with the earth, flow with the universe.\n",
  },
  {
    img: `${url}/Dream+N%C2%B030-min.jpg`,
    position: [-6, -0.056, -30.44],
    name: "30",
    text:
      "Dream N°30\n" +
      "¿Recuerdas cuándo fue la última vez que sin darte cuenta estuviste apreciando lo hermosos de la vida?\n" +
      "Do you remember when was the last time that without realizing it you were appreciating the beauty of life?\n",
  },
];

const LinkTree: NextPage = () => {
  return (
    <>
      <Head>
        <title>{ARTIST.name} | Muse Place</title>
      </Head>
      <Standard
        scrollData={scrollData}
        socials={ARTIST.socialLinks}
        audio="https://d27rt3a60hh1lx.cloudfront.net/audio/ini-bestmixever.mp3"
        hdri="https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/kirax23/kirahdri2.hdr"
      />
    </>
  );
};

export default LinkTree;
