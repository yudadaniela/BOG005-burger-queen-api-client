import React, { useState } from 'react'
import { createOrder, getToken } from '../../functions/requests'

const CardOrder = ({ productsListOrder }) => {
  //console.log(productsListOrder,'es lo que entra');
  const [qtyroduct, setQtyroduct] = useState(1);
  const [nameClient, setNameClient] = useState('')
  const [selectedProduct, setselectedProduct] = useState('')

  const qtyroductHandle = (event)=>{
    
    //setselectedProduct(event.currentTarget.dataset.p)///1
    //let select = productsListOrder[event.currentTarget.dataset.product];
    //console.log(select, 'es el seleccionado');
    //console.log(event.currentTarget.dataset.p, 'acá');
    const productSelected = productsListOrder.filter(
      (p) => p.product.id == event.currentTarget.dataset.p
    ); 
    console.log(productSelected, 'es lo que filtró');
    setQtyroduct(qtyroduct + 1)

  }

  const nameClientHandle = (e) => {
    setNameClient(e.target.value)
  }

  const createOrderHandle = (e) => {
    e.preventDefault()
    createOrder(getToken(), nameClient, 'pending', productsListOrder).then((res) => console.log(res))// pte arreglar productsListOrder armar acá?
  }

  const deleteProduct = (event)=>{
    //console.log(event.target.value, 'es el event delete..');
    console.log(event.currentTarget.dataset.p, 'id con current');
  ////PTE
  }
///productsListOrder /// array
////recorra i seleccionando i.qty de cada uno
//i.qty*i.product.price
//sume
let totalCount = productsListOrder.reduce((acum, i)=>acum + (i.qty * i.product.price) ,
0);
console.log(totalCount, 'total');


  return (
    <div>
      <form onSubmit={createOrderHandle}>
        <p> Pedido #</p>
        <input
          type='text'
          placeholder=" Escribe Nombre del CLiente"
          name="nameClient"
          value={nameClient}
          onChange={nameClientHandle}
          data-testid='nameClient'
        >
        </input>
        <p>Nombre FINAL del cliente:{nameClient} </p>
        <div>
          {productsListOrder.map((p, i) => {
            return (
              <div className='pedido' key={i}>
                <hr/>
                producto: {p.product.name}
                <br/>
                cantidad: {qtyroduct}
                <div
                  onClick={qtyroductHandle}
                  data-p={p.product.id}
                > sumar </div>
                <br/>
                precio: {p.product.price}
                <div
                  onClick={deleteProduct}
                  data-p={p.product.id}
                > eliminar </div>
                <hr/>
              </div>)
          })}
        </div>

        <p>el total es: {totalCount} </p>

        <button
          type="submit"
          className='addUserButton'
          data-testid='buttonCreateOrder'
          data-p= 'cocina'
        > Enviar a Cocina </button>

      </form>
    </div>
  )
}

export default CardOrder
