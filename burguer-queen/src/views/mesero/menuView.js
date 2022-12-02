import React from 'react'
import Header from '../../components/Header'
import { getProducts, getToken } from '../../functions/requests'
import { useState, useEffect } from 'react'
import { createOrder } from '../../functions/requests'
import CardOrder from './cardOrder'

const MenuView = () => {
  const [currentProducts, setcurrentProducts] = useState([]);
  //const [selectedProduct, setSelectedProduct] = useState({});  // por ahora se omite el uso del hook
  const [productsListOrder, setproductsListOrder] = useState([]); // array de productos de orden


  useEffect(() => {
    getProducts(getToken())
      .then((response) => response.json())
      .then((data) => {
        console.log('productos get',data)
        setcurrentProducts(data);
      }).catch((error )=> {console.log(error)}) 
  }, []);

/*   useEffect(()=>{
    console.log(selectedProduct, 'selectedProduct de useEffect');
},[selectedProduct])  */

  const addProduct =(event)=>{
    //console.log(event.currentTarget.dataset.product,'id?')
    const product = currentProducts.filter(
      (p) => p.id == event.currentTarget.dataset.product
    ); 
    //setSelectedProduct(product[0])
    let productToOrder ={
      qty: 1,
      product: product[0]
    }
    productsListOrder.push(productToOrder)  
    console.log(productsListOrder, 'hook de productos para la orden');
   
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
