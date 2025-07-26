/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";
import "./Dither.css";

// Your existing wave shaders
const waveVertexShader = `...`;
const waveFragmentShader = `...`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
uniform vec2 resolution;
uniform sampler2D inputBuffer;

const float bayerMatrix8x8[64] = float[64](
  /* your 8×8 Bayer matrix values */
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  color = clamp(color, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 inputColor = texture2D(inputBuffer, uvPixel);

  // fallback if sampling fails
  if (inputColor.a == 0.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec4 color = inputColor;
  color.rgb = dither(uvPixel, color.rgb);
  gl_FragColor = color;
}
`;

class RetrofitDitherEffect extends Effect {
  constructor() {
    const uniforms = new Map([
      ["colorNum", new THREE.Uniform(4.0)],
      ["pixelSize", new THREE.Uniform(2.0)],
      ["resolution", new THREE.Uniform(new THREE.Vector2(1, 1))]
    ]);
    super("RetroDither", ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }

  update(renderer) {
    const sz = renderer.getSize(new THREE.Vector2());
    this.uniforms.get("resolution").value.set(sz.x, sz.y);
    // debug log
    console.log("updated resolution:", sz.x, sz.y);
  }
}

const WrappedDitherEffect = wrapEffect(RetrofitDitherEffect);

const RetroEffect = forwardRef(({ colorNum, pixelSize }, ref) => (
  <WrappedDitherEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} />
));
RetroEffect.displayName = "RetroEffect";

function DitheredWaves({
  waveSpeed, waveFrequency, waveAmplitude, waveColor,
  colorNum, pixelSize, disableAnimation, enableMouseInteraction, mouseRadius
}) {
  const mesh = useRef();
  const mouseRef = useRef(new THREE.Vector2());
  const { viewport, size, gl } = useThree();

  const uniforms = useRef({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
    waveSpeed: new THREE.Uniform(waveSpeed),
    waveFrequency: new THREE.Uniform(waveFrequency),
    waveAmplitude: new THREE.Uniform(waveAmplitude),
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius),
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    const w = Math.floor(size.width * dpr);
    const h = Math.floor(size.height * dpr);
    uniforms.current.resolution.value.set(w, h);
    console.log("wave resolution:", w, h);
  }, [size, gl]);

  const prevColor = useRef([...waveColor]);
  useFrame(({ clock }) => {
    const u = uniforms.current;
    if (!disableAnimation) u.time.value = clock.getElapsedTime();
    u.waveSpeed.value = waveSpeed;
    u.waveFrequency.value = waveFrequency;
    u.waveAmplitude.value = waveAmplitude;
    if (!prevColor.current.every((v, i) => v === waveColor[i])) {
      u.waveColor.value.set(...waveColor);
      prevColor.current = [...waveColor];
    }
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;
    if (enableMouseInteraction) {
      u.mousePos.value.copy(mouseRef.current);
    }
  });

  const handlePointerMove = e => {
    if (!enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
  };

  return (
    <>
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={waveVertexShader} fragmentShader={waveFragmentShader} uniforms={uniforms.current} />
      </mesh>
      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>
      <mesh onPointerMove={handlePointerMove} position={[0, 0, 0.01]} scale={[viewport.width, viewport.height, 1]} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

export default function Dither(props) {
  return (
    <Canvas className="dither-container" camera={{ position: [0, 0, 6] }} dpr={window.devicePixelRatio || 1}>
      <DitheredWaves {...props} />
    </Canvas>
  );
}
