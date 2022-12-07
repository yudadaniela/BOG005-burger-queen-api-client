import React, { useEffect, useState } from "react";
import { createOrder, getToken } from "../../functions/requests";
import { AiOutlineDelete } from "react-icons/ai";
import "./mesero.css";

const CardOrder = ({ productsListOrder, setproductsListOrder }) => {
  const [qtyProduct, setQtyProduct] = useState(true);
  const [qtyTotal, setqtyTotal] = useState(1);
  const [nameClient, setNameClient] = useState("");

  const qtyPlusHandle = (event) => {
    console.log("entre a suma ");
    const productSelected = productsListOrder.filter(
      (p) => p.product.id == event.currentTarget.dataset.p
    );
    console.log(productSelected[0].qty, "lo que filtro");
    console.log(productsListOrder, "pa ve");
    productSelected[0].qty += 1;
    productSelected[0].price =
      parseInt(productSelected[0].product.price) +
      parseInt(productSelected[0].price);
    setproductsListOrder([...productsListOrder]);
    setQtyProduct(true);
  };
  const qtyRestHandle = (event) => {
    console.log("entre a suma ");
    const productSelected = productsListOrder.filter(
      (p) => p.product.id == event.currentTarget.dataset.p
    );
    console.log(productSelected[0].qty, "es lo que filtró");
    if (productSelected[0].qty >= 1) {
      productSelected[0].qty -= 1;
      productSelected[0].price =
        parseInt(productSelected[0].price) -
        parseInt(productSelected[0].product.price);
    } else {
      productSelected[0].qty -= 0;
    }
    setproductsListOrder([...productsListOrder]);
    setQtyProduct(false);
  };

  const nameClientHandle = (e) => {
    setNameClient(e.target.value);
  };

  const getTotal = () => {
    let totalCount = productsListOrder.reduce(
      (acum, i) => acum + i.qty * i.product.price,
      0
    );
    console.log(totalCount, "total");

    return totalCount;
  };

  const getDate = () => new Date().toString();

  const createOrderHandle = (e) => {
    e.preventDefault();
    createOrder(
      getToken(),
      nameClient,
      "Enviado a cocina",
      productsListOrder,
      getTotal(),
      getDate()
    ).then((res) => console.log(res)); // pte arreglar productsListOrder armar acá?
  };

  const deleteProduct = (event) => {
    productsListOrder.splice(event.currentTarget.dataset.p, 1); // retorna lo que borramos

    setproductsListOrder([...productsListOrder]);
  };

  return (
    <div>
      <form className="containerFormOrder" onSubmit={createOrderHandle}>
        <div className="containerOneOrder">
          <p className="textOrderTitle"> Pedido </p>
          <input
            className="inputNameClient"
            type="text"
            placeholder=" Escribe nombre del Cliente"
            name="nameClient"
            value={nameClient}
            onChange={nameClientHandle}
            data-testid="nameClient"
            required
          ></input>
          {/* <p>Nombre del Cliente:{nameClient} </p> */}
        </div>
        <div>
          {productsListOrder.map((p, i) => {
            return (
              <div className="pedido" key={i}>
                <div className="containerProductsOrder">
                  <p>{p.product.name}</p>
                  <p>{p.qty}</p>
                  <p>{p.price} </p>
                  <div onClick={deleteProduct} data-p={i}>
                    {" "}
                    <AiOutlineDelete />{" "}
                  </div>
                </div>
                <div onClick={qtyPlusHandle} data-p={p.product.id}>
                  {" "}
                  sumar{" "}
                </div>
                <div onClick={qtyRestHandle} data-p={p.product.id}>
                  {" "}
                  restar{" "}
                </div>
              </div>
            );
          })}
        </div>

        <p>el total es: {getTotal()} </p>

        <button
          type="submit"
          className="addUserButton"
          data-testid="buttonCreateOrder"
          data-p="cocina"
        >
          {" "}
          Enviar a Cocina{" "}
        </button>
      </form>
    </div>
  );
};

export default CardOrder;
