import React, { useState } from 'react'
import { createOrder, getToken } from '../../functions/requests'
const CardOrder = () => {

  const [nameClient, setNameClient] = useState('') 

  const nameClientHandle =(e)=>{
    setNameClient(e.target.value)
  }

  const createOrderHandle =(e)=>{
    e.preventDefault()
    createOrder(getToken(), nameClient, 'pending').then((res)=> console.log(res))
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
              data-testid  = 'nameClient'
            >
        </input>
        <p>Icono del editar</p>
        <p>Nombre del cliente:{nameClient}</p>
        <p> Array de productos</p>
        <button 
        type="submit" 
        className='addUserButton'
        data-testid  = 'buttonCreateOrder'
                > Enviar a Cocina </button>

      </form>
    </div>
  )
}

export default CardOrder
