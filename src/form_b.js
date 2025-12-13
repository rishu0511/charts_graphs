import React from "react";
import { useState,useCallback, useEffect, createContext, useContext } from "react";
import Canvasb from "./canvas_b.js"
export default function Formb(props){
  const [input, setinput] = useState({
    name:"",
    x: "",
    y:"",
    ngx: 0,
    ngy: 0,
    recth: "",
    color :"",
    nameh:""
  });
  const [numbery,setynumber] = useState(0)
  const [ylabel,setylabel] = useState("")
  const [Recth,setrect] = useState([])
  const [color,setcolor] = useState([])
  const [ishidden,sethidden] = useState(false)
  const [name,setrname] = useState([])
  const [Nameh,setrnameh] = useState([])
  const [disable,setdisable] = useState(true)
  const [ddisable,setddisable] = useState(false)
  function handleChange(event) {
    setynumber(0)
    setylabel("")
    setcolor([])
    setrect([])
    sethidden(false)
    setrname([])
    setdisable(true)
    setrnameh([])
    const { name, value } = event.target;
    setinput((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      }
    });
  }
  function savephoto(){
    var canvas = document.querySelector("#hCanvas");
    var image = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
    var element = document.createElement('a');
    var filename = 'test.jpg';
    element.setAttribute('href', image);
    element.setAttribute('download', filename);
    element.click();
    setynumber(0)
    setylabel("")
    setcolor([])
    setrect([])
    sethidden(false)
    setrname([])
    setdisable(true)
    setrnameh([])
  }
  function makearrays(input_arr,set_arr,boolean){
    var colo_r = input_arr ;
    var color_len = colo_r.length
    var color_seprate = []
    color_seprate.push(0) 

    for(let v=0;v<=color_len;v++){
      var r = 0
      colo_r[v] === ","? color_seprate.push(v):r=1;
    }
    var color_s_len = color_seprate.length
    for(let i=0;i<=color_s_len-1;i++){
      if(i===0){
        var color_num = colo_r.slice(color_seprate[i],color_seprate[i+1] );
      }else{
        var color_num = colo_r.slice(color_seprate[i]+1,color_seprate[i+1] );
      }
      if(boolean==true){
        set_arr.push(parseFloat(color_num))
      }else{
        set_arr.push(color_num)
      }
    }
  }
  function makearrayss(input_arr,set_arr,boolean){
    var colo_r = input_arr ;
    var color_len = colo_r.length
    var color_seprate = []
    color_seprate.push(0) 

    for(let v=0;v<=color_len;v++){
      var r = 0
      colo_r[v] === ","? color_seprate.push(v):r=1;
    }
    for(let i=0;i<=2;i++){
      if(i===0){
        var color_num = colo_r.slice(color_seprate[i],color_seprate[i+1]);
      }else if(i===1) {
        var color_num = colo_r.slice(color_seprate[i]+1,color_seprate[i+1]);
      }else if(i===2){
        var color_num = colo_r.slice(color_seprate[i]+1,color_len);
      }
        set_arr.push(color_num)
    }
  }

  const handlesubmit = useCallback((event) => {
    // for y
    const ystr = input.y;
    const yindex = ystr.indexOf(" ");
    const ylen = ystr.length;
    const splitnumy = ystr.slice(0,yindex+1);
    const numy = parseFloat(splitnumy);
    setynumber(parseInt(splitnumy));
    const splitlabely = ystr.slice(yindex,ylen);
    setylabel(splitlabely);
    // Make array
    makearrays(input.recth,Recth,true)
    makearrays(input.color,color,false)
    makearrays(input.nameh,Nameh,false)
    makearrayss(input.name,name)
    sethidden(true);
    setdisable(false)
    event.preventDefault();
  }, [input,numbery,ylabel,name,Nameh])
  function Cancel(){
    setdisable(true)
    setynumber(0)
    setylabel("")
    setcolor([])
    setrect([])
    sethidden(false)
    setrname([])
    setdisable(true)
    setrnameh([])
  }
  return (
    <div class="setbottamdiv">
      <form class="FORM" id ="histogramp">
        <h2 class="form_name">Bar Graph</h2>
        <input
          onChange={handleChange}
          name="name"
          placeholder="background color, font color,title..."
          value={input.name}
          type="text"
        />
        <input
          onChange={handleChange}
          name="x"
          placeholder="X label..."
          value={input.x}
          type="text"
        />
        <input
          onChange={handleChange}
          name="y"
          placeholder="Y gap ,label..."
          value={input.y}
          type="text"
        />
        <input
          onChange={handleChange}
          name="ngx"
          placeholder="Max no of bars(adjust width of bar as well)"
          value={input.ngx}
          type="number"
        />
        <input
          onChange={handleChange}
          name="ngy"
          placeholder="Number of ygaps"
          value={input.ngy}
          type="number"
        />
        <input
          onChange={handleChange}
          name="recth"
          placeholder="Bargraphs number with one coma(,).."
          value={input.recth}
          type="text"

        />
        <input
          onChange={handleChange}
          name="nameh"
          placeholder="Bar graphs name with one coma(,).."
          value={input.nameh}
          type="text"

        />
        <input
          onChange={handleChange}
          name="color"
          placeholder="respective color with one coma(,)..."
          value={input.color}
          type="text"
        />
        <button disabled={ddisable} onClick={handlesubmit}>Draw</button>
        <button id="download" disabled={disable} onClick={savephoto}>Download</button>
        <button disabled = {disable} onClick={Cancel}>Cancel</button>
      </form>
        {ishidden ?<div  class="pie-canvas"><Canvasb  YGAP={numbery} WIDTH={numbery} XL = {input.x} YL={ylabel} NGX = {input.ngx} NGY= {input.ngy} RECTS = {Recth} COLOR = {color} NAME = {name} NAMEH={Nameh}/></div>:null}
    </div>
  );
}