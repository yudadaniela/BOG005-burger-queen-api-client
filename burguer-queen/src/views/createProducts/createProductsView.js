import { useState } from 'react';
import { createProducts, getToken, getRole, getUsers, getProducts } from '../../functions/requests';
import React from 'react';
import '../createUsers/createUsers.css'

const CreateProductsView = ({onSave, closeModal}) => {
    const [newProductName, setNewProductName] = useState('')
    const [newProductId, setNewProductId] = useState('')
    const [newProductType, setNewProductType] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
   // const [isOpenModal, setisOpenModal] = useState(false)

    const newProductNameHandle =(event)=>{
        setNewProductName(event.target.value) /// buscar****
    }
    const newProductIdHandle =(event)=>{
        setNewProductId(event.target.value) /// buscar****
    }
    const newProductTypeHandle =(event)=>{
        setNewProductType(event.target.value) /// buscar****
    }
    const newProductPriceHandle =(event)=>{
        setNewProductPrice(event.target.value) /// buscar****
    }

    const createProductsHandle = (event) => {
        event.preventDefault()
        getToken()
        getRole()
        console.log(event.target.value);
        createProducts(getToken(), newProductId, newProductName, newProductType, newProductPrice).then(res => res.json()).then( rtaJson => {
            // console.log(rtaJson);
            // onSave(rtaJson)
            getProducts(getToken()).then(res => res.json()).then( products => {
                console.log(rtaJson);
                onSave(products)
            })

        })
        closeModal()
    }

    return (
        <div>
            <form onSubmit={createProductsHandle} className="formContainer">
            <label>Id Producto</label>
                <input className="inputsCreateUsers"
                    type='text'
                    placeholder="Introduce Id "
                    value={newProductId}
                    onChange={newProductIdHandle}
                >
                </input>

                <label>Nombre</label>
                <input className="inputsCreateUsers"
                    type='text'
                    placeholder="Introduce Nombre"
                    value={newProductName}
                    onChange={newProductNameHandle}
                >
                </input>
                <div className='twoInputsContainers'>
                <div className='inputLabelContainer'>
                <label>Precio</label>
                <input
                    className="inputsCreateUsers"
                    type='number'
                    placeholder="Introduce precio"
                    value={newProductPrice}
                    onChange={newProductPriceHandle}
                >
                </input>
                </div>
                <div className='inputLabelContainer'>
                <label>Categoría</label>
                <select
                className="inputsCreateUsers"
                value={newProductType}
                onChange={newProductTypeHandle}
                required
                >
                <option value="">Selecciona categoría </option> 
                <option value="Desayuno">Desayuno</option>    
                <option value="Almuerzo">Almuerzo y Cena</option>     
                </select>
                </div>
                </div>
                <div className='buttonContainer'> 
                <button type="submit" className='addUserButton'> Agregar Producto </button>
                </div>
            </form>
            
           
            
        </div>
    );
}

export default CreateProductsView;