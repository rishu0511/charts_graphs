import React from "react"
import { useRef, useEffect, useState } from "react";
function Canvasd(props) {
  const canvasRe = useRef(null);
  const [Width, setwidth] = useState(0);
  useEffect(() => {
    const canvas = canvasRe.current;
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    setwidth(width);
    drawStarr("black",context,props.VA,props.AR,props.COLO,props.NAME,props.NAM);
  },[props]);
  function drawStarr(fillColor, ctx,value,arr,color,name,rname){
    ctx.fillStyle = fillColor;
    ctx.save();
    ctx.clearRect(0, 0, Width-400, 700);
    ctx.fillStyle = "#78A083";
    ctx.fillRect(0,0, Width-400,700);
    ctx.font = "25px fantasy";
    ctx.fillStyle = "#344955";
    ctx.fillText(rname ,150,45);
    ctx.translate(300, 360);
    ctx.rotate(Math.PI / 2);
    ctx.scale(1, 1);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    // Hour marks
    ctx.save();
    var len  = arr.length;
    var VAL = value;
    for(let v = 0; v <= len; v++){
      ctx.strokeStyle = color[v]
      ctx.fill()
      for (let i = 0; i <= 2*arr[v]; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(270, 0);
        ctx.stroke();
         if(i===40){
          ctx.font = "13px fantasy";
          ctx.fillStyle = "black";
          ctx.fillText(name[v]+"  "+arr[v]/2+"%" , 90, -7);
        }
        ctx.rotate(Math.PI / 200);
    }
    }
    ctx.restore();
    ctx.save()
    ctx.beginPath();
    ctx.fillStyle="#35374B";
    ctx.arc(0,0,20,0,Math.PI*2)
    ctx.fill()
    ctx.strokeStyle = "#35374B";
    ctx.stroke();
    ctx.restore()
    ctx.save()
  }
  return <canvas id="dCanvas" ref={canvasRe} width={Width-399} height={700} />;
}
export default Canvasd