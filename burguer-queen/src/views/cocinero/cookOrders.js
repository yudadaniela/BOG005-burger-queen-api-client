import React from 'react'
import Header from '../../components/Header'
import { getOrders, getToken } from '../../functions/requests'
import { useState, useEffect } from "react";
import { BiExit } from "react-icons/bi";
import logo from "../../img/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './cookOrders.css'

const GetOrders = () => {
  const [currentOrders, setcurrentOrders] = useState([]); // ordenes actuales
  const navigate = useNavigate();
  console.log(currentOrders, 'lo que entra');
  const loginOutHandle = () => {
    navigate("/");
  };

  ///setTimeout(()=>{},1000)

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
      <div className='prueba'>
        {currentOrders.map((order, i) => {
          return (
            <div key={i} className="containerCardCook">
              <div className='containerHeaderCard'> 
              <h3 className="titleCook"> Pedido #{order.id} </h3>
              <p className="textClient"> Cliente: {order.client}</p>
              {order.products.map((p, j) => {
                return (
                  <div key={j} className="ContainerProductsCook">
                    <p className="textProduct">{p.product.name}</p>
                    <p className="textQty">{p.qty}</p>
                  </div>
                );
              })}
              </div>
              <div> 
                <button className="buttonCook"> 
                Para entregar
                </button>
              </div>

            </div>
          );
        })}
      </div>




    </div>
  )
}

export default GetOrders