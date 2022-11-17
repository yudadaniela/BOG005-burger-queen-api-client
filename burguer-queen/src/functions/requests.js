

export const prueba = (email, password) => fetch('http://localhost:8080/login', {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({
    email: email,
    password: password,
  })
})


