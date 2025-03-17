/**
 * Constants for the Meta Balls animation component
 */

/** Default color for the metaballs */
export const DEFAULT_COLOR = '#ffffff';

/** Default animation speed */
export const DEFAULT_SPEED = 0.3;

/** Default mouse interaction setting */
export const DEFAULT_ENABLE_MOUSE_INTERACTION = true;

/** Default hover smoothness factor */
export const DEFAULT_HOVER_SMOOTHNESS = 0.05;

/** Default animation size relative to screen */
export const DEFAULT_ANIMATION_SIZE = 30;

/** Default number of metaballs */
export const DEFAULT_BALL_COUNT = 15;

/** Default clumping factor */
export const DEFAULT_CLUMP_FACTOR = 1;

/** Default cursor ball size */
export const DEFAULT_CURSOR_BALL_SIZE = 3;

/** Default cursor ball color */
export const DEFAULT_CURSOR_BALL_COLOR = '#ffffff';

/** Default transparency setting */
export const DEFAULT_ENABLE_TRANSPARENCY = false;

/** Default device pixel ratio */
export const DEFAULT_DPR = 1;

/** Default alpha value for renderer */
export const DEFAULT_ALPHA = true;

/** Default premultiplied alpha setting */
export const DEFAULT_PREMULTIPLIED_ALPHA = false;

/** Maximum number of metaballs supported by shader */
export const MAX_METABALLS = 50;

/** Camera frustum settings */
export const DEFAULT_CAMERA_SETTINGS = {
  left: -1,
  right: 1,
  top: 1,
  bottom: -1,
  near: 0.1,
  far: 10
};

/** Default camera z-position */
export const DEFAULT_CAMERA_Z_POSITION = 1;

/** Default minimum angle factor for ball animation */
export const MIN_ANGLE_FACTOR = 0.1 * Math.PI;

/** Default maximum angle factor for ball animation */
export const MAX_ANGLE_FACTOR = 0.4 * Math.PI;

/** Default minimum base scale for metaballs */
export const MIN_BASE_SCALE = 5.0;

/** Default maximum base scale for metaballs */
export const MAX_BASE_SCALE = 10.0;

/** Default minimum radius for metaballs */
export const MIN_RADIUS = 0.5;

/** Default maximum radius for metaballs */
export const MAX_RADIUS = 2.0;

/** Default cursor orbit radius factor (when cursor is outside container) */
export const DEFAULT_CURSOR_ORBIT_FACTOR = 0.15;

/**
 * WebGL Vertex Shader for metaballs
 */
export const VERTEX_SHADER = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}`;

/**
 * WebGL Fragment Shader for metaballs
 */
export const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50]; // Precomputed: xy = position, z = radius
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
const float PI = 3.14159265359;
 
float getMetaBallValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}
 
void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBallCount) break;
        m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
    }
    float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}`;
