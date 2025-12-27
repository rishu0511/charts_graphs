import React from "react";
import { useRef, useEffect, useState } from "react";
export default function Canvasd(props) {
  const canvasRef = useRef(null);
  const [Width, setwidth] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    setwidth(width);
    drawStar(props.WID,context,props.XGAP,props.YGAP,props.XL,props.YL,props.NGX,props.NGY,props.RECTS,props.COLOR,props.NAME,props.SVAL);
  });
  function drawStar(histwidth,ctx,xg,yg,xl,yl,ngx,ngy,rects,color,naam){
    ctx.translate(0,0)
    ctx.save()
    ctx.restore()
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0,760, 460);
    ctx.fillStyle = naam[0] || "white";
    ctx.fillRect(0,0, 760,700)
    ctx.font = "25px fantasy";
    ctx.fillStyle = naam[1] || "black"
    ctx.fillText(naam[2] || "",420,80)
    ctx.translate(90,600)
    ctx.lineWidth = 2
    for(let v = 0;v<=1;v++){
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(560, 0);
        ctx.stroke();
        if(v===1){
           ctx.font = "20px fantasy";
            ctx.fillStyle = naam[1] || "black";
            ctx.fillText(yl,120,-50);
            for(let i = 1;i<=ngy;i++){
              ctx.beginPath();
              ctx.moveTo((550/ngy)*i, -4);
              ctx.lineTo((550/ngy)*i, 4);
              ctx.stroke();
              ctx.font = "13px fantasy";
              ctx.fillStyle = "black";
              ctx.fillText(yg*i,(550/ngy)*i,-20);
            }
        }
        if(v===0){
           ctx.font = "20px fantasy";
            ctx.fillStyle = naam[1] || "black";
            ctx.fillText(xl,120,50);
          for(let i = 1;i<=ngx ;i++){
            ctx.beginPath();
            ctx.moveTo((550/ngx)*i, -4);
            ctx.lineTo((550/ngx)*i, 4);
            ctx.stroke();
            ctx.font = "13px fantasy";
            ctx.fillStyle = "black";
            ctx.fillText(xg*i,(550/ngx)*i,20);
          }
        }
        ctx.rotate(-Math.PI/2)
      }
    ctx.save()
    const len  = rects.length
    for(let i=0;i<=len;i++){
      let hwid= histwidth;
      const histx= (-(550/ngx)/xg)*(histwidth)
      ctx.fillStyle = color[i]
      ctx.fillRect(histx*i,1,(-(550/ngx)/xg)*(histwidth),((550/ngy)/yg)*rects[i])
    }
    ctx.restore()
  }
  return <canvas id="hcanvas" class="posCanvas" ref={canvasRef} width={760} height={700} />
}