import React from "react";
import CreateUsersView from '../createUsers/createUsers';
import { getToken, getRole, getUsers } from '../../functions/requests';
import { useState, useEffect } from 'react';
import Modal from '../../components/modal';
//import { Example } from './views/login/login.js';

function GetUser() {
  const [isOpenModal, setisOpenModal] = useState(false)
  const [currentUsers, setcurrentUsers] = useState([])

  const openModal = () => {
    setisOpenModal(true)
  }
  const closeModal = () => {
    setisOpenModal(false)
  }

  const getUserHandle =() =>{
    // getToken()
    // getRole()
    getUsers(getToken()).then(res => res.json()).then( rtaJson => {
        console.log(rtaJson);    
    })
  }
  

   useEffect(() => {
    getUsers(getToken())
      .then((response) => response.json())
      .then((data) => {
        setcurrentUsers(data)

        // console.log(setcurrentUsers(data))

      });
  }, []);
  useEffect(() => console.log(currentUsers), [currentUsers])

  // const setcurrentUsersHandle=()=>{
  //   setcurrentUsers(getUserHandle())
  // }
  


  return (

    <div className="App">
      <section className="App-header">
       
        <button onClick={openModal}>abrir modal</button>
        <Modal
          isOpen={isOpenModal}
          closeModal={closeModal}
          contenido= <CreateUsersView />
        />
      </section>
      <div>
             {currentUsers.map((user, i) => {
        return (<li key={i}> {user.id}, {user.email}, {user.password}, {user.role} </li>)
         
         })} 
      </div>
    

    </div>
  );
}


export default GetUser;
