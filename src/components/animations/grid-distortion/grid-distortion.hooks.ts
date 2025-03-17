'use client';

import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './grid-distortion.constants';
import { GridDistortionUniforms, MouseState } from './grid-distortion.types';

/**
 * Hook to create and manage the Three.js renderer
 *
 * @param containerRef - Reference to the container element
 * @returns The Three.js renderer or null if not initialized
 */
export const useRenderer = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const newRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    newRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(newRenderer.domElement);
    setRenderer(newRenderer);

    return () => {
      if (newRenderer) {
        if (newRenderer.domElement.parentNode) {
          newRenderer.domElement.parentNode.removeChild(newRenderer.domElement);
        }
        newRenderer.dispose();
      }
    };
  }, [containerRef]);

  return renderer;
};

/**
 * Hook to create and manage the Three.js scene
 *
 * @returns The Three.js scene
 */
export const useScene = () => {
  const [scene] = useState(() => new THREE.Scene());

  return scene;
};

/**
 * Hook to create and manage the Three.js camera
 *
 * @returns The Three.js orthographic camera
 */
export const useCamera = () => {
  const [camera] = useState(() => {
    const newCamera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    newCamera.position.z = 2;
    return newCamera;
  });

  return camera;
};

/**
 * Hook to create and manage the shader uniforms
 *
 * @returns The shader uniforms object
 */
export const useShaderUniforms = () => {
  const [uniforms] = useState<GridDistortionUniforms>(() => ({
    time: { value: 0 },
    resolution: { value: new THREE.Vector4() },
    uTexture: { value: null },
    uDataTexture: { value: null }
  }));

  return uniforms;
};

/**
 * Hook to load and manage the image texture
 *
 * @param imageSrc - Source URL for the image
 * @param uniforms - Shader uniforms object
 * @param handleResize - Function to handle resize after texture is loaded
 * @returns Object containing image aspect ratio and error state
 */
export const useImageTexture = (
  imageSrc: string,
  uniforms: GridDistortionUniforms,
  handleResize: () => void
) => {
  const [imageAspect, setImageAspect] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load image texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageSrc,
      texture => {
        // Successfully loaded texture
        texture.minFilter = THREE.LinearFilter;
        const aspect = texture.image.width / texture.image.height;
        setImageAspect(aspect);
        uniforms.uTexture.value = texture;
        handleResize();
      },
      undefined,
      error => {
        // Error loading texture
        console.error('Error loading texture for GridDistortion:', error);
        setError('Failed to load image for grid distortion effect.');
      }
    );

    return () => {
      if (uniforms.uTexture.value) {
        uniforms.uTexture.value.dispose();
      }
    };
  }, [imageSrc, uniforms, handleResize]);

  return { imageAspect, error };
};

/**
 * Hook to create and manage the data texture for distortion
 *
 * @param grid - Grid size (number of cells)
 * @param uniforms - Shader uniforms object
 * @returns The initial data as a Float32Array
 */
export const useDataTexture = (grid: number, uniforms: GridDistortionUniforms) => {
  const [initialData] = useState(() => {
    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
      // Leave G and A channels as 0 by default
    }

    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    return data.slice(); // Return a copy of the initial data
  });

  useEffect(() => {
    return () => {
      if (uniforms.uDataTexture.value) {
        uniforms.uDataTexture.value.dispose();
      }
    };
  }, [uniforms]);

  return initialData;
};

/**
 * Hook to create the shader material and mesh
 *
 * @param scene - Three.js scene
 * @param uniforms - Shader uniforms
 * @param grid - Grid size
 * @returns The created mesh
 */
export const useMesh = (scene: THREE.Scene, uniforms: GridDistortionUniforms, grid: number) => {
  const [mesh] = useState(() => {
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER
    });
    const geometry = new THREE.PlaneGeometry(1, 1, grid - 1, grid - 1);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    return plane;
  });

  useEffect(() => {
    return () => {
      if (mesh) {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => {
              // Use type assertion to handle any texture maps
              const mat = material as THREE.Material & { map?: THREE.Texture };
              if (mat.map) mat.map.dispose();
              material.dispose();
            });
          } else {
            // Use type assertion to handle any texture maps
            const mat = mesh.material as THREE.Material & { map?: THREE.Texture };
            if (mat.map) mat.map.dispose();
            mesh.material.dispose();
          }
        }
      }
    };
  }, [mesh]);

  return mesh;
};

/**
 * Hook to handle window resize events
 *
 * @param containerRef - Reference to the container element
 * @param renderer - Three.js renderer
 * @param camera - Three.js camera
 * @param mesh - Three.js mesh
 * @param imageAspect - Image aspect ratio
 * @param uniforms - Shader uniforms
 * @returns Resize handler function
 */
