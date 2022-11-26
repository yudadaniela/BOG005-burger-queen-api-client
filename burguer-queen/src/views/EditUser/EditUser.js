import { useState, useEffect } from 'react';
import { createUsers, getToken, getRole, getUsers, editItem} from '../../functions/requests';
import React from 'react';
import Modal from '../../components/modal';
import Login from '../login/login.js'

const Edit = ({onSave, selectedUser}) => {
    console.log(selectedUser, 'user');
    console.log(selectedUser.id, 'id de user selecc en editar');
    console.log(selectedUser.email, ' es el email');
    //const [newUserName, setNewUserName] = useState(selectedUser.id)/// no se puede modificar
    const [newUserEmail, setNewUserEmail] = useState(selectedUser.email)
    const [newUserPassword, setNewUserPassword] = useState(selectedUser.password)
    const [newUserRole, setNewUserRole] = useState(selectedUser.role)

    // const newUserNameHandle =(event)=>{
    //     setNewUserName(event.target.value) //actualiza estado segun lo que escriba
    // }
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
/*         console.log( newUserEmail, 'es el email definido');// definidos
        console.log( newUserPassword, 'es la contras definido');
        console.log(  newUserRole, 'es rol definido');
        console.log( getToken()); */
        editItem(selectedUser.id, getToken(), newUserEmail, newUserPassword, newUserRole)
        console.log(editItem(selectedUser.id, getToken(), newUserEmail, newUserPassword, newUserRole), 'ejec func');
        getUsers(getToken()).then(res => res.json()).then( users => {
            console.log(users);
            onSave(users)
        })
        /* .then(res => res.json()).then( rtaJson => {
            // console.log(rtaJson);
            // onSave(rtaJson)
            getUsers(getToken()).then(res => res.json()).then( users => {
                console.log(rtaJson);
                onSave(users)
            })

        }) */

    }


    return (
        <div>
            <form onSubmit={editUsersHandle}>
            <label>Id</label>
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
                <button type="submit"> Editar </button>
                <p> es el id{selectedUser.id}</p>
                <p> es el email{newUserEmail}</p>
                <p> es la contraseña{newUserPassword}</p>
                <p> es el rol {newUserRole}</p>
            </form>
            
           
            
        </div>
    );
}

export default Edit;