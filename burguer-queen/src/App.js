import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './views/login/login.js';
//import { Example } from './views/login/login.js';

function App() {

  return (

    <div className="App">
      <section className="App-header">
        <Login/>
    
      </section>
    </div>
  );
}

export default App;
