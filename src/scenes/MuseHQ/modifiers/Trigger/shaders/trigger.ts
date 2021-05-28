export const uniforms = `
    varying vec3 pos;
    uniform float time;
    uniform float glow;
    uniform float seed;
`;

export const vert = `
    #include <begin_vertex>
    pos = (modelMatrix * vec4(position, 1.0)).xyz;
`;

// shine is #c999b5
export const frag = `
    #include <dithering_fragment>
    float seed_offset = seed * 55.;
    float pos_offset = (pos.x + pos.y + pos.z + seed_offset) / 8.5;
    
    // make sure pow is even
    float shine = pow( sin( seed_offset + pos_offset + time / ( 2.5 + 1.7 * seed ) ), 1000. + seed * 343. ); 
    
    vec3 shine_color = vec3(0.788,0.6,0.71);
    
    vec3 shine_offset = 0.45 * shine * shine_color;
    vec3 glow_offset = 0.45 * glow * shine_color;
    
    float a = (0.4 * shine + 0.35 * glow);
    
    gl_FragColor = vec4( saturate( gl_FragColor.rgb + shine_offset + glow_offset ), a );
`;
