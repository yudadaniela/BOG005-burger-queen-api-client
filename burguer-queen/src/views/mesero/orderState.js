import React from 'react'
import Header from '../../components/Header'

const OrderState = () => {
  return (
    <div>
        <Header
        path1 ={"/waiter/getOrder"}
        title1 ={'Crear Pedido'}
        path2 ={"/waiter/orderState"}
        title2 ={'Estado de Pedidos'}
     />
     compotente OrderState
    </div>
  )
}

export default OrderState