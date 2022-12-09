import { useState } from "react";
import {
  createUsers,
  getToken,
  getRole,
  getUsers,
} from "../../functions/requests";
import React from "react";
import "./createUsers.css";

const CreateUsersView = ({ onSave, closeModal }) => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("");

  const newUserNameHandle = (event) => {
    setNewUserName(event.target.value); /// buscar****
  };
  const newUserEmailHandle = (event) => {
    setNewUserEmail(event.target.value); /// buscar****
  };
  const newUserPasswordHandle = (event) => {
    setNewUserPassword(event.target.value); /// buscar****
  };
  const newUserRoleHandle = (event) => {
    setNewUserRole(event.target.value); /// buscar****
  };

  const createUsersHandle = (event) => {
    setNewUserName('')
    setNewUserEmail('')
    setNewUserPassword('')
    setNewUserRole('')
    event.preventDefault();
    getToken();
    getRole();
    console.log(event.target.value);
    createUsers(
      getToken(),
      newUserEmail,
      newUserPassword,
      newUserRole,
      newUserName
    )
      .then((res) => res.json())
      .then((rtaJson) => {
        getUsers(getToken())
          .then((res) => res.json())
          .then((users) => {
            console.log(rtaJson);
            onSave(users);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    closeModal();
  };

  return (
    <div>
      <form onSubmit={createUsersHandle} className="formContainer">
        <label>Id Usuario</label>
        <input
          className="inputsCreateUsers"
          type="text"
          placeholder="Introduce Id "
          value={newUserName}
          onChange={newUserNameHandle}
          data-testid="idUser"
        ></input>

        <label>Correo</label>
        <input
          className="inputsCreateUsers"
          type="email"
          placeholder="Introduce Email"
          value={newUserEmail}
          onChange={newUserEmailHandle}
          data-testid="emailUser"
        ></input>
        <div className="twoInputsContainers">
          <div className="inputLabelContainer">
            <label>Contraseña</label>
            <input
              className="inputsCreateUsers"
              type="password"
              placeholder="Introduce Contraseña"
              value={newUserPassword}
              onChange={newUserPasswordHandle}
              data-testid="passwordUser"
            ></input>
          </div>
          <div className="inputLabelContainer">
            <label>Rol</label>
            <select
              className="inputsCreateUsers"
              value={newUserRole}
              onChange={newUserRoleHandle}
              required
              data-testid="roleUser"
            >
              <option value="">Selecciona Rol</option>
              <option value="admin">Administrador</option>
              <option value="chef">Chef</option>
              <option value="waiter">Mesero</option>
            </select>
          </div>
        </div>
        <div className="buttonContainer">
          <button
            type="submit"
            className="addUserButton"
            data-testid="buttonCreate"
          >
            {" "}
            Agregar{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUsersView;
