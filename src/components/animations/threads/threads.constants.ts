/**
 * Constants for the Threads animation component
 */

/**
 * Default settings for the Threads component
 */
export const DEFAULT_SETTINGS = {
  /** Default RGB color (white) */
  COLOR: [1, 1, 1] as [number, number, number],
  /** Default amplitude of thread movement */
  AMPLITUDE: 1,
  /** Default distance between threads */
  DISTANCE: 0,
  /** Default mouse interaction setting */
  ENABLE_MOUSE_INTERACTION: false,
  /** Default stars background setting */
  WITH_STARS: true
};

/**
 * Shader constants
 */
export const SHADER_SETTINGS = {
  /** Number of thread lines to render */
  LINE_COUNT: 40,
  /** Width of each thread line */
  LINE_WIDTH: 7.0,
  /** Blur amount for thread lines */
  LINE_BLUR: 10.0,
  /** PI constant for shader calculations */
  PI: 3.1415926538,
  /** Mouse movement smoothing factor */
  MOUSE_SMOOTHING: 0.05
};

/**
 * WebGL settings
 */
export const GL_SETTINGS = {
  /** Clear color RGBA (transparent) */
  CLEAR_COLOR: [0, 0, 0, 0] as [number, number, number, number],
  /** Source blend factor */
  SRC_BLEND: 0x0302, // gl.SRC_ALPHA
  /** Destination blend factor */
  DST_BLEND: 0x0303 // gl.ONE_MINUS_SRC_ALPHA
};

/**
 * Shader source code
 */
export const SHADERS = {
  /** Vertex shader source code */
  VERTEX: `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
  `,

  /** Fragment shader source code */
  FRAGMENT: `
  precision highp float;
  uniform float iTime;
  uniform vec3 iResolution;
  uniform vec3 uColor;
  uniform float uAmplitude;
  uniform float uDistance;
  uniform vec2 uMouse;

  #define PI 3.1415926538

  const int u_line_count = 40;
  const float u_line_width = 7.0;
  const float u_line_blur = 10.0;

  float pixel(float count, vec2 resolution) {
      return 1.0 / max(resolution.x, resolution.y) * count;
  }

  float Perlin2D(vec2 P)
  {
      vec2 Pi = floor(P);
      vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
      vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
      Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
      Pt += vec2(26.0, 161.0).xyxy;
      Pt *= Pt;
      Pt = Pt.xzxz * Pt.yyww;
      vec4 hash_x = fract(Pt * (1.0 / 951.135664));
      vec4 hash_y = fract(Pt * (1.0 / 642.949883));
      vec4 grad_x = hash_x - 0.49999;
      vec4 grad_y = hash_y - 0.49999;
      vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y) * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
      grad_results *= 1.4142135623730950488016887242097;
      vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
      vec4 blend2 = vec4(blend, vec2(1.0 - blend));
      return dot(grad_results, blend2.zxzx * blend2.wwyy);
  }

  float line(vec2 st, float width, float perc, float offset) {
      float split_offset = (perc * 0.4);
      float split_point = 0.1 + split_offset;
      
      float amplitude_normal = smoothstep(split_point, 0.7, st.x);
      float amplitude_strength = 0.5;
      // Reduced modulation intensity (20% influence from mouse Y)
      float amplitude = amplitude_normal * amplitude_strength * uAmplitude * (1.0 + (uMouse.y - 0.5) * 0.2);

      // Reduced time modulation (only 1.0 factor)
      float time_scaled = iTime / 10.0 + (uMouse.x - 0.5) * 1.0;
      
      float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

      float xnoise = mix(
          Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
          Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
          st.x * 0.3
      );

      float y = 0.5 + (perc - 0.5) * uDistance + xnoise / 2.0 * amplitude;

      float line_start = smoothstep(
          y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
          y,
          st.y
      );
          
      float line_end = smoothstep(
          y,
          y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
          st.y
      );
      
      return clamp(
          (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
          0.0,
          1.0
      );
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      vec2 uv = fragCoord / iResolution.xy;
      
      float line_strength = 1.0;

      for (int i = 0; i < u_line_count; i++) {
          line_strength *= (1.0 - line(
              uv,
              u_line_width * pixel(1.0, iResolution.xy) * (1.0 - float(i) / float(u_line_count)),
              float(i) / float(u_line_count),
              (PI * 1.0) * float(i) / float(u_line_count)
          ));
      }
      
      float color = 1.0 - line_strength;
      fragColor = vec4(uColor * color, color);
  }

  void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `
};

/**
 * CSS classes for the Threads component
 */
export const CSS_CLASSES = {
  /** Container class */
  CONTAINER: 'threads-container',
  /** Canvas class */
  CANVAS: 'threads-canvas'
};
