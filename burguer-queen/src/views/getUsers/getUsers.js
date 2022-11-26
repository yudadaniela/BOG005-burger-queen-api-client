import React, { useDebugValue } from "react";
import CreateUsersView from "../createUsers/createUsers";
import { getToken, getRole, getUsers, deleteItem, editItem } from "../../functions/requests";
import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Edit from "../EditUser/EditUser";



function GetUser() {
  const [isOpenModal, setisOpenModal] = useState(false);// estado de apertura de modal
  const [currentUsers, setcurrentUsers] = useState([]); // array de usuarios que muestra
  const [editState, setEditState] = useState(false);//Estado de edición 
  const [agregarState, setagregarState] = useState(true); // estado de creación de usuario
  const [selectedUser, setSelectedUser] = useState({});// Usuario seleccionado

  const openModal = () => {
    setisOpenModal(true);
  };
  const closeModal = () => {
    setisOpenModal(false);
    setSelectedUser({});// eliminar usuario 
    console.log(selectedUser, 'datos en modal');
  };

  useEffect(() => {
    getUsers(getToken())
      .then((response) => response.json())
      .then((data) => {
        setcurrentUsers(data);
      });
  }, []);

  //useEffect(() => console.log(currentUsers, 'lista actualizada'), [currentUsers]); // lista actualizada

  const editHandle = (event) => {
    const user = currentUsers.filter(u => u.id == event.target.value)/// traer el usuario completo en un array
    setSelectedUser(user[0]) //actualiza el usuario seleccionado
    //console.log(user[0], 'es el usuario seleccionado');
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
    // console.log(event.target.value, 'EVENT TARGET')
    // console.log(deleteItem(event.target.value, getToken()), 'se borro :)')
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
          contenido={editState ? <Edit onSave={(response) => {
            setcurrentUsers(response);
            console.log("se cerro el modal ", currentUsers);

          }} selectedUser={selectedUser} /> : <CreateUsersView
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
              /* onSave={(user) => {
                console.log("nose", currentUsers);
                setcurrentUsers(user);
                }} */

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
