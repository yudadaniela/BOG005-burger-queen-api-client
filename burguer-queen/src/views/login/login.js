import { useState, useEffect } from 'react';
import { prueba } from '../../functions/requests.js';
import React from 'react';


let unaVariable = 'hola'
function Login() {
  
  const [isLoadingUser, setIsLoadingUser] = useState(true)// log usuario
  const [user, setUser] = useState({}) // objeto usuario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailHandle = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandle = (event) => {
    setPassword(event.target.value)
  }

  const fetchHandle = (event) => {
    event.preventDefault()
    prueba(email, password).then(res => res.json()).then(resJson => {
          setUser(resJson.user)
          setIsLoadingUser(false)
          console.log(resJson.user.email);
          unaVariable = 'chao'
          console.log(unaVariable)
          // if(resJson.user.role = "admin"){
          //   console.log('sig pagina')
          // }
          // switch (resJson.user.role) {
          //   case "admin":   
          //     console.log('pag admin')
          //     break;

          //   case "coc": 
          //     console.log('sig pagina')
          //     break;
    
          //   case "mesero": 
          //     console.log('sig pagina')
          //     break;

          //   default:
          //     console.log('no trabaja acá')
          //     break;
          // }
          
          // if(email == resJson.user.email){
          //   console.log('sig pagina')
          // }
          // else{
          //   console.log('no se puede ingresar')
          // }
        })
  }


  // useEffect(() => {
  //   prueba().then(res => res.json()).then(resJson => {
  //     setUser(resJson.user)
  //     setIsLoadingUser(false)
  //     unaVariable = 'chao'
  //     console.log(unaVariable)
  //   })
  // }, [])

  // useEffect(() => console.log(user), [user])


  return (
    <section className="login">
      <div>
        <form onSubmit={fetchHandle}>
          <label>Correo</label>
          <input className="inputsLogin"
            type='email'
            placeholder="Introduce Email"
            name="email"
            value={email}
            onChange={emailHandle}
          >
          </input>
          <p>es email {email}</p>

          <label>Contraseña</label>
          <input
            className="inputsLogin"
            type='password'
            placeholder="Introduce Contraseña"
            name="password"
            value={password}
            onChange={passwordHandle}
          >
          </input>
          <p>la contraseña es {password}</p>
          <button type="submit" > Ingresar </button>
        </form>
      </div>
    </section>
  );
}

export default Login;



// export function Example() {
//   // Declaración de una variable de estado que llamaremos "count"
//   const [count, setount] = useState(0);
// /// let count = nombre //almacena valores en estado
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }


// const Login= () => {

//   let nombre = "caro"
//   let nombre2 = "viki"
//   let array =['cosa1', 'cosa2', 'cosa3']
//   const [estado, setEstado] = useState(nombre) // declaro hook
//   /// let estado = nombre //en estado se almacena valores de nombre
//   const cambiarNombre = (nuevoNombre) =>{
//     setEstado(nuevoNombre)
//   }

//   // antes  setEstado(estado) = caro   ///estado = nombre
//   // despues setEstado(estado2) = viki /// estado = estado2
// /// estado =  setEstado(estado2) // reasignar
//   return (
//     <div>
//       <p> holanda</p>
//       <p> holanda {estado}</p>
//       <button onClick={e => cambiarNombre(nombre2)}>boton</button>
//       <div>
//       {/*         {array.map((n, i) => {
//           return (<li key={i}> holanda {n}</li>)
//         })} */}
//       </div>
//     </div>
//   )
// }

// export default Login



