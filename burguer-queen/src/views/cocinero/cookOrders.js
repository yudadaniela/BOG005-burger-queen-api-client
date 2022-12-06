import React from 'react'
import Header from '../../components/Header'
import { getOrders, getToken } from '../../functions/requests'
import { useState, useEffect } from "react";
import { BiExit } from "react-icons/bi";
import logo from "../../img/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";


const GetOrders = () => {
  const [currentOrders, setcurrentOrders] = useState([]); // ordenes actuales
  const [timer, setTimer] = useState(''); // ordenes actuales
  const navigate = useNavigate();
  console.log(currentOrders, 'lo que entra');
  const loginOutHandle = () => {
    navigate("/");
  };

  const timeHandle =(i)=>{
    console.log(currentOrders[i].dataEntry, 'fecha');
    return  currentOrders[i].dataEntry
  }

  useEffect(() => {
    getOrders(getToken())
      .then((response) => response.json())
      .then((data) => {
        setcurrentOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <nav className="navHeader">
        <img className="logo" src={logo} />
        <div >
          <h1>Pedidos</h1>
        </div>
        <div>
          <p>
            <BiExit className="exitIcon" onClick={loginOutHandle} />
          </p>
        </div>
      </nav>
      compotente OrderState

      <div>

        {currentOrders.map((order, i) => {
          return (
            <div key={i}>
              el id es: {order.id}
              {order.client}
              {order.dataEntry}
              es el tiempo{timeHandle}
              {order.products.map((p, j) => {
                return (
                  <div key={j}>
                    {p.product.name}
                    es la cantidad{p.qty}
                  </div>
                );
              })}
              <div> Para entregar</div>

            </div>
          );
        })}
      </div>




    </div>
  )
}

export default GetOrders