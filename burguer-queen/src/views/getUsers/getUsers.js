import React from "react";
import CreateUsersView from "../createUsers/createUsers";
import { getToken, getRole, getUsers } from "../../functions/requests";
import { useState, useEffect } from "react";
import Modal from "../../components/modal";
//import { Example } from './views/login/login.js';

function GetUser() {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [currentUsers, setcurrentUsers] = useState([]);

  const openModal = () => {
    setisOpenModal(true);
  };
  const closeModal = () => {
    setisOpenModal(false);
  };

  // const getUserHandle =() =>{
  //   // getToken()
  //   // getRole()
  //   getUsers(getToken()).then(res => res.json()).then( rtaJson => {
  //       console.log(rtaJson);
  //   })
  // }

  useEffect(() => {
    getUsers(getToken())
      .then((response) => response.json())
      .then((data) => {
        setcurrentUsers(data);

        // console.log(setcurrentUsers(data))
      });
  }, []);
  useEffect(() => console.log(currentUsers), [currentUsers]);

  const editUserHadel= ()=>{
    
  }
  

  return (
    <div className="App">
      <section className="App-header">
        <button onClick={openModal}>Agregar colaborador</button>
        <Modal
          isOpen={isOpenModal}
          closeModal={closeModal}
          contenido=<CreateUsersView
            onSave={(response) => {
              console.log("se cerro el modal ", currentUsers);
              setcurrentUsers(response);
            }}
          />
        />
      </section>
      <div>
        {currentUsers.map((user, i) => {
          return (
            <li key={i}>
              
              {user.id} {user.email} {user.role} <button  onClick={openModal}> Editar</button> <button> Eliminar</button>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default GetUser;
