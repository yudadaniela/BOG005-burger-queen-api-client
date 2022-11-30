import React from 'react'
import Header from '../../components/Header';
import GetProducts from '../getProducts/getProducts';
import GetUser from '../getUsers/getUsers';
import { useState, useEffect } from 'react';

const Admin = () => {
/* const [stateGetUsers, setstateGetUsers] = useState(true)
const [stateGetProducts, setstateGetProducts] = useState(false)

const pagesAdmin = ()=> {
    setstateGetUsers(false)
    setstateGetProducts(true)
}
 */
  return (
    <div>
        <Header  />
    </div>

  )
}
export default Admin

/* {stateGetProducts ? <GetProducts/>: <GetUser/>} */