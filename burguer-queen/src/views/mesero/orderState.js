import React from "react";
import Header from "../../components/Header";
import { getOrders, getToken } from "../../functions/requests";
import { useState, useEffect } from "react";
import { VscBell } from "react-icons/vsc";

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
      <div className="subHeader">
        <h1 className="title">Estados de Pedido</h1>
        <p>
          {" "}
          Listos Para servir <VscBell />{" "}
        </p>
        {/* Falta agregar selector para filtrar */}
      </div>

      <div className="tableContainerMain">
        <div className="tableContainer">
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
                  <tr>
                    {" "}
                    {order.status}{" "}
                    {order.status === "Listo para servir" ? (
                      <input type="checkbox" />
                    ) : (
                      ""
                    )}{" "}
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderState;
