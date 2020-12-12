import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import WellnessLabApp from "./Components/WellnessLabApp";

ReactDOM.render(
  <React.StrictMode>
    <WellnessLabApp />
  </React.StrictMode>,
  document.getElementById('root')
);