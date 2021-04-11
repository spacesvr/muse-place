//@ts-ignore
import glsl from "babel-plugin-glsl/macro";

export const vert = `
    varying vec2 vUv;

    void main() {
        vec4 pos = vec4(position, 1.0);
        vUv = uv; 
        vec4 mvPosition = modelViewMatrix * vec4( pos );
        gl_Position = projectionMatrix * mvPosition;
    }
`;

export const frag = `
     uniform float borderRadius;
     uniform vec2 dimensions;
     varying vec2 vUv;
     
     #define TL vec2(borderRadius, dimensions.y - borderRadius)
     #define TR vec2(dimensions.x - borderRadius, dimensions.y - borderRadius)
     #define BL vec2(borderRadius, borderRadius)
     #define BR vec2(dimensions.x - borderRadius, borderRadius)
     
     #define IS_TL coords.x < borderRadius && coords.y > dimensions.y - borderRadius
     #define IS_TR coords.x > dimensions.x - borderRadius && coords.y > dimensions.y - borderRadius
     #define IS_BL coords.x < borderRadius && coords.y < borderRadius
     #define IS_BR coords.x > dimensions.x - borderRadius && coords.y < borderRadius
     
     void main () {
        vec2 coords = vUv * dimensions;
        
        bool tl_discard = IS_TL && length(TL - coords) > borderRadius;
        bool tr_discard = IS_TR && length(TR - coords) > borderRadius;
        bool bl_discard = IS_BL && length(BL - coords) > borderRadius;
        bool br_discard = IS_BR && length(BR - coords) > borderRadius;
       
        if ( tl_discard || tr_discard || bl_discard || br_discard)
        {
            discard;
        }
     
        gl_FragColor = vec4(vUv.x * 0.5 + 0.5, 1.0, vUv.y * 0.5 + 0.5, 1.);
     }
`;
