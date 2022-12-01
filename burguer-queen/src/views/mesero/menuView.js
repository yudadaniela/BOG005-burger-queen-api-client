import React from 'react'
import Header from '../../components/Header'
import { getProducts, getToken } from '../../functions/requests'
import { useState, useEffect } from 'react'
import { createOrder } from '../../functions/requests'
import CardOrder from './cardOrder'

const MenuView = () => {
  const [currentProducts, setcurrentProducts] = useState([]);
  useEffect(() => {
    getProducts(getToken())
      .then((response) => response.json())
      .then((data) => {
        console.log('productos get',data)
        setcurrentProducts(data);
      }).catch((error )=> {console.log(error)}) 
  }, []);

  const addProduct =(event)=>{
    console.log(event.currentTarget.dataset.product,'id?')
    alert('añadiste el producto' + event.currentTarget.dataset.product)
  }

  return (
    <div>
     <Header
        path1 ={"/waiter/MenuView"}
        title1 ={'Crear Pedido'}
        path2 ={"/waiter/orderState"}
        title2 ={'Estado de Pedidos'}
     />
     <div>
     {currentProducts.map((product,i)=>{
      return( 
      <div className='card' key={i}>
         <img src={product.image}/>
         {product.name}
         {product.price}
         <button 
         onClick={addProduct}
         data-product ={product.id}
         > Añadir </button>
      </div>)
     })}
     </div>
     <CardOrder/>
    </div>
  )
}

export default MenuView
