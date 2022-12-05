import { useState, useEffect } from 'react';
import { postLogin, setToken_role, setCurrenId} from '../../functions/requests.js';
import React from 'react';
import logo from '../../img/logo.png'
import './styleLogin.css'
import { Link, useNavigate } from "react-router-dom";




function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ error, setError] = useState('')


  const emailHandle = (event)=>{
    setEmail(event.target.value)
  }

  const passwordHandle = (event)=>{
    setPassword(event.target.value)
  }


const errorHandle =(resJson)=>{

  if (resJson === 'Email and password are required')  {
    setError('Correo y contraseña requeridos 😰') // cambio de estado
    throw new Error(resJson)
  }
  else if (resJson === 'Incorrect password' || resJson === 'Password is too short ' )  {
    setError('Contraseña incorrecta ❌')
    throw new Error(resJson)
  }
 
  else if (resJson === 'Cannot find user')  {
    setError('El usuario no existe 😥')
    throw new Error(resJson)
  }
}

  const fetchHandle = (event)=>{  
    event.preventDefault()
    postLogin(email, password)
    .then(res => {
      console.log('RES:::', res);
      return res.json()
    } // no deja colocar{} ni otra cosa
    )
    .then(resJson => {
      console.log(resJson, 'log para test');
      errorHandle(resJson) /// manejador de error
      setToken_role(resJson.accessToken, resJson.user.role )// carga token y rol
      //console.log( setToken_role(resJson.accessToken, resJson.user.role ),'tokenrole');

       setCurrenId(resJson.user.id)
       //console.log(setCurrenId(resJson.user.id),'id setcurrent');
       //console.log(resJson.user.id, 'este es el id')
          if(resJson.user.role === 'admin'){
            console.log('es administrador');
            navigate("/admin/getUser");
          }
          else if(resJson.user.role === 'waiter'){
            console.log('es mesero');
            navigate("/waiter/MenuView");////pte
          }


        }).catch((error )=> {console.log(error)}) 
 
}


  return (
    <section className="login">
  
      <div className='nodoLogin'>
        <form onSubmit={fetchHandle} className="formLogin">
          <img className="logo" src={logo} />
          <div className='containerInputsLogin'> 
            <label className='labelInputsLogin'>Correo</label>
            <input className="inputsLogin"
              type='email'
              placeholder="Introduce Email"
              name="email"
              value={email}
              onChange={emailHandle}
              data-testid  = 'emailUserLogin'
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
              data-testid  = 'passwordUserLogin'
            >
            </input>
            
          </div>
          <p className='errorLogin'>{error}</p>

          <div className='containerButtonLogin'> 
           <button 
           type="submit" 
           className='buttonLogin'
           data-testid  = 'buttonLogin'
           > Ingresar </button>
           </div>
         
      
        </form>
        
      </div>
    </section>
  );
}

export default Login;