export const vert = `
  uniform float time;
  varying vec3 absPosition;
  varying vec3 vNormal;
  varying vec3 vUv;
  
  float magnitude = 0.5;
  
  void main() {
    vNormal = (modelMatrix  * vec4(normal, 0.0)).xyz;
    vec4 pos = vec4(position, 1.0);
    vUv = position; 

    vec4 mvPosition = modelViewMatrix * vec4( pos );
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const frag = `
    uniform float time;
    uniform float audio[5];
    varying vec3 vUv;
    
    
    const float F2 =  0.3660254;
    const float G2 = -0.2113249;
    
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v) { 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
         // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
    
        // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
    
      //  x0 = x0 - 0. + 0.0 * C 
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1. + 3.0 * C.xxx;
    
        // Permutations
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    
        // Gradients
        // ( N*N points uniformly over a square, mapped onto an octahedron.)
      float n_ = 1.0/7.0; // N=7
      vec3  ns = n_ * D.wyz - D.xzx;
    
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
    
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
    
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
    
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
    
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
    
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
    
        //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
    
        // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }
    
    vec3 rgb2yiq(vec3 color){return color * mat3(0.299,0.587,0.114,0.596,-0.274,-0.321,0.211,-0.523,0.311);}
    vec3 yiq2rgb(vec3 color){return color * mat3(1.,0.956,0.621,1,-0.272,-0.647,1.,-1.107,1.705);}
    
    vec3 convertRGB443quant(vec3 color){ vec3 out0 = mod(color,1./16.); out0.b = mod(color.b, 1./8.); return out0;}
    vec3 convertRGB443(vec3 color){return color-convertRGB443quant(color);}
    
    vec3 sincoscos( float x ){return vec3(sin(x), cos(x), tan(-1.0*x));}
    vec2 rotate2d(vec2 uv, float phi){vec2 t = sincoscos(phi).xy; return vec2(uv.x*t.y-uv.y*t.x, uv.x*t.x+uv.y*t.y);}
    vec3 rotate3d(vec3 p, vec3 v, float phi){ v = normalize(v); vec2 t = sincoscos(-phi).xy; float s = t.x, c = t.y, x =-v.x, y =-v.y, z =-v.z; mat4 M = mat4(x*x*(1.-c)+c,x*y*(1.-c)-z*s,x*z*(1.-c)+y*s,0.,y*x*(1.-c)+z*s,y*y*(1.-c)+c,y*z*(1.-c)-x*s,0.,z*x*(1.-c)-y*s,z*y*(1.-c)+x*s,z*z*(1.-c)+c,0.,0.,0.,0.,1.);return (vec4(p,1.)*M).xyz;}

    float varazslat(vec2 position, float time){
        float color = 0.0;
        float t = 2.*time;
        color += sin(position.x*cos(t/10.0)*20.0 )+cos(position.x*cos(t/15.)*10.0 );
        color += sin(position.y*sin(t/ 5.0)*15.0 )+cos(position.x*sin(t/25.)*20.0 );
        color += sin(position.x*sin(t/10.0)*  .2 )+sin(position.y*sin(t/35.)*10.);
        color *= sin(t/10.)*.5;
        
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
        vec3 uv = vUv; 
        uv = (uv-.5)*2.;
        float modTime = time + 0.3 * audio[0] / 255.0;
       
        vec3 vlsd = vec3(0,1,0);
        vlsd = rotate3d(vlsd, vec3(1.,1.,0.), time);
        vlsd = rotate3d(vlsd, vec3(1.,1.,0.), time);
        vlsd = rotate3d(vlsd, vec3(1.,1.,0.), time);
        
        vec3 
            v0 = 94. * sincoscos(.3457 * time + .3423) - snoise(uv * .917),
            v1 = 94. * sincoscos(.7435 * time + .4565) - snoise(uv * .521), 
            v2 = 94. * sincoscos(.5345 * time + .3434) - snoise(uv * .759);
        
        vec3 color = vec3(dot(uv-v0, vlsd.xyz),dot(uv-v1, vlsd.yxz),dot(uv-v2, vlsd.zxy));
        
        color *= 1.7 + (0.9 +  audio[4] / 255.0 + audio[3] / 255.0)*vec3(
            (16.*snoise(uv+v0) + 8.*snoise((uv+v0)*2.) + 4.*snoise((uv+v0)*4.) + 2.*snoise((uv+v0)*8.) + snoise((v0+uv)*16.))/32.,
            (16.*snoise(uv+v1) + 8.*snoise((uv+v1)*2.) + 4.*snoise((uv+v1)*4.) + 2.*snoise((uv+v1)*8.) + snoise((v1+uv)*16.))/32.,
            (16.*snoise(uv+v2) + 8.*snoise((uv+v2)*2.) + 4.*snoise((uv+v2)*4.) + 2.*snoise((uv+v2)*8.) + snoise((v2+uv)*16.))/32.
        );
        
        color = yiq2rgb(color);
        
        color *= 0.7- .25* vec3(
            varazslat(uv.xy *.25, 0.8 * time + .5),
            varazslat(uv.yz * .7, 0.4 * time + .2),
            varazslat(uv.zx * .4, 0.6 * time + .7)
        );
        
        
        //fragColor = vec4(convertRGB443(color),1.0);
        
        
        color = vec3(1. - pow(color.r, 0.45), 1. - pow(color.g, 0.45), 1. - pow(color.b, 0.45));
        
        float a = snoise(0.01 * uv + (1.3 * vec3(modTime, modTime, modTime))) + 1. / 2.;
        a = pow(a, 1. + 8.0 * audio[1] / 255.0);
        
        vec3 hsv_color = rgb2hsv(color);
        
        hsv_color.x = min(1.0, hsv_color.x * 0.6 +  0.4 * audio[2] / 255.0);
        hsv_color.y = min(1.0, 0.8* hsv_color.y + 0.46 * a);
        hsv_color.z = min(1.0, hsv_color.y + 0.66 * audio[0] / 255.0 + 0.2 * a);
        if(hsv_color.z > 0.8) {
            hsv_color.y = min(1.0, hsv_color.y + 0.5);
        }
        color = hsv2rgb(hsv_color);
        
    
        
        gl_FragColor = vec4(color, 1.0);
    }
`;
