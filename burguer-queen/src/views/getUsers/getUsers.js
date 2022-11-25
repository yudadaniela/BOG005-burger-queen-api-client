import React from "react";
import CreateUsersView from "../createUsers/createUsers";
import { getToken, getRole, getUsers, deleteItem, editItem } from "../../functions/requests";
import { useState, useEffect } from "react";
import './getUsers.css'
import Modal from "../../components/modal";
import { AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import { BiExit, BiPlus } from "react-icons/bi";
import logo from '../../img/logo.png'

//import { Example } from './views/login/login.js';

function GetUser() {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [currentUsers, setcurrentUsers] = useState([]);
  const [editState, setEditState] = useState(false);//EDICION
  const [agregarState, setagregarState] = useState(true); ///AGREGAR
  const [idUser, setidUser] = useState('');/// AJUSTAR VALOR INIC

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
    setidUser(event.target.value) //actualiza el id al id selecc
    console.log(event.target.value, 'EVENT TARGET de editar')
    //setidUser(event.target.value) 
    console.log(idUser, 'es idUSER');/// ESTÁ TOMANDO EL ANTEIROR
    setEditState(true)
    setagregarState(false)
    openModal()
    //editItem(( event.target.value, getToken(), email, password, role))
    //editItem(( event.target.value, getToken(), "email@email", "password", "role"))
  }



  const addHandle = () => {
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

          }} idUser={idUser} listCurrent={currentUsers} /> : <CreateUsersView
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
                  }}
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
