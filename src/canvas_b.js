import React from "react";
import { useRef, useEffect, useState } from "react";
export default function Canvasb(props){
  const canvasRef = useRef(null);
  const [Width, setwidth] = useState(0);
  const [color,setcolor]= useState(["red","blue","yellow"]);
  const [cvalue,setvalue] = useState("");
  const [bvalue,setbvalue] = useState("");
  const ref = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    setwidth(width);
    drawStar(context,props.YGAP,props.XL,props.YL,props.NGX,props.NGY,props.RECTS,props.COLOR,props.NAME,props.NAMEH);
  });
  function drawStar(ctx,yg,xl,yl,ngx,ngy,rects,color,naam,naamh){
    ctx.translate(0,0)
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, Width-Width/10+60, 700);
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
            const len  = naamh.length
            for(let i=0;i<len;i++){
              ctx.font = "14px Arial";
              ctx.fillStyle = naam[1] || "black";
              ctx.fillText(naamh[i],((550/ngy)/yg)*rects[i]+5,((550/ngx)*i)*1.2+25+(550/ngx)/2);
            }
        }
        if(v===0){
            ctx.font = "20px fantasy";
            ctx.fillStyle = naam[1] || "black";
            ctx.fillText(xl,120,50);
        }
        ctx.rotate(-Math.PI/2)
      }
    ctx.restore()
    ctx.save()
    const len  = rects.length
    for(let i=0;i<=len;i++){
      ctx.fillStyle = color[i]
      ctx.fillRect(-((550/ngx)*i)*1.2-20,1,-(550/ngx),((550/ngy)/yg)*rects[i])
    }
    ctx.restore()
  }
  return <canvas id="hCanvas" class="posCanvas" ref={canvasRef} width={Width-Width/10+60} height={700} />
}