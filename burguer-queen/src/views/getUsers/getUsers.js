import React from "react";
import CreateUsersView from "../createUsers/createUsers";
import { getToken, getRole, getUsers, deleteItem, editItem } from "../../functions/requests";
import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Edit from "../EditUser/EditUser";

//import { Example } from './views/login/login.js';

function GetUser() {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [currentUsers, setcurrentUsers] = useState([]);
  const [editState, setEditState] = useState(false);
  const [agregarState, setagregarState] = useState(true);
  const [idUser, setidUser] = useState('');
  
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


  // const editUserHadel= (event)=>{

  //   console.log(event.target.value, 'EVENT TARGET edit')
  //   console.log(editItem( event.target.value, getToken(), email, password, role), 'se borro :)')
  //   editItem(( event.target.value, getToken(), email, password, role))
  //   getUsers(getToken()).then(res => res.json()).then( users => {
  //    console.log(users, ' se actualiza'); // lista actualizada
  //    setcurrentUsers(users)
  //    })

  // // id, tokenLogin, email, password, role, id
  // }
  const editHandle = (event) => {
    let idUser = event.target.value
    console.log(event.target.value, 'EVENT TARGET de editar')
    setEditState(true)
    setagregarState(false)
    openModal()
    //editItem(( event.target.value, getToken(), email, password, role))
    
    //editItem(( event.target.value, getToken(), "email@email", "password", "role"))

  }
  const addHandle =() =>{
    setEditState(false)
    setagregarState(true)
    openModal()
  }

  const deleteHandle = (event) => {
    console.log(event.target.value, 'EVENT TARGET')
    console.log(deleteItem(event.target.value, getToken()), 'se borro :)')
    deleteItem(event.target.value, getToken())
    getUsers(getToken()).then(res => res.json()).then(users => {
      console.log(users, 'cuando elimino se actualiza'); // lista actualizada
      setcurrentUsers(users)
    })
  }


  return (
    <div className="App">
      <section className="App-header">
        <button onClick={addHandle}>Agregar colaborador</button>
        <Modal
          isOpen={isOpenModal}
          closeModal={closeModal}
          contenido={ editState ? <Edit idUser={idUser}/>: <CreateUsersView
            onSave={(response) => {
              setcurrentUsers(response);
              console.log("se cerro el modal ", currentUsers);

            }}
          />}
        />
      </section>
      <div>
        {currentUsers.map((user, i) => {
          //console.log(currentUsers, 'del map')
          return (
            <li key={i}>
              {user.id} {user.email} {user.role}
              <button
                onClick={editHandle}
                value={user.id}
              >Editar</button>

              <button
                onClick={deleteHandle}
                value={user.id}
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
