import React from 'react'
import Header from '../../components/Header'
import { getOrders, getToken } from '../../functions/requests'
import { useState, useEffect } from "react";
import { BiExit } from "react-icons/bi";
import logo from "../../img/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";


const GetOrders = () => {
  const [currentOrders, setcurrentOrders] = useState([]); // ordenes actuales
  const navigate = useNavigate();
  console.log(currentOrders, 'lo que entra');
  const loginOutHandle = () => {
    navigate("/");
  };

  ///setTimeout(()=>{},1000)
  // const timeProcessed = (currentOrders) => {
  //   let string = []

  //   currentOrders.map((order, i  ) => {
  //     const hour = order.dateEntry.slice( -8, order.dateEntry.length).split(":")
  //   console.log(hour,'esta es la hora de pedido');

  //   })
    
    // const hourProcessed = new Date().toLocaleTimeString('es-ES').split(":")
    // console.log(hourProcessed, 'esta es la hora actual ');
    // for(let i = 0; i < hour.length; i++){
    //     string.push( Math.abs(parseInt(hourProcessed[i]) - parseInt(hour[i]))  )
    // }
    // const timeAll = string.toString().replaceAll(',', ':')
    // return timeAll
// }
  

  

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