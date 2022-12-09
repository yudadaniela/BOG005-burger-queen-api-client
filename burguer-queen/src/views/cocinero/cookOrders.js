import React from "react";
import { getOrders, getToken, editOrder } from "../../functions/requests";
import { useState, useEffect } from "react";
import { BiExit } from "react-icons/bi";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import "./cookOrders.css";
import Timer from "../../components/timer";
import { VscBell } from "react-icons/vsc";

const GetOrders = () => {
  const [currentOrders, setcurrentOrders] = useState([]); // ordenes actuales
  const navigate = useNavigate();
  console.log(currentOrders, "lo que entra");
  const loginOutHandle = () => {
    navigate("/");
  };

  const ordersToCook = currentOrders.filter(
    (order) => order.status === "Enviado a cocina"
  );

  const EditOrderHandle = (event) => {
    editOrder(event.currentTarget.value, getToken(), "Listo para servir");
    currentOrders.splice(event.currentTarget.dataset.p, 1); // retorna lo que borramos
    setcurrentOrders([...currentOrders]);
  };

  useEffect(() => {
    getOrders(getToken())
      .then((response) => response.json())
      .then((data) => {
        setcurrentOrders(
          data.filter((order) => order.status === "Enviado a cocina")
        );
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
          <h1>Pedidos <VscBell/>{ordersToCook.length} </h1>
        </div>
        <div>
          <p>
            <BiExit className="exitIcon" onClick={loginOutHandle} />
          </p>
        </div>
      </nav>
      <div className="containerOrders">
        {currentOrders.map((order, i) => {
          return (
            <div key={i} className="containerCardCook">
              <div className="containerHeaderCard">
                <div className="titleAndTimer"> 
                <div> 
                <h3 className="titleCook"> Pedido #{order.id} </h3>
                <p className="textClient"> Cliente: {order.client}</p>
                </div>
                <Timer  dataCurrentOrder={order.dataEntry} />
                </div>
               
                <div className="containerProductsCard">
                  {order.products.map((p, j) => {
                    return (
                      <div key={j} className="ContainerProductsCook">
                        <p className="textProduct">{p.product.name}</p>
                        <p className="textQty">{p.qty}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <button
                  className="buttonCook"
                  onClick={EditOrderHandle}
                  value={order.id}
                >
                  Para entregar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetOrders;
