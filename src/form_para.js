import React from "react";
import { useState,useCallback, useEffect, createContext, useContext } from "react";
import Canvasd from "./canvas_d.js";
export default function Formu(props){
  const [input,setinput] = useState({
    name: "",
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    cut_val: 0,
  });
  const[x1,setx1] = useState(0)
  const[x3,setx3] = useState(0)
  const [y1 , sety1] = useState(0)
  const [y3 , sety3] = useState(0)
  const [ishidden,sethidde] = useState(false);
  const [bizx,setbx] = useState(0)
  const [bizy,setby] = useState(0)
  const [disable,setdisable] = useState(true)
  const [showdisable,setsdisable] = useState(true)
  const [ddisable,setddisable] = useState(true)
  const [vy,setvy] = useState(0)
  const [vx,setvx] = useState(0)
  const [count,setcount]= useState(0)
  const [Space_val,setval]= useState(0)
  function handleChange(event) {
    const { name, value } = event.target;
    setinput((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      }
    });
    setval(0)
    setx1(0)
    setx3(0)
    sety1(0)
    sety3(0)
    setbx(0)
    setby(0)
    setvx(0)
    setvy(0)
    setcount(0)
    sethidde(false)
    setdisable(true)
    setsdisable(true)
    setddisable(false)

  }
  function savephoto(event){
  var canvas = document.querySelector("#dCanvas");
  var image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
  
  var element = document.createElement('a');
  var filename = 'test.jpeg';
  element.setAttribute('href', image);
  element.setAttribute('download', filename);

  element.click();
   event.preventDefault()
  }
  const handlesubmit = useCallback((event) => {
    const A = input.a
    const B = input.b
    const C = input.c
    setcount(count+1)
    setval(input.d)
    // x1 and x3
    const vartex_x = -B/(2*A)
    setvx(vartex_x)
    const D = (B*B)-((4*A)*C)
    const vertex_y = -D/(4*A)
    setvy(vertex_y)
    event.preventDefault();
    console.log(vertex_y)
    const x3val = parseFloat(vartex_x) + parseFloat(input.cut_val)
    setx3(x3val)
    const x1val = parseFloat(vartex_x) - parseFloat(input.cut_val)
    setx1(x1val)
    console.log(x1)
    // y1 and y3
    const ct_vrtx_y1 = parseFloat(A*(x1*x1)) +parseFloat((B*x1))+parseInt(C)
    sety1(ct_vrtx_y1)
    const ct_vrtx_y3 = parseFloat(A*(x3*x3)) +parseFloat((B*x3))+parseInt(C)
    sety3(ct_vrtx_y3)
    console.log(y3)
    const bizeex = (parseFloat(x1)+parseFloat(x3))/2
    setbx(bizeex)
    const consbiz =parseFloat(((2*A)*x1)) +parseInt(B)
    const bizyval = (x3-x1)/2
    const bizy = parseFloat(bizyval*consbiz)+parseFloat(y1)
    setby(bizy)
    console.log(bizeex)
    console.log(bizy)
    
    if(count===2){
      setsdisable(false)
      setddisable(true)
    }
    event.preventDefault();
  },[input,x1,x3,y1,y3,bizx,bizy,ishidden,count]);
  const showdraw = useCallback((event) => {
    setdisable(false)
    sethidde(true)
    event.preventDefault();
  },[ishidden]);
  return (
    <div>
      <form class="FORM" >
        <input
          onChange={handleChange}
          name="a"
          placeholder="constant of x square"
          value={input.a}
          type="number"
        />
        <input
          onChange={handleChange}
          name="b"
          placeholder="constant of x"
          value={input.b}
          type="number"
        />
        <input
          onChange={handleChange}
          name="c"
          placeholder="Constant value"
          value={input.c}
          type="number"
        />
        <input
          onChange={handleChange}
          name="cut_val"
          placeholder="Cut axis"
          value={input.cut_val}
          type="number"

        />
        <input
          onChange={handleChange}
          name="d"
          placeholder="Fundamental unit"
          value={input.d}
          type="number"

        />
        <button disabled = {ddisable }onClick={handlesubmit}>Draw</button>
        <button disabled = {showdisable} onClick={showdraw}>Show</button>
         <button id="download" disabled={disable} onClick={savephoto}>Download</button>
      </form>
       {ishidden ?<div  class="pie-canvas"><Canvasd VX ={vx} VY = {vy} X1={x1} X3={x3} Y1 = {y1} Y3={y3} BIZX={bizx} BIZY={bizy} A={input.a} B = {input.b} C = {input.c} SVAL ={Space_val}/></div>:null}  
    </div>
  );
}