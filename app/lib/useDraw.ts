import { useEffect, useRef, useState } from "react";
import { isSet } from "util/types";

export const useDraw = (onDraw: ({ ctx, current, prevPoint }: Draw) => void,
    isSetClear: () => Eraser) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [mouseDown, setMouseDown] = useState(false);

    const prevPoint = useRef<null | Point>(null);

    const onMouseDown = () => setMouseDown(true)

    const clear = (point: Point, size: number) => {
        const canvas = canvasRef.current;

        if (!canvas) return

        const ctx = canvas.getContext('2d');
        if (!ctx) return

        ctx.clearRect(point.x, point.y, size, size);
    }

    useEffect(() => {

        const computePointInCanvas = (e: MouseEvent) => {
            const canvass = canvasRef.current;

            if (!canvass) return;

            const rect = canvass.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            return { x, y };
        }

        const handler = (e: MouseEvent) => {
            if (!mouseDown) return
            const currentPoint = computePointInCanvas(e);

            const ctx = canvasRef.current?.getContext('2d');

            if (!ctx || !currentPoint) return;

            const eraser = isSetClear();
            if (eraser.isOn)
                clear(currentPoint, eraser.size);
            else
                onDraw({ ctx, current: currentPoint, prevPoint: prevPoint.current });
            prevPoint.current = currentPoint;
        }

        const mouseUpHandler = () => {
            setMouseDown(false);
            prevPoint.current = null;
        }

        // add event listener
        canvasRef.current?.addEventListener('mousemove', handler);
        window.addEventListener('mouseup', mouseUpHandler);

        return () => {
            canvasRef.current?.removeEventListener('mousemove', handler);
            window.removeEventListener('mouseup', mouseUpHandler);
        }

    }, [onDraw]);

    return { canvasRef, onMouseDown, clear };

}
