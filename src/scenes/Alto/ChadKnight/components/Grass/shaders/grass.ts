import { Texture, Vector2, Vector3 } from "three";

export const grassUniforms = (grassTex: Texture) => {
  return {
    grassTex: { value: grassTex },
    uvScale: { value: new Vector2(1, 1) },
    globalTime: { value: 0 },
    color: { value: new Vector3(0.43, 0.65, 0.47) },
  };
};

export const grassVert = `
      uniform vec2 uvScale;
      uniform float globalTime;
      varying vec3 absPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      
      float magnitude = 0.5;
      
      void main() {
        vNormal = (modelMatrix * instanceMatrix * vec4(normal, 0.0)).xyz;
        vec4 pos = instanceMatrix * vec4(position, 1.0);
        vUv = uvScale * uv;

        float noised = 1.0; //noise(pos.xy);
        if(vUv.t > 0.4) {
          pos.y += 0.05 * sin(globalTime * magnitude * noised + pos.x + pos.y);
          pos.z += 0.05 * sin(globalTime * magnitude * noised + pos.x + pos.y);
          pos.x += 0.05 * sin(globalTime * magnitude * noised + pos.x + pos.y);
        }
        
        vec4 mvPosition = modelViewMatrix * vec4( pos );
        gl_Position = projectionMatrix * mvPosition;
      }
`;

export const grassFrag = `
      uniform sampler2D grassTex;
      uniform vec2 uvScale;
      varying vec2 vUv;
      uniform vec3 color;
  
      void main() {
        const float threshold = 0.05;
        vec4 textureColor = texture2D(grassTex, vec2(vUv.s, vUv.t));
        
        // gradient from color1 to color2 going upward
        vec3 color1 = vec3(0.43, 0.65, 0.47);
        vec3 color2 = vec3(0.56, 0.75, 0.59);
        vec3 colorF = mix(color1, color2, vUv.t);
        
        if (textureColor.w < threshold) {
            discard;
        } else {
            gl_FragColor = vec4(color, 1.0);
        }
      }
`;
