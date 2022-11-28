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
    const user = currentUsers.filter(u => u.id == event.currentTarget.dataset.user)/// traer el usuario completo en un array
    setSelectedUser(user[0]) //actualiza el usuario seleccionado
    console.log(user[0], 'es el usuario seleccionado');
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
     //console.log(event.target.value, 'EVENT TARGET de eliminar')
    // console.log(deleteItem(event.target.value, getToken()), 'se borro :)')
    //console.log(event.currentTarget.dataset.user/* .dataset.user */, 'target CURRENT nuevo');
    //console.log(event.currentTarget/* .dataset.user */, 'padre nuevo');
    //console.log(event.target/* .dataset.user */, 'target  nuevo');
    deleteItem(event.currentTarget.dataset.user, getToken())
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

          }} selectedUser={selectedUser} 
          closeModal={closeModal}
          /> : <CreateUsersView
            onSave={(response) => {
              setcurrentUsers(response);
              console.log("se cerro el modal ", currentUsers);
            
            }}
            closeModal={closeModal}
          />}
          task ={editState ? 'Editar Usuario' : 'Crear Usuario'}
        />
        </section>
      
        <section className="tableContainer"> 
        <table className="headerTable"> 
              <thead key={1}className="dataTable"> 
                <tr key={1}className="titleTable">Id de Usuario</tr>
                <tr key={2}className="titleTable">Email</tr>
                <tr key={3} className="titleTable">Role</tr>
                <tr key={4}className="titleTable">  Editar/eliminar</tr>
              </thead>
        </table>
        <div>
        {currentUsers.map((user, i) => {
          //console.log(currentUsers, 'del map')
          return (
            <table key={i}>
            <tbody key={i}className="dataTable"> 
            <tr key={i}> {user.id} </tr>
            <tr> {user.email} </tr>
            <tr> {user.role} </tr>
            
              <div>
            <button
            className="iconAccion"
                onClick={editHandle}
                data-user ={user.id}
              ><AiOutlineEdit /></button> 
              
              <button
                className="iconAccion"
                onClick={deleteHandle} 
                //value={user.id}
                data-user ={user.id}
                /* onSave={(user) => {
                  console.log("nose", currentUsers);
                  setcurrentUsers(user);
                  }} */
              > <AiOutlineDelete/></button>
              </div>
              
            </tbody>
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
