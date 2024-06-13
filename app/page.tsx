'use client'
import { useEffect, useState } from "react";
import { useDraw } from "./lib/useDraw";

export default function Home() {

    const [color, setColor] = useState<string>('#000');
    const [eraser, setClear] = useState<boolean>(false);
    const [eraserSize, setEraserSize] = useState<number>(40);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });


    const { canvasRef, onMouseDown, clear } = useDraw(drawLine, setClearDraw);
    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, []);

    function setClearDraw(): Eraser {
        return { isOn: eraser, size: eraserSize };
    }

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

        ctx.stroke();

        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }


    return (
        <div>
            <div className="absolute top-10 left-1/3  bg-gray-300 flex">
                <button
                    className="px-10"
                    onClick={() => setClear(true)} >
                    Erase</button>
                <button
                    className="px-10"
                    onClick={() => setClear(false)} >
                    Pencile</button>
            </div>

            <div>
                <label> Eraser Size </label>
                <input 
                    className="bg-gray-200 rounded text-black px-2"
                    type="number"
                    onChange={(e) => setEraserSize(parseInt(e.target.value))}
                    value={eraserSize}
                />
            </div>

            <canvas className="bg-white"
                ref={canvasRef}
                onMouseDown={onMouseDown}
                height={windowSize.height}
                width={windowSize.width}
            />
        </div>
    );
}
