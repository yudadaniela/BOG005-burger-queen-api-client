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

  const [linkSelected,setLinkSelected] = useState(true)
  const [linkNoSelected,setLinkNoSelected] = useState(false)
  // useEffect(()=>{
  //  console.log('se selecciono')
  //  console.log(linkSelected, 'linkseleted')
  //  console.log(linkNoSelected, 'noselected')
  //   },[])

  const isSelected =()=>{
    setLinkSelected(true)
    console.log(linkSelected, 'hago click en el link 1 --> true')
    setLinkNoSelected(false)
    console.log(linkNoSelected, 'link no seleccionado 1 --> false')
  }
  const isNoSelected =()=>{
    setLinkNoSelected(true)
    console.log(linkNoSelected, 'hago click en el segundo link  2 --> true')
    setLinkSelected(true)
    console.log(linkSelected, 'hago click isSelected 2 --> false')
  
  }

  return (
    <header>
      <nav className="navHeader">
        <img className="logo" src={logo} />
        <div className="navHeaderSwitch">
          <Link onClick={isSelected} className={linkSelected?'linkSelected':'NoLinkSelected'} to={path1}> {title1} </Link>
          <Link onClick={isNoSelected} className={linkSelected?'NoLinkSelected':'linkSelected'} to={path2}>{title2}</Link>
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
