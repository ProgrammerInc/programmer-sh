/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

const useCanvasCursor = () => {
  function n(e: { phase: number; amplitude: number; frequency: number; offset: number }) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (e: { phase: number; offset: number; frequency: number; amplitude: number }) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      return (
        (this.phase += this.frequency), (e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
    },
    value: function () {
      return e;
    }
  };

  function Line(e: { spring: number }) {
    this.init(e || {});
  }

  Line.prototype = {
    init: function (e: { spring: number }) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (let t, n = 0; n < E.size; n++) {
        t = new Node();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      let e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (let i = 0, a = this.nodes.length; i < a; i++) {
        t = this.nodes[i];

        if (i > 0) {
          const n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx += n.vx * E.dampening;
          t.vy += n.vy * E.dampening;
        }

        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        e *= E.tension;
      }
    },
    draw: function () {
      let e: { x: any; y: any },
        t: { x: any; y: any },
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

  function onMousemove(e: MouseEvent | TouchEvent) {
    function o() {
      lines = [];
      for (let e = 0; e < E.trails; e++)
        lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }
    function c(e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches.length > 0) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else if ('clientX' in e) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      e.preventDefault();
    }
    function l(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }
    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('touchstart', onMousemove);
    document.addEventListener('mousemove', c);
    document.addEventListener('touchmove', c);
    document.addEventListener('touchstart', l);
    c(e);
    o();
    render();
  }

  function render() {
    if (ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;
      for (let e: { draw: () => void; update: () => void }, t = 0; t < E.trails; t++) {
        e = lines[t];
        e.update();
        e.draw();
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }

  let ctx: CanvasRenderingContext2D & {
      running: boolean;
      frame: number;
    },
    f: { update: () => number },
    e = 0,
    lines = [];

  const E = {
    debug: true,
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98
  };

  function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }

  const renderCanvas = function () {
    const canvasElement = document.getElementById('canvasCursor');

    if (!canvasElement) {
      console.error('Canvas element not found');
      return;
    }

    const ctx2d = (canvasElement as HTMLCanvasElement).getContext('2d');

    if (!ctx2d) {
      console.error('Could not get 2D context from canvas');
      return;
    }

    ctx = Object.assign(ctx2d, {
      running: true,
      frame: 1
    }) as CanvasRenderingContext2D & {
      running: boolean;
      frame: number;
    };

    f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285
    });
    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', () => {
      if (!ctx.running) {
        ctx.running = true;
        render();
      }
    });
    window.addEventListener('blur', () => {
      ctx.running = true;
    });
    resizeCanvas();
  };

  const pos = { x: 0, y: 0 };

  useEffect(() => {
    renderCanvas();

    return () => {
      ctx.running = false;
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', () => {
        if (!ctx.running) {
          ctx.running = true;
          render();
        }
      });
      window.removeEventListener('blur', () => {
        ctx.running = true;
      });
    };
  }, [ctx, onMousemove, render, renderCanvas, resizeCanvas]);
};

export default useCanvasCursor;
