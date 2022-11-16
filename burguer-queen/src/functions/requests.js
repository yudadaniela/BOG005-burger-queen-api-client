

export const prueba = () => fetch('http://localhost:8080/login', {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({
    email: "grace.hopper@systers.xyz",
    password: "123456",
  })
})


