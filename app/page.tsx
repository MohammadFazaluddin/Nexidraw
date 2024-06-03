import { useDraw } from "./lib/useDraw";

export default function Home() {

    const canvaRef = useDraw(rect);    

    function rect(points: RectPoint): void {
        points.ctx.beginPath();
        let w = points.start.x - points.end.x;
        let h = points.start.y - points.end.y; 

        points.ctx.fillRect(points.start.x, points.start.y, w, h); 
        points.ctx.stroke();
    }
    
    return (
        <canvas className="w-screen bg-white" ref={canvaRef}/>
    );
}
