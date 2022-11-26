import React from "react";
import CreateUsersView from "../createUsers/createUsers";
import { getToken, getRole, getUsers, deleteItem, editItem } from "../../functions/requests";
import { useState, useEffect } from "react";
import './getUsers.css'
import Modal from "../../components/modal";
import { AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import { BiExit, BiPlus } from "react-icons/bi";
import logo from '../../img/logo.png'
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
    <div className="adminView">
 
        <header> 
          <nav className="navHeader"> 
            <img className="logo" src={logo} />
            <p> Crear Productos</p>
            <p> Crear Usuarios</p>
            <p><BiExit className="exitIcon"/></p>
          </nav>
        </header>
        
        <section className="subHeader"> 
        <h1 className="titulos"> Colaboradores </h1>
        <button className="buttonAddUser" onClick={addHandle}>  Agregar colaborador <BiPlus/></button>
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
      
        <section className="tableContainer"> 
        <table className="headerTable"> 
              <tr className="dataTable"> 
                <th className="titleTable">Id de Usuario</th>
                <th className="titleTable">Email</th>
                <th className="titleTable">Role</th>
                <th className="titleTable">  Editar/eliminar</th>
              </tr>
        </table>
        <div>
        {currentUsers.map((user, i) => {
          //console.log(currentUsers, 'del map')
          return (
            <table>
            <tr className="dataTable"> 
            <td key={i}> {user.id} </td>
            <td> {user.email} </td>
            <td> {user.role} </td>
            <td> 
            <button
            className="iconAccion"
                onClick={editHandle}
              ><AiOutlineEdit /></button> 
              
              <button 
                className="iconAccion"
                onClick={deleteHandle} 
                value={user.id}
                /* onSave={(user) => {
                  console.log("nose", currentUsers);
                  setcurrentUsers(user);
                  }} */
              > <AiOutlineDelete/></button>
              </td>
            </tr>
            </table>
          );
        })
        }
      </div>
      </section>
    </div>
  );
}

export default GetUser;
