import { useEffect, useRef } from "react";

//  Based on River Raid's resolution:
const CANVAS_WIDTH = 480 
const CANVAS_HEIGHT = 640

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) return;
    let animationFrameId: number;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      //  Clean up:  the loop needs to be stopped when the component unmounts
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef}>Testing!!</canvas>;
}
