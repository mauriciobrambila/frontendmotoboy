import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import moto from './assets/moto.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id='moto'>
      <img src={moto} alt='logomoto'/>
    </div>
       <App/>
  </React.StrictMode>
);

