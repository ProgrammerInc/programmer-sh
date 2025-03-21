/**
 * Custom hooks for the Threads animation component
 */

import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import { RefObject, useEffect, useRef } from 'react';
import { 
  SHADERS, 
  SHADER_SETTINGS, 
  AUDIO_SETTINGS, 
  DEFAULT_SETTINGS, 
  GL_SETTINGS 
} from './threads.constants';
import { AudioAnalyzerOptions, AudioData } from './threads.audio';
import { useAudioAnalyzer } from './threads.audio';
import {
  createFloat32Array,
  getNormalizedMousePosition,
  smoothMouseMovement
} from './threads.utils';

/**
 * Interface for objects with a remove method
 */
interface Removable {
  remove: () => void;
  [key: string]: unknown;
}

/**
 * Type guard to check if an object has a remove method
 *
 * @param obj - Object to check
 * @returns True if the object has a remove method
 */
function isRemovable(obj: unknown): obj is Removable {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'remove' in obj &&
    typeof (obj as Removable).remove === 'function'
  );
}

/**
 * Hook to setup and run the threads WebGL animation
 *
 * @param containerRef - Reference to the container element
 * @param color - RGB color array for threads
 * @param amplitude - Amplitude of thread movement
 * @param distance - Distance between threads
 * @param enableMouseInteraction - Whether to enable mouse interaction
 * @param audioOptions - Audio analyzer options for sound reactivity
 * @param externalAudioData - External audio data for controlled usage
 * @returns Animation frame ID reference for cleanup
 */
