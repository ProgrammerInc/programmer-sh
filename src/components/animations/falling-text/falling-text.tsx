'use client';

import Matter from 'matter-js';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FallingTextProps, TriggerType } from './falling-text.types';

/**
 * A component that creates a physics-based text animation where words fall and can be interacted with
 *
 * @example
 * <FallingText
 *   text="This text will fall and can be dragged"
 *   highlightWords={["text", "dragged"]}
 *   trigger="scroll"
 *   gravity={0.5}
 * />
 */
export const FallingText = memo(function FallingText({
  text = '',
  highlightWords = [],
  trigger = TriggerType.Auto,
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState<boolean>(false);

  // Format the text with highlighting - memoized to avoid recreating on every render
  const formattedHTML = useMemo(() => {
    const words = text.split(' ');
    return words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        return `<span
          class="inline-block mx-[2px] select-none ${
            isHighlighted ? 'text-cyan-500 font-bold' : ''
          }"
        >
          ${word}
        </span>`;
      })
      .join(' ');
  }, [text, highlightWords]);

  // Apply the formatted HTML to the text container
  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.innerHTML = formattedHTML;
  }, [formattedHTML]);

  // Handle trigger logic based on trigger type
  useEffect(() => {
    if (trigger === TriggerType.Auto) {
      setEffectStarted(true);
      return;
    }

    if (trigger === TriggerType.Scroll && containerRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Setup and run the physics simulation when effectStarted becomes true
  useEffect(() => {
    if (!effectStarted) return;

    // Early return if required refs aren't available
    if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    // Create physics engine
    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const canvasContainer = canvasContainerRef.current;

    // Create renderer
    const render = Render.create({
      element: canvasContainer,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    // Create boundaries
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    // Type definition for word bodies to track both DOM elements and physics bodies
    interface WordBody {
      elem: HTMLElement;
      body: Matter.Body;
    }

    // Create word bodies
    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies: WordBody[] = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem, body };
    });

    // Position elements initially
    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    // Setup mouse interaction
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    // Add all bodies to the world
    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map(wb => wb.body)
    ]);

    // Start the physics engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Create animation loop for updating word positions
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };

    // Start the animation loop
    const animationId = requestAnimationFrame(updateLoop);

    // Clean up all Matter.js resources on unmount
    return () => {
      cancelAnimationFrame(animationId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainer) {
        canvasContainer.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  /**
   * Handles user interaction triggers (click or hover)
   */
  const handleTrigger = useCallback((): void => {
    if (!effectStarted && (trigger === TriggerType.Click || trigger === TriggerType.Hover)) {
      setEffectStarted(true);
    }
  }, [effectStarted, trigger]);

  // Memoize text styles to prevent recalculation
  const textStyles = useMemo(
    () => ({
      fontSize,
      lineHeight: 1.4
    }),
    [fontSize]
  );

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-pointer text-center pt-8 overflow-hidden"
      onClick={trigger === TriggerType.Click ? handleTrigger : undefined}
      onMouseOver={trigger === TriggerType.Hover ? handleTrigger : undefined}
    >
      <div ref={textRef} className="inline-block" style={textStyles} />

      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
});

export default FallingText;
