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
     uniform float time;
     uniform float seed;
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
     
     // math
    float mul(vec2 x) { return x.x*x.y; }
    
    mat3 fromEuler(vec3 ang) {
        vec2 a1 = vec2(sin(ang.x),cos(ang.x));
        vec2 a2 = vec2(sin(ang.y),cos(ang.y));
        vec2 a3 = vec2(sin(ang.z),cos(ang.z));
        mat3 m;
        m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x*0.8,a1.y*a2.x*a3.x+a3.y*a1.x*0.8,-a2.y*a3.x*0.8);
        m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
        m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x*0.8,a1.x*a3.x-a1.y*a3.y*a2.x*0.8,a2.y*a3.y*0.8);
        return m;
    }
    bool intersectionRayQuad(vec3 o, vec3 d, vec2 size, out vec3 p) {
        p = o - d * o.z / d.z;
        return bool(mul(step(abs(p.xy),size)));
    }
    
    // color
    float textureHologram(vec2 t, vec3 e) {
        float r = length(t);
        t.x += e.x * 0.2;
        
        float l3 = smoothstep(0.5,0.52,r);
        float l0 = smoothstep(0.98,0.97,r) * l3;
        float l1 = saturate(sin(t.y*40.0)*8.0) * saturate(sin((t.y-t.x)*10.0)*8.0+6.0);
        float l2 = saturate(sin(t.y*160.0)*8.0) * saturate(sin((t.y+t.x)*40.0)*8.0+6.0);
        float l4 = smoothstep(0.42,0.4,r) * smoothstep(0.39,0.399,r);
        float l5 = smoothstep(1.0,0.99,r) * smoothstep(0.97,0.98,r);
        
        float sum = 0.0;
        sum += (1.0-l3) * 0.5;
        sum += l1 * l0;
        sum += l2 * l0 * (1.0 - l1) * 0.2;
        sum += l4 * 0.5;
        sum += l5;
        return 0.08;
    }
    
    
    // based on iq's https://www.shadertoy.com/view/MsS3Wc
    vec3 hologram(vec2 p, float sum) {
        vec3 hue = clamp(abs(mod(p.y*0.15*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0); 
        vec3 gray = vec3(1.8);
        float sat = (cos(p.y)*0.5+0.5) * (0.2+sum*0.8);
        return mix(gray,hue,sat);
    }
    
    vec3 getObjectColor(vec3 p, vec3 n, vec3 e) {
        float sum = textureHologram(p.xy,e);
        
        // vec
        vec2 d = p.xy + (sum * 2.0 - 1.0);
        d += dot(e,n) * 5.5;
            
        // get holo color
        float bright = saturate(0.6 + sum * 0.4);
        vec3 color = hologram(d,sum) * bright;
        color *= pow(max(dot(e,-n),0.0),0.6);
                
        // reflection
        vec3 refl = reflect(e,n) + sum * 0.1; 
        //vec3 color_refl = texture(iChannel0,refl).xyz;
        //color = mix(color,color_refl,(1.0 - sum) * 0.2);    
            
        // lighting
        n.xz += (sum * 2.0 - 1.0) * 0.6;
        color += pow(max(dot(e,-normalize(n)),0.0), 20.0) * 0.6;
            
        return color;    
    }
    
    vec3 rgb2hsv(vec3 c)
    {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
    }
    
    vec3 hsv2rgb(vec3 c)
    {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
     
     void main () {
        vec2 coords = vUv * dimensions;
        
        bool tl_discard = IS_TL && length(TL - coords) > borderRadius;
        bool tr_discard = IS_TR && length(TR - coords) > borderRadius;
        bool bl_discard = IS_BL && length(BL - coords) > borderRadius;
        bool br_discard = IS_BR && length(BR - coords) > borderRadius;
       
        if ( tl_discard || tr_discard || bl_discard || br_discard) {
            discard;
        }
        
        float iTime = time * 0.7 * (1. + seed * 0.3) + seed * 100.;
        vec3 ang = vec3(0.0,sin(iTime + seed * 50.)*0.05,cos(iTime*1.5 + seed * 50.)*0.75);
        mat3 rot = fromEuler(ang/2.0);
        
        vec3 ori = vec3(0.0,0.0,10.0);
        vec3 dir = normalize(vec3(vUv.x, -vUv.y,-2.0));    
        ori = ori * rot;
        dir = dir * rot;
        
        vec3 p;
        vec3 color = vec3(0.0);
        if(intersectionRayQuad(ori*1.2,dir,vec2(200.0),p))
            color = getObjectColor(p,vec3(0.,0.,1.),dir);
            
        color = rgb2hsv(color);
        color.y *= 0.7;
        color.y *= 0.9;
        color = hsv2rgb(color);
     
        gl_FragColor = vec4(color, 1.);
     }
`;
