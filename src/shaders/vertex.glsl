uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;
varying vec4 vTexture;

void main()
{
    vTexture = texture2D(uTexture, uv);
    
    vec4 modelPosition = instanceMatrix * vec4(position, 1.0);

    // elevation
    float elevation = abs(- sin(position.x) * sin(uTime * 0.01) ) ;


    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    modelPosition.x += elevation;
    // modelPosition.z += length(vTexture.xyz) * 1.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition ;

    // Varying
    vUv = uv;
}