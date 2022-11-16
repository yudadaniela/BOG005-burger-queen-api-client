import { useState, useEffect } from 'react';
import { prueba } from '../../functions/requests.js';


function Login() {
  let unaVariable = 'hola'
  console.log(unaVariable)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState({})
  const [ email, setEmail] = useState(' ')
  const [ password, setPassword] = useState(' ')

  const emailHandle = (event)=>{
    setEmail(event.target.value)
  }

  const passwordHandle = (event)=>{
    console.log(password)
    setPassword(event.target.value)
  }

  const fetchHandle = (event)=>{  
    event.preventDefault()
    console.log('hi')
  }

  useEffect(() => {
    prueba().then(res => res.json()).then(resJson => {
      setUser(resJson.user)
      setIsLoadingUser(false)
      unaVariable = 'chao'
      console.log(unaVariable)
    })
  }, [])

  useEffect(() => console.log(user), [user])



  return (
    <section className="login">
      <div>
        <form>
          <label>Correo</label>
          <input className="inputsLogin"
            type='email'
            placeholder="Introduce Email"
            name="email"
            value={email}
            onChange={emailHandle}
          >
          </input>

          <label>Contraseña</label>
          <input
            className="inputsLogin"
            type='text'
            placeholder="Introduce Contraseña"
            name="password"
            value={password}
            onChange={passwordHandle}
          >
          </input>
        <button type="submit"> Ingresar </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
