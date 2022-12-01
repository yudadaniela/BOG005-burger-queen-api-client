import React, { useState } from 'react'

const CardOrder = () => {

  const [nameClient, setNameClient] = useState('') 

  const nameClientHandle =(e)=>{
    setNameClient(e.target.value)
  }
  return (
    <div>
      <form>
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
      </form>
    </div>
  )
}

export default CardOrder
