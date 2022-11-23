import React from "react";
import CreateUsersView from "../createUsers/createUsers";
import { getToken, getRole, getUsers, deleteItem } from "../../functions/requests";
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
      });
  }, [/*currentUsers*/]);
  
  useEffect(() => console.log(currentUsers, 'lista actualizada'), [currentUsers]); // lista actualizada


  const editUserHadel= ()=>{
    
  }
  
  const deleteHandle = (event)=> {
   console.log(event.target.value, 'EVENT TARGET')
   console.log(deleteItem( event.target.value, getToken()), 'se borro :)')
   deleteItem(event.target.value, getToken())
   getUsers(getToken()).then(res => res.json()).then( users => {
    console.log(users, 'cuando elimino se actualiza'); // lista actualizada
    setcurrentUsers(users)
    })
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
            setcurrentUsers(response);
            console.log("se cerro el modal ", currentUsers);
            
            }}
          />
        />
      </section>
      <div>
        {currentUsers.map((user, i) => {
          //console.log(currentUsers, 'del map')
          return (
            <li key={i}>
              {user.id} {user.email} {user.role} 
              <button
                onClick={openModal}
              >Editar</button> 

              <button 
                onClick={deleteHandle} 
                value={user.id}
                onSave={(user) => {
                  console.log("nose", currentUsers);
                  setcurrentUsers(user);
                  }}
              > Eliminar</button>
            </li>
          );
        })
        }
      </div>
    </div>
  );
}

export default GetUser;
