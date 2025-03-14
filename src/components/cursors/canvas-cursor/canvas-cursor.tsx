'use client';

import useCanvasCursor from '@/hooks/use-canvas-cursor';

export const CanvasCursor = () => {
  useCanvasCursor();

  return <canvas id="canvasCursor" className="canvas-cursor pointer-events-none fixed inset-0" />;
};

export default CanvasCursor;
