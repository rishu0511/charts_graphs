import { useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import Form from './form.js';
import Formu from "./form_para.js"
import Formh from "./form_h.js"
import Formb from "./form_b.js"
export default function App() {
  const[number,setnumber] =useState([0])
  function handlenav(){
    const elementToToggle = document.getElementById('nav');
    elementToToggle.hidden = true; 
  }
  return (
    <div class="header">
      <h1 class="header_top">Charts and Graphs</h1>
      <h2 class="header_top_1">Built and download any type of Charts and graphs here</h2>
      <div class="setbottamdiv">
      <BrowserRouter>
      <nav class="setnavform" >
        <Link to={"/"} class="link" >Piechart</Link>
        <Link to={"/Parabola"} class="link">Parabola</Link>
        <Link to={"/Histogram"} class="link">Histogram</Link>
        <Link to={"/Bargraph"} class="link">Bargraphs</Link>
      </nav>
      <Routes class="setnavform">
        <Route path="/" element={<Form/>}/>
        <Route path="/Parabola" element={<Formu/>}/>
        <Route path="/Histogram" element={<Formh/>}/>
        <Route path="/Bargraph" element={<Formb/>}/>
      </Routes>
      </BrowserRouter>
      </div>

    </div>
  );
}


