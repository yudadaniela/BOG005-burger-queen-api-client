import React from 'react'
import '../views/getUsers/getUsers.css'
import { BiExit } from "react-icons/bi";
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {

  return (

         <header> 
          <nav className="navHeader"> 
            <img className="logo" src={logo} />
            <Link to="/getUser">Crear</Link>
            <Link to="/crearProductos">Crear Productos</Link>
            <p><BiExit className="exitIcon"/></p>
          </nav>
        </header>

  )
}
export default Header