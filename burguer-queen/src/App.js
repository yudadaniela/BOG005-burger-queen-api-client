import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './views/login/styleLogin.css'
import './App.css';
import Login from './views/login/login.js';
import CreateUsersView from './views/createUsers/createUsers';
import Modal from './components/modal';
import GetUser from './views/getUsers/getUsers'
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { Example } from './views/login/login.js';
function App() {
  return (
    <BrowserRouter>
     <h1>HOla</h1>
      <Routes>
      
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/getUser" element={<GetUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
