import React from "react";
import { useState,useCallback, useEffect, createContext, useContext } from "react";
import Canvas from "./pie_canvas.js"
import Canvasd from "./canvas_d.js"
export default function Form(props){
  const [input, setinput] = useState({
    name: "",
    numbers: "",
    Nonames: "",
    colors: "",
    total: 0,
  });
  const [number,setnumber] =useState([0])
  const [per,setper]=useState([])
  const [val,setval]=useState()
  const [ishidden,sethidden] = useState(false)
  const [ihidden,sethidde] = useState(false)
  const [Total,settotal] = useState(0)
  const [color,setcolor] = useState([])
  const [name,setname] = useState([])
  const [rname,setrname] = useState("")
  const [disable,setdisable] = useState(true)
  function handleChange(event) {
    setrname("")
    sethidden(false)
    setnumber([0])
    setper([])
    setcolor([])
    setname([])
    setdisable(true)
    const { name, value } = event.target;
    setinput((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      }
    });
  }
  function savephoto(){
  var canvas = document.querySelector("#dCanvas");
  var image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
  
  var element = document.createElement('a');
  var filename = 'test.jpeg';
  element.setAttribute('href', image);
  element.setAttribute('download', filename);

  element.click();
   setrname("")
    sethidden(false)
    setnumber([0])
    setper([])
    setcolor([])
    setname([])
    setdisable(true)
  }
  function makearrays(input_arr,set_arr){
    var colo_r = input_arr ;
    var color_len = colo_r.length
    var color_seprate = []
    color_seprate.push(0) 

    for(let v=0;v<=color_len;v++){
      var r = 0
      colo_r[v] === " "? color_seprate.push(v):console.log(r);
    }
    var color_s_len = color_seprate.length
    for(let i=0;i<=color_s_len-1;i++){
      var color_num = colo_r.slice(color_seprate[i],color_seprate[i+1] );
      set_arr.push(color_num)
    }
  }
  const handlesubmit = useCallback((event) => {
    setdisable(false)
    setrname(input.name)
    settotal(input.total)
    event.preventDefault()
    makearrays(input.Nonames,name)
    makearrays(input.colors,color)
    console.log(name)
    var num = input.numbers;
    var num_len = num.length
    var arr_seprate = []
    arr_seprate.push(0)
    for(let i=0;i<=num_len;i++){
      var ra = 0
      num[i]=== " "? arr_seprate.push(i):console.log(ra);
    }
    var arr_s_len = arr_seprate.length
    for(let i=0;i<=arr_s_len-1;i++){
      var f_num = num.slice(arr_seprate[i],arr_seprate[i+1] );
      var snum = parseFloat(f_num);
      number.push(snum)
    }
    var arr_len = number.length;
    var total = 500
    for(let i=0;i<=arr_len-1;i++){
      let num = number[i+1] 
      let num_percent = (num/input.total)*100
      var num_realp = num_percent*2
      per.push(Math.floor(num_realp))
    }
    per.pop()
    per.forEach((element,index)=>{
      setval(element)
      console.log(element)
    })
    console.log(per)
    setinput({
    name: "",
    numbers: "",
    Nonames: "",
    colors: "",
    total: "",
    })
   sethidden(true)
  }, [input,per,number,val,color]);
 

  return (
    <div>
      <form class="FORM" >
        <input
          onChange={handleChange}
          name="name"
          placeholder="Name of piechart..."
          value={input.name}
          type="text"
        />
        <input
          onChange={handleChange}
          name="numbers"
          placeholder="All numbers with gap..."
          value={input.numbers}
          type="text"
        />
        <input
          onChange={handleChange}
          name="Nonames"
          placeholder="Respected names with no."
          value={input.Nonames}
          type="text"
        />
        <input
          onChange={handleChange}
          name="colors"
          placeholder="respected colors with names with gap..."
          value={input.colors}
          type="text"
        />
        <input
          onChange={handleChange}
          name="total"
          placeholder="Total number"
          value={input.total}
          type="number"

        />
        <button onClick={handlesubmit}>Draw</button>
        <button id="download" disabled={disable} onClick={savephoto}>Download</button>
      </form>
      {ishidden ?<div  class="pie-canvas"><Canvas ARR={per} VAL={val} COLOR={color} NAMES={name}  NAME={rname}/></div>:null}
      <div hidden={true} ><Canvasd AR={per} VA={val} COLO={color} NAME={name}  NAM={rname}/></div>
    </div>
  );
}