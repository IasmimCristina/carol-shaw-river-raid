import { useEffect, useRef } from "react";

//  Based on River Raid's resolution:
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 640;
const STREET_WIDTH = 220;

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) return;
    let animationFrameId: number;
    let offset = 0;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drawing
      ctx.fillStyle = "green";
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Background
      //  Street
      ctx.fillStyle = "gray";
      ctx.fillRect(
        (CANVAS_WIDTH - STREET_WIDTH) / 2,
        0,
        STREET_WIDTH,
        CANVAS_HEIGHT,
      ); // Explanation:  equal margins on both sides. It centralizes the street.

      // Center line
      ctx.beginPath()
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.setLineDash([20, 15]) // Possible change: remove magical numbers here.

      ctx.lineDashOffset = -offset;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke(); // Painting the line.
      offset += 2 // Speed scroll control.

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      //  Clean up:  the loop needs to be stopped when the component unmounts
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef}>
      Testing!!
    </canvas>
  );
}
