import { useState, useEffect } from 'react';
import { createUsers, getToken, getRole, getUsers, editProduct, getProducts} from '../../functions/requests';
import React from 'react';
import Modal from '../../components/modal';
import Login from '../login/login.js'

const EditProduct = ({onSave, selectedProduct, closeModal}) => {
     console.log(selectedProduct, 'product que llega a edit');
    // console.log(selectedProduct.id, 'id de user selecc en editar');
    // console.log(selectedProduct.email, ' es el email');
    const [newProductName, setNewProductName] = useState('')
    const [newProductType, setNewProductType] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')

    useEffect(()=>{
     
        setNewProductName(selectedProduct.name) 
        setNewProductPrice(selectedProduct.price)  
        setNewProductType(selectedProduct.type)
      
      
    },[selectedProduct]) /// cada vez que cambia usuario seleccionado se actualiza el hook

    const newProductNameHandle =(event)=>{
        setNewProductName(event.target.value) //actualiza estado segun lo que escriba
    }
    const newProductPriceHandle =(event)=>{
        setNewProductPrice(event.target.value) //actualiza estado segun lo que escriba
    }
    const newProductTypeHandle =(event)=>{
        setNewProductType(event.target.value) //actualiza estado segun lo que escriba
    }

    const editProductsHandle = (event) => {
        event.preventDefault()
        getToken()
        editProduct(selectedProduct.id, getToken(), newProductName, newProductType, newProductPrice)
        // console.log(editItem(selectedProduct.id, getToken(), newUserEmail, newUserType, newUserRole), 'ejec func');
        getProducts(getToken()).then(res => res.json()).then( products => {
            console.log(products);
            onSave(products)
        })
        closeModal()
    }

    return (
        <div>
            <form 
            className="formContainer"
            onSubmit={editProductsHandle}>
            <label>Id Producto</label>
                <p className="inputsCreateUsers"
                    type='text'
                    placeholder="Introduce Nombre "
                >
                    {selectedProduct.id}
                </p>

                <label>Nombre</label>
                <input className="inputsCreateUsers"
                    type='text'
                    placeholder="Introduce Nombre"
                    value={newProductName}
                    onChange={newProductNameHandle}
                >
                </input>
            <div className= "twoInputsContainers">
                <div className= "inputLabelContainer">
                <label>Precio</label>
                <input
                    className="inputsCreateUsers"
                    type='Number'
                    placeholder="Introduce Precio"
                    value={newProductPrice}
                    onChange={newProductPriceHandle}
                >
                </input>
                </div>
                <div className= "inputLabelContainer">
                <label>Categoría</label>
                <select
                className="inputsCreateUsers"
                value={newProductType}
                onChange={newProductTypeHandle}
                required
                >
                <option value="">Selecciona categoría</option> 
                <option value="Desayuno">Desayuno</option>    
                <option value="Almuerzo">Almuerzo y cena</option>        
                </select>
                </div>
            </div>
            <div className ="buttonContainer">
                <button 
                className="addUserButton"
                type="submit"> Editar Producto</button>
            </div>
            </form>
            
           
            
        </div>
    );
}

export default EditProduct;