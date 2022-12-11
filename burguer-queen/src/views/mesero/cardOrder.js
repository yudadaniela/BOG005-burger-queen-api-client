import React, { useEffect, useState } from "react";
import { createOrder, getToken } from "../../functions/requests";
import { AiOutlineDelete, AiOutlineMinus } from "react-icons/ai";
import "./mesero.css";
import { BiPlus} from "react-icons/bi";

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
    ).then((res) => {console.log(res)
    setproductsListOrder([])
    setNameClient('')
    }); 
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
        <div className="containerAllProducts">
          {productsListOrder.map((p, i) => {
            return (
              <div className="pedido" key={i}>
                <div className="containerProductsOrder">
                  <p>{p.product.name}</p>
                  <div className="qtyContainer">
                    {" "}
                    <div
                      className="addQtyButton"
                      onClick={qtyPlusHandle}
                      data-p={p.product.id}
                    >
                      {" "}
                      <BiPlus/>
                      {" "}
                    </div>
                    <p>{p.qty}</p>
                    <div
                  className="restQtyButton"
                  onClick={qtyRestHandle}
                  data-p={p.product.id}
                >
                  {" "}
                  <AiOutlineMinus/>
                  {" "}
                </div>
                  </div>
                  <div className='containerDeleteIcon' onClick={deleteProduct} data-p={i}>
                    {" "}
                    <AiOutlineDelete />{" "}
                  </div>
                  <div className="containerPrice">
                  <p>$ {p.price} </p>
                  </div>
                  
                  
                </div>
              </div>
            );
          })}
        </div>
        <div className="containerTotal">
          <p className="totalText">Total</p>
          <p className="totalText">$ {getTotal()}</p>
        </div>
        
      <div className="buttonOrders">
      <button
          type="submit"
          className="addUserButton"
          data-testid="buttonCreateOrder"
          data-p="cocina"
        >
          Enviar a Cocina
        </button>
      </div>
       
      </form>
    </div>
  );
};

export default CardOrder;
