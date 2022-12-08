import React from "react";
import Header from "../../components/Header";
import { getOrders, getToken,editOrder } from "../../functions/requests";
import { useState, useEffect } from "react";
import { BiExit } from "react-icons/bi";
import logo from "../../img/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./cookOrders.css";
import Timer from "../../components/timer";


const GetOrders = () => {
  const [currentOrders, setcurrentOrders] = useState([]); // ordenes actuales
  const navigate = useNavigate();
  console.log(currentOrders, "lo que entra");
  const loginOutHandle = () => {
    navigate("/");
  };

  const getDate = () => new Date().toString();

  // const timeHandle = (dataOrder) => {
  //   console.log(dataOrder, 'lo que entra');

  //   const [h1, m1, s1] = dataOrder.split(' ')[4].split(':')
  //   const [h2, m2, s2] = getDate().split(' ')[4].split(':')
  //   console.log([h1, m1, s1], 'h1,m1,s1');
  //   console.log([h2, m2, s2], 'h2,m2,s2');
  //   let cronometro = `${Math.abs([h1, m1, s1][0] - [h2, m2, s2][0])} : ${Math.abs([h1, m1, s1][1] - [h2, m2, s2][1])} : ${Math.abs([h1, m1, s1][2] - [h2, m2, s2][2])} `
  //   // let calculoInicial = `${([h1, m1, s1][0])*60 + ([h1, m1, s1][1]) + ([h1, m1, s1][2])/60} `// fecha inicial en minutos
  //   // let calculoFinal= `${([h2, m2, s2][0])*60 + ([h2, m2, s2][1]) + ([h2, m2, s2][2])/60} `
  //   // console.log(calculoInicial, 'inicial', calculoFinal,'final');
  //   // console.log(-calculoFinal+calculoInicial, 'resta');
  //   //let calculo = `${([h1, m1, s1][0] - [h2, m2, s2][0])*60 + ([h1, m1, s1][1] - [h2, m2, s2][1]) + ([h1, m1, s1][2] - [h2, m2, s2][2])/60} `

  //   console.log(cronometro, 'diferencia en horas');
  //   console.log(typeof cronometro);
  //   // let fecha = new Date()
  //   // var currentDate = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
  //   // console.log(currentDate, 'es fecha');
  //   // console.log(typeof currentDate, 'es el tipo');
  //   return cronometro //currentOrders[i].dataEntry
  // }

const EditOrderHandle=(event)=>{
 editOrder(event.currentTarget.value, getToken(), 'Listo para servir' )
 
console.log('entro al boton');
console.log(event.currentTarget.value,'evento chef');


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
        <div>
          <h1>Pedidos</h1>
        </div>
        <div>
          <p>
            <BiExit className="exitIcon" onClick={loginOutHandle} />
          </p>
        </div>
      </nav>
      <div className="prueba">
        {currentOrders.map((order, i) => {
          return (
            <div key={i} className="containerCardCook">
              <div className="containerHeaderCard">
                <h3 className="titleCook"> Pedido #{order.id} </h3>
                <p className="textClient"> Cliente: {order.client}</p>
                <p className="textClient"> en cook  {order.dataEntry}</p>
                 <Timer dataCurrentOrder={order.dataEntry}
                 /* timeHandle={timeHandle} */
                />
                
                
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
                <button className="buttonCook" onClick={EditOrderHandle} value={order.id}>Para entregar</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetOrders;


// <Timer dataCurrentOrder={order.dataEntry}
//                 /* timeHandle={timeHandle} */
//                 />
