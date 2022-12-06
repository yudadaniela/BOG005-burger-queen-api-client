import React, { useEffect, useState } from "react";
import { createOrder, getToken } from "../../functions/requests";
import { AiOutlineDelete } from "react-icons/ai";

const CardOrder = ({ productsListOrder, setproductsListOrder }) => {
  const [qtyroduct, setQtyroduct] = useState(1);
  const [nameClient, setNameClient] = useState("");

  const qtyroductHandle = (event) => {
    const productSelected = productsListOrder.filter(
      (p) => p.product.id == event.currentTarget.dataset.p
    );
    console.log(productSelected, "es lo que filtró");
    setQtyroduct(qtyroduct + 1);
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
      "pending",
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
      <form onSubmit={createOrderHandle}>
        <p> Pedido # </p>
        <input
          type="text"
          placeholder=" Escribe Nombre del CLiente"
          name="nameClient"
          value={nameClient}
          onChange={nameClientHandle}
          data-testid="nameClient"
          required
        ></input>
        <p>Nombre FINAL del cliente:{nameClient} </p>
        <div>
          {productsListOrder.map((p, i) => {
            return (
              <div className="pedido" key={i}>
                <hr />
                producto: {p.product.name}
                <br />
                cantidad: {p.qty}
                <div onClick={qtyroductHandle} data-p={p.product.id}>
                  {" "}
                  sumar{" "}
                </div>
                <br />
                precio: {p.price}
                <div onClick={deleteProduct} data-p={i}>
                  {" "}
                  <AiOutlineDelete />{" "}
                </div>
                <hr />
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
