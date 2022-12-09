import React, { useState, useEffect } from "react";
import "../views/getUsers/getUsers.css";
import { BiExit } from "react-icons/bi";
import logo from "../img/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Header = ({ path1, title1, path2, title2, selectedLink  }) => {

  console.log('ENTRADA selectedLink', selectedLink);
  const navigate = useNavigate();

  const loginOutHandle = () => {
    navigate("/");
  };

  const [linkSelected,setLinkSelected] = useState(true)

useEffect(()=>{
console.log('entra al UE');
if(selectedLink){
  setLinkSelected(linkSelected)
  console.log('se vuelve false');
}
else{
  console.log('se vuelve true');
  setLinkSelected(!linkSelected)
}

  },[selectedLink])
  

  const isNoSelected =()=>{
    setLinkSelected(false)
  }

  console.log('valor linkSelected',linkSelected);

  return (
    <header>
      <nav className="navHeader">
        <img className="logo" src={logo} />
        <div className="navHeaderSwitch">
          <Link className={linkSelected?'linkSelected':'NoLinkSelected'} to={path1}> {title1} </Link>
          <Link onClick={isNoSelected} className={!linkSelected?'linkSelected':'NoLinkSelected'} to={path2}>{title2}</Link>
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
