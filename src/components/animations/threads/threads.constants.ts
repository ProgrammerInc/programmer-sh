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
  WITH_STARS: true,
  /** Default audio reactivity setting */
  ENABLE_AUDIO_REACTIVITY: false
};

/**
 * Audio reactivity settings
 */
export const AUDIO_SETTINGS = {
  /** Bass influence on amplitude (0-1) */
  BASS_AMPLITUDE_INFLUENCE: 1.2,
  /** Mid frequency influence on line width (0-1) */
  MID_WIDTH_INFLUENCE: 0.8,
  /** Treble influence on line distance (0-1) */
  TREBLE_DISTANCE_INFLUENCE: 0.7,
  /** Volume influence on color brightness (0-1) */
  VOLUME_BRIGHTNESS_INFLUENCE: 1.0
};

/**
 * Shader constants
 */
export const SHADER_SETTINGS = {
  /** Number of thread lines to render */
  LINE_COUNT: 60,
  /** Width of each thread line */
  LINE_WIDTH: 8.0,
  /** Blur amount for thread lines */
  LINE_BLUR: 12.0,
  /** PI constant for shader calculations */
  PI: 3.1415926538,
  /** Mouse movement smoothing factor */
  MOUSE_SMOOTHING: 0.08
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
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;
  uniform float uVolume;

  #define PI 3.1415926538

  const int u_line_count = 60;
  const float u_line_width = 8.0;
  const float u_line_blur = 12.0;

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
      
      // Adjust amplitude with bass audio reactivity
      float amplitude_normal = smoothstep(split_point, 0.7, st.x);
      float amplitude_strength = 0.5;
      // Combine uAmplitude with uBass for audio reactivity
      float combined_amplitude = uAmplitude * (1.0 + uBass * 0.6);
      float amplitude = amplitude_normal * amplitude_strength * combined_amplitude * (1.0 + (uMouse.y - 0.5) * 0.2);

      // Adjust time modulation with mid frequencies
      float time_scaled = iTime / 10.0 + (uMouse.x - 0.5) * 1.0 + uMid * 0.3;
      
      // Adjust blur with treble
      float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc * (1.0 + uTreble * 0.2);

      float xnoise = mix(
          Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
          Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
          st.x * 0.3
      );

      // Add audio reactivity to positioning
      float audio_movement = uBass * 0.2 + uMid * 0.05 + uTreble * 0.02;
      float y = 0.5 + (perc - 0.5) * (uDistance + uTreble * 0.2) + xnoise / 2.0 * amplitude + sin(iTime + perc * 6.28) * audio_movement;

      // Adjust line width with mid frequencies
      float line_width_mod = width * (1.0 + uMid * 0.4);
      float line_blur_mod = u_line_blur * (1.0 + uTreble * 0.3);

      float line_start = smoothstep(
          y + (line_width_mod / 2.0) + (line_blur_mod * pixel(1.0, iResolution.xy) * blur),
          y,
          st.y
      );
          
      float line_end = smoothstep(
          y,
          y - (line_width_mod / 2.0) - (line_blur_mod * pixel(1.0, iResolution.xy) * blur),
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
      // Adjust color intensity based on volume
      vec3 final_color = uColor * color * (1.0 + uVolume * 0.5);
      fragColor = vec4(final_color, color);
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
  CANVAS: 'threads-canvas',
  /** Audio controls class */
  AUDIO_CONTROLS: 'threads-audio-controls'
};
