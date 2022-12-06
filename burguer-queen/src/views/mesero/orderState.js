import React from "react";
import Header from "../../components/Header";
import { getOrders, getToken } from "../../functions/requests";
import { useState, useEffect } from "react";

const OrderState = () => {
  const [currentOrders, setcurrentOrders] = useState([]);

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
      <Header
        path1={"/waiter/MenuView"}
        title1={"Crear Pedido"}
        path2={"/waiter/orderState"}
        title2={"Estado de Pedidos"}
      />
      compotente OrderState
      <div>
        <table className="headerTable">
          <thead key={1} className="dataTable">
            <tr key={1} className="titleTable">
              Código
            </tr>
            <tr key={2} className="titleTable">
              Fecha
            </tr>
            <tr key={3} className="titleTable">
              Cliente
            </tr>
            <tr key={4} className="titleTable">
              Total
            </tr>
            <tr key={4} className="titleTable">
              Estado
            </tr>
          </thead>
        </table>

        {currentOrders.map((order, i) => {
          return (
            <table key={i}>
              <tbody key={i} className="dataTable">
                <tr key={i}> {order.id} </tr>
                <tr> {order.dataEntry} </tr>
                <tr> {order.client} </tr>
                <tr> {order.total} </tr>
                <tr> {order.status} </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
};

export default OrderState;
