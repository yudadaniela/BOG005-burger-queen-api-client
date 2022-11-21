import './views/login/styleLogin.css'
import './App.css';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import Login from './views/login/login.js';
import CreateUsersView from './views/createUsers/createUsers';
import Modal from './components/modal';
import GetUser from './views/getUsers/getUsers'
import React from "react";
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom'
//import { Example } from './views/login/login.js';

function App() {
/// HACER EL CONDICIONAMIENTO DE ROUTEADO
  return (
    
    <BrowserRouter>
     <h1>HOla</h1>
     <Link to='/getUser' className='buttonLogin'> ir a usuarios</Link>
     <Link to='/login' className='buttonLogin'>VOLVER</Link>
     <Routes>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/getUser" element={<GetUser/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
