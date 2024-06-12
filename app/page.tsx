'use client'
import { useState } from "react";
import { useDraw } from "./lib/useDraw";

export default function Home() {

    const [color, setColor] = useState<string>('#000');

    const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
    const canvasWidth = window.innerWidth;
    const cavasHeight = window.innerHeight;


    function drawLine({ prevPoint, current, ctx }: Draw) {
        const { x: currX, y: currY } = current;
        const lineColor = color;
        const lineWidth = 5;

        let startPoint = prevPoint ?? current;

        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currX, currY);
        console.log(currX, currY);

        ctx.stroke();

        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }


    return (
        <div>
            <canvas className="bg-white"
                ref={canvasRef}
                onMouseDown={onMouseDown}
                height={canvasWidth}
                width={canvasWidth}
            />
        </div>
    );
}
