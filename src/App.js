import { useState } from 'react';
import Form from './form.js';
import Formu from "./form_para.js"
import Formh from "./form_h.js"
import Formb from "./form_b.js"
export default function App() {
  const[number,setnumber] =useState([0])
  return (
    <div class="header">
      <h1 class="header_top">Charts and Graphs</h1>
      <h2 class="header_top_1">Built any type of Charts and graphs here</h2>
      
      <div >
        <div class="first"><Form/></div>
        <div><Formu/></div>
        <div><Formh/></div>
        <div><Formb/></div>
      </div>
    </div>
  );
}


