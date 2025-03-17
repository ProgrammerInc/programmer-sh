import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';

// Create a dedicated logger for canvas cursor
const canvasCursorLogger = createFeatureLogger('CanvasCursor');

interface WaveOptions {
  phase: number;
  amplitude: number;
  frequency: number;
  offset: number;
}

interface LineOptions {
  spring: number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CanvasContextWithRunning extends CanvasRenderingContext2D {
  running: boolean;
  frame: number;
}

const useCanvasCursor = () => {
  // Using useRef to maintain references to functions and objects across renders
  // This avoids the need to add them to dependency arrays
  const stateRef = useRef({
    ctx: null as CanvasContextWithRunning | null,
    f: null as { update: () => number } | null,
    lines: [] as Array<{ update: () => void; draw: () => void }>,
    e: 0,
    pos: { x: 0, y: 0 },
    eventHandlers: null as {
      onMousemove: (e: MouseEvent | TouchEvent) => void;
      resizeCanvas: () => void;
      handleFocus: () => void;
      handleBlur: () => void;
    } | null
  });

  // Create configuration object with useMemo to avoid recreating it on every render
  // This allows us to safely use it in dependency arrays without causing re-renders
  const config = useMemo(
    () => ({
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98
    }),
    []
  );

  function n(e: WaveOptions) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (e: WaveOptions) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      return (
        (this.phase += this.frequency),
        (stateRef.current.e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
    },
    value: function () {
      return stateRef.current.e;
    }
  };

  function Line(e: LineOptions) {
    this.init(e || {});
  }

  function Node(this: NodeType) {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }

  Line.prototype = {
    init: function (e: LineOptions) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = config.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (let t, n = 0; n < config.size; n++) {
        t = new Node();
        t.x = stateRef.current.pos.x;
        t.y = stateRef.current.pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      let e = this.spring,
        t = this.nodes[0];
      t.vx += (stateRef.current.pos.x - t.x) * e;
      t.vy += (stateRef.current.pos.y - t.y) * e;
      for (let i = 0, a = this.nodes.length; i < a; i++) {
        t = this.nodes[i];

        if (i > 0) {
          const n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx += n.vx * config.dampening;
          t.vy += n.vy * config.dampening;
        }

        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        e *= config.tension;
      }
    },
    draw: function () {
      const ctx = stateRef.current.ctx;
      if (!ctx) return;

      let e: NodeType,
        t: NodeType,
        n = this.nodes[0].x,
        i = this.nodes[0].y,
        a = 0,
        o = 0;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    }
  };

  const resizeCanvas = useCallback(() => {
    const ctx = stateRef.current.ctx;
    if (!ctx) return;

    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }, []);

  const render = useCallback(() => {
    const ctx = stateRef.current.ctx;
    const f = stateRef.current.f;
    const lines = stateRef.current.lines;

    if (!ctx || !f) return;

    if (ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;
      for (let e: { draw: () => void; update: () => void }, t = 0; t < config.trails; t++) {
        e = lines[t];
        e.update();
        e.draw();
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }, [config.trails]);

  const onMousemove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const initLines = () => {
        stateRef.current.lines = [];
        for (let e = 0; e < config.trails; e++)
          stateRef.current.lines.push(new Line({ spring: 0.4 + (e / config.trails) * 0.025 }));
      };

      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if ('touches' in e && e.touches.length > 0) {
          stateRef.current.pos.x = e.touches[0].pageX;
          stateRef.current.pos.y = e.touches[0].pageY;
        } else if ('clientX' in e) {
          stateRef.current.pos.x = e.clientX;
          stateRef.current.pos.y = e.clientY;
        }
        e.preventDefault();
      };

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          stateRef.current.pos.x = e.touches[0].pageX;
          stateRef.current.pos.y = e.touches[0].pageY;
        }
      };

      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchstart', handleTouchStart);
      handleMouseMove(e);
      initLines();
      render();
    },
    [render, config.trails]
  );

  const renderCanvas = useCallback(() => {
    const canvasElement = document.getElementById('canvasCursor');

    if (!canvasElement) {
      canvasCursorLogger.error('Canvas element not found');
      return;
    }

    const ctx2d = (canvasElement as HTMLCanvasElement).getContext('2d');

    if (!ctx2d) {
      canvasCursorLogger.error('Could not get 2D context from canvas');
      return;
    }

    const ctx = Object.assign(ctx2d, {
      running: true,
      frame: 1
    }) as CanvasContextWithRunning;

    stateRef.current.ctx = ctx;

    const f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285
    });

    stateRef.current.f = f;

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    const handleFocus = () => {
      const ctx = stateRef.current.ctx;
      if (ctx && !ctx.running) {
        ctx.running = true;
        render();
      }
    };

    const handleBlur = () => {
      const ctx = stateRef.current.ctx;
      if (ctx) {
        ctx.running = true;
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Store event handlers in the ref for cleanup
    stateRef.current.eventHandlers = {
      onMousemove,
      resizeCanvas,
      handleFocus,
      handleBlur
    };

    resizeCanvas();
    canvasCursorLogger.debug('Canvas cursor initialization complete');
  }, [onMousemove, render, resizeCanvas]);

  // Using a single useEffect with renderCanvas dependency to initialize the canvas
  useEffect(() => {
    try {
      renderCanvas();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      canvasCursorLogger.error('Error initializing canvas cursor', { error: errorMessage });
    }

    // Store a snapshot of current references that we'll need in the cleanup function
    // This prevents issues with stale refs during cleanup
    const currentState = {
      ctx: stateRef.current.ctx,
      eventHandlers: stateRef.current.eventHandlers
    };

    return () => {
      try {
        if (currentState.ctx) {
          currentState.ctx.running = false;
        }

        if (currentState.eventHandlers) {
          document.removeEventListener('mousemove', currentState.eventHandlers.onMousemove);
          document.removeEventListener('touchstart', currentState.eventHandlers.onMousemove);
          document.body.removeEventListener(
            'orientationchange',
            currentState.eventHandlers.resizeCanvas
          );
          window.removeEventListener('resize', currentState.eventHandlers.resizeCanvas);
          window.removeEventListener('focus', currentState.eventHandlers.handleFocus);
          window.removeEventListener('blur', currentState.eventHandlers.handleBlur);
          canvasCursorLogger.debug('Canvas cursor cleanup complete');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        canvasCursorLogger.error('Error during canvas cursor cleanup', { error: errorMessage });
      }
    };
  }, [renderCanvas]);
};

export default useCanvasCursor;
