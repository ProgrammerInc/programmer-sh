/**
 * Custom hooks for the Globe component
 */

import { genRandomNumbers } from '@/utils/app.utils';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useState } from 'react';
import { Color, MeshPhongMaterial, Object3D } from 'three';
import ThreeGlobe from 'three-globe';

import {
  ARC_DASH_GAP,
  ARC_STROKE_OPTIONS,
  RING_PROPAGATION_SPEED,
  RING_UPDATE_INTERVAL,
  ROTATION_FACTOR
} from './globe.constants';
import {
  CountryFeature,
  GlobePointData,
  GlobePosition,
  UseThreeGlobeProps,
  WorldProps
} from './globe.types';

// Tracking for active rings
let numbersOfRings: number[] = [0];

/**
 * Need to import countries data but can't do it at the top level
 * since we need access to it inside our hooks
 */
import countries from '@/data/globe.json';
import { hexToRgbObject } from '@/lib';

/**
 * Validates if a number is valid (not NaN, not Infinity)
 *
 * @param num Number to validate
 * @param fallback Fallback value if invalid
 * @returns Valid number or fallback
 */
const validateNumber = (num: number, fallback: number = 0): number => {
  return num === undefined || Number.isNaN(num) || !Number.isFinite(num) ? fallback : num;
};

/**
 * Validates position data to ensure no NaN or invalid values
 *
 * @param data Array of position data
 * @returns Validated position data
 */
const validatePositionData = (data: GlobePosition[]): GlobePosition[] => {
  return data.map(pos => ({
    ...pos,
    startLat: validateNumber(pos.startLat, 0),
    startLng: validateNumber(pos.startLng, 0),
    endLat: validateNumber(pos.endLat, 0),
    endLng: validateNumber(pos.endLng, 0),
    arcAlt: validateNumber(pos.arcAlt, 0.1)
  }));
};

/**
 * Custom hook to create and configure ThreeGlobe object
 *
 * @param props Globe configuration and data
 * @param onReady Callback when globe is ready
 * @returns Configured ThreeGlobe instance
 */