export const useResizeHandler = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  renderer: THREE.WebGLRenderer | null,
  camera: THREE.OrthographicCamera,
  mesh: THREE.Mesh,
  imageAspect: number,
  uniforms: GridDistortionUniforms
) => {
  const handleResize = useCallback(() => {
    if (!containerRef.current || !renderer) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Bail early if container dimensions are invalid
    if (width <= 0 || height <= 0) return;

    const containerAspect = width / height;

    renderer.setSize(width, height);

    const scale = Math.max(containerAspect / imageAspect, 1);
    mesh.scale.set(imageAspect * scale, scale, 1);

    const frustumHeight = 1;
    const frustumWidth = frustumHeight * containerAspect;
    camera.left = -frustumWidth / 2;
    camera.right = frustumWidth / 2;
    camera.top = frustumHeight / 2;
    camera.bottom = -frustumHeight / 2;
    camera.updateProjectionMatrix();

    uniforms.resolution.value.set(width, height, 1, 1);
  }, [containerRef, renderer, camera, mesh, imageAspect, uniforms]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return handleResize;
};

/**
 * Hook to handle mouse interaction
 *
 * @param containerRef - Reference to the container element
 * @returns Mouse state object
 */
export const useMouseInteraction = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
  const [mouseState] = useState<MouseState>(() => ({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    vX: 0,
    vY: 0
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      try {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const x = (e.clientX - rect.left) / rect.width;
        const y = 1 - (e.clientY - rect.top) / rect.height;
        mouseState.vX = x - mouseState.prevX;
        mouseState.vY = y - mouseState.prevY;
        Object.assign(mouseState, { x, y, prevX: x, prevY: y });
      } catch (err) {
        console.error('Error in mouse move handler:', err);
      }
    };

    const handleMouseLeave = () => {
      Object.assign(mouseState, {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        vX: 0,
        vY: 0
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, mouseState]);

  return mouseState;
};

/**
 * Hook to handle the animation loop
 *
 * @param renderer - Three.js renderer
 * @param scene - Three.js scene
 * @param camera - Three.js camera
 * @param uniforms - Shader uniforms
 * @param mouseState - Mouse interaction state
 * @param initialData - Initial distortion data
 * @param grid - Grid size
 * @param mouse - Mouse interaction strength
 * @param strength - Distortion effect strength
 * @param relaxation - Relaxation factor
 * @returns Animation frame ID
 */
export const useAnimationLoop = (
  renderer: THREE.WebGLRenderer | null,
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera,
  uniforms: GridDistortionUniforms,
  mouseState: MouseState,
  initialData: Float32Array,
  grid: number,
  mouse: number,
  strength: number,
  relaxation: number
) => {
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  useEffect(() => {
    if (!renderer) return;

    const clock = new THREE.Clock();
    clock.start();

    const animate = () => {
      if (!renderer || !scene || !camera) return;

      // Update time uniform
      uniforms.time.value = clock.getElapsedTime();

      // Update distortion data texture
      const dataTexture = uniforms.uDataTexture.value;
      if (dataTexture && mouseState) {
        const data = dataTexture.image.data;
        const gridSize = grid;
        const gridMouseX = Math.floor(mouseState.x * gridSize);
        const gridMouseY = Math.floor(mouseState.y * gridSize);

        // For each grid cell
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            const idx = i * gridSize + j;

            // Add mouse influence if mouse is over the effect area
            if (mouseState.x !== 0 || mouseState.y !== 0) {
              const distance = Math.sqrt(Math.pow(gridMouseX - j, 2) + Math.pow(gridMouseY - i, 2));
              const maxDistance = Math.sqrt(gridSize * gridSize * 2);
              const normalizedDistance = distance / maxDistance;

              const influence = Math.max(0, 1 - normalizedDistance * 8) * mouse;

              if (influence > 0) {
                data[idx * 4] += mouseState.vX * 2000 * influence * strength;
                data[idx * 4 + 1] += mouseState.vY * 2000 * influence * strength;
              }
            }

            // Apply relaxation
            data[idx * 4] *= relaxation;
            data[idx * 4 + 1] *= relaxation;
          }
        }

        dataTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
      const id = requestAnimationFrame(animate);
      setAnimationFrameId(id);
    };

    const id = requestAnimationFrame(animate);
    setAnimationFrameId(id);

    return () => {
      if (id !== null) {
        cancelAnimationFrame(id);
      }
    };
  }, [
    renderer,
    scene,
    camera,
    uniforms,
    mouseState,
    initialData,
    grid,
    mouse,
    strength,
    relaxation
  ]);

  return animationFrameId;
};
