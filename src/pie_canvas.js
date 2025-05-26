import React from "react"
import { useRef, useEffect, useState } from "react";
export default function Canvas(props) {
  const canvasRef = useRef(null);
  const [Width, setwidth] = useState(0);
  const [color,setcolor]= useState(["red","blue","yellow"]);
  const [value,setvalue] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    setwidth(width);
    drawStar("black",context,props.VAL,props.ARR,props.COLOR,props.NAMES,props.F_SIZE,props.NAME);
  });
  function drawStar(fillColor, ctx,value,arr,color,name ,fsize,rname){
    ctx.fillStyle = fillColor;
    ctx.save();
    ctx.clearRect(0, 0, Width-Width/4, 460);  
    ctx.fillStyle = "#78A083";
    ctx.fillRect(10,0, 650,460);
    ctx.font = "25px fantasy";
    ctx.fillStyle = "#344955";
    ctx.fillText(rname ,150,450);
    ctx.translate(275, 210);
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
        ctx.lineTo(200, 0);
        ctx.stroke();
         if(i===40){
          ctx.font = "13px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(name[v]+"  "+arr[v]+"%" , 90, -3);
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
  return <canvas id="myCanvas" ref={canvasRef} width={Width-Width/5} height={460}  />;
}