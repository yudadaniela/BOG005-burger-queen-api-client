import { useState, useEffect } from 'react';
import { postLogin, setToken_role} from '../../functions/requests.js';
import React from 'react';
import './styleLogin.css'
import { Link, useNavigate } from "react-router-dom";



function Login() {

  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')

  const emailHandle = (event)=>{
    setEmail(event.target.value)
    //console.log('email',setEmail(event.target.value));
    
  }

  const passwordHandle = (event)=>{
    ///console.log(password)
    setPassword(event.target.value)
    //console.log('contraseña', setPassword(event.target.value));
    //setPassword(event.target.value)
  }

  const fetchHandle = (event)=>{  
    event.preventDefault()
    postLogin(email, password).then(resJson => {
          setUser(resJson.user)
        console.log(resJson);
          //unaVariable = 'chao'
          //console.log(unaVariable)
          setToken_role(resJson.accessToken, resJson.user.role )
          console.log(setToken_role(resJson.accessToken, resJson.user.role ), 'guardar token y rol')
          if(resJson.user.role === 'admin'){
            console.log('es administrador');
            navigate("/getUser");

            // switch (resJson.user.role) {
            //   case 1 'coci':
                
            //     break;

            // case 2 'mesero':
                
            //       break;
              
            // }
           
          }else{
            console.log('no es administrador ');

          }


        }).catch((error) => {console.error(error)})

        
  }

  // useEffect(() => {
    // postLogin().then(res => res.json()).then(resJson => {
    //   setUser(resJson.user)
    //   setIsLoadingUser(false)
      // unaVariable = 'chao'
      // console.log(unaVariable)
    // })
  // }, [])

  // useEffect(() => console.log(user), [user])



  return (
    <section className="login">
    
      <div className='nodoLogin'>
        <form onSubmit={fetchHandle} className="formLogin">
          <div className='containerInputsLogin'> 
            <label className='labelInputsLogin'>Correo</label>
            <input className="inputsLogin"
              type='email'
              placeholder="Introduce Email"
              name="email"
              value={email}
              onChange={emailHandle}
            >
            </input>
          </div>
          <div className='containerInputsLogin'> 
            <label className='labelInputsLogin'>Contraseña</label>
            <input
              className="inputsLogin"
              type='password'
              placeholder="Introduce Contraseña"
              name="password"
              value={password}
              onChange={passwordHandle} 
            >
            </input>
            
          </div>
          <div className='containerButtonLogin'> 
           <button type="submit" className='buttonLogin'> Ingresar </button>
           </div>
         
        {/* <p> es el email{email}</p>
        <p> es la contraseña{password}</p> */}
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



