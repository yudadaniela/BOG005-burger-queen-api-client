import React from 'react'
import '../views/getUsers/getUsers.css'
import { BiExit } from "react-icons/bi";
import logo from '../img/logo.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Header = ({path1, title1, path2, title2}) => {
 const navigate = useNavigate();

 const loginOutHandle =()=>{
  navigate('/')
 }

  return (
         <header> 
          <nav className="navHeader"> 
            <img className="logo" src={logo} />
            <Link to= {path1} > {title1} </Link>
            <Link to= {path2} >{title2}</Link>
            <div >
              <p ><BiExit className="exitIcon" onClick={loginOutHandle}/></p> 
            </div>
        
          </nav>
          <Outlet/>
        </header>
  )
}
export default Header