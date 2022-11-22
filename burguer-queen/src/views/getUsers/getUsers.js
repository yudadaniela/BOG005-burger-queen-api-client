import React from "react";
import CreateUsersView from '../createUsers/createUsers';
import { useState, useEffect } from 'react';
import Modal from '../../components/modal';
//import { Example } from './views/login/login.js';

function GetUser() {
  const [isOpenModal, setisOpenModal] = useState(false)

  const openModal = () => {
    setisOpenModal(true)
  }
  const closeModal = () => {
    setisOpenModal(false)
  }

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
    </div>
  );
}


export default GetUser;
