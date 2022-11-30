import React from 'react'
import { getProducts, getToken, deleteItem, editProduct } from '../../functions/requests'
import { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import Modal from '../../components/modal';
import { AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
// import Edit from '../EditUser/EditUser';
import CreateProductsView from '../createProducts/createProductsView.js';
import EditProduct from '../EditProduct/EditProduct';
import Header from '../../components/Header';
const GetProducts = () => {
  const [isOpenModal, setisOpenModal] = useState(false);// estado de apertura de modal
  const [currentProducts, setcurrentProducts] = useState([]); // array de usuarios que muestra
  const [editState, setEditState] = useState(false);//Estado de edición 
  const [agregarState, setagregarState] = useState(true); // estado de creación de usuario
  const [selectedProduct, setSelectedProduct] = useState({});// Usuario seleccionado
  
  const openModal = () => {
    setisOpenModal(true);
  };
  const closeModal = () => {
    setisOpenModal(false);
    setSelectedProduct({});// si el useEffect de editusers no funciona
  };

  useEffect(() => {
    getProducts(getToken())
      .then((response) => response.json())
      .then((data) => {
        console.log('productos get',data)
        setcurrentProducts(data);
      }).catch((error )=> {console.log(error)}) 
  }, []);

  
  const editHandle = (event) => {
    const product = currentProducts.filter(u => u.id == event.currentTarget.dataset.product)/// traer el usuario completo en un array
    setSelectedProduct(product[0]) //actualiza el usuario seleccionado
    console.log(product[0], 'es el producto seleccionado');
    setEditState(true)
    setagregarState(false)
    openModal() // tratar de poner el usuario opc
  }

  const addHandle = () => {
    setEditState(false)
    setagregarState(true)
    openModal()
  }

  const deleteHandle = (event) => {
        /* eslint-disable  no-restricted-globals */
   const confirmMssg = confirm('¿Deseas eliminar el producto?')
   if(confirmMssg){
     deleteItem(event.currentTarget.dataset.product, getToken(),'products')
     .then(()=>{
       getProducts(getToken()).then(res => res.json())
       .then(products => {
         console.log(products, 'cuando elimino se actualiza'); // lista actualizada
         setcurrentProducts(products)
       })
       .catch(()=>{
         alert('No se pudieron obtener los productos')
       })
     }).catch(()=>{
       alert('No se pudo eliminar el producto')
     })
   }else{
     alert('Vale, no lo borro :)')
   }
 }



  return (

    <div className="adminView">
      <Header/>
    <section className="subHeader"> 
    <h1 className="titulos"> Productos </h1>
    <button className="buttonAddUser" onClick={addHandle}>  Agregar producto <BiPlus/></button>
    <Modal
      isOpen={isOpenModal}
      closeModal={closeModal}
      contenido={editState ? <EditProduct onSave={(response) => {
        setcurrentProducts(response);
        console.log("se cerro el modal ", currentProducts);
        }} 
        selectedProduct={selectedProduct}
        closeModal={closeModal}
      /> : <CreateProductsView
        closeModal={closeModal}
        onSave={(response) => {
          setcurrentProducts(response);
          console.log("se cerro el modal ", currentProducts);
        }}
      />}
      task ={editState ? 'Editar Producto' : 'Crear Producto'}
    />
    </section>
  
    <section className="tableContainer"> 
    <table className="headerTable"> 

          <thead key={1}className="dataTable"> 
            <tr key={1}className="titleTable">Id Producto</tr>
            <tr key={2}className="titleTable">Nombre</tr>
            <tr key={3}className="titleTable">Categoria</tr>
            <tr key={4} className="titleTable">Precio</tr>
            <tr key={5}className="titleTable">  Editar/eliminar</tr>
          </thead>
    </table>
    <div>
    {currentProducts.map((product, i) => {
      //console.log(currentproducts, 'del map')
      return (
        <table key={i}>
        <tbody key={i}className="dataTable"> 
        <tr key={i}> {product.id} </tr>
        <tr> {product.name} </tr>
        <tr> {product.type} </tr>
        <tr> ${product.price} </tr>
        
          <div>
        <button
        className="iconAccion"
            onClick={editHandle}
            data-product ={product.id}
          ><AiOutlineEdit /></button> 
          
          <button
            className="iconAccion"
            onClick={deleteHandle} 
            //value={user.id}
            data-product ={product.id}
            /* onSave={(user) => {

              console.log("nose", currentUsers);
              setcurrentUsers(user);
              }} */
          > <AiOutlineDelete/></button>

          </div>
          
        </tbody>

        </table>
      );
    })
    }
  </div>
  </section>
</div>
  )
}
export default GetProducts