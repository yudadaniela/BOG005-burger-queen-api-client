import React, { useEffect, useState } from "react";
import { createOrder, getToken } from "../../functions/requests";
import { AiOutlineDelete } from "react-icons/ai";

const CardOrder = ({ productsListOrder, setproductsListOrder }) => {
  //console.log(productsListOrder,'es lo que entra');
  const [qtyroduct, setQtyroduct] = useState(1);
  const [nameClient, setNameClient] = useState('')
  const [selectedProduct, setselectedProduct] = useState([])

  const qtyroductHandle = (event) => {
    //setselectedProduct(event.currentTarget.dataset.p)///1
    //let select = productsListOrder[event.currentTarget.dataset.product];
    //console.log(select, 'es el seleccionado');
    //console.log(event.currentTarget.dataset.p, 'acá');
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
    // console.log(new Date(), 'fecha');
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

  const deleteProduct = (event)=>{
   
    //productsListOrder.splice(event.currentTarget.dataset.p, 1);
    
    //console.log(productsListOrder, 'se actualiza');
    //console.log(event.currentTarget.dataset.p, 'id con current');

    const deleteOrder = productsListOrder.splice(event.currentTarget.dataset.p, 1)// retorna lo que borramos
    //setproductsListOrder(deleteOrder)
    //console.log(deleteOrder, 'lo borrado');
    //console.log(productsListOrder, 'productsListOrder');
    //setselectedProduct(productsListOrder)
    //setproductsListOrder(productsListOrder)
    //console.log(productsListOrder, 'se actualiza');
    setproductsListOrder(productsListOrder)
    console.log([...productsListOrder, productsListOrder.splice(event.currentTarget.dataset.p, 1)], 'lo dentro ');
    console.log(productsListOrder, 'se actualiza');
    
  }


  useEffect(()=>{
    //setselectedProduct(productsListOrder)
    console.log(' useEffect');
  },[productsListOrder])



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
                <br/>
                cantidad: {p.qty}
                <div
                  onClick={qtyroductHandle}
                  data-p={p.product.id}
                > sumar </div>
                <br/>
                precio: {p.price}
                <div
                  onClick={deleteProduct}
                  data-p={i}
                > <AiOutlineDelete/> </div>
                <hr/>
              </div>)
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
