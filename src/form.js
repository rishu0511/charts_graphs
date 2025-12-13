import React from "react";
import { useState,useCallback, useEffect, createContext, useContext } from "react";
import Canvas from "./pie_canvas.js"
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
  const [ddisable,setddisable] = useState(false)
  function handleChange(event) {
    setrname("")
    sethidden(false)
    setnumber([0])
    setper([])
    setcolor([])
    setname([])
    setdisable(true)
    setddisable(false)
    const { name, value } = event.target;
    setinput((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      }
    });
  }
  function savephoto(){
  var canvas = document.querySelector("#myCanvas");
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
    setddisable(false)
  }
  function makearrays(input_arr,set_arr){
    var arr_r = input_arr;
    var arr_len = arr_r.length
    var arr_seprate = []
    arr_seprate.push(0) 

    for(let v=0;v<=arr_len;v++){
      var r = 0
      arr_r[v] === ","? arr_seprate.push(v):r=1;
    }
    var arr_s_len = arr_seprate.length
    for(let i=0;i<=arr_s_len-1;i++){
      if(i===0){
        var arr_num = arr_r.slice(arr_seprate[i],arr_seprate[i+1]);
      } else{
        var arr_num = arr_r.slice(arr_seprate[i]+1,arr_seprate[i+1]);
      }
      set_arr.push(arr_num)
    }
  }
  const handlesubmit = useCallback((event) => {
    setdisable(false)
    setrname(input.name)
    settotal(input.total)
    event.preventDefault()
    makearrays(input.Nonames,name)
    makearrays(input.colors,color)
    // here all number works 

    var num = input.numbers;
    var num_len = num.length
    var arr_seprate = []
    arr_seprate.push(0)
    for(let i=0;i<=num_len;i++){
      var ra = 0
      num[i]=== ","? arr_seprate.push(i):ra=1;
    }
    var arr_s_len = arr_seprate.length
    for(let i=0;i<=arr_s_len-1;i++){
      if(i===0){
        var f_num = num.slice(arr_seprate[i],arr_seprate[i+1] );
        var snum = parseFloat(f_num);
        number.push(snum)
      }else{
        var f_num = num.slice(arr_seprate[i]+1,arr_seprate[i+1] );
        var snum = parseFloat(f_num);
        number.push(snum)

      }
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
    })
    setddisable(true)
   sethidden(true)
  }, [input,per,number,val,color]);
  function Cancel(){
    sethidden(false)
    setdisable(true)
    setddisable(false)
    setrname("")
    sethidden(false)
    setnumber([0])
    setper([])
    setcolor([])
    setname([])
    setdisable(true)
    setddisable(false)
  }

  return (
    < div class="setbottamdiv">
      <form class="FORM" >
        <h2 class="form_name">Pie Chart</h2>
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
          placeholder="All numbers with coma(,)..."
          value={input.numbers}
          type="text"
        />
        <input
          onChange={handleChange}
          name="Nonames"
          placeholder="Respected names with no.(serrated with ,)"
          value={input.Nonames}
          type="text"
        />
        <input
          onChange={handleChange}
          name="colors"
          placeholder="respected colors with names with one coma(,)..."
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
        <button disabled={ddisable} onClick={handlesubmit}>Draw</button>
        <button id="download" disabled={disable} onClick={savephoto}>Download</button>
        <button disabled={disable} onClick={Cancel}>Cancel</button>
      </form>
      {ishidden ?<div  class="pie-canvas"><Canvas ARR={per} VAL={val} COLOR={color} NAMES={name}  NAME={rname}/></div>:null}    </div>
  );
}