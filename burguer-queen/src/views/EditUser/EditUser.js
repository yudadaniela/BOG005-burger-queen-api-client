import { useState, useEffect } from 'react';
import { createUsers, getToken, getRole, getUsers, editItem} from '../../functions/requests';
import React from 'react';
import Modal from '../../components/modal';
import Login from '../login/login.js'

const Edit = ({onSave, selectedUser, closeModal}) => {
     console.log(selectedUser, 'user que llega a edit');
    // console.log(selectedUser.id, 'id de user selecc en editar');
    // console.log(selectedUser.email, ' es el email');
    
    const [newUserEmail, setNewUserEmail] = useState('')/// iniciar vacio
    const [newUserPassword, setNewUserPassword] = useState('')
    const [newUserRole, setNewUserRole] = useState('')

    useEffect(()=>{
        setNewUserEmail(selectedUser.email)   
        setNewUserPassword(selectedUser.password)
        setNewUserRole(selectedUser.role)
        console.log(selectedUser, 'ue en edit');
    },[selectedUser]) /// cada vez que cambia usuario seleccionado se actualiza el hook

    const newUserEmailHandle =(event)=>{
        setNewUserEmail(event.target.value) //actualiza estado segun lo que escriba
    }
    const newUserPasswordHandle =(event)=>{
        setNewUserPassword(event.target.value) //actualiza estado segun lo que escriba
    }
    const newUserRoleHandle =(event)=>{
        setNewUserRole(event.target.value) //actualiza estado segun lo que escriba
    }

    const editUsersHandle = (event) => {
        event.preventDefault()
        getToken()
    //     console.log( newUserEmail, 'es el email definido');// definidos
    //     console.log( getToken());
        editItem(selectedUser.id, getToken(), newUserEmail, newUserPassword, newUserRole)
        console.log(editItem(selectedUser.id, getToken(), newUserEmail, newUserPassword, newUserRole), 'ejec func');
        getUsers(getToken()).then(res => res.json()).then( users => {
            console.log(users);
            onSave(users)
        })
        closeModal()
    }

    return (
        <div>
            <form 
            className="formContainer"
            onSubmit={editUsersHandle}>
            <label>Id usuario</label>
                <p className="inputsCreateUsers"
                    type='text'
                    placeholder="Introduce Nombre "
                >
                    {selectedUser.id}
                </p>

                <label>Correo</label>
                <input className="inputsCreateUsers"
                    type='email'
                    placeholder="Introduce Email"
                    value={newUserEmail}
                    onChange={newUserEmailHandle}
                >
                </input>
            <div className= "twoInputsContainers">
                <div className= "inputLabelContainer">
                <label>Contraseña</label>
                <input
                    className="inputsCreateUsers"
                    type='password'
                    placeholder="Introduce Contraseña"
                    value={newUserPassword}
                    onChange={newUserPasswordHandle}
                >
                </input>
                </div>
                <div className= "inputLabelContainer">
                <label>Rol</label>
                <select
                className="inputsCreateUsers"
                value={newUserRole}
                onChange={newUserRoleHandle}
                required
                >
                <option value="">Selecciona Rol</option> 
                <option value="admin">Administrador</option>    
                <option value="cheff">Chef</option>    
                <option value="waiter">Mesero</option>    
                </select>
                </div>
            </div>
            <div className ="buttonContainer">
                <button 
                className="addUserButton"
                type="submit"> Editar </button>
            </div>
            </form>
            
           
            
        </div>
    );
}

export default Edit;