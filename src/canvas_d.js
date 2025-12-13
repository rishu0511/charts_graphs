import React from "react";
import { useRef, useEffect, useState } from "react";
export default function Canvasd(props) {
  const canvasRef = useRef(null);
  const [Width, setwidth] = useState(0);
  const [cvalue,setvalue] = useState("");
  const [bvalue,setbvalue] = useState("");
  const ref = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    setwidth(width);
    drawStar("black",context,props.X1,props.X3,props.Y1,props.Y3,props.BIZX,props.BIZY,props.A,props.B,props.C,props.VX,props.VY,props.SVAL,Width);
  });
  function drawStar(fillColor,ctx,x1,x3,y1,y3,bzx,bzy,a,b,c,vx,vy,sval,width){
    let screex=0
    if(width>900){
      screex=width/6
    }else{
      screex=0
    }
    ctx.translate(screex,0)
    ctx.fillStyle = fillColor;
    ctx.clearRect(0, 0, Width-Width/10+60, 460); 
    ctx.fillStyle = "white";
    ctx.fillRect(10,0, 760,700);
    ctx.font = "18px fantasy";
    ctx.fillStyle = "black";
    if(c >= 0){
      setvalue("+"+c)
    }else if (c<0){
      setvalue(c)
    }
    if(b >= 0){
      setbvalue("+"+b)
    }else if (b<0){
      setbvalue(b)
    }
    ctx.fillText("Equation :- "+a+"x²"+bvalue+"x"+cvalue,400,60);
    ctx.fillText("Vertex of parabola:-(" + vx +","+ vy +")",400,100);
    
    ctx.translate(310,396)
    ctx.rotate(-Math.PI/2)
    ctx.save()
    var scl = 20
    ctx.lineWidth=2
    for(let v = 0;v<4 ;v++){
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(290, 0);
        ctx.stroke();
        if(v === 1){
          ctx.font = "18px fantasy";
          ctx.fillStyle = "black";
          ctx.fillText("Y" ,23,276);
          ctx.fillText("X",-280,20);
        }
         for(let i = 1;i<=15 ;i++){
          ctx.beginPath();
          ctx.moveTo(19*i, -3);
          ctx.lineTo(19*i, 3);
          ctx.stroke();
          if(v === 1){
            ctx.font = "9px fantasy";
            ctx.fillStyle = "black";
            ctx.fillText("-"+i*sval,-19*i-5,-5);
            ctx.fillText(+i*sval,19*i,-5)
          }else if(v === 2){
            ctx.font = "9px fantasy";
            ctx.fillStyle = "black";
            ctx.fillText("-"+i*sval,19*i,-5);
            ctx.fillText(i*sval ,-19*i-5,-5)
          } 
        }
        ctx.rotate(Math.PI / 2);
    }
    ctx.restore()
    ctx.lineWidth = 2
    const sv = 19/sval
    ctx.beginPath();
    ctx.moveTo(y1*sv,x1*sv);
    ctx.quadraticCurveTo( bzy*sv,bzx*sv,y3*sv,x3*sv);
    ctx.stroke();
    ctx.save();
    ctx.restore()
    
  }
  return <canvas id="dCanvas" ref={canvasRef} width={Width-Width/10+60} height={700}  />;
}