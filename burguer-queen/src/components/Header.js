import React, { useState, useEffect } from "react";
import "../views/getUsers/getUsers.css";
import { BiExit } from "react-icons/bi";
import logo from "../img/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Header = ({ path1, title1, path2, title2 }) => {
  const navigate = useNavigate();

  const loginOutHandle = () => {
    navigate("/");
  };

  useEffect(()=>{},[])

  const [linkSelected,setLinkSelected] = useState(true)
  const [linkNoSelected,setLinkNoSelected] = useState(false)
  

  const isSelected =()=>{
    setLinkSelected(true)
    setLinkNoSelected(false)
  }
  const isNoSelected =()=>{
  
    setLinkNoSelected(true)
    setLinkSelected(false)
    console.log(linkNoSelected, 'link de isNoSelected')
  }

  return (
    <header>
      <nav className="navHeader">
        <img className="logo" src={logo} />
        <div className="navHeaderSwitch">
          <Link onClick={isSelected} className={linkSelected?'linkSelected':'NoLinkSelected'} to={path1}> {title1} </Link>
          <Link onClick={isNoSelected} className={linkNoSelected?'linkSelected':'NoLinkSelected'} to={path2}>{title2}</Link>
        </div>
        <div>
          <p>
            <BiExit className="exitIcon" onClick={loginOutHandle} />
          </p>
        </div>
      </nav>
      <Outlet />
    </header>
  );
};
export default Header;
