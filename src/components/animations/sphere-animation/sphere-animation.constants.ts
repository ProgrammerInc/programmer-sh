/**
 * Constants for the Sphere Animation component
 */

import { ColorSchemeMap } from './sphere-animation.types';

/**
 * CSS class names used in the sphere animation component
 */
export const CSS_CLASSES = {
  /** @type {string} Container class */
  CONTAINER: 'sphere-animation-container',
  /** @type {string} Wrapper class */
  WRAPPER: 'sphere-animation-wrapper',
  /** @type {string} Canvas class */
  CANVAS: 'sphere-animation-canvas',
  /** @type {string} Path class */
  PATH: 'sphere-path'
};

/**
 * Default color schemes for the sphere animation
 */
export const COLOR_SCHEMES: ColorSchemeMap = {
  /** Default dark/red color scheme */
  default: {
    gradient: ['#1a1a18', '#0f0f0e', '#050505'],
    stroke: ['rgba(255,75,75,1)', 'rgba(80,80,80,.15)']
  },
  /** Blue color scheme */
  blue: {
    gradient: ['#102a4c', '#0a1a30', '#050c18'],
    stroke: ['rgba(75,135,255,1)', 'rgba(80,80,80,.15)']
  },
  /** Green color scheme */
  green: {
    gradient: ['#1a2c18', '#0f1c0e', '#050c05'],
    stroke: ['rgba(75,255,130,1)', 'rgba(80,80,80,.15)']
  },
  /** Purple color scheme */
  purple: {
    gradient: ['#2a1a4c', '#1a0f30', '#0c0518'],
    stroke: ['rgba(190,75,255,1)', 'rgba(80,80,80,.15)']
  }
};

/**
 * Animation parameters
 */
export const ANIMATION = {
  /** @type {number} Animation duration in milliseconds */
  INTRO_DURATION: 3900,
  /** @type {string} Animation easing for the intro effect */
  INTRO_EASING: 'easeInOutCirc',
  /** @type {number} Stagger delay in milliseconds for intro animation */
  INTRO_STAGGER: 190,
  /** @type {number} Path animation duration in milliseconds */
  PATH_DURATION: 3000,
  /** @type {string} Path animation easing function */
  PATH_EASING: 'easeInOutSine',
  /** @type {number} Maximum random delay for path animations */
  PATH_MAX_DELAY: 2000,
  /** @type {number} Shadow animation duration in milliseconds */
  SHADOW_DURATION: 30000,
  /** @type {string} Shadow animation easing function */
  SHADOW_EASING: 'easeOutQuint'
};

/**
 * SVG configuration
 */
export const SVG = {
  /** @type {string} Gradient ID */
  GRADIENT_ID: 'sphereGradient',
  /** @type {number} Default padding when fitting element to parent */
  DEFAULT_PADDING: 0,
  /** @type {string} Default SVG viewBox */
  VIEWBOX: '0 0 440 440',
  /** @type {string} Default stroke color */
  DEFAULT_STROKE: 'rgba(80,80,80,.35)'
};
