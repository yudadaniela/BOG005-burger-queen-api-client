import './views/login/styleLogin.css'
import './App.css';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './views/login/styleLogin.css'
import './App.css';
import Login from './views/login/login.js';
import CreateUsersView from './views/createUsers/createUsers';
import Modal from './components/modal';
import GetUser from './views/getUsers/getUsers'
import React from "react";
import request from './functions/requests'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetProducts from './views/getProducts/getProducts';
import MenuView from './views/mesero/menuView';
import OrderState from './views/mesero/orderState';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route exact path="/" element={<Login />} />
        
        <Route exact path="/admin/getUser" element={<GetUser />} />
        <Route exact path="/admin/getProducts" element={<GetProducts />} />
      
        <Route path="/waiter/MenuView" element={<MenuView />}/>
        <Route path="/waiter/orderState" element={<OrderState />}/>

        <Route path="*" element={'pagina no existe'} />
      </Routes>
    </BrowserRouter>






  );
}
export default App;

/* <Route exact path="/getUser" element={<GetUser/>}/>
        <Route exact path="/getProducts" element={<GetProducts/>}/> */
/* 
        <Routes>
        <Route index element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Admin />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/getUser" element={<GetUser />} />
          <Route exact path="/getProducts" element={<GetProducts />} />
        </Route>
      </Routes> */