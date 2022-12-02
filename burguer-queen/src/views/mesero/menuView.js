import React from 'react'
import Header from '../../components/Header'
import { getProducts, getToken } from '../../functions/requests'
import { useState, useEffect } from 'react'
import { createOrder } from '../../functions/requests'
import CardOrder from './cardOrder'
import './mesero.css'
import { BiPlus } from "react-icons/bi";
import HeaderSmall from '../../components/HeaderSmall'

const MenuView = () => {
  const [currentProducts, setcurrentProducts] = useState([]);
  //const [selectedProduct, setSelectedProduct] = useState({});  // por ahora se omite el uso del hook
  const [productsListOrder, setproductsListOrder] = useState([]); // array de productos de orden
  const [typeMenu, setTypeMenu] = useState(true);
 

  useEffect(() => {
    getProducts(getToken())
      .then((response) => response.json())
      .then((data) => {
        console.log('productos get',data)
        setcurrentProducts(data);
      }).catch((error )=> {console.log(error)}) 
  }, []);


  const addProduct =(event)=>{
    const product = currentProducts.filter(
      (p) => p.id == event.currentTarget.dataset.product
    ); 
    let productToOrder ={
      qty: 1,
      product: product[0],
    }
    setproductsListOrder([...productsListOrder, productToOrder])// EN VEZ DE PUSH
  }

  const typeMenuHandel = () =>{

  }
 

//filter -> const breakfast = currentProducts.filter(i=> i.type = "Desayuno")
//filter -> const lunch = currentProducts.filter(i=> i.type = "Almuerzo")

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
     <HeaderSmall/>
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
     <CardOrder productsListOrder={productsListOrder} />
     </div>
     </div>
    
    </div>
  )
}

export default MenuView
