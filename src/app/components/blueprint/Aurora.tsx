"use client";

import { useReducedMotion } from "framer-motion";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";

// Accent-blue palette derived from --accent (oklch(0.66 0.1 220)).
const DEFAULT_COLOR_STOPS = ["#08161c", "#3ba0bc", "#08161c"];
const DEFAULT_GLOW = "#7fcbdf";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStopsA[3];
uniform vec3 uColorStopsB[3];
uniform float uPaletteMix;
uniform vec2 uResolution;
uniform float uBlend;
uniform vec2 uMouse;
uniform vec3 uGlowColor;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  vec3 c0 = mix(uColorStopsA[0], uColorStopsB[0], uPaletteMix);
  vec3 c1 = mix(uColorStopsA[1], uColorStopsB[1], uPaletteMix);
  vec3 c2 = mix(uColorStopsA[2], uColorStopsB[2], uPaletteMix);

  ColorStop colors[3];
  colors[0] = ColorStop(c0, 0.0);
  colors[1] = ColorStop(c1, 0.5);
  colors[2] = ColorStop(c2, 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 3.5 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;

  // Cursor effect (glow) — works even if auroraAlpha is zero
  vec2 mouseUV = uMouse / uResolution;
  float dist = distance(uv, mouseUV);
  float cursorEffect = smoothstep(0.6, 0.0, dist);

  vec3 finalColor = mix(auroraColor, uGlowColor, cursorEffect * 0.3);
  float finalAlpha = max(auroraAlpha, cursorEffect * 0.5);

  fragColor = vec4(finalColor, finalAlpha);
}
`;

function parseColor(hex: string): number[] {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
}

function parseColorStops(stops: string[]): number[][] {
  return stops.map((hex) => {
    const c = new Color(hex);
    return [c.r, c.g, c.b];
  });
}

interface AuroraProps {
  colorStops?: string[];
  glowColor?: string;
  amplitude?: number;
  blend?: number;
  speed?: number;
}

export function Aurora({
  colorStops = DEFAULT_COLOR_STOPS,
  glowColor = DEFAULT_GLOW,
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
}: AuroraProps) {
  const shouldReduce = useReducedMotion();
  const ctnDom = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const propsRef = useRef({ speed, amplitude, blend });
  propsRef.current = { speed, amplitude, blend };

  const parsedStopsRef = useRef<number[][]>(parseColorStops(colorStops));
  const glowRef = useRef<number[]>(parseColor(glowColor));

  useEffect(() => {
    parsedStopsRef.current = parseColorStops(colorStops);
  }, [colorStops]);

  useEffect(() => {
    glowRef.current = parseColor(glowColor);
  }, [glowColor]);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" },
    );
    observer.observe(ctn);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduce) return;
    const ctn = ctnDom.current;
    if (!ctn || !isVisible) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    let program: Program | undefined;

    const resize = () => {
      if (!ctn) return;
      const width = Math.max(ctn.offsetWidth, 1);
      const height = Math.max(ctn.offsetHeight, 1);
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    };

    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStopsA: { value: parsedStopsRef.current },
        uColorStopsB: { value: parsedStopsRef.current },
        uPaletteMix: { value: 0 },
        uGlowColor: { value: glowRef.current },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
        uMouse: { value: [0, 0] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!ctn) return;
      const rect = ctn.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = rect.height - (e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let raf = 0;
    const update = (t: number) => {
      raf = requestAnimationFrame(update);
      if (!program) return;
      program.uniforms.uTime.value = t * 0.001 * propsRef.current.speed;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude;
      program.uniforms.uBlend.value = propsRef.current.blend;
      program.uniforms.uColorStopsA.value = parsedStopsRef.current;
      program.uniforms.uColorStopsB.value = parsedStopsRef.current;
      program.uniforms.uGlowColor.value = glowRef.current;
      program.uniforms.uMouse.value = [mouse.current.x, mouse.current.y];
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [isVisible, shouldReduce, amplitude, blend]);

  return <div ref={ctnDom} className="absolute inset-0" aria-hidden />;
}
