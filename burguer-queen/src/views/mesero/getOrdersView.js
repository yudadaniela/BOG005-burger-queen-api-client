import React from 'react'
import Header from '../../components/Header'

const GetOrder = () => {
  return (
    <div>
     <Header
        path1 ={"/waiter/getOrder"}
        title1 ={'Crear Pedido'}
        path2 ={"/waiter/orderState"}
        title2 ={'Estado de Pedidos'}
     />
     compotente ppal de mesero GetOrder
    </div>
  )
}

export default GetOrder
