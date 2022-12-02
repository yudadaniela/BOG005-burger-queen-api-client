import React from 'react'
import Header from '../../components/Header'
import { getProducts, getToken } from '../../functions/requests'
import { useState, useEffect } from 'react'
import { createOrder } from '../../functions/requests'
import CardOrder from './cardOrder'
import './mesero.css'
import { BiPlus } from "react-icons/bi";

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
     
     <section className="subHeader">
        <h1 className="titulos"> Menú y tomar pedido</h1>
        <button className="buttonAddUser">
          Añadir Pedido <BiPlus />
        </button>
      </section>

     <div className='cardContainer'> 
    

     <div className='cardContainerMenu'>
     <div className='containerNav'> 
        <p> Desayuno </p>
        <p> Almuerzo y Cena </p>
      </div>
      <div  className='cardMenu'> 
     {currentProducts.map((product,i)=>{
      return( 
      <div className='card' key={i}>
         <img className='imgMenu' src={product.image}/>
         <div className='descriptionProduct'>
         <p className='textProduct'>{product.name}</p>
         <p className='textPrice'>{product.price}</p>
         </div>
         <button 
         onClick={addProduct}
         data-product ={product.id}
         className="buttonAddProduct"
         > Añadir </button>
      </div>)
     })}
     </div>
     </div>
     <div className='cardOrder'>
     <CardOrder productsListOrder={productsListOrder}/>
     </div>
     </div>
    
    </div>
  )
}

export default MenuView
