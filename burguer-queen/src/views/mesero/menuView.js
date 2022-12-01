import React from 'react'
import Header from '../../components/Header'
import { getProducts, getToken } from '../../functions/requests'
import { useState, useEffect } from 'react'
import { createOrder } from '../../functions/requests'
import CardOrder from './cardOrder'

const MenuView = () => {
  //let arrayProducts = [];
  const [currentProducts, setcurrentProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productsListOrder, setproductsListOrder] = useState([]); // array de productos de orden

  useEffect(() => {
    getProducts(getToken())
      .then((response) => response.json())
      .then((data) => {
        console.log('productos get',data)
        setcurrentProducts(data);
      }).catch((error )=> {console.log(error)}) 
  }, []);

  useEffect(()=>{
    console.log(selectedProduct, 'selectedProduct de useEffect');
    
},[selectedProduct]) 

  const addProduct =(event)=>{
    //console.log(event.currentTarget.dataset.product,'id?')
    const product = currentProducts.filter(
      (p) => p.id == event.currentTarget.dataset.product
    ); 
    console.log(product, 'es el obj del producto selecc del filter');
    setSelectedProduct(product[0])
    console.log(selectedProduct, 'selected p');
    productsListOrder.push(selectedProduct)
    console.log(productsListOrder, 'hook de productos para la orden');
    //pushea en  arraLIST
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
     <CardOrder productsListOrder={productsListOrder}/>
    </div>
  )
}

export default MenuView
