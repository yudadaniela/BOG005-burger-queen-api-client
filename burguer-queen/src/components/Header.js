import React from 'react'
import '../views/getUsers/getUsers.css'
import { BiExit } from "react-icons/bi";
import logo from '../img/logo.png'
import { Link, Navigate, Outlet } from 'react-router-dom'

const Header = () => {
 //console.log(pagesAdmin());
  return (

         <header> 
          <nav className="navHeader"> 
            <img className="logo" src={logo} />
            <Link to="/admin/getUser">Crear Usuario</Link>
            <Link to="/admin/getProducts" >Crear Productos</Link>
            <p ><BiExit className="exitIcon"/></p>
          </nav>
          <Outlet/>
        </header>
  )
}
export default Header