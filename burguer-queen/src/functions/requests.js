export const postLogin = (email, password) => fetch('http://localhost:8080/login', {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({
    email: email,
    password: password,
  })
})

export const getUsers = (tokenLogin/* , email, password */) => fetch('http://localhost:8080/users', {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    "authorization": "Bearer " + tokenLogin
  },
})

export const setToken_role =(token, role)=>{
  localStorage.setItem('token',token); //sube datos a localstorage para acceder 
  localStorage.setItem('role', role);

}

export const getToken =()=>localStorage.getItem('token');
export const getRole =()=>localStorage.getItem('role');

export const createUsers = (tokenLogin , email, password, role, id) => fetch('http://localhost:8080/users', {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    "authorization": "Bearer " + tokenLogin
  },
  body: JSON.stringify({
    email: email,
    password: password,
    role: role,
    id:id
  })
})

export const deleteItem = (id, tokenLogin) =>{
  console.log( id, 'id en fetch delete');
  fetch(`http://localhost:8080/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "authorization": "Bearer " + tokenLogin
    },
  })
}


// export const editItem =(id, tokenLogin, email, password, role)=>{ // sin modificar
//   fetch(`http://localhost:8080/users/${id}`,{
//     method: "PATCH",
//     headers: {
//       "Content-type": "application/json",
//       "authorization": "Bearer " + tokenLogin
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//       role: role,
//       id:id
//     })
//   })
// } 
export const editItem =(id, tokenLogin, email, password, role)=>{
  // console.log(`http://localhost:8080/users/${id}`);
  // console.log( id, 'id en fetch');
  // console.log(tokenLogin, 'tok en fetch');
  // console.log(email, 'email en fetch');// indefinidos
  // console.log(password, 'pass en fetch');
  // console.log(role, 'role en fetch');   
  fetch(`http://localhost:8080/users/${id}` ,{
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "authorization": "Bearer " + tokenLogin
    },
    body: JSON.stringify({
      email: email,
      password: password,
      role: role,
      id:id
    })
  })
} 