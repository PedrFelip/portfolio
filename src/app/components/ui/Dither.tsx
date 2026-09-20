"use client";

import {
  Canvas,
  type ThreeEvent,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { BlendFunction, Effect } from "postprocessing";
import type React from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface DitherProps extends React.HTMLAttributes<HTMLDivElement> {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

const WAVE_VERTEX_SHADER = /* glsl */ `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const WAVE_FRAGMENT_SHADER = /* glsl */ `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fadeXY = fade(Pf.xy);
  vec2 nX = mix(vec2(n00, n01), vec2(n10, n11), fadeXY.x);
  return 2.3 * mix(nX.x, nX.y, fadeXY.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float value = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    value -= 0.5 * effect;
  }
  vec3 color = mix(backgroundColor, waveColor, clamp(value, 0.0, 1.0));
  gl_FragColor = vec4(color, 1.0);
}
`;

const DITHER_FRAGMENT_SHADER = /* glsl */ `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0./64.,48./64.,12./64.,60./64.,3./64.,51./64.,15./64.,63./64.,
  32./64.,16./64.,44./64.,28./64.,35./64.,19./64.,47./64.,31./64.,
  8./64.,56./64.,4./64.,52./64.,11./64.,59./64.,7./64.,55./64.,
  40./64.,24./64.,36./64.,20./64.,43./64.,27./64.,39./64.,23./64.,
  2./64.,50./64.,14./64.,62./64.,1./64.,49./64.,13./64.,61./64.,
  34./64.,18./64.,46./64.,30./64.,33./64.,17./64.,45./64.,29./64.,
  10./64.,58./64.,6./64.,54./64.,9./64.,57./64.,5./64.,53./64.,
  42./64.,26./64.,38./64.,22./64.,41./64.,25./64.,37./64.,21./64.
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 coord = floor(uv * resolution / pixelSize);
  int x = int(mod(coord.x, 8.0));
  int y = int(mod(coord.y, 8.0));
  color += (bayerMatrix8x8[y * 8 + x] - 0.25) * (1.0 / (colorNum - 1.0));
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float bias = mix(0.2, 0.0, smoothstep(0.45, 0.8, luminance));
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 pixel = pixelSize / resolution;
  vec4 color = texture2D(inputBuffer, pixel * floor(uv / pixel));
  outputColor = vec4(dither(uv, color.rgb), color.a);
}
`;

class RetroEffectImpl extends Effect {
  constructor() {
    const uniforms = new Map([
      ["colorNum", new THREE.Uniform(4)],
      ["pixelSize", new THREE.Uniform(2)],
    ]);
    super("RetroEffect", DITHER_FRAGMENT_SHADER, {
      blendFunction: BlendFunction.NORMAL,
      uniforms,
    });
  }

  set colorNum(value: number) {
    const uniform = this.uniforms.get("colorNum");
    if (uniform) uniform.value = value;
  }

  set pixelSize(value: number) {
    const uniform = this.uniforms.get("pixelSize");
    if (uniform) uniform.value = value;
  }
}

const WrappedRetroEffect = wrapEffect(RetroEffectImpl);
const WrappedRetroEffectComponent =
  WrappedRetroEffect as unknown as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<{ colorNum: number; pixelSize: number }> &
      React.RefAttributes<RetroEffectImpl>
  >;

const RetroEffect = forwardRef<
  RetroEffectImpl,
  { colorNum: number; pixelSize: number }
>(function RetroEffect({ colorNum, pixelSize }, ref) {
  return (
    <WrappedRetroEffectComponent
      ref={ref}
      colorNum={colorNum}
      pixelSize={pixelSize}
    />
  );
});

interface DitheredWavesProps
  extends Required<
    Pick<
      DitherProps,
      | "backgroundColor"
      | "colorNum"
      | "disableAnimation"
      | "enableMouseInteraction"
      | "mouseRadius"
      | "pixelSize"
      | "waveAmplitude"
      | "waveColor"
      | "waveFrequency"
      | "waveSpeed"
    >
  > {}

function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  backgroundColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius,
}: DitheredWavesProps): React.JSX.Element {
  const { gl, size, viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const uniformsRef = useRef({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2()),
    waveSpeed: new THREE.Uniform(waveSpeed),
    waveFrequency: new THREE.Uniform(waveFrequency),
    waveAmplitude: new THREE.Uniform(waveAmplitude),
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
    backgroundColor: new THREE.Uniform(new THREE.Color(...backgroundColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2()),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius),
  });

  useEffect(() => {
    const ratio = gl.getPixelRatio();
    uniformsRef.current.resolution.value.set(
      Math.floor(size.width * ratio),
      Math.floor(size.height * ratio),
    );
  }, [gl, size]);

  useFrame((_, delta) => {
    // Fiber copies uniform wrappers when applying props. Update the material
    // actually rendered, rather than the initialization object's scalar values.
    const uniforms = materialRef.current?.uniforms;
    if (!uniforms) return;
    if (!disableAnimation) uniforms.time.value += delta;
    uniforms.waveSpeed.value = waveSpeed;
    uniforms.waveFrequency.value = waveFrequency;
    uniforms.waveAmplitude.value = waveAmplitude;
    uniforms.waveColor.value.set(...waveColor);
    uniforms.backgroundColor.value.set(...backgroundColor);
    uniforms.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    uniforms.mouseRadius.value = mouseRadius;
    if (enableMouseInteraction) {
      uniforms.mousePos.value.copy(mouseRef.current);
    }
  });

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const ratio = gl.getPixelRatio();
    mouseRef.current.set(
      (event.clientX - rect.left) * ratio,
      (event.clientY - rect.top) * ratio,
    );
  };

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={materialRef}
          fragmentShader={WAVE_FRAGMENT_SHADER}
          uniforms={uniformsRef.current}
          vertexShader={WAVE_VERTEX_SHADER}
        />
      </mesh>
      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>
      <mesh
        onPointerMove={handlePointerMove}
        position={[0, 0, 0.01]}
        scale={[viewport.width, viewport.height, 1]}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
    </>
  );
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  backgroundColor = [0, 0, 0],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
  className,
  style,
  ...props
}: DitherProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px 0px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      style={style}
      {...props}
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 6] }}
        dpr={1}
        frameloop={isVisible ? "always" : "demand"}
        gl={{ antialias: true }}
      >
        <DitheredWaves
          backgroundColor={backgroundColor}
          colorNum={colorNum}
          disableAnimation={disableAnimation || !isVisible}
          enableMouseInteraction={enableMouseInteraction}
          mouseRadius={mouseRadius}
          pixelSize={pixelSize}
          waveAmplitude={waveAmplitude}
          waveColor={waveColor}
          waveFrequency={waveFrequency}
          waveSpeed={waveSpeed}
        />
      </Canvas>
    </div>
  );
}
