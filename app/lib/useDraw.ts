'use client'
import { useEffect, useRef } from "react";

export const useDraw = (rect : (points: RectPoint) => void) => {

    const canvaRef = useRef<HTMLCanvasElement>(null);
    let x: number, y: number, dy: number, dx: number;

    useEffect(() => {
        const mouseHandler = (e: MouseEvent) => {
        }

        canvaRef.current?.addEventListener("mouseover", (e) => {
            console.log(e.clientX);

        })

        canvaRef.current?.addEventListener("mousedown", (e) => {
            x = e.clientX;
            y = e.clientY;
        });

        canvaRef.current?.addEventListener("mouseup", (e) => {

            const ctx = canvaRef.current?.getContext('2d');

            if (!ctx)
                return;
            
            dy = e.clientY;
            dx = e.clientX;
            let dPoints: Point = { x : dx, y: dy }
            let mPoints: Point = { x: x, y: y }
            let rectPoints = new RectPoint(ctx, mPoints, dPoints);

            console.log(`this.x = ${x}`);

            rect(rectPoints);
        });

    });

    return canvaRef;

}
