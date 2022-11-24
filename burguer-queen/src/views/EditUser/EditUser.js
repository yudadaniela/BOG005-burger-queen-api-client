import { useState, useEffect } from 'react';
import { createUsers, getToken, getRole, getUsers, editItem} from '../../functions/requests';
import React from 'react';
import Modal from '../../components/modal';
import Login from '../login/login.js'

const Edit = ({onSave, idUser, listCurrent}) => {
    let obj= listCurrent.find((item)=>item.id == idUser)
    console.log(obj, 'es el usuario encontrado');
    //console.log(obj.id, 'es id por defecto');
    //console.log(obj.email, 'es email por defecto');
    const [newUserName, setNewUserName] = useState(obj.id)
    const [newUserEmail, setNewUserEmail] = useState(obj.email)
    const [newUserPassword, setNewUserPassword] = useState(obj.password)
    const [newUserRole, setNewUserRole] = useState(obj.role)

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


    const editUsersHandle = (event) => {
        event.preventDefault()
        getToken()
        
        console.log(listCurrent, 'son todos');
        console.log(idUser, 'es el id definido ');
        console.log( newUserEmail, 'es el email definido');// definidos
        console.log( newUserPassword, 'es la contras definido');
        console.log(  newUserRole, 'es rol definido');
        console.log( getToken());
        editItem((idUser, getToken(), newUserEmail, newUserPassword, newUserRole))/* .then(res => res.json()).then( rtaJson => {
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
                <button type="submit"> Editar </button>
                <p> es el email{newUserName}</p>
                <p> es la contraseña{newUserEmail}</p>
                <p> es la contraseña{newUserPassword}</p>
                <p> es la contraseña{newUserRole}</p>
            </form>
            
           
            
        </div>
    );
}

export default Edit;