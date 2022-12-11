import { useState, useEffect } from "react";
import { getToken, getUsers, editItem } from "../../functions/requests";
import React from "react";

const Edit = ({ onSave, selectedUser, closeModal }) => {
  const [newUserEmail, setNewUserEmail] = useState(selectedUser.email); /// iniciar vacio
  const [newUserPassword, setNewUserPassword] = useState(selectedUser.password);
  const [newUserRole, setNewUserRole] = useState(selectedUser.role);

  useEffect(() => {
    setNewUserEmail(selectedUser.email);
    setNewUserPassword(selectedUser.password);
    setNewUserRole(selectedUser.role);
    console.log(selectedUser, "ue en edit");
  }, [selectedUser]); /// cada vez que cambia usuario seleccionado se actualiza el hook

  const newUserEmailHandle = (event) => {
    setNewUserEmail(event.target.value); //actualiza estado segun lo que escriba
  };
  const newUserPasswordHandle = (event) => {
    setNewUserPassword(event.target.value); //actualiza estado segun lo que escriba
  };
  const newUserRoleHandle = (event) => {
    setNewUserRole(event.target.value); //actualiza estado segun lo que escriba
  };

  const editUsersHandle = (event) => {
    event.preventDefault();
    getToken();
    editItem(
      selectedUser.id,
      getToken(),
      newUserEmail,
      newUserPassword,
      newUserRole
    )
      .then(() => {
        console.log(
          editItem(
            selectedUser.id,
            getToken(),
            newUserEmail,
            newUserPassword,
            newUserRole
          ),
          "ejec func"
        );
        getUsers(getToken())
          .then((res) => res.json())
          .then((users) => {
            console.log(users);
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
      <form className="formContainer" onSubmit={editUsersHandle}>
        <label>Id usuario</label>
        <p
          className="inputsCreateUsers"
          type="text"
          placeholder="Introduce Nombre "
        >
          {selectedUser.id}
        </p>

        <label>Correo</label>
        <input
          className="inputsCreateUsers"
          type="email"
          placeholder="Introduce Email"
          value={newUserEmail}
          onChange={newUserEmailHandle}
          required
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
              required
            ></input>
          </div>
          <div className="inputLabelContainer">
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
        <div className="buttonContainer">
          <button className="addUserButton" type="submit">
            {" "}
            Editar{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
