import React, { useState } from "react";
import "../views/getUsers/getUsers.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HeaderSmall = () => {

/*   const [linkSelected,setLinkSelected] = useState(true)
  const [linkNoSelected,setLinkNoSelected] = useState(false)

  const isSelected =()=>{
    setLinkSelected(true)
    setLinkNoSelected(false)
  }
  const isNoSelected =()=>{
  
    setLinkNoSelected(true)
    setLinkSelected(false)
    console.log(linkNoSelected, 'link de isNoSelected')
  } */

  return (
    <header>
      <nav className="navHeader">
        <div className="navHeaderSwitch">
          <Link  to='/waiter/MenuView/breakfast'> Desayuno </Link>
          <Link  to='/waiter/MenuView/lunch'> Almuerzo</Link>
        </div>
      </nav>
      <Outlet />
    </header>
  );
};
export default HeaderSmall;
