import { useState, useEffect } from 'react';
import { createUsers, getToken, getRole, getUsers } from '../../functions/requests';
import React from 'react';
import Modal from '../../components/modal';
import Login from '../login/login.js'

const CreateUsersView = () => {
    const [newUserName, setNewUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const [newUserRole, setNewUserRole] = useState('')
   // const [isOpenModal, setisOpenModal] = useState(false)

    const newUserNameHandle =(event)=>{
        setNewUserName(event.target.value) /// buscar****
    }
    const newUserEmailHandle =(event)=>{
        setNewUserEmail(event.target.value) /// buscar****
    }
    const newUserPasswordHandle =(event)=>{
        setNewUserPassword(event.target.value) /// buscar****
    }
    const newUserRoleHandle =(event)=>{
        setNewUserRole(event.target.value) /// buscar****
    }

    const createUsersHandle = (event) => {
        event.preventDefault()
        getToken()
        getRole()
        createUsers(getToken(), newUserEmail, newUserPassword, newUserRole, newUserName).then(res => res.json()).then( rtaJson => {
            console.log(rtaJson);
        })
        getUsers(getToken()).then(res => res.json()).then( rtaJson => {
            console.log(rtaJson);
        })
    }

    // const openModal =()=>{
    //     setisOpenModal(true)
    // }
    // const closeModal =()=>{
    //     setisOpenModal(false)
    // }

    return (
        <div>
            <form onSubmit={createUsersHandle}>
            <label>Nombre</label>
                <input className="inputsCreateUsers"
                    type='text'
                    placeholder="Introduce Nombre "
                    value={newUserName}
                    onChange={newUserNameHandle}
                >
                </input>

                <label>Correo</label>
                <input className="inputsCreateUsers"
                    type='email'
                    placeholder="Introduce Email"
                    value={newUserEmail}
                    onChange={newUserEmailHandle}
                >
                </input>

                <label>Contraseña</label>
                <input
                    className="inputsCreateUsers"
                    type='password'
                    placeholder="Introduce Contraseña"
                    value={newUserPassword}
                    onChange={newUserPasswordHandle}
                >
                </input>

                <label>Rol</label>
                <select
                className="inputsCreateUsers"
                value={newUserRole}
                onChange={newUserRoleHandle}
                >
                <option value="admin">Administrador</option>    
                <option value="cheff">Chef</option>    
                <option value="waiter">Mesero</option>    
                </select>
                <button type="submit"> Ingresar </button>
                <p> es el email{newUserName}</p>
                <p> es la contraseña{newUserEmail}</p>
                <p> es la contraseña{newUserPassword}</p>
                <p> es la contraseña{newUserRole}</p>
            </form>
            
           
            
        </div>
    );
}

export default CreateUsersView;