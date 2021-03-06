import { Suspense } from "react";
// @ts-ignore
import { JEELIZFACEFILTER, NN_4EXPR } from "facefilter";
import { JeelizThreeFiberHelper } from "../assets/JeelizThreeFiberHelper.js";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { DRACO_URL } from "spacesvr";

const _maxFacesDetected = 1; // max number of detected faces
const _faceFollowers = new Array(_maxFacesDetected);

type Expressions = {
  mouthOpen: number;
  mouthSmile: number;
  eyebrowFrown: number;
  eyebrowRaised: number;
};

// This mesh follows the face. put stuffs in it.
// Its position and orientation is controlled by Jeeliz THREE.js helper
const FaceFollower = (props: {
  faceIndex: number;
  expressions: Expressions;
  assetUrl: string;
}) => {
  // const objRef = useMemo<Group>((group) => {
  //   _faceFollowers[props.faceIndex] = group;
  // }, []);

  const gltf = useGLTF(props.assetUrl, DRACO_URL);

  return (
    <group>
      {/*<mesh name="mainCube">*/}
      {/*  <boxBufferGeometry args={[1, 1, 1]} />*/}
      {/*  <meshNormalMaterial />*/}
      {/*</mesh>*/}
      <ambientLight />
      <group position-y={1}>
        <group scale={[1.5, 1.5, 1.5]}>
          <primitive object={gltf.scene} />
        </group>
      </group>
      <spotLight position={[0, 5, 0]} />
      <mesh
        name="mouthOpen"
        scale={[props.expressions.mouthOpen, 1, props.expressions.mouthOpen]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.2, 0.2]}
      >
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
      <mesh
        name="mouthSmile"
        scale={[props.expressions.mouthSmile, 1, props.expressions.mouthSmile]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.2, 0.2]}
      >
        <cylinderGeometry
          args={[0.5, 0.5, 1, 32, 1, false, -Math.PI / 2, Math.PI]}
        />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
    </group>
  );
};

// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
// @ts-ignore
let _threeFiber = null;
const DirtyHook = (props: any) => {
  _threeFiber = useThree();
  useFrame(
    JeelizThreeFiberHelper.update_camera.bind(
      null,
      props.sizing,
      _threeFiber.camera
    )
  );
  return null;
};

const compute_sizing = () => {
  // compute  size of the canvas:
  const height = window.innerHeight;
  const wWidth = window.innerWidth;
  const width = Math.min(wWidth, height);

  // compute position of the canvas:
  const top = 0;
  const left = (wWidth - width) / 2;
  return { width: 400, height: 400, top: height / 2, left: width / 2 - 200 };
};

const ARFilter = (props: { assetUrl: string }) => {
  const { assetUrl } = props;

  const sizing = useMemo(compute_sizing, []);
  const expressions = useMemo(() => {
    const exp = [];
    for (let i = 0; i < _maxFacesDetected; ++i) {
      exp.push({
        mouthOpen: 0,
        mouthSmile: 0,
        eyebrowFrown: 0,
        eyebrowRaised: 0,
      });
    }
    return exp;
  }, []);
  const faceFilterCanvas = useRef<HTMLCanvasElement>();

  const callbackTrack = (detectStatesArg: any) => {
    // if 1 face detection, wrap in an array:
    const detectStates = detectStatesArg.length
      ? detectStatesArg
      : [detectStatesArg];

    // update video and THREE faceFollowers poses:
    // @ts-ignore
    JeelizThreeFiberHelper.update(detectStates, _threeFiber.camera);

    // render the video texture on the faceFilter canvas:
    JEELIZFACEFILTER.render_video();

    // get expressions factors:
    detectStates.forEach((detectState: any, faceIndex: any) => {
      const expr = detectState.expressions;

      expressions[faceIndex] = {
        // expressions depends on the neural net model
        mouthOpen: expr[0],
        mouthSmile: expr[1],

        eyebrowFrown: expr[2], // not used here
        eyebrowRaised: expr[3], // not used here
      };
    });
  };

  const callbackDetect = (faceIndex: any, isDetected: any) => {
    if (isDetected) {
      console.log("DETECTED");
    } else {
      console.log("LOST");
    }
  };

  const callbackReady = (errCode: any, spec: any) => {
    if (errCode) {
      console.log("AN ERROR HAPPENS. ERR =", errCode);
      return;
    }

    console.log("INFO: JEELIZFACEFILTER IS READY");
    // there is only 1 face to track, so 1 face follower:
    JeelizThreeFiberHelper.init(spec, _faceFollowers, callbackDetect);
  };

  useEffect(() => {
    JEELIZFACEFILTER.init({
      canvas: faceFilterCanvas.current,
      NNC: NN_4EXPR,
      maxFacesDetected: 1,
      followZRot: true,
      callbackReady: callbackReady,
      callbackTrack: callbackTrack,
    });

    return () => {
      JEELIZFACEFILTER.destroy();
    };
  }, []);

  return (
    <div>
      {/* Canvas managed by three fiber, for AR: */}
      <Canvas
        className="mirrorX"
        style={{
          position: "absolute",
          zIndex: 2,
          width: "400px",
          height: "400px",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        gl={{
          preserveDrawingBuffer: true, // allow image capture
        }}
      >
        <DirtyHook sizing={sizing} />
        <Suspense fallback={null}>
          <FaceFollower
            faceIndex={0}
            expressions={expressions[0]}
            assetUrl={assetUrl}
          />
        </Suspense>
      </Canvas>
      {/* Canvas managed by FaceFilter, just displaying the video (and used for WebGL computations) */}
      <canvas
        className="mirrorX"
        // @ts-ignore
        ref={faceFilterCanvas}
        style={{
          position: "absolute",
          zIndex: 1,
          width: "400px",
          height: "400px",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        width={sizing.width}
        height={sizing.height}
      />
    </div>
  );
};

export default ARFilter;
