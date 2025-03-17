import { useCallback, useRef } from 'react';
import {
  COLOR_STEP,
  DEFAULT_CHAR_HEIGHT,
  DEFAULT_CHAR_WIDTH,
  DEFAULT_FONT_SIZE,
  UPDATE_FRACTION
} from './letter-glitch.constants';
import { GlitchGrid, GlitchLetter } from './letter-glitch.types';
import {
  calculateGrid,
  getRandomChar,
  getRandomColor,
  hexToRgb,
  interpolateColor
} from './letter-glitch.utils';

/**
 * Custom hook to manage the letter glitch animation.
 *
 * @param {string[]} glitchColors - Array of colors to use for the glitch effect
 * @param {number} glitchSpeed - Speed of the glitch update in milliseconds
 * @param {boolean} smooth - Whether to use smooth color transitions
 * @returns {Object} Animation control methods and refs
 */
export function useLetterGlitch(glitchColors: string[], glitchSpeed: number, smooth: boolean) {
  // Refs for animation state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<GlitchLetter[]>([]);
  const grid = useRef<GlitchGrid>({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  /**
   * Draws all letters to the canvas.
   */
  const drawLetters = useCallback(() => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${DEFAULT_FONT_SIZE}px monospace`;
    ctx.textBaseline = 'top';

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * DEFAULT_CHAR_WIDTH;
      const y = Math.floor(index / grid.current.columns) * DEFAULT_CHAR_HEIGHT;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  }, []);

  /**
   * Initializes the letters array with random characters and colors.
   */
  const initializeLetters = useCallback(
    (columns: number, rows: number) => {
      grid.current = { columns, rows };
      const totalLetters = columns * rows;
      letters.current = Array.from({ length: totalLetters }, () => ({
        char: getRandomChar(),
        color: getRandomColor(glitchColors),
        targetColor: getRandomColor(glitchColors),
        colorProgress: 1
      }));
    },
    [glitchColors]
  );

  /**
   * Resizes the canvas based on parent element size.
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(
      rect.width,
      rect.height,
      DEFAULT_CHAR_WIDTH,
      DEFAULT_CHAR_HEIGHT
    );
    initializeLetters(columns, rows);
    drawLetters();
  }, [initializeLetters, drawLetters]);

  /**
   * Updates a random selection of letters with new characters and colors.
   */
  const updateLetters = useCallback(() => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * UPDATE_FRACTION));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor(glitchColors);

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  }, [glitchColors, smooth]);

  /**
   * Handles smooth color transitions for letters.
   */
  const handleSmoothTransitions = useCallback(() => {
    let needsRedraw = false;
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += COLOR_STEP;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  }, [drawLetters]);

  /**
   * Main animation loop.
   */
  const animate = useCallback(() => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [glitchSpeed, smooth, updateLetters, drawLetters, handleSmoothTransitions]);

  /**
   * Initializes the animation.
   */
  const initAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d');
    resizeCanvas();
    animate();
  }, [resizeCanvas, animate]);

  /**
   * Cleans up animation resources.
   */
  const cleanupAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  return {
    canvasRef,
    animationRef,
    initAnimation,
    cleanupAnimation,
    resizeCanvas,
    animate
  };
}
