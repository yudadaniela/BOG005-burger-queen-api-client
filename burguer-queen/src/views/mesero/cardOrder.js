import React, { useState } from 'react'
import { createOrder, getToken } from '../../functions/requests'

const CardOrder = ({ productsListOrder }) => {
  //console.log(productsListOrder,'es lo que entra');
  const [qtyroduct, setQtyroduct] = useState(0);
  const [nameClient, setNameClient] = useState('')
  const [selectedProduct, setselectedProduct] = useState('')

  const qtyroductHandle = (event)=>{
    
    //setselectedProduct(event.currentTarget.dataset.p)///1
    console.log(event.currentTarget.value, 'es el event...');
    let select = productsListOrder[event.currentTarget.dataset.product];
    //console.log(select);
    setQtyroduct(qtyroduct + 1)
  }

  const nameClientHandle = (e) => {
    setNameClient(e.target.value)
  }

  const createOrderHandle = (e) => {
    e.preventDefault()
    createOrder(getToken(), nameClient, 'pending', productsListOrder).then((res) => console.log(res))// pte arreglar productsListOrder armar acá?
  }

  const deleteProduct = ()=>{

  }

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
        <p>Icono del editar</p>
        <p>Nombre del cliente:{nameClient}</p>
        <p> Array de productos</p>

        <div>
          {productsListOrder.map((p, i) => {
            return (
              <div className='pedido' key={i}>
                <hr/>
                producto: {p.product.name}
                <br/>
                cantidad: {qtyroduct}
                <button
                  onClick={qtyroductHandle}
                  value={p.id}
                > sumar </button>
                <br/>
                precio: {p.product.price}
                <div
                  onClick={deleteProduct}
                  data-p={p.id}
                > eliminar </div>
                <hr/>
              </div>)
          })}
        </div>

        <button
          type="submit"
          className='addUserButton'
          data-testid='buttonCreateOrder'
        > Enviar a Cocina </button>

      </form>
    </div>
  )
}

export default CardOrder