export const useThreadsAnimation = (
  containerRef: RefObject<HTMLDivElement>,
  color: [number, number, number] = DEFAULT_SETTINGS.COLOR,
  amplitude: number = DEFAULT_SETTINGS.AMPLITUDE,
  distance: number = DEFAULT_SETTINGS.DISTANCE,
  enableMouseInteraction: boolean = DEFAULT_SETTINGS.ENABLE_MOUSE_INTERACTION,
  audioOptions?: AudioAnalyzerOptions,
  externalAudioData?: AudioData
) => {
  const animationFrameId = useRef<number>();

  // Use the audio analyzer hook if audio options are provided
  const { audioData, startAudioAnalysis, stopAudioAnalysis } = useAudioAnalyzer({
    ...(audioOptions || {}),
    enabled: audioOptions?.enabled, // Use the provided enabled state
    audioSource: 'mic', // Default to microphone
    sensitivity: 2.5 // Increase sensitivity for better responsiveness
  });
  
  // Use external audio data if provided, otherwise use the internal analyzer
  const currentAudioData = externalAudioData || audioData;

  useEffect(() => {
    // Start audio analysis when component mounts if explicitly enabled
    if (audioOptions?.enabled) {
      startAudioAnalysis();
    }

    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create renderer
    const renderer = new Renderer({
      dpr: window.devicePixelRatio,
      alpha: true
    });

    // Create WebGL context and renderer
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    // Setup WebGL context
    gl.enable(gl.BLEND);
    gl.blendFunc(GL_SETTINGS.SRC_BLEND, GL_SETTINGS.DST_BLEND);
    container.appendChild(gl.canvas);

    // Create geometry and program
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: SHADERS.VERTEX,
      fragment: SHADERS.FRAGMENT,
      transparent: true,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: createFloat32Array([0.5, 0.5]) },
        // Add audio-related uniforms
        uBass: { value: 0 },
        uMid: { value: 0 },
        uTreble: { value: 0 },
        uVolume: { value: 0 },
        // Line-related uniforms
        uLineWidth: { value: SHADER_SETTINGS.LINE_WIDTH },
        uLineBlur: { value: SHADER_SETTINGS.LINE_BLUR },
        uLineCount: { value: SHADER_SETTINGS.LINE_COUNT }
      }
    });

    // Create mesh
    const mesh = new Mesh(gl, { geometry, program });

    // Handle resize
    function resize() {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value = new Color(
        clientWidth,
        clientHeight,
        clientWidth / clientHeight
      );
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking variables
    const currentMouse: [number, number] = [0.5, 0.5];
    let targetMouse: [number, number] = [0.5, 0.5];

    // Mouse event handlers
    function handleMouseMove(e: MouseEvent) {
      targetMouse = getNormalizedMousePosition(e, container);
    }

    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }

    // Add mouse event listeners if interaction is enabled
    if (enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    function update(t: number) {
      if (enableMouseInteraction) {
        // Smooth mouse movement
        const updatedPosition = smoothMouseMovement(
          currentMouse,
          targetMouse,
          SHADER_SETTINGS.MOUSE_SMOOTHING
        );
        currentMouse[0] = updatedPosition[0];
        currentMouse[1] = updatedPosition[1];
        program.uniforms.uMouse.value = createFloat32Array(currentMouse);
      }

      // Update audio uniforms if audio data exists
      if (audioOptions?.enabled || externalAudioData) {
        const { 
          BASS_AMPLITUDE_INFLUENCE, 
          MID_WIDTH_INFLUENCE, 
          TREBLE_DISTANCE_INFLUENCE, 
          VOLUME_BRIGHTNESS_INFLUENCE 
        } = AUDIO_SETTINGS;

        const baseAmplitude = amplitude;
        const baseWidth = SHADER_SETTINGS.LINE_WIDTH;
        const baseDistance = distance;
        const baseColor = [...color];

        const bassInfluence = Math.pow(currentAudioData.bass, 1.5); 
        const midInfluence = Math.pow(currentAudioData.mid, 1.3);
        const trebleInfluence = currentAudioData.treble;
        const volumeInfluence = Math.pow(currentAudioData.volume, 1.2);

        // Update audio-specific uniforms
        program.uniforms.uBass.value = bassInfluence * BASS_AMPLITUDE_INFLUENCE;
        program.uniforms.uMid.value = midInfluence * MID_WIDTH_INFLUENCE;
        program.uniforms.uTreble.value = trebleInfluence * TREBLE_DISTANCE_INFLUENCE;
        program.uniforms.uVolume.value = volumeInfluence * VOLUME_BRIGHTNESS_INFLUENCE;

        // Calculate audio-influenced values
        const audioAmplitude = baseAmplitude + bassInfluence * BASS_AMPLITUDE_INFLUENCE * 2;
        const audioLineWidth = baseWidth + midInfluence * MID_WIDTH_INFLUENCE * 5;
        const audioDistance = baseDistance + trebleInfluence * TREBLE_DISTANCE_INFLUENCE * 0.2;
        
        const pulse = 1.0 + volumeInfluence * 0.3 * Math.sin(t * 2.0);
        
        const brightness = 1.0 + volumeInfluence * VOLUME_BRIGHTNESS_INFLUENCE;
        const audioColor: [number, number, number] = [
          Math.min(baseColor[0] * brightness, 1.5),
          Math.min(baseColor[1] * brightness, 1.5),
          Math.min(baseColor[2] * brightness, 1.5)
        ];

        // Update time and standard uniforms
        program.uniforms.iTime.value = t * 0.001;
        program.uniforms.uMouse.value = currentMouse;
        program.uniforms.uAmplitude.value = audioAmplitude * pulse;
        program.uniforms.uDistance.value = audioDistance;
        program.uniforms.uColor.value = audioColor;
        program.uniforms.uLineWidth.value = audioLineWidth;
      } else {
        // Update standard uniforms without audio influence
        program.uniforms.iTime.value = t * 0.001;
        program.uniforms.uMouse.value = currentMouse;
        program.uniforms.uAmplitude.value = amplitude;
        program.uniforms.uDistance.value = distance;
        program.uniforms.uColor.value = color;
        program.uniforms.uLineWidth.value = SHADER_SETTINGS.LINE_WIDTH;
        program.uniforms.uLineBlur.value = SHADER_SETTINGS.LINE_BLUR;
        program.uniforms.uLineCount.value = SHADER_SETTINGS.LINE_COUNT;
      }

      // Render the scene
      renderer.render({ scene: mesh });

      // Request next frame
      animationFrameId.current = requestAnimationFrame(update);
    }

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(update);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      container.removeChild(gl.canvas);
      // Dispose of WebGL resources
      program.remove();
      geometry.remove();

      // Use type-safe approach to handle mesh cleanup
      if (isRemovable(mesh)) {
        mesh.remove();
      } else {
        // Fallback cleanup if remove is not available
        mesh.geometry = null;
        mesh.program = null;
      }

      // Stop audio analysis
      stopAudioAnalysis();

      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [containerRef, color, amplitude, distance, enableMouseInteraction, audioOptions, externalAudioData, currentAudioData, startAudioAnalysis, stopAudioAnalysis]);

  return animationFrameId;
};
