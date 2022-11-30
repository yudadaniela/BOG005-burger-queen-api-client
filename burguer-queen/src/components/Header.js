import React from 'react'
import '../views/getUsers/getUsers.css'
import { BiExit } from "react-icons/bi";
import logo from '../img/logo.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Header = () => {
 const navigate = useNavigate();

 const loginOutHandle =()=>{
  navigate('/')
 }

  return (
         <header> 
          <nav className="navHeader"> 
            <img className="logo" src={logo} />
            <Link to="/admin/getUser">Crear Usuario</Link>
            <Link to="/admin/getProducts" >Crear Productos</Link>
            <div >
              <p ><BiExit className="exitIcon" onClick={loginOutHandle}/></p> 
            </div>
        
          </nav>
          <Outlet/>
        </header>
  )
}
export default Header