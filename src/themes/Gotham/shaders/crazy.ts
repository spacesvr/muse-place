import { Vector2 } from "three";
import { extend } from "react-three-fiber";

import { shaderMaterial } from "@react-three/drei";

const CrazyMaterial = shaderMaterial(
  {
    resolution: new Vector2(2000, 2000),
    time: 0,
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix 
      * modelViewMatrix 
      * vec4( position, 1.0 );
  }`,
  `
  varying vec2 vUv;
  uniform float time;
  uniform vec2 resolution;
  vec2 Randomise_Fractal = vec2(0.572, 0.432);
  float NUM_SIDES = 3.14567;
  float PI = 3.14159265359;
  
  void koleidoscope(inout vec2 uv)
  {
    float KA = PI / NUM_SIDES;
    // get the angle in radians of the current coords relative to origin (i.e. center of screen)
    float angle = atan (uv.y, uv.x);
    // repeat image over evenly divided rotations around the center
    angle = mod (angle, 2.0 * KA);
    // reflect the image within each subdivision to create a tilelable appearance
    angle = abs (angle - KA);
    // rotate image over time
    angle += 0.2 *time;
    // get the distance of the coords from the uv origin (i.e. center of the screen)
    float d = length(uv); 
    // map the calculated angle to the uv coordinate system at the given distance
    uv = d * vec2(cos(angle), sin(angle));
  }
  
  void main() {
    // vec4 color = texture2D( tDiffuse, vUv );
    
    float KA = PI / NUM_SIDES;
    float time = time * 0.7;
    float scale = 10.0 + 20.0 * sin(time * 0.00008);
    float r1 = 0.4 ; 
    float r2 = 0.9 ; 
    float r3 = 0.29; 
    
    float h = resolution.y;
    float w = resolution.x;
    
    vec2 uv = 12.0*(2.0 * vUv.xy  - 1.0);
    koleidoscope(uv);
    
    float x = uv.x;
    float y = uv.y;

     float col = 
        sin(distance( vec2(x * r1 + time, y * r2), vec2(w / r3 , h) ) * scale) +
        sin(distance( vec2(x, y * r2), vec2(1.0 / h * r3, w * r1) ) * scale) +
        sin(distance( vec2(r3 * x + time, r1 * y + time), vec2(w * r2 + h * r1, h * r2) ) * scale) +
        sin(distance( vec2(1.0 / x * r3 , y * r2), vec2(h, w) ) * scale);    
    
    vec3 color = vec3( 0.5 + 0.5 * sin(col), cos(col * 100.0) * 0.2, cos(col) - sin(col)) + 0.1;
    color += mod(gl_FragColor.x, 2.0) < 1.0 ? 0.0 : 0.4;             

    vec3 p = vec3 (uv.x * 2.0, uv.y, Randomise_Fractal.x);
      for (int i = 0; i < 44; i++)
        p.xzy = vec3(1.1,0.999,0.678)*(abs((abs(p)/dot(p,p)-vec3(1.0,1.02,Randomise_Fractal.y*0.4))));                 
    
    gl_FragColor = vec4(p.x * color.z, p.y * 0.8 * color.y, p.z , 1.0);
  }
`
);

export default CrazyMaterial;
extend({ CrazyMaterial });
