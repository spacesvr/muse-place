import { Vector2 } from "three";
import { extend } from "react-three-fiber";
// @ts-ignore
import glsl from "babel-plugin-glsl/macro";
import { shaderMaterial } from "@react-three/drei";

const RainbowMaterial = shaderMaterial(
  {
    resolution: new Vector2(1000, 1000),
    time: 0,
  },
  glsl`
  varying vec3 vUv;
  void main() {
    vUv = position;
    gl_Position = projectionMatrix 
      * modelViewMatrix
      * vec4( position, 1.0 );
  }`,
  glsl`
  varying vec2 vUv;
  uniform float time;
  uniform vec2 resolution;
  
  #define R resolution
  #define T (time/7.)
  
  void main() {
    vec2 p = gl_FragCoord.xy;
    vec4 k = gl_FragColor;
    #define rot(p,a) vec2 sc=sin(vec2(a,a+1.6)); p*=mat2(sc.y,-sc.x,sc);

    #define A vec3(0,1,157)
    #define B {vec2 m=fract(p),l=dot(p-m,A.yz)+A.xz,r=mix(fract(57.*sin(l++)),fract(57.*sin(l)),(m*=m*(3.-m-m)).x);k+=mix(r.x,r.y,m.y)/(s+=s);p*=mat2(1,1,1,-1);}

    p *= log(T)/R.y;                                              // scaling (slow zoom out)
    p.x += T;                                                     // translation
    rot(p,T/22.);                                                 // slow field rotation

    float s = 1.; k = vec4(0);                                    // init
    B B B B                                                       // unrolled perlin noise see https://www.shadertoy.com/view/lt3GWn

    k += sin(2.*sin(k*22.+T*2.)+p.yxyy-p.yyxy*.5)/12.;            // colour transform
    gl_FragColor = k;  
  }
`
);

export default RainbowMaterial;