export const useThreeGlobe = ({ globeConfig, data, onReady }: UseThreeGlobeProps) => {
  // Create ThreeGlobe instance with useMemo to avoid recreation on every render
  const globe = useMemo(() => {
    try {
      // Ensure we have valid data
      if (!data || data.length === 0) {
        console.warn('No data provided for ThreeGlobe');
        return null;
      }

      // Initialize new ThreeGlobe instance
      const threeGlobe = new ThreeGlobe()
        .hexPolygonsData((countries.features || []) as CountryFeature[])
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(globeConfig.showAtmosphere || false)
        .atmosphereColor(globeConfig.atmosphereColor || '#ffffff')
        .atmosphereAltitude(globeConfig.atmosphereAltitude || 0.1)
        .hexPolygonColor(() => globeConfig.polygonColor || 'rgba(255,255,255,0.7)');

      // Configure globe material
      const globeMaterial = threeGlobe.globeMaterial();
      if (globeMaterial && globeMaterial instanceof MeshPhongMaterial) {
        globeMaterial.color = new Color(globeConfig.globeColor || '#1d072e');
        globeMaterial.emissive = new Color(globeConfig.emissive || '#000000');
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
      }

      return threeGlobe;
    } catch (err) {
      console.error('Error creating ThreeGlobe instance:', err);
      return null;
    }
  }, [
    data, // Adding data as a dependency
    globeConfig.showAtmosphere,
    globeConfig.atmosphereColor,
    globeConfig.atmosphereAltitude,
    globeConfig.polygonColor,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess
  ]);

  // Configure globe with useEffect when globe instance is ready
  useEffect(() => {
    if (!globe || !data || data.length === 0) return;

    try {
      // Validate all data points to prevent NaN values
      const validatedData = validatePositionData(data);

      // Configure arcs
      globe
        .arcsData(validatedData)
        .arcStartLat(d => validateNumber((d as GlobePosition).startLat))
        .arcStartLng(d => validateNumber((d as GlobePosition).startLng))
        .arcEndLat(d => validateNumber((d as GlobePosition).endLat))
        .arcEndLng(d => validateNumber((d as GlobePosition).endLng))
        .arcColor(e => (e as GlobePosition).color || '#ffffff')
        .arcAltitude(e => validateNumber((e as GlobePosition).arcAlt, 0.1))
        .arcStroke(
          () => ARC_STROKE_OPTIONS[Math.round(Math.random() * (ARC_STROKE_OPTIONS.length - 1))]
        )
        .arcDashLength(globeConfig.arcLength || 0.9)
        .arcDashInitialGap(e => validateNumber((e as GlobePosition).order, 0))
        .arcDashGap(ARC_DASH_GAP)
        .arcDashAnimateTime(() => globeConfig.arcTime || 2000);

      // Configure points
      globe
        .pointsData(validatedData)
        .pointColor(e => (e as GlobePosition).color || '#ffffff')
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(validateNumber(globeConfig.pointSize, 2));

      // Configure rings
      globe
        .ringsData([])
        .ringColor((e: GlobePointData) => (t: number) => e.color(t) || 'rgba(255,255,255,0.5)')
        .ringMaxRadius(validateNumber(globeConfig.maxRings, 3))
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(
          (validateNumber(globeConfig.arcTime, 2000) * validateNumber(globeConfig.arcLength, 0.9)) /
            validateNumber(globeConfig.rings, 1)
        );

      // Set up ring animations
      const interval = setInterval(() => {
        if (!globe) return;

        // Generate random positions for rings
        numbersOfRings = genRandomNumbers(
          0,
          validatedData.length,
          Math.floor((validatedData.length * 4) / 5)
        );

        // Create placeholder for globeData to avoid type errors
        const points = validatedData
          .map((arc, index) => {
            const rgb = hexToRgbObject(arc.color || '#ffffff');
            return {
              size: validateNumber(globeConfig.pointSize, 1),
              order: validateNumber(arc.order, 0),
              color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
              lat: validateNumber(index % 2 === 0 ? arc.startLat : arc.endLat),
              lng: validateNumber(index % 2 === 0 ? arc.startLng : arc.endLng)
            };
          })
          .filter(
            point =>
              !Number.isNaN(point.lat) &&
              !Number.isNaN(point.lng) &&
              Number.isFinite(point.lat) &&
              Number.isFinite(point.lng)
          );

        // Update rings data - filter out any potentially invalid points
        const ringPoints = points.filter((d, i) => numbersOfRings.includes(i));
        globe.ringsData(ringPoints);
      }, RING_UPDATE_INTERVAL);

      // Signal that globe is ready
      onReady(globe);

      return () => {
        if (interval) clearInterval(interval);
      };
    } catch (err) {
      console.error('Error configuring ThreeGlobe:', err);
    }
  }, [globe, data, globeConfig, onReady]);

  return globe;
};

/**
 * Custom hook to manage the globe object and handle its rotation
 *
 * @param objectRef Reference to the object3D container
 * @param properties Globe configuration and data
 * @returns The ThreeGlobe instance
 */
export const useGlobeObject = (objectRef: React.RefObject<Object3D>, properties: WorldProps) => {
  const [globe, setGlobe] = useState<ThreeGlobe | null>(null);

  // Create and configure ThreeGlobe instance
  const threeGlobe = useThreeGlobe({
    globeConfig: properties.globeConfig,
    data: properties.data,
    onReady: readyGlobe => {
      setGlobe(readyGlobe);
    }
  });

  // Add ThreeGlobe to the scene
  useEffect(() => {
    if (!objectRef.current || !globe) return;

    // Store reference to the current ref value to avoid closure issues in cleanup
    const currentRef = objectRef.current;

    // Clean up any existing children
    while (currentRef.children.length > 0) {
      currentRef.remove(currentRef.children[0]);
    }

    // Add the globe to our Object3D
    currentRef.add(globe);

    return () => {
      if (currentRef) {
        while (currentRef.children.length > 0) {
          currentRef.remove(currentRef.children[0]);
        }
      }
    };
  }, [globe, objectRef]);

  // Rotate the globe if autoRotate is enabled
  useFrame(() => {
    if (objectRef.current && properties.globeConfig.autoRotate) {
      objectRef.current.rotation.y +=
        validateNumber(properties.globeConfig.autoRotateSpeed, 0.5) * ROTATION_FACTOR;
    }
  });

  return globe;
};
